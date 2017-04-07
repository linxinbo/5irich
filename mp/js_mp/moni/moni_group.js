//var mainUrl="http://localhost:8080/Wirich2.0/";
var args = new getArgs();
var monizhangben_jiaoyiId = args.id;
var tradetype = args.tradetype;
var url_fundId = args.fundid;

var currentTab = 1;
var dataLoading = false;
var hasError = false;

var result = {}; // 接收交易明细穿过来的默认值

var tradeDtError = false;// 交易日期判断
var tradeDtMessage = "";// 交易日期错误信息提示
var baifenbi = true;// 百分比
var yuan = false;// 固定值

/*
 * $("#fundCode").change(function(){
 * //$(this).css("background-color","#FFFFCC"); //getrsgdata(); search();
 * console.log(jijin); });
 */

var jijin = [];// 存放自动显示的基金数据
var fundCodeError = false;// 是否显示基金代码错误提示标识
var errorMessage = "";// 基金代码错误提示
var buyShareError = true;// 是否显示份额错误提示信息

var renshengou_id = "";// 这个是修改传过来的id
var renshengou_id_judgment = false;// 判断是直接点认申购进来的 还是从交易明细里面跳过来的
var tradeType = 0;// 这个是修改过来的数值 1 代表认申购 2 是赎回 0没有做判断用
var rsgList = {
	fundName : "",
	fundCode : "",
	tradeDt : "",
	buyPattern : "",
	freeRatioType : "",
	freeRatio : "",
	amountBuy : "",
	buyShare : "",
	dividendsPattern : "",
	dividendsPattern : ""
};
//判断用户是否登陆				
$(function() {
	var isopen = $.cookie("isopen");
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined	|| username == "null") {
		setErrorMsg(1001);
	} else {


		if (url_fundId != null && url_fundId != "") {
			$("#fundCode").val(url_fundId);//赋值到页面	
			/*$("#fundName_content").hide();*/
			$("#fundZm_content").hide();
		}else if(monizhangben_jiaoyiId != null && monizhangben_jiaoyiId != ""){
			$("#fundZm_content").hide();
		}


		search();//预加载输入框数据
		getrsgdata();//获取表单数据
		//renshengoufeilv();//改变认申购费率


		//绑定点击提交方法
		$("#rsgBtn").click(function() {
			Submit();
		});

		//绑定焦点离开方法
		$("#groupamountBuy").blur(function() {
			autoCount();

		});
		//绑定焦点离开方法
		$("#groupCode").blur(function() {
			moneyChange();
		});

		(function initController() {
			load();
		})();

	}
});
//载入判断是否修改
function load() {
	dataLoading = true;
	if (monizhangben_jiaoyiId != "" && monizhangben_jiaoyiId) {
		renshengou_id_judgment = true;
		//controller.renshengou_id = "82";//写死的 测试用的
		renshengou_id = monizhangben_jiaoyiId;
		monizhangben_jiaoyiId = "";
	}
	if (renshengou_id && renshengou_id != "") {
		automaticallyFillDefaultValues_RSG();
	}

};
//提交方法
function Submit() {
	if (renshengou_id_judgment) {
		ModifySubmit();//修改提交的方法

	} else {

		if (checkFundCode() && !tradeDtError) {
			console.log(rsgList.freeRatioType);
			var freeRatio2 = "";
			if (rsgList.freeRatioType == "0") {
				freeRatio2 = rsgList.freeRatio / 100;
			} else {
				freeRatio2 = rsgList.freeRatio;
			}
			//基金代码，基金名称，时间，认购/申购方式，申购费率，费率方式，购买金额，购买份额，分红方式
			var tradeDt = dateFormat(rsgList.tradeDt, "yyyymmdd");//格式化日期
			var params2 = {
				"groupCode" : rsgList.fundCode,
				"groupName" : rsgList.fundName,
				"tradeDt" : tradeDt,
				"amount" : rsgList.amountBuy,
				"share" : rsgList.buyShare
			};
			console.log(params2);
			$.ajax({
				url : mainUrl + "GroupFundAccountBookBuyAction",
				data : params2,
				dataType : "JSON",
				success : function(response) {
					var result = response.retcode;
					dataLoading = false;
					currentTab = 2;
					if (result == 0000 || result == "0000") {
						showAlert("提交成功！", gotjcg);
						//window.location.href="tjcg.html";
					} else {
						showAlert("参数有误！");
					}
					console.log(result);
				},
				error : function(response) {
					errors = "提交失败";
					console.log(errors);
					if (response && response.retmsg
							&& response.retmsg.length > 0) {
						errors = response.retmsg;
					}
					showAlert(errors);
					hasError = true;
					dataLoading = false;

				}
			});
		} else {
			fundCodeError = true;//是否显示基金代码错误提示标识
			errorMessage = "基金代码错误";//基金代码错误提示
		}
	}

}

