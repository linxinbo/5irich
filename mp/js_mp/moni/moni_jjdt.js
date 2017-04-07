//var mainUrl="http://localhost:8080/Wirich2.0/";
var dataLoading = false;//没有数据加载
var hasError = false;//错误信息

var errorMessage = "";//基金代码错误提示
var fundCodeError = false;//是否显示基金代码错误提示标识

var fundName = "";//基金名称
var windCode = "";//基金代码
var startDate = "";//定投开始时间
var endDate = "";//定投结束时间
var amountFixedInvestment = "";//定投金额
var freeRatio = "";//申购费率
var fixedInvestmentCycle = "1";//定投频率
var fixedInvestmentCycleType = "0";//定投周期类型 0-月 1-周 2-日
var buyPattern = "0";//申购方式 0-前端收费 1-后端收费
var freeRatioType = "0";//费率方式 0-百分比 1-固定
var deductMoneyDay = "1";//扣款日
var dividendsPattern = "0";//0-现金分红 1-分红再投资

var endDtInformation = "";//结束时间错误提示
var startDtInformation = "";//开始时间错误提示
var startRetmsgError = "";//开始时间错误提示
var endRetmsgError = "";//结束时间错误提示
var startRetmsg = false; //开始时间的判断显示错误信息
var endRetmsg = false;//结束时间的判断显示错误信息

//controller.checkTime = checkTime;//效验日期的方法
var fundCodeError = false;//是否显示基金代码错误提示标识
var currentTab = 1; // 1默认的表单页面 2成功页面
//controller.search = search;//自动查询
var jijin = [];//获得基金名称和基金代码
var result = {};//接受返回的数据结果集
var result1 = {};//返回效验时间的结果集
//controller.pushData = pushData;//循环扣款日方法
var monthList = [];//扣款日的天数
var timeError = false;//不显示下拉框
//controller.Judge = Judge; //判断下拉框方法
//controller.Submit = Submit;//提交方法

///controller.Load = load;

//判断用户是否登陆				
$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined	|| username == "null") {
		setErrorMsg(1001);
	} else {

		search();//监控输入//预加载输入框数据
		renshengoufeilv();//切换费率
		pushData();//扣款日
		getdtdata();
		//切换投资周期
		$("#fixedInvestmentCycleType").change(function() {
			Judge();
		});
		$("#fundCode").blur(function() {
			checkTime();
		});
		$("#amountFixedInvestment").focus(function() {
			checkTime();
		});

		$("#dtBtn").click(function() {
			Submit();
		});

		(function initController() {
			load();

		})();

	}

});

function load() {
	dataLoading = true;
};

//定投—定投基金交易框和时间验证
function checkTime() {
	getdtdata();
	//checkFundCode();
	if (fundName && fundName != "", windCode && windCode != "", startDate
			&& startDate != "", endDate && endDate != "") {
		var startDate2 = dateFormat(startDate, "yyyymmdd");
		var endDate2 = dateFormat(endDate, "yyyymmdd");
		var params = {
			"fundName" : fundName,
			"windCode" : windCode,
			"startDt" : startDate2,
			"endDt" : endDate2
		};
		console.log(params);
		$.ajax({
			url : mainUrl + "MutualFundAccountBookFixedInvestmentPageAction",
			data : params,
			dataType : "JSON",
			success : function(response) {
				console.log(response);
				if (response.retcode = "0000") {
					var result = response.data;
					var endDtInformation = result.endDtInformation;
					var startDtInformation = result.startDtInformation;

					if (startDtInformation == 1047) {
						startRetmsg = false;
					} else if (startDtInformation == 1048) {
						startRetmsg = true;
						startRetmsgError = "交易日期早于基金成立日期";
						showAlert(startRetmsgError);
					} else if (startDtInformation == 1049) {
						startRetmsg = true;
						startRetmsgError = "交易日期不能超过当前日期";
						showAlert(startRetmsgError);
					}
					if (endDtInformation == 1047) {
						endRetmsg = false;
					} else if (endDtInformation == 1049) {
						endRetmsg = true;
						endRetmsgError = "交易日期不能超过当前日期";
						showAlert(endRetmsgError);
					} else if (endDtInformation == 1050) {
						endRetmsg = true;
						endRetmsgError = "定投结束时间等于定投开始时间 ";
						showAlert(endRetmsgError);
					} else if (endDtInformation == 1051) {
						endRetmsg = true;
						endRetmsgError = "定投结束时间早于定投开始时间 ";
						showAlert(endRetmsgError);
					}

					dataLoading = false;
					console.log("# -----> Data: " + JSON.stringify(result));
				} else {
					showAlert("参数有误！");
				}
			},
			error : function(response) {
				errors = "提交失败";
				if (response && response.retmsg && response.retmsg.length > 0) {
					errors = response.retmsg;
				}
				hasError = true;
				dataLoading = false;

			}
		});
	} else {

	}
}

