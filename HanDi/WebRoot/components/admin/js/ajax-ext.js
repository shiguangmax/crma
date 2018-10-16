layer.config({
	extend: ["extend/layer.ext.js", "skin/moon/style.css"],
	skin: "layer-ext-moon"
});

/**
 * 显示加载中
 * return 返回当前进度层的id
 */
function showLoading() {
	return layer.load(0,{shade:[0.1, "#000"]});
}

/**
 * 关闭 加载层
 * @param {Object} loadingId  加载层的id，由showLoading方法返回
 */
function closeLoading(loadingId) {
	layer.close(loadingId);
}

function showMsg(msg) {
	layer.msg(msg);
}

function showMsgTime(msg, second) {
	layer.msg(msg,{anim:second});
}