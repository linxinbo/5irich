function debug(data){
    if(true){
        console.log("欢迎访问理财易站，有问题请拨打客服电话400-6262-818");
    }
}
var objSide = {};
objSide.timer = null;
var token;
var userLoginPhone;
var userReg = false;
var assets;
//var mainUrlNew = "http://localhost:8080/CJQF3.0/";//本地测试
var mainUrl = "http://localhost:8080/Wirich2.0/";//手机测试
//var mainUrl = "http://192.168.1.110:8080/Wirich2.0/";//手机测试
//var mainUrl = "http://www.5irich.com/";//服务器
//var mainUrl = "http://192.168.1.99:8080/Wirich2.0/";//本地测试
function isLastUrl(url) { //判断上一页是否为xxx.html
    var s = ".+" + url.replace(".", "\\.") + "(\\?|$)";
    var reg = new RegExp(s);
    if (reg.test(document.referrer)) {
        return true;
    } else {
        return false;
    }
}

function getArgs() //作用是获取当前网页的查询条件
{
    var args = new Object(); //声明一个空对象
    var query = window.location.search.substring(1); // 取查询字符串，如从http://www.snowpeak.org/testjs.htm?a1=v1&a2=&a3=v3#anchor 中截出 a1=v1&a2=&a3=v3。
    var pairs = query.split("&"); // 以 & 符分开成数组
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); // 查找 "name=value" 对
        if (pos == -1) continue; // 若不成对，则跳出循环继续下一对
        var argname = pairs[i].substring(0, pos); // 取参数名
        var value = pairs[i].substring(pos + 1); // 取参数值
        value = decodeURIComponent(value); // 若需要，则解码
        args[argname] = value; // 存成对象的一个属性
    }
    return args; // 返回此对象
}
//退出登录
function outLoginStart(){
    $.ajax({
        url: mainUrl + "logout",
        data: "",
        dataType: "JSON",
        success: function (data) {
            debug(data);
            //if (data.retcode == 0000) {
            //
            //} else {
            //    alert("系统繁忙，请稍后再试！");
            //}
            var date = new Date();
            date.setTime(date.getTime() - (30 * 60 * 1000));
            $.cookie("username",null,{path:"/",expires: date });
            $.cookie("useropen",null,{path:"/",expires: date });
            $.cookie("isopen",null,{path:"/",expires: date });
            $.cookie("isweixin",null,{path:"/",expires: date });
            $.cookie("imgurl",null,{path:"/",expires: date });
            $.cookie("sn",null,{path:"/",expires: date });
            window.location.href=mainUrl+"home.html";
        },
        error: function(data){
            //alert("系统繁忙，请稍后再试！");
            var date = new Date();
            date.setTime(date.getTime() - (30 * 60 * 1000));
            $.cookie("username",null,{path:"/",expires: date });
            $.cookie("useropen",null,{path:"/",expires: date });
            $.cookie("isopen",null,{path:"/",expires: date });
            $.cookie("isweixin",null,{path:"/",expires: date });
            $.cookie("imgurl",null,{path:"/",expires: date });
            $.cookie("sn",null,{path:"/",expires: date });
            window.location.href=mainUrl+"home.html";
        }
    });
}
//登录
function loginStart(){
    loginToken();
    if( $('#login-cont').html()){
        $('#login-cont').show();
        if($.cookie().usermemory){
            $('.login-rem-pass').addClass('act');
            $('.login-phone').val($.cookie().usermemory);
            debug(1)
        }
    }else {
        $('#login-cont').show();
        $('#login-cont').load(mainUrl+'pcweb/home/login.html',function(){
            var loginJs = '<script src="'+mainUrl+'pcweb/js/home/login.js?t=20170308"></script>';
            $('head').append(loginJs);
            if($.cookie().usermemory){
                $('.login-rem-pass').addClass('act');
                $('.login-phone').val($.cookie().usermemory);
                debug(1)
            }
        });
    }
    $('.home-layer').show();
}
//注册
function registerStart(){
    //loginToken();
    //if( $('#register-cont').html()){
    //    $('#registerCont').show();
    //    $('#register-cont').show();
    //    $(".reg-image").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
    //}else {
    //    $('#register-cont').show();
    //    $('#register-cont').load(mainUrl+'pcweb/home/register.html',function(){
    //        var registerJs = '<script src="'+mainUrl+'pcweb/js/home/register.js"></script>';
    //        $('head').append(registerJs);
    //        $(".reg-image").attr("src",mainUrl+"IdentCodeGenerateAction?a="+Math.random());
    //    });
    //}
    //$('.home-layer').show();
    window.location.href = mainUrl + 'login/login.html'
}
//获取token
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
//退出登录
//侧边栏

