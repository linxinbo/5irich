/**
 * Created by d on 2016/5/4.
 */
var token;
$(document).ready(function () {
    var data = new Date().getTime();
    console.log(data);
    var args = new getArgs();
    var phone = args.phone;
    if(phone!=""||phone!=mull||phone!=undefined){
        $("#recommended_person").val(phone);
    }
    console.log($.cookie("sourceId"));
    $(".reshpic").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());

    //获取token
    $.ajax({
        type: 'post',
        url: mainUrl + 'TokenGenerateAction',
        data: {
            time: data
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            /*hideloading();*/
            console.log(data.retcode);
            if (data.retcode == 0000) {
                token = data.data.token;

            } else if (data.retcode == 1005) {
                showAlertApp("密码格式错误，为6-16位数字、字母、字符");
            } else if (data.retcode == 1006) {
                showAlertApp("手机或邮箱已存在");
            } else if (data.retcode == 1009) {
                showAlertApp("登录名不存在或者密码错误！");
            }
        }
    });
    $(".smsCode").unbind("click").click(function () {
        var phone = $("#oldPW").val();
        var valiCode1 = $("#valiCode1").val();
        var that = $(this);
        var str1 = /^1[3-8]{1}\d{9}$/;

        if (phone == "") {
            showAlertApp("手机不能为空！");
            return false;
        }

        if (!str1.test(phone)) {
            showAlertApp("手机号格式错误！"); //"手机号格式错误！"
            return false;
        }
        if(valiCode1==""||valiCode1.length!=4){
            showAlertApp("图形验证码不能为空或小于4位！");
            return false;
        }

        var wait = 120;
        function time(o) {
            var that = o;
            if (wait == 0) {
                //                $("#smsCode").removeClass("gray_bj");
                o.removeClass("yanzc");
                o.addClass("yanz");
                o.val("获取验证码");
                o.removeAttr("disabled");
                wait = 120;
            } else {
                //                $("#smsCode").addClass("gray_bj");
                //var wait=120;
                var  flag=setInterval(function(){
                    //do
                    o.removeClass("yanz");
                    o.addClass("yanzc");
                    o.attr("disabled", true);
                    o.val("重新发送(" + wait + ")");
                    wait--;
                    if(wait==0){
                        clearInterval(flag);
                        showAlertApp("如果您未能正常收入短信,请拨打客服电话400-6262-818联系我们");
                        time(that);
                    }

                },1000);

            }
        }
        showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "regAucd",
            data: {
                loginName: phone,
                rdText:valiCode1
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                if (data.retcode == 0000) {
                    showAlertApp("验证码已发送");
                    time(that);
                } else if(data.retcode == 1044 || data.retcode == 1029){
                    showAlertApp("验证码有效，请勿发送！");
                }else{
                    setErrorMsg(data.retcode);
                }
            },
            error: function (data) {
                hideloading();
                showAlertApp("服务器错误");
            }

        })
    })

    $(".userregister").click(function(){
        sigin();

    });
})

function sigin() {
    var phone = $("#oldPW").val();
    var pw1 = $("#newPW1").val();
    /*var pw2 = $("#newPW2").val();*/
    var valiCode = $("#valiCode").val();
    var openId = $("#openId").val();
    var str1 = /^1[3-8]{1}\d{9}$/;
    var recommended_person="李丹";//推荐人姓名
    var yes = $('#jzwo').is(':checked');
    if (!str1.test(phone)) {
        showAlertApp("手机号码格式错误");
        return false;
    }

    if (pw1 == "" || pw1 == null || pw2 == "" || pw2 == null) {
        showAlertApp("密码不能为空");
        return false;
    }

    /*if (pw1 != pw2) {
        showAlert("两次输入的密码不一致！");
        return;
    }*/

    if (valiCode == "" || valiCode == null) {
        showAlertApp("验证码不能为空");
        return false;
    }

    if (!yes) {
        showAlertApp("请阅读用户协议");
        return false;
    }

    /*if (recommended_person.length>25) {
        showAlert("推荐人姓名过长");
        return;
    }*/
    siginAjax(phone, pw1, valiCode,openId,sourceId,recommended_person);


}

//注册
function siginAjax(phone, PW1, valiCode,openId,sourceId,recommended_person) {
    $(".userregister").attr('disabled',"true");
    $(".userregister").removeClass("btn_next_travel").addClass("btn_next_travel_h");
    $(".userregister").html('正在提交……');
    $.ajax({
        type: "post",
        url: mainUrl + "webRegister",
        data: {
            "userBean.tel": phone,
            "userBean.pwd": PW1,
            "checknum": valiCode,
            "userBean.weixinId": openId,
            "userBean.refereeId":sourceId,
            "userBean.recommended_person":recommended_person,
            "token":token
        },
        dataType: "json",
        success: function (data) {

            if (data.retcode == 0000) {
                showAlertApp("注册成功！",gologin);
            } else {
                $(".userregister").removeAttr("disabled");
                $(".userregister").html('注册');
                $(".userregister").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            $(".userregister").removeAttr("disabled");
            $(".userregister").html('注册');
            $(".userregister").removeClass("btn_next_travel_h").addClass("btn_next_travel");
            showAlertApp("服务器错误");
        }
    })
}
