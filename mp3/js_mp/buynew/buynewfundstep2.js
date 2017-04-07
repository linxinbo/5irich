//第四步需要购买参数
var transactionaccountid;
var moneyaccount;
var branchcode;
$(document).ready(function () {
		var args = new getArgs();
		var fundname = args.fundname;
	      if(fundname.length>=10){
			  var nfundname=fundname.substring(0,7)+"...";
		  }else {
			  var nfundname = fundname;
		  }
		var fundid = args.fundid;
		var tano = args.tano;
		var sharetype = args.sharetype;
		var buyflag = args.buyflag;
		var first_per_min_20 = args.first_per_min_22;
		var chouj = args.chouj;
		console.log(chouj);
		$("#drawMoneyNum").attr("placeholder", first_per_min_20+"元起购");
		if(chouj==""||chouj==null||chouj==undefined||chouj=="undefined"||typeof(chouj)=="undefined" ){
			$("#drawMoneyNum").attr("placeholder", first_per_min_20+"元起购");
		}else{
			$("#drawMoneyNum").val(chouj);
		}
		$('.fund_id span').html(nfundname);
		$('.fund_id').append( fundid );
		buyStep2(fundid);


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
			var money = $("#drawMoneyNum").val();

			if (money == ""||money == null) {
				showAlert("请输入购买金额！");
				return;
			}
			var bankNo = $(".bank_no").parent().find("span").html();
			if (bankNo == "请选择") {
				showAlert("请选择银行卡");
				return;
			} else {
				buyStep3(bankNo);
			}
		});
       //验证用户选择的银行卡的购买限额
	   $("#drawMoneyNum").on('blur',function(){
		   var money = $("#drawMoneyNum").val();
		   if (money == ""||money == null) {
			   showAlert("请输入购买金额！");
			   return;
		   }
		   var bankNo = $(".bank_no").parent().find("span").html();
		   if (bankNo == "请选择") {
			   showAlert("请选择银行卡");
			   return;
		   } else {
			   bank_limit(bankNo,money);
		   }
	   });


		var val = $(".opaSelect").val();
		//$(this).prev("span").html(val);
		var html = $(".opaSelect").find("option:selected").html();
		console.log(html)
		//console.log($(this));
		transactionaccountid = $(".opaSelect").find("option:selected").attr("data_a");
		moneyaccount = $(".opaSelect").find("option:selected").attr("data_b");
		console.log(moneyaccount);
		branchcode = $(".opaSelect").find("option:selected").attr("data_c");
		$(".opaSelect").parent().children("span").html(html);

		$(".opaSelect").change(function () {
			var val = $(this).val();
			//$(this).prev("span").html(val);
			var html = $(this).find("option:selected").html();
			console.log(html)
			console.log($(this));
			transactionaccountid = $(this).find("option:selected").attr("data_a");

			moneyaccount = $(this).find("option:selected").attr("data_b");
			console.log(moneyaccount);
			branchcode = $(this).find("option:selected").attr("data_c");
			$(this).parent().children("span").html(html);
		});
	})
//验证银行卡单笔限额
function bank_limit(bankNo,money){
	showLoading();
	$.ajax({
		type: "get",
		url: mainUrl + "mp/data_mp/banksall.json",
		data: "",
		dataType: "JSON",
		success: function (data){
			console.log(data);
			hideloading();
			var bankNo1=bankNo.substring(0,7);
			$(data).each(function (i, n) {
				if(n.name==bankNo1){
					if(parseFloat(money)>parseFloat(n.singlelimit)){
						$("#bank_limit").show();
						$("#bank_limit a").html("您输入的金额大于银行单笔"+n.singlelimit+"元限额，此次购买可能会失败！");
					}else{
						$("#bank_limit").hide();
						//$("#bank_limit a").html("您输入的金额大于银行单笔"+n.singlelimit+"元限额，此次购买可能会失败！");
					}
				}


			});
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}});
}
	//购买第二步，检查银行卡；
function buyStep2(fundid) {
	console.log("执行第二步购买")
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "buypre",
		data: {
			"reference.fundcode": fundid,
			"reference.buyflag": 0
		},
		dataType: "JSON",
		async: false,
		success: function (data) {
			//			data = $.parseJSON(data);
			hideloading();
			console.log(data);
			if (data.retcode == 0000 || data.retcode == "0000") {
				//查询银行卡
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
				$(".opaSelect option:nth-child(2)").attr("selected" , "selected");
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	})
}
//第三步
function buyStep3(bankNo) {
	console.log("执行第三步购买")
	showLoading();
	var chaniled = $(".bank_no").val();
	console.log(chaniled)
	var pw = $(".pass_trade").val();
	var args = new getArgs();
	var fundname = args.fundname;
	var fundid = args.fundid;
	var buyflag = args.buyflag;
	var businesscode = args.businesscode;
	var fundcode = args.fundid;
	var tano = args.tano;
	var sharetype = args.sharetype;
	var first_per_min_20 = args.first_per_min_22;
	var first_per_max_20 = args.first_per_max_22;
	var status =args.status;
	var applicationamt = $("#drawMoneyNum").val();
	applicationamt = Number(applicationamt);
	//购买额度；
	if (applicationamt > first_per_max_20 || applicationamt < first_per_min_20) {
		showAlert("购买额度在" + first_per_min_20 + "~" + first_per_max_20 + "之间");
		hideloading();
		return false;	
	}
	//交易密码；
	if (pw == "" || pw == null) {
		showAlert("交易密码不能为空！");
		hideloading();
		return false;
	} else {
		$.ajax({
			type: "post",
			url: mainUrl + "recsubscrip",
			data: {
				"sufees.fundcode": fundcode,
				"sufees.applicationamount": applicationamt,
				"sufees.channelid": chaniled
				/*"rateBean.businesscode": businesscode,
				"rateBean.tano": tano,
				"rateBean.sharetype": sharetype,
				"revcFundListBean.first_per_min_20": first_per_min_20,
				"revcFundListBean.first_per_max_20": first_per_max_20*/
			},
			dataType: "JSON",
			success: function (data) {
				//			data = $.parseJSON(data);

				hideloading();
				console.log(data);
				if (data.retcode == 0000 || data.retcode == "0000") {
					console.log(data);
					//上传改回来的
					window.location.href = "buynewconfirm.html?tano=" + tano + "&sharetype=" + sharetype + "&buyflag=" + buyflag + "&fundname=" + fundname + "&fundid=" + fundid + "&businesscode=" + businesscode + "&first_per_min_20=" + first_per_min_20 + "&first_per_max_20=" + first_per_max_20 + "&bankNo=" + bankNo + "&applicationamt=" + applicationamt + "&chaniled=" + chaniled + "&transactionaccountid=" + transactionaccountid + "&moneyaccount=" + moneyaccount + "&branchcode=" + branchcode + "&pw=" + pw+ "&status=" + status;
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