function side(){
    $(document).scroll(function(){
        //debug($(document).scrollTop())
        if($(document).scrollTop() >= 10){
            $('#home-backtop').addClass('active');
        }else{
            $('#home-backtop').removeClass('active');
        }
    });
    $('.home-side ul li div').on('mouseenter',function(){
        $(this).addClass('active');
        if($(this).find('span').hasClass('home-side-phone')){
            $('.home-img-write').show();
        }
        if($(this).find('span').hasClass('home-side-code')){
            $('.home-img-code').show();
        }
    });
    $('.home-side ul li div').on('mouseleave',function(){
        var that = this;
        objSide.timer = setTimeout(function(){
            $(that).removeClass('active');
            if ($(that).find('span').hasClass('home-side-phone')) {
                $('.home-img-write').hide();
            }
            if ($(that).find('span').hasClass('home-side-code')) {
                $('.home-img-code').hide();
            }
        },300);
    });
    $('.home-img-write').on('mouseenter', function () {
        clearInterval(objSide.timer);
        $(this).show();
    });
    $('.home-img-write').on('mouseleave', function () {
        $(this).hide();
        $('.home-side ul li div').removeClass('active');
    });
    $('.home-img-code').on('mouseenter', function () {
        clearInterval(objSide.timer);
        $(this).show();
    });
    $('.home-img-code').on('mouseleave', function () {
        $(this).hide();
        $('.home-side ul li div').removeClass('active');
    });
    $('.home-side-server').on('click',function(){
        qiaoBaidu();
    });
}
function setErrorMsg(errorcode, errormsg) {
    if (errormsg == "" || errormsg == null || errormsg == "undefined" || errormsg == undefined) {
        if (errorcode == 1000) {
            showAlert("请求参数不合法！");
        }
        if (errorcode == 1001) {
            showAlert("您还未登录", loginStart);
        } else if (errorcode == 1005) {
            showAlert("密码格式错误，为6-16位数字、字母、字符");
        } else if (errorcode == 1006) {
            showAlert("手机或邮箱已存在");
        } else if (errorcode == 1007) {
            showAlert("您未开通交易账户", gourl);
        } else if (errorcode == 1008) {
            showAlert("请求参数为空");
        } else if (errorcode == 1009) {
            showAlert("登录名不存在或者密码错误");
        } else if (errorcode == 1010) {
            showAlert("您已开户成功或者签约快钱");
        } else if (errorcode == 1011) {
            showAlert("给定的手机号或邮箱未注册！");
        } else if (errorcode == 1012) {
            showAlert("请先进行风险评估测试", goUrlTest);
        } else if (errorcode == 1020) {
            showAlert("手机号格式错误");
        } else if (errorcode == 1004) {
            showAlert("验证码失效");
        } else if (errorcode == 1023) {
            showAlert("银行卡用户名不能为空")
        } else if (errorcode == 1024) {
            showAlert("银行卡号不能为空")
        } else if (errorcode == 1025) {
            showAlert("银行卡办理网点号不能为空")
        } else if (errorcode == 1031) {
            showAlert("用户没有可以赎回的基金");
        } else if (errorcode == 1033) {
            showAlert("购买金额小于基金最小值");
        } else if (errorcode == 1034) {
            showAlert("基金购买份额太高")
        } else if (errorcode == 1035) {
            showAlert("基金状态不能购买")
        } else if (errorcode == 1037) {
            showAlert("赎回份额大于用户可用份额")
        } else if (errorcode == 1038) {
            showAlert("用户赎回后持有份额小于基金限制最低持有份额，请全部赎回")
        } else if (errorcode == 1039) {
            showAlert("用户赎回份额不能小于该基金限制最低赎回份额");
        } else if (errorcode == 1040) {
            showAlert("用户赎回份额不能大于该基金限制最高赎回份额")
        } else if (errorcode == 1041) {
            showAlert("该基金暂不支持手机购买");
        } else if (errorcode == 1042) {
            showAlert("暂无基金详情");
        } else if (errorcode == 911006) {
            showAlert("快钱返回：错误的卡号校验位");
        } else if (errorcode == 1000) {
            showAlert("请求参数不合法");
        } else {
            showAlert(errorcode);
        }
    } else {
        if (errormsg == "未登录") {
            showAlert(errormsg, loginStart);
        } else {
            showAlert(errormsg);
        }

    }
}
//格式化金额+，保留2位小数
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ','
            + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
