angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout){
	
	$scope.check = function (){
	    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	    var obj = document.getElementById("email");
	    if(obj.value==""){
	    	AppKit.successPopup({"title":"输入不能为空"});
	        return false;
	    }
	    if(!reg.test(obj.value)){
	    	AppKit.successPopup({"title":"格式有误"});
	        return false;
	    } 
	  }
});

