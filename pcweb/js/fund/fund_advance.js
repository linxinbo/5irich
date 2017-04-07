/**
 * Created by linxi on 2016/12/6.
 */
$(function(){
    //载入主题基金
    //advances();
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var alertMaskH;
    if ($(document).height() >= $(window).height()) {
        alertMaskH = $(document).height();
    } else {
        alertMaskH = $(window).height();
    }
    $(".alertBoxNew").height(alertMaskH);
    if (username == "" || username == null || username == undefined|| username == "null") {
        $('.alertBoxNew').show();
        $(".dcwj_content").show();
    }else{
        asklist();
    }

    $('.login-close').on('click',function() {
        window.location.href="../home.html";
    });

        $('#ques_submit').on('click',function(){

        var riskRange=1;
        var riskCont="";
        var radio0_1=$('#QHId1 input[name="radio0_1"]:checked').val();
        var radio0_2=$('#QHId2 input[name="radio0_2"]:checked').val();
        var radio0_3=$('#QHId3 input[name="radio0_3"]:checked').val();
        var radio0_4=$('#QHId4 input[name="radio0_4"]:checked').val();
        var radio0_5=$('#QHId5 input[name="radio0_5"]:checked').val();
        var radio0_6=$('#QHId6 input[name="radio0_6"]:checked').val();
        var radio0_7=$('#QHId7 input[name="radio0_7"]:checked').val();
        var radio0_8=$('#QHId8 input[name="radio0_8"]:checked').val();
        var radio0_9=$('#QHId9 input[name="radio0_9"]:checked').val();
        var radio0_10=$('#QHId10 input[name="radio0_10"]:checked').val();
        var radio0_11=$('#QHId11 input[name="radio0_11"]:checked').val();
        var radio0_12=$('#QHId12 input[name="radio0_12"]:checked').val();
        var radio0_13=$('#QHId13 input[name="radio0_13"]:checked').val();
        var radio0_14=$('#QHId14 input[name="radio0_14"]:checked').val();
        var radio0_15=$('#QHId15 input[name="radio0_15"]:checked').val();
        var riskNum=Number(radio0_1)+Number(radio0_2)+Number(radio0_3)+Number(radio0_4)+Number(radio0_5)+Number(radio0_6)+Number(radio0_7)+Number(radio0_8)+Number(radio0_9)+Number(radio0_10)+Number(radio0_11)+Number(radio0_12)+Number(radio0_13)+Number(radio0_14)+Number(radio0_15);
        if(riskNum > 0&&riskNum <= 24){
            riskRange = 1;
            riskCont = "保守型投资者。";
        }else if(riskNum > 24&&riskNum <= 34){
            riskRange = 2;
            riskCont = "稳健型投资者。";
        }else if(riskNum > 34&&riskNum <= 44){
            riskRange = 3;
            riskCont = "平衡型投资者。";
        }else if(riskNum > 44&&riskNum <= 60){
            riskRange = 4;
            riskCont = "积极型投资者。";
        }else if(riskNum > 60&&riskNum <= 75){
            riskRange = 5;
            riskCont = "激进型投资者。";
        }
        console.log(riskRange);
        console.log(riskCont);
        var txtUserTel=$('#txtUserTel').val();
        var txtUserName=$('#txtUserName').val();
        var txtUserNum=$('#txtUserNum').val();
        if( txtUserTel== null || txtUserTel == ""&&txtUserName==null||txtUserName==""&&txtUserNum==null||txtUserNum==""){

            showAlert('请您填写完整的表单信息！');
            return false
        }else{
            var param = {
                "sn": txtUserNum,
                "name": txtUserName
            };
            $.ajax({
                url: mainUrl+'questionnaireStatus',
                data: param,
                dataType: "JSON",
                success: function(data){
                    if(data.retcode == "0000"){
                        showAlert('您的风险等级为'+riskRange+'级,属于'+riskCont,asklist);
                    }else{
                        showAlert('保存失败！请重新提交！');
                    }
                },
                error: function(data){
                    showAlert('服务器错误，请检查网络状态！');
                }
            });
        }

    });



});




