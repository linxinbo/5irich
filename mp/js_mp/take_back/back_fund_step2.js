$(document).ready(function () {
		//巨额处理标签；
		var optionflag = 0;
		$(".opaSelect").change(function () {
			var val = $(this).val();
			optionflag = val;
			var html = $(this).find("option:selected").html();
			//$(this).prev("span").html(val);
			$(this).parent().children("span").html(html);
		});
		//		$(".back_count").focus(function () {
		//			$(this).parents(".banks").children("i[data_rest=ID_rest]").show();
		//		});
		//		$(".back_count").blur(function () {
		//			if ($(this).val() == "") {
		//				$("i[data_rest=ID_rest]").hide();
		//			}
		//		});
		//		$("i[data_rest=ID_rest]").on("click", function () {
		//			$(".back_count").val("");
		//			$(this).hide();
		//		})

		$(".pass_trade").focus(function () {
			$("i[data_r=r]").show();
		});
		$(".pass_trade").blur(function () {
			if ($(this).val() == "") {
				$("i[data_r=r]").hide();
			}
		});
		$("i[data_r=r]").on("click", function () {
			$(".pass_trade").val("");
			$(this).hide();
		})
		var args = new getArgs();
		var fundname = args.fundname;
		var fundid = args.fundid;
		var balfund = args.balfund; //持有份额
		var availbal = args.availbal; //可用份额
		var per_min_24 = args.per_min_24; //可用份额
		$(".fill_arg1 span").html(fundname);
		$(".fill_arg1").append("(" + fundid + ")");
		$(".fill_arg2").html(balfund + "份");
		$(".fill_arg3").html(availbal + "份");
		var backflag = true;

		$(".backall>span").on("click", function () {
			if (backflag) {
				$(".back_count").val(availbal);
				backflag = false;
			} else {
				$(".back_count").val("");
				backflag = true;
			}
		});
		$(".back_count").attr("placeholder", "最少赎回份额" + per_min_24);
		$("#drawBtn").on("click", function () {
			var back_count = $(".back_count").val();
			var pw = $(".pass_trade").val();
			if (back_count == "" || back_count == null) {
				showAlert("赎回份额不能为空！");
				return false;
			}

			if (pw == "" || pw == null) {
				showAlert("交易密码不能为空！");
				return false;
			}
			backStep2(back_count, optionflag, pw);

		})

	})
	//赎回第二步
function backStep2(back_count, optionflag, pw) {
	var args = new getArgs();
	var fundname = args.fundname;
	var sharetype = args.sharetype;
	var tano = args.tano;
	var fundid = args.fundid;
	var balfund = args.balfund; //持有份额
	var availbal = args.availbal; //可用份额
	var hold_min = args.hold_min; //最低持有份额
	var transactionaccountid = args.transactionaccountid; //交易账号
	var branchcode = args.branchcode; //网点号
	var per_max_24 = args.per_max_24; //可赎回最高份额；
	var per_min_24 = args.per_min_24; //可赎回最低份额；
	console.log("赎回第二步");
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "RedemptionAction",
		data: {
            "fundName": fundname,
			"redemptions.transactionaccountid": transactionaccountid,
			"redemptions.branchcode": branchcode,
			"redemptions.tano": tano,
			"redemptions.fundcode": fundid,
			"redemptions.sharetype": sharetype,
			"redemptions.applicationvol": back_count,
			"redemptions.largeredemptionflag": optionflag,
			"redemptionBean.availbal": availbal,
			"redemptionBean.hold_min": hold_min,
			"redemptionBean.per_min_24": per_min_24,
			"redemptionBean.per_max_24": per_max_24,
			"redemptions.tpasswd": pw
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				window.location.href = "back_right.html?fundname=" + fundname + "&back_count=" + back_count;
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
