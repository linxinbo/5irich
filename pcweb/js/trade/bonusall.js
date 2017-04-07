/**
 * Created by linxi on 2016/12/21.
 */
var isopen = $.cookie("isopen");
var username = $.cookie("username");
function bonusfundStep1(fundcode,transactionaccountid){
    var fundcode=fundcode.substring(0,6);
    var transactionaccountid=transactionaccountid;
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
            url: mainUrl + "querysbonus",
            data: {},
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                console.log(data);
                if (data.retcode == 0000) {

                    $(data.data).each(function (i, n) {
                        var fundcode1 = n.fundcode;
                        var fundname = n.fundname;
                        var dividendmethod = n.dividendmethod;
                        var transactionaccountid1 = n.transactionaccountid;
                        var branchcode = n.branchcode;
                        var sharetype = n.sharetype;

                        if(fundcode1==fundcode&&transactionaccountid==transactionaccountid1){
                            window.location.href = mainUrl+"trade/modify.html?fundcode=" + fundcode + "&fundname="+fundname+"&sharetype=" +sharetype+ "&dividendmethod=" + dividendmethod + "&transactionaccountid=" + transactionaccountid1 + "&branchcode=" + branchcode + "";
                        }else{
                            showAlert( "此基金不支持修改分红" );
                        }
                    });

                } else {
                    setErrorMsg(data.retcode, data.retmsg);

                }
            },
            error: function (data) {
                //hideloading();
                showAlert( "未找到分红的基金信息" );

            }
        })
    }
}