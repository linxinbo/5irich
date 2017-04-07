/**
 * Created by linxi on 2016/12/23.
 */
var isopen = $.cookie("isopen");
var username = $.cookie("username");
function backGroupStep1(fundgroupname, fundgroupcode,groupFundBuyId){
    //用户登陆验证
    if(username == "" || username == null || username == undefined|| username == "null") {
        setErrorMsg(1001);//重写报错处理
        return false;
    }else if(isopen != 1) {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);//重写报错处理
        return false;
    }else {
        window.location.href = mainUrl+"trade/backgroup.html?fundgroupname=" + fundgroupname + "&fundgroupcode="+fundgroupcode+"&groupFundBuyId=" + groupFundBuyId;
    }

}