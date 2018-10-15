angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$ionicActionSheet,$state,$ionicPopup){
	$scope.visitInfomation = function(){
		  var url = '/aeaicrm/services/Customers/rest/get-visit-info/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.visitInfo = rspJson;
				$scope.visitInfo.visitDate = new Date($scope.visitInfo.visitDate);
			});	
	  };
	  $scope.visitInfomation();
	  
	  $scope.updateSave = function(){
		  AppKit.isLogin().success(function(data, status, headers, config){
			  if (data.result=='true'){
				  $scope.userLogin = "isLogin";
					AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
						"success":function(){
							var url = '/aeaicrm/services/Customers/rest/update-visit-info/'
							AppKit.postJsonApi(url,JSON.stringify($scope.visitInfo)).then(function(response){
								if ("success" == response.data){
									var alertPopup = $ionicPopup.alert({  title: '保存成功!' });
										AppKit.hideMask();
								        alertPopup.then(function(res) {
								        	$state.go('tab.my-customer-information', {"id": $stateParams.custId});
							        });
								}else{
									AppKit.errorPopup();
								}
							});
						}
					})
			  }
		  })
	  };
	  
	  $scope.submit = function(){
		  AppKit.isLogin().success(function(data, status, headers, config){
			  if (data.result=='true'){
				  $scope.userLogin = "isLogin";
					AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
						"success":function(){
							var url = "/aeaicrm/services/Customers/rest/submit-visit-state/"+$stateParams.id;
							AppKit.getJsonApi(url).success(function(rspJson){
								if("success" == rspJson){
									var alertPopup = $ionicPopup.alert({  title: '提交成功!' });
									AppKit.hideMask();
							        alertPopup.then(function(res) {
							        	$state.go('tab.my-customer-information', {"id": $stateParams.custId});
							        });
								}
								else{
									AppKit.errorPopup();
								}
							});  
						}
					})
			  }
		  })
	  };
	  
	  $scope.linkmans = function(){
			var url = '/aeaicrm/services/Customers/rest/find-cont-list/'+$stateParams.custId;
				AppKit.getJsonApi(url).success(function(rspJson){
					$scope.linkmanList = rspJson;
				});
		}
		$scope.linkmans();
		
	  $scope.showActionSheet = function() {
			var hideSheet = $ionicActionSheet.show({
		          buttons: [
		            { text: '<b>保存</b> ' },
		            { text: '<b>提交</b> ' },
		          ],
		          titleText: '请选择您的操作',
		          cancelText: '取消',
		          cancel: function() {
		               // add cancel code..
		          },
		          buttonClicked: function(index) {
		        	  if(index==0){
		        		  $scope.updateSave();
		        	  }
		        	  if(index==1){
		        		  $scope.submit();
		        	  }
		            return true; 
		          }
		      });
	  }
	  
	  $scope.visitInfo = {"type":"","effect":"","visitDate":"","receptionName":"","receptionSex":"","receptionJob":"","receptionPhone":""};
		$scope.isValidSaveInfo = function(){
			var visit = $scope.visitInfo;
			if (visit.type && visit.type != '' && visit.effect && visit.effect!='' && visit.visitDate && visit.visitDate!='' 
				&& visit.receptionName && visit.receptionName!='' && visit.receptionSex && visit.receptionSex!='' 
					&& visit.receptionJob && visit.receptionJob!='' && visit.receptionPhone && visit.receptionPhone!=''){
				return true;
			}
			else{
				return false;
			}
		};
});