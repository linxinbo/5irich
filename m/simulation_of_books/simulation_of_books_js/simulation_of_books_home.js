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
		/*$.ajax({
			url: mainUrl + "getLoginUserInfoForRequest",
			data: "",
			dataType: "JSON",
			success: function (data) {
				hideloading();
				console.log(data);
				if (data.data.status){*/

		(function initController() {
			load();
			//refresh();
			//console.log("# -----> Data: " + JSON.stringify());
		})();
		//			}else{
		//				showAlert(data.data.msg, gologin);
		//			}
		//		}
		//	});
	}

});

function load() {
	dataLoading = true;
	//收益统计
	var params = {};
	$.ajax({
		url : mainUrl + "MutulAccountBookListAction",
		data : params,
		dataType : "JSON",
		success : function(response) {
			var result = response.data;
			console.log(result);
			console.log(typeof (result));
			if (typeof (result) === "undefined") {
				var bookMarket = 0;
				var profitLossAmount = 0;
				var profitLossRatio = 0;
				var profitLossRatio1 = 0;
				var principal = 0;
				$("#dqshizhi").prepend(formatCurrency(bookMarket));//总市值
				//判断总盈亏颜色=0白色
				$("#zyk").removeClass("dq_lv").addClass("dq_bai");
				//$("#zykl").removeClass("dq_hon").addClass("dq_lv");

				var strHtml = "";
				// console.log(freeratioType);                   	 
				// var deleteMsg="您确定要删除吗？"
				strHtml += "" + formatCurrency(profitLossAmount) + "元("
						+ profitLossRatio1 + "%)";
				$("#zyk").prepend(strHtml);//总盈亏
				//$("#zykl").prepend(profitLossRatio1);//总盈亏率
				$("#zcb").prepend(formatCurrency(principal));//总成本
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
					//$("#zykl").removeClass("dq_lv").addClass("dq_hon");
				} else {
					$("#zyk").removeClass("dq_hon").addClass("dq_lv");
					//$("#zykl").removeClass("dq_hon").addClass("dq_lv");
				}
				var strHtml = "";
				// console.log(freeratioType);                   	 
				// var deleteMsg="您确定要删除吗？"
				strHtml += "" + formatCurrency(profitLossAmount) + "元("
						+ profitLossRatio1 + "%)";
				$("#zyk").prepend(strHtml);//总盈亏
				//$("#zykl").prepend(profitLossRatio1);//总盈亏率
				$("#zcb").prepend(formatCurrency(result.principal));//总成本
				dataLoading = false;
				console.log("# -----> Data: " + JSON.stringify(result));
			}

			// 开放式基金1
			var params1 = {};
			$.ajax({
				url : mainUrl + "MutualFundOpenInformationsAction",
				data : params1,
				type : "POST",
				cache : false,
				dataType : "JSON",
				success : function(response1) {
					var result1 = response1.data;
					console.log(result1);
					var kfs_sz = 0;//开放式基金总市值
					var kfs_yk = 0;//开放式基金总盈亏
					var kfs_ykl = 0;//开放式基金总盈亏率
					for ( var i = 0; i < result1.length; i++) {
						kfs_sz += result1[i].marketValue;
						kfs_yk += result1[i].profitLossAmount;
						kfs_ykl += result1[i].profitLossRatio;
						//resultz.push(kfs_sz.marketValue);
					}
					//改变盈亏颜色 绿色 亏  红 盈利
					if (kfs_yk > 0) {
						$("#kfs_yk").removeClass("dq_lv").addClass("dq_hon");
						$("#kfs_ykl").removeClass("dq_lv").addClass("dq_hon");
						//$("#kfs_sz").removeClass("dq_lv").addClass("dq_hon");
					} else {
						$("#kfs_yk").removeClass("dq_hon").addClass("dq_lv");
						$("#kfs_ykl").removeClass("dq_hon").addClass("dq_lv");
						//$("#kfs_sz").removeClass("dq_hon").addClass("dq_lv");
					}

					//数据插入页面
					$("#kfs_sz").prepend(formatCurrency(kfs_sz));
					$("#kfs_yk").prepend(formatCurrency(kfs_yk));
					if (kfs_ykl == 0 || result1.length == 0) {
						var kfs_ykl1 = 0;
					} else {
						var kfs_ykl1 = kfs_ykl / result1.length * 100;
					}
					$("#kfs_ykl").prepend(kfs_ykl1.toFixed(2));
					//console.log(kfs_sz);
					//console.log(kfs_yk);
					//console.log(kfs_ykl/result1.length);
					dataLoading = false;
					console.log("# -----> Data: " + JSON.stringify(result1));
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
				success : function(response2) {
					var result4 = response2.data;
					var hb_sz = 0;//货币基金总市值
					var hb_yk = 0;//货币基金总盈亏
					var hb_ykl = 0;//货币基金总盈亏率
					console.log(result4);
					for ( var k = 0; k < result4.length; k++) {
						hb_sz += result4[k].marketValue;
						hb_yk += result4[k].profitLossAmount;
						hb_ykl += result4[k].profitLossRatio;
						//resultz.push(kfs_sz.marketValue);
					}
					//改变盈亏颜色 绿色 亏  红 盈利
					if (hb_yk > 0) {
						$("#hb_yk").removeClass("dq_lv").addClass("dq_hon");
						$("#hb_ykl").removeClass("dq_lv").addClass("dq_hon");
						//$("#hb_sz").removeClass("dq_lv").addClass("dq_hon");
					} else {
						$("#hb_yk").removeClass("dq_hon").addClass("dq_lv");
						$("#hb_ykl").removeClass("dq_hon").addClass("dq_lv");
						//$("#hb_sz").removeClass("dq_hon").addClass("dq_lv");
					}

					//数据插入页面
					$("#hb_sz").prepend(formatCurrency(hb_sz));
					$("#hb_yk").prepend(formatCurrency(hb_yk));
					if (hb_ykl == 0 || result4.length == 0) {
						var hb_ykl1 = 0;
					} else {
						var hb_ykl1 = hb_ykl / result4.length * 100;
						//console.log(hb_ykl);
						//console.log(result4.length);
						//console.log(hb_ykl1);
					}
					$("#hb_ykl").prepend(hb_ykl1.toFixed(2));
					dataLoading = false;
					console.log("# -----> Data: " + JSON.stringify(result4));
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
				success : function(response3) {
					var result7 = response3.data;
					dataLoading = false;
					var dt_sz = 0;//货币基金总市值
					var dt_yk = 0;//货币基金总盈亏
					var dt_ykl = 0;//货币基金总盈亏率
					for ( var k = 0; k < result7.length; k++) {
						dt_sz += result7[k].marketValue;
						dt_yk += result7[k].profitLossAmount;
						dt_ykl += result7[k].profitLossRatio;
						//resultz.push(kfs_sz.marketValue);
					}
					//改变盈亏颜色 绿色 亏  红 盈利
					if (dt_yk > 0) {
						$("#dt_yk").removeClass("dq_lv").addClass("dq_hon");
						$("#dt_ykl").removeClass("dq_lv").addClass("dq_hon");
						//$("#dt_sz").removeClass("dq_lv").addClass("dq_hon");
					} else {
						$("#dt_yk").removeClass("dq_hon").addClass("dq_lv");
						$("#dt_ykl").removeClass("dq_hon").addClass("dq_lv");
						//$("#dt_sz").removeClass("dq_hon").addClass("dq_lv");
					}

					//数据插入页面
					$("#dt_sz").prepend(formatCurrency(dt_sz));
					$("#dt_yk").prepend(formatCurrency(dt_yk));
					if (dt_ykl == 0 || result7.length == 0) {
						var dt_ykl1 = 0;
					} else {
						var dt_ykl1 = dt_ykl / result7.length * 100;
					}
					//console.log(hb_ykl);
					$("#dt_ykl").prepend(dt_ykl1.toFixed(2));
					console.log("# -----> Data: " + JSON.stringify(result7));
				},
				error : function(response3) {
					if (response3 && response3.retmsg
							&& response3.retmsg.length > 0) {
						errors = response3.retmsg;
					}
					hasError = true;
				}
			});

			//------------------
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
