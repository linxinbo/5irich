/**
 * Created by linxi on 2017/2/27.
 */
var username = $.cookie("username");
var newurl = document.referrer;
var isopen = $.cookie("isopen");
var flag=false;
var flagC=true;
var flagD=true;
var flagS=true;
$(document).ready(function () {
    var args = new getArgs();
    var prizeId = args.prizeId;
    var prizeB = args.prizeB;
    var prizeD = args.prizeD;
    var id = args.id;
    var userId = args.userId;
    var interval = 1000;
    function ShowCountDown(year,month,day,divname)
    {
        var now = new Date();
        var endDate = new Date(year, month-1, day);
        var leftTime=endDate.getTime()-now.getTime();
        var leftsecond = parseInt(leftTime/1000);
//var day1=parseInt(leftsecond/(24*60*60*6));
        var day1=Math.floor(leftsecond/(60*60*24));
        var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
        var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
        var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
        var cc = $("#"+divname+"");
        cc.html("距离活动结束还有："+day1+"天"+hour+"小时"+minute+"分"+second+"秒");
    }
    window.setInterval(function(){ShowCountDown(2017,3,15,'daojishi');}, interval);
    if (username == "" || username == null || username == undefined	|| username == "null") {
        showAlert("您没有登录！",gologin);
    }else{
        if(prizeId&&prizeId!=""){
            $(".k_prod img").attr("src","images/lipin_"+prizeId+".png");
        }
        if(id&&userId&&id!=""&&userId!=""){
            //判断帮别人砍价流程
            bargainHelpPrize(userId,prizeId);
            flagS=false;
        }else{
            //自己始处理
            alreadyBargainList();
        }




    }
    //判断帮别人砍价流程
    function bargainHelpPrize(userId,prizeId){
        showLoading();
        $.ajax({
            type: "GET",
            url: mainUrl + "bargainHelpPrize",
            data:{
                "bargainGoodsBean.userId":userId,
                "bargainGoodsBean.prizeId":prizeId
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log(data);
                if(data.retcode==0000){
                    if(data.bBean&&data.bBean.length!=0){
                        $(".firstK").hide();
                        $(data.bBean).each(function (index, ele) {
                            if(prizeId==ele.prizeId){
                                var prizePrice1=ele.prizePrice;
                                //var prizePrice1=ele.prizePrice;
                                $(".k_jiaq span").html(prizeB);
                                $(".k_jiah span").html(prizePrice1);
                                var prizeC=parseFloat(prizeB)-parseFloat(prizePrice1);
                                $("#y_k").html(prizeC);
                                var rollWidth=$(".k_roll img").width();
                                var rollWidth1=(rollWidth/parseFloat(prizeB))*prizeC;
                                var rollWidth2=Math.round(rollWidth1);
                                console.log(rollWidth2);
                                $(".yuan").css({"left":rollWidth2});
                                $(".k_roll_sm").css({"left":rollWidth2});
                                $(".k_img1").css({"width":rollWidth2});
                                $(".firstK").hide();
                                //判断用户是否有资格砍价
                                alreadyHelpBargainList(ele.id,ele.userId,ele.userTel,ele.prizeId,ele.prizePrice);
                                //bargainList(prizeId);
                                //分享
                                $(".firstF").attr("data_url",mainUrl+"mp/events/goddess/k_goddess.html?id="+ele.id+"&prizeId="+ele.prizeId+"&prizePrice="+ele.prizePrice+"&sfyx="+ele.sfyx+"&userId="+ele.userId+"&userTel="+ele.userTel+"&prizeB="+prizeB+"");
                                $(".firstF").on("click",function(){
                                    //bargainHelp(ele.id,ele.userId,ele.userTel,ele.prizeId,ele.prizePrice);
                                    /*var str=$(this).attr("data_url");
                                    Copy(str)*/
                                    $(".alertBoxNew1").show();
                                    if ($(document).height() >= $(window).height()) {
                                        alertMaskH = $(document).height();
                                    } else {
                                        alertMaskH = $(window).height();
                                    }
                                    $(".alertBoxNew1").height(alertMaskH);



                                });
                            }

                        });


                    }else{
                        $(".k_jiaq span").html(prizeB);
                        $(".k_jiah span").html(0);
                        $(".firstS").hide();
                        $(".firstF").attr("disabled",true);
                        $(".firstF").css({"background-color":"#cccccc"})
                        if(flagC){
                            $(".firstK").on("click",function(){
                                flagC=false;
                                bargainFirst(prizeId);

                            });
                        }

                    }
                    $(".k_bang_con").html("");

                    //别人的砍价榜信息
                    if(data.data&&data.data.length!=0){

                        $(data.data).each(function(i,n){
                            var cutMoney= n.cutMoney;
                            var helperTel= n.helperTel;
                            var creatTime= n.creatTime;
                            var helperWeixinNickname= n.helperWeixinNickname;
                            var helperWeixinHeadimgurl= n.helperWeixinHeadimgurl;
                            var Headimgurl="images/timg1.png";
                            if(helperWeixinHeadimgurl&&helperWeixinHeadimgurl!=""){
                                Headimgurl=helperWeixinHeadimgurl;
                            }
                            var Nickname=helperTel;
                            if(helperWeixinNickname&&helperWeixinNickname!=""){
                                Nickname=helperWeixinNickname;
                            }
                            var pie_right = '<div class="k_bang_c">'+
                                '<div class="k_bang_c_left"><img src="'+Headimgurl+'"></div>'+
                                '<div class="k_bang_c_right">-'+cutMoney+'元</div>'+
                                '<div class="k_bang_c_center"><h2>'+Nickname+'</h2><span>'+creatTime.replace('T',' ')+'</span></div></div>';
                            $(".k_bang_con").append(pie_right);



                        });
                    }else{
                        var pie_right = '<div class="k_bang_c">'+
                            '<div class="k_bang_c_left"><img src="images/timg1.png"></div>'+
                            '<div class="k_bang_c_right">-0元</div>'+
                            '<div class="k_bang_c_center"><h2>暂无信息</h2><span>2000-00-00 00:00:00</span></div></div>';
                        $(".k_bang_con").append(pie_right);
                    }
                }else{
                    setErrorMsg(data.retcode,data.retmsg)
                }


            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误！");
            }
        });

    }

    function alreadyBargainList(){
        showLoading();
        $.ajax({
            type: "GET",
            url: mainUrl + "alreadyBargainList",
            data:"",
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log(data);
                if(data.retcode==0000){
                    if(data.data&&data.data.length!=0){

                        var flag_y=false;
                        for(var k=0;k<data.data.length;k++){
                            var ele=data.data[k];
                            if(prizeId==ele.prizeId){
                                flag_y=true;
                                break;
                            }
                        }
                        if(flag_y){
                            console.log("11");
                            var prizePrice1=ele.prizePrice;
                            //var prizePrice1=ele.prizePrice;
                            $(".k_jiaq span").html(prizeB);
                            $(".k_jiah span").html(prizePrice1);
                            var prizeC=parseFloat(prizeB)-parseFloat(prizePrice1);
                            $("#y_k").html(prizeC);
                            var rollWidth=$(".k_roll img").width();
                            var rollWidth1=(rollWidth/parseFloat(prizeB))*prizeC;
                            var rollWidth2=Math.round(rollWidth1);
                            console.log(rollWidth2);
                            $(".yuan").css({"left":rollWidth2});
                            $(".k_roll_sm").css({"left":rollWidth2});
                            $(".k_img1").css({"width":rollWidth2});
                            $(".firstK").hide();
                            alreadyHelpBargainList(ele.id,ele.userId,ele.userTel,ele.prizeId,ele.prizePrice);

                            bargainList(prizeId);
                            $(".firstF").attr("data_url",mainUrl+"mp/events/goddess/k_goddess.html?id="+ele.id+"&prizeId="+ele.prizeId+"&prizePrice="+ele.prizePrice+"&sfyx="+ele.sfyx+"&userId="+ele.userId+"&userTel="+ele.userTel+"&prizeB="+prizeB+"");
                            $(".firstF").on("click",function(){
                                //bargainHelp(ele.id,ele.userId,ele.userTel,ele.prizeId,ele.prizePrice);
                                /*var str=$(this).attr("data_url");
                                Copy(str)*/
                                $(".alertBoxNew1").show();
                                if ($(document).height() >= $(window).height()) {
                                    alertMaskH = $(document).height();
                                } else {
                                    alertMaskH = $(window).height();
                                }
                                $(".alertBoxNew1").height(alertMaskH);

                            });
                            //return false;
                        }else{
                            console.log("22");
                            $(".k_jiaq span").html(prizeB);
                            $(".k_jiah span").html(0);
                            $(".firstS").hide();
                            $(".firstF").attr("disabled",true);
                            $(".firstF").css({"background-color":"#cccccc"})
                            $(".k_img1").hide();
                            if(flagC){
                                $(".firstK").on("click",function(){
                                    flagC=false;
                                    bargainFirst(prizeId);

                                });
                            }
                            bargainList(prizeId);
                        }

                        /*$(data.data).each(function (index, ele) {
                            if(prizeId==ele.prizeId){


                            }/!*else{
                                console.log("22");
                                $(".k_jiaq span").html(prizeB);
                                $(".k_jiah span").html(0);
                                $(".firstS").hide();
                                $(".firstF").attr("disabled",true);
                                $(".firstF").css({"background-color":"#cccccc"})
                                $(".k_img1").hide();
                                $(".firstK").on("click",function(){
                                    bargainFirst(prizeId);

                                });
                                bargainList(prizeId);
                            }*!/

                        });*/


                    }else{
                        $(".k_jiaq span").html(prizeB);
                        $(".k_jiah span").html(0);
                        $(".firstS").hide();
                        $(".firstF").attr("disabled",true);
                        $(".firstF").css({"background-color":"#cccccc"})
                        $(".k_img1").hide();
                        $(".firstK").on("click",function(){
                            bargainFirst(prizeId);

                        });
                        bargainList(prizeId);
                    }
                }else{
                    setErrorMsg(data.retcode,data.retmsg)
                }


            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误！");
            }
        });
    }
    //复制网址到
    function Copy(str){
        var save = function(e){
            e.clipboardData.setData('text/plain', str);
            e.preventDefault();
        }
        document.addEventListener('copy', save);
        document.execCommand('copy');
        document.removeEventListener('copy',save);
        showAlert('成功复制到粘贴板！');
    }

    function bargainHelp(id,userId,userTel,prizeId,prizePrice){
        $(".firstS").attr("disabled",true);
        $(".firstS").css({"background-color":"#cccccc"});
        $(".firstS").html("正在砍价...");
        showLoading();
        $.ajax({
            type: "GET",
            url: mainUrl + "bargainHelp",
            data:{
                "bargainGoodsBean.id":id,
                "bargainGoodsBean.userId":userId,
                "bargainGoodsBean.userTel":userTel,
                "bargainGoodsBean.prizeId":prizeId,
                "bargainGoodsBean.prizePrice":prizePrice
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log(data);
                if(data.retcode==0000){
                    flagD=false;
                    $(".firstS").removeAttr("disabled");
                    $(".firstS").css({"background-color":"#ef5374"});
                    $(".firstS").html("帮砍一刀");
                    $(".alertBoxNew").show();
                    if ($(document).height() >= $(window).height()) {
                        alertMaskH = $(document).height();
                    } else {
                        alertMaskH = $(window).height();
                    }
                    $(".alertBoxNew").height(alertMaskH);
                    /*var prizeA=data.data.prizePrice;
                     var prizeC=parseFloat(prizeB)-parseFloat(prizeA);*/
                    $("#prizeC").html(formatCurrency(data.cutMoney)+"元");
                    $(".btn_login").on("click",function(){
                        window.location.href="k_goddess.html?id="+id+"&prizeId="+prizeId+"&prizePrice="+prizePrice+"&userId="+userId+"&userTel="+userTel+"&prizeB="+prizeB+"&prizeD="+prizeD+"";
                    });

                }else{
                    flagD=true;
                    $(".firstS").removeAttr("disabled");
                    $(".firstS").css({"background-color":"#ef5374"});
                    $(".firstS").html("帮砍一刀");
                    setErrorMsg(data.retcode,data.retmsg)
                }


            },
            error: function (data) {
                flagD=true;
                $(".firstS").removeAttr("disabled");
                $(".firstS").css({"background-color":"#ef5374"});
                $(".firstS").html("帮砍一刀");
                hideloading();
                showAlert("服务器错误！");
            }
        });


    }
    function alreadyHelpBargainList(id,userId,userTel,prizeId,prizePrice){
        showLoading();
        $.ajax({
            type: "GET",
            url: mainUrl + "alreadyHelpBargainList",
            data:{
                "bargainGoodsBean.id":id,
                "bargainGoodsBean.userId":userId,
                "bargainGoodsBean.userTel":userTel,
                "bargainGoodsBean.prizeId":prizeId,
                "bargainGoodsBean.prizePrice":prizePrice
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log(data);
                if(data.retcode==0000){

                    if(data.data&&data.data.length!=0){
                        if(userId==data.data.helperId){
                            $(".firstS").attr("disabled",true);
                            $(".firstS").css({"background-color":"#cccccc"});
                            if(flagS){
                                window.location.href="k_goddess.html?id="+id+"&prizeId="+prizeId+"&prizePrice="+prizePrice+"&userId="+userId+"&userTel="+userTel+"&prizeB="+prizeB+"&prizeD="+prizeD+"";
                            }
                            if(parseFloat(prizePrice)==parseFloat(prizeD)){
                                $(".firstBuy").show();
                                $(".firstBuy").html("底价出手");
                                $(".firstBuy").on("click",function(){
                                    window.location.href="../../home.html";
                                });

                            }else{
                                $(".firstBuy").show();
                                $(".firstBuy").html("现在投资");
                                $(".firstBuy").on("click",function(){
                                    window.location.href="../../home.html";
                                });
                            }
                        }
                        flag=false;
                        console.log(55);

                    }else{
                        flag=true;
                        console.log(66);
                    }
                    console.log(flag);
                    if(flag){
                        if(flagD){
                            $(".firstS").on("click",function(){
                                flagD=false;
                                bargainHelp(id,userId,userTel,prizeId,prizePrice);
                            });
                        }

                    }else{
                        $(".firstS").attr("disabled",true);
                        $(".firstS").css({"background-color":"#cccccc"})
                    }
                }else{
                    setErrorMsg(data.retcode,data.retmsg)
                }


            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误！");
            }
        });

    }

    function bargainFirst(prizeId){
        $(".firstK").attr("disabled",true);
        $(".firstK").css({"background-color":"#cccccc"})
        $(".firstK").html("正在砍价...");
        showLoading();
        $.ajax({
            type: "GET",
            url: mainUrl + "bargainFirst",
            data:{
                "prizeId":prizeId
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log(data);
                if(data.retcode==0000){
                    $(".firstK").removeAttr("disabled");
                    $(".firstK").css({"background-color":"#ef5374"})
                    $(".firstK").html("猛砍一刀");
                    $(".alertBoxNew").show();
                    if ($(document).height() >= $(window).height()) {
                        alertMaskH = $(document).height();
                    } else {
                        alertMaskH = $(window).height();
                    }
                    $(".alertBoxNew").height(alertMaskH);
                    /*var prizeA=data.data.prizePrice;
                    var prizeC=parseFloat(prizeB)-parseFloat(prizeA);*/
                    $("#prizeC").html(formatCurrency(data.cutMoney)+"元");
                    //$(".btn_login").attr("href","k_goddess.html?prizeId="+prizeId+"&prizeB="+prizeB+"&prizeD="+prizeD+"");
                    $(".btn_login").attr("href","k_goddess.html?id="+data.data.id+"&prizeId="+data.data.prizeId+"&prizePrice="+data.data.prizePrice+"&userId="+data.data.userId+"&userTel="+data.data.userTel+"&prizeB="+prizeB+"&prizeD="+prizeD+"");
                    flagC=false;
                }else{
                    $(".firstK").removeAttr("disabled");
                    $(".firstK").css({"background-color":"#ef5374"})
                    $(".firstK").html("猛砍一刀");
                    setErrorMsg(data.retcode,data.retmsg);
                    flagC=true;
                }


            },
            error: function (data) {
                flagC=true;
                $(".firstK").removeAttr("disabled");
                $(".firstK").css({"background-color":"#ef5374"})
                $(".firstK").html("猛砍一刀");
                hideloading();
                showAlert("服务器错误！");
            }
        });

    }

    function bargainList(prizeId){
        showLoading();
        $.ajax({
            type: "GET",
            url: mainUrl + "bargainList",
            data:{
                "prizeBean.id":prizeId
            },
            dataType: "json",
            success: function (data) {
                $(".k_bang_con").html("");
                hideloading();
                console.log(data);
                if(data.retcode==0000){
                    if(data.data&&data.data.length!=0){

                        $(data.data).each(function(i,n){
                            var cutMoney= n.cutMoney;
                            var helperTel= n.helperTel;
                            var creatTime= n.creatTime;
                            var helperWeixinNickname= n.helperWeixinNickname;
                            var helperWeixinHeadimgurl= n.helperWeixinHeadimgurl;
                            var Headimgurl="images/timg1.png";
                            if(helperWeixinHeadimgurl&&helperWeixinHeadimgurl!=""){
                                Headimgurl=helperWeixinHeadimgurl;
                            }
                            var Nickname=helperTel;
                            if(helperWeixinNickname&&helperWeixinNickname!=""){
                                Nickname=helperWeixinNickname;
                            }
                            var pie_right = '<div class="k_bang_c">'+
                                '<div class="k_bang_c_left"><img src="'+Headimgurl+'"></div>'+
                                '<div class="k_bang_c_right">-'+cutMoney+'元</div>'+
                            '<div class="k_bang_c_center"><h2>'+Nickname+'</h2><span>'+creatTime.replace('T',' ')+'</span></div></div>';
                            $(".k_bang_con").append(pie_right);



                        });
                    }else{
                        var pie_right = '<div class="k_bang_c">'+
                            '<div class="k_bang_c_left"><img src="images/timg1.png"></div>'+
                            '<div class="k_bang_c_right">-0元</div>'+
                            '<div class="k_bang_c_center"><h2>暂无信息</h2><span>2000-00-00 00:00:00</span></div></div>';
                        $(".k_bang_con").append(pie_right);
                    }

                }else{
                    setErrorMsg(data.retcode,data.retmsg)
                }


            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误！");
            }
        });
    }

});