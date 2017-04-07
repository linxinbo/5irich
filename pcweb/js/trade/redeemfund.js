/**
 * Created by linxi on 2016/12/20.
 */
var kaiguan=true;
window.load = function(){
    $(".redeemshare").val("");
    $(".pw").val("");
};
$(document).ready(function () {
    //巨额处理标签；
    var optionflag = 0;
    var args = new getArgs();
    var fundname = args.fundname;
    var fundid = args.fundid;
    var fundcode =fundid.substring(0,6);
    var balfund = args.balfund; //持有份额
    var availbal = args.availbal; //可用份额
    var per_min_24 = args.per_min_24; //最小可以赎回份额
    var per_max_24 = args.per_max_24; //最小可以赎回份额
    //出入页面fundname和fundid
    $(".redeemfundname").html(fundname+"("+fundcode+")");
    var backflag = true;

    $(".availbal").html(availbal)

    //点击全部添加全部可用份额
    $(".backall").on("click", function () {
        if (backflag) {
            $(".redeemshare").val(availbal);
            backflag = false;
        } else {
            $(".redeemshare").val("");
            backflag = true;
        }
    });




    //赎回提交
    $(".newredeemfund").on("click", function () {
        if(redeemformVerify().redeemformVer){
            if(kaiguan){
                kaiguan = false;
                backStep2(optionflag);
            }
        }else{
            showAlert("请填写完整表单！")

        }
    });

    //错误提示，表单验证
    $('.buyinput').on('blur',function(){
        if($(this).hasClass('redeemshare')){
            if(!redeemformVerify().redeemformredeemshare){
                $(".redeemshare_error1").html("请输入赎回份额");
                $(".redeemshare_error").show();
            }else if(!redeemformVerify().redeemformredeemshareS){
                $(".redeemshare_error1").html("最低赎回份额为"+per_min_24+"份");
                $(".redeemshare_error").show();
            }else if(!redeemformVerify().redeemformredeemshareD){
                $(".redeemshare_error1").html("最高赎回份额为"+per_max_24+"份");
                $(".redeemshare_error").show();
            }else {
                $(".redeemshare_error").hide();
            }
        }

        if($(this).hasClass('pw')){
            if(!redeemformVerify().redeemformpw){
                $(".password_error1").html("交易密码不能空或小于6位");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

    });

    //验证表单数据
    function redeemformVerify(){
        var verify = {};
        verify.redeemformVer = true;
        verify.redeemformredeemshare = true;
        verify.redeemformredeemshareS = true;
        verify.redeemformredeemshareD = true;
        verify.redeemformpw = true;
        var user = redeemformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");

        //验证输入金额数字
        if(isNaN(user.redeemshare)||user.redeemshare==""){
            verify.redeemformredeemshare = false;
            verify.redeemformVer = false;
        }
        if(parseFloat(user.redeemshare)<parseFloat(per_min_24)){
            verify.redeemformredeemshareS = false;
            verify.redeemformVer = false;
        }
        if(parseFloat(user.redeemshare)>parseFloat(per_max_24)){
            verify.redeemformredeemshareD = false;
            verify.redeemformVer = false;
        }
        if(user.pw == "" || user.pw.length<6){
            verify.redeemformpw = false;
            verify.redeemformVer = false;
        }

        return  verify;
    }

    //获取表单内容
    function redeemformMsg(){
        var redeemformMsg = {};
        redeemformMsg.redeemshare = $(".redeemshare").val();//赎回份额
        redeemformMsg.pw = $(".pw").val();//赎回密码
        return redeemformMsg;
    }

    //
    //赎回第二步
    function backStep2(optionflag) {
        $(".newredeemfund").attr('disabled',"true");
        $(".newredeemfund").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".newredeemfund").html('正在提交……');
        var args = new getArgs();
        var fundname = args.fundname;
        var sharetype = args.sharetype;
        var tano = args.tano;
        var fundid = args.fundid;
        var balfund = args.balfund; //持有份额
        var availbal = args.availbal; //可用份额
        var hold_min = args.hold_min; //最低持有份额
        var transactionaccountid = args.transactionaccountid; //交易账号
        var branchcode = args.branchcode; //网点号
        var per_max_24 = args.per_max_24; //可赎回最高份额；
        var per_min_24 = args.per_min_24; //可赎回最低份额；

        var redeemforminfo=redeemformMsg();

        console.log("赎回第二步");
        //showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "redemptions",
            data: {
                "fundName": fundname,
                "redemption.transactionaccountid": transactionaccountid,
                //"redemptions.branchcode": branchcode,
                "redemption.tano": tano,
                "redemption.fundcode": fundid.substring(0,6),
                "redemption.sharetype": sharetype,
                "redemption.applicationamount": redeemforminfo.redeemshare,
                "redemption.vastredeemflag": optionflag,
                //"redemptionBean.availbal": availbal,
                //"redemptionBean.hold_min": hold_min,
                //"redemptionBean.per_min_24": per_min_24,
                //"redemptionBean.per_max_24": per_max_24,
                "redemption.tpasswd": redeemforminfo.pw
            },
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                if (data.retcode == 0000){
                    kaiguan=false;
                    window.location.href = "redeem_right.html?fundname=" + fundname + "&back_count=" +redeemforminfo.redeemshare;
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                    $(".newredeemfund").removeAttr("disabled");
                    $(".newredeemfund").html('确认提交');
                    $(".newredeemfund").removeClass("purchase_submit1").addClass("purchase_submit");
                    kaiguan=true;
                }
            },
            error: function (data) {
                //hideloading();
                $(".newredeemfund").removeAttr("disabled");
                $(".newredeemfund").html('确认提交');
                $(".newredeemfund").removeClass("purchase_submit1").addClass("purchase_submit");
                kaiguan=true;
                showAlert("网络错误，请稍后重试！");
            }
        })
    }

});