//表单提交
function Submit() {
	getdtdata();
	if (checkFundCode) {
		var fixedInvestmentCycleType1 = parseInt(fixedInvestmentCycleType);
		var freeRatioType1 = parseInt(freeRatioType);
		var buyPattern1 = parseInt(buyPattern);
		var dividendsPattern1 = parseInt(dividendsPattern);
		var freeRatio1 = 0;
		if (freeRatioType == 0) {
			freeRatio1 = freeRatio / 100;
		} else {
			freeRatio1 = freeRatio;
		}
		var startDate1 = dateFormat(startDate, "yyyymmdd");
		var endDate1 = dateFormat(endDate, "yyyymmdd");
		var deductMoneyDay1 = parseInt(deductMoneyDay);
		fundCodeError = false;//是否显示基金代码错误提示标识
		console.log(amountFixedInvestment);
		//var amountFixedInvestment1=$("#amountFixedInvestment").val();
		var params1 = {
			"fundName" : fundName,
			"windCode" : windCode,
			"fixedInvestmentCycle" : fixedInvestmentCycle,
			"fixedInvestmentCycleType" : fixedInvestmentCycleType1,
			"startDate" : startDate1,
			"endDate" : endDate1,
			"amountFixedInvestment" : amountFixedInvestment,
			"buyPattern" : buyPattern1,
			"freeRatio" : freeRatio1,
			"freerRatioType" : freeRatioType1,
			"dividendsPattern" : dividendsPattern1,
			"deductMoneyDay" : deductMoneyDay1
		};
		console.log(params1);
		$.ajax({
			url : mainUrl + "MutulFundAccountBookFixedInvestmentAction",
			data : params1,
			dataType : "JSON",
			success : function(response1) {
				//result = response1.data;
				if (response1.retcode = "0000") {
					dataLoading = false;
					currentTab = 2;
					console.log("# -----> Data: " + JSON.stringify(response1));
					showAlert("定投成功！", gotjcg);
				} else {
					showAlert("参数错误！");
				}
			},
			error : function(response1) {
				errors = "提交失败";
				if (response1 && response1.retmsg
						&& response1.retmsg.length > 0) {
					errors = response1.retmsg;
				}
				hasError = true;
				dataLoading = false;
			}
		});
	} else {
		fundCodeError = true;//是否显示基金代码错误提示标识
		errorMessage = "基金代码错误";//基金代码错误提示
	}
}

//定投周期类型 0-月 1-周 2-日
function Judge() {
	getdtdata();
	$("#kkr").hide();
	console.log(fixedInvestmentCycleType);
	if (fixedInvestmentCycleType == "0") {
		timeError = true;
		$("#kkr").show();
	} else if (fixedInvestmentCycleType == "1") {
		timeError = false;
		$("#kkr").hide();
	} else if (fixedInvestmentCycleType == "2") {
		timeError = false;
		$("#kkr").hide();
	}
}

//循环扣款日方法
function pushData() {
	var strHtml = "";
	for ( var i = 1; i <= 28; i++) {
		//monthList.push({id: i, value: "第" + i + "天"});
		strHtml += "<option value='" + i + "'>第" + i + "天</option>";
	}
	$("#deductMoneyDay").append(strHtml);
}

//基金自动查询
function search(val) {
	return $.when(SuggestRemote(val, 1, 600)).then(function(response2) {
		if (response2) {
			jijin = response2;
			//console.log(jijin);
			return response2;
		} else {
			return [];
		}
	});
};

