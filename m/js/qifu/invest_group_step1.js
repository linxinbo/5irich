var combinationcode;//组合代码
var buyflag;

function invest_previous(groupcode,MoneyMonth){
	$.ajax({
		type: "post",
		url: mainUrl + "groupbuyPre",
		data: {
			"combination.combinationcode": groupcode,
			"combination.buyflag":1
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				//未风评
				if (data.data.risklevel == 1012 || data.data.autRisk) {
					setErrorMsg(data.data.risklevel);
				}
				//已风评，但是风险超过用户的承受范围，给予提示
				else if (data.data.risklevel == 1014 || data.data.autRisk){
					combinationcode=data.data.combinationcode;
					buyflag = 1;
					showAlertHint('基金的风险级别高于您个人风险承受能力，是否继续交易？', goInvestNext);
				}else{
					combinationcode=data.data.combinationcode;
					buyflag = 0;
					goInvestNext();
				}
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	});
}

//购买下一页
function goInvestNext() {
	window.location.href = "../../intelligence/group_invest/group_invest.html?combinationcode=" + combinationcode+"&MoneyMonth="+MoneyMonth;
}