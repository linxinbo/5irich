var tano;
var sharetype;
var buyflag = 0;
var transactionaccountid;
var fundnamea;
var fundida;
var businesscode;
var first_per_min_20;
var first_per_max_20;
//购买第一步，风险测试；
function buyStep1(fundid, fundname) {
	fundida = fundid;
	fundnamea = fundname;
	console.log($(this));
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "firstbuy",
		data: {
			"fb.fundcode": fundid,
			"listBean.fundcode": fundid
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				tano = data.data.tano;
				sharetype = data.data.sharetype;
				businesscode = data.data.businesscode;
				first_per_max_20 = data.data.first_per_max_20;
				first_per_min_20 = data.data.first_per_min_20;
				if (data.data.autRisk == 1014 || data.data.autRisk=="1014") {
					buyflag = 1;
					showAlertHint('基金的风险级别高于您个人风险承受能力，是否继续交易？', gobuynext);
				} else {
					buyflag = 0;
					gobuynext();
				}
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

//购买下一页
function gobuynext() {
	window.location.href = "/mp/buy/buyfund.html?tano=" + tano + "&sharetype=" + sharetype + "&buyflag=" + buyflag + "&fundname=" + fundnamea + "&fundid=" + fundida + "&businesscode=" + businesscode + "&first_per_min_20=" + first_per_min_20 + "&first_per_max_20=" + first_per_max_20;
}
