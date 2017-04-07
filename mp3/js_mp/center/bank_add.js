/**
 * Created by d on 2016/6/11.
 */
var transactionaccountid;
var moneyaccount;
var branchcode;
var addbanks = {};
$(function () {
    //初始化省份
    $.ajax({
        type: "GET",
        url: mainUrl + "mp/data_mp/provinces.json",
        dataType: "json",
        async: true,
        success: function (data) {
            $("#provinces_opaSelect").append('<option value="0" >请选择</option>');
            $("#cities_opaSelect").append('<option value="0" >请选择</option>');
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].name);
                $("#provinces_opaSelect").append('<option value="'+data[i].ProID+'" >'+data[i].name+'</option>');
            };
        },
        error: function (data) {
            alert(data);
        }
    });


    //输入卡号
    $("#bank_num").blur(function(){
        var banknum = $("#bank_num").val();
        if (!checkBanknum(banknum)) {
            showAlert("银行卡格式错误！");
            return false;
        }else{
            var bankNo = $("#bank_num").val();
            showLoading();
            $.ajax({
                type: "GET",
                url: mainUrl + "queryBankCardInfo",
                dataType: "json",
                data: {
                    "cardNumber": bankNo
                },
                async: true,
                success: function (data) {
                    if(data.retcode==0000||data.retcode=="0000"){
                        var binkname=data.data.bank;
                        var province=data.data.province;
                        var city=data.data.city;
                        var binktype=data.data.type;
                        if(binktype=="信用卡"||binktype=="贷记卡"){
                            showAlert("不支持信用卡交易！");
                            hideloading();
                            $("#bank_num").val("");
                            return false;
                        }else {
                            //$("#bank_name").attr("disabled",true);
                            $("#bank_name option").each(function (i) {
                                var binkname1 = $(this).html();
                                //console.log(binkname1);
                                //console.log(binkname);
                                var binkname2 = binkname1.substring(binkname1.length - 4, binkname1.length);
                                //console.log(binkname2);
                                if (binkname1.substring(binkname1.length - 4, binkname1.length) == binkname) {
                                    $(this).prop("selected", true);
                                    $("#bank_name").attr("disabled",true);
                                    return false;
                                }else{
                                    $("#bank_name").attr("disabled",false);
                                }
                            });
                            if(province==""||province==null||province==undefined){
                                $("#provinces_opaSelect").attr("disabled",false);
                                $("#cities_opaSelect").attr("disabled",false);

                            }else {
                                //$("#provinces_opaSelect").attr("disabled", true);
                                $("#provinces_opaSelect option").each(function (i) {
                                    var province1 = $(this).html();
                                    //console.log(province1);
                                    if (province1.substring(0, province.length) == province) {
                                        $(this).prop("selected", true);
                                        $("#provinces_opaSelect").attr("disabled", true);
                                        return false;

                                    }else{
                                        $("#provinces_opaSelect").attr("disabled", false);
                                    }
                                });
                                var province1=$("#provinces_opaSelect option:selected").val();
                                if(city==""||city==null||city==undefined){
                                    $("#cities_opaSelect").attr("disabled",false);
                                    console.log(province1);
                                    linkage_city(province1);
                                }else if(city===" "){
                                    console.log(province1);
                                    console.log(222);
                                    $("#cities_opaSelect").attr("disabled",false);
                                    linkage_city(province1);
                                }else{
                                    $("#cities_opaSelect").attr("disabled",true);
                                    $("#cities_opaSelect").append('<option selected="selected">'+city+'</option>');
                                }
                            }

                            /*if(city==""||city==null||city==undefined){
                                $("#cities_opaSelect").attr("disabled",false);

                            }else{
                                $("#cities_opaSelect").append('<option selected="selected">'+city+'</option>');
                                $("#cities_opaSelect").attr("disabled",true);
                            }*/
                            hideloading();

                        }



                    }else{
                        hideloading();
                        //setErrorMsg(data.retcode, data.retmsg);
                    }

                },
                error: function (data) {
                    hideloading();
                    //setErrorMsg(data.retcode, data.retmsg);
                }
            });

        }
    });




    $("#smsCode").unbind("click").click(function () {
        var phone = $("#phone").val();
        var that = $(this);
        var str1 = /^1[3-8]{1}\d{9}$/;
        var cardId = $("#cardNo").val();
        var name = $.cookie("username");
        var bankname = $(".opaSelect option:selected").html();
        var chanilid;
        if (bankname == "选择银行") {
            showAlert("请选择存入银行");
            return false;
        } else {
            chanilid = $(".bank_sel").val();
        }

        var banknum = $("#bank_num").val();
        if (!checkBanknum(banknum)) {
            showAlert("银行卡号错误");
            return false;
        }

        if (phone == "") {
            showAlert("手机不能为空！");
            return false;
        }

        if (!str1.test(phone)) {
            showAlert("手机号格式错误！"); //"手机号格式错误！"
            return false;
        }
        var wait = 60;

        function time(o) {
//			var that = o;
            if (wait == 0) {
                //                $("#smsCode").removeClass("gray_bj");
                o.attr("class", "smsCode");
                o.addClass("n_yzc");
                o.val("获取验证码");
                o.removeAttr("disabled");
                wait = 60;
            } else {
                //                $("#smsCode").addClass("gray_bj");

                var  flag=setInterval(function(){
                    //do
                    //
                    o.attr("class", "gray_bj");
                    o.addClass("n_yzc");
                    o.attr("disabled", true);
                    o.val("(" + wait + ")重新获取");
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
            url: mainUrl + "bmsgsend",
            data: {
                "bgsend.mobiletelno": phone,
                "bgsend.certificateno": cardId,
                "bgsend.depositacctname": name,
                "bgsend.certificatetype":0,
                "bgsend.depositacct": banknum,
                "bgsend.channelid": chanilid
            },
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                hideloading();
                if (data.retcode == 0000) {
                    time(that);
                    addbanks.flag = true;
                    addbanks.token = data.data.token;
                    $("#code").attr("data-flag", 0);
                    $(".account_list li:eq(6)").show();
                } else if (data.retcode == 1010) {
                    addbanks.flag = true;
                    addbanks.token = "";
                    $("#code").attr("data-flag", 1);
                    $(".account_list li:eq(6)").show();
                    showAlert("您已在快钱签约，请直接点击下一步进行绑卡！");
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                hideloading();
                alert("请稍后重试！");
            }
        })
    })
    infoDelete();

});

