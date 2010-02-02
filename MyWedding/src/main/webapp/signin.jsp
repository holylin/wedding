<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.tradeserving.wedding.tool.*"%>
<%
	String rootDir = request.getSession().getServletContext()
			.getRealPath("");
	GuiCamera cam = new GuiCamera(rootDir + "/signin/" + "", "jpg");//

	cam.snapShot();
	response.getWriter().print("{success:true}");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>嘉宾签到</title>
</head>
<body>
</body>
</html>