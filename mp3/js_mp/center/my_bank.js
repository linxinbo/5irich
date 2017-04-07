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
        /*url: mainUrl + "relationList",*/
        url: mainUrl + "bankinfo",//api获取用户银行卡
        data: "",
        dataType: "json",
        success: function (data) {
            console.log(data);
            hideloading();
            if (data.retcode == 0000) {
                $(".bank_list ul").html("");
                $(data.data).each(function (i, n) {
                    var name = getbanktype(n.channelid);
                    var bank_list = '<li class="lan" style="background:'+Judgment_bank_card(n.channelid).bg+'"><div class="my_banktitle"><i class="'+Judgment_bank_card(n.channelid).leiming +'"></i><span>'+name+'<br><a>'+bankHide(n.depositacct)+'</a></span></div></li>';
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
    var obj={};
    if(channelid == "KQ01"|| channelid == 9004){
        //工商
        obj.bg="#fa598a";
        obj.leiming="gs_bank";
        return obj;
    }else if(channelid == "KQ02" ||channelid==9005 ){
        //农业
        obj.bg="#03a107";
        obj.leiming="ny_bank";
        return obj;
    }else if(channelid == "KQ03" ||channelid== 9011){
        //中国
        obj.bg="#fab03f";
        obj.leiming="zg_bank";
        return obj;
    }else if(channelid == "KQ04" ||channelid== 9006){
        //建设
        obj.bg="#4c91f9";
        obj.leiming="jh_bank";
        return obj;
    }else if(channelid == "KQ05" ||channelid== 9021){
        //招商
        obj.bg="#fa598a";
        obj.leiming="zs_bank";
        return obj;
    }else if(channelid == "KQ06" ||channelid== 9009){
        //交通
        obj.bg="#4c91f9";
        obj.leiming="jt_bank";
        return obj;
    }else if(channelid == "KQ07" ||channelid== 9017){
        //中信
        obj.bg="#fa598a";
        obj.leiming="zx_bank";
        return obj;
    }else if(channelid == "KQ08" ||channelid== 9003){
        //浦发
        obj.bg="#4c91f9";
        obj.leiming="pf_bank";
        return obj;
    }else if(channelid == "KQ09" ||channelid== 9019){
        //兴业
        obj.bg="#4c91f9";
        obj.leiming="xy_bank";
        return obj;
    }else if(channelid == "KQ10" ||channelid== 9016){
        //广发
        obj.bg="#fa598a";
        obj.leiming="gf_bank";
        return obj;
    }else if(channelid == "KQ11" ||channelid== 9002){
        //平安
        obj.bg="#fe9b04";
        obj.leiming="pa_bank";
        return obj;
    }else if(channelid == "KQ12"){
        //华夏
        obj.bg="#fa598a";
        obj.leiming="hx_bank";
        return obj;
    }else if(channelid == "KQ13" ||channelid== 9001){
        //光大
        obj.bg="#cb3dfa";
        obj.leiming="gd_bank";
        return obj;
    }else if(channelid == "KQ14" ||channelid== 9010){
        //民生
        obj.bg="#08b379";
        obj.leiming="ms_bank";
        return obj;
    }else if(channelid == "KQ15" ||channelid== 9007){
        //邮政
        obj.bg="#03a107";
        obj.leiming="yz_bank";
        return obj;
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


function bankHide(obj) {
    if( obj && obj.length > 0 && obj.charAt ) {
        var str = "";
        for( var i=0; i<obj.length; i++ ) {
            if( i > 3 && i < obj.length - 4 ) {
                str += '*';
            } else {
                str += obj.charAt(i) + '';
            }
        }
        return str;
    } else {
        return obj;
    }
};