/**
 * Created by dell on 2016/4/26.
 */
var one_mon = new Date().getTime() - 30 * 24 * 3600 * 1000;
var thr_mon = new Date().getTime() - 90 * 24 * 3600 * 1000;
var six_mon = new Date().getTime() - 270 * 24 * 3600 * 1000;
var one_year = new Date().getTime() - 365 * 24 * 3600 * 1000;
var thr_year = new Date().getTime() - 3 * 365 * 24 * 3600 * 1000;
var businesscode = "";

one_mon = new Date(one_mon).Format("yyyyMMdd");
thr_mon = new Date(thr_mon).Format("yyyyMMdd");
six_mon = new Date(six_mon).Format("yyyyMMdd");
one_year = new Date(one_year).Format("yyyyMMdd");
thr_year = new Date(thr_year).Format("yyyyMMdd");

var date = new Date().Format("yyyyMMdd");
$(function () {
  //全部加载
  getHistoryDeal(one_mon, "");
//	getHistoryDeal(one_mon, 22);
//	getHistoryDeal(one_mon, 24);
//	getHistoryDeal(one_mon, 36);
  $(".time_left .one_mon").click(function () {
    $(".apply_data ul").html("");
    getHistoryDeal(one_mon, businesscode);
  });
  $(".time_left .thr_mon").click(function () {
    $(".apply_data ul").html("");
    getHistoryDeal(thr_mon, businesscode);
  });
  $(".time_left .six_mon").click(function () {
    $(".apply_data ul").html("");
    getHistoryDeal(six_mon, businesscode);
  });
  $(".time_left .one_year").click(function () {
    $(".apply_data ul").html("");
    getHistoryDeal(one_year, businesscode);
  });
  $(".time_left .thr_year").click(function () {
    $(".apply_data ul").html("");
    getHistoryDeal(thr_year, businesscode);
  });
  $(".time_left input").click(function () {
    $(".time_left input").removeClass("select_3");
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
    $(".time_left input").removeClass("select_3");
    $(".time_left input:nth-child(1)").addClass("select_3");
    var flag = $(this).index();
    if (flag == 0) {
      $(".apply_data ul").html("");
      businesscode = "";
      getHistoryDeal(one_mon, "");
//			getHistoryDeal(one_mon, 22);
//			getHistoryDeal(one_mon, 24);
//			getHistoryDeal(one_mon, 36);
    } else if (flag == 1) {
      $(".apply_data ul").html("");
      businesscode = 20
      getHistoryDeal(one_mon, 20);
    } else if (flag == 2) {
      $(".apply_data ul").html("");
      businesscode = 22;
      getHistoryDeal(one_mon, 22);
    } else if (flag == 3) {
      $(".apply_data ul").html("");
      businesscode = 24
      getHistoryDeal(one_mon, 24);
    } else if (flag == 4) {
      $(".apply_data ul").html("");
      businesscode = 36;
      getHistoryDeal(one_mon, 36);
    }
  });
});

//申请查询
function getHistoryDeal(begindate, businesscode) {
  hideloading();
  showLoading();
  $.ajax({
    url: mainUrl + "tradingOnthewayList",
    data: {
      begindate: begindate,
      enddate: date,
      businesscode: businesscode,
      page: "1",
      rows: "20"
    },
    dataType: "JSON",
    success: function (data) {
      hideloading();
      if (data.retcode == "0000") {

        $(data.data.list).each(function (i, n) {
          var name = getBussessName(n.businesscode);
          var payname = getPayName(n.paystatus);
          var statsname = getstatsName(n.status);
          //var fundid = n.fundcode.substring(0, 6);
          var fundid = n.fundcode;
          var fundname = n.fundname;
          var applydata = '<li>' + '<div class="table_header"><span class="deal_code" data-id="'+fundid+'">' + fundid + '</span><span class="deal_name" data-name="'+fundname+'">' + fundname + '</span></div>' + '<table class="table_data">' + '<tr><td class="td_1">业务名称</td><td class="td_2">' + name + '</td><td class="td_3">申请金额</td><td class="td_4">' + n.applicationamount + '</td></tr>' + '<tr><td class="td_1">申请日期</td><td class="td_2">' + n.operdate + '</td><td class="td_3">申请时间</td><td class="td_4">' + n.opertime + '</td></tr>' + '<tr><td class="td_1">支付状态</td><td class="td_2 td_next">' + payname + '</tds><td class="td_3">处理状态</td><td class="td_4">' + statsname + '</td></tr>' + '</table>' + '</li>';
          $(".apply_data ul").append(applydata);
          applyDetail();
        });
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

function applyDetail(){
  $(".apply_data ul li").click(function () {
    var fundid = $(this).find(".deal_code").attr("data-id");
    var fundname = $(this).find(".deal_name").attr("data-name");
    window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
    console.log("s");
  });
}
