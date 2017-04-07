var buygroupC = {};

$(function () {
	var args = new getArgs();
	var fundname = args.groupname;
	var fundid = args.groupId;
	var comfundlist = args.comfundlist;
	var comratelist = args.comratelist;
	var tano = args.tano;
	var groupMoney=args.groupMoney;
	tano = repalcecode(tano);
	comfundlist = repalcecode(comfundlist);
	comratelist = repalcecode(comratelist);
	console.log(tano);
	var sharetype = args.sharetype;
	var buyflag = args.buyflag;
	var first_per_min_20 = args.first_per_min_20;
//	alert(fundid)
	$('#myAccount span').html(fundname);
	$('#myAccount').append("(" + fundid + ")");
	$("#drawMoneyNum").val(groupMoney);
	groupBuyStep2();
	buygroupStep3(fundid);
	//验证用户选择的银行卡的购买限额
	$("#drawMoneyNum").on('blur',function(){
		var money = $("#drawMoneyNum").val();
		if (money == "" | money == null) {
			showAlert("请输入购买金额！");
			return;
		}
		money=money.replace(/,/g,'');
		money = Number(money);
		if (money < buygroupC.x) {
			showAlert("购买金额低于最低额度！");
			return;
		}
		var bankNo = $(".bank_no").parent().find("span").html();
		if (bankNo == "请选择") {
			showAlert("请选择银行卡");
			return;
		} else{
			bank_limit(bankNo,money);
		}
	});
	//点击下一步
	$("#drawBtn").click(function () {
		var money = $("#drawMoneyNum").val();
		if (money == "" | money == null) {
			showAlert("请输入购买金额！");
			return;
		}
		money=money.replace(/,/g,'');
		money = Number(money);
		if (money < buygroupC.x) {
			showAlert("购买金额低于最低额度！");
			return;
		}
		var bankNo = $(".bank_no").parent().find("span").html();
		if (bankNo == "请选择") {
			showAlert("请选择银行卡");
			return;
		} else{
			var chaniled = $(".bank_no").val();
			window.location.href = "group_confirm.html?tano=" + tano + "&channelid=" + chaniled + "&comfundlist=" + comfundlist + "&buyflag=" + buyflag + "&combinationcode=" + fundid + "&groupname=" + fundname+"&applicationamount="+money+"&moneyaccount="+buygroupC.moneyaccount+"&comratelist="+comratelist+"&fdGroupMin="+buygroupC.x+"&bankno="+buygroupC.depositacct;}
	});

	$(".opaSelect").change(function () {
		var val = $(this).val();
			//$(this).prev("span").html(val);
		var html = $(this).find("option:selected").html();
		console.log(html);
		buygroupC.transactionaccountid = $(this).find("option:selected").attr("data_a");
		buygroupC.moneyaccount = $(this).find("option:selected").attr("data_b");
		buygroupC.branchcode = $(this).find("option:selected").attr("data_c");
		buygroupC.depositacct=$(this).find("option:selected").attr("data_d");
		$(this).parent().children("span").html(html);
	});
})
//验证银行卡单笔限额
function bank_limit(bankNo,money){
	showLoading();
	$.ajax({
		type: "get",
		url: mainUrl + "mp3/data_mp/banksall.json",
		data: "",
		dataType: "JSON",
		success: function (data){
			console.log(data);
			hideloading();
			var bankNo1=bankNo.substring(0,bankNo.length-8);
			$(data).each(function (i, n) {
				if(n.name==bankNo1){
					if(parseFloat(money)>parseFloat(n.singlelimit)){
						$("#bank_limit").show();
						$("#bank_limit a").html("您输入的金额大于银行单笔"+n.singlelimit+"元限额，此次购买可能会失败！");
					}
				}


			});
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}});
}
//购买第二步，获取银行卡；
function groupBuyStep2() {
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "relationList",
		data: {},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				//查询银行卡
				$(data.data).each(function (i, n) {
					var depositacct = n.depositacct;
					if (i == 0) {
						buygroupC.transactionaccountid = n.transactionaccountid;
						buygroupC.moneyaccount = n.moneyaccount;
						buygroupC.branchcode = n.branchcode;
						console.log(buygroupC.transactionaccountid);
						console.log(buygroupC.moneyaccount);
						console.log(buygroupC.branchcode);
						/*$(".bank_no").parent().find("span").html(getbanktype(n.channelid)+depositacct.substring(8));*/
						$(".bank_no").parent().find("span").html("请选择");
					}

					var option = "<option data_a='" + n.transactionaccountid + "' data_b='" + n.moneyaccount + "' data_c='" + n.branchcode + "' value='" + n.channelid + "'data_d='"+depositacct+"'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
					$(".bank_no").append(option);
				})
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
function buygroupStep3(fundcode) {
	console.log("执行第三步购买")
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "portfolipenedQuery",
		data: {
			"port.combinationcode": fundcode,
		},
		dataType: "JSON",
		success: function (data) {
			//			data = $.parseJSON(data);
			hideloading();
			if (data.retcode == 0000 || data.retcode == "0000") {
				buygroupC.x = data.data;
				$("#drawMoneyNum").attr("placeholder", "最低购买额度" + data.data);

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
