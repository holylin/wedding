/**
 * @author HOLYLIN
 * @since 2009-12-22
 */
GuestExt = {
		// 每个FunctionExt都必须定义的方法，且需返回其代表的Ext对象，比如gridPanel等。		
		init : function() {
		
		var struts = [//grid的数据结构
		{
			name :"id",
			header :"编号",
			dataIndex :"id",
			type :'string',
			hidden :true
		},{
			name :"name",
			header :"姓名",
			dataIndex :"name",
			type :'string'
		},{
			name :"isWinner",
			header :"是否已获奖",
			dataIndex :"isWinner",
			isBlank:true,
			type :'string'
		},{
			name :"winnerType",
			header :"获奖类型",
			dataIndex :"winnerType",
			isBlank:true,
			type :'string'
		}, {
			name :'remark',
			header :"备注",
			dataIndex :"remark",
			type :'string',
			isBlank:true,
			width :150
			}
			//, {// 其它需要显示的字段信息，如下
			//name :'preagreementPlace',
			//header :"预约地点",
			//dataIndex :"preagreementPlace",
			//type :'string',
			//isBlank:true,
			//width :150
			//}
			];
			//日期型请用“date”，数值型请用“float”。"isBlank"指明此字段在用户输入时是否可以为空。

			var deleteFn = function(ids){
				Ext.Ajax.request({
					url :'guest.do?method=delete',
					params : {
						ids : ids
					},
					failure : function() {
						Ext.Msg.alert('操作',
								'抱歉，系统出错，请与管理员联系，谢谢！');
					},
					success : function() {				
						  _gridPanel.getStore().reload();
					}
				});	
			};
			var deleteButton = ApplicationTool.button.init(deleteFn,'删除',true,'many','GuestExt','id');	
			
			var addFn = function(ids){		
				// 表格
				var MessageRecord = Ext.data.Record.create([{
					name : 'id',
					type : 'string',
					mapping : 'id'
				},{
					name : 'name',
					type : 'string',
					mapping : 'name'
				},{
					name : 'isWinner',
					type : 'string',
					mapping : 'isWinner'
				},{
					name : 'winnerType',
					type : 'string',
					mapping : 'winnerType'
				},{
					name : 'remark',
					type : 'string',
					mapping : 'remark'
				}
				//, {
					// 其它需要显示的字段信息，如下
					//name : 'preagreementPlace',
					//type : 'string',
					//mapping : 'preagreementPlace'
				//}
				]);
				var initValue = {
						'id' : '',
						'name' : '',
						'isWinner' : '',
						'winnerType' : '',
						'remark':''//,
						// 其它需要初始化的字段信息，如下
						//'preagreementPlace' : ''
						
					};
					var model = new MessageRecord(initValue);
					_gridPanel.stopEditing();
					_gridPanel.getStore().insert(0, model);
					_gridPanel.startEditing(0, 3);// 指定的行 列 进行单元格编辑
					model.dirty = true;
					model.modified = initValue;
					if (_gridPanel.getStore().modified.indexOf(model) == -1)
						_gridPanel.getStore().modified.push(model);
			};
			var addButton = ApplicationTool.button.init(addFn,'新建',true,'other','GuestExt','id');
			
			var editOrSaveFn = function(ids){
					var store = _gridPanel.getStore();
					var rowsData = [];
					var count = store.getCount();
					var record;
					for (var i = 0; i < count; i++) {
						record = store.getAt(i);
						if (record.dirty) {
							var canSave = true;
					//// 如果某字段在struts里isBlank设置为false，则需要做如下判断。
//					if (record.get('name') == null || record.get('name') == '') {
//						canSave = false;
//					} else {
//						Ext.MessageBox.alert('信息', '名称不能为空!');
//						return;
						if(canSave){
							rowsData.push(record.data);
						}					
						}
					}
					if (rowsData.length == 0) {
						store.reload();
						return;
					}
					Ext.Ajax.request({
						url : 'guest.do?method=saveOrUpdate',
						params : {
							data : Ext.encode(rowsData)// 以json格式传值给后台的
						},
						success : function() {
						
							store.reload();
						},
						failure : function() {
							Ext.MessageBox.alert('错误', '抱歉，系统出错，请与管理员联系，谢谢！');
						},
						timeout : 30000

					});
			
			};
			var editButton = ApplicationTool.button.init(editOrSaveFn,'保存',true,'other','GuestExt','id');
					
			var tbar=[addButton,'-',editButton,'-',deleteButton];
			var _gridPanel = new Ext.ux.grid.SimpleEditGrid({//创建对象的tab面板信息
					title :'GuestExt',
					id :'GuestExt',
					keyField:'id',
					url :'guest.do?method=list',					
					selectType :'check',
					isRowNum :'true',		
					width :700,
					height :500,
					tbar:tbar,
					//limitColumns:[0,1], //只显示id，sender，主键一定要加进去
					structure :struts			
				});		
			return _gridPanel;
		}
	};


