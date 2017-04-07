//接口父地址
//var mainUrl = "http://124.65.138.58:8080/Wirich2.0/";
//var mainUrl = "http://www.5irich.com/";
var mainUrl = "http://localhost:8080/Wirich2.0/";
//var mainUrl = "http://192.168.1.34:8080/Wirich2.0/";

var divObj=document.createElement("div");
divObj.style.margin="0 auto";
divObj.style.width="0px";
divObj.style.height="0px";
divObj.style.overflow="hidden";
divObj.innerHTML = "<img src='"+mainUrl+"m/images/thumbnail.jpg'>";
var first=document.body.firstChild;//得到页面的第一个元素 
document.body.insertBefore(divObj,first);//在得到的第一个元素之前插入

function setErrorMsg(errorcode, errormsg) {
	if (errormsg == "" || errormsg == null || errormsg == "undefined" || errormsg == undefined) {
		if (errorcode == 1000) {
			showAlert("请求参数不合法！");
		}
		if (errorcode == 1001) {
			showAlert("您还未登录", gologin);
		} else if (errorcode == 1005) {
			showAlert("密码格式错误，为6-16位数字、字母、字符");
		} else if (errorcode == 1006) {
			showAlert("手机或邮箱已存在");
		} else if (errorcode == 1007) {
			showAlert("您未开通交易账户", gourl);
		} else if (errorcode == 1008) {
			showAlert("请求参数为空");
		} else if (errorcode == 1009) {
			showAlert("登录名不存在或者密码错误");
		} else if (errorcode == 1010) {
			showAlert("您已开户成功或者签约快钱");
		} else if (errorcode == 1011) {
			showAlert("给定的手机号或邮箱未注册！");
		} else if (errorcode == 1012) {
			showAlert("请先进行风险评估测试", goUrlTest);
		} else if (errorcode == 1020) {
			showAlert("手机号格式错误");
		} else if (errorcode == 1004) {
			showAlert("验证码失效",goyanz);			
		} else if (errorcode == 1023) {
			showAlert("银行卡用户名不能为空")
		} else if (errorcode == 1024) {
			showAlert("银行卡号不能为空")
		} else if (errorcode == 1025) {
			showAlert("银行卡办理网点号不能为空")
		} else if (errorcode == 1031) {
			showAlert("用户没有可以赎回的基金");
		} else if (errorcode == 1033) {
			showAlert("购买金额小于基金最小值");
		} else if (errorcode == 1034) {
			showAlert("基金购买份额太高")
		} else if (errorcode == 1035) {
			showAlert("基金状态不能购买")
		} else if (errorcode == 1037) {
            showAlert("赎回份额大于用户可用份额")
        } else if (errorcode == 1038) {
            showAlert("用户赎回后持有份额小于基金限制最低持有份额，请全部赎回")
        } else if (errorcode == 1039) {
			showAlert("用户赎回份额不能小于该基金限制最低赎回份额");
		} else if (errorcode == 1040) {
            showAlert("用户赎回份额不能大于该基金限制最高赎回份额")
        } else if (errorcode == 1041) {
			showAlert("该基金暂不支持手机购买");
		} else if (errorcode == 1042) {
			showAlert("暂无基金详情");
		} else if (errorcode == 911006) {
			showAlert("快钱返回：错误的卡号校验位");
		} else if (errorcode == 1000) {
			showAlert("请求参数不合法");
		} else {
			showAlert(errorcode);
		}
	} else {
		if (errormsg == "未登录") {
			showAlert(errormsg, gologin);
		} else {
			showAlert(errormsg);
		}

	}
}


//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	/////////////////////////////////////////////////
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


