//定投所需参数
var depositacct;
var transactionaccountid;
var buyplanno;
var branchcode;
var channelid;
var fundcode;
var fundname;
var DateDeductions;
var depositacctP;
var firstinvestamount;
var channelname;
var tpasswd;

$(document).ready(function () {
		var args = new getArgs();
		depositacct=args.depositacct;
		transactionaccountid = args.transactionaccountid;
		buyplanno = args.buyplanno;
		branchcode = args.branchcode;
		channelid = args.channelid;
		fundcode = args.fundcode;
		fundname = args.fundname;
		DateDeductions = args.DateDeductions;
		depositacctP = args.depositacctP;
		firstinvestamount = args.firstinvestamount;
		channelname=args.channelname;
		
		$('.fund_id span').html(fundname);
		$('.fund_id').append("(" + fundcode + ")");
		
		$(".investcyclevalue_no_conf span").html(DateDeductions);
		$(".bank_no_conf span").html(channelname+depositacctP);
		
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
			stopStep2();
		});

	});

//第二步
function stopStep2() {
	console.log("执行定投");
	console.log("depositacct--"+depositacct);
	console.log("transactionaccountid--"+transactionaccountid);
	console.log("buyplanno--"+buyplanno);
	console.log("branchcode--"+branchcode);
	console.log("channelid--"+channelid);
	console.log("fundcode--"+fundcode);
	console.log("fundname--"+fundname);
	console.log("DateDeductions--"+DateDeductions);
	console.log("depositacctP--"+depositacctP);
	console.log("firstinvestamount--"+firstinvestamount);
	console.log("channelname--"+channelname);
	console.log("tpasswd--"+tpasswd);
	/*window.location.href = "investright.html";
	return;*/
	$.ajax({
		type: "post",
		url: mainUrl + "dtermiapi",
		data: {
			"decide.depositacct": fundcode,
			"decide.transactionaccountid": transactionaccountid,
			"decide.tpasswd": tpasswd,
			"decide.buyplanno": buyplanno,
			"decide.branchcode": branchcode,
			"decide.channelid": channelid
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000 || data.retcode == "0000") {
				window.location.href = "investStopRight.html";
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
