/**
 * Created by linxi on 2016/12/31.
 */
var kaiguan=true;
$(document).ready(function () {

    var args = new getArgs();
    var min_201=args.min_20;
    var min_20 = parseFloat(min_201)*10000;

    if(min_20!=""){
        $(".amount").val(min_20);
    }

    //购买第四部执行购买
    $(".order_cfb").click(function(){

        if(orderformVerify().orderformVer){
            //防止重复提交
            if(kaiguan ){
                kaiguan = false;
                addappt();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }

    });




    //提交预约创富宝
    function addappt(){
        var orderinfo=orderformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "addAppt",
            data: {
                "mppBean.name": orderinfo.username,
                //"fundBean.transactionaccountid": transactionaccountid, //银行卡号
                //"fundBean.branchcode": branchcode, //网点号码
                "mppBean.sn": orderinfo.cardNo, //身份证号码
                "mppBean.tel": orderinfo.phone, //手机号，
                "mppBean.money": orderinfo.amount //资金，
            },
            dataType: "JSON",
            success: function (data) {
                //			data = $.parseJSON(data);
                //hideloading();
                //console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    $(".order_cfb").attr('disabled',"true");
                    window.location.href = "order_right.html";
                } else {
                    //在buyfund.html页面输入的交易密码错误
                    setErrorMsg(data.retcode, data.retmsg);
                    $(".order_cfb").removeAttr("disabled");
                    kaiguan=true;

                }
            },
            error: function (data) {
                $("#order_cfb").removeAttr("disabled");
                kaiguan=true;
                //hideloading();
                showAlert("请稍后重试！网络错误");
            }
        });

    };








    //错误提示，表单验证
    $('.orderinput').on('blur',function(){
        if($(this).hasClass('username')){
            if(!orderformVerify().orderformusername){
                $(".username_error1").html("请输入用户名");
                $(".username_error").show();
            }else {
                $(".username_error").hide();
            }
        }
        if($(this).hasClass('amount')){
            if(!orderformVerify().orderformamount){
                $(".amount_error1").html("请输入金额");
                $(".amount_error").show();
            }else if(!orderformVerify().orderformamountS){
                $(".amount_error1").html("最低预约金额为"+min_20+"元");
                $(".amount_error").show();
            }else {
                $(".amount_error").hide();
            }
        }

        if($(this).hasClass('phone')){
            if(!orderformVerify().orderformphone){
                $(".phone_error1").html("手机号格式不正确");
                $(".phone_error").show();
            }else {
                $(".phone_error").hide();
            }
        }

        if($(this).hasClass('cardNO')){
            if(!orderformVerify().orderformcardNO){
                $(".cardNO_error1").html("身份证号码格式不正确");
                $(".cardNO_error").show();
            }else {
                $(".cardNO_error").hide();
            }
        }

        if($(this).hasClass('yes')){
            if(!orderformVerify().orderformyes){
                $('.yes_error1').html('请阅读协议');
                $('.yes_error').show();
            }else {
                $('.yes_error').hide();
            }
        }

    });






    //验证表单数据
    function orderformVerify(){
        var verify = {};
        verify.orderformVer = true;
        verify.orderformusername = true;
        verify.orderformphone = true;
        verify.orderformcardNO = true;
        verify.orderformamount = true;
        verify.orderformamountS =true;
        verify.orderformyes = true;
        var user = orderformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");
        var regPhone = /^1[0-9]{10}$/;
        var regname=/^[\u4E00-\uFA29]|[\uE7C7-\uE7F3]$/;
        //验证输入金额数字
        if(isNaN(user.amount)||user.amount==""){
            verify.orderformamount = false;
            verify.orderformVer = false;
        }
        //验证输入金额数字
        if(parseFloat(user.amount)<parseFloat(min_20)){
            verify.orderformamountS = false;
            verify.orderformVer = false;
        }
        //验证手机号码
        if(!regPhone.test(user.phone)){
            verify.orderformphone = false;
            verify.orderformVer = false;
        }
        //用户名
        if(user.username ==""||!regname.test(user.username)){
            verify.orderformusername = false;
            verify.orderformVer = false;
        }

        //验证身份证号码
        if(user.cardNo==""||!checkIdNum(user.cardNo)||user.cardNo==null){
            verify.orderformcardNO = false;
            verify.orderformVer = false;
        }


        if(!user.yes){
            console.log(user.yes);
            verify.orderformyes = false;
            verify.orderformVer = false;
        }
        return  verify;
    }

    //获取表单内容
    function orderformMsg(){
        var orderformMsg = {};
        orderformMsg.username = $(".username").val();//银行名称
        orderformMsg.phone = $(".phone").val();//chanilid
        orderformMsg.cardNo = $('.cardNO').val();////资金账户
        orderformMsg.amount = $('.amount').val();//输入金额
        orderformMsg.yes = $('.yes').is(':checked');//协议
        return orderformMsg;
    }

});



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
