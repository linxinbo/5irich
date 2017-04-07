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
	 var imgurl = $.cookie("imgurl");
     if(imgurl != undefined && imgurl){
     	$('.ma_userhead').attr('src',imgurl);
     }
	if (username == "" || username == null || username == undefined || username == "null") {
		setErrorMsg(1001);
	} else {
		(function () {
			var ma_date = new Date();
			var ma_Date = ma_date.getFullYear()+'-'+(ma_date.getMonth()+1)+'-'+ma_date.getDate();
			$('.ma_date').html(ma_Date);
			$('.ma_name').html(username);
			load(0);
			var tbdata1 = load(1);
			//console.log(tbdata1)
			var kfsjj_sz = tbdata1[0][1];//返回开放式基金市值
			var hbjj_sz = tbdata1[1][1];//返回货币基金市值
			var dtjj_sz = tbdata1[2][1];//返回定投基金市值
			var zsz = kfsjj_sz + hbjj_sz + dtjj_sz;//总市值
			var kfs_zb = (kfsjj_sz / zsz) * 100;//开放式基金占比%
			var hbjj_zb = (hbjj_sz / zsz) * 100;//货币基金占比%
			var dtjj_zb = (dtjj_sz / zsz) * 100;//定投基金占比%
			var tbdata2 = [];
			tbdata2.push([ "开放式基金", kfs_zb ], [ "货币基金", hbjj_zb ], [ "定投基金",
				dtjj_zb ]);
			var chart;
			$('#container').highcharts(
							{
								chart : {
									plotBackgroundColor : null,
									plotBorderWidth : null,
									plotShadow : false
								},
								title : {
									text : '资产分析图表'
								},
								tooltip : {
									pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
								},
								credits : {
									enabled : false
									// 禁用版权信息
								},
								plotOptions : {
									pie : {
										allowPointSelect : true,
										cursor : 'pointer',
										dataLabels : {
											enabled : false
										},
										showInLegend : true
									}
								},
								series : [ {
									type : 'pie',
									name : '占比',
									data : tbdata2
								} ]
							});
		})();
	}
});

