/**
 * Created by linxi on 2016/12/20.
 */
var kaiguan=true;
var buyflag=0;
$(document).ready(function () {
    var args = new getArgs();
    var fundcode = args.fundcode;
    var fundname = args.fundname;
    var buyplanno = args.buyplanno;
    var channelname = args.channelname;
    var depositacctP = args.depositacctP;
    var firstinvestamount = args.firstinvestamount;
    var firstinvestdate = args.firstinvestdate;
    var investcycle = args.investcycle;
    var depositacct = args.depositacct;
    var transactionaccountid1 = args.transactionaccountid1;
    var branchcode = args.branchcode;
    var channelid = args.channelid;


    //fundname fundcode插入页面
    $(".bonusfundname").html(fundname+"("+fundcode+")");

    //插入页面银行名称
    $(".channelname").html(channelname+depositacctP);
    //插入页面日期
    $(".firstinvestdate").html(firstinvestdate);

    var investcyclename;
    if(investcycle==0){
        investcyclename="每月";
    }else if(investcycle==1){
        investcyclename="每周";
    }else if(investcycle==2){
        investcyclename="双周";
    }

    //插入页面日期
    $(".investcycle").html(investcyclename);

    //插入页面金额
    $(".firstinvestamount").html(firstinvestamount+"元");


    $(".investstop").click(function(){
        if(investstopformVerify().investstopformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                investstopStep2();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }

    });

    //修改分红
    function investstopStep2(){
        console.log("执行第二部终止定投");
        //showLoading();
        $(".investstop").attr('disabled',"true");
        $(".investstop").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".investstop").html('正在提交……');
        kaiguan=true;
        var investforminfo=investstopformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "dtermiapi",
            data: {
                "decide.depositacct" : depositacct,
                "decide.fundname" : fundname,
                "decide.transactionaccountid" : transactionaccountid1,
                "decide.tpasswd" : investforminfo.pw,
                "decide.buyplanno" : buyplanno,
                "decide.branchcode" : branchcode,
                "decide.channelid" : channelid
            },
            dataType: "JSON",
            success: function (data) {
                //console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    $(".investstop").attr('disabled',"true");
                    window.location.href = "timeinvest_stop_right.html?fundname=" + fundname + "&fundcode=" + fundcode + "&buyplanno=" + buyplanno + "&channelname=" + channelname + "&depositacctP=" + depositacctP + "&firstinvestamount=" + firstinvestamount + "&firstinvestdate=" + firstinvestdate + "";
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                    $(".investstop").removeAttr("disabled");
                    $(".investstop").html('确认提交');
                    $(".investstop").removeClass("purchase_submit1").addClass("purchase_submit");
                    kaiguan=true;
                }
            },
            error: function (data) {
                $(".investstop").removeAttr("disabled");
                $(".investstop").html('确认提交');
                $(".investstop").removeClass("purchase_submit1").addClass("purchase_submit");
                kaiguan=true;
                //hideloading();
                showAlert("请稍后重试！服务器错误");
            }
        });


    };



    //错误提示，表单验证
    $('.investstopinput').on('blur',function(){
        if($(this).hasClass('pw')){
            if(!investstopformVerify().investstopformpw){
                $(".password_error1").html("交易密码不能空或小于6位");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

    });

    //验证表单数据
    function investstopformVerify(){
        var verify = {};
        verify.investstopformVer = true;
        verify.investstopformpw = true;
        var user = investstopformMsg();

        if(user.pw == "" || user.pw.length<6){
            verify.investstopformpw = false;
            verify.investstopformVer = false;
        }

        return  verify;
    }

    //获取表单内容
    function investstopformMsg(){
        var investstopformMsg = {};
        investstopformMsg.pw = $('.pw').val();//密码
        return investstopformMsg;
    }





});