/**
 * Created by linxi on 2016/12/14.
 */
$(function(){
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
    $(".position_fund_title a").html("现金宝");//基金名称
    $(".position_fund_title span").html("");//基金代码
    if (username == "" || username == null || username == undefined|| username == "null") {
        showAlert("您没有登录！",loginStart);
        return false;
    }else if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);
    }else{
        //加载基金资产信息
        fundload(fundcode,transactionaccountid);



        //转入
        $(".cash_buy").off("click").on("click",function(){
            buyNewStep_cash(nfcode1,fundname);
        });
        //转出
        $(".cash_shuhui").off("click").on("click",function(){
            newRedeemStep_cash(nfcode1, fundname,transactionaccountid);
        });
        //定投
        /*$(".fund_regular").off("click").on("click",function(){
            timeinvestStep1(nfcode1);
        });*/



        //加载基金交易记录
        jiaoyi(nfcode1,transactionaccountid,10,0);
        //每日收益
        dayincome(fundcode,transactionaccountid,10,0);


    }

    $("#positionlist a").click(function(){
        $(this).siblings().removeClass("select").end().addClass("select");
        var tradeid=$("#positionlist a.select").attr("data-id");
        if(tradeid==1){
            $("#dayincome").show();
            $("#trade_record").hide();
        }else if(tradeid==2){
            $("#dayincome").hide();
            $("#trade_record").show();
        }
    });

});


function fundload(fundcode,transactionaccountid){
    $.ajax({
        url:mainUrl+"singleFundDetailQuery",
        data:{
            fundcode:fundcode,   //带OF
            transactionaccountid:transactionaccountid
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            if(data.retcode=="0000") {
                if(data.data){

                    var income_3=formatCurrency(data.data.fundmarketvalue);  //当前市值
                    $(".adecurr a").html(income_3);
                    //累计收益颜色
                    if(parseFloat(data.data.floatprofit)>0){
                        $(".adetotal a").addClass("fonthong")
                    }else{
                        $(".adetotal a").addClass("fontlv")
                    }

                    $(".adetotal a").html(formatCurrency(data.data.floatprofit));   //插入累计收益

                    $(".newnav a").html(data.data.nav);    //最新净值
                    $(".availablevol").html("持有份额："+data.data.availablevol+"份"); //持有份额
                    $(".costmoney").html("买入金额："+formatCurrency(data.data.costmoney)+"元"); //买入金额

                    //累计收益率处理成数字
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
                    $(".addincomerate").html("累计收益率："+getdoit2(income_2)+"%");  //累计收益率
                }

            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }

        },
        error:function(){
            showAlert("服务器错误！");
        }

    });
};

//交易记录
function jiaoyi(nfcode1,transactionaccountid,pageSize,pageNum){

    $.ajax({
        url:mainUrl+"singleTradeInfoQuery",
        data:{
            fundCode:nfcode1,   //不带OF
            transactionAccountid:transactionaccountid,
            pageSize:pageSize,
            pageNum:pageNum
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            if(data.retcode=="0000"){
                $("#trade_record table tbody").html("");
                if(data.data.length==0){
                    var leiandzhu='<tr><td colspan="5">暂无交易记录！</td></tr>';
                    $("#trade_record table tbody").append(leiandzhu);
                }else{
                $(data.data).each(function(index,item){
                    //交易日期
                    var date=item.transactiondata;
                    var  datearr=new Array();
                    datearr=date.split("");
                    datearr.splice(4,0,".");
                    datearr.splice(7,0,".");
                    var date1=datearr.join("");
                    //基金名称
                    var name1=item.fundname;
                    //var name1="富国城镇发展";
                    if(name1.length>=15) {
                        name1 = name1.substring(0,15) + "...";
                    }
                    var code=item.businesscode;
                    var busname=getBussessName(code);//交易类型
                    var status=item.status;
                    var statusname=getstatsName(status);//交易状态
                    var jinorfen;
                    if(busname=="赎回"){
                        if(statusname=="已结束"||statusname=="已确认"||statusname=="待复核"){
                            jinorfen=item.confirmedvol;
                        }else{
                            jinorfen=item.applicationvol;
                        }
                        var jin=jinorfen+"份";
                    }else{
                        //if(busname=="修改分红方式"){
                        //    busname="修改分红";
                        //}
                        if(statusname=="已结束"||statusname=="已确认"||statusname=="已撤"||statusname=="待复核"){
                            jinorfen=item.confirmedamount;
                        }else{
                            jinorfen=item.applicationamount;
                        }
                        var jin=jinorfen+"元";
                    }
                    var leiandzhu='<tr><td>'+date1+'</td><td>'+name1+'</td><td>'+jin+'</td><td>'+busname+'</td><td>'+statusname+'</td></tr>';
                    $("#trade_record table tbody").append(leiandzhu);
                });

                //总条数
                var totalRecord=data.totalAccount;
                //计算分页总页数算法
                var totalPages1=totalRecord % pageSize == 0 ? totalRecord / pageSize : totalRecord / pageSize + 1 ;
                //console.log(totalPages1);
                var pageNum1=pageNum+1;

                //paginator分页插件写法
                var options = {
                    currentPage: pageNum1,//当前页
                    totalPages: totalPages1,//总页数
                    numberofPages: 5,//显示的页数

                    itemTexts: function(type, page, current) { //修改显示文字
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上页";
                            case "next":
                                return "下页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }
                    }, onPageClicked: function (event, originalEvent, type, page) { //异步换页
                        jiaoyi(nfcode1,transactionaccountid,pageSize,page-1)
                    },

                };
                //$("#example").bootstrapPaginator(options);
                var element=$("#sample_2_paginate");
                element.bootstrapPaginator(options);
                }

            }else{
                //setErrorMsg(data.retcode, data.retmsg);
                var leiandzhu='<tr><td colspan="5">'+data.retmsg+'</td></tr>';
                $("#trade_record table tbody").append(leiandzhu);
            }
        },
        error:function(){
            $("#trade_record table tbody").html("");
            var leiandzhu='<tr><td colspan="5">服务器错误请稍后重试！</td></tr>';
            $("#trade_record table tbody").append(leiandzhu);
        }
    })
}


