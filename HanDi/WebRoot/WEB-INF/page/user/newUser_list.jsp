<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
<title>新的用户管理</title>
<jsp:include page="../common/header.jsp" />
<link href="<%=basePath%>/components/admin/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet" />
<link href="<%=basePath%>/components/admin/css/main.css" rel="stylesheet" />

<link rel="stylesheet" href="<%=basePath%>/components/layui/css/layui.css">
<script src="<%=basePath%>/components/layui/layui.js"></script>
<script src="<%=basePath%>/components/admin/js/dateFormat-ext.js"></script>
</head>

<body class="gray-bg">
	<div class="wrapper wrapper-content ">
		<div class="ibox-title">
			<h5>商户会员列表</h5>
		</div>
		<div class="ibox-content">
			<div class="row" style="height: 530px;">
				<div class="row tooltip-demo m-b-xs">
					<form class="mail-search col-md-5 col-sm-5 col-xs-10" role="form">
						<div class="input-group">
							<input type="text" class="form-control input-sm keyword m-b-xs" id="keyword" placeholder="微信号 真实姓名 手机号 卡号" /> <span class="input-group-btn">
								<button class="btn btn-primary btn-sm js-search" type="button" target="vip_list" data="keyword">查询</button>
							</span>
						</div>

					</form>
					<div class="divider-vertical"></div>
					<button id="add" class="btn btn-white btn-sm" type="button">
						<i class="fa fa-plus"></i>&nbsp;添加
					</button>
					<button id="disableClass" class="btn btn-white btn-sm js-delete" type="button" target="vip_list" action="delete">
						<i class="fa fa-ban"></i>&nbsp;删除
					</button>
					<button class="btn btn-white btn-sm js-refresh" type="button" target="vip_list">
						<i class="fa fa-refresh"></i>&nbsp;刷新
					</button>
					<!--  <form id="searchForm" class="form-inline col-md-12 col-sm-12 col-xs-12 m-b-xs" role="form">
                        
                        	<div class="input-group">
                                <input id="keyword" type="text" class="form-control input-sm" name="weiXinName" placeholder="会员姓名">
                            </div>
                            &nbsp;
                            
                            <div class="input-group">
                                <input type="text" class="form-control input-sm" name="phone" placeholder="会员手机号">
                            </div>
                            &nbsp;
                            
                            <div class="input-group">
                                <select class="form-control state" style="width:92px;height:32.4px;" name="sex">
                                    <option value="">全部</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                            </div>
                            &nbsp;   
                            <br><br>
                            
                            <div class="input-group">
                                <select class="form-control state" style="width:92px;height:32.4px;" name="state">
                                    <option value="">全部</option>
                                    <option value="0">正常</option>
                                    <option value="1">禁用</option>
                                </select>
                            </div>
                            &nbsp;
                            
                            <div class="input-group">
                                <input type="text" class="form-control input-sm" id="levelName" name="levelName" placeholder="点击选择商户会员等级" readonly="">
                                <input type="hidden" class="form-control input-sm" id="levelId" name="clevelId" value="">
                            </div>
                            &nbsp;
                            
                            <div class="input-group">
                            	<input type="text" class="input-sm form-control" style="height:30.4px;width:120px" id="start" name="startTime" placeholder="注册时间起">
                                <span class="input-group-addon">至</span>
                                <input type="text" class="input-sm form-control" style="height:30.4px;width:120px" id="end" name="endTime" placeholder="注册时间止">
	                        </div>
	                        
                            <div class="input-group">
                                <select class="form-control" style="width:80px;height:32.4px;" id="selDate">
                                    <option value="">全部</option>
                                    <option value="today">今天</option>
                                    <option value="thisWeek">本周</option>
                                    <option value="thisMonth">本月</option>
                                    <option value="lastMonth">上月</option>
                                    <option value="thisQuarter">本季</option>
                                    <option value="thisYear">今年</option>
                                </select>
                            </div>
                            &nbsp;&nbsp;
                     <button class="btn btn-white btn-sm js-form-search" type="button" target="vip_list" data ="id="keyword"">
	                            <i class="fa fa-search"></i>&nbsp;搜索
	                        </button>
	                        &nbsp;
	                   		
	                        <button class="btn btn-white btn-sm js-refresh" type="button" target="vip_list">
	                            <i class="fa fa-refresh"></i>&nbsp;刷新
	                        </button>
	                 
                        </form> -->

				</div>
				<div class="hr-line-dashed"></div>
				<div class="jqGrid_wrapper m-n">
					<table id="vip_list"></table>
					<div id="user_list_pager"></div>
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../common/bottom.jsp" />
	<script src="<%=basePath%>/components/admin/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	<script src="<%=basePath%>/components/admin/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
	<script src="<%=basePath%>/components/admin/js/jqGrid-ext.js"></script>
	<script>
		$(function() {
			$.jgrid.defaults.styleUI = "Bootstrap";
			var $list = $("#vip_list");
			$list
					.jqGrid({
						url : "userlistjson.json", /* 获取数据的地址   类型为string  */
						postData : {}, /* 此数组内容直接赋值到url上，参数类型：{name1:value1…} 类型为Array  */
						colNames : [ "id", "操作", "会员微信名", "会员真实姓名", "手机号",
								"会员卡号", "会员等级名称", "商户会员积分", "性别", "生日" ],/* 列显示名称，是一个数组对象  类型为 Array */
						colModel : [
								{/* 类型为Array	常用到的属性：name 列显示的名称；index 传到服务器端用来排序用的列名称；width 列宽度；align 对齐方式；sortable 是否可以排序 */
									name : "id", /* name列显示的名称 */
									index : "id", /* index传到服务器端用来排序用的列名称 */
									editable : true, /* 单元格是否可编辑    类型为boolean  */
									hidden : true
								/* 在初始化表格时是否要隐藏此列    该字段是否隐藏 boolean false*/
								},
								{
									name : "operator",
									sortable : false,
									formatter : function(cellvalue, options,
											rowObject) {
										return '<button type="button" class="btn btn-primary btn-sm edit" data="'+rowObject.id+'"><i class="fa fa-edit"></i></span>&nbsp;修改</button>';

									}
								},
								{
									name : "weiXinName"
								},
								{
									name : "vipUserName"
								},
								{
									name : "vipPhone",

								},
								{
									name : "vipKhao",

								},
								{
									name : "vipDengJiName",

								},
								{
									name : "vipJiFen",
								},
								{
									name : "vipSex",
								},
								{
									name : "birthday",
									formatter : function(cellvalue) {
										if (cellvalue != undefined
												&& cellvalue != null
												&& cellvalue != "") {
											return new Date(cellvalue)
													.Format("yyyy-MM-dd hh:mm:ss");
										} else {
											return "";
										}
									}
								} ],
						pager : "#user_list_pager",
						viewrecords : true
					});

			$(window).bind("resize", function() {
				var width = $(".jqGrid_wrapper").width();
				$list.setGridWidth(width)
			});

			//添加
			$("#add").click(function() {
				layer.open({
					type : 2,
					title : '添加',
					closeBtn : 1,
					scrollbar : false,
					shade : 0.3,
					offset : [ '10%', '15%' ],
					area : [ '70%', '80%' ],
					content : 'addVip.json',
					success : function(elem) {
						//弹出后的回调...
					}
				});
			});

			$list.delegate(".edit", "click", function() {
				var id = $(this).attr("data");
				layer.open({
					type : 2,
					title : '编辑',
					closeBtn : 1,
					scrollbar : false,
					shade : 0.3,
					offset : [ '10%', '15%' ],
					area : [ '70%', '80%' ],
					content : 'addVip.json?id=' + id,
					success : function(elem) {
						//弹出后的回调...

					}
				});
			});
		})
	</script>
	<!--=================================================================================  -->



	<!-- =================================================================================== -->
</body>
</html>