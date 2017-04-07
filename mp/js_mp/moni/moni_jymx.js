//var mainUrl="http://localhost:8080/Wirich2.0/";
var dataLoading = false;
var hasError = false;
var startDt = "";
var fundName = "";
var tradeType = "";//要删除信息的类型
var id = "";//要删除信息的id
var fNavUnit = "";
var amountTrade = "";
var shareTrade = "";
var freeRatio = "";
var free = "";
//添加点击事件
//delete_Whole();
//load()
//load();
var result = {};
$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined
			|| username == "null") {
		setErrorMsg(1001);
	} else {

		(function initController() {
			load();
			load_zjj();
			//console.log("# -----> Data: " + JSON.stringify());
		})();

	}

});

function load_zjj() {
	dataLoading = true;
	//收益统计
	var params = {};
	showLoading();
	$.ajax({
		url : mainUrl + "MutulAccountBookListAction",
		data : params,
		dataType : "JSON",
		success : function(response) {
			hideloading();
			var result = response.data;
			//console.log(result);
			//console.log(typeof (result));
			if (typeof (result) === "undefined") {
				var bookMarket = 0;
				var profitLossAmount = 0;
				var profitLossRatio = 0;
				var profitLossRatio1 = 0;
				var principal = 0;
				var enddate = new Date().Format("yyyyMMdd");
				$("#dqshizhi").prepend(formatCurrency(bookMarket));
				$("#dqdate").prepend("更新时间："+enddate);//总市值
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
				var enddate = new Date().Format("yyyyMMdd");
				$("#dqdate").prepend(enddate);//总市值
				$("#dqshizhi").prepend(formatCurrency(bookMarket));//总市值
				//判断总盈亏颜色
				if (profitLossAmount > 0) {
					$("#zyk").removeClass("die").addClass("zhang");
					//$("#zykl").removeClass("dq_lv").addClass("dq_hon");
				} else {
					$("#zyk").removeClass("zhang").addClass("die");
					//$("#zykl").removeClass("dq_hon").addClass("dq_lv");
				}
				var strHtml = "";
				// console.log(freeratioType);
				// var deleteMsg="您确定要删除吗？"
				strHtml += "" + formatCurrency(profitLossAmount) + "元";
				$("#zyk").prepend(strHtml);//总盈亏
				//$("#zykl").prepend(profitLossRatio1);//总盈亏率
				$("#zcb").prepend(formatCurrency(result.principal));//总成本
				dataLoading = false;
				//console.log("# -----> Data: " + JSON.stringify(result));
			}
		},
		error : function(response) {
			errors = "";
			if (response.retcode == "1001") {
				UserService.Logout();
				$location.path("../login.html");
			}
			hasError = true;
			dataLoading = false;
		}
	});
};

