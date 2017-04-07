/**
 * Created by d on 2016/5/7.
 */
$(document).ready(function () {

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

});

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
                    $("#cities_opaSelect").append('<option value="'+data[i].CityID+'" >'+data[i].name+'</option>');
                }
            };
        },
        error: function (data) {
            alert(data);
        }
    });
}
//开户第三步用到的参数；
var flagcodego = false;
var token = "";
//获取验证码
$("#smsCode").unbind("click").click(function () {
    $("#valiCode").val("");
    /*var bankname = $(".opaSelect option:selected").html();
    console.log(bankname);*/
    openStep2($(this));
});

//判断银行卡 开户地址 预留手机是否为空。

function openStep2(o) {
    var that = o;
    var args = new getArgs();
    console.log(args.cardNO);
    var name = args.openName;
    var phone = $("#phone").val();
    var bankNo = $("#bankNo").val();
    var channelid = $(".opaSelect").val();
    console.log(channelid);
    console.log(phone);
    if (!checkBankNum()) {
        showAlert("银行卡格式错误！");
        return false;
    }

    if (phone == "" || phone == null) {
        showAlert("手机号不能为空！");
        return false;
    } else {
        if (!checkPhnoeNum()) {
            showAlert("手机号格式错误！");
            return false;
        } else {
            var wait = 120;

            function time(o) {
                if (wait == 0) {
                    //                $("#smsCode").removeClass("gray_bj");
                    o.attr("class", "n_yzc");
                    o.addClass("smsCode");
                    o.val("获取验证码");
                    o.removeAttr("disabled");
                    wait = 120;
                } else {
                    //                $("#smsCode").addClass("gray_bj");
                    o.attr("class", "n_yzc");
                    o.addClass("smsCode");
                    o.attr("disabled", true);
                    o.val("重新发送(" + wait + ")");
                    wait--;
                    setTimeout(function () {
                            time(o);
                        },
                        1000);
                }
            }


            showLoading();
            $.ajax({
                type: "post",
                url: mainUrl + "bmsgsend",
                data: {
                    "bgsend.mobiletelno": phone,
                    "bgsend.certificatetype": 0,
                    "bgsend.certificateno": args.cardNO,
                    "bgsend.depositacctname": name,
                    "bgsend.depositacct": bankNo,
                    "bgsend.channelid": channelid
                },
                dataType: "json",
                async: true,
                success: function (data) {
                    hideloading();
                    console.log("come");
                    if (data.retcode == 0000) {
                        showAlert("验证码已发送");
                        time(that);
                        flagcodego = true;
                        token = data.data.token;
                    } else if (data.retcode == 1010) {
                        flagcodego = true;
                        token = "";
                        $("#code").attr("data-flag", 1);
                        $("#code").hide();
                        showAlert("您已在快钱签约，请直接点击下一步进行绑卡！");
                    } else {
                        setErrorMsg(data.retcode, data.retmsg);
                    }
                },
                error: function (data) {
                    hideLoading();
                    alert(data);
                }
            });
        }
    }

}
//开户第三步
function openStep3() {
    var args = new getArgs();
    var cardNO = args.cardNO;
    var name = args.openName;
    var email = args.email;
    var password = args.password;
    console.log(token);
    console.log(cardNO);
    console.log(name);
    console.log(email);
    console.log(password);
    var phone = $("#phone").val();
    var valiCode = $("#valiCode").val();
    var channelid = $(".opaSelect").val();
    var bankname = $(".opaSelect option:selected").html();
    //console.log(bankname);
    var bankNo = $("#bankNo").val();
    var provinces_value=$("#provinces_opaSelect").val();//开户省份
    var cities_value=$("#cities_opaSelect").val();//开户市
    var provinces_name=$("#provinces_opaSelect").find("option:selected").text();//开户省份
    var cities_name=$("#cities_opaSelect").find("option:selected").text();//开户市
    if (!flagcodego) {
        showAlert("验证码请求出错或者还未请求验证码");
        //		return false;
    }

    if(provinces_value==0||provinces_value=='0'||provinces_value=='undefined'||provinces_value==undefined){
        showAlert("请选择开户省份");
        return;
    }

    if(cities_value==0||cities_value=='0'||cities_value=='undefined'||cities_value==undefined){
        showAlert("请选择开户市");
        return;
    }
    var smsflag = $("#code").attr("data-flag");

    if (smsflag == 1) {
        console.log("开始请求");
        showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "bmsgcheck",
            data: {
                "bgcgeck.mobileno": phone,
                "bgcgeck.certificatetype": 0,
                "bgcgeck.certificateno": cardNO,
                "bgcgeck.vailddate": "",
                "bgcgeck.investorsbirthday": "",
                "bgcgeck.channelid": channelid,
                "bgcgeck.channelname": bankname,
                "bgcgeck.depositprov": "",
                "bgcgeck.depositcity": "",
                "bgcgeck.bankname": "",
                "bgcgeck.depositacctname": name,
                "bgcgeck.depositacct": bankNo,
                "bgcgeck.token": "",
                "bgcgeck.verificationcode": "",
                "bgcgeck.email": email,
                "bgcgeck.tpasswd": password,
                "bgcgeck.depositprov": provinces_name,
                "bgcgeck.depositcity": cities_name
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log("come");
                if (data.retcode == 0000) {
                    showAlert("开户成功");
                    window.location.href = "account_right.html";
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                hideloading();
                alert(data);
            }
        });
    } else {
        if (valiCode == "" || valiCode == null || valiCode.length != 6) {
            showAlert("验证码错误");
            return;
        }
        console.log("开始请求");
        showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "bmsgcheck",
            data: {
                "bgcgeck.mobileno": phone,
                "bgcgeck.certificatetype": 0,
                "bgcgeck.certificateno": cardNO,
                "bgcgeck.vailddate": "",
                "bgcgeck.investorsbirthday": "",
                "bgcgeck.channelid": channelid,
                "bgcgeck.channelname": bankname,
                "bgcgeck.depositprov": "",
                "bgcgeck.depositcity": "",
                "bgcgeck.bankname": "",
                "bgcgeck.depositacctname": name,
                "bgcgeck.depositacct": bankNo,
                "bgcgeck.token": token,
                "bgcgeck.verificationcode": valiCode,
                "bgcgeck.email": email,
                "bgcgeck.tpasswd": password,
                "bgcgeck.depositprov": provinces_name,
                "bgcgeck.depositcity": cities_name
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log("come");
                if (data.retcode == 0000) {
                    showAlert("开户成功");
                    window.location.href = "account_right.html";
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                hideloading();
                alert(data);
            }
        });
    }
}
//检查银行卡位数
function checkBankNum() {
    var value = $("#bankNo").val();
    if (value == "") {
        return false;
    }
    value = value.replace(/\s/g, '');
    //	value = trim(value);
    return /^[0-9]{6,30}$/.test(value);
}
//检查手机验证
function checkPhnoeNum() {
    var value = $("#phone").val();
    return /^1[0-9]{10}$/.test(value);
}