/**
 * Created by dell on 2016/10/8.
 */
$(document).ready(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var args=new getArgs();
    var fundcode=args.fundcode; //带OF
    var nfcode1=fundcode.substring(0,6);     //不带OF
    var transactionaccountid=args.fundid;

    var fundname=args.fundname;
    var newfundname;

        if(fundname.length>=13){
            newfundname=fundname.substring(0,13)+"...";
        }else{
            newfundname=fundname;
        }
        $(".adeword").html("现金宝");

        if (username == "" || username == null || username == undefined|| username == "null") {
        showAlert("您没有登录！",goMoniLogin);
        return false;
    }else if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
        showAlert("您还未开户！，请开户后进行相关操作",goisopen);
    }else{

        //资产title显示
        $.ajax({
            url:mainUrl+"singleFundDetailQuery",
            data:{
                fundcode:fundcode,   //带OF
                transactionaccountid:transactionaccountid
            },
            dataType:"JSON",
            success:function(data){
                console.log(data);
                if(data.retcode=="0000") {
                    //日收益
                    $(".adeyester span").html(formatCurrency(data.data.fundmarketvalue_ud));
                    var ma_font2 = 'ma_valueAdd';
                    if(parseFloat(data.data.fundmarketvalue_ud) < 0){
                        ma_font2 = 'ma_valueRmv';
                    }
                    $(".adeyester span").addClass(ma_font2);

                    //总资产
                    var income_3=data.data.fundmarketvalue;
                    var twoI = income_3.indexOf("-");
                    var twoII = income_3.indexOf(".");
                    if (twoI == 0 && twoII == 1) {
                        income_3 = "-0." + income_3.substring(2);
                    }
                    if (twoII == 0) {
                        income_3 = "0" + income_3;
                    }
                    $(".adecurr span").html(income_3);

                    //累计收益
                    $(".adetotal span").html(formatCurrency(data.data.floatprofit));
                    var ma_font3 = 'ma_valueAdd';
                    if(parseFloat(data.data.floatprofit) < 0){
                        ma_font3 = 'ma_valueRmv';
                    }
                    $(".adetotal span").addClass(ma_font3);
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }

            },
            error:function(){
                showAlert("服务器错误！");
            }

        });
            //七日年化收益率显示
            $.ajax({
                type:"get",
                url:mainUrl+"monetaryFund",
                data:{
                    windcode:fundcode
                },
                dataType:"JSON",
                async:false,
                success:function(data){
                    console.log(data);
                    var fInfoUnityield=data.data.fInfoUnityield;//万份收益
                    var ma_font3 = 'ma_valueAdd';
                    if(parseFloat(data.data.fInfoUnityield) < 0){
                        ma_font3 = 'ma_valueRmv';
                    }
                    var fInfoYearlyroe=data.data.fInfoYearlyroe;//七日年化收益率
                    var ma_font2 = 'ma_valueAdd';
                    if(parseFloat(data.data.fInfoYearlyroe) < 0){
                        ma_font2 = 'ma_valueRmv';
                    }
                    var fInfoEnddate=data.data.fInfoEnddate;//更新日期
                    fInfoEnddate = fInfoEnddate.substring(0,4)+'-'+fInfoEnddate.substring(4,6)+'-'+fInfoEnddate.substring(6);
                    $(".getdate").html(fInfoEnddate);//插入日期
                    $(".qirinian span").html(parseFloat(fInfoYearlyroe).toFixed(2)+"%");//日年化收益率
                    $(".qirinian span").addClass(ma_font2);//日年化收益率
                    $(".wanshouyi span").html(formatCurrency(fInfoUnityield));//万份收益
                    $(".wanshouyi span").addClass(ma_font3);//万份收益颜色
                }
            });
            //画走势图
            drawLine(fundcode,"货币型");
            //每日收益
            meirishouyi();
        function meirishouyi(){
            $(".adejilu").empty();
            $.ajax({
                url:mainUrl+"singleFundDailyIncomeQuery",
                data:{
                    fundcode:fundcode,   //带OF
                    transactionaccountid:transactionaccountid,
                    pageSize:20,
                    pageNum:0
                },
                dataType:"JSON",
                success:function(data){
                      console.log(data);
                    if(data.retcode=="0000"){
                        $(data.data).each(function(index,item){
                            var ulbox=$("<ul class='meiri'></ul>");
                            var every=item.fundmarketvalue_ud;
                            if(every<0){
                                var classname="color2";
                            }else{
                                var classname="color1";
                                every="+"+formatCurrency(every);
                            }
                            var libox=$("<li><p class='mrpl'>"+item.navdate+"</p><p class="+classname+">"+every+"</p></li>");
                            ulbox.append(libox);
                            $(".adejilu").append(ulbox);
                        })
                    }else{
                        setErrorMsg(data.retcode, data.retmsg);
                    }

                },
                error:function(){
                    showAlert("服务器错误！");
                }
            })
        }
        $(".overli3").off("click").on("click",function(){    //转入
            buyNewStep1(nfcode1, fundname);
        });
        $(".overli2").off("click").on("click",function(){   //转出
            newbackStep1(nfcode1, fundname,transactionaccountid);
        });
            $("#traderisk").off("click").on("click",function(){   //交易须知
                window.location.href = "traderisk.html";
            });

    }



});
function getdoit2(n) {
    var x = n.indexOf(".");
    if (x == -1) {
        n = n+'.00';
    } else{
        var len = n.split('.')[1].length;
        if(len==1){
            n = n+'0';
        }else{
            n = n.substring(0, x + 3);

        }
    }
    return n;
}
function goMoniLogin(){
    window.location.href = mainUrl+"mp/login.html";
}
function goisopen(){
    window.location.href = mainUrl+"mp/account/account.html";
}
