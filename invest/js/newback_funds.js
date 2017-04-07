/**
 * Created by dell on 2017/3/28.
 */
/**
 * Created by dell on 2016/10/18.
 */
//第二步入参需要参数；
//var fundida;
//var sharetype;
//var tano;
//var branchcode;
//var transactionaccountid;
//var availbal;
//var hold_min;
//var balfund;
//var per_max_24;
//var per_min_24;
//赎回第一步，判断；
function newbackStep1(fundid,fundname,transactionaccountid) {
    var fundid = fundid;
    showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "checkRedemption",
        data: {
            "listBean.fundcode": fundid,
            "transactionaccountid360": transactionaccountid
        },
        dataType: "JSON",
        success: function (data) {
            hideloading();
            console.log(data);
            if (data.retcode == 0000) {
                var sharetype = data.data.sharetype;
                var tano = data.data.tano;
                var branchcode = data.data.branchcode;
                var transactionaccountid = data.data.transactionaccountid;
                var availbal = data.data.availbal;
                var hold_min = data.data.holdmin;
                var balfund = data.data.balfund;
                var per_max_24 = data.data.per_max_24;
                var per_min_24 = data.data.per_min_24;
                window.location.href = "newback.html?fundid=" + fundid + "&fundname="+fundname+"&sharetype=" + sharetype + "&tano=" + tano + "&branchcode=" + branchcode + "&transactionaccountid=" + transactionaccountid + "&availbal=" + availbal + "&hold_min=" + hold_min + "&balfund=" + balfund + "&per_max_24=" + per_max_24 + "&per_min_24=" + per_min_24;
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            hideloading();
            alert("请稍后重试！");
        }
    })
}
