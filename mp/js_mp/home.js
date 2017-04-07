/**
 * Created by d on 2016/5/4.
 */
$(document).ready(function () {
    getUserInfo();
})

function getUserInfo() {
    var username = $.cookie("username");
    console.log(username);
    $(".hello_div span").append(username);
    if (username == "" || username == null||username=="null") {
        console.log("no-cookie")
        $(".footer ").hide();
        $(".footer1 ").show();
    } else {
        console.log("has-cookie")
        $(".footer").show();
        $(".footer1").hide();
    }

    $(".head_sreach").click(function(){
        window.location.href="search/search.html";
    });

    $(".ty_sreach_as").click(function(){
        window.location.href="../search/search.html";
    });

    $(".login_out ,.out").on("click", function () {
        showLoading();
        $.ajax({
            url: mainUrl + "logout",
            data: "",
            dataType: "JSON",
            success: function (data) {
                hideloading();
                console.log(data);
                if (data.retcode == 0000) {

//					$.cookie("username","");

//					$.cookie("isopen","");
                    var date = new Date();
                    date.setTime(date.getTime() - (30 * 60 * 1000));
                    $.cookie("username",null,{path:"/",expires: date });
                    $.cookie("isopen",null,{path:"/",expires: date });
                    if($.cookie("sourceId")=="R360"){
                        window.location.href=mainUrl+"mp/richr360/richr360_home.html";
                    }else{
                        window.location.href=mainUrl+"mp/home.html";
                    }
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }
        })
    })
//    $(".href_group, .jj_d").click(function(){
//        showAlert("暂缓开通，敬请期待！")
//    });

}