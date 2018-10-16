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
	    <meta charset="utf-8" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta content="" name="description" />
	    <title>用户管理</title>
	    <jsp:include page="../common/header.jsp"/>
	    <link href="<%=basePath%>/components/admin/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet" />
	    <link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
	</head>
	
	<body class="gray-bg">
		<div class="wrapper wrapper-content ">
			<div class="ibox-title">
				<h5>用户管理</h5>
			</div>
			<div class="ibox-content">
				<div class="row" style="height: 530px;">
                   	<div class="row tooltip-demo m-b-xs">
                   		<form class="mail-search col-md-5 col-sm-5 col-xs-10" role="form">
                   			<div class="input-group">
                   				<input type="text" class="form-control input-sm keyword m-b-xs" id="keyword" placeholder="用户名 昵称" />
                   				<span class="input-group-btn"> 
                   					<button class="btn btn-primary btn-sm js-search" type="button" target="user_list" data="keyword" >查询</button> 
                   				</span>
                   			</div>
                   		</form>
                   		<div class="divider-vertical"></div>
                   		<button id="add" class="btn btn-white btn-sm" type="button">
                   			<i class="fa fa-plus"></i>&nbsp;添加
                   		</button>
                   		<button id="disableClass" class="btn btn-white btn-sm js-delete" type="button" target="user_list" action="delete" >
                   			<i class="fa fa-ban"></i>&nbsp;删除
                   		</button>
                   		<button class="btn btn-white btn-sm js-refresh" type="button" target="user_list" >
                   			<i class="fa fa-refresh"></i>&nbsp;刷新
                   		</button>
                   	</div>
                   	<div class="hr-line-dashed"></div>
                    <div class="jqGrid_wrapper m-n">
                        <table id="user_list"></table>
                        <div id="user_list_pager"></div>
                    </div>
				</div>
			</div>
		</div>
		<jsp:include page="../common/bottom.jsp"/>
	    <script src="<%=basePath%>/components/admin/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	    <script src="<%=basePath%>/components/admin/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
	    <script src="<%=basePath%>/components/admin/js/jqGrid-ext.js"></script>
    	<script>
    	
    		$(function(){
				$.jgrid.defaults.styleUI="Bootstrap";
				var $list=$("#user_list");
				$list.jqGrid({
					url: "userlistjson.json",
					postData: {},
					colNames: ["id", "操作", "昵称", "用户名", "是否启用", "是否锁定"],
					colModel: [{
						name: "id",
						index: "id",
						editable: true,
						hidden: true
					}, {
						name: "operator",
						sortable: false,
						formatter: function(cellvalue, options, rowObject){
							return '<button type="button" class="btn btn-primary btn-sm edit" data="'+rowObject.id+'"><i class="fa fa-edit"></i></span>&nbsp;修改</button>';
						}
					}, {
						name: "nickname"
					}, {
						name: "username"
					}, {
						name: "isEnabled",
						formatter: function(cellValue, options, rowdata, action) {
							if (cellValue) {
								return "是";
							} else {
								return "否";
							}
						}
					}, {
						name: "isLocked",
						formatter: function(cellValue, options, rowdata, action) {
							if (cellValue) {
								return "是";
							} else {
								return "否";
							}
						}
					}],
					pager: "#user_list_pager",
					viewrecords: true
				});
				
				$(window).bind("resize", function() {
					var width = $(".jqGrid_wrapper").width();
					$list.setGridWidth(width)
				});
				
				//添加
				$("#add").click(function(){
					layer.open({
						type: 2,
					  	title: '添加',
					  	closeBtn: 1,
					  	scrollbar: false,
					  	shade: 0.3,
					  	offset: ['10%', '15%'],
					  	area: ['70%', '80%'],
					  	content: 'add.do',
					  	success: function(elem){
					  		//弹出后的回调...
					    }
					});
				})
				
				$list.delegate(".edit","click",function(){
					var id=$(this).attr("data");
					layer.open({
						type: 2,
						title: '编辑',
						closeBtn: 1,
					  	scrollbar: false,
					  	shade: 0.3,
					  	offset: ['10%', '15%'],
					  	area: ['70%', '80%'],
					  	content: 'add.do?id='+id,
					  	success: function(elem){
					  		//弹出后的回调...
					    }
					});
				});
			})
    	</script>
	</body>
</html>