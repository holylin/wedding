Ext.namespace("Ext.ux.form");
Ext.ux.form.SimpleCombo = Ext.extend(Ext.form.ComboBox, {
			/*
			 * modeState=local 格式
			 * {name:"name",label:"姓名",emptyText:'请选择....',data:[['male','男'],['female','女']]}
			 * name为表单中的name； label为名称, data是 键值对
			 * 
			 * modeState=remote
			 * 格式{name:"name",label:"姓名",emptyText:'请选择....',data:[key,value]}
			 * data 的 key-value 对应 数据库的字段
			 */
			structure : '',
			modeState : 'local',// local表示直接读Array里的数据，remote表示要通过后台，来读数据
			url : '',// modeState = remote 时 设置
			keyId : '',// modeState = remote 时 设置 主键
			anchor : '100%',
			xtype : 'combo',
			readOnly : true,
			mode : 'local',
			triggerAction : 'all',
			displayField : 'value',
			valueField : 'key',
			allowBlank : false,
			value : '',
			initComponent : function() {
				if (this.structure != '') {
					this.initStructure();
				}
				Ext.ux.form.SimpleCombo.superclass.initComponent.call(this);
			},
			initStructure : function() {
				var ds;
				this.hiddenName = this.structure.name;
				this.fieldLabel = this.structure.label;
				this.emptyText = this.structure.emptyText;
				var isAllow = this.structure.allowBlank;
				this.allowBlank = (isAllow == undefined || isAllow)
						? true
						: false;
				this.value = this.structure.value;
				if (this.modeState == 'local') {
					ds = new Ext.data.SimpleStore({
								fields : ['key', 'value'],
								data : this.structure.data
							});
				} else {
					ds = new Ext.data.Store({
								autoLoad : true,
								proxy : new Ext.data.HttpProxy({
											url : this.url
										}),
								reader : new Ext.data.JsonReader({
											root : 'root', // json格式数据必须root：{}的格式
											id : this.keyId
										}, [{
													name : 'key',
													mapping : this.structure.data[0]
												}, {
													name : 'value',
													mapping : this.structure.data[1]
												}])
							});
				}
				this.store = ds;
			}
		});
