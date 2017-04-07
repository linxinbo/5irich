/**
 * Created by linxi on 2016/12/16.
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
                //console.log(data);
                if (data.data.status){
                    mybanklist();

                }else{
                    showAlert("您没有登录！",loginStart);
                    //showAlert(data.data.msg, gologin);

                }
            }
        });



    }

});


function mybanklist(){
    $.ajax({
        type: "post",
        /*url: mainUrl + "relationList",*/
        url: mainUrl + "bankinfo",//api获取用户银行卡
        data: "",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            //hideloading();
            if (data.retcode == 0000) {
                $("#mybanklist").html("");
                $(data.data).each(function (i, n) {
                    var name = getbanktype(n.channelid);
                    var bank_list = '<div class="my_card '+Judgment_bank_card(n.channelid).bg+'"><div class="bankname"><i class="'+Judgment_bank_card(n.channelid).leiming +'"></i><a>'+name+'</a></div><span class="bankNo">'+plusXing(n.depositacct,4,4)+'</span></div>';
                    $("#mybanklist").append(bank_list);

                    //删除银行卡未启用功能
                    /*$(".bank_del").unbind('click').click(function(){
                        showAlertDel(flag);
                        $(this).parents("li").addClass("li_del");
                    });*/


                });
                var addbank='<a href="addcard.html" class="my_card addcard"></a>';
                $("#mybanklist").append(addbank);
            } else {
                setErrorMsg(data.retcode);
            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误");
        }
    })
};


//判断卡的logo和背景颜色设置
function Judgment_bank_card(channelid){
    var obj={};
    if(channelid == "KQ01"|| channelid == 9004){
        //工商
        obj.bg="color2";
        obj.leiming="gs_bank";
        return obj;
    }else if(channelid == "KQ02" ||channelid==9005 ){
        //农业
        obj.bg="color1";
        obj.leiming="ny_bank";
        return obj;
    }else if(channelid == "KQ03" ||channelid== 9011){
        //中国
        obj.bg="color1";
        obj.leiming="zg_bank";
        return obj;
    }else if(channelid == "KQ04" ||channelid== 9006){
        //建设
        obj.bg="color3";
        obj.leiming="jh_bank";
        return obj;
    }else if(channelid == "KQ05" ||channelid== 9021){
        //招商
        obj.bg="color2";
        obj.leiming="zs_bank";
        return obj;
    }else if(channelid == "KQ06" ||channelid== 9009){
        //交通
        obj.bg="color3";
        obj.leiming="jt_bank";
        return obj;
    }else if(channelid == "KQ07" ||channelid== 9017){
        //中信
        obj.bg="color1";
        obj.leiming="zx_bank";
        return obj;
    }else if(channelid == "KQ08" ||channelid== 9003){
        //浦发
        obj.bg="color3";
        obj.leiming="pf_bank";
        return obj;
    }else if(channelid == "KQ09" ||channelid== 9019){
        //兴业
        obj.bg="color1";
        obj.leiming="xy_bank";
        return obj;
    }else if(channelid == "KQ10" ||channelid== 9016){
        //广发
        obj.bg="color2";
        obj.leiming="gf_bank";
        return obj;
    }else if(channelid == "KQ11" ||channelid== 9002){
        //平安
        obj.bg="color1";
        obj.leiming="pa_bank";
        return obj;
    }else if(channelid == "KQ12"){
        //华夏
        obj.bg="color2";
        obj.leiming="hx_bank";
        return obj;
    }else if(channelid == "KQ13" ||channelid== 9001){
        //光大
        obj.bg="color1";
        obj.leiming="gd_bank";
        return obj;
    }else if(channelid == "KQ14" ||channelid== 9010){
        //民生
        obj.bg="color2";
        obj.leiming="ms_bank";
        return obj;
    }else if(channelid == "KQ15" ||channelid== 9007){
        //邮政
        obj.bg="color1";
        obj.leiming="yz_bank";
        return obj;
    }
}