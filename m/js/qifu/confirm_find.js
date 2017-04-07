var one_mon = new Date().getTime() - 30 * 24 * 3600 * 1000;
var thr_mon = new Date().getTime() - 90 * 24 * 3600 * 1000;
var six_mon = new Date().getTime() - 270 * 24 * 3600 * 1000;
var one_year = new Date().getTime() - 365 * 24 * 3600 * 1000;
var thr_year = new Date().getTime() - 3 * 365 * 24 * 3600 * 1000;
var businesscode = "";

thr_year = new Date(thr_year).Format("yyyyMMdd");
one_mon = new Date(one_mon).Format("yyyyMMdd");
thr_mon = new Date(thr_mon).Format("yyyyMMdd");
six_mon = new Date(six_mon).Format("yyyyMMdd");
one_year = new Date(one_year).Format("yyyyMMdd");

var date = new Date().Format("yyyyMMdd");

$(function () {
    //全部查询
	getConfirmDeal(one_mon, "");
//	getConfirmDeal(one_mon, 22);
//	getConfirmDeal(one_mon, 24);
//	getConfirmDeal(one_mon, 36);
	$(".time_right .one_mon").click(function () {
		$(".deal_data ul").html("");
		getConfirmDeal(one_mon, businesscode);
	});
	$(".time_right .thr_mon").click(function () {
		$(".deal_data ul").html("");
		getConfirmDeal(thr_mon, businesscode);
	});
	$(".time_right .six_mon").click(function () {
		$(".deal_data ul").html("");
		getConfirmDeal(six_mon, businesscode);
	});
	$(".time_right .one_year").click(function () {
		$(".deal_data ul").html("");
		getConfirmDeal(one_year, businesscode);
	});
	$(".time_right .thr_year").click(function () {
		$(".deal_data ul").html("");
		getConfirmDeal(thr_year, businesscode);
	});
	$(".time_right input").click(function () {
		$(".time_right input").removeClass("select_3");
		$(this).addClass("select_3");
	});

	$(".change_halfway").click(function () {
	    $(".revoke_data ul").html("");
	    window.location.href = "halfway-find.html";
	  });

  $(".change_apply").click(function () {
		$(".deal_data ul").html("");
		window.location.href = "apply-find.html";
	});
  $(".change_confirm").click(function () {
    $(".apply_data ul").html("");
    window.location.href = "confirm-find.html";
  });
  $(".change_revoke").click(function () {
    $(".revoke_data ul").html("");
    window.location.href = "revoke-find.html";
  });

    //选择查询种类 默认时间选择1个月
	$(".option ul li").click(function () {
		$(".option ul li.select_2").next().css("border-bottom", "2px solid #1b75da;");
		$(".option ul li").removeClass("select_2");
		$(this).addClass("select_2");
        $(".time_right input").removeClass("select_3");
        $(".time_right input:nth-child(1)").addClass("select_3");
		var flag = $(this).index();
		if (flag == 0) {
			$(".deal_data ul").html("");
			businesscode = "";
			getConfirmDeal(one_mon, "");
//			getConfirmDeal(one_mon, 22);
//			getConfirmDeal(one_mon, 24);
//			getConfirmDeal(one_mon, 36);
		} else if (flag == 1) {
			$(".deal_data ul").html("");
			businesscode = 20
			getConfirmDeal(one_mon, 20);
		} else if (flag == 2) {
			$(".deal_data ul").html("");
			businesscode = 22;
			getConfirmDeal(one_mon, 22);
		} else if (flag == 3) {
			$(".deal_data ul").html("");
			businesscode = 24
			getConfirmDeal(one_mon, 24);
		} else if (flag == 4) {
			$(".deal_data ul").html("");
			businesscode = 36;
			getConfirmDeal(one_mon, 36);
		}
	});
});

//确认查询
function getConfirmDeal(begindate, businesscode) {
	hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "historyTrading",
		data: {
			"begindate": begindate,
			"enddate": date,
			"businesscode": businesscode,
			"page": "1",
			"rows": "20"
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == "0000") {
				$(data.data.list).each(function (i, m) {
					var name = getBussessName(m.businesscode);
                    var fundid = m.fundcode.substring(0, 6);
                    var fundname = m.fundname;
					var dealdata = '<li>' + '<div class="table_header"><span class="deal_code" data-id="'+fundid+'">' + fundid + '</span><span class="deal_name" data-name="'+fundname+'">' + fundname + '</span></div>' + '<table class="table_data">' + '<tr><td class="td_1">业务名称</td><td class="td_2">' + name + '</td><td class="td_3">成交净值</td><td class="td_4">' + m.applicationvol + '</td></tr>' + '<tr><td class="td_1">日期</td><td class="td_2">' + m.transactioncfmdate + '</td><td class="td_3">确认份额</td><td class="td_4">' + m.confirmedvol + '</td></tr>' + '<tr><td class="td_1">手续费(元)</td><td class="td_2">' + m.charge + '</tds><td class="td_3">确认金额</td><td class="td_4">' + m.confirmedamount + '</td></tr>' + '</table>' + '</li>';
					$(".deal_data ul").append(dealdata);
                    confirmDetail();
				})
			} else {
				setErrorMsg(data.retcode, data.retmsg); //错误提示框
			};
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误");
		}
	});
};

function confirmDetail(){
    $(".deal_data ul li").click(function () {
        var fundid = $(this).find(".deal_code").attr("data-id");
        var fundname = $(this).find(".deal_name").attr("data-name");
        window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
        console.log("s");
    })
}