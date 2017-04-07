//定投第一步，风险测试；
var isopen = $.cookie("isopen");
var username = $.cookie("username");
var buyflag=0;
function timeinvestStep1(fundid) {
	var fundid = fundid;//基金代码
	var fundcode=fundid.substring(0,6);

	//用户登陆验证
	if(username == "" || username == null || username == undefined|| username == "null") {
		setErrorMsg(1001);//重写报错处理
		return false;
	}else if(isopen != 1) {
		showAlert("您还未开户！，请开户后进行相关操作",gourl);//重写报错处理
		return false;
	}else{
		//showLoading();
		$.ajax({
			type: "post",
			url: mainUrl + "precastopenapi",
			data: {
				"surelyOpen.fundcode": fundcode,
				"surelyOpen.buyflag": 0
			},
			dataType: "JSON",
			success: function (data) {
				//hideloading();
				console.log(data);
				if (data.retcode == 0000) {
					var tano = data.data.tano;
					var fundcode = data.data.fundcode;
					var fundname = data.data.fundname;
					var per_max_39 = data.data.per_max_39;
					var per_min_39 = data.data.per_min_39;
					var risklevel = data.data.risklevel;
					var sharetype = data.data.sharetype;
					if(data && data.data && data.data.risklevel == '1012'){
						showAlert("请先进行风险评估测试", goUrlTest);
					}else{
						window.location.href = mainUrl+"mp/buynew/timeinvest.html?fundcode=" + fundcode + "&fundname="+fundname+"&sharetype=" +sharetype+ "&tano=" + tano + "&per_max_39=" + per_max_39 + "&per_min_39=" + per_min_39 + "&risklevel=" + risklevel + "";
					}
				} else {
					if(data.retcode=="7000"){
						showAlert("此基金不支持定投");
					}else{
						setErrorMsg(data.retcode,data.retmsg);
					}
				}
			},
			error: function (data) {
				//hideloading();
				if( data && data.retmsg && data.retmsg.length > 0 ) {
					showAlert(data.retmsg);
				} else if( data.retmsg == '1012' ) {
					showAlert("请先进行风险评估测试", goUrlTest);
				} else {
					showAlert( "未找到定投的基金信息" );
				}
			}
		})
	}
}