function load() {
	dataLoading = true;
	var params = {
		"flat" : 0,
		"page" : 1,
		"pageRecorders" : 100,
		"tradeType" : 0
	};
	//console.log(params);
	var $jsontip = $("#jsonTip");
	$jsontip.empty();//清空内容
	showLoading();
	$.ajax({
				url : mainUrl + "MutualFundTransactionDetailsAction",
				data : params,
				dataType : "JSON",
				success : function(response) {
					hideloading();
					if (response.retcode == "0000") {

						var result = response.data;
						dataLoading = false;
						//console.log(response);

						for ( var i = 0; i < result.length; i++) {
							var fNavUnit = result[i].fNavUnit;
							var amountTrade = result[i].amountTrade;
							var shareTrade = result[i].shareTrade;
							var freeratioType = result[i].freeratioType;
							var free = result[i].free * 100;
							var strHtml = "";
							//console.log(freeratioType);
							if (freeratioType == "0") {
								var freeRatio = result[i].freeRatio * 100 + "%";
							} else {
								var freeRatio = result[i].freeRatio + "元";
							}
							//var deleteMsg="您确定要删除吗？"
							strHtml += "<div class='moni_cc_list mtopdd'><div class='moni_cc_title'><h2>" + result[i].fundName	+ "（"+result[i].windCode+")</h2><i class='moni_san'></i></div>";
							strHtml += "<ul class='moni_cc_th'>";
							strHtml += "<li class='l30'><span>交易日期</span><i class='font_lanse'>"+ result[i].startDt +"</i></li>";
							strHtml += "<li class='l30 '><span>交易类型</span><i class='font_lanse'>"+ getTradeType(result[i].tradeType)+ "</i></li>";
							strHtml += "<li class='l30 '><span>交易日净值</span><i class='font_lanse'>"+ fNavUnit.toFixed(4) + "</i></li>";
							strHtml += "<li class='l30 '><span>成交金额</span><i class='font_lanse'>"+ formatCurrency(amountTrade)+ "元</i></li>";
							strHtml += "<li class='l30 '><span>成交份额</span><i class='font_lanse'>"+ shareTrade.toFixed(2) + "份</i></li>";
							strHtml += "<li class='l30 '><span>费率</span><i class='font_lanse'>"+ freeRatio + "</i></li>";
							strHtml += "<li class='l30 '><span>手续费</span><i class='font_lanse'>"+ formatMoney4(free, 4) + "元</i></li>";
							strHtml += "</ul><div class='moni_cc_end'>";
							if (result[i].tradeType == "1") {
								strHtml += "<a class='moni_btn moni_btn_lan' href='moni_rsg.html?id="+ result[i].id+ "&tradetype="+ result[i].tradeType+"'>修改</a>";
								strHtml += "<a class='moni_btn moni_btn_cheng' style='margin-left: 2%;' onclick='delete_Whole("+ result[i].id	+ ","+ result[i].tradeType+ ")'>删除</a>";
							} else if (result[i].tradeType == "5" || result[i].tradeType == "6") {
								strHtml += "";
								strHtml += "<a class='moni_btn moni_btn_cheng' style='width: 100%;' onclick='delete_Whole("+ result[i].id	+ ","+ result[i].tradeType+ ")'>删除</a>";
							} else if (result[i].tradeType == "2") {
								strHtml += "<a class='moni_btn moni_btn_lan' href='moni_jjsh.html?id="+ result[i].id+ "&tradetype="+ result[i].tradeType+"'>修改</a>";
								strHtml += "<a class='moni_btn moni_btn_cheng' style='margin-left: 2%;' onclick='delete_Whole("+ result[i].id	+ ","+ result[i].tradeType+ ")'>删除</a>";
							} else {
								strHtml += "";
								strHtml += "<a class='moni_btn moni_btn_cheng' style='width: 100%;' onclick='delete_Whole("+ result[i].id	+ ","+ result[i].tradeType+ ")'>删除</a>";
							}

							strHtml += "</div></div>";

							/*strHtml += "<div class='jjxx_head' id='jj_tab1'><div class='jjxx_content'>";
							strHtml += "<div class='jjxx_content_head'>";
							strHtml += "<span>" + result[i].fundName
									+ "</span>";
							strHtml += "<a class='t_delete' onclick='delete_Whole("
									+ result[i].id
									+ ","
									+ result[i].tradeType
									+ ")'>删除</a>";
							if (result[i].tradeType == "1") {
								strHtml += "<a class='t_edit' href='k_books_rsg.html?id="+ result[i].id+ "&tradetype="+result[i].tradeType+"'>修改</a>";
							} else if (result[i].tradeType == "5"
									|| result[i].tradeType == "6") {
								strHtml += "";
							} else if (result[i].tradeType == "2") {
								strHtml += "<a class='t_edit' href='k_books_jjsh.html?id="+ result[i].id+ "&tradetype="+ result[i].tradeType+"'>修改</a>";
							} else {
								strHtml += "";
							}
							strHtml += "</div>";
							strHtml += "<div class='jjxx_content_c'>";
							strHtml += "<ul>";
							strHtml += "<li><span>交易日期</span><span>"
									+ result[i].startDt + "</span></li>";
							strHtml += "<li><span>交易类型</span><span>"
									+ getTradeType(result[i].tradeType)
									+ "</span></li>";
							strHtml += "<li><span>交易日净值</span><span>"
									+ fNavUnit.toFixed(4) + "</span></li>";
							strHtml += "<li><span>成交金额</span><span>"
									+ formatCurrency(amountTrade)
									+ "元</span></li>";
							strHtml += "<li><span>成交份额</span><span>"
									+ shareTrade.toFixed(2) + "份</span></li>";
							strHtml += "<li><span>费率</span><span id='transformID'>"
									+ freeRatio + "</span></li>";
							strHtml += "<li><span>手续费</span><span>"
									+ formatMoney4(free, 4) + "元</span></li>";
							strHtml += "</ul>";
							strHtml += "</div>";
							strHtml += "</div>";*/
							$jsontip.append(strHtml);
							//console.log("# -----> Data: "	+ JSON.stringify(result));

						}
					} else {
						setErrorMsg(response.retcode, response.retmsg); //错误提示框
					}
				},
				error : function(response) {
					errors = "查询错误";
					if (response && response.retmsg
							&& response.retmsg.length > 0) {
						errors = response.retmsg;
					}
					hasError = true;
					dataLoading = false;
				}
			});
};
/**  
 * 将数值四舍五入(保留2位小数)后格式化成金额形式 *  
 * @param num 数值(Number或者String)  
 * @return 金额格式的字符串,如'1,234,567.45'  
 * @type String  
 */
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

