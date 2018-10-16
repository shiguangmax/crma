<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	    <meta charset="utf-8" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta content="" name="description" />
	    <title>首页</title>
	    <jsp:include page="../common/header.jsp"/>
	    <link href="<%=basePath%>/components/admin/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
	</head>

	<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
		<div id="wrapper">
			<!--左侧导航开始-->
			<nav class="navbar-default navbar-static-side" role="navigation">
				<div class="nav-close"><i class="fa fa-times-circle"></i>
				</div>
				<div class="sidebar-collapse">
					<ul class="nav" id="side-menu" style="display:none">
						<li class="nav-header">
							<div class="dropdown profile-element">
								<span><img alt="image" class="img-circle" src="<%=basePath%>/components/admin/img/profile_small3.jpg" height="64px" width="64px"/></span>
								<a data-toggle="dropdown" class="dropdown-toggle" href="#">
									<span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold">${admin.username}</strong></span>
									<span class="text-muted text-xs block">${admin.nickname}<b class="caret"></b></span>
									</span>
								</a>
								<ul class="dropdown-menu animated fadeInRight m-t-xs">
									<li>
										<a href="javascript:void(0)" id="repass"></a>
									</li>
									<li>
										<a href="javascript:void(0)" id="logout">退出登录</a>
									</li>
								</ul>
							</div>
						</li>
						<li>
						<li>
							<a href="#">
								<i class="fa fa-user"></i>
								<span class="nav-label">用户管理</span>
								<span class="fa arrow"></span>
							</a>
							<ul class="nav nav-second-level">
								<shiro:hasPermission name="admin:system:user">
								<li>
									<a class="J_menuItem" href="<%=basePath%>/admin/user/userlist.do" title="对系统后台的用户进行增删改查">用户管理</a>
								</li>
		                        </shiro:hasPermission>
								<shiro:hasPermission name="admin:system:auth">
								<li>
									<a class="J_menuItem" href="<%=basePath%>/admin/auth/authlist.do" title="配置系统中所有权限">权限管理</a>
								</li>
		                        </shiro:hasPermission>
								<shiro:hasPermission name="admin:system:role">
								<li>
									<a class="J_menuItem" href="<%=basePath%>/admin/role/rolelist.do" title="配置系统中所有角色及其与权限的绑定关系">角色管理</a>
								</li>
		                        </shiro:hasPermission>
		                        
		                   		<shiro:hasPermission name="admin:system:role">
								<li>
									
									<a class="J_menuItem" href="<%=basePath%>/admin/role/rolelist.do" title="配置系统中所有角色及其与权限的绑定关系">超级管理</a>
									
								</li>
		                        </shiro:hasPermission>                     
							</ul>
						</li>
						<!--------------------------------- 新添加 --------------------------------->
						<li>
							<a href="#">
								<i class="fa fa-user"></i>
								<span class="nav-label">新用户管理</span>
								<span class="fa arrow"></span>
							</a>
							<ul class="nav nav-second-level">
								<shiro:hasPermission name="admin:system:user">
								<li>
									<a class="J_menuItem" href="<%=basePath%>/admin/user/vip/userlist.do" title="对系统后台的用户进行增删改查">用户</a>
								</li>
		                        </shiro:hasPermission>
								<shiro:hasPermission name="admin:system:auth">
								<li>
									<a class="J_menuItem" href="<%=basePath%>/admin/auth/authlist.do" title="配置系统中所有权限">权限</a>
								</li>
		                        </shiro:hasPermission>
								<shiro:hasPermission name="admin:system:role">
								<li>
									<a class="J_menuItem" href="<%=basePath%>/admin/role/rolelist.do" title="配置系统中所有角色及其与权限的绑定关系">角色</a>
								</li>
		                        </shiro:hasPermission>
		                        
		                   		<shiro:hasPermission name="admin:system:role">
								<li>
									
									<a class="J_menuItem" href="<%=basePath%>/admin/role/rolelist.do" title="配置系统中所有角色及其与权限的绑定关系">管理</a>
									
								</li>
		                        </shiro:hasPermission>
		                        
		                        <!-- 新添加 -->
		                       <shiro:hasPermission name="admin:system:role">
								<li>
									
									<a class="J_menuItem" href="<%=basePath%>/admin/role/rolelist.do" title="配置系统中所有角色及其与权限的绑定关系">新管理</a>
									
								</li>
		                        </shiro:hasPermission>
		                        
		                        
		                        
							</ul>
						</li>
						<!-- ----------- -->
					</ul>
				</div>
			</nav>
			<!--左侧导航结束-->
			<div id="page-wrapper" class="gray-bg dashbard-1">
				<div class="row border-bottom">
					<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
						<div class="navbar-header">
							<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
						</div>
						<ul class="nav navbar-top-links navbar-right">
							
						</ul>
					</nav>
				</div>
				<div class="row content-tabs">
					<button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
                	</button>
					<nav class="page-tabs J_menuTabs">
						<div class="page-tabs-content">
						</div>
					</nav>
					<button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
                	</button>
                	<button class="roll-nav roll-right J_tabRefreshActive"><i class="fa fa-refresh"></i>
                	</button>
					<div class="btn-group roll-nav roll-right">
						<button class="dropdown J_tabClose" data-toggle="dropdown">关闭标签<span class="caret"></span>
                    	</button>
						<ul role="menu" class="dropdown-menu dropdown-menu-right">
							<li class="J_tabShowActive">
								<a>活动标签</a>
							</li>
							<li class="divider"></li>
							<li class="J_tabCloseAll">
								<a>关闭所有</a>
							</li>
							<li class="J_tabCloseOther">
								<a>关闭其余</a>
							</li>
						</ul>
					</div>
					<a href="<%=basePath%>/admin/logout.do" class="roll-nav roll-right J_tabExit"><i class="fa fa fa-sign-out"></i> 退出</a>
				</div>
				<div class="row J_mainContent" id="content-main">
					<iframe class="J_iframe" name="iframe-1" width="100%" height="100%" src="" frameborder="0" data-id="" seamless></iframe>
				</div>
				<div class="footer">
					<div class="pull-right">&copy; 2013-2017
						<a href="#" target="_blank">杭州XXXX有限公司</a>
					</div>
				</div>
			</div>
			<!--右侧部分结束-->
		</div>
		<jsp:include page="../common/bottom.jsp"/>
		<script src="<%=basePath%>/components/admin/js/plugins/metisMenu/jquery.metisMenu.js"></script>
		<script>
			$(function(){
				$("#side-menu").show();
			})
		</script>
		<script src="<%=basePath%>/components/admin/js/hplus.min.js"></script>
		<script src="<%=basePath%>/components/admin/js/contabs.min.js"></script>
		<script src="<%=basePath%>/components/admin/js/plugins/pace/pace.min.js"></script>
		<script src="<%=basePath%>/components/admin/js/plugins/sweetalert/sweetalert.min.js"></script>
		<script>
		$(function(){
			
			$("#logout").click(function(){
				layer.confirm('确认退出登录？', {
			    	btn: ['退出','取消'],offset: ['200px', '40%'],icon: 0
				}, function(){
					window.location.href="<%=basePath%>/admin/logout.do";
				}, function(){
				});
			})
		})
		</script>
		

	</body>
</html>