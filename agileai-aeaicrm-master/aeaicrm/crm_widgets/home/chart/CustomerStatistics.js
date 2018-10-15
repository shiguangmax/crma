angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$state) {
	$scope.loadCustomerStatisticsData =function (){
		var url = '/aeaicrm/services/Customers/rest/home-card-list/';
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.eliminatRate = rspJson;
			if(rspJson.length == 0){
			  $scope.labels = ['无记录'];
			  $scope.series = ['商机数', '订单数'];
			  $scope.colours = ['#1D7BD0','#FB4443'];
			  $scope.data = [
			    [0],[0]
			  ];
			}else{
				$scope.labels = [];
				for( var i = 0 ; i < rspJson.length ; i++){
					$scope.labels[i] = rspJson[i].custName;
				}
				
				$scope.series = ['商机数', '订单数'];
				$scope.colours = ['#1D7BD0','#FB4443'];
				$scope.data = [[]];
				for(var i = 0 ; i < rspJson.length; i++){
					$scope.data[0][i]= rspJson[i].oppNum;
					$scope.data[0][i]= rspJson[i].orderNum;
				}
			}
			 $scope.click = function () {
				 $state.go("tab.customer-statistics");  
			  };
		})
	}
	$scope.loadCustomerStatisticsData();
});
