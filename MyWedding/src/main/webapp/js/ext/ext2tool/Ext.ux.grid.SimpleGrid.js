// 重新扩展的grid组建
Ext.namespace("Ext.ux.grid");
Ext.ux.grid.SimpleGrid = Ext.extend(Ext.grid.GridPanel, {
	// 表格结构
	structure : '',
	// reader类型为json的时候那么url不能空
	readType : 'json',
	// 获取数据的URL
	url : '',
	// 关键字段
	keyField : '',
	// 列模式的选择模式,默认为rowselectModel，如果相设置成check模式，就设置为check
	selectType : '',
	// 行号
	isRowNum : true,
	// 查询
	isSearch : false,
	isTime : false,
	frame : false,
	rowExpander : null,
	// 是否显示分页状态栏
	isShowPagingToolbar : true,
	// 导出excel
	isExcel : false,
	// 是否带展开按钮，默认为false
	collapsible : false,
	animCollapse : true,
	autoScroll : true,
	autoLoad : true,
	loadMask : true,
	limitColumns : '', // 格式[1,2...]，表示要显示的表头
	pageSize : 20,// 分页默认20
	viewConfig : {
		forceFit : true
	},
	// private
	initComponent : function() {
		if (this.structure != '') {
			this.initStructure();
		}

		Ext.ux.grid.SimpleGrid.superclass.initComponent.call(this);

	},
	// private
	initEvents : function() {
		Ext.ux.grid.SimpleGrid.superclass.initEvents.call(this);

		/*
		 * this.getStore().load( { params : { start : 0, limit : 30 } });
		 * 
		 */if (this.loadMask) {
			this.loadMask = new Ext.LoadMask(this.bwrap, Ext.apply({
								store : this.store
							}, this.loadMask));
		}
	},
	// private
	initStructure : function() {
		var structure;
		var oCM = new Array(); // 列模式数组
		var oRecord = new Array(); // 容器对数组
		// 构成grid的两个必须组件: column和record，根据structure将这两个组件创建出来

		// 判断表格的选择模式
		if (this.selectType == 'check') {// 多选
			var sm = new Ext.grid.CheckboxSelectionModel();
			oCM[oCM.length] = sm;// 在列模式数组中添加checkbox模式按钮
			this.selModel = sm;// 并将selModel设置为check模式
		} else if (this.selectType = 'radio') {// 单选
			var sm = new Ext.grid.CheckboxSelectionModel({
						singleSelect : true
					});
			oCM[oCM.length] = sm;
			this.selModel = sm;
		}

		if (this.rowExpander != null) {
			oCM[oCM.length] = this.rowExpander;
		}
		// 行数号
		if (this.isRowNum) {
			var rowNum = new Ext.grid.RowNumberer();
			oCM[oCM.length] = rowNum;
		}
		if (this.limitColumns == '') {
			structure = this.structure;
		} else {
			var cs = [];
			for (var i = 0, len = this.limitColumns.length; i < len; i++) {
				if (this.structure[this.limitColumns[i]]) {
					cs.push(this.structure[this.limitColumns[i]]);
				}
			}
			structure = cs;
		}
		var len = structure.length;// 得到结构的长度
		for (var i = 0; i < len; i++) {
			var renderer;
			var c = structure[i];
			if (c.renderer != undefined) {
				renderer = c.renderer;
			} else if (c.type == 'date') {
				renderer = Ext.util.Format.dateRenderer('Y-m-d');
			} else {
				renderer = '';
			}
			oCM[oCM.length] = {
				id : c.name,
				header : c.header,
				dataIndex : c.dataIndex,
				width : c.width,
				type : c.type,
				hidden : (c.hidden == undefined || !c.hidden) ? false : true,
				renderer : renderer
			};

			oRecord[oRecord.length] = {
				id : c.name,
				name : c.name,
				// 如果类型不是date型则全部为string型
				type : c.type,
				mapping : c.name,
				dateFormat : c.type == 'date' ? 'Y-m-d' : ''
			};

		}
		// 生成columnModel
		this.cm = new Ext.grid.ColumnModel(oCM);
		// this.colModel = this.cm;
		// 默认可排序
		this.cm.defaultSortable = true;
		// 生成表格数据容器
		var record = Ext.data.Record.create(oRecord);
		// 判断读取类别，只实现了jsonreader
		var reader;

		reader = new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'root',
			id : this.keyField
				// 关键字段
			}, record);

		var ds = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : this.url
							}),
					autoLoad : this.autoLoad,
					reader : reader,
					baseParams : {
						limit : this.pageSize
					}
				});

		this.store = ds;

		// 分页工具栏
		if (this.readType == 'json') {
			this.store.load({
						start : 0
					});
		}
		if (this.isShowPagingToolbar) {
			var pagingToolbar = new Ext.PagingToolbar({
						displayInfo : true,
						displayMsg : '当前记录数: {0} - {1} 总记录数: {2}',
						emptyMsg : '没有符合条件的记录',
						store : ds
					});
			pagingToolbar.pageSize = this.pageSize;
			this.bbar = pagingToolbar;
			this.bottomToolbar = this.bbar;
		}

		// 查询
		if (this.isSearch) {
			// if(!this.getTopToolbar()){
			// this.tbar=new Ext.Toolbar();
			// }
			var isTimeTemp = this.isTime;

			var len = structure.length;
			var menusArr = [];
			for (var i = 0; i < len; i++) {
				var c = structure[i];
				if (!c.hidden && c.type && c.type != 'date')
					menusArr[menusArr.length] = [c.dataIndex, c.header];
			}
			var combo = CommonComboExt.buildstaticCombo('searchForGrid',
					'searchForGrid', menusArr, menusArr[0][0]);
			combo.width = 100;

			var startTime = new Ext.form.DateField({
				id : 'startTime_Grid',
				name : 'startTime',
				vtype : 'daterange',
				format : 'Y-m-d',
				readOnly : true,
				endDateField : 'endTime_Grid' // id of the end date
					// field
				});
			var endTime = new Ext.form.DateField({
				id : 'endTime_Grid',
				name : 'endTime',
				vtype : 'daterange',
				format : 'Y-m-d',
				readOnly : true,
				startDateField : 'startTime_Grid' // id of the start date
					// field
				});

			var textfield = new Ext.app.SearchField({
						startTime : startTime,
						endTime : endTime,
						isTime : this.isTime,
						combox : combo,
						store : this.store,
						pageSize : this.pageSize,
						width : 150
					});
			if (!this.tbar) {
				this.tbar = [];
			}
			this.addListener('render', function(_panel) {
						_panel.getTopToolbar().add('-');
						if (isTimeTemp) {
							_panel.getTopToolbar().add('时间：');
							_panel.getTopToolbar().add(startTime);
							_panel.getTopToolbar().add(endTime);
						}
						_panel.getTopToolbar().add(combo);
						_panel.getTopToolbar().addField(textfield);

					});
		}

		// 导出excel
		if (this.isExcel) {
			var grid = this;
			var linkButton = new Ext.Button({
				text : 'Excel导出',
				// width:16,
				// icon:'image/excel.png',
				handler : function() {
					var vExportContent = grid.getExcelXml();
					if (Ext.isIE6 || Ext.isIE7 || Ext.isSafari || Ext.isSafari2
							|| Ext.isSafari3) {
						var fd = Ext.get('frmDummy');
						if (!fd) {
							fd = Ext.DomHelper.append(Ext.getBody(), {
										tag : 'form',
										method : 'post',
										id : 'frmDummy',
										action : 'exportexcel.jsp',
										target : '_blank',
										name : 'frmDummy',
										cls : 'x-hidden',
										cn : [{
													tag : 'input',
													name : 'exportContent',
													id : 'exportContent',
													type : 'hidden'
												}]
									}, true);
						}
						fd.child('#exportContent').set({
									value : vExportContent
								});
						fd.dom.submit();
					} else {
						document.location = 'data:application/vnd.ms-excel;base64,'
								+ Base64.encode(vExportContent);
					}
				}
			});
			if (!this.bbar) {
				this.bbar = [];
			}
			this.addListener('render', function(_panel) {
						_panel.getBottomToolbar().add('-');
						_panel.getBottomToolbar().add(linkButton);
					});
		}

	}

});
