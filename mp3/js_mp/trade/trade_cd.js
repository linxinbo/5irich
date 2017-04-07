/**
 * Created by d on 2016/6/11.
 */
$(function(){

    getAccount();

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

    //查询撤单列表；
    canclelist();

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
function canclelist() {
    showLoading();
    $("#trade_list").empty();
    $.ajax({
        type: "post",
        url: mainUrl + "cancellationList",
        data: {},
        dataType: "JSON",
        success: function (data) {
            hideloading();
            if (data.retcode == 0000) {
                $("#trade_list").html("");
                console.log(data.data);
                $(data.data).each(function(i,n){
                    var fundid= n.fundcode+"";
                    fundid=fundid.substring(0,6);
                    /*var  html = '<li><div class="table_header"><span class="revoke_code">'+fundid+'</span><span class="revoke_name">'+n.fundname+'</span><a class="revoke" data-id="'+n.appsheetserialno+'"><span>撤单</span></a></div>';
                    html+='<table class="table_data"><tr><td class="td_1">业务名称</td><td class="td_2">'+getBussessName(n.businesscode)
                        +'</td><td class="td_3">申请日期</td><td class="td_4">'+n.operdate+'</td></tr>';
                    html+=   '<tr><td class="td_1">下单时间</td><td class="td_2">'+n.opertime+'</td></tr></table></li>';*/
                    var applydata = "<ul class='jijinlist_table jy_table mtopd'>";
                    applydata += "<li class='bottomline'><h2 class='jijinlist_table_t' data-id='"+n.fundcode+"' data-name='"+n.fundname+"'><em>"+n.fundname+"</em><i>（"+fundid+"）</i></h2><a href='#' class='jy_riqi'><span class='t_span'>下单时间："+n.opertime+"</span></a></li>";
                    applydata += "<div class='jijinlist_table_content jy_table_content'>";
                    applydata += "<ul class='jj_store3'><li ><a class='rightline'><span class='datitle font_heise'>"+getBussessName(n.businesscode)+"</span><b class='xiaotitle font_huise mtopd'>业务名称</b></a></li>";
                    applydata += "<li><a class='rightline'><span class='datitle font_hongse'>"+n.operdate+"</span><b class='xiaotitle font_huise mtopd'>申请日期</b></a></li>";
                    applydata += "<li class='col-xs-4 col-sm-4 textcenter'><a><button id='trade_cd' class='btn_home1 jy_btn_lanse' data-id='"+n.appsheetserialno+"'>撤单</button><span class='xxiaotitle font_huise jy_span_mtop'>操作</span><b class='xxiaotitle font_huise'>下单时间："+n.opertime+"</b></a></li>";
                    applydata += "</ul></div></ul>";

                    $("#trade_list").append(applydata);
                    cancleDetail();
                    $("#trade_cd").unbind("click").click(function(e){
                        e.stopPropagation();
                        var id = $(this).attr("data-id");
                        showAlert("确认撤单吗？",goCancle(id));
//						goCancle(id)
                    });
                })

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
//去撤单；
function goCancle(number){
    return function(){
        showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "CancellationAction",
            data: {
                "fundsingl.appsheetserialno": number
            },
            dataType: "JSON",
            success: function (data) {
                hideloading();
                if (data.retcode == 0000) {
                    showAlert("撤单成功！",canclelist);
                    //刷新列表
                    //				canclelist();
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
}

function cancleDetail(){
    $(".jijinlist_table_t").click(function () {
        var fundid = $(this).attr("data-id");
        var fundname = $(this).attr("data-name");
        window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
        console.log("t");
    });
};
