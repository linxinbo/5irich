/**
 * Created by linxi on 2016/12/16.
 */
$(function() {
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var isweixin = $.cookie("isweixin");
    var imgurl = $.cookie("imgurl");
    if (username == "" || username == null || username == undefined || username == "null") {
        showAlert("您没有登录！",loginStart);
        return false;
    } else if (isopen == '0' || isopen == 0) {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);
        return false;
    } else {
        //后台判断用户是否登录的接口
        $.ajax({
            url: mainUrl + "getLoginUserInfoForRequest",
            data: "",
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                console.log(data);
                if (data.data.status){
                    //已登录增加操作
                    var mydata=data.data.data;
                    var username=mydata.name;
                    console.log(username);
                    var tel=mydata.tel;
                    var sn=mydata.sn;
                    var email=mydata.email;
                    var create_time=mydata.create_time;
                    var create_time1=create_time.split("T");
                    var isopen=mydata.isopen;
                    var lastlogin=mydata.lastlogin;
                    var lastlogin1=lastlogin.split("T");
                    $(".name").html(username);
                    $(".tel").html(plusXing(tel,3,4));
                    $(".email").html(email);
                    $(".sn").html(plusXing(sn,6,4));
                    $(".create_time").html(create_time1[0]+" "+create_time1[1]);
                    $(".isopen").html(openwz(isopen));
                    $(".lastlogin").html(lastlogin1[0]+" "+lastlogin1[1]);
                }else{
                    showAlert("您没有登录！",loginStart);
                    //showAlert(data.data.msg, gologin);

                }
            }
        });



    }
});


//开户状态
function openwz(val){
    if(val==0){
        return "未开户"
    }else{
        return "已开户"
    }
}