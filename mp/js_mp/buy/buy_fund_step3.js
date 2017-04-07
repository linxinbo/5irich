var pw_flag=true;//交易密码输入是否正确标识，true为正确

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
		$.ajax({
			type: "post",
			url: mainUrl + "buyFundList",
			data: {
                "fundName": fundName,
				"fundBean.transactionaccountid": transactionaccountid, //银行卡号
				"fundBean.branchcode": branchcode, //网点号码
				"fundBean.channelid": channelid, //网点代码
				"fundBean.tano": tano, //ta代码，
				"fundBean.moneyaccount": moneyaccount, //资金账户，
				"fundBean.fundcode": fundcode, //基金代码
				"fundBean.sharetype": sharetype, //收费方式
				"fundBean.applicationamt": applicationamt, //客服输入金额
				"fundBean.buyflag": buyflag, //强致性购买
				"fundBean.tpasswd": pw //交易密码
			},
			dataType: "JSON",
			success: function (data) {
				//			data = $.parseJSON(data);
				hideloading();
				if (data.retcode == 0000 || data.retcode == "0000") {
					window.location.href = "buyright.html";
				} else {
					setErrorMsg(data.retcode, data.retmsg);
					//在buyfund.html页面输入的交易密码错误
					if(data.retcode == '91-409999999'){
						//显示交易密码模块
						$('.passwd').attr("style","display:block");
						pw_flag=false;
					}else if(data.retcode == '911111'){
						showAlert("卡余额不足，请换卡交易", h_back);
					}
				}
			},
			error: function (data) {
				hideloading();
				alert("请稍后重试！服务器错误");
			}
		});
	
}


function h_back(){
	history.back();
}