//这是要修改的提交方法
function ModifySubmit() {
	if (checkFundCode() && !tradeDtError) {
		var freeRatio1 = "";
		if (rsgList.freeRatioType == "0") {
			freeRatio1 = rsgList.freeRatio / 100;
		} else {
			freeRatio1 = rsgList.freeRatio;
		}
		//var freeRatio1 = rsgList.freeRatio / 100;
		var tradeDt = dateFormat(rsgList.tradeDt, "yyyymmdd");
		console.log(tradetype);
		var params3 = {
			"id" : renshengou_id,
			"tradeType" : tradetype,
			"windCode" : rsgList.fundCode,
			"tradeDt" : tradeDt,
			"freeRatio" : freeRatio1,
			"amountBuy" : rsgList.amountBuy,
			"buyShare" : rsgList.buyShare,
			"buyPattern" : rsgList.buyPattern,
			"dividendsPattern" : rsgList.dividendsPattern,
			"freeratioType" : rsgList.freeRatioType
		};
		console.log(params3);
		$.ajax({
			url : mainUrl + "MutualFundBuyModifyAction",
			data : params3,
			dataType : "JSON",
			success : function(response) {
				console.log(response);
				result = response.retcode;
				dataLoading = false;
				currentTab = 3;
				if (result == 0000 || result == "0000") {
					showAlert("修改成功！", gotjcg);
					//window.location.href="tjcg.html";
				} else {
					showAlert("参数有误！");
				}
				console.log("# -----> Data: " + JSON.stringify(result));
			},
			error : function(response) {
				errors = "提交失败";

				if (response && response.retmsg && response.retmsg.length > 0) {
					errors = response.retmsg;
				}
				showAlert(errors);
				hasError = true;
				dataLoading = false;
			}

		});

	}

}

//自动计算份额和验证日期
function autoCount() {
	var freeRatio1 = "";
	if (checkFundCode()) {
		if (rsgList.fundName && rsgList.fundName != "" && rsgList.fundCode
				&& rsgList.fundCode != "" && rsgList.amountBuy
				&& rsgList.amountBuy != ""  && rsgList.tradeDt
				&& rsgList.tradeDt != "") {
			var tradeDt = dateFormat(rsgList.tradeDt, "yyyymmdd");
			var params1 = {
				"groupCode" : rsgList.fundCode,
				"amount" : rsgList.amountBuy,
				"share" : "",
				"tradeDt" : tradeDt
			};
			console.log(params1);
			$.ajax({
				url : mainUrl + "MutualGroupAmountShareCheckAction",
				//url:"http://www.5irich.com/MutualFundAccountBookBuyPageAction",
				data : params1,
				dataType : "JSON",
				success : function(response_f) {
					console.log(response_f);
					if (response_f.retcode == 0000 || response_f.retcode == "0000") {
						console.log("计算份额-->" + response_f);
						rsgList.buyShare = response_f.data.share;
						//console.log(rsgList.buyShare);
						if( Number(response_f.data.share) == 0 ){
							showAlert("份额返回失败");
						} else {
							$("#groupbuyShare").val(rsgList.buyShare.toFixed(2));
							$("#groupbuyShare").attr("disabled", "disabled");
						}


						dataLoading = false;
						buyShareError = true;

						if (response_f.data.information == "1047") {
							tradeDtError = false;
							tradeDtMessage = "";
						} else if (response_f.data.information == "1048") {
							tradeDtError = true;
							tradeDtMessage = "交易日期早于基金成立日期";//交易日期错误信息提示
							showAlert(tradeDtMessage);

						} else if (response_f.data.information == "1049") {
							tradeDtError = true;
							tradeDtMessage = "交易日期不能超过当前日期";//交易日期判断
							showAlert(tradeDtMessage);
						}
						console.log("# -----> Data: "+ JSON.stringify(rsgList.buyShare));
					} else {
						showAlert("份额返回失败");
					}
				},
				error : function(response_f) {
					errors = "份额错误";
					//console.log(errors);
					if (response_f && response_f.retmsg
							&& response_f.retmsg.length > 0) {
						errors = response_f.retmsg;
					}
					showAlert(errors);
					hasError = true;
					dataLoading = false;

				}

			});
		} else {
			buyShareError = false;
		}
	} else {
		buyShareError = false;
	}
}

//基金自动查询
function search(val) {
	return $.when(SuggestRemote(val, 1, 3000)).then(function(data) {
		if (data) {
			jijin = data;
			return data;
		} else {
			return [];
		}
	});
};

