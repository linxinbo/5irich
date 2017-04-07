//定投所需参数
var fundcode;
var riskmatching;
var channelid;
var tano;
var moneyaccount;
var sharetype;
var firstinvestamount;
var investperiods;
var investcyclevalue;
var operorg;
var tpasswd;
//---------------------------
var fundname;
var investperiods_html;
var investcyclevalue_html;
var bankNo_html;

$(document).ready(function () {
		var args = new getArgs();
		fundname=args.fundname;
		fundcode = args.fundcode;
		riskmatching = args.riskmatching;
		channelid = args.channelid;
		tano = args.tano;
		moneyaccount = args.moneyaccount;
		sharetype = args.sharetype;
		firstinvestamount = args.firstinvestamount;
		investperiods = args.investperiods;
		investcyclevalue = args.investcyclevalue;
		operorg = args.operorg;
		investperiods_html = args.investperiods_html;
		investcyclevalue_html = args.investcyclevalue_html;
		bankNo_html = args.bankNo_html;
		
		$('.fund_id span').html(fundname);
		$('.fund_id').append("(" + fundcode + ")");
		
		$(".investperiods_no_conf span").html(investperiods_html);
		$(".investcyclevalue_no_conf span").html(investcyclevalue_html);
		$(".bank_no_conf span").html(bankNo_html);
		
		$(".conf_num").html(firstinvestamount);

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
			
		//下一步按钮	
		$("#drawBtn").click(function () {
			
			var tradePW = $("#tradePW").val();
			tpasswd=tradePW;
			if (tradePW == "") {
				showAlert("请输入交易密码");
				return;
			}
			buyStep2();
		});

	});

//第二步
function buyStep2() {
	console.log("执行定投");
	
	console.log("fundcode--"+fundcode);
	console.log("riskmatching--"+riskmatching);
	console.log("channelid--"+channelid);
	console.log("tano--"+tano);
	console.log("moneyaccount--"+moneyaccount);
	console.log("sharetype--"+sharetype);
	console.log("firstinvestamount--"+firstinvestamount);
	console.log("investperiods--"+investperiods);
	console.log("investcyclevalue--"+investcyclevalue);
	console.log("operorg--"+operorg);
	console.log("tpasswd--"+tpasswd);
	/*window.location.href = "investright.html";
	return;*/
	$.ajax({
		type: "post",
		url: mainUrl + "castopenapi",
		data: {
			"castOpen.fundcode": fundcode,
			"castOpen.riskmatching": riskmatching,
			"castOpen.channelid": channelid,
			"castOpen.tpasswd": tpasswd,
			"castOpen.tano": tano,
			"castOpen.moneyaccount": moneyaccount,
			"castOpen.sharetype": sharetype,
			"castOpen.firstinvestamount": firstinvestamount,
			"castOpen.investperiods": investperiods,
			"castOpen.investcyclevalue": investcyclevalue,
			"castOpen.operorg": operorg
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000 || data.retcode == "0000") {
				window.location.href = "investright.html";
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！服务器错误");
		}
	});		
}
