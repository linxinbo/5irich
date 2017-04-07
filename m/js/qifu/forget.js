$(document).ready(function () {

	$(".get_valiCode .smsCode").unbind("click").click(function () {
        $("#valiCode").val("");
		$("input").blur();
		var phone = $("#phone_num").val();
		var that = $(this);
		var str1 = /^1[3-8]{1}\d{9}$/;

		if (phone == "") {
			showAlert("手机不能为空！");
			return false;
		}

		if (!str1.test(phone)) {
			showAlert("手机号格式错误！"); //"手机号格式错误！"
			return false;
		}
		var wait = 120;

		function time(o) {
			var that = o;
			if (wait == 0) {
				//                $("#smsCode").removeClass("gray_bj");
				o.attr("class", "smsCode");
				o.val("获取验证码");
				o.removeAttr("disabled");
				wait = 120;
			} else {
				//                $("#smsCode").addClass("gray_bj");
				var  flag=setInterval(function(){
					//do
					//
					o.attr("class", "gray_bj");
					o.attr("disabled", true);
					o.val("重新发送(" + wait + ")");
					wait--;
					if(wait==0){
						clearInterval(flag);
						showAlert("如果您未能正常收入短信,请拨打客服电话400-6262-818联系我们");
						time(that);
					}
					
				},1000);
			}
		}


		hideloading();
		showLoading();
		$.ajax({
			type: "post",
			url: mainUrl + "rstAucd",
			data: {
				loginName: phone
			},
			dataType: "json",
			success: function (data) {
				hideloading();
				if (data.retcode == 0000) {
					showAlert("验证码已发送");
					time(that);
				} else {
					setErrorMsg(data.retcode);
				}
			},
			error: function (data) {
				hideloading();
				showAlert("服务器错误");
			}

		})
	})
})

function forget_1() {
	var phone = $("#phone_num").val();
	var valiCode = $("#valiCode").val();
	var str1 = /^1[3-8]{1}\d{9}$/;
	if (!str1.test(phone)) {
		showAlert("手机号码格式错误");
		return;
	}
	if (valiCode == "" || valiCode == null) {
		showAlert("验证码不能为空");
		return;
	}
    forget_2();
	/*window.location.href = "forget_step2.html?loginName="+phone+"&valiCode="+valiCode;*/
}
function forget_2(){
    /*var args = new getArgs();
    var phone = args.loginName;
    var valiCode = args.valiCode;*/
    var phone = $("#phone_num").val();
	var valiCode = $("#valiCode").val();
    var newPW1 = $("#newPW1").val();
	var newPW2 = $("#newPW2").val();
    if (newPW1 == "" || newPW1 == null || newPW2 == "" || newPW2 == null) {
		showAlert("密码不能为空");
		return;
	}

	if (newPW1 != newPW2) {
		showAlert("两次输入的密码不一致！");
		return;
	}
    forgetAjax(phone,newPW1,valiCode)
}

//忘记密码修改密码
function forgetAjax(phone,newPW1,valiCode) {
    var newPW1 = $("#newPW1").val();
	hideloading();
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "retRichPwd",
		data: {
			"loginName": phone,
			"password": newPW1,
			"checknum": valiCode
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				window.location.href = "forget_right.html";
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
