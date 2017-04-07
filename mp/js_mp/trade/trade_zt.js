/**
 * Created by d on 2016/6/11.
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
    getAccount();
    //全部加载
    getHistoryDeal(one_mon, "");
//	getHistoryDeal(one_mon, 22);
//	getHistoryDeal(one_mon, 24);
//	getHistoryDeal(one_mon, 36);
    var isopen = $.cookie("isopen");
    var name = $.cookie("username");
    if (name == "" || name == null|| name == "null"  || name == undefined) {
        setErrorMsg(1001);
    } else {
        //var center_username="尊敬的 "+name+" 用户您好!"
        $("#trade_name span").append(name);
    }
    //大分类跳转
    $(".change_halfway").click(function () {
        window.location.href = "trade_zt.html";
    });

    $(".change_apply").click(function () {
        window.location.href = "trade.html";
    });
    $(".change_confirm").click(function () {
        window.location.href = "trade_qr.html";
    });
    $(".change_revoke").click(function () {
        window.location.href = "trade_cd.html";
    });
    //切换大分类
    $("#class_qiehuan li").click(function () {
        $(this).addClass("liactive").siblings().removeClass("liactive");
    });
});
function getAccount() {
    console.log("开始刷新公墓基金");
    showLoading();
    $.ajax({
        url: mainUrl + "userAsset",
        data: "",
        dataType: "JSON",
        success: function (data) {
            hideloading();
            console.log(data);
            if (data.retcode == 0000) {
                $(".account_data ul").html("");
                //持仓总成本
                var costmoney = data.data.totalfundmarketvalue;
                //总收益
                var income = data.data.totalfundbalance;
                //总收益率
                var incomePercent = data.data.totalfundprofit;
                //资产占比；
                /*					$(".row-left>span").html(costmoney + "元");
                 $(".row-center>span").html(income + "元");	*/
                $("#costmoney").html(formatCurrency(costmoney));
                $("#income").html(formatCurrency(income));
                $("#incomePercent").html(incomePercent + "%");
                //公墓占比
                if(income>0){
                    $("#income").css("color","#eb1e32");
                    $("#incomePercent").css("color","#eb1e32");
                }else if(income<0){
                    $("#income").css("color","#33ff33");
                    $("#incomePercent").css("color","#33ff33");
                }else{
                    $("#income").css("color","#ffffff");
                    $("#incomePercent").css("color","#92c73b");
                };
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        }
    })
};
//申请查询
function getHistoryDeal(begindate, businesscode) {
    hideloading();
    showLoading();
    $("#trade_list").empty();
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
                    if(fundname.length>10){
                        var fundname1=fundname.substring(0,10)+"...";
                    }else{
                        var fundname1=fundname;
                    }
                    //var applydata = '<li>' + '<div class="table_header"><span class="deal_code" data-id="'+fundid+'">' + fundid + '</span><span class="deal_name" data-name="'+fundname+'">' + fundname + '</span></div>' + '<table class="table_data">' + '<tr><td class="td_1">业务名称</td><td class="td_2">' + name + '</td><td class="td_3">申请金额</td><td class="td_4">' + n.applicationamount + '</td></tr>' + '<tr><td class="td_1">申请日期</td><td class="td_2">' + n.operdate + '</td><td class="td_3">申请时间</td><td class="td_4">' + n.opertime + '</td></tr>' + '<tr><td class="td_1">支付状态</td><td class="td_2 td_next">' + payname + '</tds><td class="td_3">处理状态</td><td class="td_4">' + statsname + '</td></tr>' + '</table>' + '</li>';
                    var applydata = "<ul class='jijinlist_table jy_table mtopd'>";
                    applydata += "<li class='bottomline'><h2 class='jijinlist_table_t' data-id='"+n.fundcode+"' data-name='"+fundname+"'><em>"+fundname1+"</em><i>（"+fundid+"）</i></h2><a href='#' class='jy_riqi'><span class='t_span'>申请日期："+n.operdate+"</span></a></li>";
                    applydata += "<div class='jijinlist_table_content jy_table_content'>";
                    applydata += "<ul class='jj_store3'><li ><a class='rightline'><span class='datitle font_heise'>"+n.applicationvol+"</span><b class='xiaotitle font_huise mtopd'>申请份额</b></a></li>";
                    applydata += "<li><a class='rightline'><span class='datitle font_hongse'>"+formatCurrency(n.applicationamount)+"</span><b class='xiaotitle font_huise mtopd'>申请金额</b></a></li>";
                    applydata += "<li class='col-xs-4 col-sm-4 textcenter'><a><button class='btn_home1 jy_btn_lanse'>"+statsname+"</button><span class='xxiaotitle font_huise jy_span_mtop'>处理状态</span><b class='xxiaotitle font_huise'>时间："+n.opertime+"</b></a></li>";
                    applydata += "</ul></div></ul>";
                    $("#trade_list").append(applydata);
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
    $(".jijinlist_table_t").click(function () {
        var fundid = $(this).attr("data-id");
        var fundname = $(this).attr("data-name");
        window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
        console.log("t");
    });
}
