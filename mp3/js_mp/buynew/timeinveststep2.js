//第四步需要购买参数
var transactionaccountid;
var moneyaccount;
var branchcode;
var kaiguan=true;
$(document).ready(function () {
		var args = new getArgs();
		var tano = args.tano;
		var fundcode = args.fundcode;
		var fundname = args.fundname;
		var per_max_39 = args.per_max_39;
		var per_min_39 = args.per_min_39;
		var risklevel = args.risklevel;
		var sharetype = args.sharetype;
		var chouj = args.chouj;
		console.log(chouj);
		$("#drawMoneyNum").attr("placeholder", per_min_39+"元起购");
		if(chouj==""||chouj==null||chouj==undefined||chouj=="undefined"||typeof(chouj)=="undefined" ){
			$("#drawMoneyNum").attr("placeholder", per_min_39+"元起购");
		}else{
			$("#drawMoneyNum").val(chouj);
		}
		$('.fund_id span').html(fundname);
		$('.fund_id').append(fundcode);


		//加载用户可以使用的银行卡信息
		timeinvestStep2(fundcode);


		//密码输入框
		$(".pass_trade").focus(function () {
			$("i[data_rest=ID_rest]").show();
		});
		$(".pass_trade").blur(function () {
			if ($(this).val() == "") {
				$("i[data_rest=ID_rest]").hide();
			}
		});
		$("i[data_rest=ID_rest]").on("click", function () {
				$(".pass_trade").val("");
				$(this).hide();
		});
			//         console.log($(".opaSelect option:eq(0)").val());
			//		transactionaccountid = $(".opaSelect option:eq(0)").attr("data_a");
			//		moneyaccount = $(".opaSelect option:eq(0)").attr("data_b");
			//		branchcode = $(".opaSelect option:eq(0)").attr("data_c");
			//		console.log(transactionaccountid);
		$("#drawBtn").click(function () {
			var money = $("#drawMoneyNum").val();//定投金额
			if (money == ""||money == null||isNaN(money)) {
				showAlert("请输入购买金额！");
				return false;
			}
			var cycle1 = $('.cycle').val();//定投周期
			var investday = $('.investday').val();//定投日
			var bankNo = $(".bank_no option:selected").html();//银行名称
			if (bankNo == "请选择") {
				showAlert("请选择银行卡");
				return false;
			} else if(cycle1 =="" ||cycle1 =="请选择定投周期") {
				showAlert("请选择定投周期");
				return false;
			}else if(investday =="" ||investday =="请选择定投日") {
				showAlert("请选择定投日");
				return false;
			}else{
				buyStep3(bankNo);
			}
		});
	});
