//var mainUrl="http://localhost:8080/Wirich2.0/";
//登陆的接口

var dataLoading = false;
var hasError = false;
var redemptiontShare = "";//赎回份额
var fundName = ""; //基金名称
var fundCode = "0"; //基金代码
var freeRatio = ""; //赎回费率
var tradeDt = ""; // 赎回时间
var amountRedemption = "";//赎回金额

var maxRedemptiontShare = "";//最大赎回份额
var redemptiontShareError = false;//是否显示赎回份额错误提示标识
var tradeDtError1 = false;//输入时间早于基金成立日期
var tradeDtError2 = false;//输入时间晚于现在时间
var currentTab = 1;

var shuhui_id_judgment = false;//判断是直接点认申购进来的 还是从交易明细里面跳过来的

var result = {};//接收交易明细传过来的数据
var result1 = {};//得到下拉菜单的fundName和windCode

var args = new getArgs(); //公共方法
var shuhui_id = args.id; //这个是修改传过来的id
var tradetype = args.tradetype; ////这个是修改过来的数值 1 代表认申购 2 是赎回 0没有做判断用

$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined
			|| username == "null") {
		setErrorMsg(1001);
	} else {

		//基金下拉框 change事件
		$("#freeRatioType").change(function() {
			autoFillFundName();
		});
		//基金下拉框 失去焦点事件
		$("#freeRatioType").blur(function() {
			getdatalist();
			automaticCheck();
		});
		//赎回费率 失去焦点事件
		$("#freeRatio").blur(function() {
			getdatalist();
			automaticCheck();
		});
		//赎回份额 失去焦点事件
		$("#goumaifene").blur(function() {
			getdatalist();
			automaticCheck();
		});
		//提交事件
		$("#drawBtn").click(function() {
			getdatalist();
			Submit();
		});

		(function initController() {
			load();
		})();

	}

});

//页面刚加载时 判断是新赎回页面   还是从交易明细跳过来的赎回页面
function load() {
	dataLoading = true;
	if (shuhui_id != "" && shuhui_id) {
		shuhui_id_judgment = true;
		args.id = ""
		//shuhui_id = shuhui_id;
		//        monizhangben_jiaoyiId = "";
	}
	if (shuhui_id && shuhui_id != "") {

		automaticallyFillDefaultValues_SH();
	}
	if (!shuhui_id_judgment) {

		pullDownFund();
	}

};

//下拉基金列表的接口
function pullDownFund() {
	$.ajax({
		url : mainUrl + "MutualRedemptiontWindCodeTOFundNameAction",
		data : "",
		dataType : "JSON",
		success : function(data1) {

			result1 = data1.data;
			var strHtml = "";
			if (data1.retcode == "0000") {
				for ( var i = 0; i < result1.length; i++) {
					strHtml += "<option value='" + result1[i].windCode + "'>"
							+ result1[i].fundName + "</option>";
				}
				$("#jsontip").after(strHtml);
				dataLoading = false;
				console.log("# -----> Data: " + JSON.stringify(result1));
			} else {
				setErrorMsg(data1.retcode, data1.retmsg); //错误提示框
			}

		},
		error : function(data1) {

			errors = "";
			if (data1 && data1.retmsg && data1.retmsg.length > 0) {
				errors = data1.retmsg;
			}
			hasError = true;

		}

	})
};

//提交
function Submit() {
	if (shuhui_id_judgment) {
		if (!tradeDtError1 && !tradeDtError2 && !redemptiontShareError) {
			ModifySubmit();
		}
	} else {
		if (!tradeDtError1 && !tradeDtError2 && !redemptiontShareError) {
			var freeRatio1 = freeRatio / 100;

			var params = {
				"fundCode" : fundCode,
				"fundName" : fundName,
				"redemptionDate" : dateFormat(tradeDt, "yyyymmdd"),
				"redemptionShare" : redemptiontShare,
				"freeratioType" : 0,
				"redemptionFreeRatio" : freeRatio1,
				"redemptionAmount" : amountRedemption
			};

			$
					.ajax({
						url : mainUrl + "MutualFundAccountBookRedemptionAction",
						data : params,
						dataType : "JSON",
						success : function(data1) {
							currentTab = 2;
							dataLoading = false;
							console.log("# -----> Data: "
									+ JSON.stringify(data1));
							if (data1.retcode == "0000") {
								showAlert("赎回成功！", gokhome);
							} else {
								/tErrorMsg(response4.retcode, response4.retmsg); / / 错误提示框
								showAlert("参数错误！");
							}

						},
						error : function(data1) {

							errors = "提交失败";
							if (data1 && data1.retmsg
									&& data1.retmsg.length > 0) {
								errors = data1retmsg;
							}
							hasError = true;
							dataLoading = false;

						}

					})

		}
	}
}

//这是赎回要修改的提交方法
function ModifySubmit() {
	var redemptionFreeratioType = 0;
	//getdatalist();
	var params = {
		"windCode" : fundCode,
		"redemptionDate" : dateFormat(tradeDt, "yyyymmdd"),
		"redemptionShare" : redemptiontShare,
		"redemptionFreeRatio" : freeRatio / 100,
		"redemptionFreeratioType" : redemptionFreeratioType,
		"redemptionAmount" : amountRedemption,
		"id" : shuhui_id,
		"tradeType" : tradeType
	};
	console.log(params);
	$.ajax({
		url : mainUrl + "MutualFundRedemptiontModifyAction",
		data : params,
		dataType : "JSON",
		success : function(data1) {
			currentTab = 3;
			dataLoading = false;
			console.log("# -----> Data: " + JSON.stringify(data1));
			if (data1.retcode == "0000") {
				showAlert("修改成功！", gokhome);
			} else {
				/tErrorMsg(response4.retcode, response4.retmsg); / / 错误提示框
				showAlert("参数错误！");
			}
		},
		error : function(data1) {

			errors = "提交失败";
			if (data1 && data1.retmsg && data1.retmsg.length > 0) {
				errors = data1.retmsg;
			}
			hasError = true;
			dataLoading = false;

		}

	})
}

