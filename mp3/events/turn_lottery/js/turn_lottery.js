$(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var money = 0;
    if (username == "" || username == null || username == undefined|| username == "null") {
        setErrorMsg(1001);
        return false;
    }
    if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
        setErrorMsg(1007);
        return false;
    }else{
        luckDrawActivity();
    }
    function luckDrawActivity(){
        $.ajax({
            url: mainUrl + "luckDrawActivity",
            data: "",
            dataType: "JSON",
            success: function(data){
                if(data.retcode == 1){
                    $('.tl_btn .tl_bug').css('display','block');
                    var money = formatCurrency(data.retmsg);
                    $('.tl_lottery').html("您已抽中"+money+"元红包");
                    var chouj = data.retmsg;
                    confirmDetail(chouj);
                }else if(data.retcode == 0){
                    $('.tl_fontY').html('1');
                    $('.tl_middle').on('click',luckDrawActivity1);
                    function luckDrawActivity1(){
                        var num = toNum(1,1001);
                        var deg = 0;
                        if(num >= 1 && num < 70){
                            deg = "rotate(7582.5deg)";
                            money = 1;
                        }else if(num >= 70 && num < 470){
                            deg = "rotate(7357.5deg)";
                            money = 10;
                        }else if(num >= 470 && num < 570){
                            deg = "rotate(7222.5deg)";
                            money = 50;
                        }else if(num >= 570 && num < 591){
                            deg = "rotate(7402.5deg)";
                            money = 100;
                        }else if(num >= 591 && num < 1000){
                            deg = "rotate(7267.5deg)";
                            money = 5;
                        }else if(num == 1000){
                            deg = "rotate(7312.5deg)";
                            money = 500;
                        }
                        $('.tl_back').css('transform',deg);
                        setTimeout(function () {
                            $.ajax({
                                url: mainUrl + "luckDrawActivity",
                                data: {
                                    "money":money
                                },
                                dataType: "JSON",
                                success:function(data){
                                    if(data.retcode == 1){
                                        $('.tl_lay').show();
                                        $('.tl_cont').show();
                                        $('.tl_value').html(money);
                                        $('.tl_value1').html(money*100);
                                        var chouj = money;
                                        confirmDetail(chouj);
                                        $('.tl_middle').off('click',luckDrawActivity1);
                                        $('.tl_close').on('click',function(chouj){
                                            $('.tl_lay').hide();
                                            $('.tl_cont').hide();
                                            $('.tl_btn .tl_bug').css('display','block');
                                            $('.tl_fontY').html(0);
                                        });
                                    }
                                }
                            });
                        },4500);
                    }
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }
        });
    }
    function toNum(n,m){
        return parseInt(Math.random()*(m-n)+n);
    }
    function confirmDetail(chouj){
        chouj = chouj*100;
        $(".tl_bug").click(function () {
            buyNewStep1("000024", "大摩双利增强A",chouj);
        });
    }
});
