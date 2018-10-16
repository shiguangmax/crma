/**
 * 通用的方法
 * caoxu 2016.11.18
 */
//loading加载函数对象，loading队列
var $load=undefined, ajaxCount=0;
var commonModel = {
	mobileAjax : function(config, data, callback) {
		var result = undefined;
		config.type = config.type == undefined ? "post" : config.type;
		//异步、同步控制参数
		config.async = config.async == undefined ? false : config.async;
		$.ajax({
			type : config.type,
			url : config.url,
			datatype : 'JSON',
			async : config.async,
			data : data,
			beforeSend : function(XMLHttpRequest) {
				ajaxCount++
				//>1说明已经有其它ajax进程产生的loading，不再调用loading()了
				if(ajaxCount==1 && $load==undefined){
					$load=loading();
				}
			},
			success : function(json) {
				if (json=="invalid-session") {
					if (layer !=undefined) {
						layer.open({
						    title: [
						      '登录已超时',
						      'background-color: #FF4351; color:#fff;'
						    ],
						    content: '可能由于您长时间未操作。请在公众号内重新打开页面。',
						    shadeClose: false
					  	});
					} else
						alert("可能由于您长时间未操作。请在公众号内重新打开页面。");
					return false;
				}
				if (!config.async) { //若同步
					if (json != null && json !=undefined) {
						result=json;
					}
				} else { //异步则在此处执行函数
					if (callback!= undefined) {
						callback(json);
					}
				}
			},
			complete : function(XMLHttpRequest,textStatus) {
				//<2说明除了本次请求，没有其它ajax在加载了
				if(ajaxCount<2){
					setTimeout("finish()",600);
				}
				ajaxCount--;
            },
            error : function(data) {
            	alert("发生错误");
            }
		});
		return result;
	},
	//下拉刷新
	loaded : function(a, box, msg, b) {
		var myScroll = new IScroll("#"+box, { 
			probeType: 3,
			mouseWheel: true,
			click: true });
		var $pullUp = $("#"+msg), $pullDown=$("#pull-down-msg");
		myScroll.on("scroll",function(){
			var y = this.y,
			maxY = this.maxScrollY - y;
			if(isEnable==undefined || isEnable){
				$pullUp.show();
			}
		});
		myScroll.on("slideDown",function(){
			if(b !=undefined &&this.y >55){
				b();
				myScroll.refresh();
			}
		});
		myScroll.on("slideUp",function(){
			var h=this.maxScrollY;
			if(h-this.y>40 && isEnable){
				a();
				myScroll.refresh();
				setTimeout(function (){
					myScroll.scrollTo(0,h-150,200);
				},400);
			}
		});
		$("#more").on("click",function(){
			if(isEnable){
				a();
				myScroll.refresh();
			}
		});
		//返回对象以便外部使用
		return myScroll;
	},
	//保存cookie
	addCookie : function(cname, cvalue, exdays) {
		var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	//获取cookie
	getCookie : function(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	},
	mobileHint : function(text){
		var tiphtml='<div style="background:#000;opacity:.2;position:fixed;z-index:99999;left:0px;top:0px;width:100%;height:100%;"></div><div style="background-color: #fff;width: 65%;margin: auto;position: fixed;left: 50%;top: 50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align: center;border-radius: 5px;z-index:100000;display:table;"><div style="display:table;width:100%;"><p style="display:table-cell;line-height:19px;vertical-align:middle;text-align:center;font-size:16px;color:#696969;">'+text+'</p></div></div>';
		return $(tiphtml).appendTo($('body'));
	},
	//列表分页栏
	createPage : function(data, dom){
		if(!data.lastPage && !data.firstPage){
			dom.append("<div class='pageBar'><span class='firstPage'>首页</span><span class='prevPage'>上一页</span><span class='nextPage'>下一页</span><span class='lastPage'>尾页</span></div>");
		}else if(data.firstPage && !data.lastPage){
			dom.append("<div class='pageBar'><span class='nextPage'>下一页</span><span class='lastPage'>尾页</span></div>");
		}else if(!data.firstPage && data.lastPage){
			dom.append("<div class='pageBar'><span class='firstPage'>首页</span><span class='prevPage'>上一页</span>");
		}
	},
	//选择框分页栏
	createDigPage : function(data, dom){
		if(!data.lastPage && !data.firstPage){
			dom.append("<div class='item_page'><span class='prevDig' onclick='prevDig()'>上一页</span><span class='nextDig' onclick='nextDig()'>下一页</span></div>");
		}else if(data.firstPage && !data.lastPage){
			dom.append("<div class='item_page'><span class='nextDig' onclick='nextDig()'>下一页</span></div>");
		}else if(!data.firstPage && data.lastPage){
			dom.append("<div class='item_page'><span class='prevDig' onclick='prevDig()'>上一页</span>");
		}
	},
	//带分页的选择框
	createPageLayer : function(callback, html){
		layer.open({
		    type: 1,
		    content: html,
		    anim: 'scale',
		    shade: 'background-color: rgba(0,0,0,.3)',
		    style: 'position: fixed; height: 292px; top: auto; bottom: 19%; left: 5%; width: 90%; border: none;',
		    success: function(elem){
		    	callback();
		    }
	    });
	},
	//不带分页的选择框
	createLayer : function(callback, html){
		layer.open({
		    type: 1,
		    content: html,
		    anim: 'scale',
		    shade: 'background-color: rgba(0,0,0,.3)',
		    style: 'position: fixed; max-height: 82%; top: 9%; left: 9%; width: 82%; border: none;',
		    success: function(elem){
		    	callback();
		    }
	    });
	}
};
//显示loading
function loading() {
	var HTML = "<div style='background:#000;opacity:0;filter:Alpha(opacity=0);position:fixed;z-index:9999;left:0px;top:44px;width:100%;height:100%;'></div>"+
	"<div style='-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;width:60%;margin:auto;position:fixed;left:50%;top:40%'><div class='loadingStyle6'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></div>";
	return $(HTML).appendTo($('body'));
}
//关闭loading
function finish() {
	if($load !=undefined){
		$load.remove();
		$load=undefined;
	}
}
//判断是否在数组里
function _contains(child, array){
	for(var i=0;i<array.length;i++){
		if(array[i]==child){
			return true;
		}
	}
	return false;
}
// 格式化CST日期的字串
function formatCSTDate(strDate, format) {
	if (strDate.trim()=="") {
		return "-";
	}
	return formatDate(new Date(strDate), format);
}
//
function formatDate(date, format) {
	var paddNum = function(num) {
		num += "";
		return num.replace(/^(\d)$/, "0$1");
	}
	// 指定格式字符
	var cfg = {
		yyyy : date.getFullYear() // 年 : 4位
		,yy : date.getFullYear().toString().substring(2)// 年 : 2位
		,M : date.getMonth() + 1 // 月 : 如果1位的时候不补0
		,MM : paddNum(date.getMonth() + 1) // 月 : 如果1位的时候补0
		,d : date.getDate() // 日 : 如果1位的时候不补0
		,dd : paddNum(date.getDate())// 日 : 如果1位的时候补0
		,hh : date.getHours() // 时
		,mm : date.getMinutes() // 分
		,ss : date.getSeconds()// 秒
	}
	format || (format = "yyyy-MM-dd");
	return format.replace(/([a-z])(\1)*/ig, function(m) {
		return cfg[m];
	});
}

 var m_st, m_po = 300; //滚动到300像素时显示
	$(window).scroll(
		function() {
	        m_st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
	        if (m_st > m_po) {
	        	$("#toTop").show();
	        }else{
	            $("#toTop").hide();
	        }
		}
	)
/*********** 各种html模板变量，用于layer.js弹出层 ***********/
var paramsHtml="<div class='chose_dig' id='choseItems'></div>";