// 校验基金代码是否正确
function checkFundCode() {
	var flag = false;
	getrsgdata();
	if (rsgList.fundCode && rsgList.fundCode.length > 0) {

		for ( var i = 0; i < jijin.length; i++) {
			var fund = jijin[i];
			//console.log(fund);
			if (fund.windcode == rsgList.fundCode) {
				rsgList.fundName = fund.name;
				console.log(rsgList.fundName);
				flag = true;
				fundCodeError = false;// 是否显示基金代码错误提示标识
				break;
			}
		}
	} else {
		fundCodeError = true;// 是否显示基金代码错误提示标识
		errorMessage = "基金代码错误";// 基金代码错误提示
		showAlert(errorMessage);
	}
	return flag;
}
//基金代码实时检索
function SuggestRemote(keywords, page, offset) {
	var deferred = $.Deferred();
	$.ajax({
		url : mainUrl + "MutualGroupCodeNameCheckAction",
		data : "",
		dataType : "JSON",
		success : function(ret, status, headers, config) {
			if (ret && ret.retcode && ret.retcode == "0000") {
				console.log(ret);
				var data = ret.data;
				var results = [];
				var results1 = [];
				console.log(data);
				if (data) {
					for ( var i = 0; i < data.length; i++) {
						var product = data[i];
						results.push({
							name : product.groupName,
							windcode : product.groupCode,
							netValue : product.groupCode
						});
						var product1 = data[i];
						results1.push({
							name : product.groupName,
							windcode : product.groupCode,
							netValue : product.groupCode
						});
					}
				}
				//监控表单数据输入状态插件
				$('#groupName').typeahead({
					source : results,
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

		error : function(response) {
			console.log("# ERROR:" + JSON.stringify(response) + " ... FROM: ");
			deferred.resolve();
		}
	});

	return deferred.promise();
}
//自动计算份额
function moneyChange() {
	if (rsgList.amountBuy && rsgList.amountBuy != "") {
		autoCount();
	}
}

//查询出要修改的默认值
function automaticallyFillDefaultValues_RSG() {
	if (renshengou_id != "") {
		tradeType = 1;
		var params4 = {
			"id" : renshengou_id,
			"tradeType" : tradeType
		};
		$.ajax({
			url : mainUrl + "MutualFundBuyDefaultValueAction",
			data : params4,
			dataType : "JSON",
			success : function(response) {
				result = response.data;
				console.log(result);
				rsgList.fundName = result.fundName; //基金名称
				rsgList.fundCode = result.windCode;//基金代码
				$("#fundCode").val(rsgList.fundCode);//赋值到页面
				rsgList.tradeDt = dateTransform(result.tradeDt);
				$("#indate").val(rsgList.tradeDt);//交易日期
				rsgList.buyPattern = result.buyPattern;//认购/申购方式
				$("#buyPattern").val(rsgList.buyPattern);
				rsgList.freeRatioType = result.freeratioType;//费率方式 0-百分比 1-固定收费
				$("#freeRatioType").val(rsgList.freeRatioType);
				console.log(rsgList.freeRatioType);
				if (rsgList.freeRatioType == "0") {
					rsgList.freeRatio = result.freeRatio * 100;//申购费率 百分比
					$("#baifenbideid").val(rsgList.freeRatio);
					$("#feilv").empty();//清空原来的数据
					$("#feilv").append("%");
				} else if (rsgList.freeRatioType == "1") {
					rsgList.freeRatio = result.freeRatio;//绝对值
					$("#baifenbideid").val(rsgList.freeRatio);
					$("#feilv").empty();//清空原来的数据
					$("#feilv").append("元");
				}
				rsgList.amountBuy = result.amountBuy;//购买金额
				$("#amountBuy").val(rsgList.amountBuy);
				rsgList.buyShare = result.buyShare;//购买份额
				$("#buyShare").val(rsgList.buyShare);
				rsgList.dividendsPattern = result.dividendsPattern;//分红方式 0-现金分红 1-分红再投资
				$('#dividendsPattern input[name="dividendsPattern"]:checked').val(rsgList.dividendsPattern);
				search(rsgList.fundCode);
				renshengoufeilv();
			},
			error : function(response) {
				errors = "查询失败";
				if (response && response.retmsg && response.retmsg.length > 0) {
					errors = response.retmsg;
				}
				showAlert(errors);

			}

		});
	} else {

	}
}
//转换数据库日期
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
//成功跳转方法
function gotjcg() {
	window.location.href = mainUrl + "mp/moni/moni.html";
}
//获取表单数据
function getrsgdata() {
	rsgList.fundName = $("#groupName").val(); //基金名称
	rsgList.fundCode = $("#groupCode").val();//基金代码
	rsgList.tradeDt = $("#indate").val(); //交易日期
	//rsgList.freeRatio1 = $("#gudingzhideid").val();//申购费率
	rsgList.amountBuy = $("#groupamountBuy").val();//购买金额
	rsgList.buyShare = $("#groupbuyShare").val();//购买份额
}