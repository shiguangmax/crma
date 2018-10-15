<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${pageContext.request.contextPath}/highcharts4/jquery-1.8.3.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/highcharts4/js/highcharts.js" type="text/javascript"></script> 
<script type="text/javascript">

$(function () {
	
	var chart=new Highcharts.Chart({
		chart: {
			renderTo:'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            events:{
            	load:function(event){
            		var series=this.series[0];
            		// ajax请求后台加载数据
            		$.post("${pageContext.request.contextPath}/customer/findCustomerFw.do",{},function(result){
            			var xArr=new Array();
            			for(var i=0;i<result.length;i++){
            				xArr[i]=new Array();
            				xArr[i][0]=result[i].serveType;
            				xArr[i][1]=result[i].num;
            			}
            			series.setData(xArr);
            		},"json");
            	}
            }
        },
        title: {
            text: '客服服务分析'
        },
        tooltip: {
        	formatter:function(){
        		return '<b>'+this.point.name+'</b>:'+Highcharts.numberFormat(this.percentage,1)+'% ('+this.y+'个)'	
        	}
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '比例',
            data: [
               
            ]
        }]
	});
});
 
</script>
<title>Insert title here</title>
</head>
<body style="margin: 1px">
 <div id="container" style="min-width: 800px;height: 400px"></div>
</body>
</html>