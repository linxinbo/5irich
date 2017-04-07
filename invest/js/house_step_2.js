/**
 * Created by linxi on 2017/3/23.
 */
$(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    //引导用户登录开户
    if(username == "" || username == null || username == undefined|| username == "null") {
        window.location.href = "login.html";
    }else if(isopen != 1) {
        window.location.href = "account.html";
    }else{
        var args = new getArgs();
        var destName = args.destName;
        /*var destMunber = args.destMunber;
        var travelTime = args.travelTime;
        var travelNum = args.travelNum;*/
        var fundcode = args.fundcode;
        var fundname = args.fundname;
        var money = args.money;
        var cycle = args.cycle;
        var chanilid = args.chanilid;
        var moneyaccount = args.moneyaccount;
        var bank_name = args.bank_name;
        var tano = args.tano;
        var risklevel = args.risklevel;
        var scene_scheme="每月"+cycle+"号定投"+money+"元";

        //插入旅行计划名称和人数
        $(".planName").html(destName);
        //插入银行卡信息
        $(".bankName").html(bank_name);

        //用户点击确认定投
        $(".timeinvestfund").click(function(){
            var pw = $('.pw').val();//密码

            if(pw == "" || pw.length<6){
                showAlertApp("交易密码不符合规则");
                return false;
            }
            $(".timeinvestfund").attr('disabled',"true");
            $(".timeinvestfund").removeClass("btn_next_travel").addClass("btn_next_travel_h");
            $(".timeinvestfund").html('正在提交……');
            //showLoading();
            //var investinfo=investformMsg();
            var risk = risklevel == '1014' ? 1 : 0;
            $.ajax({
                type: "post",
                url: mainUrl + "castopenapi",
                data: {
                    "castOpen.fundcode":fundcode,
                    "castOpen.fundname":fundname,
                    "castOpen.riskmatching":risk,
                    "castOpen.channelid":chanilid,
                    "castOpen.tpasswd":pw,
                    "castOpen.tano":tano,
                    "castOpen.moneyaccount":moneyaccount,
                    "castOpen.sharetype":"A",
                    "castOpen.firstinvestamount":money,
                    "castOpen.investperiods":0,
                    "castOpen.investcyclevalue":cycle,
                    "castOpen.operorg":chanilid
                },
                dataType: "JSON",
                success: function (data) {
                    //data = $.parseJSON(data);
                    //hideloading();
                    //console.log(data);
                    if (data.retcode == 0000 || data.retcode == "0000") {
                        //kaiguan=false;
                        $(".timeinvestfund").attr('disabled',"true");
                        saveScene("C",destName,money,scene_scheme,bank_name,data.data.appsheetserialno,data.data.buyplanno,fundcode,fundname);

                    } else {
                        setErrorMsg(data.retcode, data.retmsg);
                        $(".timeinvestfund").removeAttr("disabled");
                        $(".timeinvestfund").html('确认');
                        $(".timeinvestfund").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                        //kaiguan=true;
                    }
                },
                error: function (data) {
                    $(".timeinvestfund").removeAttr("disabled");
                    $(".timeinvestfund").html('确认');
                    $(".timeinvestfund").removeClass("btn_next_travel_h").addClass("btn_next_travel");
                    //kaiguan=true;
                    //hideloading();
                    showAlert("请稍后重试！服务器错误");
                }
            });

        });

    }

    function saveScene(scene_no,scene_name,scene_money,scene_scheme,debit_account,appsheetserialno,buyplanno,fundcode,fundname){
        $.ajax({
            type: "post",
            url: mainUrl + "saveScene",
            data: {
                "fundCastsurelySceneBean.scene_no":scene_no,
                "fundCastsurelySceneBean.scene_name":scene_name,
                "fundCastsurelySceneBean.scene_money":scene_money,
                "fundCastsurelySceneBean.scene_scheme":scene_scheme,
                "fundCastsurelySceneBean.debit_account":debit_account,
                "fundCastsurelySceneBean.appsheetserialno":appsheetserialno,
                "fundCastsurelySceneBean.buyplanno":buyplanno,
                "fundCastsurelySceneBean.fundcode":fundcode,
                "fundCastsurelySceneBean.fundname":fundname
            },
            dataType: "JSON",
            success: function (data) {
                if (data.retcode == 0000 || data.retcode == "0000") {
                    console.log("保存计划成功");
                    window.location.href = "house_success.html?cycle=" + cycle;
                } else {
                    console.log(data.retcode, data.retmsg);
                    //kaiguan=true;
                }
            },
            error: function (data) {
                console.log("网络错误！请稍后重试！");
            }
        });

    }

});