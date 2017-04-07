/**
 * Created by d on 2016/6/11.
 */
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
    getAccount();
    //全部查询
    getConfirmDeal(one_mon, "");
//	getConfirmDeal(one_mon, 22);
//	getConfirmDeal(one_mon, 24);
//	getConfirmDeal(one_mon, 36);
    var isopen = $.cookie("isopen");
    var name = $.cookie("username");
    if (name == "" || name == null|| name == "null"  || name == undefined) {
        setErrorMsg(1001);
    } else {
        //var center_username="尊敬的 "+name+" 用户您好!"
        $("#trade_name span").append(name);
    }
    //切换时间显示
    $("#trade_time").change(function(){
        var trade_time1=$(this).children('option:selected').val();
        console.log(trade_time1);
        if(trade_time1=="1"||trade_time1==1){
            $(".apply_data ul").html("");
            getConfirmDeal(one_mon, businesscode);
        }else if(trade_time1=="2"||trade_time1==2){
            $(".apply_data ul").html("");
            getConfirmDeal(thr_mon, businesscode);
        }else if(trade_time1=="3"||trade_time1==3) {
            $(".apply_data ul").html("");
            getConfirmDeal(six_mon, businesscode);
        }else if(trade_time1=="4"||trade_time1==4){
            $(".apply_data ul").html("");
            getConfirmDeal(one_year, businesscode);
        }else if(trade_time1=="5"||trade_time1==5){
            $(".apply_data ul").html("");
            getConfirmDeal(thr_year, businesscode);
        }

    });

    //切换小分类
    $("#trade_class").change(function(){
        var trade_class1=$(this).children('option:selected').val();
        console.log(trade_class1);
        if(trade_class1=="1"||trade_class1==1){
            $(".apply_data ul").html("");
            businesscode = "";
            getConfirmDeal(one_mon, "");
        }else if(trade_class1=="2"||trade_class1==2){
            $(".apply_data ul").html("");
            businesscode = 20;
            getConfirmDeal(one_mon, 20);
        }else if(trade_class1=="3"||trade_class1==3) {
            $(".apply_data ul").html("");
            businesscode = 22;
            getConfirmDeal(one_mon, 22);
        }else if(trade_class1=="4"||trade_class1==4){
            $(".apply_data ul").html("");
            businesscode = 24;
            getConfirmDeal(one_mon, 24);
        }else if(trade_class1=="5"||trade_class1==5){
            $(".apply_data ul").html("");
            businesscode = 36;
            getConfirmDeal(one_mon, 36);
        }

    });


    //大分类跳转
    $(".change_halfway").click(function () {
        $(".revoke_data ul").html("");
        window.location.href = "trade_zt.html";
    });

    $(".change_apply").click(function () {
        $(".deal_data ul").html("");
        window.location.href = "trade.html";
    });
    $(".change_confirm").click(function () {
        $(".apply_data ul").html("");
        window.location.href = "trade_qr.html";
    });
    $(".change_revoke").click(function () {
        $(".revoke_data ul").html("");
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
                }
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        }
    })
}
//确认查询
function getConfirmDeal(begindate, businesscode) {
    hideloading();
    showLoading();
    $("#trade_list").empty();
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
                    var applydata = "<ul class='jijinlist_table jy_table mtopd'>";
                    applydata += "<li class='bottomline'><h2 class='jijinlist_table_t' data-id='"+m.fundcode+"' data-name='"+fundname+"'><em>"+fundname+"</em><i>（"+fundid+"）</i></h2><a href='#' class='jy_riqi'><span class='t_span'>业务名称："+name+"</span></a></li>";
                    applydata += "<div class='jijinlist_table_content jy_table_content'>";
                    applydata += "<ul class='jj_store3'><li ><a class='rightline'><span class='datitle font_heise'>"+m.confirmedvol+"</span><b class='xiaotitle font_huise mtopd'>确认份额</b></a></li>";
                    applydata += "<li><a class='rightline'><span class='datitle font_hongse'>"+formatCurrency(m.confirmedamount)+"</span><b class='xiaotitle font_huise mtopd'>确认金额</b></a></li>";
                    applydata += "<li class='col-xs-4 col-sm-4 textcenter'><a><span class='trade_sxf'>"+m.charge+"</span><span class='xxiaotitle font_huise jy_span_mtop'>手续费</span><b class='xxiaotitle font_huise'>日期："+m.transactioncfmdate+"</b></a></li>";
                    applydata += "</ul></div></ul>";
                    $("#trade_list").append(applydata);
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
    $(".jijinlist_table_t").click(function () {
        var fundid = $(this).attr("data-id");
        var fundname = $(this).attr("data-name");
        window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
        console.log("t");
    });
};