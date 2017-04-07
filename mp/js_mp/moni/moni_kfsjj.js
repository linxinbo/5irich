//var mainUrl="http://localhost:8080/Wirich2.0/";
var dataLoading = false;
var hasError = false;
var errors = "";
var currentTab1 = 1;
var currentTab2 = 1;
var currentTab3 = 1;

//controller.OnTab1=onTab1;
//controller.OnTab2=onTab2;
//controller.OnTab3=onTab3;

var conditions = {
	"page" : 0,
	"offset" : 20
};
var result = {};
var result1 = {};
var result2 = {};
var result3 = {};
var result4 = {};
var result5 = {};
var result6 = {};
var result7 = {};
var result8 = {};
var result9 = {};
var loading = {};
$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined
			|| username == "null") {
		setErrorMsg(1001);
	} else {

		$("#kfsjj").click(function() {
			load();
		});

		$("#yeji").click(function() {
			perFormance();
		});

		$("#buyif").click(function() {
			buyInformation();
		});
		tabs(".investment_title", "select", ".investment_con");//调用跳转方法
		(function initController() {
			load();
		})();
	}

});

//标签切换
function tabs(tabTit, on, tabCon) {
	$(tabCon).each(function() {
		$(this).children().eq(0).show();
	});
	$(tabTit).each(function() {
		$(this).children().eq(0).addClass(on);
	});
	$(tabTit).children().click(function() {
		$(this).addClass(on).siblings().removeClass(on);
		var index = $(tabTit).children().index(this);
		$(tabCon).children().eq(index).show().siblings().hide();
	});
};

