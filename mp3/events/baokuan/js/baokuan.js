/**
 * Created by dell on 2016/11/10.
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
        buyNewStep1("519712", "交银阿尔法");
    })
    $(".btntwo").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("202019", "南方策略优化");
    })
    $(".btnthree").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("000978", "景顺长城量化精选");
    })
    $(".detail1").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=519712.OF&fundname=交银阿尔法";
    })
    $(".detail2").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=202019.OF&fundname=南方策略优化";
    })
    $(".detail3").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=000978.OF&fundname=景顺长城量化精选";
    })
    function goMoniLogin(){
        window.location.href = mainUrl+"mp/login.html";
    }
    function goisopen(){
        window.location.href = mainUrl+"mp/account/account.html";
    }
})