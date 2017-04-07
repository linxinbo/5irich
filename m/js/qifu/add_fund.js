function addFund(fundid, fundname, fundvalue) {
	hideloading();
	showLoading();
	//	加自选
	$.ajax({
		type: 'post',
		url: mainUrl + 'addChoice',
		data: {
			"choiceBean.fundCode": fundid,
			"choiceBean.fundShortName": fundname,
			"choiceBean.netValue": 1
		},
		dataType: 'json',
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
				showAlert("加自选成功！");

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		}
	})
}
