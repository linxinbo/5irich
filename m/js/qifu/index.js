$(document).ready(function () {
	$("ul.normal2_list").unbind("click").click(function () {
		var expandId = $(this).attr("data-expand");
		$(".normal2_list[data-expand=" + expandId + "]").find(".funs_list").toggleClass("show");

		var expandtrag = $(this).children(".funs_list").hasClass("show");
		if (expandtrag) {
			$(".normal2_list[data-expand=" + expandId + "]").children("li:eq(0)").find("em").html("收起");
			if (expandId == 0) {
				getStockTypeList("股票型", 0);
			} else if (expandId == 1) {
				getStockTypeList("混合型", 1);
			} else if (expandId == 2) {
				getStockTypeList("债券型", 2);
			} else if (expandId == 3) {
				getStockTypeList("QDII", 3);
			} else if (expandId == 4) {
				getStockTypeList("货币型", 4);
			}
		} else {
			$(".normal2_list[data-expand=" + expandId + "]").children("li:eq(0)").find("em").html("更多");
		}
	});

	$("ul.normal2_list").delegate("ul.funds_list_a", "click", function (e) {
		e.stopPropagation();
		var fundid = $(this).find(".go-buy").attr("data-id");
		var fundname = $(this).find(".go-buy").attr("data-name");
		var fundtype = $(this).find(".go-buy").attr("data-type");
		window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&type=" + fundtype;
		console.log("s")

	})
})