//基金代码实时检索
function SuggestRemote(keywords, page, offset) {
	var params = {
		"page" : page,
		"pageRecorders" : offset,
		"information" : keywords,
		"flat" : ""
	};
	if (/[0-9]+/.test(keywords)) {
		params.flat = 0;
	} else if (/[a-zA-Z0-9]+/.test(keywords)) {
		params.flat = 2;
	} else {
		params.flat = 1;
	}

	//var url = {url:mainUrl + "/MutualFundListManacheQueryAction", data:params,type:"get",dataType:"json",}
	var deferred = $.Deferred();
	//var deferred = $q.defer();
	//console.log( "# GET " + url + " ..." );
	//console.log(params);	
			$.ajax({
				url : mainUrl + "MutualFundListManacheFuzzyQueryAction",
				data : params,
				dataType : "JSON",
				success : function(ret, status, headers, config) {
					if (ret && ret.retcode && ret.retcode == "0000") {
						var data = ret.data;
						var results = [];
						var results1 = [];
						if (data) {
							for ( var i = 0; i < data.length; i++) {
								var product = data[i];
								results.push({
									name : product.fundName,
									windcode : product.fInfoWindcode,
									netValue : product.fInfoPinYin
								});
								var product1 = data[i];
								results1.push({
									name : product.fundName,
									windcode : product.fInfoPinYin,
									netValue : product.fInfoWindcode
								});
							}
						}
						//监控表单数据输入状态插件
						$('#fundZm').typeahead({
							source : results1,
							items : 10,
							display : 'windcode',
							val : 'name',
							netValue : 'netValue',
							itemSelected : displayResult
						});
						deferred.resolve(results);
						//console.log(results);			              
					} else {
						console.log("1114");
						deferred.resolve();
					}
				},

				error : function(response3) {
					console.log("# ERROR:" + JSON.stringify(response3)
							+ " ... FROM: ");
					deferred.resolve();
				}
			});

	return deferred.promise();
}

//校验基金代码是否正确
function checkFundCode() {
	getdtdata();
	var flag = false;
	if (windCode && windCode.length > 0) {
		for ( var i = 0; i < jijin.length; i++) {
			var fund = jijin[i];
			if (fund.windCode == windCode) {
				var fundName = fund.name;
				console.log(fundName);
				flag = true;
				break;
			}
		}
	}
	return flag;
};

//jq切换申购费率
function renshengoufeilv() {
	$("#baifenbideid").show();
	$("#gudingzhideid").hide();
	$('#freeRatioType').change(function() {
		//alert($(this).children('option:selected').val()); 
		if ($(this).children('option:selected').val() == "0") {
			$("#feilv").empty();
			$("#feilv").append("%");
			//$("#baifenbideid").show();
			//$("#gudingzhideid").hide();
		} else if ($(this).children('option:selected').val() == "1") {
			$("#feilv").empty();
			$("#feilv").append("元");
			//$("#baifenbideid").hide();
			//$("#gudingzhideid").show();
		}

	});
}
//成功跳转方法
function gotjcg() {
	window.location.href = mainUrl + "mp/moni/moni.html";
}
//获取表单数据
function getdtdata() {
	fundName = "";//基金名称
	windCode = $("#fundCode").val();//基金代码
	startDate = $("#indate").val();//定投开始时间
	endDate = $("#indate1").val();//定投结束时间
	amountFixedInvestment = $("#amountFixedInvestment").val();//定投金额
	freeRatio = $("#baifenbideid").val();//申购费率
	freeRatio1 = $("#gudingzhideid").val();//申购费率
	fixedInvestmentCycle = $("#fixedInvestmentCycle").val();//定投频率
	fixedInvestmentCycleType = $("#fixedInvestmentCycleType").val();//定投周期类型 0-月 1-周 2-日
	buyPattern = "0";//申购方式 0-前端收费 1-后端收费
	freeRatioType = $("#freeRatioType").val();//费率方式 0-百分比 1-固定
	deductMoneyDay = $("#deductMoneyDay").val();//扣款日
	dividendsPattern = $('#dividendsPattern input[name="fenhong"]:checked').val();//0-现金分红 1-分红再投资
}
