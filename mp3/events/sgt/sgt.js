/**
 * Created by dell on 2016/12/2.
 */
$(document).ready(function(){
    var username = $.cookie("username");
    var isopen = $.cookie("isopen");
    $(".btnone").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("164705", "汇添富恒生指数");
    })
    $(".btntwo").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("100061", "富国中国中小盘");
    })
    $(".btnthree").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("000979", "景顺长城沪港深精选");
    })
    $(".detail1").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=164705.SZ&fundname=汇添富恒生指数";
    })
    $(".detail2").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=100061.OF&fundname=富国中国中小盘";
    })
    $(".detail3").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=000979.OF&fundname=景顺长城沪港深精选";
    })
    function goMoniLogin(){
        window.location.href = mainUrl+"mp/login.html";
    }
    function goisopen(){
        window.location.href = mainUrl+"mp/account/account.html";
    }
   $(".ckdetail").click(function(){
       $(".tishi").css({display:"block"});
   });
    $(".tishi img").click(function(){
        $(".tishi").css({display:"none"});
    })
})