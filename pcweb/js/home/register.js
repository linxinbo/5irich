$(function(){
    //切换到登录
    $('.login').on('click',function(){
        loginToken();
        $('#register-cont').hide();
        if( $('#login-cont').html()){
            $('#login-cont').show();
        }else {
            $('#login-cont').show();
            $('#login-cont').load(mainUrl+'home/login.html',function(){
                var loginJs = '<script src="'+mainUrl+'js/home/login.js"></script>';
                $('head').append(loginJs);
            });
        }
        if($.cookie().usermemory){
            $('.login-rem-pass').addClass('act');
            $('.login-phone').val($.cookie().usermemory);
        }
    });
    //关闭注册
    $('.reg-close').on('click',function(){
        $('.login-txt').val("");
        $('.home-layer').hide();
        $('#register-cont').hide();
    });
    //推荐人
    $('.reg-referee-triangle').on('click',function(){
        if($(this).hasClass('act')){
            $(this).removeClass('act');
            $('.reg-referee-phone').val("");
            $('.reg-referee-phone').hide();
            $('.reg-error-person').hide();
        }else{
            $(this).addClass('act');
            $('.reg-referee-phone').show();
        }
    });
    //错误提示，表单验证
    $('.login-txt').on('blur',function(){
        if($(this).hasClass('reg-phone')){
            if(!regVerify().regPhone){
                $(this).next().html("请输入正确的手机号码!");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('reg-pass1')){
            if(!regVerify().regPass1){
                $('.reg-error-pass1').show();
            }else {
                $('.reg-error-pass1').hide();
            }
        }
        if($(this).hasClass('reg-pass2')){
            if(!regVerify().regPass2){
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('reg-img')){
            if(!regVerify().regImg){
                $('.reg-error-img').html('验证码为4位标识符');
                $('.reg-error-img').show();
            }else {
                $('.reg-error-img').hide();
            }
        }
        if($(this).hasClass('reg-code')){
            if(!regVerify().regCode){
                $('.reg-error-code').html('验证码为6位标识符');
                $('.reg-error-code').show();
            }else {
                $('.reg-error-code').hide();
            }
        }
        if($(this).hasClass('reg-referee-phone')){
            if(!regVerify().regReferee){
                $('.reg-error-person').show();
            }else {
                $('.reg-error-person').hide();
            }
        }
    });
    //获取验证码
    $('.get-code').on('click',function(){
        if(regVerify().regPhone && regVerify().regImg){
            getCode();
        }
    });
    //用户协议
    $('.reg-reading').on('click',function(){
        $('#registerCont').hide();
        $('.user-arg').show();
    });
    $('.userArg-close').on('click',function(){
        $('#registerCont').show();
        $('.user-arg').hide();
    });
    $('.userArg-true').on('click',function(){
        $('#registerCont').show();
        $('.user-arg').hide();
        $('.reg-read').removeClass('act').addClass('act');
        $('.reg-read-error').hide();
    });
    $('.reg-read').on('click',function(){
        if($(this).hasClass('act')){
            $(this).removeClass('act');
            $('.reg-read-error').show();
        }else{
            $(this).addClass('act');
            $('.reg-read-error').hide();
        }
    });
    //注册
   $('.login-btn-register').on('click',function(){
        if(regVerify().regVer){
            register();
        }else {
            showAlert('请填写完整信息！');
        }
   });
    //获取验证码
    function getCode(){
        $.ajax({
            type: "post",
            url: mainUrl + "regAucd",
            data: {
                loginName: userMsg().userPhone,
                rdText: userMsg().userImg,
                webType: 'true',
                t: new Date().getTime()
            },
            dataType: "json",
            success: function (data) {
                debug(data);
                if (data.retcode == '0000') {
                    codeTime();
                    $('.reg-error-code').hide();
                } else {
                    $(".reg-image").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
                    $('.reg-img').val("");
                    if(data.retcode == '1006'){
                        $('.reg-phone-error').html("该手机号已注册!");
                        $('.reg-phone-error').show();
                        $('.reg-phone').focus();
                    } else if( data.retcode == "1000" ) {
                        $('.reg-phone-error').html("手机号格式不正确");
                        $('.reg-phone-error').show();
                        $('.reg-phone').focus();
                    }else if( data.retcode == "1004" ) {
                        $('.reg-error-img').html("图形验证码错误");
                        $('.reg-error-img').show();
                        $('.reg-img').focus();
                    }else {
                        $('.reg-error-code').html("系统繁忙，请稍后再试!");
                        $('.reg-error-img').show();
                    }
                }
            },
            error: function (data) {
                showAlert('系统繁忙,请稍后再试!');
            }

        })
    }
    //验证码定时器
    function codeTime(){
        $('.get-code').attr('disabled',true);
        var timer = null;
        var codeInterval = 120;
        timer = setInterval(function(){
            codeInterval--;
            $('.get-code').val(codeInterval);
            if(codeInterval <= 0){
                clearInterval(timer);
                $('.get-code').removeAttr('disabled');
                $('.get-code').val("获取验证码");
            }
        },1000);
    }
    //register
    function register(){
        debug(token);
        var userInfo = userMsg();
         var params = {
            "userBean.tel": userInfo.userPhone,
            "userBean.pwd": userInfo.userPass2,
            "checknum": userInfo.userCode,
            "userBean.recommended_person": userInfo.userReferee,
            "token": token
        };
        $.ajax({
            type: "post",
            url: mainUrl + "webRegister",
            data: params,
            dataType: "json",
            success: function (data) {
                debug(data);
                if (data.retcode == 0000) {
                    loginToken();
                    debug(token)
                    $('.login-txt').val("");
                    userLoginPhone = data.data.loginName;
                    $('#register-cont').hide();
                    if( $('#login-cont').html()){
                        $('#login-cont').show();
                    }else {
                        $('#login-cont').show();
                        $('#login-cont').load(mainUrl+'home/login.html',function(){
                            var loginJs = '<script src="'+mainUrl+'js/home/login.js"></script>';
                            $('head').append(loginJs);
                        });
                    }
                } else {
                    $(".reg-image").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
                    if(data.retcode == '1006'){
                        $('.reg-phone-error').html("该手机号已注册!");
                        $('.reg-phone-error').show();
                        $('.reg-phone').focus();
                    } else if( data.retcode == "1000" ) {
                        $('.reg-phone-error').html("手机号格式不正确");
                        $('.reg-phone-error').show();
                        $('.reg-phone').focus();
                    } else if( data.retcode == "1008" ) {
                        $('.reg-error-code').html("手机短信验证码为空!");
                        $('.reg-error-code').show();
                        $('.reg-code').focus();
                    } else if( data.retcode == "1005" ) {
                        $('.reg-error-pass1').show();
                        $('.reg-pass1').focus();
                    } else if( data.retcode == "1004" ) {
                        $('.reg-error-code').html("手机短信验证码错误!");
                        $('.reg-error-code').show();
                        $('.reg-code').focus();
                    } else if( data && data.retmsg && data.retmsg.length > 0 ) {
                        alert(data.retmsg);
                    } else {
                        showAlert("系统繁忙，请稍候重试");
                    }
                }
            },
            error: function (data) {
                showAlert("系统繁忙，请稍候重试");
            }
        })
    }
    function regVerify(){
        var verify = {};
        verify.regVer = true;
        verify.regPhone = true;
        verify.regImg = true;
        verify.regCode = true;
        verify.regPass1 = true;
        verify.regPass2 = true;
        verify.regReferee = true;
        var user = userMsg();
        var regPhone = /^1[0-9]{10}$/;
        var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        if(!regPhone.test(user.userPhone) && !regEmail.test(user.userPhone)){
            verify.regVer = false;
            verify.regPhone = false;
        }
        if(!regPhone.test(user.userReferee) && !regEmail.test(user.userReferee)){
            verify.regReferee = false;
        }
        if(!(user.userPass1.length < 21 && user.userPass1.length > 5)){
            verify.regVer = false;
            verify.regPass1 = false;
        }
        if(user.userPass1 != user.userPass2){
            verify.regVer = false;
            verify.regPass2 = false;
        }
        if(user.userImg.length != 4){
            verify.regImg = false;
            verify.regVer = false;
        }
        if(user.userCode.length != 6){
            verify.regCode = false;
            verify.regVer = false;
        }
        if(!$('.reg-read').hasClass('act')){
            verify.regVer = false;
            $('.reg-read-error').show();
        }
        return  verify;
    }
    function userMsg(){
        var userMsg = {};
        userMsg.userPhone = $('.reg-phone').val();
        userMsg.userPass1 = $('.reg-pass1').val();
        userMsg.userPass2 = $('.reg-pass2').val();
        userMsg.userImg = $('.reg-img').val();
        userMsg.userCode = $('.reg-code').val();
        userMsg.userReferee = $('.reg-referee-phone').val();
        return userMsg;
    }
    function loginToken(){
        var date = new Date().getTime();
        $.ajax({
            type: 'post',
            url: mainUrl + 'TokenGenerateAction',
            data: {
                time: date
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.retcode == 0000) {
                    token = data.data.token;
                }else{
                    debug(data);
                    showAlert('系统繁忙，请稍后再试！');
                }
            },
            error: function(data){
                showAlert('系统繁忙，请稍后再试！');
            }
        });
    }
});
