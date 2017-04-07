$(function(){
    /*if(userLoginPhone){
        $('.login-phone').val(userLoginPhone);
    }*/
    //关闭登录
    $('.login-close').on('click',function(){
        $('.login-txt').val("");
        $('.home-layer').hide();
        $('#login-cont').hide();
    });
    //添加记住密码
    var userPhone=$.cookie("usermemory");
    console.log(userPhone);
    if(userPhone&&userPhone!=""){
        $('.login-phone').val(userPhone);
    }
    //变为注册界面
    $('.toRegister').on('click',function(){
        console.log(1);
        //window.location.href = mainUrl + 'pcweb/login/login.html';//测试环境
        window.location.href = mainUrl + 'login/login.html';//生产环境
        //loginToken();
        //$('#login-cont').hide();
        //if( $('#register-cont').html()){
        //    $('#register-cont').show();
        //    $(".reg-image").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
        //}else {
        //    $('#register-cont').show();
        //    $('#register-cont').load(mainUrl+'pcweb/home/register.html',function(){
        //        console.log(1)
        //        var registerJs = '<script src="'+mainUrl+'pcweb/js/home/register.js"></script>';
        //        $('head').append(registerJs);
        //        $(".reg-image").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
        //    });
        //}
    });
    //忘记密码
    $('.forget-pass').on('click',function(){
        $('#login-cont').hide();
        if( $('#forget-pass').html()){
            $('#forget-pass').show();
        }else {
            $('#forget-pass').show();
            $('#forget-pass').load(mainUrl+'home/forget.html',function(){
                var forgetJs = '<script src="'+mainUrl+'js/home/forget.js"></script>';
                $('head').append(forgetJs);
            });
        }
    });
    //切换登录方式
    $('.login-head').on('click',function(){
        if(!$(this).hasClass('act')){
            if($(this).hasClass('login-code')){
                $('.home-password').hide();
                $('.home-code').show();
            }else{
                $('.home-code').hide();
                $('.home-password').show();
            }
            $(this).addClass('act');
            $(this).children().addClass('active');
            $(this).siblings().removeClass('act');
            $(this).siblings().find('a').removeClass('active');
        }
    });
    //错误提示，表单验证
    $('.login-txt').on('blur',function(){
        if($(this).hasClass('login-phone')){
            if(!loginVerify().loginPhone){
                $('.login-error-phone').show();
            }else {
                $('.login-error-phone').hide();
            }
        }
        if($(this).hasClass('login-pass')){
            if(!loginVerify().loginPass){
                $('.login-error-pass').show();
            }else {
                $('.login-error-pass').hide();
            }
        }
    });
    //记住账号
    $('.login-rem-pass').on('click',function(){
        var userMemory = $('.login-phone').val();
        if($(this).hasClass('act')){
            $(this).removeClass('act');
            var date = new Date();
            date.setTime(date.getTime() - (7*24*60 * 60 * 1000));
            $.cookie("usermemory", userMemory, {
                path: '/',
                expires: date
            });
        }else{
            $(this).addClass('act');
            var date = new Date();
            date.setTime(date.getTime() + (7*24*60 * 60 * 1000));
            $.cookie("usermemory", userMemory, {
                path: '/',
                expires: date
            });
        }
    });
    //点击登录
    $('.login-btn-login').on('click',function(){
        if(loginVerify()){
            login();
        }
    });
    //表单验证
    function loginVerify(){
        var verify = {};
        verify.loginVer = true;
        verify.loginPhone = true;
        verify.loginPass = true;
        verify.loginImg = true;
        var user = userMsg();
        var regPhone = /^1[0-9]{10}$/;
        var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        if(!regPhone.test(user.userPhone) && !regEmail.test(user.userPhone)){
            verify.loginVer = false;
            verify.loginPhone = false;
        }
        if(!(user.userPass.length < 21 && user.userPass.length > 5)){
            verify.loginVer = false;
            verify.loginPass = false;
        }
        return  verify;
    }
//获取页面信息
    function userMsg(){
        var userMsg = {};
        userMsg.userPhone = $('.login-phone').val();
        userMsg.userPass = $('.login-pass').val();
        userMsg.userImg = $('.login-commit').val();
        return userMsg;
    }

    function login(){
        var user = userMsg();
        var userParams = {};
        userParams.loginName = user.userPhone;
        userParams.password = user.userPass;
        userParams.rdText = user.userImg;
        userParams.token = token;
        userParams.loginType = '1';
        //debug(userParams)
        if(loginVerify().loginVer){
            $("#login_web").attr('disabled',"true");
            $("#login_web").removeClass("login-btn").addClass("login-btn1");
            $("#login_web").val('正在登录...');
            $.ajax({
                type: 'post',
                url: mainUrl + 'LoginWebAction',
                data: userParams,
                dataType: 'json',
                success: function (data) {
                    debug(data);
                    if(data.error_lognum >= 2){
                        $('.login-commit').show();
                        $('.login-commit').addClass('img-verify');
                        $(".login-img").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
                        $(".login-img").show();
                    }
                    if (data.retcode == 0000) {
                        $("#login_web").attr('disabled',"true");
                        debug(data);
                        var username = data.data.name;
                        var loginName = data.data.loginName;
                        var date = new Date();
                        var sn = data.data.sn;
                        var imgurl = data.data.weixinHeadImgUrl;
                        var sendTel=data.data.sendTel;
                        if (imgurl == "" || imgurl == null || imgurl == undefined) {
                            var imgurl = "";
                        }
                        //date.setTime(date.getTime() + (30 * 60 * 1000));
                        if (data.data.isopen == 1) {
                            $.cookie("username", username, {
                                path: '/'
                                //expires: date
                            });
                            $.cookie("isopen", 1, {
                                path: '/'
                                //expires: date
                            });
                            $.cookie("sn", sn, {
                                path: '/'
                                //expires: date
                            });
                            $.cookie("useropen", user.userPhone, {
                                path: '/'
                                //expires: date
                            });
                            $.cookie("sendTel", sendTel, {
                                path: '/'
                                //expires: date
                            });

                        } else {

                            $.cookie("username", loginName, {
                                path: '/'
                                //expires: date
                            });
                            $.cookie("isopen", 0, {
                                path: '/'
                                //expires: date
                            });
                            $.cookie("imgurl", imgurl, {
                                path: '/'
                                //expires: date
                            });
                        }
                        console.log(document.referrer);
                        if(userReg){
                            window.location.href = document.referrer;
                        }else if(assets=="assets"){
                            window.location.href= mainUrl+"assets/assets.html";
                        }else{
                            window.location.reload();
                        }

                    } else if(data.retcode == '1009'){
                        $("#login_web").removeAttr("disabled");
                        $("#login_web").removeClass("login-btn1").addClass("login-btn");
                        $("#login_web").val('立即登录');
                        $('.login-tip').html('账户名不存在，请重新输入');
                        $('.login-tip').show();
                        $('.login-phone').focus();
                    } else if(data.retcode == '1015'){
                        $("#login_web").removeAttr("disabled");
                        $("#login_web").removeClass("login-btn1").addClass("login-btn");
                        $("#login_web").val('立即登录');
                        if(data.data.error_lognum){
                            imgVerify(data.data.error_lognum);
                        }
                        $('.login-tip').html('账户名与密码不匹配，请重新输入');
                        $('.login-tip').show();
                        $('.login-pass').focus();
                    } else if (data.retcode == '1008') {
                        $("#login_web").removeAttr("disabled");
                        $("#login_web").removeClass("login-btn1").addClass("login-btn");
                        $("#login_web").val('立即登录');
                        imgVerify(2);
                        $('.login-tip').html('请填写完整信息！');
                        $('.login-tip').show();
                    }else if (data.retcode == '1004') {
                        $("#login_web").removeAttr("disabled");
                        $("#login_web").removeClass("login-btn1").addClass("login-btn");
                        $("#login_web").val('立即登录');
                        imgVerify(2);
                        $('.login-tip').html('验证码错误！');
                        $('.login-tip').show();
                    }else if (data.retcode == ' ') {
                        $("#login_web").removeAttr("disabled");
                        $("#login_web").removeClass("login-btn1").addClass("login-btn");
                        $("#login_web").val('立即登录');
                        imgVerify(2);
                        $('.error-commit').show();
                        $('.login-commit').focus();
                    }else {
                        $("#login_web").removeAttr("disabled");
                        $("#login_web").removeClass("login-btn1").addClass("login-btn");
                        $("#login_web").val('立即登录');
                        showAlert('系统繁忙，请稍后重试！')
                    }
                },
                error: function (data) {
                    $("#login_web").removeAttr("disabled");
                    $("#login_web").removeClass("login-btn1").addClass("login-btn");
                    $("#login_web").val('立即登录');
                    showAlert("系统繁忙，请稍后重试！！");
                }
            });
        }else {
            $('.login-tip').show();
        }

    }
    function imgVerify(errcode){
        debug(errcode);
        if(errcode >= 2){
            $('.login-commit').val("");
            $('.login-commit').show();
            $('.home-password').css('paddingTop',0);
            $(' .home-password .login-tip').css('top',7);
            $('.login-commit').addClass('img-verify');
            $(".login-img").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
            $(".login-img").show();
        }
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