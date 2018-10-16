var StrUtil = {
	arrStrUtil : {
		addItem : function(item, srcStr) {
    		if (srcStr == undefined || srcStr == null || srcStr == "") {
    			srcStr = ',' ;
    		} 
    		if (srcStr.indexOf("," + item + ",") == -1) {
    			srcStr += item + ",";
    		}
    		return srcStr;
		},
		delItem : function(item, srcStr) {
		  	var reg = new RegExp("," + item + ",");
		    if (reg.test(srcStr)) {
		    	srcStr = srcStr.replace(reg, ",");
		   	}
		    return srcStr;
		},
		containItem : function(item, srcStr) {
			var reg = new RegExp("," + item + ",");
		    if (reg.test(srcStr)) {
		    	return true;
		   	}
		    return false;
		},
		getItems : function(srcStr) {
			if(srcStr == undefined || srcStr == null || srcStr == "") {
	    		return srcStr;
	    	}
			srcStr = srcStr.slice(1,srcStr.length-1);
	    	var ids = srcStr.split(',');
	    	return ids;
		}
	}
};