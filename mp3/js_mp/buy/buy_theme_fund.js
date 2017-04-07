$(document).ready(function () {
	$(".fund_buy").on("click", function () {
		var fundname = $(this).prevAll(".fund_name").html();
		console.log($(this).prev(".fund_name"))
		var fundid = $(this).prev(".fund_code").html();
		fundid = fundid.substring(1, 7);
		console.log(fundid);
		console.log(fundname);
		buyNewStep1(fundid, fundname);
	})
})
