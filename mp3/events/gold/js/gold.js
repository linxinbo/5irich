/**
 * Created by dell on 2016/11/10.
 */
$(document).ready(function(){
    var username = $.cookie("username");
    var isopen = $.cookie("isopen");
    $("#buy1").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("001302", "前海开源金银珠宝A");
    });
    $("#buy2").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("000216", "华安易富黄金ETF联接A");
    });
    $("#buy3").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("000307", "易方达黄金ETF联接A");
    });
    $("#choice1").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=001302.OF&fundname=前海开源金银珠宝A";
    })
    $("#choice2").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=000216.OF&fundname=华安易富黄金ETF联接A";
    })
    $("#choice3").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=000307.OF&fundname=易方达黄金ETF联接A";
    })
    function goMoniLogin(){
        window.location.href = mainUrl+"mp/login.html";
    }
    function goisopen(){
        window.location.href = mainUrl+"mp/account/account.html";
    }
})