$("#next").unbind("click").click(function () {
    if(!addbanks.flag){
        return false;
    }else{
        $(this).css("color","#ffffff");
    }
    var phone = $("#phone").val();
    var str1 = /^1[3-8]{1}\d{9}$/;
    var cardId = $("#cardNo").val();
    var name = $.cookie("username");
    var bankname = $(".opaSelect option:selected").html();
    var depositprov=$("#provinces_opaSelect").find("option:selected").text();//开户省份
    var depositcity=$("#cities_opaSelect").find("option:selected").text();//开户市

    var chanilid;
    if (bankname == "选择银行") {
        showAlert("请选择存入银行");
        return false;
    } else {
        chanilid = $(".bank_sel").val();
    }

    var banknum = $("#bank_num").val();
    if (!checkBanknum(banknum)) {
        showAlert("银行卡号错误");
        return false;
    }

    if (phone == "") {
        showAlert("手机不能为空！");
        return false;
    }

    if (depositprov == "请选择") {
        showAlert("省份不能为空！");
        return false;
    }

    if (depositcity == "请选择") {
        showAlert("城市不能为空！");
        return false;
    }

    if (!str1.test(phone)) {
        showAlert("手机号格式错误！"); //"手机号格式错误！"
        return false;
    }
    //var smsflag = $("#code").val();
    var smsflag = $("#code").attr("data-flag");
    var pwvalue = $("#pw").val();
    if (pwvalue == "" || pwvalue.length < 6) {
        showAlert("密码为6-16位字母！");
        return false;
    }
    if (smsflag == 1) {
        hideloading();
        showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "addCardList",
            data: {
                "addCardBean.mobileno": phone,
                "addCardBean.certificateno": cardId,
                "addCardBean.depositacctname": name,
                "addCardBean.depositname": name,
                "addCardBean.depositacct": banknum,
                "addCardBean.channelid": chanilid,
                "addCardBean.tpasswd": pwvalue,
                "addCardBean.channelname":bankname,
                "addCardBean.depositprov":depositprov,
                "addCardBean.depositcity":depositcity
            },
            dataType: "JSON",
            success: function (data) {
                hideloading();
                if (data.retcode == 0000) {
                    window.location.href = "bank_right.html";

                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                hideloading();
                alert("请稍后重试！");
            }
        })
    } else {
        var smscode = $("#code").val();
        if (smscode == "" || smscode == null||smscode.length!=6) {
            showAlert("验证码为6位数字！");
            return false;
        } else {
            hideloading();
            showLoading();
            $.ajax({
                type: "post",
                url: mainUrl + "addCardList",
                data: {
                    "addCardBean.mobileno": phone,
                    "addCardBean.certificateno": cardId,
                    "addCardBean.depositacctname": name,
                    "addCardBean.depositname": name,
                    "addCardBean.depositacct": banknum,
                    "addCardBean.channelid": chanilid,
                    "addCardBean.tpasswd": pwvalue,
                    "addCardBean.verificationCode": smscode,
                    "addCardBean.token": addbanks.token,
                    "addCardBean.channelname":bankname,
                    "addCardBean.depositprov":depositprov,
                    "addCardBean.depositcity":depositcity
                },
                dataType: "JSON",
                success: function (data) {
                    hideloading();
                    if (data.retcode == 0000) {
                        window.location.href = "bank_right.html";

                    }else if(data.retcode=="91-409999999"){
                        //$("#code").attr("data-flag", 0);
                        $("#pw").val("");//清空交易密码重新输入
                        showAlert("交易密码错误！");

                    } else {
                        setErrorMsg(data.retcode, data.retmsg);
                    }
                },
                error: function (data) {
                    hideloading();
                    alert("请稍后重试！");
                }
            })
        }
    }
});


