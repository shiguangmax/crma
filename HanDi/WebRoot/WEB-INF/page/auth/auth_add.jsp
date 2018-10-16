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
	    <title>添加权限</title>
	    <link href="<%=basePath%>/components/admin/css/bootstrap.min.css" rel="stylesheet" />
		<link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
    	<link rel="stylesheet" type="text/css" href="<%=basePath%>/components/admin/js/plugins/layer/skin/layer.css" />
	</head>
	
	<body class="body-dig">
	
		<form id="doForm">
			<input type="hidden" name="id" id="id" value="${auth.id}" >
			<div class="form-group">
		    	<table class="form_tb">
		    		<tr>
		    			<td class="tb_left"><label for="type" class="col-sm-10 control-label"><span style="color:red">*</span>权限类型: </label></td>
		    			<td align="left">
		    				<select class="form-control m-b col-sm-4" id="type" name="type">
		                        <option value="MENU" <c:if test="${auth.type=='MENU'}">selected</c:if>>菜单</option>
		                        <option value="URL" <c:if test="${auth.type=='URL'}">selected</c:if>>URL</option>
		                        <option value="BUTTON" <c:if test="${auth.type=='BUTTON'}">selected</c:if>>按钮</option>
		                        <option value="DATA" <c:if test="${auth.type=='DATA'}">selected</c:if>>数据</option>
		                    </select>
	                    </td>
		    		</tr>
		    		<tr>
		    			<td class="tb_left"><label for="name" class="col-sm-10 control-label"><span style="color:red">*</span>权限名称: </label></td>
		    			<td align="left"><input type="text" class="form-control" id="name" name="name" value="${auth.name}" maxlength="50" ></td>
		    		</tr>
		    		<tr>
		    			<td class="tb_left"><label for="url" class="col-sm-10 control-label"><span style="color:red">*</span>权限URL: </label></td>
		    			<td align="left"><input type="text" class="form-control" id="url" name="url" value="${auth.url}" maxlength="50" ></td>
		    		</tr>
		    		<tr>
		    			<td class="tb_left"><label for="codeName" class="col-sm-10 control-label"><span style="color:red">*</span>权限编号: </label></td>
		    			<td align="left"><input type="text" class="form-control" id="codeName" name="codeName" value="${auth.codeName}" maxlength="50" ></td>
		    		</tr>
		    		<tr>
		    			<td class="tb_left"><label for="isEnabled" class="col-sm-10 control-label"><span style="color:red">*</span>是否启用: </label></td>
		    			<td align="left">
		    				<div class="checkbox">
                                <label>
                                    <input type="checkbox" id="isEnabled" name="isEnabled" value="true" <c:if test="${auth.isEnabled==true}">checked</c:if>/>
                                    <input type="hidden" id="_isEnabled" name="isEnabled" value="false" />
                                </label>
                            </div>
                        </td>
		    		</tr>
		    	</table>
		    </div>
		    <div class="form-group">
		    	<table class="table">
		    		<tr>
		    			<td align="right"><button type="button" class="btn btn-default btn" id="cancel">取消</button></td>
		    			<td><button type="submit" class="btn btn-success btn" id="save">保存</button></td>
		    		</tr>
		    	</table>
		    </div>
    	</form>
    	<jsp:include page="../common/bottom.jsp"/>
	    <script src="<%=basePath%>/components/admin/js/jquery.min.js"></script>
		<script src="<%=basePath%>/components/admin/js/plugins/layer/layer.min.js"></script>
	    <script type="text/javascript" src="<%=basePath%>/components/admin/js/plugins/validate/jquery.validate.min.js"></script>
	    <script>
	    	$(function(){
				//提交验证
			    $("#doForm").validate({
			        rules: {
			        	name: "required",
			        	url: "required",
			        	codeName: "required"
			        },
			        messages: {
			        	name: "请输入名称",
			        	url: "请输入权限对应链接",
			        	codeName: "请输入权限编码名称"
			        },
			        errorPlacement: function(error, element){
			            layer.tips(error[0].textContent, '#'+$(element).attr("id"), {
			            	tipsMore: true,
			            	tips: [3, '#D01405'],
			            });
			        },
			        submitHandler: function(form){
			        	layer.closeAll();
			        	var index = layer.load(2);
			        	save(index);
			        	return false;
			        }
			    });
			    
			    //保存
			    function save(index){
			    	var url="save.json";
			    	if($("#id").val()!=""){
			    		url="update.json"
			    	};
			    	$.ajax({
						type : "post",
						url : url,
						dataType:"json",
						data : $("#doForm").serialize(),
						success : function(json) {
							layer.close(index); 
							success(json);
						}
					});
			    }
			    
			    var index = parent.layer.getFrameIndex(window.name);
			    //成功回调
				function success(json){
					if(json.type=="success"){
						$("#save").attr("disabled", true);
						layer.msg(json.message, {time:2000}, function(){
							window.parent.$("#auth_list").trigger("reloadGrid");
							setTimeout("parent.layer.close("+index+");",1);
						});
					} else {
						layer.msg(json.message, {time:2000}, function(){
						});
					}
				}
				
				//取消关闭
				$("#cancel").click(function(){
					setTimeout("parent.layer.close("+index+");",1);
				})
			
			});
	    
	    </script>
	</body>
</html>