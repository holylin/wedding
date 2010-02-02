/**
 * 整个系统的布局对象。 author：holylin
 */
ApplicationMainExt = {
	// 当前被点击的功能菜单节点
	currentClickedTreeNode : null,
	// 构建顶部面板
	buildNorthPanel : function(items) {
		var northPanel = new Ext.Panel({
					region : 'north',
					border : false,
					style : 'margin-top:5px;',
					height : 100,
					items : items
				});
		return northPanel;

	},
	// 构建左边面板
	buildWestPanel : function() {
		// 一级模块功能树，可改造成多级模块功能树
		var tree = new Ext.tree.TreePanel({
					id : 'functionTreePanel',
					root : new Ext.tree.AsyncTreeNode({
								id : 'moduleRoot',
								text : '模块一'
							}),
					autoScroll : true,
					expanded : true,
					rootVisible : false,
					listeners : {
						'render' : function(tree) {
							tree.getRootNode().expand(true, false, function() {
										tree.getRootNode().eachChild(
												function(child) {
													child.expand();
												})
									});
						},
						'click' : ApplicationMainExt.reBuildPanelsOnTreeClick
					},
					loader : new Ext.tree.TreeLoader({
								dataUrl : 'functionTree.jsp'// 可改造成从后台加载树结构信息
							})
				});

		var westPanel = new Ext.Panel({
					title : "功能模块区",
					region : "west",
					width : 150,
					collapsed : false,
					split : true,
					collapsible : true,
					layoutConfig : {
						animate : true
					},
					layout : 'accordion',
					items : [{
								title : "模块一",
								items : [tree]
							}]
				});
		return westPanel;
	},
	// 构建中央面板
	buildCenterPanel : function(items) {
		var centerPanel = new Ext.Panel({
					id : 'centerPanel',
					region : "center",
					autoScroll : true,
					items : items
				});
		return centerPanel;

	},

	// 重新构建中央面板
	reBuildCenterPanel : function(items) {

		var centerPanel = Ext.getCmp('centerPanel');

		centerPanel.removeAll(true);
		centerPanel.add(items);
		centerPanel.doLayout();
	},

	// 构建右边面板
	buildEastPanel : function(items) {
		// 拼装右边面板
		var eastPanel = new Ext.Panel({
					id : 'eastPanel',
					region : "east",
					autoScroll : true,
					width : 180,
					items : items
				});
		return eastPanel;

	},

	// 重新构建右边面板
	reBuildEastPanel : function(items) {

		var eastPanel = Ext.getCmp('eastPanel');
		eastPanel.removeAll();
		eastPanel.add(items);
		eastPanel.doLayout();

	},
	// 构建底部面板
	buildSouthPanel : function(items) {

		var southPanel = new Ext.Panel({
					region : 'south',
					border : false,
					defaults : {
						bodyStyle : 'background: #DFEDFF'
					},
					height : 30,
					items : items
				});
		return southPanel;
	},
	// 点击左边功能菜单时重新构建面板（一般是中央和右边面板）
	reBuildPanelsOnTreeClick : function(node, event) {
		if (node.isLeaf()) {
			event.stopEvent();
			var extName = node.attributes.hrefTarget;
			var emptyItem = new Ext.Panel({});
			var items;
			// 在子panel里未定义要求的方法或定义了但是返回null，则都用空panel来填充父panel
			if (typeof eval(extName).init != 'undefined') {
				// 重构中央面板
				items = eval(extName).init();
				if (items != null)
					ApplicationMainExt.reBuildCenterPanel(items);
				else
					ApplicationMainExt.reBuildCenterPanel(emptyItem);

			} else {
				ApplicationMainExt.reBuildCenterPanel(emptyItem);
			}

			if (typeof eval(extName).buildEastPanelItems != 'undefined') {
				// 重构右边面板
				items = eval(extName).buildEastPanelItems();
				if (items != null)
					ApplicationMainExt.reBuildEastPanel(items);
				else
					ApplicationMainExt.reBuildEastPanel(emptyItem);
			} else {
				ApplicationMainExt.reBuildEastPanel(emptyItem);
			}

			ApplicationMainExt.currentClickedTreeNode = node;
		} else {
			node.toggle();
		}
	},
	// 初始化整个Viewport
	init : function() {

		new Ext.Viewport({
					id : 'applicationMainViewPort',
					enableTabScroll : true,
					layout : "border",
					items : [
							ApplicationMainExt.buildNorthPanel(northPanelItems),
							ApplicationMainExt.buildWestPanel(),
							ApplicationMainExt
									.buildCenterPanel(centerPanelItems),
							ApplicationMainExt.buildEastPanel(eastPanelItems),
							ApplicationMainExt.buildSouthPanel(southPanelItems)]
				});

	}
};

// 分别在不同的方法里构建各面板实际所需的items（最好放在不同的js文件的类方法里）
var northPanelItems = [{
			title : '顶部面板'
		}];
var centerPanelItems = [{
			title : '中间面板'
		}];
var eastPanelItems = [{
			title : '右边面板'
		}];
var southPanelItems = [{
			title : '底部面板'
		}];
