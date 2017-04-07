$(function () {
		var sn = $.cookie("sn");
		var name = $.cookie("username");
		$("#cardNo").val(sn);
//		$("#cardNo").val(sn);
	    searchBank();
		$(".bank_sel").change(function () {
			var val = $(this).val();
			//$(this).prev("span").html(val);
			var html = $(this).find("option:selected").html();
			console.log(html)
			console.log($(this));
			transactionaccountid = $(this).find("option:selected").attr("data_a");

			moneyaccount = $(this).find("option:selected").attr("data_b");
			console.log(moneyaccount);
			branchcode = $(this).find("option:selected").attr("data_c");
			$(this).parent().children("span").html(html);
		});

	})
	//刷新银行列表
function searchBank() {
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "unAuthenticateChannelId",
		data: {},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				//刷新列表
				$(data.data).each(function (i, n) {
					var html = '<option data_a="KQ01A00000507" data_b="492" data_c="315" value="' + n.code + '">' + n.name + '</option>';
					$("select.bank_sel").append(html);
				});

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	})
}
//发送绑卡验证码
function sendSms() {
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "bmsgsend",
		data: {
			"bgsend.mobiletelno": number,
			"bgsend.certificateno": number,
			"bgsend.depositacctname": number,
			"bgsend.depositacct": number,
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {


			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	})
}
