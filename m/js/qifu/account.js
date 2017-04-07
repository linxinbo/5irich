$(function () {
	//判断是否开户
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined|| username == "null") {
		setErrorMsg(1001);
	} else {
		getAccount();
		getduanli();
	}
	
	//在“我的资产”标题后添加 当前时间
	$("span#account").text("   ("+show()+")");
	
	//nav-bar切换
	$(".new_nav li").on("click", function () {
		$(this).addClass("sele").siblings().removeClass("sele");
		if ($(this).hasClass("short")) {
			$(".no_open").hide();
			$(".no_open_after").hide();
			$(".account_data").hide();
			$(".duanli_data").show();
		} else if ($(this).hasClass("high")) {
			if (isopen == 1) {
				$(".no_open").hide();
				$(".no_open_after").show();
			} else {
				$(".no_open").show();
				$(".no_open_after").hide();
			}

			$(".account_data").hide();
			$(".duanli_data").hide();
		} else {
			$(".no_open_after").hide();
			$(".account_data").show();
			$(".duanli_data").hide();
		}
	})

	if (isopen == 1) {
		$(".go_open").hide();
		$(".no_open").hide();
		$(".no_open_after").hide();
		$(".account_data").show();
	} else {
		$(".row-left>span,.row-center>span,.row-right>span").html("0");
	}
	//个人资产 公募基金
	function getAccount() {
		console.log("开始刷新公墓基金");
		showLoading();
		$.ajax({
			url: mainUrl + "userAsset",
			data: "",
			dataType: "JSON",
			success: function (data) {
				hideloading();
				if (data.retcode == 0000) {
					$(".account_data ul").html("");
					//持仓总成本
					var costmoney = data.data.totalfundmarketvalue;
					//总收益
					var income = data.data.totalfundbalance;
					//总收益率
					var incomePercent = data.data.totalfundprofit;
					//资产占比；
/*					$(".row-left>span").html(costmoney + "元");
					$(".row-center>span").html(income + "元");	*/	
					$(".row-left>span").html(costmoney);
					$(".row-center>span").html(income);
					$(".row-right>span").html(incomePercent + "%");
					//公墓占比
					var percent_a = data.data.public_totalfundmarketvalue;
					percent_a = percent_a + "元";
						//短理占比
					var percent_b = data.data.short_totalfundmarketvalue;
//					if (percent_b > 10000) {
//						percent_b = percent_b / 10000 + "万";
//					} else {
//						percent_b = percent_b + "元";
//					}
                     percent_b = percent_b + "元";
					// 图列				     
					$(".legend li:eq(0) span:eq(1)").append(percent_a);
					$(".legend li:eq(1) span:eq(1)").append(percent_b);
					$(".legend li:eq(2) span:eq(1)").append(0);


					var percent_c = data.data.short_proportion;
					var percent_e = data.data.public_proportion;
					var gongmuFlag = true;
					var duanliFlag = true;
					if (percent_c == 0 || percent_c == 0.0 || percent_c == "0.0" || percent_c == "" || percent_c == null) {
						duanliFlag = false;
						percent_c = 0.01;
					}
					if (percent_e == 0 || percent_e == 0.0 || percent_e == "0.0" || percent_e == "" || percent_e == null) {
						gongmuFlag = false;
						percent_e = 0.01;
					}

					if (!duanliFlag && !gongmuFlag) {
						canvasChart(1, 0.01, 0, 0);
					} else {
						canvasChart(percent_e, percent_c, 0, 1);
					}

					if (data.data.gongMuList == undefined || data.data.gongMuList == "undefined") {

					} else {

						$(data.data.gongMuList).each(function (i, n) {
							var income_2 = n.addincomerate;
							var floatprofit = n.floatprofit;
							income_2 = income_2.toString();
							floatprofit = floatprofit.toString();
							var oneI = income_2.indexOf("-");
							var oneII = income_2.indexOf(".");
							var twoI = floatprofit.indexOf("-");
							var twoII = floatprofit.indexOf(".");
							//收益为负情况  -.09
							if (twoI == 0&&twoII==1) {
								floatprofit = "-0." + floatprofit.substring(2);
							}

							if (twoII == 0) {
								floatprofit = "0" + floatprofit;
							}
							//收益为负情况  -.09
							if (oneI == 0 && oneII == 1) {
								income_2 = "-0." + income_2.substring(2);
								income_2 = Number(income_2);
								income_2 = income_2 * 100;
							}
							//收益为.09情况；
							if (oneII == 0) {
								income_2 = "0" + income_2;
								income_2 = Number(income_2);
								income_2 = income_2 * 100;
							}
							income_2 = income_2.toString();
							console.log(income_2);
							var accountdata = '<li>' + '<div class="table_header"><a class="" href="../fund/fund_detail.html?fundid=' + n.fundcode + '&fundname=' + n.fundname + '" data-id="' + n.fundcode.substring(0, 6) + '" data-name="' + n.fundname + '"><span class="account_code">' + n.fundcode.substring(0, 6) + '</span><span class="account_name">' + n.fundname + '</span></a></div>' + '<table class="table_data">' + '<tr><td class="td_1">最新净值</td><td class="td_2">' + getdoit4(n.nav) + '</td><td class="td_3">持有份额</td><td class="td_4">' + getdoit2(n.fundvolbalance) + '</td></tr>' + '<tr><td class="td_1">成本(元)</td><td class="td_2">' + n.costmoney + '</td><td class="td_3">累计收益(元)</td><td class="td_4">' + getdoit2(floatprofit) + '</td></tr>' + '<tr><td class="td_1">参考市值(元)</td><td class="td_2">' + getdoit2(n.fundmarketvalue) + '</tds><td class="td_3">累计收益率</td><td class="td_4">' + getdoit2(income_2) + '%</td></tr>' + '</table>' + '<div class="acc_button">' + '<a class="go-buy" data-id="' + n.fundcode.substring(0, 6) + '" data-name="' + n.fundname + '"><span class="acc_add">追加</span></a><a class="go-back" data-id="' + n.fundcode.substring(0, 6) + '" data-name="' + n.fundname + '" data-transactionaccountid="' + n.transactionaccountid + '"  ><span class="acc_back">赎回</span></a>' + '</div>' + '</li>';
							$(".account_data ul").append(accountdata);
							$("a.go-buy").unbind("click").click(function (e) {
								e.stopPropagation()
								console.log("点击追加");
								var fundname = $(this).attr("data-name");
								var fundid = $(this).attr("data-id");
								buyStep1(fundid, fundname);
							});
							$("a.go-back").unbind("click").click(function (e) {
								e.stopPropagation();
								console.log("点击赎回");
								var fundid = $(this).attr("data-id");
								var fundname = $(this).attr("data-name");
								var transactionaccountid = $(this).attr("data-transactionaccountid");
								//							window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
								backStep1(fundid, fundname,transactionaccountid);
							});
						})
					}
				} else {
					setErrorMsg(data.retcode, data.retmsg);
				}
			}
		})
	};
	//个人资产  短期理财
	function getduanli() {
		showLoading();
		$.ajax({
			url: mainUrl + "shortPeriod",
			data: "",
			dataType: "JSON",
			success: function (data) {
				console.log(data)
				if (data.retcode == 0000) {
					hideloading();
					if(data.data.length==0){
						$(".duanli_data .no_data").show();
					}
					$(data.data).each(function (i, n) {
						//持仓成本
						var corpus = n.invest_money;
//						corpus = moreThanM(corpus)
							//预期收益
						var expect_annualised = n.expect_annualised;
						expect_annualised = expect_annualised + "%";
						//本期收益
						var currentPeriod_income = n.currentPeriod_income;
//						currentPeriod_income = moreThanM(currentPeriod_income);
						currentPeriod_income = currentPeriod_income;
						//预计收益
						var forecast_endIncome = n.forecast_endIncome;
//						forecast_endIncome = moreThanM(forecast_endIncome);

						var stringHtml = '<li><div class="table_header"><span class="account_code"></span><span class="account_name">' + n.product_name + '</span></div>';
						stringHtml += '<table class="table_data"><tr><td class="td_1">投资本金(元)</td><td class="td_2">' + corpus + '</td>';
						stringHtml += '<td class="td_3">预期年化</td><td class="td_4">' + expect_annualised + '</td></tr>';


						stringHtml += '<tr><td class="td_1 color_black">本期收益(元)</td><td class="td_2 color_red">' + currentPeriod_income + '</td>';
						stringHtml += '<td class="td_3 color_black">预计到期(元)</td><td class="td_4 color_red">' + forecast_endIncome + '</td></tr></table></li>';

						$(".duanli_data ul").append(stringHtml);

					})

				} else {
					setErrorMsg(data.retcode, data.retmsg);
				}
			},
			error: function (data) {
				hideloading();
				showAlert("服务器错误！");
			}
		})
	}
});

//截取%；
function getdoit2(n) {
	var x = n.indexOf(".");
	if (x == -1) {
		return n;
	}
	n = n.substring(0, x + 3);
	return n;
}

//截取%；
function getdoit4(n) {
	var x = n.indexOf(".");
	if (x == -1) {
		return n;
	}
	n = n.substring(0, x + 5);
	return n;
}
//大于10000处理
function moreThanM(n) {
	if (n > 10000) {
		n = n / 10000;
		n = String(n) + "万";
	} else {
		n = String(n) + "元";
	}
	return n;
}

//获取当前日期
function show(){
	var mydate = new Date();
	var str = "" + mydate.getFullYear() + "/";
	str += (mydate.getMonth()+1) + "/";
	str += mydate.getDate();
	return str;
}
