<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
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
<script src="<%=basePath%>/components/laydate/laydate.js"></script>
<body class="body-dig">
	<form id="doForm">
		<input type="hidden" name="id" id="id" value="${vip.id}">
		<div>
			<div class="form-group">
				<table class="form_tb">
					<tr>
						<td class="tb_left"><label for="weiXinName" class="col-sm-10 control-label"><span style="color: red">*</span>微信昵称: </label></td>
						<td align="left"><input type="text" class="form-control" id="weiXinName" name="weiXinName" value="${vip.weiXinName}" maxlength="50" <c:if test="vip.weiXinName != null">readonly</c:if>></td>
					</tr>
					<tr>
						<td class="tb_left"><label for="vipUserName" class="col-sm-10 control-label"><span style="color: red">*</span>真实姓名: </label></td>
						<td align="left"><input type="text" class="form-control" id="vipUserName" name="vipUserName" value="${vip.vipUserName}" maxlength="50"></td>
					</tr>

					<tr>
						<td class="tb_left"><label for="vipPhone" class="col-sm-10 control-label"><span style="color: red"></span>手机号: </label></td>
						<td align="left"><input type="text" class="form-control" id="vipPhone" name="vipPhone" value="${vip.vipPhone}" maxlength="50"></td>
					</tr>
					<tr>
						<td class="tb_left"><label for="vipKhao" class="col-sm-10 control-label"><span style="color: red"></span>卡号: </label></td>
						<td align="left"><input type="text" class="form-control" id="vipKhao" name="vipKhao" value="${vip.vipPhone}" maxlength="50"></td>
					</tr>
					<tr>
						<td class="tb_left"><label for="vipDengJiName" class="col-sm-10 control-label"><span style="color: red"></span>等级名称: </label></td>

						<td align="left"><input type="text" class="form-control" id="vipDengJiName" name="vipDengJiName" value="${vip.vipDengJiName}" maxlength="50"></td>

					</tr>
					<tr>
						<td class="tb_left"><label for="vipJiFen" class="col-sm-10 control-label"><span style="color: red"></span>商户积分: </label></td>
						<td align="left"><input type="text" class="form-control" id="vipJiFen" name="vipJiFen" value="${vip.vipJiFen}" maxlength="50"></td>
					</tr>
					<tr>
						<td class="tb_left"><label for="vipSex" class="col-sm-10 control-label"><span style="color: red"></span>性别: </label></td>
						<td align="left"><input type="text" class="form-control" id="vipSex" name="vipSex" value="${vip.vipSex}" maxlength="50"></td>
					</tr>
					<tr>
						<td class="tb_left"><label for="birthday" class="col-sm-10 control-label"><span style="color: red"></span>生日: </label></td>
						<td align="left"><input type="text" class="form-control" id="birthday" name="birthday" value="${vip.birthday}" maxlength="50"></td>

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
	/* ================================================ */
		$(function(){
				//提交验证
			    $("#doForm").validate({
			        rules: {
			        	weiXinName: "required"
			        	,vipUserName: "required"
			        	,vipPhone: "required"
			        	,vipKhao: "required"
			        },
			        messages: {
			        	weiXinName: "请输入微信名",
			        	vipUserName: "请输入真实姓名",
			        	vipPhone: "请输入手机号",
			        	vipKhao: "请输入会员卡号"
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
					var url = "";
					if ($("#id").val() != "") {
						url = "update.json"
					} else {
						url = "tj.json";
					}
					$.ajax({
						type : "post",
						url : url,
						dataType : "json",
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
							window.parent.$("#vip_list").trigger("reloadGrid");
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
			
			})
			
			
	
	/*==================================================  */

	</script>

</body>
</html>