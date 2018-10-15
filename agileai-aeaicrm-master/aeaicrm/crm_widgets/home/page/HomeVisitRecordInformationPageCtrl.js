angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams,$state){
	
	  $scope.visitInfomation = function(){
		  var url = '/aeaicrm/services/Customers/rest/get-visit-info/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.visitInfo = rspJson;
				$scope.visitInfo.visitDate = new Date($scope.visitInfo.visitDate);
			});	
	  };
	  
});