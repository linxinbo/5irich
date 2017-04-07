//判断用户输错了密码
var flag=false;
//定投入参 字段
var combinationcode;
var groupname;
var bank_no_html;
var cycleSelect_html;
var depositacct;
var moneyaccount;
var channelid;
var investcyclevaluee;
var investperiods;
var tradePW;
var drawMoneyNum;
//定投成功结果 字段
var mainplanno;
var firstinvestdate;

$(document).ready(function () {
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
	
	$("#tradePW_div").attr("style","display:none");
	
	//从url中截取组合代码
	var args = new getArgs();
	combinationcode = args.combinationcode;
	groupname = args.groupname;
	bank_no_html = args.bank_no_html;//银行卡信息
	cycleSelect_html = args.cycleSelect_html;//定投周期信息
	depositacct = args.depositacct;//银行卡号
	moneyaccount = args.moneyaccount;
	channelid = args.channelid;
	investcyclevalue = args.investcyclevalue;//定投周期
	investperiods = args.investperiods;//定投周期类型（每月）
	tradePW = args.tradePW;
	drawMoneyNum= args.drawMoneyNum;//定投金额
	
	$('#myAccount span').html(groupname);
	$('#myAccount').append("(" + combinationcode + ")");
	$("#cycleSelect").find("span").html(cycleSelect_html);
	$("#bank_no").find("span").html(bank_no_html);
	$("#drawMoneyNum").html(drawMoneyNum);
	
	$("#drawBtn").click(function () {
		if(flag){
			if($("#tradePW").val()==""||$("#tradePW").val()=="undefined"||$("#tradePW").val()==undefined){
				showAlert('请输入交易密码');
				return;
			}
		}
		groupInvest();
	});
	
});


//组合定投第二步，组合定投；
function groupInvest(groupid, groupnamea) {
	groupId = groupid;
	groupname = groupnamea;
	console.log($(this));
	showLoading();
	
	if(flag){
		tradePW=$("#tradePW").val();
	}
	
	$.ajax({
		type: "post",
		url: mainUrl + "compositeapi",
		data: {
			"surelyopen.depositacct": depositacct,
			"surelyopen.moneyaccount": moneyaccount,
			"surelyopen.firstinvestamount": $("#drawMoneyNum").val(),
			"surelyopen.tpasswd": tradePW,
			"surelyopen.investperiods": investperiods,
			"surelyopen.channelid": channelid,
			"surelyopen.sharetype": 'A',
			"surelyopen.investcyclevalue": investcyclevalue,
			"surelyopen.firstinvestamount": drawMoneyNum,
			"surelyopen.fundcode": combinationcode
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				mainplanno=data.data.mainplanno;
				firstinvestdate=data.data.firstinvestdate;
				goGroupInvestNext();
			} else {
				if(data.retcode=='-409999999'){
					flag=true;
					$("#tradePW_div").attr("style","");
				}
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	});
}

//定投group下一页
function goGroupInvestNext() {
	window.location.href = "group_invest_right.html?mainplanno=" + mainplanno+"&firstinvestdate="+firstinvestdate;
}


