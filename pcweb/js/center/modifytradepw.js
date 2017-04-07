/**
 * Created by linxi on 2016/12/22.
 */
var kaiguan=true;
$(document).ready(function () {

    $(".modifytradepw").click(function(){
        if(modifytradepwformVerify().modifytradepwformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                modifytradePw();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }

    });

    function modifytradePw(){
        var modifytradeinfo=modifytradepwformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "modifyBusinessPW",
            data: {
                "busPWModifyBean.oldpwd" : modifytradeinfo.oldpassword,
                "busPWModifyBean.newpwd" : modifytradeinfo.password
            },
            dataType: "JSON",
            success: function (data) {
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    $(".modifytradepw").attr('disabled',"true");
                    window.location.href = "right.html?retmsg=交易密码修改成功";
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
                    } else {
                        showAlert( "网络通信错误，请稍候刷新重试");
                        kaiguan=true;
                    }
                }
            },
            error: function (data) {
                $(".modifytradepw").removeAttr("disabled");
                kaiguan=true;
                //hideloading();
                showAlert("请稍后重试！服务器错误");
            }
        });

    };




    //错误提示，表单验证
    $('.modifyinput').on('blur', function () {
        if ($(this).hasClass('oldpassword')) {
            if (!modifytradepwformVerify().modifytradepwformoldpassword) {
                $(".oldpassword_error1").html("登录密码应该为6到20位");
                $(".oldpassword_error").show();
            } else {
                $(".oldpassword_error").hide();
            }
        }
        if ($(this).hasClass('password')) {
            if (!modifytradepwformVerify().modifytradepwformpassword) {
                $(".password_error1").html("登录密码应该为6到20位");
                $(".password_error").show();
            } else {
                $(".password_error").hide();
            }
        }

        if ($(this).hasClass('password1')) {
            if (!modifytradepwformVerify().modifytradepwformpassword1) {
                $(".password1_error1").html("登录密码应该为6到20位");
                $(".password1_error").show();
            } else if(!modifytradepwformVerify().modifytradepwformbalance) {
                $(".password1_error1").html("两次输入密码不一样");
                $(".password1_error").show();
            } else {
                $(".password1_error").hide();
            }
        }


    });


    //验证表单数据
    function modifytradepwformVerify() {
        var verify = {};
        verify.modifytradepwformVer = true;
        verify.modifytradepwformoldpassword = true;
        verify.modifytradepwformpassword = true;
        verify.modifytradepwformpassword1 = true;
        verify.modifytradepwformbalance = true;
        var user = modifytradepwformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");

        //验证输入密码
        if (user.oldpassword == "" || !/^\w{6,20}$/.test(user.oldpassword)) {
            verify.modifytradepwformoldpassword = false;
            verify.modifytradepwformVer = false;
        }

        //验证输入密码
        if (user.password == "" || !/^\w{6,20}$/.test(user.password)) {
            verify.modifytradepwformpassword = false;
            verify.modifytradepwformVer = false;
        }

        //验证输入密码
        if (user.password1 == "" || !/^\w{6,20}$/.test(user.password1)) {
            verify.modifytradepwformpassword1 = false;
            verify.modifytradepwformVer = false;
        }
        if (user.password != user.password1) {
            verify.modifytradepwformbalance = false;
            verify.modifytradepwformVer = false;
        }

        return verify;
    }

    //获取表单内容
    function modifytradepwformMsg() {
        var modifytradepwformMsg = {};
        modifytradepwformMsg.oldpassword = $(".oldpassword").val();//原密码
        modifytradepwformMsg.password = $(".password").val();//新交易密码
        modifytradepwformMsg.password1 = $('.password1').val();//再次输入交易密码
        return modifytradepwformMsg;
    }
});