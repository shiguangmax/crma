angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicPopup,$stateParams,$ionicActionSheet,$state,$ionicHistory,$rootScope){
	//加载数据
	$scope.loadPotentialCustomerInfoData = function(){
		var url = '/aeaicrm/services/ProCustomer/rest/get-info/'+$stateParams.orgId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.customerInfo = rspJson;
		});	
	}
	$scope.loadPotentialCustomerInfoData();
	
	$scope.$on('$stateChangeSuccess', $scope.loadPotentialCustomerInfoData); 

	//删除客户信息
	$scope.searchWord = '{"orgState":"","orgClassification":"","orgLabels":""}';
	$scope.deleteCustomerInfo = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: '信息确认',
          template: '您确认要删除数据吗？'
        });
        confirmPopup.then(function(res) {
          if(res) {
        	  var url = "/aeaicrm/services/ProCustomer/rest/delete-visit-info/"+$stateParams.orgId;
      		AppKit.getJsonApi(url).success(function(rspJson){
      			if ("success" == rspJson){
      				$ionicHistory.goBack();
      				/*$state.go("tab.potential-customer-list",{"searchWord": $scope.searchWord});*/
      			}
      		});
          } 
        });
      };

      //打开拜访记录模态
	$scope.openVisitListModal = function(id,category) {
		$scope.visitId = id;
		if("我的客户拜访" == category){
			$scope.visitCategory = 'FOLLOW_CUST';
		}else if("潜在客户拜访" == category){
			$scope.visitCategory = 'PRO_CUST';
		}
		
		AppKit.createModal("${menuCode}","PotentialVisitingRecordModal",$scope);
	}
	
	$scope.showActionSheet = function() {
	      var hideSheet = $ionicActionSheet.show({
	          buttons: [
	            { text: '<b>编辑基本信息</b>'  },
	            { text: '<b>删除潜在客户</b>'  },
	            { text: '<b>分配客户</b>'  }
	          ],
	          titleText: '请选择您的操作',
	          cancelText: '取消',
	          cancel: function() {
	               // add cancel code..
	          },
	          buttonClicked: function(index) {
	        	  if(index==0){
	        		  $state.go("tab.edit-potentialcustomer",{"orgId": $stateParams.orgId});
	        	  }
	        	  else if(index==1){
	        		  $scope.deleteCustomerInfo();
	        	  }
	        	  else if(index==2){
	        		  $state.go("tab.assign-customer",{"orgId": $stateParams.orgId}); 
	        	  }
	            return true; 
	          }
	      });
	  };
});