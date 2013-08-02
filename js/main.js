(function($, document)
{
$(document).ready(function()
{
	window.hue.setIpAndApiKey("192.168.1.76", "chrisalvares");
	window.hue.turnOn(3);
	$(".canvas-main").dashboardDirector({max:50, spawn_rate:500});
});


})(jQuery, document);