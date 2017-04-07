/**
 * Created by linxi on 2017/2/28.
 */
var username = $.cookie("username");
var newurl = document.referrer;
var isopen = $.cookie("isopen");
$(document).ready(function () {
    if (username == "" || username == null || username == undefined	|| username == "null") {
        showAlert("您没有登录！",gologin);
    }else{
        $(".username").html(username);
        $("#buyFund").on("click",function(){
            window.location.href="../../home.html";
            /*buyGroupStep1("CJ1001","创金积极组合1号");*/
        });
        $("#exchange").on("click",function(){
            window.location.href="index.html";
            /*buyGroupStep1("CJ1001","创金积极组合1号");*/
        });
    }
});