angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams,$state){
		
		$scope.customerList = function(){
			AppKit.isLogin().success(function(data, status, headers, config){
				if (data.result=='true'){
					$scope.userLogin = "isLogin";
					AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
						"success":function(){
							$scope.searchWord={"level":$scope.level,"progressState":$scope.progressState,"saleMan":""};
							var url ='/aeaicrm/services/Customers/rest/list';
							AppKit.postJsonApi(url,JSON.stringify($scope.searchWord)).then(function(response){
								if (null != response.data){
									AppKit.hideMask();
									$scope.listInfo=response.data.datas;
								}
							});
						}	
					})
				}
			});

		};
		$scope.customerList();
		
		$scope.openModal = function(id,type) {
			if(type=="details"){
				$state.go('tab.my-customer-information', {"id": id});
			}
		}; 
		
		$scope.deleteCustomer = function(id){
			AppKit.confirm({operaType:'delete',action:function(){
				var url = "/aeaicrm/services/Customers/rest/delete-info/"+id;
				AppKit.getJsonApi(url).success(function(rspJson){
					$scope.customerList();
				});
			}});
		};
});