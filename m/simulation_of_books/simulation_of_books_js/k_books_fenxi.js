//var mainUrl="http://localhost:8080/Wirich2.0/";
var dataLoading = false;
var hasError = false;
var errors = "";
var currentTab1 = 1;
var currentTab2 = 1;
var currentTab3 = 1;
var kfs_sz1 = "";

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
//var tbdata=[];
$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined
			|| username == "null") {
		setErrorMsg(1001);
	} else {

		(function initController() {
			load(0);
			//console.log("# -----> Data: " + JSON.stringify());
			var tbdata1 = load(1);
			console.log(tbdata1);
			var kfsjj_sz = tbdata1[0][1];//返回开放式基金市值
			var hbjj_sz = tbdata1[1][1];//返回货币基金市值
			var dtjj_sz = tbdata1[2][1];//返回定投基金市值
			//console.log(kfsjj_sz);
			var zsz = kfsjj_sz + hbjj_sz + dtjj_sz;//总市值
			var kfs_zb = (kfsjj_sz / zsz) * 100;//开放式基金占比%
			var hbjj_zb = (hbjj_sz / zsz) * 100;//货币基金占比%
			var dtjj_zb = (dtjj_sz / zsz) * 100;//定投基金占比%
			console.log(kfs_zb);
			var tbdata2 = new Array();
			tbdata2.push([ "开放式基金", kfs_zb ], [ "货币基金", hbjj_zb ], [ "定投基金",
					dtjj_zb ]);//push新数组
			console.log(tbdata2);
			var chart;
			//$(document).ready(function () {

			// Build the chart
			$('#container')
					.highcharts(
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
								//data: [["开放式基金",45],["开放式基金",25],["开放式基金",30]]数据格式可以是对象
								} ]
							});
		})();

	}

});

function load(val) {
	dataLoading = true;
	//收益统计
	var tbdata = new Array();

	if (val == 0) {
		var params = {};
		$.ajax({
			url : mainUrl + "MutulAccountBookListAction",
			data : params,
			dataType : "JSON",
			success : function(response) {
				result = response.data;
				if (typeof (result) === "undefined") {
					var bookMarket = 0;
					var profitLossAmount = 0;
					var profitLossRatio = 0;
					var profitLossRatio1 = 0;
					$("#dqshizhi").prepend(formatCurrency(bookMarket));//总市值
					$("#zyk").removeClass("dq_lv").addClass("dq_bai");
					var strHtml = "";
					// console.log(freeratioType);                   	 
					// var deleteMsg="您确定要删除吗？"
					strHtml += "" + formatCurrency(profitLossAmount) + "元("
							+ profitLossRatio1 + "%)";
					$("#zyk").prepend(strHtml);//总盈亏
					dataLoading = false;
					console.log("# -----> Data: " + JSON.stringify(result));
				} else {
					var bookMarket = result.bookMarket.toFixed(2);
					var profitLossAmount = result.profitLossAmount.toFixed(2);
					var profitLossRatio = result.profitLossRatio * 100;
					var profitLossRatio1 = profitLossRatio.toFixed(2);
					$("#dqshizhi").prepend(formatCurrency(bookMarket));//总市值
					//判断总盈亏颜色
					if (profitLossAmount > 0) {
						$("#zyk").removeClass("dq_lv").addClass("dq_hon");
					} else {
						$("#zyk").removeClass("dq_hon").addClass("dq_lv");
					}
					var strHtml = "";
					// console.log(freeratioType);                   	 
					// var deleteMsg="您确定要删除吗？"
					strHtml += "" + formatCurrency(profitLossAmount) + "元("
							+ profitLossRatio1 + "%)";
					$("#zyk").prepend(strHtml);//总盈亏
					dataLoading = false;
					console.log("# -----> Data: " + JSON.stringify(result));
				}
			},
			error : function(response) {
				errors = "";
				if (response.retcode == "1001") {
					UserService.Logout();
					$location.path("/login.html");
				}
				hasError = true;
				dataLoading = false;
			}
		});
	} else {

	}

	//开放式基金1
	var params1 = {};
	$.ajax({
		url : mainUrl + "MutualFundOpenInformationsAction",
		data : params1,
		dataType : "JSON",
		async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
		success : function(response1) {
			result1 = response1.data;
			var kfs_sz = 0;//开放式基金总市值
			for ( var i = 0; i < result1.length; i++) {
				kfs_sz += result1[i].marketValue;
				//resultz.push(kfs_sz.marketValue);
			}
			if (val == 0) {
				//数据插入页面
				$("#kfs_sz").prepend(formatCurrency(kfs_sz));
				dataLoading = false;
			} else {
				tbdata.push([ "开放式基金", kfs_sz ]); //插入数组         		 
				dataLoading = false;
				return tbdata;//返回数组	
			}
			//console.log("# -----> Data: " + JSON.stringify(result1));
		},
		error : function(response1) {
			if (response1 && response1.retmsg && response1.retmsg.length > 0) {
				errors = response1.retmsg;
			}
			hasError = true;
		}
	});

	//console.log(tbdata);
	//货币基金1
	var params2 = {};
	$.ajax({
		url : mainUrl + "MoneyFundOpenInformationsAction",
		data : params2,
		dataType : "JSON",
		async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
		success : function(response2) {
			result4 = response2.data;
			var hb_sz = 0;//货币基金总市值
			for ( var k = 0; k < result4.length; k++) {
				hb_sz += result4[k].marketValue;
				//resultz.push(kfs_sz.marketValue);
			}
			if (val == 0) {
				//数据插入页面
				$("#hb_sz").prepend(formatCurrency(hb_sz));
				dataLoading = false;
				//console.log("# -----> Data: " + JSON.stringify(result4));
			} else {
				tbdata.push([ "货币基金", hb_sz ]);//插入数组	         		 
				dataLoading = false;
				return tbdata;//返回数组
			}
		},
		error : function(response2) {
			if (response2 && response2.retmsg && response2.retmsg.length > 0) {
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
			result7 = response3.data;
			dataLoading = false;
			var dt_sz = 0;//货币基金总市值
			for ( var k = 0; k < result7.length; k++) {
				dt_sz += result7[k].marketValue;
				//resultz.push(kfs_sz.marketValue);
			}
			if (val == 0) {
				//数据插入页面
				$("#dt_sz").prepend(formatCurrency(dt_sz));
				console.log("# -----> Data: " + JSON.stringify(result7));
			} else {
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
	//console.log(kfs_sz1);
	//------------------
	if (val == 0) {
	} else {
		return tbdata;//返回完整数组
	}
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
