/**
 * Created by linxi on 2017/3/23.
 */

$(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    $('.btn_next_travel_start').click(function(){
        //引导用户登录开户
        if(username == "" || username == null || username == undefined|| username == "null") {
            window.location.href = "login.html";
        }else if(isopen != 1) {
            window.location.href = "account.html";
        }else{
            window.location.href = "travel.html";
        };
    });




});