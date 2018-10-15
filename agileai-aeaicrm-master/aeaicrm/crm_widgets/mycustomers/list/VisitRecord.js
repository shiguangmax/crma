angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams,$state){
	
	  $scope.visitList = function(){
		  var url = '/aeaicrm/services/Customers/rest/find-cust-visit/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.listInfo = rspJson.datas;
			});	
	  };
	  $scope.visitList();
	  
	  $scope.openModal = function(id,type) {
			if(type=="showDetails"){
				$state.go('tab.visit-record-infomation', {"id": id});
			}
			else if(type=="editVisit"){
				var custId = $stateParams.id;
				$state.go('tab.edit-visit-infomation', {"id": id,"custId":custId});
			}
		};
		
		$scope.creatOpp = function(){
			var custId = $stateParams.id;
			  $state.go('tab.creat-business-opportunity',{"custId": custId}); 
		};
		
		$scope.deleteVisitRecord = function(id){
			  AppKit.confirm({operaType:'delete',action:function(){
					var url = "/aeaicrm/services/Customers/rest/delete-visit-info/"+id;
					AppKit.getJsonApi(url).success(function(rspJson){
						if ("success" == rspJson){
							$scope.visitList();
						}else if("fail" == rspJson){
							AppKit.errorPopup();
						}
					});
				}});		  
	   };
	   
});