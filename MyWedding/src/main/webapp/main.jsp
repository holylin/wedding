<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- 引入Ext所需的css-->
<link rel="stylesheet" href="js/ext/ext2/resources/css/ext-all.css"
	type="text/css"></link>
<!-- 引入自定义的css -->
<link rel="stylesheet" href="css/main.css" type="text/css"></link>
<title>欢迎使用xxx系统</title>
</head>
<body style="font-size: 12px">
<script type="text/javascript">
	window.onload = function() {
		setTimeout(
				function() {
					document.getElementById('loading').style.visibility = "hidden";
					document.getElementById('loading-mask').style.visibility = "hidden";
				}, 250);
	}
</script>
<div id="loading-mask" style=""></div>
<div id="loading">
<div class="loading-indicator">欢迎使用xxxx系统！<br />
<br />
<img src="js/ext/ext2/resources/images/extanim32.gif" width="32" height="32"
	style="margin-right: 8px; float: left; vertical-align: top;" /><span
	id="loading-msg">请稍等，系统登录中 .....</span></div>
</div>

<!--Ext所需的js -->
<script type="text/javascript" src="js/ext/AllExtAndTools.js"></script>

<!--业务逻辑所需的js -->
<script type="text/javascript" src="pages/AllBusinesses.js"></script>
<script type="text/javascript" src="pages/business/guest/js/GuestExt.js"></script>
<!--FillMe-->

<!-- 整个系统布局js -->
<script type="text/javascript" src="main.js"></script>

<script type="text/javascript">
	//全局js变量定义处
	var _gobal_userName = "";
	Ext.onReady( function() {
		ApplicationMainExt.init();
	});
</script>

</body>
</html>