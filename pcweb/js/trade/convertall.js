/**
 * Created by linxi on 2016/12/20.
 */
//定投第一步，风险测试；
var isopen = $.cookie("isopen");
var username = $.cookie("username");
var buyflag=0;
function convertStep1(fundid,fundcode){
    var fundid = fundid;//基金代码
    var fundcode=fundcode.substring(0,6);


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
            url: mainUrl + "singlepre",
            data: {
                "pre.transactionaccountid": fundid,
                "pre.fundcode": fundcode
            },
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                console.log(data);
                if (data.retcode == 0000) {
                    var tano = data.data.tano;
                    var fundcode = data.data.fundcode;
                    var fundname = data.data.fundname;
                    var availablevol = data.data.availablevol;
                    var per_min_24 = data.data.per_min_24;
                    var per_max_24 = data.data.per_max_24;
                    var sharetype = data.data.sharetype;
                    var transactionaccountid = data.data.transactionaccountid;
                    window.location.href = mainUrl+"trade/convert.html?fundid="+transactionaccountid+"&fundcode=" + fundcode + "&fundname="+fundname+"&availablevol=" +availablevol+ "&sharetype=" +sharetype+ "&tano=" + tano + "&per_min_24=" + per_min_24 + "&per_max_24=" + per_max_24 + "";

                } else {
                    setErrorMsg(data.retcode, data.retmsg);

                }
            },
            error: function (data) {
                //hideloading();
                showAlert( "未找到要转换的基金信息" );

            }
        })
    }

}