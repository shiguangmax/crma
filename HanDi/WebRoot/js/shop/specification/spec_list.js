$(function(){
	$.jgrid.defaults.styleUI="Bootstrap";
	var $list=$("#spec_list");
	$list.jqGrid({
		url: "speclistjson.jhtml",
		postData: {},
		colNames: ["编号", "名称", "类型", "操作"],
		colModel: [{
			name: "sn"
		}, {
			name: "name"
		}, {
			name: "type",
			formatter: function(cellvalue, options, rowObject){
				if(cellvalue==0){
					return "文本";
				}else
					return "颜色";
			}
		}, {
			name: "id",
			width: 110,
			index: "id",
			sortable: false,
			formatter: function(cellvalue, options, rowObject){
				return '<button type="button" class="btn btn-primary btn-sm edit" data="'+rowObject.id+'"><i class="fa fa-edit"></i>&nbsp;编辑</button>';
			}
		}],
		pager: "#spec_list_pager",
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
		  	offset: ['15%', '20%'],
		  	area: ['600px', '400px'],
		  	content: 'add.jhtml',
		  	success: function(elem){
		  		//弹出后的回调...
		    }
		});
	})
	
	//编辑
	$list.delegate(".edit","click",function(){
		var id=$(this).attr("data");
		layer.open({
			type: 2,
			title: '编辑',
			closeBtn: 1,
		  	scrollbar: false,
		  	shade: 0.3,
		  	offset: ['15%', '20%'],
		  	area: ['600px', '400px'],
		  	content: 'add.jhtml?id='+id,
		  	success: function(elem){
		  		//弹出后的回调...
		    }
		});
	});
	
});