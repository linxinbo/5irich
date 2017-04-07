/**
 * Created by linxi on 2017/3/23.
 */
var startX = 0, startY = 0;
$(function(){
    bindEvent();
    function touchSatrtFunc(evt) {
        try{
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

            var touch = evt.originalEvent.touches[0]; //获取第一个触点
            //console.log(touch.pageX);
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标
            //记录触点初始位置
            startX = x;
            startY = y;
            var text = 'TouchStart事件触发：（' + x + ', ' + y + '）';
            //$("#result").append(text);
        }catch (e) {
            console.log('touchSatrtFunc：' + e.message);
        }
    }



//touchmove事件，这个事件无法获取坐标
    function touchMoveFunc(evt) {
        var val=$(this).attr("dataid");
        try
        {   //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.originalEvent.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标
            var text = 'TouchMove事件触发：（' + x + ', ' + y + '）';
            //判断滑动方向
            /*alert(this);*/

            if (y - startY > 0) {

                /*var val2=parseFloat(val)-1;
                if(val2<=0){
                    val2=10;
                }
                $("#zp"+val+"").slideUp();
                $("#zp"+val2+"").slideDown();*/

            }else if(y-startY < 0){
                var val1=parseFloat(val)+1;
                if(val1>10){
                    val1=1;
                }
                $("#zp"+val+"").addClass("pt-page-rotatePushBottom");
                $("#zp"+val1+"").removeClass("pt-page-rotatePushBottom");
                $("#zp"+val1+"").addClass("pt-page-moveFromTop");

            }
            //$("#result").append(text);
        }
        catch (e) {
            console.log('touchMoveFunc：' + e.message);
        }

    }

//touchend事件
    function touchEndFunc(evt) {
        var val=$(this).attr("dataid");
        try {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.originalEvent.changedTouches[0]; //获取第一个触点
            //console.log(evt);
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标
            var text = 'TouchMove事件触发：（' + x + ', ' + y + '）';
            //判断滑动方向
            //判断滑动方向
            if (y - startY > 0) {

                /*var val2=parseFloat(val)-1;
                if(val2<=0){
                    val2=10;
                }
                $("#zp"+val+"").slideUp();
                $("#zp"+val2+"").slideDown();*/

            }else if(y-startY < 0){
                var val1=parseFloat(val)+1;
                if(val1>10){
                    val1=1;
                }
                $("#zp"+val+"").addClass("pt-page-rotatePushBottom");
                $("#zp"+val1+"").removeClass("pt-page-rotatePushBottom");
                $("#zp"+val1+"").addClass("pt-page-moveFromTop");

            }


        }catch (e) {
            console.log('touchEndFunc：' + e.message);
        }

    }

//绑定事件
    function bindEvent() {
        //console.log("1");
        $('#zp1').on('touchstart', touchSatrtFunc);
        $('#zp1').on('touchmove', touchMoveFunc);
        $('#zp1').on('touchend', touchEndFunc);
        $('#zp2').on('touchstart', touchSatrtFunc);
        $('#zp2').on('touchmove', touchMoveFunc);
        $('#zp2').on('touchend', touchEndFunc);
        $('#zp3').on('touchstart', touchSatrtFunc);
        $('#zp3').on('touchmove', touchMoveFunc);
        $('#zp3').on('touchend', touchEndFunc);
        $('#zp4').on('touchstart', touchSatrtFunc);
        $('#zp4').on('touchmove', touchMoveFunc);
        $('#zp4').on('touchend', touchEndFunc);
        $('#zp5').on('touchstart', touchSatrtFunc);
        $('#zp5').on('touchmove', touchMoveFunc);
        $('#zp5').on('touchend', touchEndFunc);
        $('#zp6').on('touchstart', touchSatrtFunc);
        $('#zp6').on('touchmove', touchMoveFunc);
        $('#zp6').on('touchend', touchEndFunc);
        $('#zp7').on('touchstart', touchSatrtFunc);
        $('#zp7').on('touchmove', touchMoveFunc);
        $('#zp7').on('touchend', touchEndFunc);
        $('#zp8').on('touchstart', touchSatrtFunc);
        $('#zp8').on('touchmove', touchMoveFunc);
        $('#zp8').on('touchend', touchEndFunc);
        $('#zp9').on('touchstart', touchSatrtFunc);
        $('#zp9').on('touchmove', touchMoveFunc);
        $('#zp9').on('touchend', touchEndFunc);
        $('#zp10').on('touchstart', touchSatrtFunc);
        $('#zp10').on('touchmove', touchMoveFunc);
        $('#zp10').on('touchend', touchEndFunc);
        //console.log("2");
    }
//判断是否支持触摸事件
    function isTouchDevice() {
        $("#version").innerHTML = navigator.appVersion;
        try {
            document.createEvent("TouchEvent");
            console.log("支持TouchEvent事件！");
            bindEvent(); //绑定事件
        }catch (e){
            console.log("不支持TouchEvent事件！" + e.message);
        }
    }
    $("#zp_1").click(function () {
        $("#zp1").addClass("pt-page-rotatePushBottom");
        $("#zp2").removeClass("pt-page-rotatePushBottom");
        $("#zp2").addClass("pt-page-moveFromTop");
    });
    $("#zp_2").click(function () {
        $("#zp2").addClass("pt-page-rotatePushBottom");
        $("#zp3").removeClass("pt-page-rotatePushBottom");
        $("#zp3").addClass("pt-page-moveFromTop");
    });
    $("#zp_3").click(function () {
        $("#zp3").addClass("pt-page-rotatePushBottom");
        $("#zp4").removeClass("pt-page-rotatePushBottom");
        $("#zp4").addClass("pt-page-moveFromTop");
    });
    $("#zp_4").click(function () {
        $("#zp4").addClass("pt-page-rotatePushBottom");
        $("#zp5").removeClass("pt-page-rotatePushBottom");
        $("#zp5").addClass("pt-page-moveFromTop");

    });
    $("#zp_5").click(function () {
        $("#zp5").addClass("pt-page-rotatePushBottom");
        $("#zp6").removeClass("pt-page-rotatePushBottom");
        $("#zp6").addClass("pt-page-moveFromTop");
    });
    $("#zp_6").click(function () {
        $("#zp6").addClass("pt-page-rotatePushBottom");
        $("#zp7").removeClass("pt-page-rotatePushBottom");
        $("#zp7").addClass("pt-page-moveFromTop");
    });
    $("#zp_7").click(function () {
        $("#zp7").addClass("pt-page-rotatePushBottom");
        $("#zp8").removeClass("pt-page-rotatePushBottom");
        $("#zp8").addClass("pt-page-moveFromTop");
    });
    $("#zp_8").click(function () {
        $("#zp8").addClass("pt-page-rotatePushBottom");
        $("#zp9").removeClass("pt-page-rotatePushBottom");
        $("#zp9").addClass("pt-page-moveFromTop");
    });
    $("#zp_9").click(function () {
        $("#zp9").addClass("pt-page-rotatePushBottom");
        $("#zp10").removeClass("pt-page-rotatePushBottom");
        $("#zp10").addClass("pt-page-moveFromTop");
    });
    $("#zp_10").click(function () {
        $("#zp10").addClass("pt-page-rotatePushBottom");
        $("#zp1").removeClass("pt-page-rotatePushBottom");
        $("#zp1").addClass("pt-page-moveFromTop");
    });



});