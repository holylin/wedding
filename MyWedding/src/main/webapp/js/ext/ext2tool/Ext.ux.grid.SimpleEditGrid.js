// 重新扩展的grid组建
Ext.namespace("Ext.ux.grid");
Ext.ux.grid.SimpleEditGrid = Ext.extend(Ext.grid.EditorGridPanel, {
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
	// 还原刷新
	isReload : true,
	
	isShowPagingToolbar : true,
	frame : false,
	// 是否带展开按钮，默认为false
	collapsible : false,
	animCollapse : false,
	autoScroll : true,
	loadMask : true,
	clicksToEdit : 1,
	style : {
		margin : '0 0 0 0'
	},
	limitColumns : '', // 格式[1,2...]，表示要显示的表头
	pageSize : 20,// 分页默认20
	viewConfig : {
		forceFit : true
	},
	params : '',
	// private
	initComponent : function() {
		if (this.structure != '') {
			this.initStructure();
		}

		Ext.ux.grid.SimpleEditGrid.superclass.initComponent.call(this);

	},
	// private
	initEvents : function() {
		Ext.ux.grid.SimpleEditGrid.superclass.initEvents.call(this);

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
		var form = Ext.form;
		var structure;
		var oCM = new Array(); // 列模式数组
		var oRecord = new Array(); // 容器对数组
		// 构成grid的两个必须组件: column和record，根据structure将这两个组件创建出来

		// 判断表格的选择模式
		if (this.selectType == 'check') {
			var sm = new Ext.grid.CheckboxSelectionModel();
			oCM[oCM.length] = sm;// 在列模式数组中添加checkbox模式按钮
			this.selModel = sm;// 并将selModel设置为check模式
		}
		// 行数号
		if (this.isRowNum) {
			var rowNum = new Ext.grid.RowNumberer();
			oCM[oCM.length] = rowNum;
		}
// if (this.limitColumns == '') {
//			
// } else {
// var cs = [];
// for (var i = 0, len = this.limitColumns.length; i < len; i++) {
// if (this.structure[this.limitColumns[i]]) {
// cs.push(this.structure[this.limitColumns[i]]);
// }
// }
// structure = cs;
// }
		structure = this.structure;
		var len = structure.length;// 得到结构的长度
		var formateDate = function(value) {
			return value ? value.dateFormat('Y-m-d') : '';
		};
		var keyCombotree = [];
		var tempKey =[];
		// var tempKeyShow=[];
		var c ;
		var editor ;
		var renderer ;
		var o;
		for (var i = 0; i < len; i++) {
			 c = structure[i];
			if(c.typeCombo&&c.typeCombo!=''){
				if (c.typeCombo == 'comboLocal') {
					// 静态下拉框
					var struts = {
						data : c.comboData,
						value : c.value,
						emptyText : c.emptyText,
						forceSelection : c.forceSelection
					};
					editor = new Ext.ux.form.SimpleCombo({
						structure : struts
					});
				} else if (c.typeCombo == 'comboremote') {
					// 动态下拉框
					var value = c.value;
					var key = c.key;
					var gridId = c.gridId;
					editor = new Ext.form.ComboBox({
						mode : 'local',
						typeAhead : true,
						displayField : c.value,
						store : new Ext.data.Store({
							autoLoad : true,
							proxy : new Ext.data.HttpProxy({
								url : c.url
							}),
							reader : new Ext.data.JsonReader({
								root : 'root'// json格式数据必须root：{}的格式
									// id : c.keyId
									}, [{
										name : c.key,
										mapping : c.key
									}, {
										name : c.value,
										mapping : c.value
									}])
						}),
						triggerAction : 'all',
						listeners : {
							'select' : function(combo, record) {
								CommonMethodExt.getRecordByGrid(Ext.getCmp(gridId))
										.set(key, record.get(key));
							}
						}
	
					});
				} else if (c.typeCombo == 'comboTreeRemote') {
					var selectNodeModel = c.selectNodeModel;
					keyCombotree[keyCombotree.length] = c.key;
					tempKey[tempKey.length]=c.tempKey;
				// tempKeyShow[tempKeyShow.length]=c.tempKeyShow;
					var isSingle = c.isSingle;
					if(isSingle)
						var key = c.key;
					var gridId = c.gridId;
					var rootName = c.rootName;
					
					function searchAndAnchor() {
						alert("抱歉，本功能还在开发中！");
					}
					editor = new Ext.ux.ComboBoxTree({
						gridId:gridId,
						width : 250,
						tree : {
							xtype : 'treepanel',
							bbar : ['名称：', {
								xtype : 'trigger',
								id : 'searchName',
								width : 150,
								triggerClass : 'x-form-search-trigger',
								onTriggerClick : searchAndAnchor
							}],
							loader : new Ext.tree.TreeLoader({
								dataUrl : c.dataUrl
	
							}),
							root : new Ext.tree.AsyncTreeNode({
								id : '0',
								text : rootName
							}),
							useArrows : true
						},
	
						// all:所有结点都可选中
						// exceptRoot：除根结点，其它结点都可选(默认)
						// folder:只有目录（非叶子和非根结点）可选
						// leaf：只有叶子结点可选
						selectNodeModel : selectNodeModel != null
								? selectNodeModel
								: 'exceptRoot',
						listeners : {
							'change' : function(combo, record) {
								
								if (combo.getKey()) {
									var arr = CommonMethodExt.getArrayBySplit(combo
											.getKey(), "_");
									if (isSingle) {
										combo.record.set(key,arr[1]);
	
									} else {
										for (var kl = 0; kl < keyCombotree.length; kl++) {
											if (keyCombotree[kl].indexOf(arr[0]) != -1) {
												combo.record.set(keyCombotree[kl],arr[1]);
												//
												if(tempKey[kl]){
													var json=Ext.decode(arr[arr.length-1]);
													var ev = eval("json."+tempKey[kl]);
													combo.record.set(tempKey[kl],ev);
												}
												
												return;
	
											}if(keyCombotree[kl]=='customerContractInfoId'){
												combo.record.set(keyCombotree[kl],arr[1]);
												return;
											}
										}
									}
								}
	
							}
						}
					});
				}
			}else{
				if (c.type == 'date') {
					editor = new form.DateField({
						format : 'Y-m-d',
						readOnly : (c.readOnly == undefined || !c.readOnly)
								? false
								: true
					});
	
				} else if (c.type == 'float' || c.type == 'int') {
					editor = new form.NumberField({
						allowBlank : c.isBlank,
						readOnly : (c.readOnly == undefined || !c.readOnly)
								? false
								: true
					});
				} else {
					editor = new Ext.form.TextField({
						allowBlank : c.isBlank,
						readOnly : (c.readOnly == undefined || !c.readOnly)
								? false
								: true
					});
				}
			}
			if (c.renderer != undefined) {
				renderer = c.renderer;
			} else if (c.type == 'date') {
				renderer = Ext.util.Format.dateRenderer('Y-m-d');
			} else {
				renderer = '';
			}
			oCM[oCM.length] = {
				//id : c.name,
				header : c.header,
				dataIndex : c.dataIndex,
				width : c.width,
				// type : c.type,
				hidden : (c.hidden == undefined || !c.hidden) ? false : true,
				renderer : renderer,
				editor : editor
			};
			
			oRecord[oRecord.length] = {
			//	id : c.name,
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
		// 还原刷新
		if (this.isReload) {
			var reloadButn = new Ext.Button({
				text : '刷新',
				handler : function() {
					ds.reload();
				}
			})
			if (!this.tbar) {
				this.tbar = [];
			}
			this.addListener('render', function(_panel) {
				_panel.getTopToolbar().add("-");
				_panel.getTopToolbar().addButton(reloadButn);
			})
		}

		// 查询
		if (this.isSearch) {
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
			var textfield = new Ext.app.SearchField({
				combox : combo,
				store : this.store,
				pageSize : this.pageSize,
				width : 150
			});
			if (!this.tbar) {
				this.tbar = [];
			}
			this.addListener('render', function(_panel) {
				_panel.getTopToolbar().add("-");
				_panel.getTopToolbar().add(combo);
				_panel.getTopToolbar().addField(textfield);
			})
		}

	}

});
