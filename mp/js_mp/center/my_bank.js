/**
 * Created by d on 2016/6/8.
 */
$(function(){

    $("#bank_add").click(function(){
        window.location.href="bank_add.html";
    });

    showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "relationList",
        data: "",
        dataType: "json",
        success: function (data) {
            console.log(data);
            hideloading();
            if (data.retcode == 0000) {
                $(".bank_list ul").html("");
                $(data.data).each(function (i, n) {
                    var name = getbanktype(n.channelid);
                    var bank_list = '<li class="lan">'
                        +'<div class="my_banktitle"><i class="'+Judgment_bank_card(n.channelid) +'"></i><span>'+name+'<br>'+n.depositacct+'</span></div>'
                        +'<div class="my_bankend"></div>'
                        +'</li>';
                    $(".my_bankka ul").append(bank_list);
                    $(".bank_del").unbind('click').click(function(){
                        showAlertDel(flag);
                        $(this).parents("li").addClass("li_del");
                    });
                });
            } else {
                setErrorMsg(data.retcode);
            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误");
        }
    })
})

function Judgment_bank_card(channelid){
    if(channelid == "KQ01"|| channelid == 9004){
        //工商
        return "gs_bank";
    }else if(channelid == "KQ02" ||channelid==9005 ){
        //农业
        return "ny_bank";
    }else if(channelid == "KQ03" ||channelid== 9011){
        //中国
        return "zg_bank";
    }else if(channelid == "KQ04" ||channelid== 9006){
        //建设
        return "jh_bank";
    }else if(channelid == "KQ05" ||channelid== 9021){
        //招商
        return "zs_bank";
    }else if(channelid == "KQ06" ||channelid== 9009){
        //交通
        return "jt_bank";
    }else if(channelid == "KQ07" ||channelid== 9017){
        //中信
        return "zx_bank";
    }else if(channelid == "KQ08" ||channelid== 9003){
        //浦发
        return "pf_bank";
    }else if(channelid == "KQ09" ||channelid== 9019){
        //兴业
        return "xy_bank";
    }else if(channelid == "KQ10" ||channelid== 9016){
        //广发
        return "gf_bank";
    }else if(channelid == "KQ11" ||channelid== 9002){
        //平安
        return "pa_bank";
    }else if(channelid == "KQ12"){
        //华夏
        return "hx_bank";
    }else if(channelid == "KQ13" ||channelid== 9001){
        //光大
        return "gd_bank";
    }else if(channelid == "KQ14" ||channelid== 9010){
        //民生
        return "ms_bank";
    }else if(channelid == "KQ15" ||channelid== 9007){
        //邮政
        return "yz_bank";
    }
}


var flag=false;

//弹出框 确认按钮加提示表示
function showAlertDel(callback, callback2) {
    if (false) {
        if (callback) {
            callback();
        }
    }
    hideAlert();
    var alertBoxMask = $('<div class="alertBoxNew"></div>');

    var alertBox;
    var alertBox_h = '';
    alertBox_h += '<div class="alertContent"><div class="pack">';
    alertBox_h += '<h3>是否删除该银行卡信息</h3>';
    alertBox_h += '<div class="subButton"><a class="cancle">取消</a><a class="confirm">确认</a></div>';
    alertBox_h += '<div class="clearfix"></div>';
    alertBox_h += '</div></div>';
    alertBox = $(alertBox_h);
    alertBoxMask.append(alertBox);

    $("body").append(alertBoxMask);
    $(".alertContent").height($(".alertText2").height() + 110);
    var alertMaskH;
    var contH = $(window).width();
    contH = parseInt((contH - 250) / 2);
    $(".alertContent").css("left", contH);
    if ($(document).height() >= $(window).height()) {
        alertMaskH = $(document).height();
    } else {
        alertMaskH = $(window).height();
    }
    $(".alertBoxNew").height(alertMaskH);
    var alertH = $(".alertContent").height();
    $(".alertContent").css("margin-top", -Math.ceil(alertH / 2));
    $(".subButton .confirm").click(function () {
        console.log("点击确认按钮！");
        $(".li_del").remove();
        var length = $(".bank_list ul li").size();
        console.log(length);
        if(length==0){
            $(".zanwu").show();
        }
        hideConfirm();
    });

    $(".subButton .cancle").click(function () {
        console.log("点击取消按钮！");
        if (callback2) {
            callback2();
        } else {
            hideConfirm();
        }
    });
}