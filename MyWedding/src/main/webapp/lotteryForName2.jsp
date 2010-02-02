<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>开心抽奖</title>
<STYLE type="text/css" media="screen">
#item {
	width: 100px;
	height: 100px;
	margin: 0 auto;
	top: 300px;
	position: relative;
}

ul {
	list-style-type: none;
}

body {
	background-color: #111;
	color: #69c;
	font-family: Arial, "MS Trebuchet", sans-serif;
	font-weight: bold;
	font-size: 2em;
}
</STYLE>
</HEAD>
<BODY>
<audio id="audio" src="sj.mp3" autoplay='true'>
您的浏览器不支持 audio 标签。
</audio>
<input id='button' type=button value='开始抽奖'>
<DIV id="item">
<c:forEach items="${guestsAvailableForLottery}" var="guest">
			<B id="item${guest.id}" ondblclick='rem(this,${guest.id});'  style="width: 1.5em; float: right;">${guest.name}</B>
	</c:forEach>

</DIV>


<SCRIPT type="text/javascript" src="./js/jquery-1.3.2.min.js"></SCRIPT>
<SCRIPT src="3DEngine.js" type="text/javascript" charset="utf-8"></SCRIPT>
<SCRIPT src="Sphere.js" type="text/javascript" charset="utf-8"></SCRIPT>
<SCRIPT type="text/javascript">
	//<![CDATA[

	$(document).ready( function() {

		var camera = new Camera3D();
		camera.init(0, 0, 0, 400);

		var container = $("#item")

		var item = new Object3D(container);

		item.addChild(new Sphere(300, 30, 200));

		var scene = new Scene3D();
		scene.addToScene(item);

		var mouseX, mouseY = 0;
		var offsetX = $("#item").offset().left;
		var offsetY = $("#item").offset().top;
		var speed = 6000;

		$().mousemove( function(e) {
			mouseX = e.clientX - offsetX - (container.width() / 2);
			mouseY = e.clientY - offsetY - (container.height() / 2);
		});

		var animateIt = function() {
			if (mouseX != undefined) {
				axisRotation.y += (mouseX) / speed
			}
			if (mouseY != undefined) {
				axisRotation.x -= mouseY / speed;
			}

			scene.renderCamera(camera);

		};

		setInterval(animateIt, 20);

	});
	//]]>
</SCRIPT>


</BODY>
</HTML>