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
	    <title>添加角色</title>
	    <link href="<%=basePath%>/components/admin/css/bootstrap.min.css" rel="stylesheet" />
		<link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
    	<link rel="stylesheet" type="text/css" href="<%=basePath%>/components/admin/js/plugins/layer/skin/layer.css" />
	</head>
	<body class="body-dig">
		<form id="doForm">
			<input type="hidden" name="id" id="id" value="${role.id}" >
			<input type="hidden" name="oldsn" value="${role.sn}" >
			
			<div class="form-group">
		    	<table class="form_tb">
		    		<tr>
		    			<td class="tb_left"><label for="sn" class="col-sm-10 control-label"><span style="color:red">*</span>角色编号: </label></td>
		    			<td align="left"><input type="text" class="form-control" id="sn" name="sn" value="${role.sn}" maxlength="50" ></td>
		    		</tr>
		    		<tr>
		    			<td class="tb_left"><label for="name" class="col-sm-10 control-label"><span style="color:red">*</span>角色名称: </label></td>
		    			<td align="left"><input type="text" class="form-control" id="name" name="name" value="${role.name}" maxlength="50" ></td>
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
	    <script src="<%=basePath%>/components/admin/js/jquery.min.js"></script>
		<script src="<%=basePath%>/components/admin/js/plugins/layer/layer.min.js"></script>
	    <script type="text/javascript" src="<%=basePath%>/components/admin/js/plugins/validate/jquery.validate.min.js"></script>
	    
	    <script>
	    	$(function(){
    
				//提交验证
			    $("#doForm").validate({
			        rules: {
			        	sn: "required",
			        	name: "required",
			        },
			        messages: {
			        	sn: "请输入编号",
			        	name: "请输入名称",
			        },
			        errorPlacement: function(error, element){
			            layer.tips(error[0].textContent, '#'+$(element).attr("id"), {
			            	tipsMore: true,
			            	tips: [3, '#D01405'],
			            });
			        },
			        submitHandler: function(form){
			        	layer.closeAll();
			        	save();
			        	return false;
			        }
			    });
			    
			    //保存
			    function save(){
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
							window.parent.$("#role_list").trigger("reloadGrid");
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
			
			})
	    
	    </script>
	</body>
</html>