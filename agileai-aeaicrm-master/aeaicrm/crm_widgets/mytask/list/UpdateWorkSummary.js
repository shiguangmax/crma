angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout){
	var url = '/map/services/DataProvider/rest/static-data/SimpleListJson';
	AppKit.getJsonApi(url).success(function(rspJson){
		$scope.listInfo = rspJson.listinfo;
	});	
	
	$scope.showActionSheet = function() {
	      var hideSheet = $ionicActionSheet.show({
	          buttons: [
	            { text: '<b>发布</b> ' },
	            { text: '<b>删除</b>'  }
	          ],
	          titleText: '请选择您的操作',
	          cancelText: '取消',
	          cancel: function() {
	               // add cancel code..
	          },
	          buttonClicked: function(index) {
	        	  if(index==0){
	        		  AppKit.successPopup({"title":"发布成功!"});
	        	  }
	        	  else if(index==1){
	        		  AppKit.successPopup({"title":"删除成功!"});
	        	  }
	            return true; 
	          }
	      });
	
	      $timeout(function() {
	          hideSheet();
	      }, 5000); 
	  }; 	
});