//开放式基金总额
function load() {
	// 开放式基金1
	var params1 = {};
	var jsontip = $("#jsonTip");
	jsontip.empty();//清空内容
	showLoading();
	$
			.ajax({
				url : mainUrl + "MutualFundOpenInformationsAction",
				data : params1,
				dataType : "JSON",
				success : function(response) {
					hideloading();
					if (response.retcode == "0000") {
						var result = response.data;
						dataLoading = false;
						//console.log(response);
						var kfs_sz = 0;//开放式基金总市值
						var kfs_yk = 0;//开放式基金总盈亏
						var kfs_ykl = 0;//开放式基金总盈亏率
						for ( var i = 0; i < result.length; i++) {
							kfs_sz += result[i].marketValue;
							kfs_yk += result[i].profitLossAmount;
							kfs_ykl += result[i].profitLossRatio;
						}
						//改变盈亏颜色 绿色 亏  红 盈利
						if (kfs_yk > 0) {
							$("#kfs_yk").removeClass("die").addClass("zhang");
						} else {
							$("#kfs_yk").removeClass("zhang").addClass("die");
						}
						var enddate = new Date().Format("yyyyMMdd");
						$("#dqdate").empty();//时间
						$("#dqdate").prepend(enddate);//时间

						//数据插入页面
						$("#kfs_sz").empty();
						$("#kfs_sz").prepend(formatCurrency(kfs_sz));
						if (kfs_ykl == 0 || result.length == 0) {
							var kfs_ykl1 = 0;
						} else {
							var kfs_ykl1 = kfs_ykl / result.length * 100;
						}

						//console.log(kfs_ykl);
						var strHtml5 = "";
						strHtml5=formatCurrency(kfs_yk) + "元";
						var strHtml6=kfs_ykl1.toFixed(2) + "%";
						$("#kfs_yk").empty();
						$("#kfs_yk").prepend(strHtml5);//总盈亏
						$("#kfs_ykl").empty();
						$("#kfs_ykl").prepend(strHtml6);//总盈亏率
						for ( var i = 0; i < result.length; i++) {
							var fundName = result[i].fundName;
							var windCode = result[i].windCode;
							var principal = result[i].principal;
							var fNavUnit = result[i].fNavUnit;
							var share = result[i].share;
							var marketValue = result[i].marketValue;
							var profitLossRatio = result[i].profitLossRatio * 100;
							var profitLossAmount = result[i].profitLossAmount;
							var amount = result[i].amount;
							var redemptionAmount = result[i].redemptionAmount;
							var strHtml = "";
							// console.log(freeratioType);                   	 
							// var deleteMsg="您确定要删除吗？"
							strHtml += '<div class="moni_cc_list mtopdd">';
							strHtml += '<div class="moni_cc_title">';
							strHtml += '<h2>' + fundName + '(' + windCode+ ')</h2>';
							strHtml += '<i class="moni_san"></i>';
							strHtml += '</div>';
							strHtml += '<ul class="moni_cc_th">';
							strHtml += '<li class="l30"><span>净值</span><i class="font_lanse">'	+fNavUnit.toFixed(4)+'</i></li>';
							strHtml += '<li class="l30 "><span>本金</span><i class="font_lanse">'+ principal.toFixed(2)+'元</i></li>';
							strHtml += '<li class="l30 "><span>份额</span><i class="font_lanse">'+ share.toFixed(2)+'份</i></li>';
							strHtml += '<li class="l30 "><span>市值</span><i class="font_lanse">'+ marketValue.toFixed(2)+'元</i></li>';
							strHtml += '<li class="l30 "><span>未赎回</span><i class="font_lanse">'+ amount.toFixed(2) +'元</i></li>';
							strHtml += '<li class="l30 "><span>已赎回</span><i class="font_lanse">'+ redemptionAmount.toFixed(2) + '元</i></li>';
							strHtml += '<li class="l30 "><span>盈亏</span><i class="font_lanse">'+ profitLossAmount.toFixed(2) + '元</i></li>';
							strHtml += '<li class="l30 "><span>盈亏率</span><i class="font_lanse">'+ profitLossRatio.toFixed(2)+ '%</i></li>';
							strHtml += '</ul>';
							strHtml += '</div>';

							jsontip.append(strHtml);
						}
						dataLoading = false;
						console.log("# -----> Data: " + JSON.stringify(result));
					} else {
						//setErrorMsg(response.retcode, response.retmsg); // 错误提示框
						console.log(response.retcode);
					}

				},
				error : function(response1) {
					if (response1 && response1.retmsg
							&& response1.retmsg.length > 0) {
						errors = response1.retmsg;
					}
					hasError = true;
				}
			});
};
//业绩信息
function perFormance() {
	var params2 = {};
	var jsontip1 = $("#jsonTip1");
	jsontip1.empty();//清空内容
	showLoading();
	$
			.ajax({
				url : mainUrl + "MutualFundAccountBookPerformaceAction",
				data : params2,
				dataType : "JSON",
				success : function(response1) {
					hideloading();
					if (response1.retcode == "0000") {
						var result1 = response1.data;
						dataLoading = false;
						//console.log(response1);
						for ( var k = 0; k < result1.length; k++) {
							var fundName1 = result1[k].fundName;//基金名称
							var windCode1 = result1[k].windCode;//基金代码
							var fAvgreturnMonth = Number(result1[k].fAvgreturnMonth);//1月
							var fSfrankRecentmontht = result1[k].fSfrankRecentmontht;//1月
							var fAvgreturnGuarter = Number(result1[k].fAvgreturnGuarter);//3月
							var fSfrankRecentquartert = result1[k].fSfrankRecentquartert;//3月
							var fAvgreturnHalfyear = Number(result1[k].fAvgreturnHalfyear);//6月
							var fSfrankRecenthalfyeart = result1[k].fSfrankRecenthalfyeart;//6月
							var fAvgreturnThisyear = Number(result1[k].fAvgreturnThisyear);//1年
							var fSfrankRecentyeart = result1[k].fSfrankRecentyeart;//1年
							var fAvgreturnYear = Number(result1[k].fAvgreturnYear);//今年以来
							var fSfrankThisyeart = result1[k].fSfrankThisyeart;//今年以来
							var fAvgreturnSincefound = Number(result1[k].fAvgreturnSincefound);//成立以来
							var fSfrankSincefoundt = result1[k].fSfrankSincefoundt;//成立以来
							var strHtml1 = "";

							strHtml1 += '<div class="moni_cc_list mtopdd">';
							strHtml1 += '<div class="moni_cc_title">';
							strHtml1 += '<h2>' + fundName1 + "(" + windCode1+ ')</h2>';
							strHtml1 += '<i class="moni_san"></i>';
							strHtml1 += '</div>';
							strHtml1 += '<ul class="moni_cc_th1">';
							strHtml1 += '<li class="l30" style="width: 100%;background-color: #f0eff4;"><span>近一月</span><i class="font_lanse"></i></li>';
							strHtml1 += '<li class="l30"><span>回报</span><i class="font_lanse">'+ fAvgreturnMonth.toFixed(2)+'%</i></li>';
							strHtml1 += '<li class="l30 " style="margin-left: 4%;"><span>排名</span><i class="font_lanse">'+ fSfrankRecentmontht+'</i></li>';
							strHtml1 += '<li class="l30" style="width: 100%;background-color: #f0eff4;"><span>近3月</span><i class="font_lanse"></i></li>';
							strHtml1 += '<li class="l30"><span>回报</span><i class="font_lanse">'+ fAvgreturnGuarter.toFixed(2) + '%</i></li>';
							strHtml1 += '<li class="l30 " style="margin-left: 4%;"><span>排名</span><i class="font_lanse">'+ fSfrankRecentquartert + '</i></li>';
							strHtml1 += '<li class="l30" style="width: 100%;background-color: #f0eff4;"><span>近6月</span><i class="font_lanse"></i></li>';
							strHtml1 += '<li class="l30"><span>回报</span><i class="font_lanse">'+ fAvgreturnHalfyear.toFixed(2)	+'%</i></li>';
							strHtml1 += '<li class="l30 " style="margin-left: 4%;"><span>排名</span><i class="font_lanse">'+ fSfrankRecenthalfyeart+'</i></li>';
							strHtml1 += '<li class="l30" style="width: 100%;background-color: #f0eff4;"><span>近1年</span><i class="font_lanse"></i></li>';
							strHtml1 += '<li class="l30"><span>回报</span><i class="font_lanse">'+ fAvgreturnThisyear.toFixed(2)	+ '%</i></li>';
							strHtml1 += '<li class="l30 " style="margin-left: 4%;"><span>排名</span><i class="font_lanse">'+ fSfrankRecentyeart + '</i></li>';
							strHtml1 += '<li class="l30" style="width: 100%;background-color: #f0eff4;"><span>今年以来</span><i class="font_lanse"></i></li>';
							strHtml1 += '<li class="l30"><span>回报</span><i class="font_lanse">'+ fAvgreturnYear.toFixed(2) + '%</i></li>';
							strHtml1 += '<li class="l30 " style="margin-left: 4%;"><span>排名</span><i class="font_lanse">'+ fSfrankThisyeart + '</i></li>';
							strHtml1 += '<li class="l30" style="width: 100%;background-color: #f0eff4;"><span>成立以来</span><i class="font_lanse"></i></li>';
							strHtml1 += '<li class="l30"><span>回报</span><i class="font_lanse">'+ fAvgreturnSincefound.toFixed(2)+ '%</i></li>';
							strHtml1 += '<li class="l30 " style="margin-left: 4%;"><span>排名</span><i class="font_lanse">'+ fSfrankSincefoundt + '</i></li>';
							strHtml1 += '</ul>';
							strHtml1 += '</div>';
							// console.log(freeratioType);                   	 
							// var deleteMsg="您确定要删除吗？"
							jsontip1.append(strHtml1);
						}
						dataLoading = false;
						console
								.log("# -----> Data: "
										+ JSON.stringify(result1));
					} else {
						setErrorMsg(response1.retcode, response1.retmsg); // 错误提示框
					}

				},
				error : function(response1) {
					if (response1 && response1.retmsg
							&& response1.retmsg.length > 0) {
						errors = response1.retmsg;
					}
					hasError = true;
				}
			});
}
//购买信息
function buyInformation() {
	var params3 = {};
	var jsontip2 = $("#jsonTip2");
	jsontip2.empty();//清空内容
	showLoading();
	$
			.ajax({
				url : mainUrl + "MutualFundAccountBookPurchaseInfAction",
				data : params3,
				dataType : "JSON",
				success : function(response2) {
					hideloading();
					if (response2.retcode == "0000") {
						var result2 = response2.data;
						dataLoading = false;
						//console.log(response2);
						for ( var j = 0; j < result2.length; j++) {
							var fundName = result2[j].fundName;
							var windCode = result2[j].windCode;
							var fundType = result2[j].fundType;
							var fNavUnit = result2[j].fNavUnit;
							var acculFNavUnit = result2[j].acculFNavUnit;
							var flatBuy = result2[j].flatBuy;
							if (flatBuy == "0") {
								flatBuy = "可以";
							} else {
								flatBuy = "不可以";
							}
							var flatRedemption = result2[j].flatRedemption * 100;
							if (flatRedemption == "0") {
								flatRedemption = "可以";
							} else {
								flatRedemption = "不可以";
							}
							var flatFixedInvestment = result2[j].flatFixedInvestment;
							if (flatFixedInvestment == "0") {
								flatFixedInvestment = "可以";
							} else {
								flatFixedInvestment = "不可以";
							}
							var strHtml2 = "";

							strHtml2 += '<div class="moni_cc_list mtopdd">';
							strHtml2 += '<div class="moni_cc_title">';
							strHtml2 += '<h2>' + fundName + '(' + windCode+ ')</h2>';
							strHtml2 += '<i class="moni_san"></i>';
							strHtml2 += '</div>';
							strHtml2 += '<ul class="moni_cc_th">';
							strHtml2 += '<li class="l30"><span>类型</span><i class="font_lanse">'+ fundType	+ '</i></li>';
							strHtml2 += '<li class="l30 "><span>单位净值</span><i class="font_lanse">'+ fNavUnit.toFixed(4) + '</i></li>';
							strHtml2 += '<li class="l30 "><span>累计净值</span><i class="font_lanse">'+ acculFNavUnit.toFixed(4) + '</i></li>';
							strHtml2 += '<li class="l30 "><span>申购</span><i class="font_lanse">' + flatBuy	+ '</i></li>';
							strHtml2 += '<li class="l30 "><span>赎回</span><i class="font_lanse">'+ flatRedemption + '</i></li>';
							strHtml2 += '<li class="l30 "><span>定投</span><i class="font_lanse">'+ flatFixedInvestment + '</i></li>';
							strHtml2 += '</ul>';
							strHtml2 += '</div>';
							// console.log(freeratioType);                   	 
							// var deleteMsg="您确定要删除吗？"

							jsontip2.append(strHtml2);
						}
						dataLoading = false;
						console
								.log("# -----> Data: "
										+ JSON.stringify(result2));
					} else {
						setErrorMsg(response2.retcode, response2.retmsg); // 错误提示框
					}

				},
				error : function(response2) {
					if (response2 && response2.retmsg
							&& response2.retmsg.length > 0) {
						errors = response2.retmsg;
					}
					hasError = true;
				}
			});
};

//格式化金额+，保留2位小数
function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	cents = num % 100;
	num = Math.floor(num / 100).toString();
	if (cents < 10)
		cents = "0" + cents;
	for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ','
				+ num.substring(num.length - (4 * i + 3));
	return (((sign) ? '' : '-') + num + '.' + cents);
}
