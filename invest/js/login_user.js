/**
 * Created by d on 2016/5/4.
 */
//登陆验证
var token;
$(document).ready(function () {
    var data = new Date().getTime();
    console.log(data);
    var loginaccout = $.cookie("loginaccount");
    console.log(loginaccout);
    if (loginaccout == "" || loginaccout == null || loginaccout == undefined||loginaccout == "null"){
        $("#cardNo").val("");
    }else{
        $("#cardNo").val(loginaccout);
    }

    var storage = window.localStorage;
    var getPhone = storage["phone"];
    var getPwd = storage["password"];

    showLoading();
    //	获取token
    $.ajax({
        type: 'post',
        url: mainUrl + 'TokenGenerateAction',
        data: {
            time: data
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            hideloading();
            console.log(data.retcode);
            if (data.retcode == 0000) {
                token = data.data.token;

            } else if (data.retcode == 1005) {
                alert("密码格式错误，为6-16位数字、字母、字符");
            } else if (data.retcode == 1006) {
                alert("手机或邮箱已存在");
            } else if (data.retcode == 1009) {
                alert("登录名不存在或者密码错误！");
            }
        }
    });

    $(".reshpic").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());

    if("undefined" != typeof(getPhone)&& "undefined" != typeof(getPwd)){
        loginAuto();
    }else{
        $("#login_yh").unbind("click").click(function(){
            login();

        })
    };


});

