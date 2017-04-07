$(document).ready(function () {
	
	getStockTypeList("混合型", 1);
	$(".ty_sreach_as").click(function(){
		window.location.href="../search/search.html";
	});
	$("ul.header_bottom").find("li").unbind("click").click(function () {
		$(".viewport").empty();
		var expandId = $(this).attr("data-expand");
		$(".header_bottom").find("li").removeClass("recommend_white");
		$(this).addClass("recommend_white");
		var expandtrag = $(this).hasClass("recommend_white");
		if (expandtrag) {
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
		}
	});
})





	//获取股票型基金列表
function getStockTypeList(stockType, stockcode) {
	/*hideloading();*/
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
				//console.log(data.data);
				
				/*$(".normal2_list[data-expand=" + stockcode + "]").find(".funs_list").html("");*/
				$(data.data).each(function (i, n) {
					var strHtml = "";
					//var fundId = n.fundId.substring(0, 6);
					var fundId = n.fundId;
					//console.log(fundId);
					var fundName = n.fundName;
					var fNavUnit = n.fNavUnit;
					//console.log(fNavUnit);
					var fundTypeGoods = n.fundTypeGoods;
					var fAvgreturnYear = parseFloat(n.fAvgreturnYear);
					//console.log(n.fAvgreturnYear);
					//console.log(fAvgreturnYear);

					var value1 = n.fAvgreturnYear; //取值 转数字
					//console.log(value1);
					var className="font_hongse";
					if(value1>0){
						className="font_hongse";
					}else if(value1<0){
						className="font_lv";
					}else{
						className="font_heise";
					}



					strHtml = "<ul class='jijinlist_table mtopd'>";
                    strHtml += "<li class='bottomline tj_li'>";
                    strHtml += "<h2 class='jijinlist_table_t'>";
                    strHtml += "<em>"+fundName+"</em>";
                    strHtml += "<i>（"+fundId.substring(0, 6)+"）</i></h2>";
                    /*strHtml += "<i class='btn_fxdj btn_outline_lanse mleft "+classNamelabel+"'>"+classNamecn1+"</i><i class='btn_fxdj "+className+" mleft'>"+classNamecn+"</i>";*/
                    strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                    strHtml += "<span class='t_span'>模拟购买</span>";
                    strHtml += "<i class='t_san mleft5'></i></a></li>";
                    strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='tj_li1'><a class='rightline'>";
                    strHtml += "<span class='datitle font_heise'>"+Number(fNavUnit).toFixed(4)+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>最新净值</b></a></li><li class='tj_li2'>";
                    strHtml += "<a class='rightline' profit='"+fAvgreturnYear.toFixed(2)+"'><span class='datitle "+className+"'>"+fAvgreturnYear.toFixed(2)+"%</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>近一年收益率</b></a></li>";
                    strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                    strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' data-fundTypeGoods='"+fundTypeGoods+"' class='btn_home btn_lanse tj_buy'>立即购买</button>";
                    strHtml += "<span class='xxiaotitle font_huise mtop'>申购费率</span>";
                    strHtml += "<b class='xxiaotitle font_lanse'>"+fanhuiz(fundTypeGoods)+"</b></a></li></ul></div></ul>";
                    $(".viewport").append(strHtml);
                    //buyGroupDetail();
					console.log("刷新 基金列表");

					
					
					//基金详情
					$(".tj_li").on("click",function(){
				        var ordername = $(this).parent().find(".jijinlist_table_content").find(".tj_buy").attr("data-name");
				        var fundId = $(this).parent().find(".jijinlist_table_content").find(".tj_buy").attr("data-id");
				        var fundTypeGoods = $(this).parent().find(".jijinlist_table_content").find(".tj_buy").attr("data-fundTypeGoods");
				        console.log(ordername)
				        console.log(fundId)
				        console.log(fundTypeGoods)
				        window.location.href = "../fund/fund_detail.html?fundid=" + fundId + "&fundname=" + ordername + "&type=" + fundTypeGoods;
				    })
				    $(".tj_li1").on("click",function(){
				    	var ordername = $(this).parent().find(".tj_buy").attr("data-name");
				        var fundId = $(this).parent().find(".tj_buy").attr("data-id");
				        var fundTypeGoods = $(this).parent().find(".tj_buy").attr("data-fundTypeGoods");
				        window.location.href = "../fund/fund_detail.html?fundid=" + fundId + "&fundname=" + ordername + "&type=" + fundTypeGoods;
				    })
				    $(".tj_li2").on("click",function(){
				    	var ordername = $(this).parent().find(".tj_buy").attr("data-name");
				        var fundId = $(this).parent().find(".tj_buy").attr("data-id");
				        var fundTypeGoods = $(this).parent().find(".tj_buy").attr("data-fundTypeGoods");
				        window.location.href = "../fund/fund_detail.html?fundid=" + fundId + "&fundname=" + ordername + "&type=" + fundTypeGoods;
				    })
					
					
					//立即购买
					/*$(".normal2_list[data-expand=" + stockcode + "]").find(".funs_list").append(stringhtml);*/
					$("button.tj_buy").unbind("click").click(function (e) {
						e.stopPropagation();
						console.log("购买");
						var fundname = $(this).attr("data-name");
						var fundid = $(this).attr("data-id");
						fundid=fundid.substring(0, 6);
						buyStep1(fundid, fundname);
					});
					//模拟购买
					$("a.more_c").unbind("click").click(function (e) {
						e.stopPropagation();
						console.log("模拟购买");
						var fundname = $(this).attr("data-name");
						var fundid = $(this).attr("data-id");
						var fundvalue = $(this).attr("data-value");
						Simulation(fundid);
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

function fanhuiz(val){
	if(val=="货币型"||val=="货币市场型"){
		return "免费";
	}else{
		return "最低4折";
	}
}
