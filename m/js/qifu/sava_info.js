
//点击预约调用
function savaInfo(name,sn,tel,money) {
	hideloading();
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "addAppt",
		data: {
			"mppBean.name": name,
			"mppBean.sn": sn ,
			"mppBean.tel": tel,
			"mppBean.money": money

		},
		success: function (data) {
			 var data = $.parseJSON(data)
			 hideloading();
			if(data.retcode==0000||data.retcode=="0000"){
				window.location.href="sava_right.html"
			}else{
				setErrorMsg(data.retcode,data.retmsg)
			}
		},
		error: function (data,b,c) {
             hideloading();
			showAlert("服务器错误");
			console.log(b)
			console.log(c)
		}
	})
}
