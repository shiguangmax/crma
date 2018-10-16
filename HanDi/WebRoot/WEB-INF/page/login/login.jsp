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
		<title>登录</title>
		<meta name="author" content="DeathGhost" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/login/login-ext.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/components/admin/js/plugins/layer/skin/layer.css" />
		<style>
			body {
				height: 100%;
				background: #2f4050;
				overflow: hidden;
			}
			
			canvas {
				z-index: -1;
				position: absolute;
			}   
		</style>
	</head>

	<body>
		<form class="admin_login"  id="login_form">
			<dt>
			  <strong>后台登录</strong>
			  <em>系统系统</em>
			</dt>
			<dd class="user_icon">
				<input type="text" name="username" id="username" placeholder="账号" class="login_txtbx" />
			</dd>
			<dd class="pwd_icon">
				<input type="password" name="password" id="password" placeholder="密码" class="login_txtbx" />
			</dd>
			<dd class="val_icon">
				<div class="checkcode">
					<input type="hidden" id="captchaId" name="captchaId" value="${captchaId}" />
					<input type="text" placeholder="验证码"  id="captcha" name="captcha" maxlength="4" autocomplete="off"  class="login_txtbx" style="text-transform:uppercase">
				</div>
				<img id="captchaImage" class="ver_btn" src="<%=basePath%>/admin/common/captcha.do?captchaId=${captchaId}" title="点击更换" />
			</dd>
			<dd>
				<input type="submit" value="立即登录" class="submit_btn" />
			</dd>
			<dd>
				<p>© 2015-2016 XXXX 版权所有</p>
				<p>浙 B2-888888-1</p>
			</dd>
		</form>
	</body>
	<script src="<%=basePath%>/components/admin/js/jquery.min.js"></script>
	<script src="<%=basePath%>/components/admin/js/Particleground.js"></script>
	<script src="<%=basePath%>/components/admin/js/plugins/validate/jquery.validate.min.js"></script>
	<script src="<%=basePath%>/components/admin/js/plugins/layer/layer.min.js"></script>
	<script>
		$(function(){
	
			//粒子背景特效
			$('body').particleground({
				dotColor: '#5cbdaa',
				lineColor: '#5cbdaa'
			});
			
		 	// 更换验证码
			$("#captchaImage").click( function() {
				$(this).attr("src", "<%=basePath%>/admin/common/captcha.do?captchaId=${captchaId}&timestamp="+(new Date()).valueOf());
			});
		
			/*
			 * 表单验证
			 */
			 $("#login_form").validate({
				rules: {
					username: {
						required: true
					},
					password: {
						required: true
					},
					captcha: {
						required: true
					}
				},
				messages: {
					username: {
						required: "请输入用户名"
					},
					password: {
						required: "请输入密码"
					},
					captcha: {
						required: "请输入验证码"
					}
				},
				errorPlacement: function(error, element){
		            layer.tips(error[0].textContent, '#'+$(element).attr("id"), {
		            	tipsMore: true,
		            	tips: [2, '#D01405'],
		            });
		        },
				submitHandler: function(form) { 
					$.ajax({
						type : "post",
						url : "<%=basePath%>/admin/syslogin.json",
						dataType:"json",
						data : {username: $("#username").val(), password: $("#password").val(), captchaId: $("#captchaId").val(), captcha: $("#captcha").val()},
						success : function(json) {
							if(json.type == "success") {
								window.location.href='<%=basePath%>/admin/common/main.do';
							} else {
								layer.msg(json.message, {time:2500}, function(){
			    					if(json.message=='验证码错误'){
			    						$("#captchaImage").click();
			    					}
			    				});
							}
						}
					});
				}
			});
			
			
		})
	</script>
</html>