//app自动登录方法
function loginAuto() {
    var storage = window.localStorage;
    console.log("come")
    var phone =storage["phone"];
    var valiCode1 = $("#valiCode").val();
    var valiCode=valiCode1.replace(/\s/g, "");
    var password = storage["password"];
    var openId=$("#openId").val();
    //	$.cookie("username", "ss");
    /*手机号或邮箱格式验证*/
    /*var str=/^\w+@[0-9A-z]{2,6}\(.[a-z]{2,6}){1,4}$/;*/
    var str1 = /^1[3-8]{1}\d{9}$/;
    var success = false;
    if (phone == "") {
        showAlertApp("手机不能为空！");
        success = false;
        return false;
    }

    if (!str1.test(phone)) {
        showAlertApp("手机号格式错误！"); //"手机号格式错误！"
        success = false;
        return false;
    }

    if (password == "" || password == null) {
        showAlertApp("密码不能为空！");
        success = false;
        return false;
    }
    if (password.length < 6 || password.length > 16) {
        showAlertApp("密码必须为6-16位长度");
        success = false;
        return false;
    }
    /*if (valiCode.length == '') {
     showAlertApp("验证码不能为空");
     success = false;
     return;
     } else if (valiCode.length < 4) {
     showAlertApp("验证码格式错误");
     success = false;
     return;
     }*/ else {
        success = true;
    }
    if (token == "" || token == null) {
        success = false;
    }

    if (success) {
        /*showLoading();*/
        $(".userLogin").attr('disabled',"true");
        $(".userLogin").removeClass("btn_next_travel").addClass("btn_next_travel_h");
        $(".userLogin").html('正在提交……');
        console.log("come")
        $.ajax({
            type: 'post',
            url: mainUrl + 'LoginWebAction',
            data: {
                loginName: phone,
                password: password,
                loginType: '1',
                token: token,
                rdText: valiCode,
                webChatId:openId
            },
            dataType: 'json',
            success: function (data) {
                /*hideloading();*/
                //console.log(data);
                if (data.retcode == 0000) {
                    var username = data.data.name;
                    console.log(username)
                    var loginName = data.data.loginName;
                    var date = new Date();
                    var sn = data.data.sn;
                    var imgurl = data.data.weixinHeadImgUrl;
                    var sendTel = data.data.sendTel;
                    if (imgurl == "" || imgurl == null || imgurl == undefined) {
                        var imgurl = "http://www.5irich.com/invest/images/userhead@2x.png";
                    }
                    date.setTime(date.getTime() + (30 * 60 * 1000));
                    if (data.data.isopen == 1) {
                        $.cookie("username", username, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("isopen", 1, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("sn", sn, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("useropen", phone, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("sendTel", sendTel, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("imgurl", imgurl, {
                            path: '/',
                            expires: date
                        });
                        console.log($.cookie("username"));

                        //window.location.href = "sigin/login-right.html?isopen=" + data.data.isopen + "";
                        var newurl = document.referrer;
                        console.log(newurl);
                        if (newurl == "" || newurl == null) {
                            window.location.href = "index.html";
                        } else {
                            window.location.href = document.referrer;
                        }
                        //window.history.go(-1);/*+ data.data.isopen + "";*/

                    } else {

                        $.cookie("username", loginName, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("isopen", 0, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("imgurl", imgurl, {
                            path: '/',
                            expires: date
                        });
                        var newurl = document.referrer;
                        console.log(newurl);
                        console.log($.cookie("username"));
                        if (newurl == "" || newurl == null) {
                            window.location.href = "index.html";
                        }else{
                            showAlertHint("您还没有开户！立即去开户？",goAccount,goBack)
                        }
                    }

                }else if(data.retcode == '1009'){
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    localStorage.clear();
                    showAlertApp('账户名不存在，请重新输入',gologin);
                    $('#cardNo').focus();
                } else if(data.retcode == '1015'){
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    if(data.data.error_lognum){
                        imgVerify(data.data.error_lognum);
                    }
                    localStorage.clear();
                    showAlertApp('账户名与密码不匹配，请重新输入',gologin);
                    $('#tradePW').focus();
                } else if (data.retcode == '1008') {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    imgVerify(2);
                    localStorage.clear();
                    showAlertApp('请填写完整信息！',gologin);
                }else if (data.retcode == '1004') {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    imgVerify(2);
                    localStorage.clear();
                    showAlertApp('验证码错误！',gologin);
                }else if (data.retcode == ' ') {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    imgVerify(2);
                    localStorage.clear();
                    showAlertApp('验证码错误！',gologin);
                    $('#cardNo').focus();
                }else {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    localStorage.clear();
                    showAlertApp('系统繁忙，请稍后重试！',gologin)
                }
            },
            error: function (data) {
                $(".userLogin").removeAttr("disabled");
                $(".userLogin").html('登录');
                $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                localStorage.clear();
                showAlertApp('系统繁忙，请稍后重试！',gologin)
            }
        })

    }

}
//app手动登录方法
function login() {
    console.log("come")
    var phone = $("#cardNo").val();
    var valiCode1 = $("#valiCode").val();
    var valiCode=valiCode1.replace(/\s/g, "");
    var password = $("#tradePW").val();
    var openId=$("#openId").val();
    //	$.cookie("username", "ss");
    /*手机号或邮箱格式验证*/
    /*var str=/^\w+@[0-9A-z]{2,6}\(.[a-z]{2,6}){1,4}$/;*/
    var str1 = /^1[3-8]{1}\d{9}$/;
    var success = false;
    if (phone == "") {
        showAlertApp("手机不能为空！");
        success = false;
        return false;
    }

    if (!str1.test(phone)) {
        showAlertApp("手机号格式错误！"); //"手机号格式错误！"
        success = false;
        return false;
    }

    if (password == "" || password == null) {
        showAlertApp("密码不能为空！");
        success = false;
        return false;
    }
    if (password.length < 6 || password.length > 16) {
        showAlertApp("密码必须为6-16位长度");
        success = false;
        return false;
    }
    /*if (valiCode.length == '') {
        showAlertApp("验证码不能为空");
        success = false;
        return;
    } else if (valiCode.length < 4) {
        showAlertApp("验证码格式错误");
        success = false;
        return;
    }*/ else {
        success = true;
    }
    if (token == "" || token == null) {
        success = false;
    }

    if (success) {
        /*showLoading();*/
        $(".userLogin").attr('disabled',"true");
        $(".userLogin").removeClass("btn_next_travel").addClass("btn_next_travel_h");
        $(".userLogin").html('正在提交……');
        console.log("come")
        $.ajax({
            type: 'post',
            url: mainUrl + 'LoginWebAction',
            data: {
                loginName: phone,
                password: password,
                loginType: '1',
                token: token,
                rdText: valiCode,
                webChatId:openId
            },
            dataType: 'json',
            success: function (data) {
                /*hideloading();*/
                //console.log(data);
                if (data.retcode == 0000) {
                    var username = data.data.name;
                    console.log(username)
                    var loginName = data.data.loginName;
                    var date = new Date();
                    var sn = data.data.sn;
                    var imgurl = data.data.weixinHeadImgUrl;
                    var sendTel = data.data.sendTel;
                    if (imgurl == "" || imgurl == null || imgurl == undefined) {
                        var imgurl = "http://www.5irich.com/invest/images/userhead@2x.png";
                    }
                    date.setTime(date.getTime() + (30 * 60 * 1000));
                    var storage = window.localStorage;
                    storage["phone"] = phone;
                    storage["password"] =  password;
                    if (data.data.isopen == 1) {
                        $.cookie("username", username, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("isopen", 1, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("sn", sn, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("useropen", phone, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("sendTel", sendTel, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("imgurl", imgurl, {
                            path: '/',
                            expires: date
                        });
                        console.log($.cookie("username"));

                        //window.location.href = "sigin/login-right.html?isopen=" + data.data.isopen + "";
                        var newurl = document.referrer;
                        console.log(newurl);
                        if (newurl == "" || newurl == null) {
                            window.location.href = "index.html";
                        } else {
                            window.location.href = document.referrer;
                        }
                        //window.history.go(-1);/*+ data.data.isopen + "";*/

                    } else {

                        $.cookie("username", loginName, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("isopen", 0, {
                            path: '/',
                            expires: date
                        });
                        $.cookie("imgurl", imgurl, {
                            path: '/',
                            expires: date
                        });
                        var newurl = document.referrer;
                        console.log(newurl);
                        console.log($.cookie("username"));
                        if (newurl == "" || newurl == null) {
                            window.location.href = "index.html";
                        }else{
                            showAlertHint("您还没有开户！立即去开户？",goAccount,goBack)
                        }
                    }

            }else if(data.retcode == '1009'){
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    showAlertApp('账户名不存在，请重新输入');
                    $('#cardNo').focus();
            } else if(data.retcode == '1015'){
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    if(data.data.error_lognum){
                        imgVerify(data.data.error_lognum);
                    }
                    showAlertApp('账户名与密码不匹配，请重新输入');
                    $('#tradePW').focus();
            } else if (data.retcode == '1008') {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    imgVerify(2);
                    showAlertApp('请填写完整信息！');
            }else if (data.retcode == '1004') {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    imgVerify(2);
                    showAlertApp('验证码错误！');
            }else if (data.retcode == ' ') {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    imgVerify(2);
                    showAlertApp('验证码错误！');
                    $('#cardNo').focus();
            }else {
                    $(".userLogin").removeAttr("disabled");
                    $(".userLogin").html('登录');
                    $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    showAlertApp('系统繁忙，请稍后重试！')
            }
            },
            error: function (data) {
                $(".userLogin").removeAttr("disabled");
                $(".userLogin").html('登录');
                $(".userLogin").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                showAlertApp('系统繁忙，请稍后重试！')
            }
        })

    }

}

//验证码错误超过次数
function imgVerify(errcode){
    console.log(errcode);
    if(errcode >= 2){
        $('#valiCode').val("");
        $('.login-commit').show();
        $(".login_yz").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
    }
}
//---------------------------跳转回调函数----------------------
function goAccount(){
    window.location.href = "account.html";
}
function goBack(){
    window.location.href = document.referrer;
}
