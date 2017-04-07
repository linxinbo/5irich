$(document).ready(function () {
	var args = new getArgs();
	var fundname = args.groupname;
	console.log(fundname);
	var fundid = args.combinationcode;
	var bankNo = args.bankno;
	var applicationamt = args.applicationamount;
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
	})
})


function groupBuyStep4() {
	console.log("执行第四步购买")
	showLoading();
	var grouppw = $(".pass_trade").val();
	var args = new getArgs();
	var businesscode = args.businesscode;
	var channelid = args.channelid;
	var tano = args.tano;
	    tano = repalcecode(tano);
	    tano=tano.toString();
	var buyflag = args.buyflag;
	var applicationamount = args.applicationamount;
	var moneyaccount = args.moneyaccount;
	var combinationcode = args.combinationcode;
	var comfundlist = args.comfundlist;
	var comratelist = args.comratelist;
	comfundlist = repalcecode(comfundlist);
	comratelist = repalcecode(comratelist);
	var fdGroupMin = args.fdGroupMin;
	var fundcode = args.fundid;
	var tano = args.tano;
	var sharetype = args.sharetype;
	if (grouppw == "" || grouppw == null||grouppw.length<6) {
		showAlert("交易密码不能为空或少于6位！");
		hideloading();
		return false;
	} else {
		$.ajax({
			type: "post",
			url: mainUrl + "portipe",
			data: {
				"port.tpasswd": grouppw, //交易密码
				"port.channelid": channelid, //支付网点代码，第二步出参
				"port.tano": repalcecode(tano), //TA代码串，第一步出参tano
				"port.applicationamount": applicationamount, //申请金额
				"port.buyflag": buyflag, //强制购买
				"port.moneyaccount": moneyaccount, //资金账户
				"port.combinationcode": combinationcode, //组合代码
				"port.comtype": 0, //组合方式
				"port.comratelist": comratelist, //基金比例串（各个基金在组合中占用的比例用#隔开）第一步出参
				"port.comfundlist": comfundlist, //基金代码串  第一步出参
				"groupBean.fdGroupMin": fdGroupMin //基金组合购买最低额  第三部出参
			},
			dataType: "JSON",
			success: function (data) {
//				data = $.parseJSON(data);
				hideloading();
				if (data.retcode == 0000 || data.retcode == "0000") {
					console.log(data);
					window.location.href = "group_buy_right.html";
				} else {
					setErrorMsg(data.retcode, data.retmsg);

				}
			},
			error: function (data) {
				hideloading();
				alert("请稍后重试！服务器错误");
			}
		})
	}
	
}
