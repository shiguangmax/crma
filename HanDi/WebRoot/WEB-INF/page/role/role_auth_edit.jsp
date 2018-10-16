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
<head>
	    <meta charset="utf-8" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta content="" name="description" />
	    <title>权限分配</title>
	    <jsp:include page="../common/header.jsp"/>
	     <link href="<%=basePath%>/components/admin/css/plugins/cropper/cropper.min.css" rel="stylesheet">
	    <link href="<%=basePath%>/components/admin/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet" />
	    <link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
	    <link href="<%=basePath%>/components/admin/css/plugins/chosen/chosen.min.css" rel="stylesheet" />
	</head>
	
	<body class="gray-bg">
	    <div class="wrapper wrapper-content animated fadeInRight">
	        <div class="row">
	            <div class="col-sm-5">
	                <div class="ibox float-e-margins">
	                    <div class="ibox-content text-center p-md">
	                    	<div class="row tooltip-demo m-b-xs">
		                        <form class="mail-search col-md-9" role="form" style="padding-left:0px;">
		                   			<div class="input-group col-md-12">
		                   				<input type="text" class="form-control input-sm keyword" id="keyword" placeholder="名称" />
		                   				<span class="input-group-btn"> 
		                   					<button class="btn btn-primary btn-sm js-search" type="button" target="auth_list_had" data="keyword" >查询</button> 
		                   				</span>
		                   			</div>
		                   		</form>
	                   			<div class="divider-vertical"></div>
	                   			<button class="btn btn-white btn-sm js-refresh" type="button" target="auth_list_had" >
		                   			<i class="fa fa-refresh"></i>&nbsp;刷新
		                   		</button>
	                   		</div>
	                   		<div class="row">
		                        <div class="jqGrid_wrapper m-n">
			                        <table id="auth_list_had"></table>
			                        <div id="auth_list_pager_had"></div>
			                    </div>
		                    </div>
	                    </div>
	                </div>
	            </div>
				<div class="col-sm-1 text-center">
						<p style="align:center">
							<br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <button type="button" id="addAuth" class="btn btn-success"><i class="fa fa-angle-double-left"></i>&nbsp;授权</button>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                        <br/>
	                       	<button type="button" id="delAuth" class="btn btn-warning">取消&nbsp;<i class="fa fa-angle-double-right"></i></button>
                    	</p>
				</div>
	            <div class="col-sm-5">
	                <div class="ibox float-e-margins">
	                    <div class="ibox-content text-center p-md">
	                        <div class="row tooltip-demo m-b-xs">
		                        <form class="mail-search col-md-9" role="form" style="padding-left:0px;">
		                   			<div class="input-group col-md-12">
		                   				<input type="text" class="form-control input-sm keyword" id="keyword_no_had" placeholder="名称" />
		                   				<span class="input-group-btn"> 
		                   					<button class="btn btn-primary btn-sm js-search" type="button" target="auth_list_no_had" data="keyword_no_had" >查询</button> 
		                   				</span>
		                   			</div>
		                   		</form>
	                   			<div class="divider-vertical"></div>
	                   			<button class="btn btn-white btn-sm js-refresh" type="button" target="auth_list_no_had" >
		                   			<i class="fa fa-refresh"></i>&nbsp;刷新
		                   		</button>
	                   		</div>
	                   		<div class="row">
		                        <div class="jqGrid_wrapper m-n">
			                        <table id="auth_list_no_had"></table>
			                        <div id="auth_list_pager_no_had"></div>
			                    </div>
		                    </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	   <jsp:include page="../common/bottom.jsp"/>
	   <script src="<%=basePath%>/components/admin/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	   <script src="<%=basePath%>/components/admin/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
	   <script src="<%=basePath%>/components/admin/js/jqGrid-ext.js"></script>
	   <script src="<%=basePath%>/components/admin/js/plugins/chosen/chosen.jquery.min.js"></script>
       <script>
    		$(function(){
				$.jgrid.defaults.styleUI="Bootstrap";
				var $list_had=$("#auth_list_had");
				$list_had.jqGrid({
					url: "rolehadauthlistjson.json",
					postData: {"roleId": "${roleId}"},
					colNames: ["id", "名称"],
					colModel: [{
						name: "id",
						index: "id",
						editable: true,
						hidden: true
					}, {
						name: "name"
					}],
					pager: "#auth_list_pager_had",
					caption: "已授权",
					viewrecords: true
				});
				
				$(window).bind("resize", function() {
					var width = $(".jqGrid_wrapper").width();
					$list_had.setGridWidth(width)
				});
				
				var $list_no_had=$("#auth_list_no_had");
				$list_no_had.jqGrid({
					url: "rolenohadauthlistjson.json",
					postData: {"roleId": "${roleId}"},
					colNames: ["id", "名称"],
					colModel: [{
						name: "id",
						index: "id",
						editable: true,
						hidden: true
					}, {
						name: "name"
					}],
					pager: "#auth_list_pager_no_had",
					caption: "未授权",
					viewrecords: true
				});
				
				$(window).bind("resize", function() {
					var width = $(".jqGrid_wrapper").width();
					$list_no_had.setGridWidth(width)
				});
				
				/*
				* 点击添加按钮，获得选中的id后ajax值最后两个表刷新
				*/
				$("#addAuth").click(function() {
					var ids = $list_no_had.jqGrid('getGridParam', 'selarrrow');
					if (ids.length == 0) {		// 没选择就提示
						layer.msg("未选择记录", {time:2000}, function(){
						});
					} else {
						$.ajax({
							type:"POST",
							url: "addroleofauth.json",
							data: {"ids": ids.toString(), "roleId": "${roleId}"},
							beforeSend: function() {
							},
							error: function(e, jqxhr, settings, exception) {
							},
							success: function(json) {
								layer.msg(json.message, {time:1000}, function(){
									$list_no_had.trigger("reloadGrid");
									$list_had.trigger("reloadGrid");
								});
							}
						});
					}
				});
				
				/*
				* 点击删除按钮，获得选中的id后ajax值最后两个表刷新
				*/
				$("#delAuth").click(function() {
					var ids = $list_had.jqGrid('getGridParam', 'selarrrow');
					if (ids.length == 0) {		// 没选择就提示
						layer.msg("未选择记录", {time:2000}, function(){
						});
					} else {
						$.ajax({
							type:"POST",
							url: "delroleofauth.json",
							data: {"ids": ids.toString(), "roleId": "${roleId}"},
							beforeSend: function() {
							},
							error: function(e, jqxhr, settings, exception) {
							},
							success: function(json) {
								layer.msg(json.message, {time:1000}, function(){
									$list_no_had.trigger("reloadGrid");
									$list_had.trigger("reloadGrid");
								});
							}
						});
					}
				});
				
			});
    	</script>
	</body>
</html>