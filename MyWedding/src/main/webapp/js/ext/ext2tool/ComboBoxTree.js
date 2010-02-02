Ext.namespace("Ext.ux.ComboBoxTree");
Ext.ux.ComboBoxTree = function() {
	this.treeId = Ext.id() + '-tree';
	this.maxHeight = arguments[0].maxHeight || arguments[0].height
			|| this.maxHeight;
	this.tpl = new Ext.Template('<tpl for="."><div style="height:'
			+ this.maxHeight + 'px"><div id="' + this.treeId
			+ '"></div></div></tpl>');
	this.store = new Ext.data.SimpleStore( {
		fields : [],
		data : [ [] ]
	});
	this.selectedClass = '';
	this.mode = 'local';
	this.triggerAction = 'all';
	this.onSelect = Ext.emptyFn;
	this.someFn = Ext.emptyFn;	
	this.editable = false;
	this.isAllTimeReLoad=true,//当expand时，一直刷新tree
	// all:所有结点都可选中
	// exceptRoot：除根结点，其它结点都可选
	// folder:只有目录（非叶子和非根结点）可选
	// leaf：只有叶子结点可选
	this.selectNodeModel = arguments[0].selectNodeModel || 'exceptRoot';
	this.gridId='';
	this.record;	
	this.rootVisible = false;
	this.listWidth = 300;
	Ext.ux.ComboBoxTree.superclass.constructor.apply(this, arguments);
}

Ext
		.extend(
				Ext.ux.ComboBoxTree,
				Ext.form.ComboBox,
				{
					listWidth : this.listWidth,
					expand : function() {
						Ext.ux.ComboBoxTree.superclass.expand.call(this);
						var gridId =this.gridId;
						if(gridId!=''){
							var grid=Ext.getCmp(gridId);
							var selectMod = grid.getSelectionModel();
							this.record = selectMod.getSelected();
						}
						if (!this.tree.rendered) {
							this.tree.height = this.maxHeight;
							this.tree.border = false;
							this.tree.autoScroll = true;
							this.tree.rootVisible = this.rootVisible;
							if (this.tree.xtype) {
								this.tree = Ext.ComponentMgr.create(this.tree,
										this.tree.xtype);
							}
							this.tree.render(this.treeId);
							var combox = this;
							this.tree.on('click',
									function(node) {
										var isRoot = (node == combox.tree
												.getRootNode());
										var selModel = combox.selectNodeModel;
										var isLeaf = node.isLeaf();
										if (isRoot && selModel != 'all') {
											return;
										} else if (selModel == 'folder'
												&& isLeaf) {
											return;
										} else if (selModel == 'leaf'
												&& !isLeaf) {
											return;
										}
										combox.setValue(node);
										combox.collapse();
									});
							var root = this.tree.getRootNode();
							if (!root.isLoaded())
								root.reload();
						}
						if(this.isAllTimeReLoad)
							this.tree.getRootNode().reload();
					},

					setValue : function(node) {
						var text = node.text;
						this.lastSelectionText = text;
						Ext.form.ComboBox.superclass.setValue.call(this, text);
						this.hiddenId = node.id;
						this.value = text;
						this.valueField=text;

					},

					getValue : function() {
						return typeof this.value != 'undefined' ? this.value
								: '';
					},
					getKey : function() {
						return typeof this.hiddenId != 'undefined' ? this.hiddenId
								: '';
					},
					getGrid:function(){
						
						return record
					}
				});

Ext.reg('combotree', Ext.ux.ComboBoxTree);