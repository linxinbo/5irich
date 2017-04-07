/**
 * Created by linxi on 2016/12/20.
 */
var kaiguan=true;
$(document).ready(function () {
    //巨额处理标签；
    var args = new getArgs();
    var fundgroupname = args.fundgroupname;
    var fundgroupcode = args.fundgroupcode;
    var groupFundBuyId = args.groupFundBuyId; //持有份额
    //出入页面fundname和fundid
    $(".backgroupname").html(fundgroupname+"("+fundgroupcode+")");


    //赎回提交
    $(".newredeemfund").on("click", function () {
        if(backgroupformVerify().backgroupformVer){
            if(kaiguan){
                kaiguan = false;
                backGroupStep2(groupFundBuyId);
            }
        }else{
            showAlert("请填写完整表单！");
        }
    });

    //赎回第二步
    function backGroupStep2(groupFundBuyId) {
        //var args = new getArgs();
        //var fundgroupname = args.fundgroupname;
        //var fundgroupcode = args.fundgroupcode;
        console.log("赎回组合第二步");
        //showLoading();
        $(".newredeemfund").attr('disabled',"true");
        $(".newredeemfund").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".newredeemfund").html('正在提交……');
        var backgroupinfo=backgroupformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "groupRedemptions",
            data: {
                "groupFundBuyId": groupFundBuyId,
                "password": backgroupinfo.pw
            },
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                if (data.retcode == 0000) {
                    kaiguan=false;
                    window.location.href = "backgroup_right.html?fundgroupname=" + fundgroupname + "&fundgroupcode=" + fundgroupcode;
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                    kaiguan=true;
                    $(".newredeemfund").removeAttr("disabled");
                    $(".newredeemfund").html('确认提交');
                    $(".newredeemfund").removeClass("purchase_submit1").addClass("purchase_submit");
                }
            },
            error: function (data) {
                //hideloading();
                kaiguan=true;
                $(".newredeemfund").removeAttr("disabled");
                $(".newredeemfund").html('确认提交');
                $(".newredeemfund").removeClass("purchase_submit1").addClass("purchase_submit");
                showAlert("网络错误,请稍后重试！");
            }
        })
    }

    //错误提示，表单验证
    $('.backgroupinput').on('blur',function(){
        if($(this).hasClass('pw')){
            if(!backgroupformVerify().backgroupformpw){
                $(".password_error1").html("交易密码不能空或小于6位");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

    });

    //验证表单数据
    function backgroupformVerify(){
        var verify = {};
        verify.backgroupformVer = true;
        verify.backgroupformpw = true;
        var user = backgroupformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        //var reg = new RegExp("^[0-9]*$");

        //验证输入金额数字
        if(user.pw == "" || user.pw.length<6 || user.pw.length>20){
            verify.backgroupformpw = false;
            verify.backgroupformVer = false;
        }

        return  verify;
    }

    //获取表单内容
    function backgroupformMsg(){
        var backgroupformMsg = {};
        backgroupformMsg.pw = $(".pw").val();//赎回密码
        return backgroupformMsg;
    }

});

