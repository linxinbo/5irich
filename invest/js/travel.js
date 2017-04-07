/**
 * Created by linxi on 2017/3/23.
 */
$(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
        //引导用户登录开户
    if(username == "" || username == null || username == undefined|| username == "null") {
        window.location.href = "login.html";
    }else if(isopen != 1) {
        window.location.href = "account.html";
    }else{
        $(".dest_all a").click(function(){
            $(this).parent().removeClass('point');
            $(this).parent().siblings().removeClass('select').end().addClass('select');
            var destName=$(this).attr('data-name');
            var destMunber=$(this).attr('data-munber');
            setTimeout(function(){
                window.location.href = "travel_step_1.html?destName=" + destName + "&destMunber=" + destMunber;
            },600);

        });

    }



});