//判断业务名称
function getBussessName(code) {
    var bussesname = "";
    if (code == 20) {
        bussesname = "认购";
        return bussesname;
    } else if (code == 22) {
        bussesname = "申购";
        return bussesname;
    } else if (code == 24) {
        bussesname = "赎回";
        return bussesname;
    } else if (code == 36) {
        bussesname = "转换";
        return bussesname;
    } else if (code == 39) {
        bussesname = "定投";
        return bussesname;
    } else if (code == 29) {
        bussesname = "修改分红方式";
        return bussesname;
    } else if (code == 60) {
        bussesname = "定投设置";
        return bussesname;
    } else if (code == 43) {
        bussesname = "分红";
        return bussesname;
    } else if (code == 30) {
        bussesname = "认购确认";
        return bussesname;
    }else {
        bussesname = "认购/申购";
        return bussesname;
    }
}
//判断处理状态
function getstatsName(code) {
    var statsname = "";
    if (code == 00) {
        statsname = "待复核";
        return statsname;
    } else if (code == 01) {
        statsname = "未勾对";
        return statsname;
    } else if (code == 02) {
        statsname = "未报";
        return statsname;
    } else if (code == 03) {
        statsname = "带撤";
        return statsname;
    } else if (code == 04) {
        statsname = "废单";
        return statsname;
    } else if (code == 05) {
        statsname = "已撤";
        return statsname;
    } else if (code == 06) {
        statsname = "已报";
        return statsname;
    } else if (code == 07) {
        statsname = "已确认";
        return statsname;
    } else {
        statsname = "已结束";
        return statsname;
    }
}
//判断银行卡类别
function getbanktype(code) {
    var bankname;
    var bankcode = code.substring(0, 4);
    if (bankcode == "KQ01") {
        bankname = "快钱-工商银行";
        return bankname;
    } else if (bankcode == "KQ02") {
        bankname = "快钱-农业银行";
        return bankname;
    } else if (bankcode == "KQ03") {
        bankname = "快钱-中国银行";
        return bankname;
    } else if (bankcode == "KQ04") {
        bankname = "快钱-建设银行";
        return bankname;
    } else if (bankcode == "KQ05") {
        bankname = "快钱-招商银行";
        return bankname;
    } else if (bankcode == "KQ06") {
        bankname = "快钱-交通银行";
        return bankname;
    } else if (bankcode == "KQ07") {
        bankname = "快钱-中信银行";
        return bankname;
    } else if (bankcode == "KQ08") {
        bankname = "快钱-浦发银行";
        return bankname;
    } else if (bankcode == "KQ09") {
        bankname = "快钱-兴业银行";
        return bankname;
    } else if (bankcode == "KQ10") {
        bankname = "快钱-广发银行";
        return bankname;
    } else if (bankcode == "KQ11") {
        bankname = "快钱-平安银行";
        return bankname;
    } else if (bankcode == "KQ12") {
        bankname = "快钱-华夏银行";
        return bankname;
    } else if (bankcode == "KQ13") {
        bankname = "快钱-光大银行";
        return bankname;
    } else if (bankcode == "KQ14") {
        bankname = "快钱-民生银行";
        return bankname;
    } else if (bankcode == "KQ15") {
        bankname = "快钱-邮储银行";
        return bankname;
    } else if (bankcode == "9001") {
        bankname = "通联-光大银行";
        return bankname;
    } else if (bankcode == "9002") {
        bankname = "通联-平安银行";
        return bankname;
    } else if (bankcode == "9003") {
        bankname = "通联-浦发银行";
        return bankname;
    } else if (bankcode == "9004") {
        bankname = "通联-工商银行";
        return bankname;
    } else if (bankcode == "9005") {
        bankname = "通联-农业银行";
        return bankname;
    } else if (bankcode == "9006") {
        bankname = "通联-建设银行";
        return bankname;
    } else if (bankcode == "9007") {
        bankname = "通联-邮储银行";
        return bankname;
    } else if (bankcode == "9008") {
        bankname = "通联-温州银行";
        return bankname;
    } else if (bankcode == "9009") {
        bankname = "通联-交通银行";
        return bankname;
    } else if (bankcode == "9010") {
        bankname = "通联-民生银行";
        return bankname;
    } else if (bankcode == "9011") {
        bankname = "通联-中国银行";
        return bankname;
    } else if (bankcode == "9012") {
        bankname = "通联-上海银行";
        return bankname;
    } else if (bankcode == "9014") {
        bankname = "通联-大连银行";
        return bankname;
    } else if (bankcode == "9015") {
        bankname = "通联-汉口银行";
        return bankname;
    } else if (bankcode == "9016") {
        bankname = "通联-广发银行";
        return bankname;
    } else if (bankcode == "9017") {
        bankname = "通联-中信银行";
        return bankname;
    } else if (bankcode == "9019") {
        bankname = "通联-兴业银行";
        return bankname;
    } else if (bankcode == "9021") {
        bankname = "通联-招商银行";
        return bankname;
    } else if (bankcode == "8866") {
        bankname = "民生银行";
        return bankname;
    }
}
//处理*****str：字符串，frontLen：前面保留位数，endLen：后面保留位数
function plusXing (str,frontLen,endLen) {
    var len = str.length-frontLen-endLen;
    var xing = '';
    for (var i=0;i<len;i++) {
        xing+='*';
    }
    return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}
