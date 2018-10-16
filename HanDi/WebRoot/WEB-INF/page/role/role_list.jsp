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
	    <title>角色管理</title>
	    <jsp:include page="../common/header.jsp"/>
	    <link href="<%=basePath%>/components/admin/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet" />
	    <link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
	</head>
	
	<body class="gray-bg">
		<div class="wrapper wrapper-content ">
			<div class="ibox-title">
				<h5>角色管理</h5>
			</div>
			<div class="ibox-content">
				<div class="row" style="height: 530px;">
                   	<div class="row tooltip-demo m-b-xs">
                   		<form class="mail-search col-md-5 col-sm-10 col-xs-12 m-b-xs" role="form">
                   			<div class="input-group">
                   				<input type="text" class="form-control input-sm keyword" id="keyword" placeholder="名称 编号" />
                   				<span class="input-group-btn"> 
                   					<button class="btn btn-primary btn-sm js-search" type="button" target="role_list" data="keyword" >查询</button> 
                   				</span>
                   			</div>
                   		</form>
                   		<div class="divider-vertical"></div>
                   		<button id="add" class="btn btn-white btn-sm" type="button">
                   			<i class="fa fa-plus"></i>&nbsp;添加
                   		</button>
                   		<button id="delClass" class="btn btn-white btn-sm js-delete" type="button" target="role_list" action="delete" >
                   			<i class="fa fa-trash"></i>&nbsp;删除
                   		</button>
                   		<button class="btn btn-white btn-sm js-refresh" type="button" target="role_list" >
                   			<i class="fa fa-refresh"></i>&nbsp;刷新
                   		</button>
                   	</div>
               		<div class="hr-line-dashed"></div>
                    <div class="jqGrid_wrapper m-n">
                        <table id="role_list"></table>
                        <div id="role_list_pager"></div>
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
				var $list=$("#role_list");
				$list.jqGrid({
					url: "rolelistjson.json",
					postData: {},
					colNames: ["id", "编号", "名称", "操作"],
					colModel: [{
						name: "id",
						index: "id",
						editable: true,
						hidden: true
					}, {
						name: "sn"
					}, {
						name: "name"
					}, {
						name: "button",
						width: 150,
						sortable: false,
						formatter: function(cellvalue, options, rowObject){
							return '<button type="button" class="btn btn-primary btn-sm edit" data="'+rowObject.id+'"><i class="fa fa-edit"></i>&nbsp;编辑</button>&nbsp;&nbsp'+
							'<button type="button" class="btn btn-info btn-sm editRoleOfAuth" data="'+rowObject.id+'"><i class="fa fa-exchange"></i>&nbsp;权限</button>';
						}
					}],
					pager: "#role_list_pager",
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
					  	offset: ['23%', '25%'],
					  	area: ['500px', '300px'],
					  	content: 'add.json',
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
					  	offset: ['23%', '25%'],
					  	area: ['500px', '300px'],
					  	content: 'add.json?id='+id,
					  	success: function(elem){
					  		//弹出后的回调...
					    }
					});
				});
				
				$list.delegate(".editRoleOfAuth","click",function(){
					var id=$(this).attr("data");
					
					layer.open({
						type: 2,
						title: '权限',
						closeBtn: 1,
					  	scrollbar: false,
					  	shade: 0.3,
					  	offset: ['5%', '5%'],
					  	area: ['90%', '90%'],
					  	content: 'editRoleOfAuth.json?id='+id,
					  	success: function(elem){
					  		//弹出后的回调...
					    }
					});
					
				});
			});
    	</script>
	</body>
</html>