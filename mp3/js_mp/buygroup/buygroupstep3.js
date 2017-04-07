/**
 * Created by CJQF on 2016/9/27.
 */
var kaiguan=true;
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.groupname;
    console.log(fundname);
    var fundid = args.combinationcode;
    var bankNo = args.bankno;
    var applicationamt = args.applicationamount;


    $('.fund_id span').html(fundname);
    $('.fund_id').append("(" + fundid + ")");
    $(".bank_no_conf span").html(bankNo);
    $(".conf_num").html(applicationamt);
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
    })


    $("#drawBtnbuygroup").click(function(){
        $("#drawBtnbuygroup").attr('disabled',"true");
        if(kaiguan){
            kaiguan = false;
            buyGroupStep4();
        }
    });




})


function buyGroupStep4() {
    console.log("执行第四步购买")
    showLoading();
    var grouppw = $(".pass_trade").val();
    var args = new getArgs();
    var businesscode = args.businesscode;
    var channelid = args.channelid;
    var tano = args.tano;
    tano = repalcecode(tano);
    tano=tano.toString();
    var buyflag = args.buyflag;
    var applicationamount = args.applicationamount;
    var moneyaccount = args.moneyaccount;
    var combinationcode = args.combinationcode;
    var comfundlist = args.comfundlist;
    var comratelist = args.comratelist;
    comfundlist = repalcecode(comfundlist);
    comratelist = repalcecode(comratelist);
    var fdGroupMin = args.fdGroupMin;
    var fundcode = args.fundid;
    var tano = args.tano;
    var sharetype = args.sharetype;
    var transactionaccountid =args.transactionaccountid;
    if (grouppw == "" || grouppw == null||grouppw.length<6) {
        showAlert("交易密码不能为空或少于6位！");
        hideloading();
        return false;
    } else {
        $.ajax({
            type: "post",
            url: mainUrl + "buyGroupFundPayment",
            data: {
                "buy.tpasswd": grouppw, //交易密码
                "buy.channelid": channelid, //支付网点代码，第二步出参
                //"port.tano": repalcecode(tano), //TA代码串，第一步出参tano
                "combinbuy.applicationamount": applicationamount, //申请金额
                //"port.buyflag": buyflag, //强制购买
                "buy.moneyaccount": moneyaccount, //资金账户
                "combination.combinationcode": combinationcode, //组合代码
                //"port.comtype": 0, //组合方式
                //"port.comratelist": comratelist, //基金比例串（各个基金在组合中占用的比例用#隔开）第一步出参
                //"port.comfundlist": comfundlist, //基金代码串  第一步出参
                //"groupBean.fdGroupMin": fdGroupMin ,//基金组合购买最低额  第三部出参
                "fgsinglebean.transactionaccountid": transactionaccountid
            },
            dataType: "JSON",
            success: function (data) {
//				data = $.parseJSON(data);
                hideloading();
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    console.log(data);
                    window.location.href = "buygroupright.html";
                } else {

                    //在buyfund.html页面输入的交易密码错误
                    if(data.retcode == '1015'){
                        //显示交易密码模块
                        showAlert(data.retmsg);
                        $("#drawBtnbuygroup").removeAttr("disabled");
                        kaiguan=true;
                        $('#tradePW').val("");
                        //pw_flag=true;
                    }else if(data.retcode == '1111'){
                        showAlert("卡余额不足，请换卡交易", h_back);
                        $("#drawBtnbuygroup").removeAttr("disabled");
                        kaiguan=true;

                    }else if(data.retcode == '1203'){
                        kaiguan=false;
                        showAlert(data.retmsg,to_right);
                        $("#drawBtnbuygroup").attr('disabled',"true");
                    }else if(data.retcode == '1202'){
                        kaiguan=false;
                        $("#drawBtnbuygroup").attr('disabled',"true");
                        showAlert(data.retmsg,to_false);
                    }else if(data.retcode == '1204'){
                        kaiguan=false;
                        $("#drawBtnbuygroup").attr('disabled',"true");
                        showAlert("非交易时间",to_false);
                    }else if(data.retcode == '1205'){
                        kaiguan=false;
                        $("#drawBtnbuygroup").attr('disabled',"true");
                        showAlert(data.retmsg,to_false);
                    }else{
                        if(data.data){
                        showAlert(data.data.ErrorMessage,to_false);
                        $("#drawBtnbuygroup").removeAttr("disabled");
                        kaiguan=true;
                        }else{
                            setErrorMsg(data.retcode, data.retmsg);
                            kaiguan=false;
                            $("#drawBtnbuygroup").removeAttr("disabled");
                        }
                    }
                }
            },
            error: function (data) {
                kaiguan=true;
                $("#drawBtnbuygroup").removeAttr("disabled");
                hideloading();
                alert("请稍后重试！服务器错误");
            }
        })
    }

};

function h_back(){
    history.back();
};

function to_false(){
    window.location.href = "buygroupfalse.html";
};


function to_right(){
    window.location.href = "buygroupright.html";
};