/**
 * Created by CJQF on 2016/8/18.
 */
var username = $.cookie("username");
console.log(username);
var newurl = document.referrer;
console.log(newurl);
var isopen = $.cookie("isopen");
$(document).ready(function () {
    if (username == "" || username == null || username == undefined	|| username == "null") {
        $("#mn_no_login").show();
        $(".moni_after").hide();
        moni_CJ();
    }else{
        $.ajax({
            type: "GET",
            url: mainUrl + "getUserInfo",
            data: "",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                if (response.retcode == "1") {
                    $("#mn_no_login").hide();
                    $(".moni_after").show();
                    moni_group_show();



                }else if(response.retcode == "2"){
                    showAlert("只有新注册用户可以参加活动！",goMoniIndex);

                }else{
                    $("#mn_no_login").show();
                    $(".moni_after").hide();
                    moni_CJ();


                }

            },
            error: function (response1) {
                showAlert("服务器错误！");
            }
        });

    }


});

function moni_CJ(){
    $("#monitiyan").click(function(){
        if (username == "" || username == null || username == undefined	|| username == "null") {
            showAlert("您没有登录！",goMoniLogin);
        }else{
            if (isopen != 1) {
                //			        showAlert("暂缓开通，敬请期待！");
                showAlert("您还未开户！，请开户后进行相关操作",goisopen);
            } else {
                /*window.location.href = "../sigin/change_deal.html";*/

            $.ajax({
                type: "GET",
                url: mainUrl + "joinActivity",
                data: "",
                dataType: "JSON",
                success: function (data) {
                    console.log(data);
                    if (data.retcode == "0000") {
                        showAlert("参加体验成功！",gomonihome);

                    }else{
                        setErrorMsg(data.retcode, data.retmsg);
                    }
                },
                error: function (data) {
                    showAlert("服务器错误！");
                }
            });

                $("#mn_no_login").hide();
                $(".moni_after").show();
                moni_group_show();
            }



        }

    });


};

function moni_group_show(){
    $.ajax({
        type: "GET",
        url: mainUrl + "getUserInfo",
        data: "",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            var activity_todayincome=data.data.activity_todayincome;
            var activity_totalincome=data.data.activity_totalincome;
            var activity_nowvalue=data.data.activity_nowvalue;
            $(".ztsy").html("");
            $(".ljsy").html("");
            $(".zcb").html("");
            $(".ztsy").append(activity_todayincome+"元");
            $(".ljsy").append(activity_totalincome+"元");
            $(".zcb").append(activity_nowvalue+"元");
        },
        error: function (data) {
            showAlert("服务器错误！");
        }
    });


};

function goMoniLogin(){
    window.location.href = mainUrl+"mp/login.html";
}

function goMoniIndex(){
    window.location.href = mainUrl+"mp/home.html";
}

function goisopen(){
    window.location.href = mainUrl+"mp/account/account.html";
}

function gomonihome(){
    window.location.href = mainUrl+"mp/events/moni/moni_home.html";
}