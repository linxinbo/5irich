var pw_flag=true;//交易密码输入是否正确标识，true为正确
var kaiguan=true;
$(document).ready(function () {
		var args = new getArgs();
		var fundname = args.fundname;
		console.log(fundname);
		var fundid = args.fundid;
		var bankNo = args.bankNo;
		var applicationamt = args.applicationamt;
		
		$('.fund_id span').html(fundname);
		$('.fund_id').append("(" + fundid + ")");
		$(".bank_no_conf span").html(bankNo);
		$(".conf_num").html(applicationamt);

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
		
		//隐藏交易密码，假如交易密码错误，显示该模块
		$('.passwd').attr("style","display:none");



	$("#drawBtnbuyfund").click(function(){
		$("#drawBtnbuyfund").attr('disabled',"true");
		if(kaiguan){
			kaiguan = false;
			buyStep4();
		}


	});
		
	});
	//购买第四步
function buyStep4() {
	console.log("执行第四步购买");
	showLoading();
	var args = new getArgs();
	var pw =args.pw;
	if(!pw_flag){
		var tradePW_val=$("#tradePW").val();
		if(tradePW_val==""||tradePW_val==undefined||tradePW_val=='undefined'){
			setErrorMsg("交易密码不能为空！");
			return;
		}else{
			pw=tradePW_val;
		}
	}
    var fundName = args.fundname;
	var transactionaccountid = args.transactionaccountid;
	var moneyaccount = args.moneyaccount;
	var branchcode = args.branchcode;
	var fundcode = args.fundid;
	var channelid = args.chaniled;

	var tano = args.tano;
	var sharetype = args.sharetype;
	var buyflag = args.buyflag;
	var applicationamt = args.applicationamt;
	var status = args.status;
		$.ajax({
			type: "post",
			url: mainUrl + "buyPayment",
			data: {
                "buy.fundname": fundName,
				//"fundBean.transactionaccountid": transactionaccountid, //银行卡号
				//"fundBean.branchcode": branchcode, //网点号码
				"buy.channelid": channelid, //网点代码
				"buy.tano": tano, //ta代码，
				"buy.moneyaccount": moneyaccount, //资金账户，
				"buy.fundcode": fundcode, //基金代码
				"buy.sharetype": sharetype, //收费方式
				"buy.applicationamount": applicationamt, //客服输入金额
				"buy.buyflag": buyflag, //强致性购买
				"buy.paytype" : 4,
				"buy.tpasswd": pw, //交易密码
				"buy.status" : status
			},
			dataType: "JSON",
			success: function (data) {
				//data = $.parseJSON(data);
				hideloading();
				console.log(data);
				if (data.retcode == 0000 || data.retcode == "0000") {
					kaiguan=false;
					$("#drawBtnbuyfund").attr('disabled',"true");
					window.location.href = "buynewright.html";
				} else {

					//在buyfund.html页面输入的交易密码错误
					if(data.retcode == '-409999999'){
						//显示交易密码模块
						showAlert(data.retmsg);
						$("#drawBtnbuyfund").removeAttr("disabled");
						kaiguan=true;
						$('.passwd').attr("style","display:block");

					}else if(data.retcode == '1111'){
						showAlert("卡余额不足，请换卡交易", h_back);
						$("#drawBtnbuyfund").removeAttr("disabled");
						kaiguan=true;
					}else{
						setErrorMsg(data.retcode, data.retmsg);
						$("#drawBtnbuyfund").removeAttr("disabled");
						kaiguan=true;
					}
				}
			},
			error: function (data) {
				$("#drawBtnbuyfund").removeAttr("disabled");
				kaiguan=true;
				hideloading();
				alert("请稍后重试！服务器错误");
			}
		});
	
}


function h_back(){
	history.back();
}
