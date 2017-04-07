$(document).ready(function () {

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
		var fundgroupname = args.fundgroupname;
		var fundgroupcode = args.fundgroupcode;
	    var groupFundBuyId = args.groupFundBuyId;
		$(".fill_arg1 span").html(fundgroupname);
		$(".fill_arg1").append("(" + fundgroupcode + ")");
		var backflag = true;


		$("#drawBtn").on("click", function () {
			var pw = $(".pass_trade").val();
			if (pw == "" || pw == null) {
				showAlert("交易密码不能为空！");
				return false;
			}
			if(groupFundBuyId==""||groupFundBuyId==null){
				showAlert("参数错误！");
				return false;
			}
			backGroupStep2(groupFundBuyId,pw);
		});

	})
	//赎回第二步
function backGroupStep2(groupFundBuyId,pw) {
	var args = new getArgs();
	var fundgroupname = args.fundgroupname;
	var fundgroupcode = args.fundgroupcode;
	console.log("赎回第二步");
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "groupRedemptions",
		data: {
            "groupFundBuyId": groupFundBuyId,
			"password": pw
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				window.location.href = "back_group_right.html?fundgroupname=" + fundgroupname + "&fundgroupcode=" + fundgroupcode;
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