//购买获取用户银行卡信息和风险等级显示；
function timeinvestStep2(fundid) {
	console.log("获取银行卡信息！");
	//showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "precastopenapi",
		data: {
			"surelyOpen.fundcode": fundid,
			"surelyOpen.buyflag": 0
		},
		dataType: "JSON",
		async: false,
		success: function (data) {
			//data = $.parseJSON(data);
			//hideloading();
			//console.log(data);
			if (data.retcode == 0000 || data.retcode == "0000") {
				//查询银行卡
				risklevel=data.data.risklevel;
				if(risklevel=="1014"||risklevel==1014){
					$(".risk").show();
				}else{
					$(".risk").hide();
				}
				$(data.data.listmap).each(function (i, n) {
					var depositacct = n.depositcard;
					if (i == 0) {
						transactionaccountid = n.transactionaccountid;
						moneyaccount = n.moneyaccount;
						branchcode = n.branchcode;
						console.log(transactionaccountid);
						console.log(moneyaccount);
						console.log(branchcode);
						/*$(".bank_no").parent().find("span").html(getbanktype(n.channelid)+depositacct.substring(8));*/
						$(".bank_no").parent().find("span").html("请选择");
					}


					if(n.channelid==8866|| n.channelid=="8866"){

					}else{
						var option = "<option data_a='" + n.transactionaccountid + "' data_b='" + n.moneyaccount + "' data_c='" + n.branchcode + "' value='" + n.channelid + "'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
						$(".bank_no").append(option);
					}

					/*var option = "<option data_a='" + n.channelid + "' data_b='" + n.moneyaccount + "' value='" + n.channelid + "'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
					 $(".bank_no").append(option);*/
				});
				$(".bank_no option:nth-child(2)").attr("selected" , "selected");//默认选中
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			//hideloading();
			showAlert("网络错误，请稍后重试！");
		}
	})
}
//第三步
function buyStep3(bankNo) {
	console.log("执行第四步购买");
	showLoading();
	var chaniled = $(".bank_no").val();
	var moneyaccount = $('.bank_no').find("option:selected").attr("data_b");
	//console.log(chaniled)
	var pw = $(".pass_trade").val();
	var cycle1 = $('.cycle').val();//定投周期
	var investday = $('.investday').val();//定投日
	//页面传过来的
	var args = new getArgs();
	var tano = args.tano;
	var fundcode = args.fundcode;
	var fundname = args.fundname;
	var per_max_39 = args.per_max_39;
	var per_min_39 = args.per_min_39;
	var risklevel = args.risklevel;
	var sharetype = args.sharetype;
	//页面传过来的
	var money = $("#drawMoneyNum").val();
	money = Number(money);
	//购买额度；
	if (money > per_max_39 || money < per_min_39) {
		showAlert("购买额度在" + per_min_39 + "~" + per_max_39 + "之间");
		hideloading();
		return false;	
	}
	//交易密码；
	if (pw == "" || pw == null||pw.length<6) {
		showAlert("交易密码不能为空！");
		hideloading();
		return false;
	} else {

		$("#drawBtn").attr('disabled',"true");
		$("#drawBtn").removeClass("btn_lanse").addClass("btn_huise");
		$("#drawBtn").html('正在提交……');
		var risk = risklevel == '1014' ? 1 : 0;
		$.ajax({
			type: "post",
			url: mainUrl + "castopenapi",
			data: {
				"castOpen.fundcode":fundcode,
				"castOpen.fundname":fundname,
				"castOpen.riskmatching":risk,
				"castOpen.channelid":chaniled,
				"castOpen.tpasswd":pw,
				"castOpen.tano":tano,
				"castOpen.moneyaccount":moneyaccount,
				"castOpen.sharetype":"A",
				"castOpen.firstinvestamount":money,
				"castOpen.investperiods":cycle1,
				"castOpen.investcyclevalue":investday,
				"castOpen.operorg":chaniled
			},
			dataType: "JSON",
			success: function (data) {
				//data = $.parseJSON(data);
				hideloading();
				//console.log(data);
				if (data.retcode == 0000 || data.retcode == "0000") {
					kaiguan=false;
					$("#drawBtn").attr('disabled',"true");
					window.location.href = "timeinvest_right.html?fundname=" + fundname + "&fundcode=" + fundcode + "&amount=" + money + "&cycle1=" + cycle1 + "&investday=" + investday + "";
				} else {
					setErrorMsg(data.retcode, data.retmsg);
					$("#drawBtn").removeAttr("disabled");
					$("#drawBtn").html('确认提交');
					$("#drawBtn").removeClass("btn_huise").addClass("btn_lanse");
					kaiguan=true;
				}
			},
			error: function (data) {
				$("#drawBtn").removeAttr("disabled");
				$("#drawBtn").html('确认提交');
				$("#drawBtn").removeClass("btn_huise").addClass("btn_lanse");
				kaiguan=true;
				hideloading();
				showAlert("请稍后重试！服务器错误");
			}
		});
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

//添加循环月
function pushData() {
	var strHtml = "";
	strHtml += "<option>请选择定投日</option>";
	for ( var i = 1; i <= 28; i++) {
		//monthList.push({id: i, value: "第" + i + "天"});
		strHtml += "<option value='" + i + "'>第" + i + "天</option>";
	}
	$(".investday").html(strHtml);
}

//添加循环周
function pushWeek() {
	var strHtml1 = "";
	strHtml1 += "<option>请选择定投日</option>";
	for ( var i = 1; i <= 5; i++) {
		//monthList.push({id: i, value: "第" + i + "天"});
		strHtml1 += "<option value='" + i + "'>周" + i + "</option>";
	}
	$(".investday").html(strHtml1);
}


//周期联动定投日选择
function linkage_day(cycle){
	if(cycle==0){
		pushData();
	}else if(cycle==1){
		pushWeek();
	}else if(cycle==2){
		pushWeek();
	}
}
