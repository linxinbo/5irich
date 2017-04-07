//var mainUrl="http://localhost:8080/Wirich2.0/";
var dataLoading = false;
var hasError = false;

var outFundName = "";//转出基金名称
var outWindCode = "0";//转出基金代码
var conversionDate = "";//转换日期
var outConversionFreeRatio = "";//转出转换费率
var outConversionShare = "";//转出转换份额

var inFundName = "";//转入基金名称
var inWindCode = "0";//转入基金代码
var inConversionShare = "";//转入份额
var inConversionFreeRatio = "";//转入费率
var conversionDividendspPattern = "0";//转换分红方式 0-现金分红 1-分红再投资
var currentTab = 1;

var tradeDtInformation = "";//转换交易时间提示信息
var timeError = false;//判断时间是否正确
var shareInformation = "";//转换份额提示信息
var shareError = false;//判断转换份额是否正确

var result = {};//转出下拉框返回的结果集
var result1 = {};//转入下拉框返回的结果集
var result2 = {};//验证时间和费率的结果

$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined
			|| username == "null") {
		setErrorMsg(1001);
	} else {

		$("#maxbuyshare").hide();
		$("#jjzhBtn").click(function() {
			getzhdata();
			Submit();
		});

		$("#zhuanchujijin").change(function() {
			getzhdata();
			toChangeInto();
		});

		$("#outConversionShare").blur(function() {
			getzhdata();
			verificationTimeAndRate();
		});

		$("#inConversionFreeRatio").blur(function() {
			getzhdata();
			verificationTimeAndRate();
		});

		(function initController() {
			load();
		})();

	}

});

//载入方法
function load() {
	dataLoading = true;
	//获取基金下拉列表
	var params = {};
	var $jsontip = $("#zhjjid");
	$.ajax({
		url : mainUrl + "MutualRedemptiontWindCodeTOFundNameAction",
		data : params,
		dataType : "JSON",
		success : function(response) {
			result = response.data;
			//console.log(result);
			dataLoading = false;
			var strHtml = "";
			if (response.retcode == "0000") {
				for ( var i = 0; i < result.length; i++) {
					strHtml += "<option value='" + result[i].windCode + "'>"
							+ result[i].fundName + "</option>";
				}
				$jsontip.after(strHtml);
				console.log("# -----> Data: " + JSON.stringify(result));
			} else {
				setErrorMsg(response.retcode, response.retmsg); //错误提示框
			}
			//console.log("# -----> Data: " + JSON.stringify(result));
		},
		error : function(response) {
			errors = "获取基金失败";
			if (response && response.retmsg && response.retmsg.length > 0) {
				errors = response.retmsg;
			}
			showAlert(errors);
			hasError = true;
			dataLoading = false;
		}
	});
};

//转换基金提交方法
function Submit() {
	fundCodeError = false;//是否显示基金代码错误提示标识
	if (!timeError && !shareError) {
		var inConversionFreeRatio1 = inConversionFreeRatio / 100;
		var outConversionFreeRatio1 = outConversionFreeRatio / 100;
		var tradeDt2 = dateFormat(conversionDate, "yyyymmdd");
		var params4 = {
			"inWindCode" : inWindCode,
			"conversionDate" : tradeDt2,
			"inConversionShare" : inConversionShare,
			"inConversionFreeRatio" : inConversionFreeRatio1,
			"conversionFreeRatioType" : 0,
			"outFundName" : outFundName,
			"outWindCode" : outWindCode,
			"conversionDividendspPattern" : conversionDividendspPattern,
			"outConversionFreeRatio" : outConversionFreeRatio1,
			"outConversionShare" : outConversionShare
		};
		console.log(params4);
		$.ajax({
			url : mainUrl + "MutualFundAccountBookConversionAction",
			data : params4,
			dataType : "JSON",
			success : function(response4) {
				dataLoading = false;
				currentTab = 2;
				if (response4.retcode == "0000") {
					showAlert("基金转换成功！", gokhome);
				} else {
					//setErrorMsg(response4.retcode, response4.retmsg); //错误提示框
					showAlert("参数错误！");
				}
				console.log("# -----> Data: " + JSON.stringify(response4));
			},
			error : function(response4) {
				errors = "提交失败";
				if (response4 && response4.retmsg
						&& response4.retmsg.length > 0) {
					errors = response4.retmsg;
				}
				showAlert(errors);
				hasError = true;
				dataLoading = false;
			}
		});
	}
}

//转入基金下拉框
function toChangeInto() {
	var params1 = {
		"windCode" : outWindCode
	};
	var zrjjlist = $("#zrjjid");
	$.ajax({
		url : mainUrl + "MutualFundNameConversionInPageAction",
		data : params1,
		dataType : "JSON",
		success : function(response1) {
			dataLoading = false;
			result1 = response1.data;
			var strHtml = "";
			if (response1.retcode == "0000") {
				for ( var i = 0; i < result1.length; i++) {
					strHtml += "<option value='" + result1[i].windCode + "'>"
							+ result1[i].fundName + "</option>";
				}
				zrjjlist.after(strHtml);
			} else {
				setErrorMsg(response.retcode, response.retmsg); //错误提示框
			}
			autoFillFundName();
			//console.log("# -----> Data: " + JSON.stringify(result1));
		},
		error : function(response1) {
			errors = "获取失败";
			if (response1 && response1.retmsg && response1.retmsg.length > 0) {
				errors = response.retmsg;
			}
			showAlert(errors);
			hasError = true;
			dataLoading = false;
		}
	});
}

