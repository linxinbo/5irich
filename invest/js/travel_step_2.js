/**
 * Created by linxi on 2017/3/23.
 */
var fundname = null;
var per_min_39 = null;
var per_max_39 = null;
var fundcode = null;
var tano = null;
var risklevel = null;
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
        var destMunber = args.destMunber;
        var travelTime = args.travelTime;
        var travelNum = args.travelNum;

        //插入旅行计划名称和人数
        $(".travel_dest").html(destName+" <span>×"+travelNum+"人</span>");
        //插入计划总金额
        var travelTotal=parseFloat(travelNum)*parseFloat(destMunber);
        $(".travel_read span").html(travelTotal);

        //添加扣款日期内容
        pushData();


        //购买获取用户银行卡信息和风险等级显示；
        timeinvestStep2("000287");


        //用户点击生成计划单
        $(".btn_next_travel").click(function(){
            var bank_name = $(".bank_no option:selected").html();//银行名称
            var chanilid = $(".bank_no").val();//chanilid
            var moneyaccount = $('.bank_no').find("option:selected").attr("data_b");//资金账户
            var money = $('.amount1').val();//输入金额
            var cycle_name = $(".cycle option:selected").html();//扣款日期
            var cycle = $(".cycle option:selected").val();//扣款日
            var yes = $('.yes').is(':checked');
            var yes1 = $('.yes1').is(':checked');
            if(bank_name =="" ||bank_name =="请选择银行卡"){
                showAlertApp("请选择银行卡");
                return false;
            }
            if(isNaN(money)||money==""){
                showAlertApp("请输入定投金额");
                return false;
            }
            if(parseFloat(money)<parseFloat(per_min_39)){
                showAlertApp("金额不能低于"+per_min_39);
                return false;
            }
            if(parseFloat(money)>parseFloat(per_max_39)){
                showAlertApp("金额不能高于"+per_max_39);
                return false;
            }
            if(cycle_name =="" ||cycle_name =="请选择扣款日"){
                showAlertApp("请选择扣款日");
                return false;
            }
            if(!yes){
                showAlertApp("请阅读用户协议");
                return false;
            }
            if(!yes1){
                showAlertApp("同意风险提示");
                return false;
            }
            window.location.href = "travel_step_3.html?destName=" + destName + "&destMunber=" + destMunber+"&travelTime="+travelTime+"&travelNum="+travelNum+"&fundcode=" + fundcode + "&fundname="+fundname+"&money="+money+"&cycle="+cycle+"&chanilid="+chanilid+"&moneyaccount="+moneyaccount+"&bank_name="+bank_name+"&tano="+tano+"&risklevel="+risklevel;






        });





    };



    //购买获取用户银行卡信息和风险等级显示；
    function timeinvestStep2(fundid) {
        console.log("获取银行卡信息！");
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
                if (data.retcode == 0000 || data.retcode == "0000") {
                    console.log(data);
                    per_min_39=data.data.per_min_39;
                    fundname=data.data.fundname;
                    per_max_39=data.data.per_max_39;
                    fundcode=data.data.fundcode;
                    tano=data.data.tano;
                    risklevel=data.data.risklevel;
                    //查询银行卡
                    $(data.data.listmap).each(function (i, n) {
                        var depositacct = n.depositcard;
                        /*if (i == 0) {
                            transactionaccountid = n.transactionaccountid;
                            moneyaccount = n.moneyaccount;
                            branchcode = n.branchcode;
                            var option="<option>请选择银行卡</option>";
                            $(".t_f_select").append(option);
                        }*/
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
                console.log("网络错误，请稍后重试！");
            }
        })
    }



});

//添加循环月
function pushData() {
    var strHtml = "";
    strHtml += "<option>请选择扣款日</option>";
    for ( var i = 1; i <= 28; i++) {
        //monthList.push({id: i, value: "第" + i + "天"});
        strHtml += "<option value='" + i + "'>每月" + i + "号</option>";
    }
    $(".cycle").html(strHtml);
}