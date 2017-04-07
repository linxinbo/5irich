//var mainUrl="http://localhost:8080/Wirich2.0/";
var dataLoading = false;
var hasError = false;

//表单数据列表
var fhList = {
	fundName : "",
	windCode : "",
	dividendDate : "",
	dividendShare : ""
};

var timeError = false; // 判断时间是否正确
var tradeDtInformation = "";// 错误信息提示

var currentTab = 1;
var result = {};// 基金下拉结果集
var result1 = {};// 效验时间

$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined
			|| username == "null") {
		setErrorMsg(1001);
	} else {

		//选择触发自动查询
		$("#fenhongjijin").blur(function() {
			autoFillFundName();
		});

		$("#fenhongfene").focus(function() {
			getfhdata();
			verificationTime();
		});

		$("#fhBtn").click(function() {
			getfhdata();
			Submit();
		});

		(function initController() {
			load();
		})();
	}
});

function load() {
	dataLoading = true;
	var params = {};
	var $jsontip = $("#fhjjid");
	//$jsontip.empty();//清空内容 
	$.ajax({
		url : mainUrl + "MutualFundAccountBookMoneyDividendPageAction",
		data : params,
		dataType : "JSON",
		success : function(response) {
			var result = response.data;
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
			console.log("# -----> Data: " + JSON.stringify(result));
		},
		error : function(response) {
			errors = "获取基金名称失败";
			if (response && response.retmsg && response.retmsg.length > 0) {
				errors = response.retmsg;
			}
			showAlert(errors);
			hasError = true;
			dataLoading = false;
		}
	});
};

//自动填充基金名称
function autoFillFundName() {
	if (fhList.windCode && fhList.windCode.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			var fund = result[i];
			console.log(fund);
			if (fund.windCode == fhList.windCode) {
				fhList.fundName = fund.fundName;
				break;
			}
		}
	}
}

//货币基金分红输入框 提交方法
function Submit() {
	if (timeError == false && fhList.fundName && fhList.fundName.length > 0
			&& fhList.windCode && fhList.windCode.length > 0
			&& fhList.dividendDate
			&& dateFormat(fhList.dividendDate, "yyyymmdd").length > 0
			&& fhList.dividendShare && fhList.dividendShare.length > 0) {
		var dividendDate = dateFormat(fhList.dividendDate, "yyyymmdd");
		var params1 = {
			"fundName" : fhList.fundName,
			"windCode" : fhList.windCode,
			"dividendDate" : dividendDate,
			"dividendShare" : fhList.dividendShare
		};
		console.log(params1);
		$.ajax({
			url : mainUrl + "MutualFundAccountBookDividendAction",
			data : params1,
			dataType : "JSON",
			success : function(response1) {
				console.log(response1);
				dataLoading = false;
				currentTab = 2;
				if (response1.retcode == "0000") {
					showAlert("分红成功！", gotrade);
					//showAlert("分红成功！");
				} else {
					showAlert("参数错误");
				}

				console.log("# -----> Data: " + JSON.stringify(response1));
			},
			error : function(response1) {
				errors = "提交失败";
				if (response1 && response1.retmsg
						&& response1.retmsg.length > 0) {
					errors = response1.retmsg;
				}
				showAlert(errors);
				hasError = true;
				dataLoading = false;
			}
		});
	}
}

//验证日期的方法
function verificationTime() {
	if (fhList.fundName && fhList.fundName.length > 0 && fhList.windCode
			&& fhList.windCode.length > 0 && fhList.fundName
			&& dateFormat(fhList.dividendDate, "yyyymmdd").length > 0) {
		console.log(fhList.dividendDate);
		var dividendDate = dateFormat(fhList.dividendDate, "yyyymmdd");
		console.log(dividendDate);
		var params2 = {
			"fundName" : fhList.fundName,
			"windCode" : fhList.windCode,
			"dividendDt" : dividendDate,
		};
		console.log(params2);
		$.ajax({
			url : mainUrl + "MutualFundAccountBookMoneyDividendDatePageAction",
			data : params2,
			dataType : "JSON",
			success : function(response2) {
				if (response2.retcode == "0000") {
					//showAlert("分红成功！",gotrade);
					console.log(response2);
					dataLoading = false;
					var result1 = response2.data;
					//验证日期
					if (result1.information == 1047) {
						timeError = false;
					} else if (result1.information == 1048) {
						timeError = true;
						tradeDtInformation = "交易日期早于基金成立日期";
						showAlert(tradeDtInformation);
					} else if (result1.information == 1049) {
						timeError = true;
						tradeDtInformation = "交易日期不能超过当前日期";
						showAlert(tradeDtInformation);
					}
					console.log("# -----> Data: " + JSON.stringify(result1));
				} else {
					showAlert("参数错误");
				}
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
	}
}

//跳转到trade
function gotrade() {
	window.location.href = mainUrl + "mp/moni/moni.html";
}
//获取表单数据
function getfhdata() {
	fhList.fundName = $("#fenhongjijin").find("option:selected").text(); //基金名称
	fhList.windCode = $("#fenhongjijin").val();//基金代码
	fhList.dividendDate = $("#indate").val(); //交易日期
	fhList.dividendShare = $("#fenhongfene").val();//费率方式 0-百分比 1-固定收费
};