//公募基金转入转出交易日期和交易份额验证
function verificationTimeAndRate() {
	if (outFundName && outFundName.length > 0 && outWindCode
			&& outWindCode.length > 0 && outConversionShare
			&& outConversionShare.length > 0 && conversionDate
			&& dateFormat(conversionDate, "yyyymmdd").length > 0) {
		var tradeDt = dateFormat(conversionDate, "yyyymmdd");
		var params2 = {
			"fundName" : outFundName,
			"windCode" : outWindCode,
			"buyShare" : outConversionShare,
			"tradeDt" : tradeDt
		};
		console.log(params2);
		$.ajax({
			url : mainUrl + "MutualFundAccountBookConversionPageAction",
			data : params2,
			dataType : "JSON",
			success : function(response2) {
				console.log(response2);
				dataLoading = false;
				result2 = response2.data;
				//判断日期
				if (result2.tradeDtInformation == 1047) {
					timeError = false;
				} else if (result2.tradeDtInformation == 1048) {
					timeError = true;
					tradeDtInformation = "输入时间早于基金成立日期";
					showAlert(tradeDtInformation);
				} else if (result2.tradeDtInformation == 1049) {
					timeError = true;
					tradeDtInformation = "交易日期不能超过当前日期";
					showAlert(tradeDtInformation);
				}
				//判断份额
				if (result2.shareInformation == 1052) {
					shareError = false;
				} else if (result2.shareInformation == 1053) {
					shareError = true;
					shareInformation = "转换份额超过最大允许份额";
					showAlert(shareInformation);
				}
				if (shareError == false && timeError == false
						&& outConversionFreeRatio
						&& outConversionFreeRatio.length > 0 && inWindCode
						&& inWindCode.length > 0 && inConversionFreeRatio
						&& inConversionFreeRatio.length > 0) {
					effectOfShare();
				}

				//var maxbuyshare = $("#maxbuyshare");
				//maxbuyshare.show();
				//var strHtml1="";
				//strHtml1 += "最大转换份额："+result2.maxBuyShare+"";
				$("#maxbuyshare").show();
				$("#maxbuyshareid").val(result2.maxBuyShare);
				$("#maxbuyshareid").attr("disabled", "disabled");

				console.log("# -----> Data: " + JSON.stringify(result2));
			},
			error : function(response2) {
				errors = "验证失败";
				if (response2 && response2.retmsg
						&& response2.retmsg.length > 0) {
					errors = response2.retmsg;
				}
				showAlert(errors);
				hasError = true;
				dataLoading = false;
			}
		});
	} else {
		hasError = true;
		dataLoading = false;
	}
	;
}

//效验份额的方法
function effectOfShare() {
	var inConversionFreeRatio1 = inConversionFreeRatio / 100;
	var outConversionFreeRatio1 = outConversionFreeRatio / 100;
	var tradeDt1 = dateFormat(conversionDate, "yyyymmdd");
	var params3 = {
		"outWindCode" : outWindCode,
		"outBuyShare" : outConversionShare,
		"outFreeRatio" : outConversionFreeRatio1,
		"outFreeratioType" : 0,
		"tradeDt" : tradeDt1,
		"intoWindCode" : inWindCode,
		"intoFreeRatio" : inConversionFreeRatio1,
		"intoFreeratioType" : 0
	};
	console.log(params3);
	$
			.ajax({
				url : mainUrl + "MutualFundAccountBookInConversionPageAction",
				data : params3,
				dataType : "JSON",
				success : function(response3) {
					dataLoading = false;
					console.log(response3);
					var inConversionShare1 = response3.data.intoConversionshare;
					$("#inConversionShare").val(inConversionShare1);
					$("#inConversionShare").attr("disabled", "disabled");
					console.log("# -----> Data: "
							+ JSON.stringify(inConversionShare1));
				},
				error : function(response3) {
					errors = "验证失败";
					if (response3 && response3.retmsg
							&& response3.retmsg.length > 0) {
						errors = response3.retmsg;
					}
					showAlert(errors);
					hasError = true;
					dataLoading = false;
				}
			});
}

//自动转入基金名称
function autoFillFundName() {
	if (outWindCode && outWindCode.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			var fund = result[i];
			if (fund.windCode == outWindCode) {
				outFundName = fund.fundName;
				break;
			}
			;
		}
		;
	}
	if (inWindCode && inWindCode.length > 0) {
		for ( var i = 0; i < result1.length; i++) {
			var fund = result1[i];
			if (fund.windCode == inWindCode) {
				inFundName = fund.fundName;
				break;
			}
			;
		}
		;
	}
	;
}

//获取交易数据
function getzhdata() {
	outFundName = $("#zhuanchujijin").find("option:selected").text();//获取转出基金名称
	outWindCode = $("#zhuanchujijin").val();//获取转出基金代码
	conversionDate = $("#indate").val();//获取转换日期
	outConversionFreeRatio = $("#outConversionFreeRatio").val();//获取转出转换费率
	outConversionShare = $("#outConversionShare").val();//获取转出转换份额

	inFundName = $("#zhuanrujijin").find("option:selected").text();//获取转入基金名称
	inWindCode = $("#zhuanrujijin").val();
	;//获取转入基金代码
	inConversionShare = $("#inConversionShare").val();//获取转入份额
	inConversionFreeRatio = $("#inConversionFreeRatio").val();//获取转入费率
	conversionDividendspPattern = $(
			'#conversionDividendspPattern input[name="conversionDividendspPattern"]:checked')
			.val();//获取转换分红方式 0-现金分红 1-分红再投资
};

//跳转到trade
function gokhome() {
	window.location.href = mainUrl + "m/simulation_of_books/k_books_home.html";
}
