/**
 * Created by linxi on 2016/12/26.
 */
$(function() {
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var isweixin = $.cookie("isweixin");
    var imgurl = $.cookie("imgurl");
    if (username == "" || username == null || username == undefined || username == "null") {
        showAlert("您没有登录！",loginStart);
        return false;
    } else if (isopen == '0' || isopen == 0) {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);
        return false;
    } else {
        //后台判断用户是否登录的接口
        $.ajax({
            url: mainUrl + "getLoginUserInfoForRequest",
            data: "",
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                var riskdj="";
                var riskdjsm="";
                var riskfx="";
                var rsiksy="";
                console.log(data);
                if (data.data.status){
                    if(data.data.data&&data.data.data.riskAsstLevel){
                        if(data.data.data.riskAsstLevel=="01"){
                            riskdj="安逸型";
                            riskdjsm="在基金投资过程中，保护本金不受损失和保持资产的流动性是您的首要目标。您对投资的态度是希望投资收益稳定，不愿或不能承担高风险以换取高收益，通常不太在意资金是否有较大增值，追求稳定。有的投资者可能并不认为自己属于安全型一类，但因为年龄或家累的缘故，抗风险能力实际并不强，此时，获取稳定回报应当成为投资的首要考虑。";
                            riskfx="低";
                            rsiksy="很稳定的投资收益";
                        }else if(data.data.data.riskAsstLevel=="02"){
                            riskdj="保守型";
                            riskdjsm="稳定是您首要考虑的因素之一。在基金投资中，您希望在保证本金安全的基础上能有一些增值收入。追求较低的风险，对投资回报的要求不是太高。";
                            riskfx="较低";
                            rsiksy="稳定的投资收益";
                        }else if(data.data.data.riskAsstLevel=="03"){
                            riskdj="稳健型";
                            riskdjsm="在基金投资的过程中，风险较小的情况下获得一定的收益是您主要的投资目的。您通常愿意使本金面临一定的风险，但在做投资决定时，会仔细地对将要面临的风险进行认真的分析。 总体来看，您愿意承受市场的平均风险。";
                            riskfx="中";
                            rsiksy="中等回报率";
                        }else if(data.data.data.riskAsstLevel=="04"){
                            riskdj="积极型";
                            riskdjsm="在基金投资中，您渴望有较高的投资收益，但又不愿承受较大的风险；可以承受一定的投资波动，但是希望自己的投资风险小于市场的整体风险。您有较高的收益目标，且对风险有清醒的认识。";
                            riskfx="中高";
                            rsiksy="中高回报率";
                        }else if(data.data.data.riskAsstLevel=="05"){
                            riskdj="激进型";
                            riskdjsm="在基金投资中，您通常专注于投资的长期增值，并愿意为此承受较大的风险。短期的投资波动并不会对您造成大的影响，追求超高的回报才是您关注的目标。";
                            riskfx="高";
                            rsiksy="高回报率";
                        }
                        $(".riskdj").html(riskdj); //风险等级
                        $(".riskdjsm").html(riskdjsm); //等级说明
                        $(".riskfx").html(riskfx); //承受风险能力
                        $(".rsiksy").html(rsiksy);//回报率



                    }else{
                        window.location.href = "my_risk1.html";
                    }

                }else{
                    showAlert("您没有登录！",loginStart);
                    //showAlert(data.data.msg, gologin);

                }
            }
        });



    }
});