//弹出框 只有确认按钮
function showAlert(str, callback) {
	if (false) {
		alert(str);
		if (callback) {
			callback();
		}
	}

	hideAlert();

	var alertBoxMask = $('<div class="alertBoxNew"></div>');

	var alertBox;
	var alertBox_h = '';
	alertBox_h += '<div class="alertContent"><div class="pack">';
	//	alertBox_h += '<h3>提示</h3>';
	alertBox_h += '<div class="alertText"><span>' + str + '</span></div>';
	alertBox_h += '<div class="subButton"><a>确认</a></div>';
	alertBox_h += '<div class="clearfix"></div>';
	alertBox_h += '</div></div>';
	alertBox = $(alertBox_h);
	alertBoxMask.append(alertBox);
	setTimeout("console.log('等待500毫秒')", 500)
	$("body").append(alertBoxMask);
	$(".alertContent").height($(".alertText").height() + 84);
	var alertMaskH;
	var contH = $(window).width();
	contH = parseInt((contH - 250) / 2);
	$(".alertContent").css("left", contH);
	if ($(document).height() >= $(window).height()) {
		alertMaskH = $(document).height();
	} else {
		alertMaskH = $(window).height();
	}
	$(".alertBoxNew").height(alertMaskH);
	var alertH = $(".alertContent").height();
	$(".alertContent").css("margin-top", -Math.ceil(alertH / 2));
	$(".subButton a").click(function () {
		hideAlert();
		if (callback) {
			callback();
		}

	});

}
//隐藏弹出框
function hideAlert() {
	if ($(".alertBoxNew")) {
		$(".alertBoxNew").remove();
	}
}

//弹出框 确认按钮加提示表示
function showAlertHint(str, callback, callback2) {
	if (false) {
		alert(str);
		if (callback) {
			callback();
		}
	}

	hideAlert();

	var alertBoxMask = $('<div class="alertBoxNew"></div>');

	var alertBox;
	var alertBox_h = '';
	alertBox_h += '<div class="alertContent"><div class="pack">';
	alertBox_h += '<h3>提示</h3>';
	alertBox_h += '<div class="alertText2 alertTextHint"><span>' + str + '</span></div>';
	alertBox_h += '<div class="subButton"><a class="cancle">取消</a><a class="confirm">确认</a></div>';

	//        _h += '<a class="cancle">' + btn[1] + '</a>';
	//    _h += '<a class="confirm">' + btn[0] + '</a>';
	alertBox_h += '<div class="clearfix"></div>';
	alertBox_h += '</div></div>';
	alertBox = $(alertBox_h);
	alertBoxMask.append(alertBox);

	$("body").append(alertBoxMask);
	$(".alertContent").height($(".alertText2").height() + 110);
	var alertMaskH;
	var contH = $(window).width();
	contH = parseInt((contH - 250) / 2);
	$(".alertContent").css("left", contH);
	if ($(document).height() >= $(window).height()) {
		alertMaskH = $(document).height();
	} else {
		alertMaskH = $(window).height();
	}
	$(".alertBoxNew").height(alertMaskH);
	var alertH = $(".alertContent").height();
	$(".alertContent").css("margin-top", -Math.ceil(alertH / 2));
	$(".subButton .confirm").click(function () {
		console.log("点击确认按钮！");
		if (callback) {
			callback();
		}
		hideConfirm();
	});

	$(".subButton .cancle").click(function () {
		console.log("点击取消按钮！");

		if (callback2) {
			callback2();
		} else {
			hideConfirm();
		}
	});
}

function hideConfirm() {
	if ($(".alertBoxNew")) {
		$(".alertBoxNew").remove();
	}
}
//loading框
function showLoading() {
	var main = $('<div class="load_div"></div>');
	var load = $('<div class="load_content"><div class="loader"><span></span><span></span><span></span><span></span></div><div class="load_text" style="font-size:16px;">正在加载，请等待</div></div>');
	main.append(load);
	setTimeout("console.log('等待200毫秒')", 200);
	$("body").append(main);
	var height;
	if ($(document).height() >= $(window).height()) {
		height = $(document).height();
	} else {
		height = $(window).height();
	}
	main.height(height);
}

function hideloading() {
	if ($(".load_div")) {
		$(".load_div").remove();
	}
}


