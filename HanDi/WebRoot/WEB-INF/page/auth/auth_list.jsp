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
	    <title>权限管理</title>
	    <jsp:include page="../common/header.jsp"/>
	    <link href="<%=basePath%>/components/admin/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet" />
	    <link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
	    <link href="<%=basePath%>/components/admin/css/plugins/chosen/chosen.min.css" rel="stylesheet" />
	</head>
	<body class="gray-bg">
		<div class="wrapper wrapper-content ">
			<div class="ibox-title">
				<h5>权限列表</h5>
			</div>
			<div class="ibox-content">
				<div class="row" style="height: 530px;">
                   	<div class="row tooltip-demo m-b-xs">
                   		<div class="row col-md-12 col-sm-12 col-xs-12">
	                   		<form class="mail-search col-md-5 col-sm-5 col-xs-12 m-b-xs" role="form">
	                   			<div class="input-group">
	                   				<input type="text" class="form-control input-sm keyword" id="keyword" placeholder="名称  URL 权限编号" />
	                   				<span class="input-group-btn"> 
	                   					<button class="btn btn-primary btn-sm js-search" type="button" target="auth_list" data="keyword" >查询</button> 
	                   				</span>
	                   			</div>
	                   		</form>
	                   		<div class="divider-vertical"></div>
                    	<button id="add" class="btn btn-white btn-sm" type="button">
	               			<i class="fa fa-plus"></i>&nbsp;添加
	               		</button>
	               		<button id="delClass" class="btn btn-white btn-sm js-delete" type="button" target="auth_list" action="delete" >
	               			<i class="fa fa-trash"></i>&nbsp;删除
	               		</button>
	               		<button class="btn btn-white btn-sm js-refresh" type="button" target="auth_list" >
	               			<i class="fa fa-refresh"></i>&nbsp;刷新
	               		</button>
                   		</div>
                   		<div class="row col-md-12 col-sm-12 col-xs-12  m-n">
	               			<div class="input-group col-md-2 col-sm-4 col-xs-4 m-b-xs">
		                        <span class="input-group-addon" for="isEnabled">是否启用</span>
		                   		<select class="form-control" style="height:30px;padding:2px" id="isEnabled">
		                   			<option value="">--</option>
		                            <option value="true">启用</option>
			                        <option value="false">禁用</option>
		                        </select>
	                        </div>
                        </div>
                        <div class="row col-md-6 col-sm-6 col-xs-12 m-n">
	                        <div class="input-group col-md-8 col-sm-8 col-xs-12 " >
	               				<span class="input-group-addon" for="isEnabled">权限类型</span>
		                   		<select data-placeholder="点击选择.." class="chosen-select col-md-6 col-sm-6 col-xs-6" id="type" multiple>
		                            <option value="MENU" hassubinfo="true">菜单</option>
			                        <option value="URL" hassubinfo="true">URL</option>
			                        <option value="BUTTON" hassubinfo="true">按钮</option>
			                        <option value="DATA" hassubinfo="true">数据</option>
		                        </select>
	                        </div>
                        </div>
                   	</div>
                   	<div class="hr-line-dashed"></div>
                    <div class="jqGrid_wrapper m-n">
                        <table id="auth_list"></table>
                        <div id="auth_list_pager"></div>
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
				var $list=$("#auth_list");
				$list.jqGrid({
					url: "authlistjson.json",
					postData: {},
					colNames: ["id", "操作", "名称", "类型", "URL", "是否启用", "编码"],
					colModel: [{
						name: "id",
						index: "id",
						editable: true,
						hidden: true
					}, {
						name: "button",
						sortable: false,
						formatter: function(cellvalue, options, rowObject){
							return '<button type="button" class="btn btn-primary btn-sm edit" data="'+rowObject.id+'"><i class="fa fa-edit"></i></span>&nbsp;修改</button>';
						}
					}, {
						name: "name"
					}, {
						name: "type",
						formatter: function(cellValue, options, rowdata, action) {
							if (cellValue == "MENU") {
								return "菜单";
							} else if (cellValue == "BUTTON") {
								return "按钮";
							} else if (cellValue == "URL") {
								return "URL";
							} else if (cellValue == "DATA") {
								return "数据";
							} else {
								return cellValue;
							}
						}
					}, {
						name: "url"
					}, {
						name: "isEnabled",
						formatter: function(cellValue, options, rowdata, action) {
							if (cellValue) {
								return "启用";
							} else {
								return "禁用";
							}
						}
					}, {
						name: "codeName"
					}],
					pager: "#auth_list_pager",
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
					  	offset: ['15%', '25%'],
					  	area: ['500px', '400px'],
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
					  	offset: ['15%', '25%'],
					  	area: ['500px', '400px'],
					  	content: 'add.json?id='+id,
					  	success: function(elem){
					  		//弹出后的回调...
					    }
					});
				})
				
				$("#type").on('change', function(e, params) {
					var arr = $(this).val();
					var typesVal = "";
					
					if (arr == null) {
						arr = "";
					}
					var enableVal = $("#isEnabled").val();
					if (enableVal == "") {
						enableVal = null;
					}
					$list.jqGrid("setGridParam",  {postData: {"searchParams": $("#keyword").val(), "types": arr.toString(), "isEnabled": enableVal}}).trigger('reloadGrid');
					
				});
				
				$("#isEnabled").change(function() {
					var enableVal = $(this).val();
					if (enableVal == "") {
						enableVal = null;
					}
					var arr = $("#type").val();
					if (arr == null) {
						arr = "";
					}
					$list.jqGrid("setGridParam",  {postData: {"searchParams": $("#keyword").val(), "types": arr.toString(), "isEnabled": enableVal}}).trigger('reloadGrid');	
				});
				
				
				
				$(".chosen-select").chosen({
				    no_results_text: "没有找到结果！",//搜索无结果时显示的提示
				    search_contains:true,   //关键字模糊搜索，设置为false，则只从开头开始匹配
				    allow_single_deselect:true //是否允许取消选择
				});
			
			})
    	</script>
	</body>
</html>