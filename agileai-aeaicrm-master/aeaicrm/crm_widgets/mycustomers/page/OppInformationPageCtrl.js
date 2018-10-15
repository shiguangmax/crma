angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams){
	  
	  $scope.oppInfomation = function(){
		  var url = '/aeaicrm/services/Customers/rest/get-opp-info/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.oppInfo = rspJson;
			});	
	  };
	  
});