//弹出框 只有确认按钮
function showAlert(str, callback) {
    if (false) {
        alert(str);
        if (callback) {
            callback();
        }
    }

    hideAlert();

    var alertBoxMask = $('<div class="alertBoxNew_wave"></div>');

    var alertBox;
    var alertBox_h = '';
    alertBox_h += '<div class="alertContent"><div class="pack">';
    //	alertBox_h += '<h3>提示</h3>';
    alertBox_h += '<h2 class="alertTitle">理财易站提示您！</h2>';
    alertBox_h += '<div class="alertText"><span>' + str + '</span></div>';
    alertBox_h += '<div class="subButton"><a>确认</a></div>';
    alertBox_h += '<div class="clearfix"></div>';
    alertBox_h += '</div></div>';
    alertBox = $(alertBox_h);
    alertBoxMask.append(alertBox);
    setTimeout("console.log('等待500毫秒')", 500)
    $("body").append(alertBoxMask);
    $(".alertContent").height(200);
    var alertMaskH;
    var contH = $(window).width();
    contH = parseInt((contH - 420) / 2);
    $(".alertContent").css("left", contH);
    if ($(document).height() >= $(window).height()) {
        alertMaskH = $(document).height();
    } else {
        alertMaskH = $(window).height();
    }
    $(".alertBoxNew_wave").height(alertMaskH);
    var alertH = $(".alertContent").height();
    $(".alertContent").css("margin-top", -Math.ceil(alertH / 2));
    $(".subButton a").on('click',function () {
        hideAlert();
        if (callback) {
            callback();
        }

    });

}
//隐藏弹出框
function hideAlert() {
    if ($(".alertBoxNew_wave")) {
        $(".alertBoxNew_wave").remove();
    }
}
//弹出框 确认按钮加提示表示
function showAlertHint(str, callback, callback2) {
    if (false) {
        alert(str);
        if (callback) {
            callback();
        }
    }

    hideAlert();

    var alertBoxMask = $('<div class="alertBoxNew_wave"></div>');

    var alertBox;
    var alertBox_h = '';
    alertBox_h += '<div class="alertContent"><div class="pack">';
    alertBox_h += '<img src="../images/advance/sy_gb_logo.jpg" class="alertimg">';
    alertBox_h += '<div class="alertText2 alertTextHint"><span>' + str + '</span></div>';
    alertBox_h += '<div class="subButton"><a class="cancle">取消</a><a class="confirm">确认</a></div>';

    //        _h += '<a class="cancle">' + btn[1] + '</a>';
    //    _h += '<a class="confirm">' + btn[0] + '</a>';
    alertBox_h += '<div class="clearfix"></div>';
    alertBox_h += '</div></div>';
    alertBox = $(alertBox_h);
    alertBoxMask.append(alertBox);

    $("body").append(alertBoxMask);
    $(".alertContent").height(200);
    var alertMaskH;
    var contH = $(window).width();
    contH = parseInt((contH - 420) / 2);
    $(".alertContent").css("left", contH);
    if ($(document).height() >= $(window).height()) {
        alertMaskH = $(document).height();
    } else {
        alertMaskH = $(window).height();
    }
    $(".alertBoxNew_wave").height(alertMaskH);
    var alertH = $(".alertContent").height();
    $(".alertContent").css("margin-top", -Math.ceil(alertH / 2));
    $(".subButton .confirm").click(function () {
        console.log("点击确认按钮！");
        if (callback) {
            callback();
        }
        hideConfirm();
    });

    $(".subButton .cancle").click(function () {
        console.log("点击取消按钮！");

        if (callback2) {
            callback2();
        } else {
            hideConfirm();
        }
    });
}
function hideConfirm() {
    if ($(".alertBoxNew_wave")) {
        $(".alertBoxNew_wave").remove();
    }
}
//跳转到登录页面
function gologin(){
    window.location.href = "../login.html";
}
//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    /////////////////////////////////////////////////
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//百度桥
function qiaoBaidu(){
    $('#qiao-wrap #qiao-icon-group1').removeClass('qiao-mess-wrap-min').addClass('qiao-mess-wrap-center');
    $('#qiao-wrap #qiao-icon-group1').show();
}
$(function(){
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?65d03d39669d074e63b1b209db81ccee";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
//记住账号
    var regPhone = /^1[0-9]{10}$/;
    if($.cookie().useropen){
        var userName = $.cookie().useropen;
    }else if($.cookie().username){
        var userName = $.cookie().username;
    }
    debug(userName);
    if(userName){
        $('.Sign').hide();
        $('.login-back').show();
        if(regPhone.test(userName)){
            userName = userName.substring(0,3)+'****'+userName.substring(userName.length-4);
            $('.login-back .user-name').html(userName);
        }else {
            $('.login-back .user-name').html(userName);
        }
    }
    $('.home-layer').on('click',function(){
        $(this).hide();
        $('#login-cont').hide();
        $('#register-cont').hide();
        $('.user-arg').hide();
        $('#forget-pass').hide();
        $('.intell-test').hide();
    });
    //菜单显示
    $("#short_f").mousemove(function(){
        $('.short_f').slideDown();
    });
    $(".short_f").mouseleave(function(){
        setTimeout(function(){$(".short_f").slideUp()},500);
    });
    $(".short_f").click(function(){
        $(this).slideUp();
    });
    $('#login-back').on('click',function(){
        outLoginStart();
    });
    $("header .menu a").mouseover(function(){

        $(this).children("span").addClass("select").end().siblings().children("span").removeClass("select");
    })
    //打开登录注册界面
    $('#login').on('click',function(){
        loginStart();
    });
    $('#register').on('click',function(){
        registerStart();
    });
    //返回顶部
    $('.home-backtop').on('click',function(){
        var scrollTop = new ScrollTop();
        scrollTop.move();
    });
    side();
    //我的资产登陆提醒
    $("#assets").on('click',function(){
        var username=$.cookie("username");
        assets='assets';
        if(username == "" || username == null || username == undefined|| username == "null"){
            showAlert("您还未登录",loginStart);
        }else{
            window.location.href= mainUrl+"assets/assets.html";
        }
    });
});


//开户跳转
function gourl(){
    window.location.href = "../account/account.html";
}

//开户跳转
function goUrlTest(){
    window.location.href = "../center/my_risk1.html";
}
$(".home-side-server").click(function(event) {
    if ($('#nb_invite_ok').length > 0) {
        $('#nb_invite_ok').click();
    }
});