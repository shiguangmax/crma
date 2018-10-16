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
<script src="<%=basePath%>/components/admin/js/jquery.min.js"></script>
<script src="<%=basePath%>/components/admin/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/components/admin/js/plugins/validate/jquery.validate.min.js"></script>
<script src="<%=basePath%>/components/admin/js/plugins/layer/layer.min.js"></script>
<script src="<%=basePath%>/components/admin/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="<%=basePath%>/components/admin/js/contabs-ext.js"></script>
</head>
<body>

</body>
</html>