function asklist(){
    //showLoading();
    $.ajax({
        url: mainUrl+'queryQuestionnaireStatus',
        data: "",
        dataType: "JSON",
        success: function(data){
            //hideloading();
            if(data.retcode == "0000"){
                $(".dcwj_content").hide();
                $('.alertBoxNew').hide();
                $('.theme_content_in').show();
                advances();
            }else if(data.retcode == "0001"){
                $(".dcwj_content").show();
                $('.alertBoxNew').hide();
            }else{
                $(".dcwj_content").show();
                $('.alertBoxNew').show();
                //setErrorMsg(data.retcode,data.retmsg);
            }
        },
        error: function(data){
            //hideloading();
            setErrorMsg(data);
        }
    });
}


function advances(){
    $.ajax({
        type: "GET",
        //url: mainUrl + "pcweb/data/advance.json",//测试环境
        url: mainUrl + "data/advance.json",//生产环境
        dataType: "json",
        success: function (data) {
            $("#fund_theme").html("");
            var fundThemeHtml = '';
            $(data).each(function (i, n) {
                var imgurl = n.image;
                var linkurl = n.url;
                var title = n.title;
                var state = n.state;
                if(state==0){
                    fundThemeHtml += '<div class="theme"><h2>'+title+'</h2><a href="'+linkurl+'"><img src="../'+imgurl+'"></a><div class="hot_theme"><img src="../images/theme/hot_theme.png"></div></div>';
                }else{
                    fundThemeHtml += '<div class="theme"><h2>'+title+'</h2><a href="'+linkurl+'"><img src="../'+imgurl+'"></a><div class="hot_theme"><img src="../images/theme/fund_cool.png"></div></div>';
                }

            });
            $("#fund_theme").append(fundThemeHtml);
        },
        error:function(data){
            $("#fund_theme").html("");
            var fundThemeHtml = '';
                fundThemeHtml += '<div class="theme"><h2>暂无主题基金</h2></div>';
            $("#fund_theme").append(fundThemeHtml);
        }
    });

};


/*//弹出框 只有确认按钮
function showAlert(str, callback) {
    if (false) {
        alert(str);
        if (callback) {
            callback();
        }
    }

    hideAlert();

    var alertBoxMask = $('<div class="alertBoxNew_wave"></div>');

    var alertBox;
    var alertBox_h = '';
    alertBox_h += '<div class="alertContent"><div class="pack">';
    //	alertBox_h += '<h3>提示</h3>';
    alertBox_h += '<img src="../images/advance/sy_gb_logo.jpg" class="alertimg">';
    alertBox_h += '<div class="alertText"><span>' + str + '</span></div>';
    alertBox_h += '<div class="subButton"><a>确认</a></div>';
    alertBox_h += '<div class="clearfix"></div>';
    alertBox_h += '</div></div>';
    alertBox = $(alertBox_h);
    alertBoxMask.append(alertBox);
    setTimeout("console.log('等待500毫秒')", 500)
    $("body").append(alertBoxMask);
    $(".alertContent").height(200);
    var alertMaskH;
    var contH = $(window).width();
    contH = parseInt((contH - 490) / 2);
    $(".alertContent").css("left", contH);
    if ($(document).height() >= $(window).height()) {
        alertMaskH = $(document).height();
    } else {
        alertMaskH = $(window).height();
    }
    $(".alertBoxNew_wave").height(alertMaskH);
    var alertH = $(".alertContent").height();
    $(".alertContent").css("margin-top", -Math.ceil(alertH / 2));
    $(".subButton a").on('click',function () {
        hideAlert();
        if (callback) {
            callback();
        }

    });

}
//隐藏弹出框
function hideAlert() {
    if ($(".alertBoxNew_wave")) {
        $(".alertBoxNew_wave").remove();
    }
}*/
