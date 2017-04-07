/**
 * Created by linxi on 2016/12/22.
 */
var kaiguan=true;
var isopen = $.cookie("isopen");
var username = $.cookie("username");
var useropen = $.cookie("sendTel");
var sn = $.cookie("sn");
//var resetpws = {};
$(document).ready(function () {

    //插入手机号
    $(".code_input1").val(useropen);

    //获取短信验证码
    $(".code_btn").click(function(){
        if(resettradepwformVerify().resettradepwformphone&&sn!=""&&sn!=undefined){
            gettradepwCode();
        }else {
            showAlert("请重新登录！",loginStart);
        }

    });
    //重置交易密码
    $(".resettradepw").click(function(){
        if(resettradepwformVerify().resettradepwformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                resettardePw();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }

    });

    function resettardePw(){
        var resettradeinfo=resettradepwformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "getBackPsw",
            data: {
                "newPsw" : resettradeinfo.password,
                "resetBean.certificateno" : sn,
                "checkNo" : resettradeinfo.code,
                "queryBean.custname" : username
            },
            dataType: "JSON",
            success: function (data) {
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    $(".resettradepw").attr('disabled',"true");
                    window.location.href = "right.html?retmsg=找回交易密码成功";
                } else {
                    //在buyfund.html页面输入的交易密码错误
                    if( data && data.retmsg && data.retmsg.length > 0 ) {
                        showAlert(data.retmsg);
                        kaiguan=true;
                    } else if( data && data.retcode == "1008" ) {
                        showAlert("原密码为空");
                        kaiguan=true;
                    } else if( data && data.retcode == "1009" ) {
                        showAlert("原密码错误");
                        kaiguan=true;
                    } else if( data && data.retcode == "1000" ) {
                        showAlert("原密码与新密码不能相同");
                        kaiguan=true;
                    } else if( data && data.retcode == "1001" ) {
                        showAlert("用户未登录",gologin);
                    } else if( data && data.retcode == "1004" ) {
                        showAlert("验证码错误");
                    }else {
                        setErrorMsg(data.retcode,data.retmsg);
                        kaiguan=true;
                    }
                }
            },
            error: function (data) {
                $(".modifylonginpw").removeAttr("disabled");
                kaiguan=true;
                //hideloading();
                showAlert("请稍后重试！服务器错误");
            }
        });

    };


    //获取验证吗
    function gettradepwCode(){
        $.ajax({
            type: "post",
            url: mainUrl + "queryForCustnoInfo",
            data: {
                "queryBean.certificatetype": 0,
                "queryBean.certificateno":sn ,
                "queryBean.mobileno": resettradepwformMsg().phone,
                "queryBean.custname":username
            },
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                //hideloading();
                if (data.retcode == 0000) {
                    time($(".code_btn"));
                    //resetpws.flag = true;
                    //resetpws.token = data.data.token;
                } else {
                    //alert(data.retcode, data.retmsg);
                    showAlert(data.retcode);
                    //$("#bugmsg").show();
                }
            },
            error: function (data) {
                //hideloading();
                //alert("请稍后重试！");
                showAlert("网络错误，请稍后重试！");
                //$("#bugmsg").show();
            }
        })

    }

    var wait = 60;
    //计时器验证码
    function time(o) {
        var that = o;
        if (wait == 0) {
            //                $("#smsCode").removeClass("gray_bj");
            o.attr("class", "code_btn");
            //o.addClass("n_yzc");
            o.html("获取验证码");
            o.removeAttr("disabled");
            wait = 60;
        } else {
            //                $("#smsCode").addClass("gray_bj");

            var  flag=setInterval(function(){
                //do
                //
                o.attr("class", "code_btn1");
                //o.addClass("n_yzc");
                o.attr("disabled", true);
                o.html("(" + wait + ")重新获取");
                wait--;
                if(wait==0){
                    clearInterval(flag);
                    //showAlert("如果您未能正常收入短信,请拨打客服电话400-6262-818联系我们");
                    showAlert("如果您未能正常收入短信,请拨打客服电话400-6262-818联系我们");
                    time(that);
                }
            },1000);
        }
    }




    //错误提示，表单验证
    $('.modifyinput').on('blur', function () {
        if ($(this).hasClass('code_input1')) {
            if (!resettradepwformVerify().resettradepwformphone) {
                $(".phone_error1").html("请输入正确的手机号！");
                $(".phone_error").show();
            } else {
                $(".phone_error").hide();
            }
        }
        if ($(this).hasClass('code')) {
            if (!resettradepwformVerify().resettradepwformcode) {
                $(".code_error1").html("你输入正确的验证码");
                $(".code_error").show();
            } else {
                $(".code_error").hide();
            }
        }
        if ($(this).hasClass('password')) {
            if (!resettradepwformVerify().resettradepwformpassword) {
                $(".password_error1").html("登录密码应该为6到20位");
                $(".password_error").show();
            } else {
                $(".password_error").hide();
            }
        }

        if ($(this).hasClass('password1')) {
            if (!resettradepwformVerify().resettradepwformpassword1) {
                $(".password1_error1").html("登录密码应该为6到20位");
                $(".password1_error").show();
            } else if(!resettradepwformVerify().resettradepwformbalance) {
                $(".password1_error1").html("两次输入密码不一样");
                $(".password1_error").show();
            } else {
                $(".password1_error").hide();
            }
        }


    });


    //验证表单数据
    function resettradepwformVerify() {
        var verify = {};
        verify.resettradepwformVer = true;
        verify.resettradepwformphone = true;
        verify.resettradepwformcode = true;
        verify.resettradepwformpassword = true;
        verify.resettradepwformpassword1 = true;
        verify.resettradepwformbalance = true;
        var user = resettradepwformMsg();
        var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");

        //验证输入密码
        if (!regPhone.test(user.phone)) {
            verify.resettradepwformphone = false;
            verify.resettradepwformVer = false;
        }

        //验证输入验证码
        if (user.code.length!=6) {
            verify.resettradepwformcode = false;
            verify.resettradepwformVer = false;
        }

        //验证输入密码
        if (user.password == "" || !/^\w{6,20}$/.test(user.password)) {
            verify.resettradepwformpassword = false;
            verify.resettradepwformVer = false;
        }

        //验证输入密码
        if (user.password1 == "" || !/^\w{6,20}$/.test(user.password1)) {
            verify.resettradepwformpassword1 = false;
            verify.resettradepwformVer = false;
        }
        if (user.password != user.password1) {
            verify.resettradepwformbalance = false;
            verify.resettradepwformVer = false;
        }

        return verify;
    }

    //获取表单内容
    function resettradepwformMsg() {
        var resettradepwformMsg = {};
        resettradepwformMsg.phone = $(".code_input1").val();//原密码
        resettradepwformMsg.code = $(".code").val();//原密码
        resettradepwformMsg.password = $(".password").val();//新交易密码
        resettradepwformMsg.password1 = $('.password1').val();//再次输入交易密码
        return resettradepwformMsg;
    }
});