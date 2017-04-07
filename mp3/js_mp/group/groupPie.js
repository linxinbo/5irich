$(document).ready(function () {

});
var pie = {};
	pie.color_1 = "#e93a4e";
	pie.color_2 = "#e4b31e";
	pie.color_3 = "#ca0de0";
	pie.color_4 = "#00a0e9";
	pie.color_5 = "#00fff0";
    pie.color_6 = "#35bb00";
    pie.color_7 = "#2250fa";
	pie.doughnutData = [
		{
			value: 0,
			color: pie.color_1
				},
		{
			value: 0,
			color: pie.color_2
				},
		{
			value: 0,
			color: pie.color_3
				},
		{
			value: 0,
			color: pie.color_4
				},
		{
			value: 0,
			color: pie.color_5
				},{
			value: 0,
			color: pie.color_6
		},{
			value: 0,
			color: pie.color_7
		}
			];
//绘制组合饼图；
function canvasPie() {
	console.log("开始绘制");
	console.log(pie.doughnutData);
	//	window.onload = function () {
	var ctx = document.getElementById("pie-canvas").getContext("2d");
	window.myDoughnut = new Chart(ctx).Doughnut(pie.doughnutData, {
		responsive: false,
		animation: false,
		scaleShowLabels: false,
		segmentShowStroke: false,
		scaleOverlay: false,
		scaleOverride: false,
		scaleShowLabels: false,
		scaleLabel: null,
		scaleIntegersOnly: false,
		showTooltips: true
	});
};
