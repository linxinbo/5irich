var deg = 'rotate(7200deg)';
var awardMoney;
$(function(){
	if(window.name != "bencalie"){
		location.reload();
		window.name = "bencalie";
		}else{
		window.name = "";
		}
    var isopen = $.cookie("isopen");
    if ($.cookie("username")) {
        $.ajax({
            url: mainUrl + "queryUserActivity",
            data: "",
            dataType: "JSON",
            success: function(data){
                console.log(data);
                if(data.retcode == 1){
                    if(data.data.activity_bonus == '50000'){
                        if(data.data.state == '0'){
                            $('.tl_btn .tl-bug2').css('display','block');
                            play();
                        }else if(data.data.state == '1'){
                            $('.tl_btn .tl-bug3').css('display','block');
                            $('.tl-bug3').click(function(){
                                window.location.href = mainUrl+ 'mp/my-assets/new_assets.html';
                            });
                        }
                        $('.tl_lottery').html("您已抽中"+data.data.activity_bonus+"元体验金");
                    }else {
                        $('.tl_btn .tl-bug1').css('display','block');
                        $('.tl_lottery').html("您已抽中"+data.data.activity_bonus+"元现金");
                        confirmDetail(data.data.activity_bonus);
                    }

                }
            },
            error: function(data){
                setErrorMsg(data);
            }
        });
    }
    $('.tl_middle').on('click',luckDrawActivity);
    $('.awarding-instructions span').on('click',function(){
        $('.instruct-cont').show();
        $('.tl_lay').show();
    });
    $('.instruct-cont .close-intruct').on('click',function(){
        $('.instruct-cont').hide();
        $('.tl_lay').hide();
    });
    //查询是否抽过奖
    function luckDrawActivity(){
        $.ajax({
            url: mainUrl + "queryUserActivity",
            data: "",
            dataType: "JSON",
            success: function(data){
                console.log(data);
                if(data.retcode == 1){
                    if(data.data.activity_bonus == '50000'){
                        if(data.data.state == '0'){
                            $('.tl_btn .tl-bug2').css('display','block');
                            play();
                        }else if(data.data.state == '1'){
                            $('.tl_btn .tl-bug3').css('display','block');
                            $('.tl-bug3').click(function(){
                                window.location.href = mainUrl+ 'mp/my-assets/new_assets.html';
                            });
                        }
                        $('.tl_lottery').html("您已抽中"+data.data.activity_bonus+"元体验金");
                    }else {
                        $('.tl_btn .tl-bug1').css('display','block');
                        $('.tl_lottery').html("您已抽中"+data.data.activity_bonus+"元现金");
                        confirmDetail(data.data.activity_bonus);
                    }

                }else if(data.retcode == 0){
                    luckDrawActivity1();

                }else if(data.retcode == '1001'){
                    showAlert('请先登录或注册！', gologin);
                }
            },error: function(data){
                setErrorMsg(data);
            }
        });
    }
    //抽奖
    function luckDrawActivity1(){
            $.ajax({
                url: mainUrl + "raffle",
                data: "",
                dataType: "JSON",
                success:function(data){
                    console.log(data);
                    if(data.retcode == '0000'){
                        var bollMoney = true;
                        if(data.data.activity_bonus == '500'){
                            deg = "rotate(7492.5deg)";
                            awardMoney = 500;
                            $('.money-img').css({
                                'background':'url(img/money/500.jpg) no-repeat center',
                                'background-size':'100% 100%'
                            });
                        } else if(data.data.activity_bonus == '50'){
                            deg = "rotate(7447.5deg)";
                            awardMoney = 50;
                            $('.money-img').css({
                                'background':'url(img/money/50.jpg) no-repeat center',
                                'background-size':'100% 100%'
                            });
                        } else if(data.data.activity_bonus == '100'){
                            deg = "rotate(7402.5deg)";
                            awardMoney = 100;
                            $('.money-img').css({
                                'background':'url(img/money/100.jpg) no-repeat center',
                                'background-size':'100% 100%'
                            });
                        } else if(data.data.activity_bonus == '10'){
                            deg = "rotate(7357.5deg)";
                            awardMoney = 10;
                            $('.money-img').css({
                                'background':'url(img/money/10.jpg) no-repeat center',
                                'background-size':'100% 100%'
                            });
                        } else if(data.data.activity_bonus == '5'){
                            deg = "rotate(7267.5deg)";
                            awardMoney = 5;
                            $('.money-img').css({
                                'background':'url(img/money/5.jpg) no-repeat center',
                                'background-size':'100% 100%'
                            });
                        } else if(data.data.activity_bonus == '50000'){
                            deg = "rotate(7312.5deg)";
                            awardMoney = 50000;
                            bollMoney = false;
                            $('.money-img').css({
                                'background':'url(img/money/50000.jpg) no-repeat center',
                                'background-size':'100% 100%'
                            });
                        }
                        $('.tl_back').css('transform',deg);
                        $('.tl_back').on('transitionend',function(){
                            if(bollMoney){
                                $('.money1 .tl_value1').html(awardMoney);
                                confirmDetail(awardMoney);
                            }else {
                                $('.money1').hide();
                                $('.money2').show();
                                play();
                            }
                            $('.tl_lay').show();
                            $('.tl_cont').show();
                        });
                        $('.tl_close').on('click',function(){
                            window.location.reload();
                        });
                    } else if(data.retcode == '0001'){
                        showAlert('您已参加过抽奖！');
                    }
                },error: function(data){
                    setErrorMsg(data);
                }
            });

    }
    //购买
    function confirmDetail(chouj){
        chouj = chouj*100;
        $(".tl-bug1").on('click',function () {
            buyNewStep1("000753", "华宝兴业量化对冲A",chouj);
        });
    }
    //使用体验金
    function play(){
        $(".tl-bug2").on('click',function () {
            if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
                setErrorMsg(1007);
                return false;
            }
            $.ajax({
                url: mainUrl + "raffleUse",
                data: "",
                dataType: "JSON",
                success:function(data){
                    if(data.retcode == '0000'){
                        showAlert('您已成功使用体验金！',function(){
                            window.location.href = mainUrl+ 'mp/my-assets/new_assets.html';
                        });
                    }else if(data.retcode == '0001'){
                        showAlert('您还未参加过抽奖！',function(){
                            window.location.reload();
                        });
                    }
                }
            });
        });
    }
});
