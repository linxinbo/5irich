/**
 * Created by linxi on 2016/12/19.
 */
var transactionaccountid;
var moneyaccount;
var branchcode;
var risklevel;
var kaiguan=true;
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    if(fundname.length>=10){
        var nfundname=fundname.substring(0,18)+"...";
    }else {
        var nfundname = fundname;
    }
    var fundid = args.fundid;
    //fundname fundcode插入页面
    $(".buyfundname").html(nfundname+"("+fundid+")");
    //var tano = args.tano;
    //var sharetype = args.sharetype;
    //var buyflag = args.buyflag;
    var first_per_min_20 = args.first_per_min_22;
    var chouj = args.chouj;
    var amount =args.amount;

    //看有没有自动带过来的购买金额 然后显示隐藏编辑按钮
    if(amount==""||amount==null||chouj==undefined||typeof(chouj)=="undefined"){
        $(".edit").hide();
    }else{
        $(".edit").show();
        $(".amount1").val(amount);
        $(".amount1").removeClass("border").addClass("bordernone");
        $(".amount1").attr("disabled",true);
    }

    //点击改变编辑状态
    $(".edit").click(function(){
        $(".amount1").removeClass("bordernone").addClass("border");
        $(".amount1").attr("disabled",false);
    });

    //判断有没有活动最低购买金额不强制必须
    if(chouj==""||chouj==null||chouj==undefined||chouj=="undefined"||typeof(chouj)=="undefined" ){
        $(".amount1").attr("placeholder", first_per_min_20+"元起购");
    }else{
        $(".amount1").val(chouj);
    }
    //查询银行卡列表和风险等级
    buyStep2(fundid);


    //密码输入框
    $(".pass_trade").focus(function () {
        $("i[data_rest=ID_rest]").show();
    });
    $(".pass_trade").blur(function () {
        if ($(this).val() == "") {
            $("i[data_rest=ID_rest]").hide();
        }
    });
    $("i[data_rest=ID_rest]").on("click", function () {
        $(".pass_trade").val("");
        $(this).hide();
    });
    //         console.log($(".opaSelect option:eq(0)").val());
    //		transactionaccountid = $(".opaSelect option:eq(0)").attr("data_a");
    //		moneyaccount = $(".opaSelect option:eq(0)").attr("data_b");
    //		branchcode = $(".opaSelect option:eq(0)").attr("data_c");
    //		console.log(transactionaccountid);
    //查询费率和显示手续费
    $(".amount1").blur(function () {
        if (buyformVerify().buyformbank_name && buyformVerify().buyformmoney&& buyformVerify().buyformmoneyS) {
            buyStep3();
            bank_limit(buyformMsg().bank_name,buyformMsg().money);
        }
    });

    /*//查询银行卡单日限额
    $(".amount1,.bank_no").blur(function () {
        if (buyformVerify().buyformbank_name && buyformVerify().buyformmoney&& buyformVerify().buyformmoneyS) {
            bank_limit(buyformMsg().bank_name,buyformMsg().money);
        }
    });*/

    //购买第四部执行购买
    $(".buynewfund").click(function(){
        if(buyformVerify().buyformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                buyStep4();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }

    });

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
                            $(".amount1_error1").html("您输入的金额大于银行单笔"+n.singlelimit+"元限额，此次购买可能会失败！");
                            $(".amount1_error").show();
                            $("#bankinfo").show();
                            $("#bankinfo").html("（该卡每笔支付限额<em>"+n.singlelimit+"</em>元）");
                        }else{
                            $(".amount1_error").hide();
                            $("#bankinfo").hide();
                        }
                    }


                });
            },
            error: function (data) {
                hideloading();
                alert("请稍后重试！");
            }});
    }



    //购买方法
    function buyStep4() {
        console.log("执行第四步购买");
        //showLoading();
        $(".buynewfund").attr('disabled',"true");
        $(".buynewfund").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".buynewfund").html('正在提交……');
        var args = new getArgs();
        var fundName = args.fundname;
        //var transactionaccountid = args.transactionaccountid;
        //var moneyaccount = args.moneyaccount;
        //var branchcode = args.branchcode;
        var fundcode = args.fundid;
        //var channelid = args.chaniled;

        var tano = args.tano;
        var sharetype = args.sharetype;
        var buyflag = args.buyflag;
        //var applicationamt = args.applicationamt;
        var status = args.status;
        var userinfo1=buyformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "buyPayment",
            data: {
                "buy.fundname": fundName,
                //"fundBean.transactionaccountid": transactionaccountid, //银行卡号
                //"fundBean.branchcode": branchcode, //网点号码
                "buy.channelid": userinfo1.chanilid, //网点代码
                "buy.tano": tano, //ta代码，
                "buy.moneyaccount": userinfo1.moneyaccount, //资金账户，
                "buy.fundcode": fundcode, //基金代码
                "buy.sharetype": sharetype, //收费方式
                "buy.applicationamount": userinfo1.money, //客服输入金额
                "buy.buyflag": buyflag, //强致性购买
                "buy.paytype" : 4,
                "buy.tpasswd": userinfo1.pw, //交易密码
                "buy.status" : status
            },
            dataType: "JSON",
            success: function (data) {
                //			data = $.parseJSON(data);
                //hideloading();
                //console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    $(".buynewfund").attr('disabled',"true");
                    window.location.href = "purchase_right.html?fundname=" + fundName + "&fundcode=" + fundcode + "&amount=" + userinfo1.money + "";
                } else {
                    //在buyfund.html页面输入的交易密码错误
                    if(data.retcode == '-409999999'){
                        //显示交易密码模块
                        showAlert(data.retmsg);
                        $(".pw").val("");
                        $(".buynewfund").removeAttr("disabled");
                        $(".buynewfund").removeClass("purchase_submit1").addClass("purchase_submit");
                        $(".buynewfund").html('确认提交');
                        kaiguan=true;
                        ///$('.passwd').attr("style","display:block");

                    }else if(data.retcode == '1111'){
                        //showAlert("卡余额不足，请换卡交易");
                        window.location.href = "purchase_error.html";
                        $(".buynewfund").removeAttr("disabled");
                        kaiguan=true;
                    }else{
                        setErrorMsg(data.retcode, data.retmsg);
                        $(".buynewfund").removeAttr("disabled");
                        $(".buynewfund").removeClass("purchase_submit1").addClass("purchase_submit");
                        $(".buynewfund").html('确认提交');
                        kaiguan=true;
                    }
                }
            },
            error: function (data) {
                $("#drawBtnbuyfund").removeAttr("disabled");
                $(".buynewfund").removeClass("purchase_submit1").addClass("purchase_submit");
                $(".buynewfund").html('确认提交');
                kaiguan=true;
                //hideloading();
                showAlert("请稍后重试！服务器错误");
            }
        });

    }


    //查询费率方法
    function buyStep3(){
        var args = new getArgs();
        var fundcode = args.fundid;
        var buyinfo=buyformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "recsubscrip",
            data: {
                "sufees.fundcode": fundcode,
                "sufees.applicationamount": buyinfo.money,
                "sufees.channelid": buyinfo.chanilid
                /*"rateBean.businesscode": businesscode,
                 "rateBean.tano": tano,
                 "rateBean.sharetype": sharetype,
                 "revcFundListBean.first_per_min_20": first_per_min_20,
                 "revcFundListBean.first_per_max_20": first_per_max_20*/
            },
            dataType: "JSON",
            success: function (data) {
                //			data = $.parseJSON(data);

                //hideloading();
                console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    //console.log(data);
                    //上传改回来的
                    if(data.data){
                        $(".charge").html("（费率<em>"+parseFloat(data.data.chargerate)*100+"%</em>，预计购买费用：<em>"+data.data.charge+"</em>元，申购费以基金公司实际确认为准）")
                        $(".charge").show();
                    }
                    //window.location.href = "buynewconfirm.html?tano=" + tano + "&sharetype=" + sharetype + "&buyflag=" + buyflag + "&fundname=" + fundname + "&fundid=" + fundid + "&businesscode=" + businesscode + "&first_per_min_20=" + first_per_min_20 + "&first_per_max_20=" + first_per_max_20 + "&bankNo=" + bankNo + "&applicationamt=" + applicationamt + "&chaniled=" + chaniled + "&transactionaccountid=" + transactionaccountid + "&moneyaccount=" + moneyaccount + "&branchcode=" + branchcode + "&pw=" + pw+ "&status=" + status;
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                //hideloading();
                alert("请稍后重试！服务器错误");
            }
        })
    };

    //checkbox勾选验证
    /*$('input:checkbox').click(function () {
        this.focus();
        console.log("1111");
    });*/
    //错误提示，表单验证
    $('.buyinput').on('blur',function(){
        if($(this).hasClass('bank_no')){
            if(!buyformVerify().buyformbank_name){
                $(".bank_no_error1").html("请选择支付方式");
                $(".bank_no_error").show();
            }else {
                $(".bank_no_error").hide();
            }
        }
        if($(this).hasClass('amount1')){
            if(!buyformVerify().buyformmoney){
                $(".amount1_error1").html("请输入金额");
                $(".amount1_error").show();
            }else if(!buyformVerify().buyformmoneyS){
                $(".amount1_error1").html("最低申购金额为"+first_per_min_20+"元");
                $(".amount1_error").show();
            }else {
                $(".amount1_error").hide();
            }
        }

        if($(this).hasClass('pw')){
            if(!buyformVerify().buyformpw){
                $(".password_error1").html("您输入的密码不正确");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

        if($(this).hasClass('yes')){
            if(!buyformVerify().buyformyes){
                $('.yes_error1').html('请阅读风险提示');
                $('.yes_error').show();
            }else {
                $('.yes_error').hide();
            }
        }

    });






    //验证表单数据
    function buyformVerify(){
        var verify = {};
        verify.buyformVer = true;
        verify.buyformbank_name = true;
        verify.buyformmoney = true;
        verify.buyformmoneyS = true;
        verify.buyformchanilid = true;
        verify.buyformmoneyaccount = true;
        verify.buyformpw = true;
        verify.buyformyes = true;
        var user = buyformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");

        //验证输入金额数字
        if(isNaN(user.money)||user.money==""){
            verify.buyformmoney = false;
            verify.buyformVer = false;
        }
        if(parseFloat(user.money)<parseFloat(first_per_min_20)){
            verify.buyformmoneyS = false;
            verify.buyformVer = false;
        }
        if(user.bank_name =="" ||user.bank_name =="选择银行"){
            verify.buyformbank_name = false;
            verify.buyformVer = false;
        }

        if(user.chanilid ==""){
            verify.buyformchanilid = false;
            verify.buyformVer = false;
        }

        if(user.moneyaccount ==""){
            verify.buyformmoneyaccount = false;
            verify.buyformVer = false;
        }
        if(user.pw == "" || user.pw.length<6){
            verify.buyformpw = false;
            verify.buyformVer = false;
        }


        if(!user.yes){
            console.log(user.yes);
            verify.buyformyes = false;
            verify.buyformVer = false;
        }
        return  verify;
    }

    //获取表单内容
    function buyformMsg(){
        var buyformMsg = {};
        buyformMsg.bank_name = $(".bank_no option:selected").html();//银行名称
        buyformMsg.chanilid = $(".bank_no").val();//chanilid
        buyformMsg.moneyaccount = $('.bank_no').find("option:selected").attr("data_b");////资金账户
        buyformMsg.money = $('.amount1').val();//输入金额
        buyformMsg.pw = $('.pw').val();//密码
        buyformMsg.yes = $('.yes').is(':checked');//协议
        return buyformMsg;
    }
})


//购买获取用户银行卡信息；
function buyStep2(fundid) {
    console.log("获取银行卡信息！");
    //showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "buypre",
        data: {
            "reference.fundcode": fundid,
            "reference.buyflag": 0
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
                        //$(".bank_no").parent().find("span").html("请选择");
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



