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
                //console.log(data);
                if (data.data.status){
                    //mybanklist();

                }else{
                    showAlert("您没有登录！",loginStart);
                    //showAlert(data.data.msg, gologin);

                }
            }
        });



    }
});