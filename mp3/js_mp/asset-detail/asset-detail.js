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
    $(".adeword").html(newfundname);

    if (username == "" || username == null || username == undefined|| username == "null") {
        showAlert("您没有登录！",goMoniLogin);
        return false;
    }else if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
        showAlert("您还未开户！，请开户后进行相关操作",goisopen);
    }else {
        fund_detail(fundcode,transactionaccountid);
        jiaoyi(nfcode1,transactionaccountid);
        $("#btn1").click(function () {
            $(this).children().css({
                color: "#ff9900",
                borderBottom: "solid 2px #ff9900"
            }).end().siblings().children().css({color: "#666", borderBottom: "none"});
            $(".adejilu").empty();
            jiaoyi(nfcode1,transactionaccountid);
        });
        $("#btn2").click(function () {
            $(this).children().css({
                color: "#ff9900",
                borderBottom: "solid 2px #ff9900"
            }).end().siblings().children().css({color: "#666", borderBottom: "none"});
            $(".adejilu").empty();
            day_ionice(fundcode,transactionaccountid);
        });
        $(".overli3").on("click", function () {    //追加
            buyNewStep1(nfcode1, fundname);
        });
        $(".overli2").on("click", function () {   //赎回
            newbackStep1(nfcode1, fundname, transactionaccountid);
        });
        $(".adeobj i").on("click", function () {  //详情
            window.location.href = mainUrl + "mp/fund/fund_detail.html?fundid=" + fundcode + "&fundname=" + fundname;
        });
    }



});

function day_ionice(fundcode,transactionaccountid){
    showLoading();
    $.ajax({
        url:mainUrl+"singleFundDailyIncomeQuery",
        data:{
            fundcode:fundcode,   //带OF
            transactionaccountid:transactionaccountid,
            pageSize:30,
            pageNum:0
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            hideloading();
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
            hideloading();
            console.log("服务器错误！");
        }
    })
}
function fund_detail(fundcode,transactionaccountid){
    showLoading();
    $.ajax({
        url:mainUrl+"singleFundDetailQuery",
        data:{
            fundcode:fundcode,   //带OF
            transactionaccountid:transactionaccountid
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            hideloading();
            if(data.retcode=="0000") {

                $(".adeyester span").html(formatCurrency(data.data.fundmarketvalue_ud));
                //$(".adecurr span").html(data.data.fundmarketvalue);
                var newdate=data.data.navdate.substring(4,8);
                var newdatearr=new Array();
                newdatearr=newdate.split("");
                newdatearr.splice(2,0,"-");
                var newdate1=newdatearr.join("");
                $(".adeyester i").html("("+newdate1+")");
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
                $(".adetotal span").html(formatCurrency(data.data.floatprofit));
                $("#chiyouli1 .ademegdivl .adespr").html(data.data.nav);
                $("#chiyouli1 .ademegdivr .adespr").html(data.data.fundvolbalance);
                $("#chiyouli2 .ademegdivl .adespr").html(data.data.costmoney);
                $("#chiyouli2 .ademegdivr .adespr").html(formatCurrency(data.data.floatprofit));
                $("#chiyouli3 .ademegdivl .adespr").html(income_3);
                var income_2 = data.data.addincomerate;
                //var income_3=data.data.fundmarketvalue;
                var oneI = income_2.indexOf("-");
                var oneII = income_2.indexOf(".");
                if (oneI == 0 && oneII == 1) {
                    income_2 = "-0." + income_2.substring(2);
                    income_2 = Number(income_2);
                    income_2 = income_2 * 100;
                }
                //收益为.09情况；
                if (oneII == 0) {
                    income_2 = "0" + income_2;
                    income_2 = Number(income_2);
                    income_2 = income_2 * 100;
                }
                income_2 = income_2.toString();
                $("#chiyouli3 .ademegdivr .adespr").html(getdoit2(income_2) + "%");
            }else{

                setErrorMsg(data.retcode, data.retmsg);
            }

        },
        error:function(){
            hideloading();
            console.log("服务器错误！");
        }

    });
}
function jiaoyi(nfcode1,transactionaccountid){
    showLoading();
    $.ajax({
        url:mainUrl+"singleTradeInfoQuery",
        data:{
            fundCode:nfcode1,   //不带OF
            transactionAccountid:transactionaccountid,
            pageSize:20,
            pageNum:0
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            hideloading();
            if(data.retcode=="0000"){
                if(data.data.length==0){
                    var tradeinfo='<span style="padding: 1em;font-size: 1.12em;color: #333333;line-height: 3em;">暂无交易记录！</span>';
                    $(".adejilu").append(tradeinfo);
                }else{
                $(data.data).each(function(index,item){
                    var box=$("<div class='adejilubox'></div>");
                    var date=item.transactiondata;
                    var datearr=new Array();
                    datearr=date.split("");
                    datearr.splice(4,0,".");
                    datearr.splice(7,0,".");
                    var date1=datearr.join("");
                    var name1=item.fundname;
                    if(name1.length>=10) {
                        name1 = name1.substring(0, 10) + "...";
                    }
                    var nameli=$("<li>"+name1+"</li>");
                    var code=item.businesscode;
                    var busname=getBussessName(code);
                    var status=item.status;
                    var statusname=getstatsName(status);
                    var jinorfen;
                    if(busname=="赎回"||busname=="转换"){
                        if(statusname=="已结束"||statusname=="已确认"||statusname=="待复核"){
                            jinorfen=item.confirmedvol;
                        }else{
                            jinorfen=item.applicationvol;
                        }
                        var jin=$("<li style='fontSize:1.6em'>"+jinorfen+"<span style='fontSize:0.7em;color:#666;'>份</span></li>");
                    }else{
                        //if(busname=="修改分红方式"){
                        //    busname="修改分红";
                        //}
                        if(statusname=="已结束"||statusname=="已确认"||statusname=="已撤"||statusname=="待复核"){
                            jinorfen=item.confirmedamount;
                        }else{
                            jinorfen=item.applicationamount;
                        }
                        var jin=$("<li style='fontSize:1.6em'>"+jinorfen+"<span style='fontSize:0.7em;color:#666;'>元</span></li>");
                    }
                    var leiandzhu=$( "<li class='jiluli'><div class='leixing'>交易类型：<span style='color:#444'>"+busname+"</span></div><div class='zhuangtai'>交易状态：<span style='color:#444'>"+statusname+"<span></div> </li>")
                    var time=$("<p  class='jiludate'><span style='fontSize:1.24em;'>"+date1+"</span></p>");
                    var ul=$( "<ul class='jilumeg'></ul>");
                    ul.append(nameli,jin,leiandzhu);
                    box.append(time,ul);
                    $(".adejilu").append(box);

                })
                }
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error:function(){
            hideloading();
            console.log("服务器错误！");
        }
    })
}
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

