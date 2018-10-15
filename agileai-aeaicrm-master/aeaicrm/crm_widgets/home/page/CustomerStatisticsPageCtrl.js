angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit){
	$scope.limitSize = 5
	
	$scope.fullHeight = {"min-height":(AppKit.getConfig("ScreenHeight")-90)+"px","background-color":"white"};
	
	$scope.setActiveTab = function (activeTab) {     
		　　$scope.activeTab = activeTab; 
	};
	
	$scope.showPolicy = function(itemIndex){
		var rangeDiff = $scope.limitSize/2 + 1;
		var curentIndex = $scope.curentIndex;
		if($scope.totalSize <= $scope.limitSize){
			//不显示箭头图片
			$scope.showLeftionic = false;
			$scope.showRightionic = false;
			return true;
		}else{
			if (curentIndex >=rangeDiff){
				//显示向左箭头
				$scope.showLeftionic = true;
				$scope.showRightionic = false;
				
				if($scope.totalSize - curentIndex <= $scope.limitSize/2){
					if(itemIndex >= $scope.totalSize - $scope.limitSize){
						return true;
					}else{
						return false;
					}
				}else{
					//显示向左、右的箭头
					$scope.showLeftionic = true;
					$scope.showRightionic = true;
					if (itemIndex <= curentIndex + $scope.limitSize/2 && itemIndex > curentIndex - $scope.limitSize/2){
						return true;
					}else{
						return false;
					}
				}
			}else{
				//显示向右箭头
				$scope.showLeftionic = false;
				$scope.showRightionic = true;
				
				if(itemIndex <$scope.limitSize){
					return true;
				}else{
					return false;
				}
			}
		}
	}
	
	$scope.onSwipeLeft = function(){
		for(var i=0;i< $scope.tabs.length;i++){
			var tempTab = $scope.tabs[i];
			if (tempTab == $scope.activeTab){
				if (i == ($scope.tabs.length-1))continue;
				$scope.activeTab = $scope.tabs[i+1];
				
				$scope.saleId = $scope.userInfos[i+1].userId;
				$scope.changeClass($scope.activeTab,$scope.saleId);
				
				$scope.curentIndex = i+1;
				break;
			}
		}
	};

	$scope.onSwipeRight = function(){
		for(var i=0;i< $scope.tabs.length;i++){
			var tempTab = $scope.tabs[i];
			if (tempTab == $scope.activeTab){
				if (i == 0)continue;
				$scope.activeTab = $scope.tabs[i-1];
				
				$scope.saleId = $scope.userInfos[i-1].userId;
				$scope.changeClass($scope.activeTab,$scope.saleId);
				
				$scope.curentIndex = i-1;
				break;
			}
		}
	};
	
	$scope.changeClass = function(userCode,userId) {
		$scope.activeUserCode = userCode;
		$scope.saleId = userId;
		var url = '/aeaicrm/services/Customers/rest/find-opp-order-list/'+$scope.saleId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.saleCustomerList = rspJson;
		});	
	}
	
	$scope.setActiveUserId = function(userId) {
		$scope.activeUserId = userId;
	}
	
	$scope.initWeekExaminationUserInfos = function() {
		var url = '/aeaicrm/services/Customers/rest/home-card-saleList';
		var promise = AppKit.getJsonApi(url);
		promise.success(function(rspJson){
			$scope.userInfos = rspJson.userInfos;
			$scope.userCodes = rspJson.userCodes;
			$scope.activeUserCode = $scope.userInfos[0].userCode;
			$scope.activeUserId = $scope.userInfos[0].userId;
			$scope.userId = $scope.userInfos[0].userId;
			$scope.tabs = $scope.userCodes;
			$scope.activeTab = $scope.tabs[0];
			
			$scope.totalSize = $scope.userCodes.length;
			$scope.curentIndex = 0;
			$scope.saleCustomerList();
		});
	}
	$scope.initWeekExaminationUserInfos();
	
	$scope.saleCustomerList = function(){
		$scope.saleId = $scope.userId;
		var url = '/aeaicrm/services/Customers/rest/find-opp-order-list/'+$scope.saleId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.saleCustomerList = rspJson;
		});	
	}
	
});