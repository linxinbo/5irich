$(function(){
    var commitCode;
    $('.forget-button').on('click',function(){
        var pass = passMsg();
        if(passVerify().passVer1){
            $('.forget-phone-error').hide();
            $('.forget-error-code').hide();
            commitCode = passMsg().passCode;
            debug(commitCode);
            $('.step').removeClass('act');
            $('.step').eq(1).addClass('act');
            $('.forget-btn').hide();
            $('.forget-btn1').show();
        }else if(!passVerify().passPhone){
            $('.forget-phone-error').show();
        }else if(!passVerify().passCode){
            $('.forget-error-code').html('请输入6位验证码！');
            $('.forget-error-code').show();
        }
    });
    $('.forget-button1').on('click',function(){
        if(passVerify().passVer2){
            var pass = passMsg();
            var params =  {
                "loginName": pass.passPhone,
                "password": pass.userPass1,
                "checknum": commitCode
            };
            forget(params);
        }else {
            $('.forget-error-pass1').show();
        }

    });
    $('.forget-button2').on('click',function(){
        $('#forget-pass').hide();
        loginToken();
        $('#login-cont').show();
    });
    $('.forget-back').on('click',function(){
        //window.location.href=mainUrl+"pcweb/home.html";//测试环境
        window.location.href=mainUrl+"home.html";//生产环境
    });
    //获取验证码
    $('.get-forget-code').on('click',function(){
        if(passVerify().passPhone){
            getForgetCode();
        }else {
            $('.forget-phone-error').show();
        }
    });
    function getForgetCode(){
        $.ajax({
            type: "post",
            url: mainUrl + "rstAucd",
            data: {
                loginName: passMsg().passPhone
            },
            dataType: "json",
            success: function (data) {
                if (data.retcode == 0000) {
                    codeTime();
                } else {
                    debug(data)
                    $('.forget-phone-error').show();
                    $('.forget-phone').focus();
                }
            },
            error: function (data) {
                showAlert('系统繁忙,请稍后再试!');
            }

        })
    }
    function passMsg(){
        var passMsg = {};
        passMsg.passPhone = $('.forget-phone').val();
        passMsg.passCode = $('.forget-code').val();
        passMsg.userPass1 = $('.forget-pass1').val();
        passMsg.userPass2 = $('.forget-pass2').val();
        return passMsg;
    }
    $('.login-txt').on('blur',function(){
        if($(this).hasClass('forget-phone')){
            if(!passVerify().passPhone){
                $('.forget-phone-error').show();
            }else {
                $('.forget-phone-error').hide();
            }
        }
        if($(this).hasClass('forget-pass1')){
            if(!passVerify().passPass1){
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('forget-pass2')){
            if(!passVerify().passPass2){
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
    });
    function passVerify(){
        var verify = {};
        verify.passVer1 = true;
        verify.passVer2 = true;
        verify.passPhone = true;
        verify.passCode = true;
        verify.passPass1 = true;
        verify.passPass2 = true;
        var pass = passMsg();
        var regPhone = /^1[0-9]{10}$/;
        if(!regPhone.test(pass.passPhone)){
            verify.passVer1 = false;
            verify.passPhone = false;
        }
        if(pass.passCode.length != 6){
            verify.passCode = false;
            verify.passVer1 = false;
        }
        if(!(pass.userPass1.length < 21 && pass.userPass1.length > 5)){
            verify.passVer2 = false;
            verify.passPass1 = false;
        }
        if(pass.userPass1 != pass.userPass2){
            verify.passVer2 = false;
            verify.passPass2 = false;
        }
        return  verify;
    }
    function codeTime(){
        $('.get-forget-code').attr('disabled',true);
        var timer = null;
        var codeInterval = 120;
        timer = setInterval(function(){
            codeInterval--;
            $('.get-forget-code').val(codeInterval);
            if(codeInterval <= 0){
                clearInterval(timer);
                $('.get-forget-code').removeAttr('disabled');
                $('.get-forget-code').val("获取短信验证码");
            }
        },1000);
    }
    function  forget(params){
        $.ajax({
            type: "post",
            url: mainUrl + "retRichPwd",
            data: params,
            dataType: "json",
            success: function (data) {
                debug(data);
                if (data.retcode == 0000) {
                    $('.step').removeClass('act');
                    $('.step').eq(2).addClass('act');
                    $('.forget-box').hide();
                    $('.forget-btn2').show();
                } else {
                    $('.step').removeClass('act');
                    $('.step').eq(0).addClass('act');
                    $('.forget-btn1').hide();
                    $('.forget-btn').show();
                    $('.forget-error-code').show();
                }
            },
            error: function (data) {
                showAlert('系统繁忙，请稍后再试！');
            }
        })
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