//--------------------------------------------
var getArgs = function () //作用是获取当前网页的查询条件
	{
		var args = new Object(); //声明一个空对象
		var query = window.location.search.substring(1); // 取查询字符串，如从http://www.snowpeak.org/testjs.htm?a1=v1&a2=&a3=v3#anchor 中截出 a1=v1&a2=&a3=v3。
		var pairs = query.split("&"); // 以 & 符分开成数组
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('='); // 查找 "name=value" 对
			if (pos == -1) continue; // 若不成对，则跳出循环继续下一对
			var argname = pairs[i].substring(0, pos); // 取参数名
			var value = pairs[i].substring(pos + 1); // 取参数值
			value = decodeURIComponent(value); // 若需要，则解码
			args[argname] = value; // 存成对象的一个属性
		}
		return args; // 返回此对象
	};
//--------------------------------------------------


//检查id
function checkIdNum(idValue) {
	//	alert(idValue)
	console.log(idValue);
	if (idValue == "" || idValue == null || idValue == undefined) {
		return false;
	} else {
		return IdentityCodeValid(idValue);
	}
}
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
function IdentityCodeValid(code) {
	console.log(code);
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var tip = "";
	var pass = true;

	if (!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	} else if (!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if (code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if (parity[sum % 11] != code[17]) {
				tip = "校验位错误";
				pass = false;
			}
		}
	}
	if (!pass)
	//		alert(tip);
		console.log(tip);
	console.log(pass);
	return pass;
}

//检查手机验证
function checkPhnoeNum() {
	var value = $("input[type=tel]").val();
	return /^1[0-9]{10}$/.test(value);
}

function valiEmail(e) { //验证邮箱
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (reg.test(e)) {
		return true;
	} else {
		return false;
	}
}

//跳转某个页面
function gologin() {
	window.location.href = mainUrl + "m/user_login.html";
}

//刷新验证码
function goyanz(){
	$(".reshpic").attr("src", mainUrl+"IdentCodeGenerateAction?" + Math.random());
    $("#valiCode").val("");
}

//跳转某个页面
function gourl() {
	window.location.href = mainUrl+"m/account/account_index.html";
}

//跳转风评
function goUrlTest() {
	window.location.href = mainUrl+"m/funds_qifu/fund_qustList.html";
}

//判断业务名称
function getBussessName(code) {
	var bussesname = "";
	if (code == 20) {
		bussesname = "认购";
		return bussesname;
	} else if (code == 22) {
		bussesname = "申购";
		return bussesname;
	} else if (code == 24) {
		bussesname = "赎回";
		return bussesname;
	} else if (code == 22) {
		bussesname = "转换";
		return bussesname;
	} else {
		bussesname = "认购/申购";
		return bussesname;
	}
}

//判断支付状态
function getPayName(code) {
	var payname = "";
	if (code == 00) {
		payname = "未支付";
		return payname;
	} else if (code == 01) {
		payname = "支付正在处理";
		return payname;
	} else if (code == 02) {
		payname = "支付成功";
		return payname;
	} else if (code == 03) {
		payname = "支付失败";
		return payname;
	} else if (code == 04) {
		payname = "正报";
		return payname;
	} else if (code == 05) {
		payname = "处理中";
		return payname;
	} else if (code == 06) {
		payname = "支付可疑";
		return payname;
	} else if (code == 07) {
		payname = "托收成功";
		return payname;
	} else {
		payname = "撤单成功";
		return payname;
	}
}

//判断处理状态
function getstatsName(code) {
	var statsname = "";
	if (code == 00) {
		statsname = "待复核";
		return statsname;
	} else if (code == 01) {
		statsname = "未勾对";
		return statsname;
	} else if (code == 02) {
		statsname = "未报";
		return statsname;
	} else if (code == 03) {
		statsname = "带撤";
		return statsname;
	} else if (code == 04) {
		statsname = "废单";
		return statsname;
	} else if (code == 05) {
		statsname = "已撤";
		return statsname;
	} else if (code == 06) {
		statsname = "已报";
		return statsname;
	} else if (code == 07) {
		statsname = "已确认";
		return statsname;
	} else {
		statsname = "已结束";
		return statsname;
	}
}

function isUrl(url) { //判断当前页是否为xxx.html
	var s = ".+" + url.replace(".", "\\.") + "(\\?|$)";
	var reg = new RegExp(s);
	if (reg.test(location.href)) {
		return true;
	} else {
		return false;
	}
}

