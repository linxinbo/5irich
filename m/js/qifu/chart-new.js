$(document).ready(function () {
	//判断是否开户
	var args = new getArgs();
	var isopen = $.cookie("isopen");
	if (isopen == 1) {
		$(".go_open").hide();
	} else {
		$(".go_open").show();
//		$("span.legend_all").addClass("color_gray");
		canvasChart(110, 10, 0, 0);
	}

})


function canvasChart(value_com, value_short, value_high, isopen) {
	console.log("开始绘制");
	console.log(value_com);
	console.log(value_short);
	console.log(value_high);
	var color_com = "";
	var color_short = "";
		color_com = "#ebb563";
		color_short = "#bb1a2f";
    console.log(color_com);
    console.log(color_short);
	var color_high = "#ffdf74";
	if (isopen == 0) {
		value_com == 100;
		color_com = "#cccccc";
		color_short = "#cccccc";
		color_high = "#cccccc";
	}
	var doughnutData = [
		{
			value: value_com,
			color: color_com
				},
		{
			value: value_short,
			color: color_short
				},
		{
			value: value_high,
			color: color_high
				}
			];
	console.log(doughnutData);
	//	window.onload = function () {
	var ctx = document.getElementById("chart-canvas").getContext("2d");
	window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {
		responsive: false,
		animation: false,
		scaleShowLabels: false,
		segmentShowStroke: false,
		scaleOverlay: false,
		scaleOverride: false,
		scaleShowLabels: false,
		scaleLabel: null,
		scaleIntegersOnly: false,
		showTooltips: false
	});
};
