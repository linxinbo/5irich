/**
 * Created by d on 2016/5/4.
 */
jQuery(document).ready(function () {
    z_back();
    var args = new getArgs();
    var phone = args.phone;
    if(phone!=""||phone!=mull||phone!=undefined){
        $("#recommended_person").val(phone);
    }
    console.log($.cookie("sourceId"));
    $(".smsCode").unbind("click").click(function () {
        var phone = $("#oldPW").val();
        var that = $(this);
        var str1 = /^1[3-8]{1}\d{9}$/;

        if (phone == "") {
            showAlert("手机不能为空！");
            return false;
        }

        if (!str1.test(phone)) {
            showAlert("手机号格式错误！"); //"手机号格式错误！"
            return false;
        }
        var wait = 120;

        function time(o) {
            var that = o;
            if (wait == 0) {
                //                $("#smsCode").removeClass("gray_bj");
                o.attr("class", "n_yzc");
                o.addClass("smsCode");
                o.val("获取验证码");
                o.removeAttr("disabled");
                wait = 120;
            } else {
                //                $("#smsCode").addClass("gray_bj");
                //var wait=120;
                var  flag=setInterval(function(){
                    //do
                    //
                    o.attr("class", "n_yzc");
                    o.addClass("smsCode");
                    o.attr("disabled", true);
                    o.val("重新发送(" + wait + ")");
                    wait--;
                    if(wait==0){
                        clearInterval(flag);
                        showAlert("如果您未能正常收入短信,请拨打客服电话400-6262-818联系我们");
                        time(that);
                    }

                },1000);

            }
        }


        hideloading();
        showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "regAucd",
            data: {
                loginName: phone
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                if (data.retcode == 0000) {
                    showAlert("验证码已发送");
                    time(that);
                } else if(data.retcode == 1044 || data.retcode == 1029){
                    showAlert("验证码有效，请勿发送！");
                }else{
                    setErrorMsg(data.retcode);
                }
            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误");
            }

        })
    })
})

function sigin() {
    var phone = $("#oldPW").val();
    var pw1 = $("#newPW1").val();
    var pw2 = $("#newPW2").val();
    var valiCode = $("#valiCode").val();
    var openId = $("#openId").val();
    var str1 = /^1[3-8]{1}\d{9}$/;
    var recommended_person=$("#recommended_person").val();
    if (!str1.test(phone)) {
        showAlert("手机号码格式错误");
        return;
    }

    if (pw1 == "" || pw1 == null || pw2 == "" || pw2 == null) {
        showAlert("密码不能为空");
        return;
    }

    if (pw1 != pw2) {
        showAlert("两次输入的密码不一致！");
        return;
    }

    if (valiCode == "" || valiCode == null) {
        showAlert("验证码不能为空");
        return;
    }

    if (recommended_person.length>25) {
        showAlert("推荐人姓名过长");
        return;
    }

    if($.cookie("sourceId")=="R360"||$.cookie("sourceId")!==""){
        var sourceId=$.cookie("sourceId");
        siginAjax(phone, pw1, valiCode,openId,sourceId,recommended_person);
    }else{
        var sourceId="";
        siginAjax(phone, pw1, valiCode,openId,sourceId,recommended_person);
    }

}

//注册
function siginAjax(phone, PW1, valiCode,openId,sourceId,recommended_person) {
    hideloading();
    showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "webRegister",
        data: {
            "userBean.tel": phone,
            "userBean.pwd": PW1,
            "checknum": valiCode,
            "userBean.weixinId": openId,
            "userBean.refereeId":sourceId,
            "userBean.recommended_person":recommended_person
        },
        dataType: "json",
        success: function (data) {
            hideloading();
            if (data.retcode == 0000) {
                window.location.href = "sigin-right-open.html";
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误");
        }
    })
}
