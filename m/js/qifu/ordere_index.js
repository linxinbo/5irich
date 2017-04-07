$(document).ready(function () {
	//预约首页
//	$("header .back").click(function () {
//		window.history.go(-1);
//	});
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

	//点击预约

	$(".order").on("click", function () {
		appointment();
	})

	/*** 银行卡4位分隔 ***/
	//	$('#bankNo').keyup(function () {
	//		var value = $(this).val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
	//		$(this).val(value)
	//	})
});


function appointment() {
	var openName = $("#name").val();
	var cardNo = $("#cardNo").val();
	var phone_num = $("#phone_num").val();
	var sum_money = $("#sum_money").val();

	var str1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	var clickflag = $(".ysy_agree dt").hasClass("def");
	var str1 = /^1[3-8]{1}\d{9}$/;
	var success = false;
	var str2 = /^\s+$/g
	if (openName == "" || openName == null || str2.test(openName)) {
		showAlert("姓名不能为空或空格");
		return false;
	}

	//判断身份证号
	if (cardNo == "" || cardNo == null) {
		showAlert("身份证号不能为空");
		return false;
	} else {
		if (!checkIdNum(cardNo)) {
			showAlert("身份格式错误")
			return false;
		};

	}

	if (phone_num == "") {
		showAlert("手机号不能为空！");
		return false;
	}

	if (!str1.test(phone_num)) {
		showAlert("手机号格式错误！"); //"手机号格式错误！"
		return false;
	}

//金额
	if(sum_money==""||sum_money==null||sum_money<10000){
		showAlert("输入金额不能低于1万元");
		return  false;
	}else if(isNaN(sum_money)){
		
         showAlert("请输入正确的金额！")		
		 return  false;
	}

	//同意协议
	if (!clickflag) {
		showAlert("请阅读相关协议");
		return false;
	}	
	savaInfo(openName,cardNo,phone_num,sum_money);
}