//input焦点事件
function automaticCheck() {
	getdatalist();
	console.log(fundName, fundCode, freeRatio, tradeDt, redemptiontShare);
	if (fundCode && fundCode != "" && fundName && fundName != "" && freeRatio
			&& freeRatio != "" && tradeDt && tradeDt != "" && redemptiontShare
			&& redemptiontShare != "") {
		checkData();

	} else {
		amountRedemption = "";//赎回金额
	}
}

//自动填充基金名称
function autoFillFundName() {
	if (fundCode && fundCode.length > 0) {
		for ( var i = 0; i < result1.length; i++) {
			var fund = result1[i];
			if (fund.windCode == fundCode) {
				fundName = fund.fundName;
				break;
			}
		}
	}
}

//效验赎回份额和交易时间，成功返回赎回份额
function checkData() {
	var freeRatio1 = freeRatio / 100;

	var params = {
		"windCode" : fundCode,
		"fundName" : fundName,
		"redemptiontShare" : redemptiontShare,
		"freeRatio" : freeRatio1,
		"freeratioType" : 0,
		"tradeDt" : dateFormat(tradeDt, "yyyymmdd")
	};
	console.log(params);
	$.ajax({
		url : mainUrl + "MutualFundAccountBookRedemptiontPageAction",
		data : params,
		dataType : "JSON",
		success : function(data1) {
			var shareIniformation = data1.data.shareInformation;//赎回份额的错误提示
			var tradeDtInformation = data1.data.tradeDtInformation;//交易时间的错误提示

			if (tradeDtInformation == "1047") {
				amountRedemption = data1.data.amountRedemption;
				redemptiontShareError = false;
				tradeDtError1 = false;
			}
			if (shareIniformation == "1046") {
				tradeDtError2 = false;

			}
			if (tradeDtInformation == "1048") {
				tradeDtError1 = true;
				showAlert("输入时间早于基金成立日期");
			}
			if (tradeDtInformation == "1049") {
				tradeDtError2 = true;
				showAlert("输入时间晚于现在时间");
			}
			if (shareIniformation == "1045") {
				redemptiontShareError = true;
				showAlert("赎回输入份额超过允许最大份额");
			}
			amountRedemption = data1.data.amountRedemption;
			$("#amountRedemption").val(amountRedemption);
			dataLoading = false;
			console.log("# -----> Data: " + JSON.stringify(data1.data));

		},
		error : function(data1) {

			errors = "提交失败";
			if (data1 && data1.retmsg && data1.retmsg.length > 0) {
				errors = data1.retmsg;
			}
			hasError = true;
			dataLoading = false;

		}

	})
}

//赎回的自动填充
function automaticallyFillDefaultValues_SH() {
	tradeType = 2;

	var params = {
		"id" : shuhui_id,
		"tradeType" : tradeType
	};
	$.ajax({
		url : mainUrl + "MutualFundRedemptiontDefaultValueAction",
		data : params,
		dataType : "JSON",
		success : function(data1) {
			dataLoading = false;
			result = data1.data;
			redemptiontShare = result.redemptionShare;//赎回份额
			$("#goumaifene").val(redemptiontShare);
			fundName = result.fundName; //基金名称
			$("#freeRatioType").find("option:selected").text(fundName);
			fundCode = result.fundCode; //基金代码
			$("#jsontip").val(fundCode);
			freeRatio = result.redemptionFreeRatio * 100; //赎回费率
			$("#freeRatio").val(freeRatio);
			tradeDt = dateTransform(result.redemptionDate); // 赎回时间
			$("#indate").val(tradeDt);
			amountRedemption = result.redemptionAmount;//赎回金额
			$("#amountRedemption").val(amountRedemption);
			console.log("# -----> Data: " + JSON.stringify(data1.data));

		},
		error : function(data1) {

			errors = "填充失败";
			if (data1 && data1.retmsg && data1.retmsg.length > 0) {
				errors = data1.retmsg;
			}
			hasError = true;
			dataLoading = false;

		}

	})
}

//日期转换 ps：20150101 ----2015-01-01
function dateTransform(oldDate) {
	var resutl = "";
	if (oldDate && oldDate != null && oldDate.length != 0) {
		resutl += oldDate.substr(0, oldDate.length - 4) + "-";
		resutl += oldDate.substr(4, 2) + "-";
		resutl += oldDate.substr(6, 7);
		return resutl;
	} else {
		return oldDate;
	}
}

//获取html输入框的值
function getdatalist() {
	fundCode = $("#freeRatioType").val();
	fundName = $("#freeRatioType").find("option:selected").text();
	tradeDt = $("#indate").val();
	freeRatio = $("#freeRatio").val();
	redemptiontShare = $("#goumaifene").val();
	amountRedemption = $("#amountRedemption").val();
}

//提交成功的通用方法 （跳转）
function gokhome() {
	window.location.href = mainUrl + "mp/moni/moni.html";
}

function dateTransform(oldDate) {
	var resutl = "";
	if (oldDate && oldDate != null && oldDate.length != 0) {
		resutl += oldDate.substr(0, oldDate.length - 4) + "-";
		resutl += oldDate.substr(4, 2) + "-";
		resutl += oldDate.substr(6, 7);
		return resutl;
	} else {
		return oldDate;
	}
}