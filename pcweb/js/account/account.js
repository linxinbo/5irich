/**
 * Created by linxi on 2016/12/16.
 */
var addbanks = {};
$(function() {
    //var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    //var isweixin = $.cookie("isweixin");
    //var imgurl = $.cookie("imgurl");
    //var sn = $.cookie("sn");
    if (username == "" || username == null || username == undefined || username == "null") {
        showAlert("您没有登录！",loginStart);
        return false;
    } else {
        //后台判断用户是否登录的接口
        $.ajax({
            url: mainUrl + "getLoginUserInfoForRequest",
            data: "",
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                //console.log(data);
                if (data.data.status){
                    //mybanklist();
                    //查看支持银卡列表
                    $('.banklist').mousemove(function(){
                        $('.banklist_c').show();
                        $('.jiao').show();
                    });
                    $('.banklist').mouseout(function(){
                        $('.banklist_c').hide();
                        $('.jiao').hide();
                    });
                    //$(".cardNo").val(sn);//身份证号码
                    //$(".username").val(username);//姓名
                    //初始化省份
                    nitiProvinces();
                    //获取银行列表
                    searchBank();

                    //银行卡号自动连续银行和省份城市
                    insideBankCard();

                    //点击获取验证码
                    $('.code_btn').on('click',function(){
                        if(addcardVerify().addcardBank_num && addcardVerify().addcardBank_name && addcardVerify().addcardProvinces_opaSelect && addcardVerify().addcardCities_opaSelect && addcardVerify().addcardUsername && addcardVerify().addcardCardNo && addcardVerify().addcardPhone){
                            getBankCode();
                        }else{
                            showAlert("请填写完整信息！");
                        }
                    });

                    //绑定卡
                    $('.purchase_submit').on('click',function(){
                        if(addcardVerify().addcardBank_num && addcardVerify().addcardBank_name && addcardVerify().addcardProvinces_opaSelect && addcardVerify().addcardCities_opaSelect && addcardVerify().addcardUsername && addcardVerify().addcardCardNo && addcardVerify().addcardPhone && addcardVerify().addcardPw&& addcardVerify().addcardPw1&& addcardVerify().addcardPwbalance&& addcardVerify().addcardEmail&& addcardVerify().addcardYes){
                            openStep();
                        }else {
                            //alert('请填写完整信息！');
                            $(".bugmsg").html('请填写完整信息！');
                            $("#bugmsg").show();
                        }
                    });








                }else{
                    //window.location.href = "../login.html";
                    showAlert(data.data.msg, loginStart);

                }
            }
        });



    }


    //绑定银行卡
    function openStep(){
        if(!addbanks.flag){
            return false;
        }
        var smsflag = $(".code").attr("data-flag");
        //已经在块钱绑定过一次的开户接口
        var userBankInfo = addcardMsg();
        if (smsflag == 1) {
            $.ajax({
                type: "post",
                url: mainUrl + "bmsgcheck",
                data: {

                    "bgcgeck.mobileno": userBankInfo.phone,
                    "bgcgeck.certificatetype": 0,
                    "bgcgeck.certificateno": userBankInfo.cardNo,
                    "bgcgeck.vailddate": "",
                    "bgcgeck.investorsbirthday": "",
                    "bgcgeck.channelid": userBankInfo.chanilid,
                    "bgcgeck.channelname": userBankInfo.bank_name,
                    "bgcgeck.bankname": "",
                    "bgcgeck.depositacctname": userBankInfo.username,
                    "bgcgeck.depositacct": userBankInfo.bank_num,
                    "bgcgeck.token": "",
                    "bgcgeck.verificationcode": "",
                    "bgcgeck.email": userBankInfo.email,
                    "bgcgeck.tpasswd": userBankInfo.pw,
                    "bgcgeck.depositprov": userBankInfo.provinces_opaSelect,
                    "bgcgeck.depositcity": userBankInfo.cities_opaSelect

                    ///////////////////////////////////
                    /*"addCardBean.mobileno": userBankInfo.phone,
                    "addCardBean.certificateno": userBankInfo.cardNo,
                    "addCardBean.depositacctname": userBankInfo.username,
                    "addCardBean.depositname": userBankInfo.username,
                    "addCardBean.depositacct": userBankInfo.bank_num,
                    "addCardBean.channelid": userBankInfo.chanilid,
                    "addCardBean.tpasswd": userBankInfo.pw,
                    "addCardBean.channelname":userBankInfo.bank_name,
                    "addCardBean.depositprov":userBankInfo.provinces_opaSelect,
                    "addCardBean.depositcity":userBankInfo.cities_opaSelect*/
                },
                dataType: "JSON",
                success: function (data) {
                    //hideloading();
                    if (data.retcode == 0000) {
                        window.location.href = "account_right.html";

                    } else {

                        //setErrorMsg(data.retcode, data.retmsg);
                        $(".bugmsg").html(data.retmsg);
                        $("#bugmsg").show();
                    }
                },
                error: function (data) {
                    //hideloading();
                    //alert("请稍后重试！");
                    $(".bugmsg").html("网络错误，请稍后重试！");
                    $("#bugmsg").show();
                }
            })
        } else {
            if (!addcardVerify().addcardCode) {
                $('.yanzhengma').html('验证码格式不正确');
                $('.yanzhengma').show();
                return false;
            }
            $.ajax({
                type: "post",
                url: mainUrl + "bmsgcheck",
                data: {
                    "bgcgeck.mobileno": userBankInfo.phone,
                    "bgcgeck.certificatetype": 0,
                    "bgcgeck.certificateno": userBankInfo.cardNo,
                    "bgcgeck.vailddate": "",
                    "bgcgeck.investorsbirthday": "",
                    "bgcgeck.channelid": userBankInfo.chanilid,
                    "bgcgeck.channelname": userBankInfo.bank_name,
                    "bgcgeck.bankname": "",
                    "bgcgeck.depositacctname": userBankInfo.username,
                    "bgcgeck.depositacct": userBankInfo.bank_num,
                    "bgcgeck.token": addbanks.token,
                    "bgcgeck.verificationcode": userBankInfo.code,
                    "bgcgeck.email": userBankInfo.email,
                    "bgcgeck.tpasswd": userBankInfo.pw,
                    "bgcgeck.depositprov": userBankInfo.provinces_opaSelect,
                    "bgcgeck.depositcity": userBankInfo.cities_opaSelect
                    ////////////////////////
                    /*"addCardBean.mobileno": userBankInfo.phone,
                    "addCardBean.certificateno": userBankInfo.cardNo,
                    "addCardBean.depositacctname": userBankInfo.username,
                    "addCardBean.depositname": userBankInfo.username,
                    "addCardBean.depositacct": userBankInfo.bank_num,
                    "addCardBean.channelid": userBankInfo.chanilid,
                    "addCardBean.tpasswd": userBankInfo.pw,
                    "addCardBean.verificationCode": userBankInfo.code,
                    "addCardBean.token": addbanks.token,
                    "addCardBean.channelname":userBankInfo.bank_name,
                    "addCardBean.depositprov":userBankInfo.provinces_opaSelect,
                    "addCardBean.depositcity":userBankInfo.cities_opaSelect*/
                },
                dataType: "JSON",
                success: function (data) {
                    //hideloading();
                    if (data.retcode == 0000) {
                        window.location.href = "account_right.html";

                    } else {
                        //setErrorMsg(data.retcode, data.retmsg);
                        //错误信息增加
                        $(".bugmsg").html(data.retmsg);
                        $("#bugmsg").show();
                    }
                },
                error: function (data) {
                    //hideloading();
                    //alert("请稍后重试！");
                    $(".bugmsg").html("网络错误，请稍后重试！");
                    $("#bugmsg").show();
                }
            })

        }



    }


    //获取验证吗
    function getBankCode(){
        $.ajax({
            type: "post",
            url: mainUrl + "bmsgsend",
            data: {
                "bgsend.mobiletelno": addcardMsg().phone,
                "bgsend.certificateno": addcardMsg().cardNo,
                "bgsend.depositacctname": addcardMsg().username,
                "bgsend.certificatetype":0,
                "bgsend.depositacct": addcardMsg().bank_num,
                "bgsend.channelid": addcardMsg().chanilid
            },
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                //hideloading();
                if (data.retcode == 0000) {
                    time($(".code_btn"));
                    addbanks.flag = true;
                    addbanks.token = data.data.token;
                    $(".code").attr("data-flag", 0);
                    $("#tradepw").show();
                } else if (data.retcode == 1010) {
                    addbanks.flag = true;
                    addbanks.token = "";
                    $(".code").attr("data-flag", 1);
                    $("#tradepw").show();
                    //alert("您已在快钱签约，请直接点击下一步进行绑卡！");
                    $(".bugmsg").html("您已在快钱签约，请输入交易密码，直接进行开户！");
                    $("#bugmsg").show();
                } else {
                    //alert(data.retcode, data.retmsg);
                    $(".bugmsg").html(data.retmsg);
                    $("#bugmsg").show();
                }
            },
            error: function (data) {
                //hideloading();
                //alert("请稍后重试！");
                $(".bugmsg").html("网络错误，请稍后重试！");
                $("#bugmsg").show();
            }
        })

    }


    //计时器验证码
    var wait = 60;
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

    //刷新银行列表
    function searchBank() {
        //showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "paysite",
            data: {},
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                if (data.retcode == 0000) {
                    //刷新列表
                    $(data.data).each(function (i, n) {
                        var html = '<option data_a="KQ01A00000507" data_b="492" data_c="315" value="' + n.channelid + '">' + n.channelname + '</option>';
                        $("select.bank_name").append(html);
                    });

                } else {
                    $(".bank_name_error").html("获取银行卡列表失败！");
                    $(".bank_name_error").show();
                }
            },
            error: function (data) {
                //hideloading();
                alert("服务器错误，请稍后重试！");
            }
        })
    }

    //自动联想银行卡所属银行名称省份城市
    function insideBankCard(){
        //输入卡号
        $(".bank_num").blur(function(){
            var banknum5 = $(".bank_num").val();
            if (!checkBanknum(banknum5)) {
                //alert("银行卡格式错误！");
                $(".bankerrormsg").html("银行卡格式错误！");
                $(".bankerrormsg").show();
                return false;
            }else{
                var bankNo = $(".bank_num").val();
                //showLoading();
                $.ajax({
                    type: "GET",
                    url: mainUrl + "queryBankCardInfo",
                    dataType: "json",
                    data: {
                        "cardNumber": bankNo
                    },
                    //async: true,
                    success: function (data) {
                        if(data.retcode==0000||data.retcode=="0000"){
                            var binkname=data.data.bank;
                            var province=data.data.province;
                            var city=data.data.city;
                            var binktype=data.data.type;
                            if(binktype=="信用卡"||binktype=="贷记卡"){
                                alert("不支持信用卡交易！");
                                //hideloading();
                                $(".bank_num").val("");
                                return false;
                            }else {
                                //$("#bank_name").attr("disabled",true);
                                $(".bank_name option").each(function (i) {
                                    var binkname1 = $(this).html();
                                    //console.log(binkname1);
                                    //console.log(binkname);
                                    //var binkname2 = binkname1.substring(binkname1.length - 4, binkname1.length);
                                    //console.log(binkname2);
                                    if (binkname1.substring(binkname1.length - 4, binkname1.length) == binkname) {
                                        $(this).prop("selected", true);
                                        $(".bank_name").attr("disabled",true);
                                        return false;
                                    }else{
                                        $(".bank_name").attr("disabled",false);
                                    }
                                });
                                if(province==""||province==null||province==undefined){
                                    $(".provinces_opaSelect").prop("disabled",false);
                                    $(".cities_opaSelect").attr("disabled",false);
                                }else {
                                    //$("#provinces_opaSelect").attr("disabled", true);
                                    $(".provinces_opaSelect option").each(function (i) {
                                        var province1 = $(this).html();
                                        //console.log(province1);
                                        if (province1.substring(0, province.length) == province) {
                                            $(this).prop("selected", true);
                                            $(".provinces_opaSelect").attr("disabled", true);
                                            return false;

                                        }else{
                                            $(".provinces_opaSelect").attr("disabled", false);
                                        }
                                    });
                                    var province1=$(".provinces_opaSelect option:selected").val();
                                    if(city==""||city==null||city==undefined){
                                        $(".cities_opaSelect").attr("disabled",false);
                                        //console.log(province1);
                                        linkage_city(province1);
                                    }else if(city===" "){
                                        console.log(province1);
                                        //console.log(222);
                                        $(".cities_opaSelect").attr("disabled",false);
                                        linkage_city(province1);
                                    }else{
                                        $(".cities_opaSelect").attr("disabled",true);
                                        $(".cities_opaSelect").append('<option selected="selected">'+city+'</option>');
                                    }

                                }

                               /* if(city==""||city==null||city==undefined){
                                    $(".cities_opaSelect").attr("disabled",false);

                                }else{
                                    $(".cities_opaSelect").append('<option selected="selected">'+city+'</option>');
                                    $(".cities_opaSelect").attr("disabled",true);
                                }*/
                                //hideloading();

                            }



                        }else{
                            //hideloading();
                            setErrorMsg(data.retcode, data.retmsg);

                        }

                    },
                    error: function (data) {
                        //hideloading();
                        setErrorMsg(data.retcode, data.retmsg);
                    }
                });

            }
        });
    };

    //阅读开户协议
    $(".account_agreement").on("click",function(){
        showmask();
        $(".khxy").show();
    });
    $(".khxy_close").on("click",function(){
        $(".khxy").hide();
        hidemask();
    });
    $(".khxy_true").on("click",function(){
        $(".khxy").hide();
        hidemask();
    });

    //阅读银行授权书
    $(".account_sqs").on("click",function(){
        showmask();
        $(".bank_sqs").show();
    });
    $(".bank_sqs_close").on("click",function(){
        $(".bank_sqs").hide();
        hidemask();
    });
    $(".bank_sqs_true").on("click",function(){
        $(".bank_sqs").hide();
        hidemask();
    });

    //阅读风险提示
    $(".account_fx").on("click",function(){
        showmask();
        $(".fxts").show();
    });
    $(".fxts-close").on("click",function(){
        $(".fxts").hide();
        hidemask();
    });
    $(".fxts-true").on("click",function(){
        $(".fxts").hide();
        hidemask();
    });



    //初始化省份
    function nitiProvinces(){
        $.ajax({
            type: "GET",
            //url: mainUrl + "pcweb/data/provinces.json",//测试环境
            url: mainUrl + "data/provinces.json",//生产环境
            dataType: "json",
            async: true,
            success: function (data) {
                $(".provinces_opaSelect").append('<option value="0" >选择省</option>');
                $(".cities_opaSelect").append('<option value="0" >选择市</option>');
                for (var i = 0; i < data.length; i++) {
                    //console.log(data[i].name);
                    $(".provinces_opaSelect").append('<option value="'+data[i].ProID+'" >'+data[i].name+'</option>');
                };
            },
            error: function (data) {
                showAlert(data);
            }
        });
    }


    //遮罩层
    function showmask(){
        var alertBoxMask = $('<div class="alertBoxNew_wave"></div>');
        $("body").append(alertBoxMask);
        var alertMaskH;
        if ($(document).height() >= $(window).height()) {
            alertMaskH = $(document).height();
        } else {
            alertMaskH = $(window).height();
        }
        $(".alertBoxNew_wave").height(alertMaskH);

    }
    //隐藏遮罩层
    function hidemask() {
        if ($(".alertBoxNew_wave")) {
            $(".alertBoxNew_wave").remove();
        }
    }




    //错误提示，表单验证
    $('.addinput').on('blur',function(){
        if($(this).hasClass('bank_num')){
            if(!addcardVerify().addcardBank_num){
                $(this).next().html("银行卡格式错误");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('bank_name')){
            if(!addcardVerify().addcardBank_name){
                $(this).next().html("请选择银行名称");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('provinces_opaSelect')){
            if(!addcardVerify().addcardProvinces_opaSelect){
                $('.chengshi').html('请选择省份');
                $('.chengshi').show();
            }else {
                $('.chengshi').hide();
            }
        }
        if($(this).hasClass('cities_opaSelect')){
            if(!addcardVerify().addcardCities_opaSelect){
                $('.chengshi').html('请选择城市');
                $('.chengshi').show();
            }else {
                $('.chengshi').hide();
            }
        }
        if($(this).hasClass('username')){
            if(!addcardVerify().addcardUsername){
                $(this).next().html("姓名不能为空");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('cardNo')){
            if(!addcardVerify().addcardCardNo){
                $(this).next().html("身份证号码格式不正确");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('phone')){
            if(!addcardVerify().addcardPhone){
                $(this).next().html("手机号格式不正确");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('code')){
            if(!addcardVerify().addcardCode){
                $('.yanzhengma').html('验证码格式不正确');
                $('.yanzhengma').show();
            }else {
                $('.yanzhengma').hide();
            }
        }
        if($(this).hasClass('pw')){
            if(!addcardVerify().addcardPw){
                $(this).next().html("交易密码不符合规则");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('pw1')){
            if(!addcardVerify().addcardPw1){
                $(this).next().html("交易密码不符合规则");
                $(this).next().show();
            }else if(!addcardVerify().addcardPwbalance){
                $(this).next().html("两次输入密码不一致");
                $(this).next().show();

            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('email')){
            if(!addcardVerify().addcardEmail){
                $(this).next().html("邮箱不符合规则");
                $(this).next().show();
            }else {
                $(this).next().hide();
            }
        }
        if($(this).hasClass('yes')){
            if(!addcardVerify().addcardYes){
                $('.yes_error1').html('请阅读开户协议');
                $('.yes_error').show();
            }else {
                $('.yes_error').hide();
            }
        }
    });

    //验证表单数据
    function addcardVerify(){
        var verify = {};
        verify.addcardVer = true;
        verify.addcardBank_num = true;
        verify.addcardBank_name = true;
        verify.addcardChanilid = true;
        verify.addcardProvinces_opaSelect = true;
        verify.addcardCities_opaSelect = true;
        verify.addcardUsername = true;
        verify.addcardCardNo = true;
        verify.addcardPhone = true;
        verify.addcardCode = true;
        verify.addcardPw = true;
        verify.addcardPw1 = true;
        verify.addcardPwbalance = true;
        verify.addcardEmail = true;
        verify.addcardYes = true;
        var user = addcardMsg();
        var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;

        //验证银行卡
        if(!checkBanknum(user.bank_num)){
            verify.addcardBank_num = false;
            verify.regVer = false;
        }
        if(user.bank_name =="" ||user.bank_name =="选择银行"){
            verify.addcardBank_name = false;
            verify.regVer = false;
        }
        if(user.chanilid ==""){
            verify.addcardChanilid = false;
            verify.regVer = false;
        }
        if(user.provinces_opaSelect =="" ||user.provinces_opaSelect=="选择省"){
            verify.addcardProvinces_opaSelect = false;
            verify.regVer = false;
        }
        if(user.cities_opaSelect =="" ||user.cities_opaSelect=="选择市"){
            verify.addcardCities_opaSelect = false;
            verify.regVer = false;
        }
        //验证用户名
        if(user.username==""){
            verify.addcardUsername = false;
            verify.regVer = false;
        }
        //验证身份证号码
        if(user.cardNo==""||!checkIdNum(user.cardNo)||user.cardNo==null){
            verify.addcardCardNo = false;
            verify.regVer = false;
        }
        //验证手机号码
        if(!regPhone.test(user.phone)){
            verify.addcardPhone = false;
            verify.regVer = false;
        }
        if(user.code.length != 6||user.code==""||user.code==null){
            verify.addcardCode = false;
            verify.regVer = false;
        }
        if(user.pw == "" || user.pw.length<6){
            verify.addcardPw = false;
            verify.regVer = false;
        }
        if(user.pw1 == "" || user.pw1.length<6){
            verify.addcardPw1 = false;
            verify.regVer = false;
        }
        if(user.email == "" || !valiEmail(user.email)){
            verify.addcardEmail = false;
            verify.regVer = false;
        }
        if(user.pw != user.pw1){
            verify.addcardPwbalance = false;
            verify.regVer = false;
        }
        if(!user.yes){
            console.log(user.yes);
            verify.addcardYes = false;
            verify.regVer = false;
        }
        return  verify;
    }
    //获取表单内容
    function addcardMsg(){
        var addcardMsg = {};
        addcardMsg.bank_num = $('.bank_num').val();
        addcardMsg.bank_name = $(".bank_name option:selected").html();//银行名称
        addcardMsg.chanilid = $(".bank_name").val();//chanilid
        addcardMsg.provinces_opaSelect = $('.provinces_opaSelect option:selected').html();//省份名称
        addcardMsg.cities_opaSelect = $('.cities_opaSelect option:selected').html();//城市名称
        addcardMsg.username = $('.username').val();
        addcardMsg.cardNo = $('.cardNo').val();
        addcardMsg.phone = $('.phone').val();
        addcardMsg.code = $('.code').val();
        addcardMsg.pw = $('.pw').val();
        addcardMsg.pw1 = $('.pw1').val();
        addcardMsg.email = $('.email').val();
        addcardMsg.yes = $('.yes').is(':checked');
        return addcardMsg;
    }
    //银行卡验证
    function checkBanknum(val) {
        if (val == "" || val == null) {
            return false;
        }
        val = val.replace(/\s/g, '');
        //	value = trim(value);
        return /^[0-9]{6,30}$/.test(val);
    }

    //检查id
    function checkIdNum(idValue) {
        //	alert(idValue)
        console.log(idValue);
        if (idValue == "" || idValue == null || idValue == undefined) {
            return false;
        } else {
            return IdentityCodeValid(idValue);
        }
    }
//身份证号合法性验证
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
    function IdentityCodeValid(code) {
        console.log(code);
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        var pass = true;

        if (!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        if (!pass)
        //		alert(tip);
            console.log(tip);
        console.log(pass);
        return pass;
    }
});


//省份联动市
function linkage_city(province_value){
    $(".cities_opaSelect").val("");
    $(".cities_name").text("市");
    $(".cities_opaSelect").empty();
    $.ajax({
        type: "GET",
        //url: mainUrl + "pcweb/data/cities.json",//测试环境
        url: mainUrl + "data/cities.json",//生产环境
        dataType: "json",
        async: true,
        success: function (data) {
            $(".cities_opaSelect").append('<option value="0" >选择市</option>');
            for (var i = 0; i < data.length; i++) {
                var ProID = data[i].ProID;
                if(ProID == province_value){
                    $(".cities_opaSelect").attr("disabled", false);
                    $(".cities_opaSelect").append('<option value="'+data[i].CityID+'" >'+data[i].name+'</option>');
                }
            };
        },
        error: function (data) {
            alert(data);
        }
    });
}


function valiEmail(e) { //验证邮箱
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(e)) {
        return true;
    } else {
        return false;
    }
}