function isLastUrl(url) { //判断上一页是否为xxx.html
	var s = ".+" + url.replace(".", "\\.") + "(\\?|$)";
	var reg = new RegExp(s);
	if (reg.test(document.referrer)) {
		return true;
	} else {
		return false;
	}
}

//判断银行卡类别
function getbanktype(code) {
	var bankname;
	var bankcode = code.substring(0, 4);
	if (bankcode == "KQ01") {
		bankname = "快钱-工商银行";
		return bankname;
	} else if (bankcode == "KQ02") {
		bankname = "快钱-农业银行";
		return bankname;
	} else if (bankcode == "KQ03") {
		bankname = "快钱-中国银行";
		return bankname;
	} else if (code == "KQ04") {
		bankname = "快钱-建设银行";
		return bankname;
	} else if (bankcode == "KQ05") {
		bankname = "快钱-招商银行";
		return bankname;
	} else if (bankcode == "KQ06") {
		bankname = "快钱-交通银行";
		return bankname;
	} else if (bankcode == "KQ07") {
		bankname = "快钱-中信银行";
		return bankname;
	} else if (bankcode == "KQ08") {
		bankname = "快钱-浦发银行";
		return bankname;
	} else if (bankcode == "KQ09") {
		bankname = "快钱-兴业银行";
		return bankname;
	} else if (bankcode == "KQ10") {
		bankname = "快钱-广发银行";
		return bankname;
	} else if (bankcode == "KQ11") {
		bankname = "快钱-平安银行";
		return bankname;
	} else if (bankcode == "KQ12") {
		bankname = "快钱-华夏银行";
		return bankname;
	} else if (bankcode == "KQ13") {
		bankname = "快钱-光大银行";
		return bankname;
	} else if (bankcode == "KQ14") {
		bankname = "快钱-民生银行";
		return bankname;
	} else if (bankcode == "KQ15") {
		bankname = "快钱-邮储银行";
		return bankname;
	} else if (bankcode == "9001") {
		bankname = "通联-光大银行";
		return bankname;
	} else if (bankcode == "9002") {
		bankname = "通联-平安银行";
		return bankname;
	} else if (bankcode == "9003") {
		bankname = "通联-浦发银行";
		return bankname;
	} else if (bankcode == "9004") {
		bankname = "通联-工商银行";
		return bankname;
	} else if (bankcode == "9005") {
		bankname = "通联-农业银行";
		return bankname;
	} else if (bankcode == "9006") {
		bankname = "通联-建设银行";
		return bankname;
	} else if (bankcode == "9007") {
		bankname = "通联-邮储银行";
		return bankname;
	} else if (bankcode == "9008") {
		bankname = "通联-温州银行";
		return bankname;
	} else if (bankcode == "9009") {
		bankname = "通联-交通银行";
		return bankname;
	} else if (bankcode == "9010") {
		bankname = "通联-民生银行";
		return bankname;
	} else if (bankcode == "9011") {
		bankname = "通联-中国银行";
		return bankname;
	} else if (bankcode == "9012") {
		bankname = "通联-上海银行";
		return bankname;
	} else if (bankcode == "9014") {
		bankname = "通联-大连银行";
		return bankname;
	} else if (bankcode == "9015") {
		bankname = "通联-汉口银行";
		return bankname;
	} else if (bankcode == "9016") {
		bankname = "通联-广发银行";
		return bankname;
	} else if (bankcode == "9017") {
		bankname = "通联-中信银行";
		return bankname;
	} else if (bankcode == "9019") {
		bankname = "通联-兴业银行";
		return bankname;
	} else if (bankcode == "9021") {
		bankname = "通联-招商银行";
		return bankname;
	} else if (bankcode == "8866") {
		bankname = "民生银行";
		return bankname;
	}
}

//替换字符串#
function repalcecode(code) {
	code = code.replace(/\#/g, "%23");
	return code;
}

//不让form提交
$("form").submit(function () {
	return false;
});

/*//给body加高度
$(function(){
	var height;
	if ($(document).height() >= $(window).height()) {
		height = $(document).height();
	} else {
		height = $(window).height();
	}
	$("body").css("height",height);

})*/
