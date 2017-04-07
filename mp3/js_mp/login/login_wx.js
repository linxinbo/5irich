/**
 * Created by CJQF on 2016/9/20.
 */
$(document).ready(function () {

    $("#cardNo").focus(function () {
        $("[data_rest='ID_rest']").show();
        $("#cardNo").parents("li").next(".errorLi").hide();
    });
    $("#tradePW").focus(function () {
        $("[data_rest='PW_rest']").show();
    });
    $("#cardNo").blur(function () {
        var cardNo = $(this).val();
        if (cardNo == "") {
            $("[data_rest='ID_rest']").hide();
        }
    });
    $("#tradePW").blur(function () {
        var tradePW = $(this).val();
        if (tradePW == "") {
            $("[data_rest='PW_rest']").hide();
        }
    });
    $("#login_yh").unbind("click").click(function(){
        login();

    })
});


function login() {
    console.log("come")
    var phone = $("#cardNo").val();
    var password = $("#tradePW").val();
    //	$.cookie("username", "ss");
    /*手机号或邮箱格式验证*/
    /*var str=/^\w+@[0-9A-z]{2,6}\(.[a-z]{2,6}){1,4}$/;*/
    var str1 = /^1[3-8]{1}\d{9}$/;
    var success = false;
    if (phone == "") {
        showAlert("手机不能为空！");
        success = false;
        return false;
    }

    if (!str1.test(phone)) {
        showAlert("手机号格式错误！"); //"手机号格式错误！"
        success = false;
        return false;
    }

    if (password == "" || password == null) {
        showAlert("密码不能为空！");
        success = false;
        return false;
    }
    if (password.length < 6 || password.length > 16) {
        showAlert("密码必须为6-16位长度");
        success = false;
        return false;
    } else {
        success = true;
    }
    if (success) {
        showLoading();
        console.log("come")
        $.ajax({
            type: 'post',
            url: mainUrl + 'bindingInfoAction',
            data: {
                loginName: phone,
                password: password
            },
            dataType: 'json',
            success: function (data) {
                hideloading();
                console.log(data.retcode);
                if (data.retcode == 0000) {
                    showAlert("绑定账号成功！",goMyAssets)

                } else {
                    setErrorMsg(data.retcode, data.retmsg);

                }
            },
            error: function (data) {
                hideloading();
                setErrorMsg(data.retcode, data.retmsg);
            }
        })

    }

}

function goMyAssets(){
    window.location.href = "my-assets/my_assets.html";
};