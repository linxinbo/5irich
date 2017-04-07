var tano;
var sharetype;
var buyflag = 0;
var transactionaccountid;
var fundnamea;
var fundida;
var businesscode;
var first_per_min_22;
var first_per_max_22;
var status;
//购买第一步，风险测试；

/*$(document).ready(function () {
	buyNewStep1('110050', '易方达月月利A');
});*/
var isopen = $.cookie("isopen");
var username = $.cookie("username");

function buyNewStep1(fundid, fundname,chouj) {
	fundida = fundid;
	fundnamea = fundname;
	console.log($(this));
	console.log(name);
	if(username == "" || username == null || username == undefined|| username == "null") {
		setErrorMsg(1001);//重写报错处理
		return false;
	}else if(isopen != 1) {
		showAlert("您还未开户，请开户后进行相关操作",gourl);//重写报错处理
		return false;
	}else{
		//showLoading();
		$.ajax({
			type: "post",
			url: mainUrl + "buypre",
			data: {
				"reference.fundcode": fundid,
				"reference.buyflag": 0
			},
			dataType: "JSON",
			success: function (data) {
				//hideloading();
				console.log(data);
				if (data.retcode == 0000) {
					tano = data.data.tano;
					sharetype = data.data.sharetype;
				    //businesscode = data.data.businesscode;
					status = data.data.status;
					if(status == 1 || status=="1") {
						first_per_max_22 = data.data.first_per_max_20;
						first_per_min_22 = data.data.first_per_min_20;
					}else if(status == 0 || status=="0") {
						first_per_max_22 = data.data.first_per_max_22;
						first_per_min_22 = data.data.first_per_min_22;
					}else{
						first_per_max_22 = data.data.first_per_max_22;
						first_per_min_22 = data.data.first_per_min_22;
					}

					if (data.data.risklevel == 1012 || data.data.risklevel=="1012") {
						buyflag = 0;
						showAlert("请先进行风险评估测试", goUrlTest);
					} else if(status == 5 || status=="5") {
						buyflag = 0;
						showAlert("基金停止申购");
					}else {
						buyflag = 1;
						gobuynext(chouj);
					}
				} else {
					setErrorMsg(data.retcode, data.retmsg);
				}
			},
			error: function (data) {
				//hideloading();
				if( data && data.retmsg && data.retmsg.length > 0 ) {
					showAlert(data.retmsg);
				} else if( data.retmsg == '1012' ) {
					showAlert("请先进行风险评估测试", goUrlTest);
				} else {
					showAlert( "未找到申购的基金信息" );
				}
			}
		})
	}
}

//购买下一页
function gobuynext(chouj) {
	window.location.href = mainUrl+"trade/purchase.html?tano=" + tano + "&sharetype=" + sharetype + "&buyflag=" + buyflag + "&fundname=" + fundnamea + "&fundid=" + fundida + "&first_per_min_22=" + first_per_min_22 + "&first_per_max_22=" + first_per_max_22+"&status=" + status+"&chouj=" + chouj;
}
