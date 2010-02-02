/**
 * ApplicationTool
 * 
 * @type {} Button fn : function函数 textName : Button的名称 isConfirm
 *       :代表要不要使用window.confirm()
 *       rowState:single代表只能单条数据，many代表可以多条数据，other代表一些弹出窗口（当然要自己写了）等
 *       gridId：针对要操作的grid的id keyParam：一般表示grid的主键
 */

var ApplicationTool = {};
ApplicationTool.button = {
	init : function(fn, textName, isConfirm, rowState, gridId, keyParam,jsName,operName) {
		var disabled=false;
//		var boo ;
//		if(roleResource&&roleResource.length>0&&jsName){
//			for(var i=0;i<roleResource.length;i++){
//				if(roleResource[i].role==_gobal_roleName){
//					for(var j=0;j<roleResource[i].resource.length;j++){				
//						if(jsName==roleResource[i].resource[j].name){
//							if(operName)
//								boo = eval('roleResource[i].resource[j].'+operName);					
//							break;
//						}
//					}
//					break;
//				}		
//			}
//		}
//		
//		if(boo==false){
//			disabled=true;
//		}
		var button = new Ext.Button({
			text : textName,
			disabled:disabled,
			listeners : {
				click : function() {
					if (rowState == 'single' || rowState == 'many') {
						var grid = Ext.getCmp(gridId);
						var selectionModel = grid.getSelectionModel();
						// 取得共选择了多少条记录。
						var selectedCount = selectionModel.getCount();
						var records = selectionModel.getSelections();
						var j = 0;
						var _ids = "";
						for (var i = 0; i < records.length; i++) {
							if (j != 0)
								_ids += ",";
							_ids += records[i].get(keyParam);
							j++;
						}
					}
					switch (rowState) {
						case 'single' :
							if (selectedCount == 0) {
								Ext.Msg.alert('操作', '请先选择您要操作的数据！');
							} else if (selectedCount == 1) {
								if (isConfirm) {
									Ext.Msg.confirm('操作', '您确认要使用这项操作吗？',
											function(btn, text) {
												if (btn == 'yes') {
													fn(_ids);

												} else {
													return;
												}
											});
								} else {
									fn(_ids);
								}
							} else {
								Ext.Msg.alert('操作', '对不起，只能选择一条数据进行操作！');
							}

							break;
						case 'many' :
							if (selectedCount == 0) {
								Ext.Msg.alert('操作', '请先选择您要操作的数据！');
							} else {
								if (isConfirm) {
									Ext.Msg.confirm('操作', '您确认要使用这项操作吗？',
											function(btn, text) {
												if (btn == 'yes') {
													fn(_ids);
												} else {
													return;
												}
											});
								} else {
									fn(_ids);
								}
							}

							break;
						default :
							fn();
							break;
					}
				}
			}
		});
		return button;
	}
};
/**
 * @type {} Window isModal true表示掩盖弹出窗口后面的页面，false为不掩盖
 */
ApplicationTool.window = {
	init : function(title, width, isModal) {
		return new Ext.Window({
			layout : 'fit',
			width : width,
			title : title,
			autoHeight : true,
			autoScroll : true,
			// closeAction : 'hide',
			border : false,
			modal : isModal,
			plain : true,
			closable : true,
			resizable : false,
			margin : '0 0 0 0'
		});
	}
};

ApplicationTool.panel = {
	init : function(id, title, width, isClose) {
		return new Ext.Panel({
			id : id,
			title : title == null ? '' : title,
			width : width,
			autoHeight : true,
			collapsible : isClose
		});
	}
};

/**
 * form 表单的date name表示<input name="xxx"> 里的xxx
 * 
 */
ApplicationTool.date = {
	init : function(fieldLabel, name, format) {
		return new Ext.form.DateField({
			fieldLabel : fieldLabel,
			name : name,
			id : name,
			anchor : '90%',
			format : format ? format : 'Y-m-d'
		});
	}
};

// global Ajax
Ext.Ajax.timeout = 80000;
Ext.Ajax.on('requestcomplete', function(conn, response, options) {
	// alert(response.getResponseHeader.sessionstatus);
	if (response.getResponseHeader) {
		if (typeof response.getResponseHeader.sessionstatus != 'undefined') {
			// 发现请求超时，退出处理代码...
			alert('对不起，页面过期，请重新登陆!');
			window.location.href = 'login.jsp';
		}
	}
		// if (response.status == 0) {
		// alert('对不起,服务器已关闭！请联系管理员。');
		// return;
		// }
	}, this);
Ext.Ajax.on('requestexception', function(conn, response, options) {
	// alert(options);
	// alert(response.status);
	if (response.status == 0) {
		alert('对不起,网络忙，请稍后重试！');
		return;
	}

}, this);

var tipMsgCommon = function(response, divId) {
	divId = divId ? divId : 'tip_hasoper_state'
	document.getElementById(divId).style.display = "block";
	
	var res = Ext.util.JSON.decode(response.responseText);
	
	if (response.responseText == ' ' || !response.responseText)
		msg = '提示：<br/>&nbsp;&nbsp;&nbsp;&nbsp;操作<font color="red" >失败</font>！';
	else if(!res.success)
		//Ext.Msg.alert('操作', res.msg);
		msg = '提示：<br/>&nbsp;&nbsp;&nbsp;&nbsp;<font color="red" >'+res.msg+'</font>';
	else
		msg = '提示：<br/>&nbsp;&nbsp;&nbsp;&nbsp;操作<font color="red" >成功</font>！';

	document.getElementById(divId).innerHTML = msg;
	setTimeout(function() {
		document.getElementById(divId).innerHTML = "";
		document.getElementById(divId).style.display = "none";
	}, 2000);
}

var setCookieFn = function(name, value, days)// 两个参数，一个是cookie的名子，一个是值
{
	var Days = days ? days : 30; // 此 cookie 将被保存 30 天
	var exp = new Date(); // new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}

var getCookieFN = function(name)// 取cookies函数
{
	var arr = document.cookie
			.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;
}

var delCookieFN = function(name)// 删除cookie
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookieFN(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

var getSumPoint = function(pointBut,customerId, functionId) {
	functionId=functionId?functionId:102;
	Ext.Ajax.request({
		url : 'clubCard.do?method=getSumPoint&functionId='
				+ functionId
				+ '&customerId=' +customerId,
		success : function(response) {
			var responseText = Ext.decode(response.responseText);
			if (responseText.isClubCard&&pointBut)
				pointBut.setText('总积分：' + responseText.totalPoint+'  :::  本4s店积分：'+responseText.msg);
			else
				pointBut.setText('');

		}
	});
}