function infoDelete() {
    $("#bank_num").focus(function () {
        $(this).siblings("[data_rest='ID_rest']").show();
    });
    $("#bank_num").blur(function () {
        var bank_num = $(this).val();
        if (bank_num == "") {
            $(this).siblings("[data_rest='ID_rest']").hide();
        }
    });
    $("#cardNo").focus(function () {
        $(this).siblings("[data_rest='ID_rest']").show();
    });
    $("#cardNo").blur(function () {
        var cardNo = $(this).val();
        if (cardNo == "") {
            $(this).siblings("[data_rest='ID_rest']").hide();
        }
    });
    $("#phone").focus(function () {
        $(this).siblings("[data_rest='ID_rest']").show();
    });
    $("#phone").blur(function () {
        var phone = $(this).val();
        if (phone == "") {
            $(this).siblings("[data_rest='ID_rest']").hide();
        }
    });
    $("#pw").focus(function () {
        $(this).siblings("[data_rest='ID_rest']").show();
    });
    $("#pw").blur(function () {
        var pw = $(this).val();
        if (pw == "") {
            $(this).siblings("[data_rest='ID_rest']").hide();
        }
    });
    $("[data_rest='ID_rest']").click(function () {
        $(this).siblings("input").val("");
        $(this).hide();
    });
}

function checkBanknum(val) {
    if (val == "" || val == null) {
        return false;
    }
    val = val.replace(/\s/g, '');
    //	value = trim(value);
    return /^[0-9]{6,30}$/.test(val);
}



//省份联动市
function linkage_city(province_value){
    $("#cities_opaSelect").val("");
    $(".cities_name").text("市");
    $("#cities_opaSelect").empty();
    $.ajax({
        type: "GET",
        url: mainUrl + "m/data/cities.json",
        dataType: "json",
        async: true,
        success: function (data) {
            $("#cities_opaSelect").append('<option value="0" >请选择</option>');
            for (var i = 0; i < data.length; i++) {
                var ProID = data[i].ProID;
                if(ProID == province_value){
                    $("#cities_opaSelect").attr("disabled", false);
                    $("#cities_opaSelect").append('<option value="'+data[i].CityID+'" >'+data[i].name+'</option>');
                }
            };
        },
        error: function (data) {
            alert(data);
        }
    });
}
/*function bankAdd(){
 var cardNo = $("#cardNo").val();
 //判断身份证号
 if (cardNo == "" || cardNo == null) {
 showAlert("身份证号不能为空");
 return false;
 } else {
 if (!checkIdNum(cardNo)) {
 showAlert("身份格式错误")
 return false;
 };
 }
 }*/