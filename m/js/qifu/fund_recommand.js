$(document).ready(function () {
//		getStockTypeList("股票型", 0);
//		getStockTypeList("货币型", 4);
//		getStockTypeList("债券型", 2);
//		getStockTypeList("混合型", 1);
//		getStockTypeList("QDII", 3);
	})
	//获取股票型基金列表
function getStockTypeList(stockType, stockcode) {
	hideloading();
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "products",
		data: {
			fdType: stockType,
			pageSize: 0
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				$(".normal2_list[data-expand=" + stockcode + "]").find(".funs_list").html("");
				$(data.data).each(function (i, n) {
					var stringhtml = "";
					//var fundId = n.fundId.substring(0, 6);
					var fundId = n.fundId;
					console.log(fundId);
					var fundname = n.fundName;
					var fAvgreturnYear = parseFloat(n.fAvgreturnYear);

					stringhtml += '<ul class="funds_list_a"><li><div style="width:15%;padding-left:20px;" class="collect_icon"><span class="collectIcon_solid collect_i"></span></div>';
                    stringhtml += '<div class=""><span class="fundname">' + n.fundName + '</span></div>';
					stringhtml += '<div><span style="margin-left:10px;color:#999;" class="">' + fundId.substring(0, 6) + '</span></div>';
					stringhtml += '</li><li><div class="yello_color" style="width:50%"><div>';
					stringhtml += '<span class="oneyear">近一年收益率</span><br><span class="shouyi">' + fAvgreturnYear.toFixed(2) + '%</span></div></div>';
					stringhtml += '<div style = "width:25%;margin-top:5px;"><a data-id="' + fundId + '" data-name="' + fundname + '"class="go-buy" data-type="'+n.fundTypeGoods+'"><span class="add_collect1">立即购买</span></a></div>';
                    stringhtml += '<div style="width:25%;margin-top:5px;"><a class="go-add1" data-id="' + fundId + '" data-name="' + fundname + '" data-value="' + n.fNavUnit + '"><span class="add_collect1 add_hide">模拟购买</span></a></div>';
					stringhtml += '</li></ul>';

					console.log("刷新 基金列表");

					//添加列表
					$(".normal2_list[data-expand=" + stockcode + "]").find(".funs_list").append(stringhtml);
					$("a.go-buy").unbind("click").click(function (e) {
						e.stopPropagation();
						console.log("购买");
						var fundname = $(this).attr("data-name");
						var fundid = $(this).attr("data-id");
						fundid=fundid.substring(0, 6);
						buyStep1(fundid, fundname);
					});
					/*$("a.go-add").unbind("click").click(function (e) {
						e.stopPropagation();
						console.log("加自选");
						var fundname = $(this).attr("data-name");
						var fundid = $(this).attr("data-id");
						var fundvalue = $(this).attr("data-value");
						addFund(fundid, fundname,fundvalue);
					})*/
					//模拟购买
					$("a.go-add1").unbind("click").click(function (e) {
						e.stopPropagation();
						console.log("模拟购买");
						var fundname = $(this).attr("data-name");
						var fundid = $(this).attr("data-id");
						var fundvalue = $(this).attr("data-value");
						Simulation(fundid)
					})
				})
			} else {
				setErrorMsg(data.retcode);
			}
		},
		error: function (data) {
			hideloading();
			alert("服务器错误！");
		}

	})
}