//每日收益
function dayincome(fundcode,transactionaccountid,pageSize,pageNum){
    $.ajax({
        url:mainUrl+"singleFundDailyIncomeQuery",
        data:{
            fundcode:fundcode,   //带OF
            transactionaccountid:transactionaccountid,
            pageSize:pageSize,
            pageNum:pageNum
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            $("#dayincome table tbody").html("");
            if(data.retcode=="0000"){
                if(data.data.length==0){
                    var leiandzhu='<tr><td colspan="5">暂无每日收益！</td></tr>';
                    $("#trade_record table tbody").append(leiandzhu);
                }else{
                $(data.data).each(function(index,item){
                    var every=parseFloat(item.fundmarketvalue_ud);//昨日收益
                    if(every<0){
                        var classname="fontlv";
                    }else{
                         classname="fonthong";
                        every="+"+formatCurrency(every);
                    }
                    //计算日收益率
                    var dayincomelv=every/(parseFloat(item.fundmarketvalue)-every);
                    var dayincomelv1=dayincomelv*100;
                    //console.log(dayincomelv1);
                    var dayincomelv2=dayincomelv1.toFixed(2);
                    if(dayincomelv2<0){
                        var classname1="fontlv";
                    }else{
                        classname1="fonthong";
                    }
                    var libox='<tr><td>'+item.navdate+'</td><td>'+item.nav+'</td><td>'+item.nav+'</td><td class="'+classname+'">'+every+'</td><td class="'+classname1+'">'+dayincomelv2+'%</td></tr>';
                    $("#dayincome table tbody").append(libox);
                });

                //总条数
                var totalRecord=data.totalAccount;
                //计算分页总页数算法
                var totalPages1=totalRecord % pageSize == 0 ? totalRecord / pageSize : totalRecord / pageSize + 1 ;
                //console.log(totalPages1);
                var pageNum1=pageNum+1;

                //paginator分页插件写法
                var options = {
                    currentPage: pageNum1,//当前页
                    totalPages: totalPages1,//总页数
                    numberofPages: 5,//显示的页数

                    itemTexts: function(type, page, current) { //修改显示文字
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上页";
                            case "next":
                                return "下页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }
                    }, onPageClicked: function (event, originalEvent, type, page) { //异步换页
                        dayincome(fundcode,transactionaccountid,pageSize,page-1)
                    },

                };
                //$("#example").bootstrapPaginator(options);
                var element=$("#sample_1_paginate");
                element.bootstrapPaginator(options);
                }
            }else{
                //setErrorMsg(data.retcode, data.retmsg);
                var leiandzhu='<tr><td colspan="5">'+data.retmsg+'</td></tr>';
                $("#trade_record table tbody").append(leiandzhu);
            }

        },
        error:function(){
            $("#dayincome table tbody").html("");
            var leiandzhu='<tr><td colspan="5">服务器错误,请稍后重试！</td></tr>';
            $("#trade_record table tbody").append(leiandzhu);
        }
    })
}

//保留两位小数
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