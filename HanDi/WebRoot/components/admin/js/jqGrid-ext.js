(function(a) {
	a.extend(a.jgrid.defaults, {
		datatype: "JSON",
		mtype: "POST",
		autowidth: true,
		shrinkToFit: true,
		rownumbers: true,
		rowNum: 10,
		multiboxonly: true,
		multiselect: true,
		viewrecords: true,
		scrollrows: true,
		rownumWidth: 52,
		rowList: [10, 50, 100, 500],
		height: 350,
		jsonReader: {
			repeatitems: false,
			root: "content",
			total: "totalPages",
			records: "totalElements",
		}
	});
})(jQuery);
$(function(){
	$(".js-refresh").click(function(){
		$("#"+$(this).attr("target")).trigger("reloadGrid");
	})
	$(".js-search").click(function(){
		var params=$("#"+$(this).attr("data"));
		if(params==undefined){
			params="";
		}
		$("#"+$(this).attr("target")).jqGrid("setGridParam",  {postData: {"searchParams": params.val()}}).trigger('reloadGrid');
	})
	$(".keyword").keypress(function (e) {
		if (e.keyCode == 13) {
			$(".js-search").click();
			return false;
		}
	})
	$(".js-delete").click(function(){
		var $grid=$("#"+$(this).attr("target"));
		var ids=$grid.jqGrid("getGridParam", "selarrrow");
		if(ids==""){
			layer.msg("未选择记录", {time:1000}, function(){
			});
		} else {
			ids=ids.join(",");
			$.ajax({
				type: "POST",
				url: $(this).attr("action")+".jhtml",
				datatype: 'JSON',
				data: {ids: ids},
				success: function(json) {
					layer.msg(json.message, {time:1000}, function(){
						$grid.trigger("reloadGrid");
					});
				}
			});
		}
	})

})