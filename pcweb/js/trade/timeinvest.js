/**
 * Created by linxi on 2016/12/20.
 */
var kaiguan=true;
var buyflag=0;
$(document).ready(function () {
    var args = new getArgs();
    var tano = args.tano;
    var fundcode = args.fundcode;
    var fundname = args.fundname;
    var per_max_39 = args.per_max_39;
    var per_min_39 = args.per_min_39;
    var risklevel = args.risklevel;
    var sharetype = args.sharetype;
    //fundname fundcode插入页面
    $(".investfundname").html(fundname+"("+fundcode+")");






    //加载用户可以使用的银行卡信息
    timeinvestStep2(fundcode);


    //点击定投按钮
    $(".timeinvestfund").click(function(){
        if(investformVerify().investformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                timeinvestStep3();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }
    });

    //查询银行卡单日限额
    $(".amount").blur(function () {
        if (investformVerify().investformbank_name && investformVerify().investformmoney&& investformVerify().investformmoneyS&& investformVerify().investformmoneyD) {
            bank_limit(investformMsg().bank_name,investformMsg().money);
        }
    });

    //输入默认显示
    $(".amount").attr("placeholder", per_min_39+"元起购");

    //验证银行卡单笔限额
    function bank_limit(bankNo,money){
        //showLoading();
        $.ajax({
            type: "get",
            url: mainUrl + "data/banksall.json",
            data: "",
            dataType: "JSON",
            success: function (data){
                console.log(data);
                //hideloading();
                var bankNo1=bankNo.substring(0,7);
                console.log(bankNo1);
                $(data).each(function (i, n) {
                    if(n.name==bankNo1){
                        if(parseFloat(money)>parseFloat(n.singlelimit)){
                            $(".amount_error1").html("您输入的金额大于银行单笔"+n.singlelimit+"元限额，此次购买可能会失败！");
                            $(".amount_error").show();
                        }else{
                            $(".amount_error").hide();
                        }
                    }


                });
            },
            error: function (data) {
                hideloading();
                alert("请稍后重试！");
            }});
    }

    //提交定投
    function timeinvestStep3() {
        console.log("执行第四步购买");
        $(".timeinvestfund").attr('disabled',"true");
        $(".timeinvestfund").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".timeinvestfund").html('正在提交……');
        //showLoading();
        var investinfo=investformMsg();
        var risk = risklevel == '1014' ? 1 : 0;
        $.ajax({
            type: "post",
            url: mainUrl + "castopenapi",
            data: {
                "castOpen.fundcode":fundcode,
                "castOpen.fundname":fundname,
                "castOpen.riskmatching":risk,
                "castOpen.channelid":investinfo.chanilid,
                "castOpen.tpasswd":investinfo.pw,
                "castOpen.tano":tano,
                "castOpen.moneyaccount":investinfo.moneyaccount,
                "castOpen.sharetype":"A",
                "castOpen.firstinvestamount":investinfo.money,
                "castOpen.investperiods":investinfo.cycle1,
                "castOpen.investcyclevalue":investinfo.investday,
                "castOpen.operorg":investinfo.chanilid
            },
            dataType: "JSON",
            success: function (data) {
                //			data = $.parseJSON(data);
                //hideloading();
                //console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    $(".timeinvestfund").attr('disabled',"true");
                    window.location.href = "timeinvest_right.html?fundname=" + fundname + "&fundcode=" + fundcode + "&amount=" + investinfo.money + "&fukuan=" + investinfo.bank_name + "&cycle1=" + investinfo.cycle1 + "&investday=" + investinfo.investday + "";
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                    $(".timeinvestfund").removeAttr("disabled");
                    $(".timeinvestfund").html('确认提交');
                    $(".timeinvestfund").removeClass("purchase_submit1").addClass("purchase_submit");
                    kaiguan=true;
                }
            },
            error: function (data) {
                $(".timeinvestfund").removeAttr("disabled");
                $(".timeinvestfund").html('确认提交');
                $(".timeinvestfund").removeClass("purchase_submit1").addClass("purchase_submit");
                kaiguan=true;
                //hideloading();
                showAlert("请稍后重试！服务器错误");
            }
        });

    }


    //错误提示，表单验证
    $('.investinput').on('blur',function(){
        if($(this).hasClass('bank_no')){
            if(!investformVerify().investformbank_name){
                $(".bank_no_error1").html("请选择支付方式");
                $(".bank_no_error").show();
            }else {
                $(".bank_no_error").hide();
            }
        }
        if($(this).hasClass('amount')){
            if(!investformVerify().investformmoney){
                $(".amount_error1").html("请输入金额");
                $(".amount_error").show();
            }else if(!investformVerify().investformmoneyS){
                $(".amount_error1").html("最低定投金额为"+per_min_39+"元");
                $(".amount_error").show();
            }else if(!investformVerify().investformmoneyD){
                $(".amount_error1").html("最高定投金额为"+per_max_39+"元");
                $(".amount_error").show();
            }else {
                $(".amount_error").hide();
            }
        }

        if($(this).hasClass('cycle')){
            if(!investformVerify().investformcycle){
                $(".cycle_error1").html("请选择定投周期");
                $(".cycle_error").show();
            }else {
                $(".cycle_error").hide();
            }
        }

        if($(this).hasClass('investday')){
            if(!investformVerify().investforminvestday){
                $(".investday_error1").html("请选择定投日");
                $(".investday_error").show();
            }else {
                $(".investday_error").hide();
            }
        }

        if($(this).hasClass('pw')){
            if(!investformVerify().investformpw){
                $(".password_error1").html("交易密码不能为空或小于6位");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

        if($(this).hasClass('yes')){
            if(!investformVerify().investformyes){
                $('.yes_error1').html('请阅读风险提示');
                $('.yes_error').show();
            }else {
                $('.yes_error').hide();
            }
        }

    });

    //验证表单数据
    function investformVerify(){
        var verify = {};
        verify.investformVer = true;
        verify.investformbank_name = true;
        verify.investformchanilid = true;
        verify.investformmoneyaccount = true;
        verify.investformmoney = true;
        verify.investformmoneyS = true;
        verify.investformmoneyD = true;
        verify.investformcycle = true;
        verify.investforminvestday = true;
        verify.investformpw = true;
        verify.investformyes = true;
        var user = investformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");

        //验证输入金额数字
        if(isNaN(user.money)||user.money==""){
            verify.investformmoney = false;
            verify.investformVer = false;
        }
        if(parseFloat(user.money)<parseFloat(per_min_39)){
            verify.investformmoneyS = false;
            verify.investformVer = false;
        }
        if(parseFloat(user.money)>parseFloat(per_max_39)){
            verify.investformmoneyD = false;
            verify.investformVer = false;
        }
        if(user.bank_name =="" ||user.bank_name =="选择银行"){
            verify.investformbank_name = false;
            verify.investformVer = false;
        }

        if(user.chanilid ==""){
            verify.investformchanilid = false;
            verify.investformVer = false;
        }

        if(user.moneyaccount ==""){
            verify.investformmoneyaccount = false;
            verify.investformVer = false;
        }
        if(user.cycle1 =="" ||user.cycle1 =="请选择定投周期"){
            verify.investformcycle = false;
            verify.investformVer = false;
        }
        if(user.investday =="" ||user.investday =="请选择定投日"){
            verify.investforminvestday = false;
            verify.investformVer = false;
        }
        if(user.pw == "" || user.pw.length<6){
            verify.investformpw = false;
            verify.investformVer = false;
        }
        if(!user.yes){
            console.log(user.yes);
            verify.investformyes = false;
            verify.investformVer = false;
        }
        return  verify;
    }

    //获取表单内容
    function investformMsg(){
        var investformMsg = {};
        investformMsg.bank_name = $(".bank_no option:selected").html();//银行名称
        investformMsg.chanilid = $(".bank_no").val();//chanilid
        investformMsg.moneyaccount = $('.bank_no').find("option:selected").attr("data_b");////资金账户
        investformMsg.money = $('.amount').val();//输入金额
        investformMsg.cycle1 = $('.cycle').val();//输入金额
        investformMsg.investday = $('.investday').val();//输入金额
        investformMsg.pw = $('.pw').val();//密码
        investformMsg.yes = $('.yes').is(':checked');//密码
        return investformMsg;
    }

    //购买获取用户银行卡信息和风险等级显示；
    function timeinvestStep2(fundid) {
        console.log("获取银行卡信息！");
        //showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "precastopenapi",
            data: {
                "surelyOpen.fundcode": fundid,
                "surelyOpen.buyflag": 0
            },
            dataType: "JSON",
            async: false,
            success: function (data) {
                //data = $.parseJSON(data);
                //hideloading();
                //console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    //查询银行卡
                    risklevel=data.data.risklevel;
                    if(risklevel=="1014"||risklevel==1014){
                        $(".risk").show();
                    }else{
                        $(".risk").hide();
                    }
                    $(data.data.listmap).each(function (i, n) {
                        var depositacct = n.depositcard;
                        if (i == 0) {
                            transactionaccountid = n.transactionaccountid;
                            moneyaccount = n.moneyaccount;
                            branchcode = n.branchcode;
                            console.log(transactionaccountid);
                            console.log(moneyaccount);
                            console.log(branchcode);
                            /*$(".bank_no").parent().find("span").html(getbanktype(n.channelid)+depositacct.substring(8));*/
                            $(".bank_no").parent().find("span").html("请选择");
                        }


                        if(n.channelid==8866|| n.channelid=="8866"){

                        }else{
                            var option = "<option data_a='" + n.transactionaccountid + "' data_b='" + n.moneyaccount + "' data_c='" + n.branchcode + "' value='" + n.channelid + "'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
                            $(".bank_no").append(option);
                        }

                        /*var option = "<option data_a='" + n.channelid + "' data_b='" + n.moneyaccount + "' value='" + n.channelid + "'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
                         $(".bank_no").append(option);*/
                    });
                    $(".bank_no option:nth-child(2)").attr("selected" , "selected");//默认选中
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                //hideloading();
                showAlert("网络错误，请稍后重试！");
            }
        })
    }



});

//添加循环月
function pushData() {
    var strHtml = "";
        strHtml += "<option>请选择定投日</option>";
    for ( var i = 1; i <= 28; i++) {
        //monthList.push({id: i, value: "第" + i + "天"});
        strHtml += "<option value='" + i + "'>第" + i + "天</option>";
    }
    $(".investday").html(strHtml);
}

//添加循环周
function pushWeek() {
    var strHtml1 = "";
        strHtml1 += "<option>请选择定投日</option>";
    for ( var i = 1; i <= 5; i++) {
        //monthList.push({id: i, value: "第" + i + "天"});
        strHtml1 += "<option value='" + i + "'>周" + i + "</option>";
    }
    $(".investday").html(strHtml1);
}


//周期联动定投日选择
function linkage_day(cycle){
    if(cycle==0){
        pushData();
    }else if(cycle==1){
        pushWeek();
    }else if(cycle==2){
        pushWeek();
    }
}