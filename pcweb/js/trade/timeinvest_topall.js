/**
 * Created by linxi on 2016/12/21.
 */
var isopen = $.cookie("isopen");
var username = $.cookie("username");
function timeinvest_stopStep1(fundcode,fundname,transactionaccountid){
    var fundcode=fundcode.substring(0,6);
    var transactionaccountid=transactionaccountid;
    var fundname=fundname;
    //用户登陆验证
    if(username == "" || username == null || username == undefined|| username == "null") {
        setErrorMsg(1001);//重写报错处理
        return false;
    }else if(isopen != 1) {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);//重写报错处理
        return false;
    }else{
        //showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "castqueryapi",
            data: {},
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                console.log(data);
                if (data.retcode == 0000) {

                    $(data.data).each(function (i, n) {
                        var fundcode1 = n.fundcode;
                        var fundname = n.fundname;
                        var buyplanno = n.buyplanno;
                        var channelname = n.channelname;
                        var depositacctP = n.depositacctP;
                        var firstinvestamount = n.firstinvestamount;
                        var firstinvestdate = n.firstinvestdate;
                        var investcycle = n.investcycle;
                        var depositacct = n.depositacct;
                        var transactionaccountid1 = n.transactionaccountid;
                        var branchcode = n.branchcode;
                        var channelid = n.channelid;



                        if(fundcode1==fundcode&&transactionaccountid==buyplanno){
                            window.location.href = mainUrl+"trade/timeinvest_stop.html?fundcode=" + fundcode + "&fundname="+fundname+"&buyplanno=" +buyplanno+ "&channelname=" + channelname + "&depositacctP=" + depositacctP + "&firstinvestamount=" + firstinvestamount + "&firstinvestdate=" + firstinvestdate + "&investcycle=" + investcycle + "&depositacct=" + depositacct + "&transactionaccountid1=" + transactionaccountid1 + "&branchcode=" + branchcode + "&channelid=" + channelid + "";
                        }else{
                            showAlert( "您没有该定投计划" );
                        }
                    });

                } else {
                    setErrorMsg(data.retcode, data.retmsg);

                }
            },
            error: function (data) {
                //hideloading();
                showAlert( "未找到定投的基金信息" );

            }
        })
    }
}