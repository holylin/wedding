<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查看嘉宾签到</title>
<STYLE type="text/css">
html {
	overflow: hidden;
}

body {
	margin: 0px;
	padding: 0px;
	background: #000;
	width: 100%;
	height: 100%;
}
.reset {
	position: absolute;
	left: 5px;
	top: 5px;
	z-index: 1001;
}

#imageFlow {
	position: absolute;
	width: 100%;
	height: 80%;
	left: 0%;
	top: 10%;
	background: #000;
}

#imageFlow .diapo {
	position: absolute;
	left: -1000px;
	cursor: pointer;
	-ms-interpolation-mode: nearest-neighbor;
}

#imageFlow .link {
	border: dotted #fff 1px;
	margin-left: -1px;
	margin-bottom: -1px;
}

#imageFlow .bank {
	visibility: hidden;
}

#imageFlow .top {
	position: absolute;
	width: 100%;
	height: 40%;
	background: #181818;
}



#imageFlow .text {
	position: absolute;
	left: 0px;
	width: 100%;
	bottom: 16%;
	text-align: center;
	color: #FFF;
	font-family: verdana, arial, Helvetica, sans-serif;
	z-index: 1000;
}

#imageFlow .title {
	font-size: 0.9em;
	font-weight: bold;
}

#imageFlow .legend {
	font-size: 0.8em;
}

#imageFlow .scrollbar {
	position: absolute;
	left: 10%;
	bottom: 10%;
	width: 80%;
	height: 16px;
	z-index: 1000;
}

#imageFlow .track {
	position: absolute;
	left: 1%;
	width: 98%;
	height: 16px;
	filter: alpha(opacity =           30);
	opacity: 0;
}

#imageFlow .arrow-left {
	position: absolute;
	left: 25%;
}



#imageFlow .arrow-right {
	position: absolute;
	right: 25%;
}

