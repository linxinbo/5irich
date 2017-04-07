function buyStep4() {
	console.log("执行第四步购买")
	showLoading();
	var args = new getArgs();
	var businesscode = args.businesscode;
	var fundcode = args.fundid;
	var tano = args.tano;
	var sharetype = args.sharetype;
	$.ajax({
		type: "post",
		url: mainUrl + "buyFundList",
		data: {
			"fundBean.transactionaccountid": fundcode,//银行卡号
			"fundBean.branchcode": applicationamt,//网点号码
			"fundBean.channelid": "KQ03",//网点代码
			"fundBean.tano": businesscode,//ta代码，
			"fundBean.moneyaccount": tano,//资金账户，
			"fundBean.fundcode": sharetype,//基金代码
			"fundBean.sharetype": first_per_min_20,//收费方式
			"fundBean.applicationamt": first_per_max_20,//客服输入金额
			"fundBean.buyflag":1//强致性购买
		},
		dataType: "JSON",
		success: function (data) {
			data = $.parseJSON(data);
			hideloading();
			if(data.retcode==0000||data.retcode=="0000"){
				console.log(data);
//				window.location.href="buyright.html";
			}else{
				setErrorMsg(data.retcode,data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！服务器错误");
		}
	})
}
