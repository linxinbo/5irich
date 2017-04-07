$(document).ready(function () {
	if (isUrl("account_index1.html")) { //开户首页
		$("header .back").click(function () {
			window.history.go(-1);
		});
		$("i.m").click(function () {
			$(".m_b").show();
		});
		$(".opaSelect").change(function () {
			var val = $(this).val();
			//$(this).prev("span").html(val);
			$(this).parent().children("span").html(val);
		});
		$(".ysy_agree dt").click(function () {
			if ($(this).hasClass("def")) {
				$(this).removeClass("def").addClass("sele");
			} else {
				$(this).removeClass("sele").addClass("def");
			}
		});
		$(".clearfix .clearfix input").focus(function () {
			$(this).parent().siblings("[data_rest='ID_rest']").show();
		});
		$(".clearfix .clearfix input").blur(function () {
			var val = $(this).val();
			if (val == "") {
				$(this).parent().siblings("[data_rest='ID_rest']").hide();
			}
		});
		$("[data_rest='ID_rest']").click(function () {
			$(this).siblings(".clearfix").find("input").val("");
			$(this).hide();
		});
	} else if (isUrl("account_survey.html")) { //问卷调查页
		$("ul .ysy_agree dt").click(function () {
			var prevUl = $(this).parents("ul");
			prevUl.find("dt.def2").removeClass("def2").addClass("sele2");
			$(this).removeClass("sele2").addClass("def2");
		});
		$("ul .ysy_agree dd").click(function () {
			var prevUl = $(this).parents("ul");
			prevUl.find("dt.def2").removeClass("def2").addClass("sele2");
			$(this).prev("dt").removeClass("sele2").addClass("def2");
		});

	} else if (isUrl("account_confirm1.html")) { //开户确认页
		$(".clearfix .clearfix input").focus(function () {
			$(this).parent().siblings("[data_rest='ID_rest']").show();

		});
		$(".clearfix .clearfix input").blur(function () {
			var val = $(this).val();
			if (val == "") {
				$(this).parent().siblings("[data_rest='ID_rest']").hide();
			}
		});
		$("[data_rest='ID_rest']").click(function () {
			$(this).siblings(".clearfix").find("input").val("");
			$(this).hide();
		});
		$(".ysy_agree dt").click(function () {
			if ($(this).hasClass("def")) {
				$(this).removeClass("def").addClass("sele");
			} else {
				$(this).removeClass("sele").addClass("def");
			}
		});

		$(".opaSelect").change(function () {
			var val = $(this).val();
			//$(this).prev("span").html(val);
			var html = $(this).find("option:selected").html();
			$(this).parent().children("span").html(html);
		});
	} else if (isUrl("user_login.html")) { //登录页
		$(".opaSelect").change(function () {
			var val = $(this).val();


			$(this).prev("span").html(val);
		});
	}
	/*** 银行卡4位分隔 ***/
//	$('#bankNo').keyup(function () {
//		var value = $(this).val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
//		$(this).val(value)
//	})
});

/*** 银行卡号4位分隔，执行函数，way 2 ***/
/*

*/

function isUrl(url) { //判断当前页是否为xxx.html
	var s = ".+" + url.replace(".", "\\.") + "(\\?|$)";
	var reg = new RegExp(s);
	if (reg.test(location.href)) {
		return true;
	} else {
		return false;
	}
}

function openStep1() {
	var openName = $("#name").val();
	var cardNo = $("#cardNo").val();
	var email = $("#email").val();
	var password1 = $("#password1").val();
	var password2 = $("#password2").val();
    var str1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	var clickflag =$(".ysy_agree dt").hasClass("def");
	
	if (!str1.test(password1)) {
		showAlert("密码格式错误，必须为6-16位数字、字母组合");
		return;
	}
     var str2 =/^\s+$/g;
	if (openName == "" || openName == null||str2.test(openName)) {
		showAlert("姓名不能为空或空格");
		return;
	}

	//判断身份证号
	if (cardNo == "" || cardNo == null) {
		showAlert("身份证号不能为空");
		return;
	} else {
		/*if (!checkIdNum(cardNo)) {
			showAlert("身份格式错误");
			return;
		};*/

	}

	//email
	if (email == "" || email == null) {
		showAlert("邮箱不能为空");
		return;
	} else {
		if (!valiEmail(email)) {
			showAlert("邮箱格式错误！");
			return;
		}

	}

	//密码

	if (password1 == "" || password1 == null || password2 == "" || password2 == null) {
		showAlert("密码不能为空");
		return;
	} else {
		if (password1 != password2) {
			showAlert("两次输入的密码不一致");
			return;
		}

	}
    //同意协议
	if(!clickflag){
		showAlert("请阅读相关协议");
		return;
	}
	window.location.href = "account_confirm1.html?openName=" + openName + "&cardNO=" + cardNo +  "&email=" + email + "&password=" + password1 + "";
}


