<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link href="<%=basePath%>/components/admin/css/bootstrap.min.css" rel="stylesheet" />
<link href="<%=basePath%>/components/admin/css/font-awesome.min.css" rel="stylesheet" />
<link href="<%=basePath%>/components/admin/css/animate.min.css" rel="stylesheet" />
<link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/components/admin/js/plugins/layer/skin/layer.css" />
<link href="<%=basePath%>/components/admin/css/style.min.css" rel="stylesheet" />
</head>
<body>

</body>
</html>