//登陆验证
var token;
$(document).ready(function () {
	var data = new Date().getTime();
	console.log(data);
	var loginaccout = $.cookie("loginaccount");
	console.log(loginaccout);
	if (loginaccout == "" || loginaccout == null || loginaccout == undefined||loginaccout == "null"){
		$("#cardNo").val("");
	}else{
	    $("#cardNo").val(loginaccout);
	}
	
	$(".reshpic").attr("src",mainUrl+"IdentCodeGenerateAction");
	
	showLoading();
	//	获取token
	$.ajax({
		type: 'post',
		url: mainUrl + 'TokenGenerateAction',
		data: {
			time: data
		},
		dataType: 'json',
		async: false,
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
				token = data.data.token;

			} else if (data.retcode == 1005) {
				alert("密码格式错误，为6-16位数字、字母、字符");
			} else if (data.retcode == 1006) {
				alert("手机或邮箱已存在");
			} else if (data.retcode == 1009) {
				alert("登录名不存在或者密码错误！");
			}
		}
	});
	
	$(".button_ac").unbind("click").click(function(){
		login();
	})
});

function login() {
	console.log("come")
	var phone = $("#cardNo").val();
	var valiCode = $("#valiCode").val();
	var password = $("#tradePW").val();
	var openId=$("#openId").val();
	//	$.cookie("username", "ss");
	/*手机号或邮箱格式验证*/
	/*var str=/^\w+@[0-9A-z]{2,6}\(.[a-z]{2,6}){1,4}$/;*/
	var str1 = /^1[3-8]{1}\d{9}$/;
	var success = false;
	if (phone == "") {
		showAlert("手机不能为空！");
		success = false;
		return false;
	}

	if (!str1.test(phone)) {
		showAlert("手机号格式错误！"); //"手机号格式错误！"
		success = false;
		return false;
	}

	if (password == "" || password == null) {
		showAlert("密码不能为空！");
		success = false;
		return false;
	}
	if (password.length < 6 || password.lengtn > 16) {
		showAlert("密码必须为6-16位长度");
		success = false;
		return false;
	}
	if (valiCode.length == '') {
		showAlert("验证码不能为空");
		success = false;
		return;
	} else if (valiCode.length < 4) {
		showAlert("验证码格式错误");
		success = false;
		return;
	} else {
		success = true;
	}
	if (token == "" || token == null) {
		success = false;
	}

	if (success) {
		showLoading();
		console.log("come")
		$.ajax({
			type: 'post',
			url: mainUrl + 'LoginWebAction',
			data: {
				loginName: phone,
				password: password,
				loginType: '1',
				token: token,
				rdText: valiCode,
				webChatId:openId
			},
			dataType: 'json',
			success: function (data) {
				hideloading();
				console.log(data.retcode);
				if (data.retcode == 0000) {
					var username = data.data.name;
					console.log(username)
					var loginName = data.data.loginName;
					var date = new Date();
					var sn = data.data.sn;
					date.setTime(date.getTime() + (30 * 60 * 1000));
					if (data.data.isopen == 1) {
						$.cookie("username", username, {
							path: '/',
							expires: date
						});
						$.cookie("isopen", 1, {
							path: '/',
							expires: date
						});
						$.cookie("sn", sn, {
							path: '/',
							expires: date
						});
						console.log($.cookie("username"));
						//						window.location.href = "sigin/login-right.html?isopen=" + data.data.isopen + "";
						var newurl = document.referrer;
						console.log(newurl);
						if (newurl == "" || newurl == null) {
							window.location.href = "sigin/login-right.html?isopen=" + data.data.isopen + "";
						} else{
							if (isLastUrl("change_right.html") || isLastUrl("sigin-right.html") || isLastUrl("sigin-right-open.html") || isLastUrl("account_right.html") || isLastUrl("forget_right.html")) {
								window.location.href = "home.html";
							}else if(isLastUrl("k_books_rsg.html") || isLastUrl("k_books_home.html")){
//								window.history.go(-1);
								window.location.href=document.referrer;
							}else{
								window.location.href=document.referrer;
							}
							//                         window.history.go(-1);/*+ data.data.isopen + "";*/

						} 
					}else {
							$.cookie("username", loginName, {
								path: '/',
								expires: date
							});
							$.cookie("isopen", 0, {
								path: '/',
								expires: date
							});							
							var newurl = document.referrer;
							console.log(newurl);
							console.log($.cookie("username"));
							if(isLastUrl("k_books_rsg.html") || isLastUrl("k_books_home.html")){
								window.location.href=document.referrer;
							}
							else{
								window.location.href = "sigin/login-right-open.html?isopen=" + data.data.isopen + "";
							}
						}
									
				} else {
					setErrorMsg(data.retcode, data.retmsg);
				}
			},
			error: function (data) {
				hideloading();
				alert("服务器错误！");
			}
		})

	}

}

//---------------------------设置cookie----------------------
function setCookie() {
	var cookieValA;
	var cookieValB;
	$.cookie("cookieNameA", cookieValA, {
		expires: 7
	});
	$.cookie("cookieNameB", cookieValB, {
		expires: 7
	});
	var getCookieValA = $.cookie("cookieNameA");
	var getCookieValB = $.cookie("cookieNameB");
}
