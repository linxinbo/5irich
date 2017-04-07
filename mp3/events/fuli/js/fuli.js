/**
 * Created by dell on 2016/10/11.
 */
$(document).ready(function(){
    var username = $.cookie("username");
    var isopen = $.cookie("isopen");

    $("#btn").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("482002", "工银瑞信货币基金");
    });
    $("#btn1").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyNewStep1("482002", "工银瑞信货币基金");
    });
    $("#btn2").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        buyStep1("000024", "大摩双利增强A");
    });
    $(".detail").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=482002.OF&fundname=工银瑞信货币";
    });
    $(".detail1").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=482002.OF&fundname=工银瑞信货币";
    });
    $(".detail2").click(function(){
        window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=000024.OF&fundname=大摩双利增强A";
    });
    function goMoniLogin(){
        window.location.href = mainUrl+"mp/login.html";
    }
    function goisopen(){
        window.location.href = mainUrl+"mp/account/account.html";
    }

})