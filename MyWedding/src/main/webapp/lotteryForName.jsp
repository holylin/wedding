<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>开心抽奖</title>
<STYLE type="text/css" media="screen">
body {
	background-color: transparent;
	margin: 0px;
	padding: 0px;
	position: relative;
	height: 100%;
	width: 100%;
	font-family: "楷体";
	font-weight: 800;
	font-size: 1em;
}

img#background {
	height: 100%;
	width: 100%;
	z-index: -100000;
	position: absolute;
	color: white;
}

#item {
	width: 100px;
	height: 100px;
	margin: 0 auto;
	left: 50px;
	top: 220px;
	position: relative;
}

ul {
	list-style-type: none;
}
</STYLE>
</HEAD>
<BODY>
<img id="background" src="red.jpg">
<IMG id='resetButton' src="reset.gif">
<IMG id='startButton' class="arrow-left" src="startRun.gif" alt="">
<IMG id='stopButton' class="arrow-right" src="stopRun.gif" alt="">
<audio id="audio" src="sj.mp3" autoplay='true' playcount='100'>
您的浏览器不支持 audio 标签。
</audio>
<DIV id="item">
<UL>
	<c:forEach items="${guestsAvailableForLottery}" var="guest">
		<li style="width: 1.5em; float: right;"><a id='${guest.id}'
			ondblclick='rem(this,${guest.id});'>${guest.name}</a></li>
	</c:forEach>
</UL>
</DIV>


<SCRIPT type="text/javascript" src="./js/jquery-1.3.2.min.js"></SCRIPT>
<SCRIPT src="./js/3DEngine.js" type="text/javascript" charset="utf-8"></SCRIPT>
<SCRIPT src="./js/Ring.js" type="text/javascript" charset="utf-8"></SCRIPT>
<SCRIPT type="text/javascript">
	//<![CDATA[

	var camera = new Camera3D();
	camera.init(0, 0, 0, 300);

	var container = $("#item");

	var item = new Object3D(container);

	item.addChild(new Ring(250, $("#item ul li").length));

	var scene = new Scene3D();
	scene.addToScene(item);

	var offsetX = $("#item").offset().left;
	var offsetY = $("#item").offset().top;
	var speed = 0;
	var but = $('#startButton');
	var $but = $(but);
	var stopButton = $('#stopButton');
	var $stopButton = $(stopButton);
	var resetButton = $('#resetButton');
	var $resetButton = $(resetButton);
	var begin = false;
	var randomNum = parseInt(10 * Math.random());

	scene.renderCamera(camera);

	$but.click( function(e) {
		speed = 10000;
		begin = true;
		randomNum = parseInt(10 * Math.random());
		//$('#mp3').play();			
		});
	$stopButton.click( function(e) {
		begin = false;
	});

	$resetButton.click( function(e) {
		window.location.href = "guest.do?method=lotteryForName&lotteryFileName=lotteryForName.jsp";
	});

	axisRotation.x = 1.5;

	var animateIt = function() {
		if (begin) {
			speed -= randomNum + 90;
			axisRotation.y += (100 - offsetX - (container.width() / 2)) / speed;

			scene.renderCamera(camera);
		}

		if (speed < 200)
			begin = false;

	};

	setInterval(animateIt, 20);

	function rem(elem, id) {
		if (confirm("您确定此嘉宾已经中奖？")) {
			$
					.ajax( {
						url : "guest.do?method=markWhoWin",
						type : 'post',
						dataType : 'json',
						data : {
							id : id
						},
						timeout : 60000
					});
		}

	}

	//]]>
</SCRIPT>


</BODY>
</HTML>