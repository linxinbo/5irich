$(document).ready(function () {
		var name = $.cookie("username");
    	if (name == "" || name == null|| name == "null"  || name == undefined) {
			setErrorMsg(1001);
		}
})
function changePW() {
	var pw1 = $("#PW1").val();
	var newPW1 = $("#newPW1").val();
    var newPW2 = $("#newPW2").val();

	var str2 = /[0-9a-zA-Z]{6,16}/;
    if (!str2.test(newPW1)) {
        showAlert("密码为6-16数字或字母"); //"您输入的密码格式错误！"
	}
/*    var str = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if (!str.test(newPW1)) {
        showAlert("您输入的密码格式错误"); //"您输入的密码格式错误！"
        return false;
    }*/
	if (pw1 == "" || pw1 == null || newPW1 == "" || newPW1 == null || newPW2 == "" || newPW2 == null) {
		showAlert("密码不能为空");
		return;
	}

	if (newPW1 != newPW2) {
		showAlert("两次输入的密码不一致！");
		return;
	}
	changeAjax(pw1, newPW1);
}

//修改密码
function changeAjax(pw1, newPW1) {
	hideloading();
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "upRichPwd",
		data: {
			"password": pw1,
			"userBean.pwd": newPW1
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				window.location.href = "change_right.html";
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误");
		}
	})
}
