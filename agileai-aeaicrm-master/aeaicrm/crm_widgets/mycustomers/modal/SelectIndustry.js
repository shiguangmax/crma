angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit){
	$scope.closeModal = function() {
		AppKit.closeModal();
	};
	
	$scope.industry = [{"id":"0","value":"计算机/互联网/通信/电子"},
	                   {"id":"1","value":"会计/金融/银行/保险"},
	                   {"id":"2","value":"政府/非赢利机构/其他"},
	                   {"id":"3","value":"餐饮/娱乐"},
	                   {"id":"4","value":"贸易/消费/制造/营运"},
	                   {"id":"5","value":"制药/医疗"},
	                   {"id":"6","value":"广告/媒体"},
	                   {"id":"7","value":"房地产/建筑"},
	                   {"id":"8","value":"专业服务/教育/培训"},
	                   {"id":"9","value":"服务业"},
	                   {"id":"10","value":"物流/运输"},
	                   {"id":"11","value":"能源/原材料"},
	                   ];
	
	$scope.setIndustryId = function(industryId,industryValue){
		$scope.info.industry = industryId;
		$scope.industryValue = industryValue;
	}
	
	$scope.doSelectIndustry = function(){
		$scope.info.industryName = $scope.industryValue;

	}
});