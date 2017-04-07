/**
 * Created by linxi on 2016/12/20.
 */
var kaiguan=true;
var buyflag=0;
$(document).ready(function () {
    var args = new getArgs();
    var fundcode = args.fundcode;
    var fundname = args.fundname;
    var branchcode = args.branchcode;
    var sharetype = args.sharetype;
    var dividendmethod = args.dividendmethod;
    var transactionaccountid = args.transactionaccountid;
    var dividendmethodname;
    var newdividendmethodname;
    var newdividendmethod;
    //fundname fundcode插入页面
    $(".bonusfundname").html(fundname+"("+fundcode+")");

    if(dividendmethod=="1"){
        dividendmethodname = "现金分红";
        newdividendmethod = "0";
        newdividendmethodname = "红利再投资";
    }else{
        dividendmethodname = "红利再投资";
        newdividendmethod = "1";
        newdividendmethodname = "现金分红";
    }
    //现在的分红方式
    $(".dividendmethod").html(dividendmethodname);
    //修改后分红方式
    $(".newdividendmethod").html(newdividendmethodname);


    $(".bonusfund").click(function(){
        if(bonusformVerify().bonusformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                bonusStep2();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }

    });

    //修改分红
    function bonusStep2(){
        console.log("执行第二部修改分红");
        //showLoading();
        $(".bonusfund").attr('disabled',"true");
        $(".bonusfund").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".bonusfund").html('正在提交……');
        var bonusinfo=bonusformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "changesbonus",
            data: {
                "wcsbb.tpasswd":bonusinfo.pw,
                "wcsbb.transactionaccountid":transactionaccountid,
                "wcsbb.branchcode":branchcode,
                "wcsbb.fundcode":fundcode,
                "wcsbb.dividendmethod":dividendmethod,
                "wcsbb.sharetype":sharetype
            },
            dataType: "JSON",
            success: function (data) {
                //console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    kaiguan=false;
                    $(".bonusfund").attr('disabled',"true");
                    window.location.href = "bonus_right.html?fundname=" + fundname + "&fundcode=" + fundcode + "&dividendmethodname=" + dividendmethodname + "&newdividendmethodname=" + newdividendmethodname + "&appsheetserialno=" + data.data.appsheetserialno + "";
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                    $(".bonusfund").removeAttr("disabled");
                    $(".bonusfund").html('确认提交');
                    $(".bonusfund").removeClass("purchase_submit1").addClass("purchase_submit");
                    kaiguan=true;
                }
            },
            error: function (data) {
                $(".bonusfund").removeAttr("disabled");
                $(".bonusfund").html('确认提交');
                $(".bonusfund").removeClass("purchase_submit1").addClass("purchase_submit");
                kaiguan=true;
                //hideloading();
                showAlert("请稍后重试！服务器错误");
            }
        });


    };



    //错误提示，表单验证
    $('.bonusinput').on('blur',function(){
        if($(this).hasClass('pw')){
            if(!bonusformVerify().bonusformpw){
                $(".password_error1").html("交易密码不能空或小于6位");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

    });

    //验证表单数据
    function bonusformVerify(){
        var verify = {};
        verify.bonusformVer = true;
        verify.bonusformpw = true;
        var user = bonusformMsg();

        if(user.pw == "" || user.pw.length<6){
            verify.bonusformpw = false;
            verify.bonusformVer = false;
        }

        return  verify;
    }

    //获取表单内容
    function bonusformMsg(){
        var bonusformMsg = {};
        bonusformMsg.pw = $('.pw').val();//密码
        return bonusformMsg;
    }





});