<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
	    <title>添加用户</title>
	    <link href="<%=basePath%>/components/admin/css/bootstrap.min.css" rel="stylesheet" />
	    <link href="<%=basePath%>/components/admin/css/font-awesome.min.css" rel="stylesheet" />
		<link href="<%=basePath%>/components/admin/css/animate.min.css" rel="stylesheet" />
		<link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />
    	<link rel="stylesheet" type="text/css" href="<%=basePath%>/components/admin/js/plugins/layer/skin/layer.css" />
    	<link href="<%=basePath%>/components/admin/css/plugins/chosen/chosen.min.css" rel="stylesheet" />
	</head>
	<body class="body-dig">
		<form id="doForm">
			<input type="hidden" name="id" id="id" value="${user.id}" >
			<div>
				<div class="form-group">
			    	<table class="form_tb">
			    		<tr>
			    			<td class="tb_left"><label for="username" class="col-sm-10 control-label"><span style="color:red">*</span>用户名: </label></td>
			    			<td align="left"><input type="text" class="form-control" id="username" name="username" value="${user.username}" maxlength="50" <c:if test="user.username != null">readonly</c:if>></td>
			    		</tr>
			    		<tr>
			    			<td class="tb_left"><label for="nickname" class="col-sm-10 control-label"><span style="color:red">*</span>昵称: </label></td>
			    			<td align="left"><input type="text" class="form-control" id="nickname" name="nickname" value="${user.nickname}" maxlength="50" ></td>
			    		</tr>
			    		<tr>
			    			<td class="tb_left"><label for="password" class="col-sm-10 control-label"><c:if test="${empty user}"><span style="color:red">*</span></c:if>密码: </label></td>
			    			<td align="left"><input type="password" class="form-control" id="password" name="password" maxlength="50"></td>
			    		</tr>
			    		<tr>
			    			<td class="tb_left"><label for="email" class="col-sm-10 control-label"><span style="color:red"></span>邮箱: </label></td>
			    			<td align="left"><input type="text" class="form-control" id="email" name="email" value="${user.email}" maxlength="50"></td>
			    		</tr>
			    		<tr>
			    			<td class="tb_left"><label for="isEnabled" class="col-sm-10 control-label"><span style="color:red">*</span>是否启用: </label></td>
			    			<td align="left">
			    				<div class="checkbox">
	                                <label>
	                                    <input type="checkbox" id="isEnabled" name="isEnabled" value="true" <c:if test="${empty user || user.isEnabled==true}">checked</c:if>/>
	                                    <input type="hidden" id="_isEnabled" name="isEnabled" value="false" />
	                                </label>
	                            </div>
	                        </td>
			    		</tr>
			    		<tr>
			    			<td class="tb_left"><label for="isLocked" class="col-sm-10 control-label"><span style="color:red">*</span>是否锁定: </label></td>
			    			<td align="left">
			    				<div class="checkbox">
	                                <label>
	                                    <input type="checkbox" id="isLocked" name="isLocked" value="true" <c:if test="${user.isLocked==true}">checked</c:if>/>
	                                    <input type="hidden" id="_isLocked" name="isLocked" value="false" />
	                                </label>
	                            </div>
	                        </td>
			    		</tr>
			    		<tr>
			    			<td class="tb_left"><label for="" class="col-sm-10 control-label">角色: </label></td>
			    			<c:if test="${not empty roles}">
			    				<td align="left">
			    					<select data-placeholder="选择" class="chosen-select" style="width:410px;" name="roleIds" id="roleSelect" multiple>
			    						 <c:forEach items="${roles}" var="role">
			                            	<option value="${role.id}" id="role_${role.sn}" hassubinfo="true"<c:if test="${fn:contains(userOfRoleIds, role.id)}">selected</c:if>>${role.name}</option>
				                        </c:forEach>
			                        </select>
		                        </td>
	                        </c:if>
			    		</tr>
			    	</table>
			    </div>
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
	    <script src="<%=basePath%>/components/admin/js/plugins/chosen/chosen.jquery.min.js"></script>
	    <script>
	    	$(function(){
				//提交验证
			    $("#doForm").validate({
			        rules: {
			        	username: "required"
			        	<c:if test="${empty user}">
			        	,password: "required"
			        	</c:if>
			        	,nickname: "required",
			        	email: "email"
			        },
			        messages: {
			        	username: "请输入用户名",
			        	password: "请输入密码",
			        	nickname: "请输入昵称",
			        	email: "请输入正确的邮箱地址"
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
			    };
			    
			    var index = parent.layer.getFrameIndex(window.name);
			    //成功回调
				function success(json){
					if(json.type=="success"){
						$("#save").attr("disabled", true);
						layer.msg(json.message, {time:1000}, function(){
							window.parent.$("#user_list").trigger("reloadGrid");
							setTimeout("parent.layer.close("+index+");",1);
						});
					} else {
						layer.msg(json.message, {time:1000}, function(){
						});
					}
				}
				
				//取消关闭
				$("#cancel").click(function(){
					setTimeout("parent.layer.close("+index+");",1);
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