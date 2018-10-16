var exportUtil = {
	exportExcelLocal: function (table, examId, subjectId, showClazzData) {
		
			var colNamesObj = table.jqGrid("getGridParam", "colNames");	// 列显示名称，是一个数组对象
			var colModelObj = table.jqGrid("getGridParam", "colModel");	// 列属性，是一个数组对象
			var colNamesStr = "";	// 用于存放列名
			var cols=[];	// 用于存放显示的列名
			for (k = 0, l = colNamesObj.length; k < l; ++k) {
				colModelParam = colModelObj[k];
				if (colModelParam.hidden || colModelParam.hidedlg || colModelParam.disableExport) {	// 如果该列是隐藏的
					continue;
				}
				cols.push(k)
				colNamesStr += (colNamesObj[k] + "\t");
			}
			colNamesStr += "\n";
			
			var result = colNamesStr;
			var pathName=window.document.location.pathname;
			var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
			
			var d = $('<form method="post" target = "_blank" action="gridexport.jhtml"></form>').appendTo("body");
			var o = $('<input type="hidden" name="exportDatas"/>').appendTo(d);
			var e = $('<input type="hidden" name="examId"/>').appendTo(d);
			var s = $('<input type="hidden" name="subjectId"/>').appendTo(d);
			var display = $('<input type="hidden" name="showClazzData"/>').appendTo(d);
			o.val(result);
			e.val(examId);
			s.val(subjectId);
			display.val(showClazzData);
			d.submit();
			d.remove();
			
	}
};