function delete_Whole(id1, tradeType1) {
	var id = id1;
	var tradeType = tradeType1;
	console.log(id1, tradeType1);
	if (id && id != "" && tradeType && tradeType != "") {
		if (tradeType == 1) {
			console.log(id, tradeType);
			//认申购删除成功
			showAlertHint("确定删除交易信息吗？", function renshengou_Delete(id1,
					tradeType1) {
				var params1 = {
					"id" : id,
					"tradeType" : tradeType
				};

				$.ajax({
					url : mainUrl + "MutualFundBuyDeleteAction",
					data : params1,
					dataType : "JSON",
					success : function(response1) {
						if (response1.flat == "0") {
							showAlert("认申购删除失败");
						}
						if (response1.flat == "1") {
							showAlert("认申购删除成功", gojymx);
						}
						dataLoading = false;
						console.log("# -----> Data: "
								+ JSON.stringify(response1));
					},
					error : function(response1) {
						errors = "查询错误";
						if (response1 && response1.retmsg
								&& response1.retmsg.length > 0) {
							errors = response1.retmsg;
						}
						showAlert(errors);
						hasError = true;
						dataLoading = false;
					}
				});

			}, "");
		}
		if (tradeType == 2) {
			//赎回删除 MutualFundRedemptiontDeleteAction
			showAlertHint(
					"确定删除交易信息吗？",
					function shuhui_Delete(id1, tradeType1) {
						var params2 = {
							"id" : id,
							"tradeType" : tradeType
						};
						$
								.ajax({
									url : mainUrl
											+ "MutualFundRedemptiontDeleteAction",
									data : params2,
									dataType : "JSON",
									success : function(response2) {
										if (response2.flat == "0") {
											showAlert("赎回删除失败");
										}
										if (response2.flat == "1") {
											showAlert("赎回删除成功", gojymx);
										}
										dataLoading = false;
										console.log("# -----> Data: "
												+ JSON.stringify(response2));
									},
									error : function(response2) {
										errors = "查询错误";
										if (response2 && response2.retmsg
												&& response2.retmsg.length > 0) {
											errors = response2.retmsg;
										}
										showAlert(errors);
										hasError = true;
										dataLoading = false;
									}
								});
					}, "");
		}
		if (tradeType == 8) {
			// 定投删除 MutualFundFixedInvestmentDeleteAction
			showAlertHint("确定删除交易信息吗？",
					function dingtou_Delete(id1, tradeType1) {
						var params3 = {
							"id" : id,
							"tradeType" : tradeType
						};
						$.ajax({
							url : mainUrl
									+ "MutualFundFixedInvestmentDeleteAction",
							data : params3,
							dataType : "JSON",
							success : function(response3) {
								if (response3.flat == "0") {
									showAlert("定投删除失败");
								}
								if (response3.flat == "1") {
									showAlert("定投删除成功", gojymx);

								}
								dataLoading = false;
								console.log("# -----> Data: "
										+ JSON.stringify(response3));
							},
							error : function(response3) {
								errors = "查询错误";
								if (response3 && response3.retmsg
										&& response3.retmsg.length > 0) {
									errors = response3.retmsg;
								}
								showAlert(errors);
								hasError = true;
								dataLoading = false;
							}
						});
					}, "");
		}
		if (tradeType == 5 || tradeType == 6) {
			//转换删除接口 MutualFundConversionDeleteAction
			showAlertHint("确定删除交易信息吗？", function zhuanhuan_Delete(id1,
					tradeType1) {
				var params4 = {
					"id" : id,
					"tradeType" : tradeType
				};
				$.ajax({
					url : mainUrl + "MutualFundConversionDeleteAction",
					data : params4,
					dataType : "JSON",
					success : function(response4) {
						if (response4.flat == "0") {
							showAlert("转换删除失败");
						}
						if (response4.flat == "1") {
							showAlert("转换删除成功", gojymx);
						}
						dataLoading = false;
						console.log("# -----> Data: "
								+ JSON.stringify(response4));
					},
					error : function(response4) {
						errors = "查询错误";
						if (response4 && response4.retmsg
								&& response4.retmsg.length > 0) {
							errors = response4.retmsg;
						}
						showAlert(errors);
						hasError = true;
						dataLoading = false;
					}
				});

			}, "");
		}
		if (tradeType == 7) {
			//分红删除接口 MutualFundDividendDeleteAction
			showAlertHint("确定删除交易信息吗？",
					function fenhong_Delete(id1, tradeType1) {
						var params5 = {
							"id" : id,
							"tradeType" : tradeType
						};
						$.ajax({
							url : mainUrl + "MutualFundDividendDeleteAction",
							data : params5,
							dataType : "JSON",
							success : function(response5) {
								if (response5.flat == "0") {
									showAlert("分红删除失败");
								}
								if (response5.flat == "1") {
									showAlert("分红删除成功", gojymx);
								}
								dataLoading = false;
								console.log("# -----> Data: "
										+ JSON.stringify(response5));
							},
							error : function(response5) {
								errors = "查询错误";
								if (response5 && response5.retmsg
										&& response5.retmsg.length > 0) {
									errors = response5.retmsg;
								}
								showAlert(errors);
								hasError = true;
								dataLoading = false;
							}
						});
					}, "");
		}
	}

}

function gojymx() {
	window.location.href = mainUrl + "mp/moni/moni_jymx.html";
}

function getTradeType(val) {
	if (val == 0) {
		return "全部";
	} else if (val == 1) {
		return "认申购";
	} else if (val == 2) {
		return "赎回";
	} else if (val == 3) {
		return "现金分红";
	} else if (val == 4) {
		return "分红再投资";
	} else if (val == 5) {
		return "转出";
	} else if (val == 6) {
		return "转入";
	} else if (val == 7) {
		return "货币基金分红";
	} else if (val == 8) {
		return "定投";
	}
	;
};
function formatMoney4(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}