function load(val) {
	dataLoading = true;
	//收益统计
	var tbdata = new Array();
	var params = {};
	showLoading();
	$.ajax({
		url : mainUrl + "MutulAccountBookListAction",
		data : params,
		dataType : "JSON",
		async : false,
		success : function(response) {
			hideloading();
			if (val == 0) {
			var result = response.data;
			//console.log(response.data);
			if (typeof (result) === "undefined") {
				var bookMarket = 0;
				var profitLossAmount = 0;
				var profitLossRatio = 0;
				var profitLossRatio1 = 0;
				var principal = 0;
				$("#ma_yetGain span").html(formatCurrency(bookMarket));
				//总市值
				var strHtml = "";
				strHtml += "" + formatCurrency(profitLossAmount) + "元("	+ profitLossRatio1 + "%)";
				$("#ma_totalVal span").html(strHtml);//总盈亏
				$("#ma_accEarn span").html(formatCurrency(principal));//总成本
				dataLoading = false;
			} else {
				
				var bookMarket = result.bookMarket.toFixed(2);
				var profitLossAmount = result.profitLossAmount.toFixed(2);
				var profitLossRatio = result.profitLossRatio * 100;
				var profitLossRatio1 = profitLossRatio.toFixed(2);

				$("#ma_yetGain span").html(formatCurrency(bookMarket));//总市值
				var strHtml = "";
				strHtml += "" + formatCurrency(profitLossAmount) + "元("	+ profitLossRatio1 + "%)";
				$("#ma_totalVal span").html(strHtml);//总盈亏
				$("#ma_accEarn span").html(formatCurrency(result.principal));//总成本
				dataLoading = false;
			}
			}
				// 开放式基金1
				var params1 = {};
				$.ajax({
					url : mainUrl + "MutualFundOpenInformationsAction",
					data : params1,
					type : "POST",
					cache : false,
					async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
					dataType : "JSON",
					success : function(response1) {
						var result1 = response1.data;
						//console.log(result1);
						var kfs_sz = 0;//开放式基金总市值
						var kfs_yk = 0;//开放式基金总盈亏
						var kfs_ykl = 0;//开放式基金总盈亏率
						if(result1 != undefined){
							for ( var i = 0; i < result1.length; i++) {
								kfs_sz += result1[i].marketValue;
								kfs_yk += result1[i].profitLossAmount;
								kfs_ykl += result1[i].profitLossRatio;
								//resultz.push(kfs_sz.marketValue);
							}
						}						
						//改变盈亏颜色 绿色 亏  红 盈利
						if (kfs_yk > 0) {
							$("#kfs_yk").removeClass("font_gray").addClass("font_gray1");
							$("#kfs_ykl").removeClass("font_gray").addClass("font_gray1");
						}
						if (val == 0) {
							//数据插入页面
							$("#kfs_sz").html(formatCurrency(kfs_sz));
							$("#kfs_yk").html(formatCurrency(kfs_yk));
							if (kfs_ykl == 0 || result1.length == 0) {
								var kfs_ykl1 = 0;
							} else {
								var kfs_ykl1 = kfs_ykl / result1.length * 100;
							}
							$("#kfs_ykl").html(kfs_ykl1.toFixed(2)+'%');
							//console.log(kfs_sz);
							//console.log(kfs_yk);
							//console.log(kfs_ykl/result1.length);
							dataLoading = false;
							//console.log("# -----> Data: " + JSON.stringify(result1));
						}else{
							tbdata.push([ "开放式基金", kfs_sz ]); //插入数组
							dataLoading = false;
							return tbdata;//返回数组
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

				//货币基金1
				var params2 = {};
				$.ajax({
					url : mainUrl + "MoneyFundOpenInformationsAction",
					data : params2,
					dataType : "JSON",
					async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
					success : function(response2) {
						var result4 = response2.data;
						var hb_sz = 0;//货币基金总市值
						var hb_yk = 0;//货币基金总盈亏
						var hb_ykl = 0;//货币基金总盈亏率
						//console.log(result4);
						if(result4 != undefined){
							for ( var k = 0; k < result4.length; k++) {
								hb_sz += result4[k].marketValue;
								hb_yk += result4[k].profitLossAmount;
								hb_ykl += result4[k].profitLossRatio;
								//resultz.push(kfs_sz.marketValue);
							}
						}
						//改变盈亏颜色 绿色 亏  红 盈利
						if (hb_yk > 0) {
							$("#hb_yk").removeClass("font_gray").addClass("font_gray1");
							$("#hb_ykl").removeClass("font_gray").addClass("font_gray1");
							//$("#hb_sz").removeClass("dq_lv").addClass("dq_hon");
						}
						//数据插入页面
						if (val == 0) {
							$("#hb_sz").html(formatCurrency(hb_sz));
							$("#hb_yk").html(formatCurrency(hb_yk));
							if (hb_ykl == 0 || result4.length == 0) {
								var hb_ykl1 = 0;
							} else {
								var hb_ykl1 = hb_ykl / result4.length * 100;
								//console.log(hb_ykl);
								//console.log(result4.length);
								//console.log(hb_ykl1);
							}
							$("#hb_ykl").html(hb_ykl1.toFixed(2)+'%');
							dataLoading = false;
							//console.log("# -----> Data: " + JSON.stringify(result4));
						}else{
							tbdata.push([ "货币基金", hb_sz ]);//插入数组
							dataLoading = false;
							return tbdata;//返回数组
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

				//定投基金1
				var params3 = {};
				$.ajax({
					url : mainUrl + "MutualFundFixedInvestmentInformationsAction",
					data : params3,
					dataType : "JSON",
					async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
					success : function(response3) {
						var result7 = response3.data;
						dataLoading = false;
						var dt_sz = 0;//货币基金总市值
						var dt_yk = 0;//货币基金总盈亏
						var dt_ykl = 0;//货币基金总盈亏率
						if(result7 != undefined){
							for ( var k = 0; k < result7.length; k++) {
								dt_sz += result7[k].marketValue;
								dt_yk += result7[k].profitLossAmount;
								dt_ykl += result7[k].profitLossRatio;
								//resultz.push(kfs_sz.marketValue);
							}
						}					
						//改变盈亏颜色 绿色 亏  红 盈利
						if (dt_yk > 0) {
							$("#dt_yk").removeClass("font_gray").addClass("font_gray1");
							$("#dt_ykl").removeClass("font_gray").addClass("font_gray1");
							//$("#dt_sz").removeClass("dq_lv").addClass("dq_hon");
						}
						//数据插入页面
						if (val == 0) {
							$("#dt_sz").html(formatCurrency(dt_sz));
							$("#dt_yk").html(formatCurrency(dt_yk));
							if (dt_ykl == 0 || result7.length == 0) {
								var dt_ykl1 = 0;
							} else {
								var dt_ykl1 = dt_ykl / result7.length * 100;
							}
							//console.log(hb_ykl);
							$("#dt_ykl").html(dt_ykl1.toFixed(2)+'%');
							//console.log("# -----> Data: " + JSON.stringify(result7));
						}else{
							tbdata.push([ "定投基金", dt_sz ]);//插入数组
							return tbdata;//返回数组
						}
					},
					error : function(response3) {
						if (response3 && response3.retmsg && response3.retmsg.length > 0) {
							errors = response3.retmsg;
						}
						hasError = true;
					}
				});

				return tbdata;//返回完整数组
		},
		error : function(response) {
			hideloading();
			errors = "";
			if (response.retcode == "1001") {
				UserService.Logout();
				$location.path("../login.html");
			}
			hasError = true;
			dataLoading = false;
		}
	});
	if (val == 1) {
		return tbdata;//返回完整数组
	}
}

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
