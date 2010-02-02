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
<LINK rel="stylesheet" type="text/css" href="style2.css">
</HEAD>
<BODY>

<div id="gallery">
<div id="imagearea">
<div id="image"><a href="javascript:slideShow.nav(-1)"
	class="imgnav " id="previmg"></a> <a href="javascript:slideShow.nav(1)"
	class="imgnav " id="nextimg"></a></div>
</div>
<div id="thumbwrapper">
<div id="thumbarea">
<ul id="thumbs">
	<c:forEach items="${signInFilePaths}" var="filePath" varStatus="status">
		<li id='${filePath}' width="179" height="100" alt=""><IMG
			src="signin/${filePath}" width="179" height="100" alt=""></li>
	</c:forEach>
</ul>
</div>
</div>
</div>
<script type="text/javascript">
	var imgid = 'image';
	var imgdir = 'signin';
	var imgext = '.png';
	var thumbid = 'thumbs';
	var auto = true;
	var autodelay = 5;
</script>
<SCRIPT type="text/javascript" src="slide.js"></SCRIPT>

</BODY>
</HTML>