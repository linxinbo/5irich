/**
 * Created by linxi on 2016/12/19.
 */
var kaiguan=true;
var first_per_min_20;
$(document).ready(function () {
    var args = new getArgs();
    var groupname = args.groupname;
    var groupId = args.groupId;
    //fundname fundcode插入页面
    $(".groupname").html(groupname+"("+groupId+")");

    //组合比例显示
    buygroupStep2(groupId);

    //点击查看组合比例详情
    $(".buymore").click(function(){
        $(".buymore1").toggle();
    });

    //查询银行卡列表
    buygroupStep3();


    //查询银行卡单日限额
    $(".groupamount").blur(function () {
        if (buygroupformVerify().buygroupformbank_name && buygroupformVerify().buygroupformmoney&& buygroupformVerify().buygroupformmoneyS&& buygroupformVerify().buygroupformmoneyZ) {
            bank_limit(buygroupformMsg().bank_name,buygroupformMsg().money);
        }
    });


    //购买第四部执行购买
    $(".buynewgroup").click(function(){
        if(buygroupformVerify().buygroupformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                buygroupStep4();
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
                        }else{
                            $(".amount1_error").hide();
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
    function buygroupStep4() {
        console.log("执行第四步购买");
        var usergroupinfo=buygroupformMsg();
        $(".buynewgroup").attr('disabled',"true");
        $(".buynewgroup").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".buynewgroup").html('正在提交……');
        $.ajax({
            type: "post",
            url: mainUrl + "buyGroupFundPayment",
            data: {
                "buy.tpasswd": usergroupinfo.pw, //交易密码
                "buy.channelid": usergroupinfo.chanilid, //支付网点代码，第二步出参
                //"port.tano": repalcecode(tano), //TA代码串，第一步出参tano
                "combinbuy.applicationamount": usergroupinfo.money, //申请金额
                //"port.buyflag": buyflag, //强制购买
                "buy.moneyaccount": usergroupinfo.moneyaccount, //资金账户
                "combination.combinationcode": groupId, //组合代码
                //"port.comtype": 0, //组合方式
                //"port.comratelist": comratelist, //基金比例串（各个基金在组合中占用的比例用#隔开）第一步出参
                //"port.comfundlist": comfundlist, //基金代码串  第一步出参
                //"groupBean.fdGroupMin": fdGroupMin ,//基金组合购买最低额  第三部出参
                "fgsinglebean.transactionaccountid": usergroupinfo.transactionaccountid
            },
            dataType: "JSON",
            success: function (data) {
//				data = $.parseJSON(data);
                //hideloading();
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    console.log(data);
                    window.location.href = "buygroupright.html?groupname="+groupname+"&groupid="+groupId+"&money="+usergroupinfo.money+"";
                } else {

                    //在buyfund.html页面输入的交易密码错误
                    if(data.retcode == '1015'){
                        //显示交易密码模块
                        showAlert(data.retmsg);
                        $(".buynewgroup").removeAttr("disabled");
                        $(".buynewgroup").html('确认提交');
                        $(".buynewgroup").removeClass("purchase_submit1").addClass("purchase_submit");
                        kaiguan=true;
                        $('.pw').val("");
                        //pw_flag=true;
                    }else if(data.retcode == '1111'){
                        showAlert("卡余额不足，请换卡交易");
                        $(".buynewgroup").removeAttr("disabled");
                        $(".buynewgroup").html('确认提交');
                        $(".buynewgroup").removeClass("purchase_submit1").addClass("purchase_submit");
                        kaiguan=true;
                    }else if(data.retcode == '1203'){
                        kaiguan=false;
                        showAlert(data.retmsg,to_right);
                        $(".buynewgroup").attr('disabled',"true");
                    }else if(data.retcode == '1202'){
                        kaiguan=false;
                        $(".buynewgroup").attr('disabled',"true");
                        showAlert(data.retmsg,to_false);
                    }else if(data.retcode == '1204'){
                        kaiguan=false;
                        $(".buynewgroup").attr('disabled',"true");
                        showAlert("非交易时间",to_false);
                    }else if(data.retcode == '1205'){
                        kaiguan=false;
                        $(".buynewgroup").attr('disabled',"true");
                        showAlert(data.retmsg,to_false);
                    }else{
                        if(data.data){
                            showAlert(data.data.ErrorMessage,to_false);
                            $(".buynewgroup").removeAttr("disabled");
                            $(".buynewgroup").html('确认提交');
                            $(".buynewgroup").removeClass("purchase_submit1").addClass("purchase_submit");
                            kaiguan=true;
                        }else{
                            setErrorMsg(data.retcode, data.retmsg);
                            kaiguan=false;
                            $(".buynewgroup").removeAttr("disabled");
                            $(".buynewgroup").html('确认提交');
                            $(".buynewgroup").removeClass("purchase_submit1").addClass("purchase_submit");
                        }
                    }
                }
            },
            error: function (data) {
                kaiguan=true;
                $(".buynewgroup").removeAttr("disabled");
                $(".buynewgroup").html('确认提交');
                $(".buynewgroup").removeClass("purchase_submit1").addClass("purchase_submit");
                //hideloading();
                alert("请稍后重试！服务器错误");
            }
        })

    }


    //checkbox勾选验证
    /*$('input:checkbox').click(function () {
        this.focus();
        console.log("1111");
    });*/
    //错误提示，表单验证
    $('.buygroupinput').on('blur',function(){
        if($(this).hasClass('bank_no')){
            if(!buygroupformVerify().buygroupformbank_name){
                $(".bank_no_error1").html("请选择支付方式");
                $(".bank_no_error").show();
            }else {
                $(".bank_no_error").hide();
            }
        }
        if($(this).hasClass('groupamount')){
            if(!buygroupformVerify().buygroupformmoney){
                $(".amount1_error1").html("请输入金额");
                $(".amount1_error").show();
            }else if(!buygroupformVerify().buygroupformmoneyS){
                $(".amount1_error1").html("最低申购金额为"+first_per_min_20+"元");
                $(".amount1_error").show();
            }else if(!buygroupformVerify().buygroupformmoneyZ){
                $(".amount1_error1").html("申购金额不是100的整数倍");
                $(".amount1_error").show();
            }else {
                $(".amount1_error").hide();
            }
        }

        if($(this).hasClass('pw')){
            if(!buygroupformVerify().buygroupformpw){
                $(".password_error1").html("密码格式不正确");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

        if($(this).hasClass('yes')){
            if(!buygroupformVerify().buygroupformyes){
                $('.yes_error1').html('请阅读风险提示');
                $('.yes_error').show();
            }else {
                $('.yes_error').hide();
            }
        }

    });






    //验证表单数据
    function buygroupformVerify(){
        var verify = {};
        verify.buygroupformVer = true;
        verify.buygroupformbank_name = true;
        verify.buygroupformmoney = true;
        verify.buygroupformmoneyS = true;
        verify.buygroupformmoneyZ = true;
        verify.buygroupformchanilid = true;
        verify.buygroupformmoneyaccount = true;
        verify.transactionaccountid = true;
        verify.buygroupformpw = true;
        verify.buygroupformyes = true;
        var user = buygroupformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");

        //验证输入金额数字
        if(isNaN(user.money)||user.money==""){
            verify.buygroupformmoney = false;
            verify.buygroupformVer = false;
        }
        if(parseFloat(user.money)<parseFloat(first_per_min_20)){
            verify.buygroupformmoneyS = false;
            verify.buygroupformVer = false;
        }
        if(parseFloat(user.money)%100!==0){
            verify.buygroupformmoneyZ = false;
            verify.buygroupformVer = false;
        }

        if(user.bank_name =="" ||user.bank_name =="选择银行"){
            verify.buygroupformbank_name = false;
            verify.buygroupformVer = false;
        }

        if(user.chanilid ==""){
            verify.buygroupformchanilid = false;
            verify.buygroupformVer = false;
        }
        if(user.transactionaccountid ==""){
            verify.transactionaccountid = false;
            verify.buygroupformVer = false;
        }

        if(user.moneyaccount ==""){
            verify.buygroupformmoneyaccount = false;
            verify.buygroupformVer = false;
        }
        if(user.pw == "" || user.pw.length<6 || user.pw.length>20){
            verify.buygroupformpw = false;
            verify.buygroupformVer = false;
        }


        if(!user.yes){
            console.log(user.yes);
            verify.buygroupformyes = false;
            verify.buygroupformVer = false;
        }
        return  verify;
    }

    //获取表单内容
    function buygroupformMsg(){
        var buygroupformMsg = {};
        buygroupformMsg.bank_name = $(".bank_no option:selected").html();//银行名称
        buygroupformMsg.chanilid = $(".bank_no").val();//chanilid
        buygroupformMsg.moneyaccount = $('.bank_no').find("option:selected").attr("data_b");////资金账户
        buygroupformMsg.transactionaccountid = $('.bank_no').find("option:selected").attr("data_a");////银行卡号
        buygroupformMsg.money = $('.groupamount').val();//输入金额
        buygroupformMsg.pw = $('.pw').val();//密码
        buygroupformMsg.yes = $('.yes').is(':checked');//密码
        return buygroupformMsg;
    };

    //银行卡信息
    function buygroupStep3() {
        $.ajax({
            type: "post",
            /*url: mainUrl + "authenticatedBankQuery",*/
            url: mainUrl + "bankinfo",//新的api借口 获取用户绑定的银行卡信息
            data: {},
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                if (data.retcode == 0000) {
                    //查询银行卡
                    $(data.data).each(function (i, n) {
                        var depositacct = bankHide(n.depositacct);
                        /*if (i == 0) {
                            buygroupC.transactionaccountid = n.transactionaccountid;
                            buygroupC.moneyaccount = n.moneyaccount;
                            buygroupC.branchcode = n.branchcode;
                            //console.log(buygroupC.transactionaccountid);
                            //console.log(buygroupC.moneyaccount);
                            //console.log(buygroupC.branchcode);
                            /!*$(".bank_no").parent().find("span").html(getbanktype(n.channelid)+depositacct.substring(8));*!/
                            $(".bank_no").parent().find("span").html("请选择");
                        }*/
                        //以前的代码不知道干什么用的
                        if(n.channelid==8866|| n.channelid=="8866"){
                            //去掉民生银行 不支持了

                        }else{
                            var option = "<option data_a='" + n.transactionaccountid + "' data_b='" + n.moneyaccount + "' data_c='" + n.branchcode + "' value='" + n.channelid + "' data_d='"+depositacct+"'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
                            $(".bank_no").append(option);
                        }

                        /*var option = "<option data_a='" + n.transactionaccountid + "' data_b='" + n.moneyaccount + "' data_c='" + n.branchcode + "' value='" + n.channelid + "'data_d='"+depositacct+"'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
                         $(".bank_no").append(option);*/
                    })
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                showAlert("网络错误，请稍后重试！");
            }
        })
    };
})


//购买获取用户银行卡信息；
function buygroupStep2(groupid) {
    console.log("获取银行卡信息！");
    //showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "queryGroupFundInfo",
        data: {
            "combination.combinationcode": groupid
        },
        dataType: "JSON",
        async: false,
        success: function (data) {
            //data = $.parseJSON(data);
            //hideloading();
            console.log(data);
            if (data.retcode == 0000 || data.retcode == "0000") {
                //查询银行卡
                var autRisk=data.data.autRisk;
                if(autRisk=="1014"||autRisk==1014){
                    $(".risk").show();
                }else{
                    $(".risk").show();
                }
                //插入最小购买金额
                first_per_min_20 = data.data.first_per_min_20;
                var args = new getArgs();
                var chouj = args.chouj;
                //判断有没有活动最低购买金额不强制必须
                if(chouj==""||chouj==null||chouj==undefined||chouj=="undefined"||typeof(chouj)=="undefined" ){
                    $(".groupamount").attr("placeholder", first_per_min_20+"元起购");
                }else{
                    $(".groupamount").val(chouj);
                }
               //$(".groupamount").attr("placeholder","最低购买"+first_per_min_20+"元")

                $(data.data.fundList).each(function (i, n) {
                    var fdProportional=parseFloat(n.fdProportional)*100;

                    var option = "<div class='buymore22'><a>"+ n.fundName+"</a><a>"+fdProportional.toFixed(2)+"%</a></div>";
                    $(".buymore11").after(option);


                    /*var option = "<option data_a='" + n.channelid + "' data_b='" + n.moneyaccount + "' value='" + n.channelid + "'>" + getbanktype(n.channelid) + depositacct.substring(8) + "</option>";
                     $(".bank_no").append(option);*/
                });
                //$(".bank_no option:nth-child(2)").attr("selected" , "selected");//默认选中
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

//隐藏银行卡中间
function bankHide(obj) {
    if( obj && obj.length > 0 && obj.charAt ) {
        var str = "";
        for( var i=0; i<obj.length; i++ ) {
            if( i > 3 && i < obj.length - 4 ) {
                str += '*';
            } else {
                str += obj.charAt(i) + '';
            }
        }
        return str;
    } else {
        return obj;
    }
};

function to_false(){
    window.location.href = "buygroupfalse.html";
};


function to_right(){
    window.location.href = "right.html";
};
