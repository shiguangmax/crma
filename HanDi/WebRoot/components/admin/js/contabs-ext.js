$(function() {

	
	function refresh() {
		var url = $('.J_mainContent iframe:visible').attr('src');
		var iframeId = $('.J_mainContent iframe:visible').attr('name');
		window.frames[iframeId].location.href = url;
	}
	$('.J_tabRefreshActive').on('click', refresh);
});