#imageFlow .bar {
	position: absolute;
	height: 16px;
	left: 25px;
	opacity: 0;
	
}
</STYLE>
<script type="text/javascript" src="js/jquery.js"></script>
<SCRIPT type="text/javascript">
	var tempView;
	var runAgent;
	var runInc = -1;
	var step = 0;
	var imgLength;
	var canRun = false;
	var initialStep = 0;
	var imageFlowLoad;
	var diaposTemp;
	function initial(runner) {
		if (0 <= initialStep && initialStep < parseInt(Math.random()*imgLength+1)) {
			initialStep += 1;
			runner.calc(-1);
			initial(runner);

		} else {
			canRun = false;
			initialStep = 0;
		}

	}
	function runCalc(num) {
		if (imgLength > 100) {
			if (0 <= step && step < Math.round(imgLength / 2)) {
				if (step == 0)
					runAgent = setInterval('runCalc(runInc);', 100);
				step += 1;
				tempView.calc(num);

			} else if (Math.round(imgLength / 2) <= step
					&& step < (Math.round(imgLength / 2) + 3)) {
				if (step == Math.round(imgLength / 2)) {
					clearInterval(runAgent);
					runAgent = setInterval('runCalc(runInc);', 2000);
				}
				step += 1;
				tempView.calc(num);
			} else {
				clearInterval(runAgent);
				canRun = false;
				step = 0;
			}
		} else {
			if (0 <= step && step < (imgLength + 10)) {
				if (step == 0)
					runAgent = setInterval('runCalc(runInc);', 100);
				step += 1;
				tempView.calc(num);

			} else if (imgLength + 10 <= step && step < (imgLength + 13)) {
				if (step == imgLength + 10) {
					clearInterval(runAgent);
					runAgent = setInterval('runCalc(runInc);', 2000);
				}
				step += 1;
				tempView.calc(num);
			} else {
				clearInterval(runAgent);
				canRun = false;
				step = 0;
			}
		}
	}
	var imf = function() {
		var lf = 0;
		var instances = [];
		function getElementsByClass(object, tag, className) {
			var o = object.getElementsByTagName(tag);
			for ( var i = 0, n = o.length, ret = []; i < n; i++)
				if (o[i].className == className)
					ret.push(o[i]);
			if (ret.length == 1)
				ret = ret[0];
			return ret;
		}
		function addEvent(o, e, f) {
			if (window.addEventListener)
				o.addEventListener(e, f, false);
			else if (window.attachEvent)
				r = o.attachEvent('on' + e, f);
		}
		function createReflexion(cont, img) {
			var flx = false;
			if (document.createElement("canvas").getContext) {
				flx = document.createElement("canvas");
				flx.width = img.width;
				flx.height = img.height;
				flx.id = "canvas_"
						+ img.src.split('/')[img.src.split('/').length - 1];
				var context = flx.getContext("2d");
				context.translate(0, img.height);
				context.scale(1, -1);
				context.drawImage(img, 0, 0, img.width, img.height);
				context.globalCompositeOperation = "destination-out";
				var gradient = context.createLinearGradient(0, 0, 0,
						img.height * 2);
				gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
				gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
				context.fillStyle = gradient;
				context.fillRect(0, 0, img.width, img.height * 2);
			} else {
				/* ---- DXImageTransform ---- */
				flx = document.createElement('img');
				flx.src = img.src;
				flx.style.filter = 'flipv progid:DXImageTransform.Microsoft.Alpha(' + 'opacity=50, style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=' + (img.height * .25) + ')';
			}
			/* ---- insert Reflexion ---- */
			flx.style.position = 'absolute';
			flx.style.left = '-2000px';
			cont.appendChild(flx);
			return flx;
		}

		/* //////////// ==== ImageFlow Constructor ==== //////////// */
		function ImageFlow(oCont, size, zoom, border) {
			this.diapos = [];
			this.scr = false;
			this.size = size;
			this.zoom = zoom;
			this.bdw = border;
			this.oCont = oCont;
			this.oc = document.getElementById(oCont);
			this.scrollbar = getElementsByClass(this.oc, 'div', 'scrollbar');
			this.text = getElementsByClass(this.oc, 'div', 'text');
			this.title = getElementsByClass(this.text, 'div', 'title');
			this.legend = getElementsByClass(this.text, 'div', 'legend');
			this.bar = getElementsByClass(this.oc, 'img', 'bar');
			this.arL = getElementsByClass(this.oc, 'img', 'arrow-left');
			this.arR = getElementsByClass(this.oc, 'img', 'arrow-right');
			this.bw = this.bar.width;
			this.alw = this.arL.width - 5;
			this.arw = this.arR.width - 5;
			this.bar.parent = this.oc.parent = this;
			this.arL.parent = this.arR.parent = this;
			this.view = this.back = -1;
			this.resize();
			this.oc.onselectstart = function() {
				return false;
			}
			/* ---- create images ---- */
			var img = getElementsByClass(this.oc, 'div', 'bank')
					.getElementsByTagName('a');
			this.NF = img.length;
			imgLength = img.length;
			for ( var i = 0, o; o = img[i]; i++) {
				this.diapos[i] = new Diapo(this, i, o.rel, o.title || '- ' + i
						+ ' -', o.innerHTML || o.rel, o.href || '',
						o.target || '_self');
			}

			diaposTemp = this.diapos;
			/* ==== add mouse wheel events ==== */
			if (window.addEventListener)
				this.oc.addEventListener('DOMMouseScroll', function(e) {
					this.parent.scroll(-e.detail);
				}, false);
			else
				this.oc.onmousewheel = function() {
					this.parent.scroll(event.wheelDelta);
				}
				/* ==== Left arrow ==== */
			this.arL.onclick = this.arL.ondblclick = function() {

				canRun = true;
				tempView = this.parent;
				var a = parseInt(Math.random()*10);
				if(a%2==0){
					runInc = 1;
					runCalc(runInc);
				}
				else{
					runInc = -1;
					runCalc(runInc);
				}

			}

			this.arR.onclick = this.arR.ondblclick = function() {

				stopRun();

			}
		}

		/* //////////// ==== ImageFlow prototype ==== //////////// */
		ImageFlow.prototype = {
			/* ==== targets ==== */
			calc : function(inc) {
				if (canRun) {
					if (inc)
						this.view += inc;
					var tw = 0;
					var lw = 0;
					var o = this.diapos[this.view];
					if (o && o.loaded) {
						/* ---- reset ---- */
						var ob = this.diapos[this.back];
						if (ob && ob != o) {
							ob.img.className = 'diapo';
							ob.z1 = 1;
						}
						/* ---- update hyperlink ---- */
						if (o.url) {
							o.img.className = 'diapo link';
							window.status = 'hyperlink: ' + o.url;
						} else {
							o.img.className = 'diapo';
							window.status = '';
						}
						/* ---- calculate target sizes & positions ---- */
						o.w1 = Math.min(o.iw, this.wh * .5) * o.z1;
						var x0 = o.x1 = (this.wh * .5) - (o.w1 * .5);
						var x = x0 + o.w1 + this.bdw;
						for ( var i = this.view + 1, o; o = this.diapos[i]; i++) {
							if (o.loaded) {
								o.x1 = x;
								o.w1 = (this.ht / o.r) * this.size;
								x += o.w1 + this.bdw;
								tw += o.w1 + this.bdw;
							}
						}
						x = x0 - this.bdw;
						for ( var i = this.view - 1, o; o = this.diapos[i]; i--) {
							if (o.loaded) {
								o.w1 = (this.ht / o.r) * this.size;
								o.x1 = x - o.w1;
								x -= o.w1 + this.bdw;
								tw += o.w1 + this.bdw;
								lw += o.w1 + this.bdw;
							}
						}
						/* ---- move scrollbar ---- */
						if (!this.scr && tw) {
							var r = (this.ws - this.alw - this.arw - this.bw)
									/ tw;
							this.bar.style.left = Math.round(this.alw + lw * r) + 'px';
						}
						/* ---- save preview view ---- */
						this.back = this.view;
					} else {
						if (runInc > 0) {
							runInc = runInc - 2;
							runCalc(runInc);
						} else {
							if (tempView) {
								runInc = runInc + 2;
								runCalc(runInc);
							}
						}
					}
				}
			},
			/* ==== mousewheel scrolling ==== */
			scroll : function(sc) {
				if (sc < 0) {
					if (this.view < this.NF - 1)
						this.calc(1);
				} else {
					if (this.view > 0)
						this.calc(-1);
				}
			},
			/* ==== resize  ==== */
			resize : function() {
				this.wh = this.oc.clientWidth;
				this.ht = this.oc.clientHeight;
				this.ws = this.scrollbar.offsetWidth;
				this.calc();
				this.run(true);
			},
			/* ==== move all images  ==== */
			run : function(res) {
				var i = this.NF;
				while (i--)
					this.diapos[i].move(res);

			}
		}
		/* //////////// ==== Diapo Constructor ==== //////////// */
		Diapo = function(parent, N, src, title, text, url, target) {
			this.parent = parent;
			this.loaded = false;
			this.title = title;
			this.text = text;
			this.url = url;
			this.target = target;
			this.N = N;
			this.img = document.createElement('img');
			this.img.src = src;
			this.img.parent = this;
			this.img.className = 'diapo';
			this.img.id = src.split("/")[src.split("/").length - 1];
			this.x0 = this.parent.oc.clientWidth;
			this.x1 = this.x0;
			this.w0 = 0;
			this.w1 = 0;
			this.z1 = 1;
			this.img.parent = this;
			this.img.onclick = function() {
				this.parent.click();
			}
			this.parent.oc.appendChild(this.img);
			/* ---- display external link ---- */
			if (url) {
				this.img.onmouseover = function() {
					this.className = 'diapo link';
				}
				this.img.onmouseout = function() {
					this.className = 'diapo';
				}
			}
		}
		/* //////////// ==== Diapo prototype ==== //////////// */
		Diapo.prototype = {
			/* ==== HTML rendering ==== */
			move : function(res) {
				if (this.loaded) {
					var sx = this.x1 - this.x0;
					var sw = this.w1 - this.w0;
					if (Math.abs(sx) > 2 || Math.abs(sw) > 2 || res) {
						/* ---- paint only when moving ---- */
						this.x0 += sx * .1;
						this.w0 += sw * .1;
						if (this.x0 < this.parent.wh && this.x0 + this.w0 > 0) {
							/* ---- paint only visible images ---- */
							this.visible = true;
							var o = this.img.style;
							var h = this.w0 * this.r;
							/* ---- diapo ---- */
							o.left = Math.round(this.x0) + 'px';
							o.bottom = Math.floor(this.parent.ht * .25) + 'px';
							o.width = Math.round(this.w0) + 'px';
							o.height = Math.round(h) + 'px';
							/* ---- reflexion ---- */
							if (this.flx) {
								var o = this.flx.style;
								o.left = Math.round(this.x0) + 'px';
								o.top = Math.ceil(this.parent.ht * .75 + 1) + 'px';
								o.width = Math.round(this.w0) + 'px';
								o.height = Math.round(h) + 'px';
							}
						} else {
							/* ---- disable invisible images ---- */
							if (this.visible) {
								this.visible = false;
								this.img.style.width = '0px';
								if (this.flx)
									this.flx.style.width = '0px';
							}
						}
					}
				} else {
					/* ==== image onload ==== */
					if (this.img.complete && this.img.width) {
						/* ---- get size image ---- */
						this.iw = this.img.width;
						this.ih = this.img.height;
						this.r = this.ih / this.iw;
						this.loaded = true;
						/* ---- create reflexion ---- */
						this.flx = createReflexion(this.parent.oc, this.img);
						if (this.parent.view < 0)
							this.parent.view = this.N;
						this.parent.calc();
					}
				}

			},
			/* ==== diapo onclick ==== */
			click : function() {
				if (this.parent.view == this.N) {
					/* ---- click on zoomed diapo ---- */
					if (this.url) {
						/* ---- open hyperlink ---- */
						window.open(this.url, this.target);
					} else {
						/* ---- zoom in/out ---- */
						this.z1 = this.z1 == 1 ? this.parent.zoom : 1;
						this.parent.calc();
					}
				} else {
					/* ---- select diapo ---- */
					this.parent.view = this.N;
					this.parent.calc();
				}
				return false;
			}
		}
		/* //////////// ==== public methods ==== //////////// */
		return {
			/* ==== initialize script ==== */
			create : function(div, size, zoom, border) {
				/* ---- instanciate imageFlow ---- */
				var load = function() {
					var loaded = false;
					var i = instances.length;
					while (i--)
						if (instances[i].oCont == div)
							loaded = true;
					if (!loaded) {
						canRun = true;
						/* ---- push new imageFlow instance ---- */
						instances.push(new ImageFlow(div, size, zoom, border));
						/* ---- init script (once) ---- */
						if (!imf.initialized) {
							imf.initialized = true;
							/* ---- window resize event ---- */
							addEvent(window, 'resize', function() {
								var i = instances.length;
								while (i--)
									instances[i].resize();
							});
							/* ---- stop drag N drop ---- */
							addEvent(
									document.getElementById(div),
									'mouseout',
									function(e) {
										if (!e)
											e = window.event;
										var tg = e.relatedTarget || e.toElement;
										if (tg && tg.tagName == 'HTML') {
											var i = instances.length;
											while (i--)
												instances[i].oc.onmousemove = null;
										}
										return false;
									});
							/* ---- set interval loop ---- */
							setInterval( function() {
								var i = instances.length;
								while (i--)
									instances[i].run();
							}, 16);

							setTimeout( function() {
								var i = instances.length;
								while (i--)
									initial(instances[i]);
							}, 1000);
						}
					}
				}

				/* ---- window onload event ---- */
				addEvent(window, 'load', function() {
					load();
				});
			}
		}
	}();
	/* ==== create imageFlow ==== */
	//          div ID    , size, zoom, border
	imf.create("imageFlow", 0.15, 1.5, 10);

	function markWhoWin(hrefObjId) {
		if (confirm("您确定此嘉宾已经中奖？")) {

			jQuery.post('control.do?method=moveWinnerSignPicture', {
				winnerPictureName : hrefObjId
			}, function(data, textStatus) {
				if (data.success) {
					$("img[src='signin/" + hrefObjId + "']").remove();
					$("canvas[id='canvas_" + hrefObjId + "']").remove();
				} else {
					alert("系统出错，请联系开发商!");
				}
			}, 'json')
		}

	}

	function resetPlay(){
		window.location.href = 'control.do?method=getWholeSigninFilePaths';
	}

	function stopRun(){
		setTimeout('clearInterval(runAgent);canRun = false;step = 0;',1000);		
	}
	
</SCRIPT>
</HEAD>
<BODY>
<IMG
	class="reset" src="reset.gif"  onclick='resetPlay();'>
<DIV id="imageFlow">
<DIV class="top"></DIV>
<DIV class="bank"><c:forEach items="${signInFilePaths}"
	var="filePath">
	<A id='${filePath}' rel="signin/${filePath}"
		href="javascript:markWhoWin('${filePath}');" ></A>
</c:forEach></DIV>
<DIV class="text">
<DIV class="title"></DIV>
<DIV class="legend"></DIV>
</DIV>
<DIV class="scrollbar"><IMG class="track"
	src="./cool flow image_files/sb.gif" alt=""> <IMG
	class="arrow-left" src="startRun.gif" alt=""> <IMG
	class="arrow-right" src="stopRun.gif" alt="">
<IMG class="bar" src="./cool flow image_files/sc.gif" alt=""
	style="left: 238px;"></DIV>
</BODY>
</HTML>