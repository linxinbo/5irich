/**
 * Created by linxi on 2016/12/12.
 */
var XJB_show=false;
var XJB_show1=false;
$(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var isweixin = $.cookie("isweixin");
    var imgurl = $.cookie("imgurl");
    //console.log(username);
    var costmoney;//资产
    var groupStatus;
    var fundStatus;
    var tacticsStaus;
    //var transitStatus = false;
    //var groupSingle = false;
    if(imgurl != undefined && imgurl){
        $('.assets_head_me').attr('src',imgurl);
    }
    if (username == "" || username == null || username == undefined|| username == "null") {
        showAlert("您还未登录",loginStart);
        return false;
    }else if(isopen == '0' ||isopen == 0){
        $("#isopen").hide();
        $("#isclose").show();
        return false;
    }else{
        $("#isopen").show();
        $("#isclose").hide();


        //显示图标处理
        icon_show();





        getAssMsg(costmoney,groupStatus,fundStatus,tacticsStaus);


        //监控输入
        SuggestRemote();



        //现金宝
        $("#cash a").click(function(){
            $(this).siblings().removeClass("select").end().addClass("select");
            var cashtype=$("#cash a.select").attr("data-id");
            if(cashtype==1){
                $("#cashall").show();
                $("#cashway").hide();
            }else if(cashtype==2){
                $("#cashall").hide();
                $("#cashway").show();
            }
        });

        //组合切换
        $("#group a").click(function(){
            $(this).siblings().removeClass("select").end().addClass("select");
            var grouptype=$("#group a.select").attr("data-id");
            if(grouptype==1){
                $("#groupall").show();
                $("#groupway").hide();
            }else if(grouptype==2){
                $("#groupall").hide();
                $("#groupway").show();
            }
        });

        //策略切换
        $("#tactics a").click(function(){
            $(this).siblings().removeClass("select").end().addClass("select");
            var tacticstype=$("#tactics a.select").attr("data-id");
            if(tacticstype==1){
                $("#tacticsall").show();
                $("#tacticsway").hide();
            }else if(tacticstype==2){
                $("#tacticsall").hide();
                $("#tacticsway").show();
            }
        });


        //基金切换
        $("#fund a").click(function(){
            $(this).siblings().removeClass("select").end().addClass("select");
            var fundtype=$("#fund a.select").attr("data-id");
            if(fundtype==1){
                $("#fundall").show();
                $("#fundway").hide();
                $("#fundreg").hide();
            }else if(fundtype==2){
                $("#fundall").hide();
                $("#fundway").show();
                $("#fundreg").hide();
            }else if(fundtype==3){
                $("#fundall").hide();
                $("#fundway").hide();
                $("#fundreg").show();

            }
        });
    }


});

//iconshow
function icon_show(){
    $.ajax({
        url: mainUrl + "getLoginUserInfoForRequest",
        data: "",
        dataType: "JSON",
        success: function (data) {
            //hideloading();
            //console.log(data);
            if (data.data.status){
                //已登录增加操作
                var mydata=data.data.data;
                var username=mydata.name;
                //console.log(username);
                var tel=mydata.tel;
                var sn=mydata.sn;
                var email=mydata.email;
                var isopen=mydata.isopen;
                if(email==""||email==null||email==undefined){
                    $("#youxiang").removeClass("phone").addClass("phone1");
                    $("#youxiang").attr("title","未绑定邮箱");
                }
                if(isopen==0){
                    $("#open").removeClass("authentication").addClass("authentication1");
                    $("#card").removeClass("card").addClass("card1");
                    $("#open").attr("href","../account/account.html");
                    $("#open").attr("title","未开户");
                }



            }else{
                showAlert("您还未登录", loginStart);

            }
        }
    });
}

//获取账户所有信息
function getAssMsg(costmoney,groupStatus,fundStatus,tacticsStaus){
    //showLoading();
    $.ajax({
        url: mainUrl + "asset_summary",
        data: "",
        dataType: "JSON",
        success: function (data) {
            //hideloading();
            //console.log(data);
            if (data.retcode == 0000){
                //总资产
                costmoney = parseFloat(data.data.totalfundmarketvalue);
                getAssMsg0(costmoney,groupStatus,fundStatus,tacticsStaus);
                //昨日收益
                var yetIncome = formatCurrency(data.data.totaldayrose);
                //总收益
                var allIncome = formatCurrency(data.data.totalfundbalance);
                //no data status
                var date = data.data.tradingdate;

                $('#tatolassets').html("0.00");
                $('#tatolincome').html("0.00");
                $('#tadayincome').html("0.00");
                //$('#tatolassets').html(costmoney);
                $('#tadayincome').html(yetIncome);
                $('#asdate').html("日收益("+date.substring(date.length-4,date.length-2)+"-"+date.substring(date.length-2)+")");
                $('#tatolincome').html(allIncome);

                //新增现金宝处理
                $('#cashall table tbody').html("");
                if(data.tData&&data.tData!=""){
                    $(data.tData).each(function (index, ele) {
                        //基金名称
                        var fundName = "现金宝";
                        if(fundName.length>13){
                            fundName = "现金宝";
                        }
                        var fundCode = ele.fundcode;
                        fundCode = fundCode.substring(0,fundCode.length-3);
                        //买入金额
                        var costmoneybuy=formatCurrency(ele.costmoney);
                        //累计收益
                        var allProfit = formatCurrency(ele.floatprofit);
                        //持仓金额
                        var marketvalue = formatCurrency(ele.fundmarketvalue);
                        //昨日收益
                        var fundmarketvalue_ud = formatCurrency(ele.fundmarketvalue_ud);
                        var ma_font5 = 'fonthong';
                        if(parseFloat(ele.fundmarketvalue_ud) < 0){
                            ma_font5 ='fontlv';
                        }
                        var ma_font2 = 'fonthong';
                        if(parseFloat(allProfit) < 0){
                            ma_font2 = 'fontlv';
                        }
                        var date = ele.navdate;

                        var ma_content = '<tr><td><a>'+fundName+'</td><td>'+costmoneybuy+'</td><td>'+marketvalue+'</td><td class="'+ma_font2+'">'+allProfit+'</td><td class="'+ma_font5+'">'+fundmarketvalue_ud+'<br>';
                            ma_content += '<span class="font12hui9">'+date.substring(date.length-4,date.length-2)+'-'+date.substring(date.length-2)+'</span></td><td><a class="cash_buy" data-id='+ele.transactionaccountid+' data-code='+ele.fundcode+' data-name='+ele.fundname+'>转入</a> <a class="cash_shuhui" data-id='+ele.transactionaccountid+' data-code='+ele.fundcode+' data-name='+ele.fundname+'>转出</a><a class="cash_detail" data-id='+ele.transactionaccountid+' data-code='+ele.fundcode+' data-name='+ele.fundname+'>详情</a></td></tr>';

                        /*var ma_content = '<li class="ma_content ma_conS clearfix">';
                        /!*ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                         ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                         ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';*!/
                        ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>总金额(元)</h3><span>'+marketvalue+'</span></div>';
                        ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>昨日收益(元)</h3><span class="'+ma_font5+'">'+fundmarketvalue_ud+'</span></div>';
                        ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>累计收益(元)</h3><span class="'+ma_font2+'">'+allProfit+'</span></div>';
                        ma_content += '</li>';*/
                        $('#cashall table tbody').append(ma_content);
                        /*redeemcash();
                        detailcash();*/

                    });


                }else{
                    XJB_show=true;
                    var ma_content = '<tr><td colspan="5"><span class="none_tishi">您还未购买现金宝！</span><a class="none_tobuy" id="buy_cash">立即转入</a></td></tr>';
                    $('#cashall table tbody').append(ma_content);
                    $("#buy_cash").onclick(function(){
                        buyNewStep_cash("000662", "银华活钱宝货币F");
                    });
                }
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }
        }
    });
}


//获取组合基金在途
function getAssMsg0(costmoney,groupStatus,fundStatus,tacticsStaus) {
    $.ajax({
        url: mainUrl + "GetAsset_groupFundInTransit",
        data: {"zhlb":0},
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#groupway table tbody').html("");
            if (data.retcode == 0000) {
                if(data.data.length==0){
                    groupStatus1 = true;
                    $("#groupway_num").hide();
                    var ma_content = '<tr><td colspan="5"><span class="none_tishi">您还未购买智能组合基金</span><a class="none_tobuy" href="../home/combination.html">立即购买</a></td></tr>';
                    $('#groupway table tbody').append(ma_content);
                }else{
                    groupStatus=data.data.length;
                    $("#groupway_num").show();
                    $("#groupway_num").html("");
                    var groupnum=data.data.length;
                    if(groupnum>99){
                        var groupnum1=99;
                    }else{
                        groupnum1=groupnum;
                    }
                    $("#groupway_num").html(groupnum1);
                    $(data.data).each(function (index, ele) {
                        //基金名称
                        var fundName = ele.group_name;
                        var fundCode = ele.group_id;
                        var subTime = ele.createTime;
                        subTime = subTime.substring(0,4)+'.'+subTime.substring(5,7)+'.'+subTime.substring(8,10);
                        //if(ele.businesscode == '20' || ele.businesscode == '22')
                        //申请金额
                        var subValue= formatCurrency(ele.costmoney);
                        costmoney+=parseFloat(ele.costmoney);
                        //申请时间
                        //申请状态
                        var ma_content = '<tr><td><a href="../home/combination.html?groupcode='+fundCode+'&groupname='+fundName+'">'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></a></td><td>'+subValue+'</td><td>'+subTime+'</td><td class="fonthong">申请中</td><td><a class="group_buy" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+fundName+'>追加</a></td></tr>';
                        $('#groupway table tbody').append(ma_content);
                        buygroup();
                    });

                }
                getAssMsg1(costmoney,groupStatus,fundStatus,tacticsStaus);

            } else {
                //setErrorMsg(data.retcode, data.retmsg);
                var ma_content = '<tr><td colspan="5"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#groupway table tbody').append(ma_content);
            }
        },
        error: function (data) {
            $('#groupway table tbody').html("");
            var ma_content = '<tr><td colspan="5"><span class="none_tishi">服务器错误！</span><a class="none_tobuy" href="#">请稍候重试！</a></td></tr>';
            $('#groupway table tbody').append(ma_content);
        }
    })
}

//获取策略基金在途
function getAssMsg01(costmoney,groupStatus,fundStatus,tacticsStaus) {
    $.ajax({
        url: mainUrl + "GetAsset_groupFundInTransit",
        data: {"zhlb":1},
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#tacticsway table tbody').html("");
            if (data.retcode == 0000) {
                if(data.data.length==0){
                    groupStatus1 = true;
                    $("#tactics_num").hide();
                    var ma_content = '<tr><td colspan="5"><span class="none_tishi">您还未购买策略组合基金</span><a class="none_tobuy" href="../home/dipper.html">立即购买</a></td></tr>';
                    $('#tacticsway table tbody').append(ma_content);
                }else{
                    tacticsStaus=data.data.length;
                    $("#tactics_num").show();
                    $("#tactics_num").html("");
                    var groupnum=data.data.length;
                    if(groupnum>99){
                        var groupnum1=99;
                    }else{
                        groupnum1=groupnum;
                    }
                    $("#tactics_num").html(groupnum1);
                    $(data.data).each(function (index, ele) {
                        //基金名称
                        var fundName = ele.group_name;
                        var fundCode = ele.group_id;
                        var subTime = ele.createTime;
                        subTime = subTime.substring(0,4)+'.'+subTime.substring(5,7)+'.'+subTime.substring(8,10);
                        //if(ele.businesscode == '20' || ele.businesscode == '22')
                        //申请金额
                        var subValue= formatCurrency(ele.costmoney);
                        costmoney+=parseFloat(ele.costmoney);
                        //申请时间
                        //申请状态
                        var ma_content = '<tr><td><a href="../home/dipper.html">'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></a></td><td>'+subValue+'</td><td>'+subTime+'</td><td class="fonthong">申请中</td><td><a class="group_buy" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+fundName+'>追加</a></td></tr>';
                        $('#tacticsway table tbody').append(ma_content);
                        buygroup();
                    });

                }
                getAssMsg11(costmoney,groupStatus,fundStatus,tacticsStaus);
            } else {
                //setErrorMsg(data.retcode, data.retmsg);
                var ma_content = '<tr><td colspan="5"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#tacticsway table tbody').append(ma_content);
            }
        },
        error: function (data) {
            $('#tacticsway table tbody').html("");
            var ma_content = '<tr><td colspan="5"><span class="none_tishi">服务器错误！</span><a class="none_tobuy" href="#">请稍候重试！</a></td></tr>';
            $('#tacticsway table tbody').append(ma_content);
        }
    })
}

//获取组合基金内容
function getAssMsg1(costmoney,groupStatus,fundStatus,tacticsStaus){
    $.ajax({
        url: mainUrl + "groupFundListQuery",
        data: {"zhlb":0},
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#groupall table tbody').html("");
            if (data.retcode == 0000){
                //hideloading();
                if(data.data.length==0){
                    var ma_content = '<tr><td colspan="6"><span class="none_tishi">您没有智能组合基金！</span><a class="none_tobuy" href="../home/combination.html">立即购买</a></td></tr>';
                    $('#groupall table tbody').append(ma_content);
                }else{
                $(data.data).each(function (index, ele) {
                    //组合名称
                    var groupName = ele.group_name;
                    //组合代码
                    var groupCode = ele.group_id;
                    //累计收益
                    var allProfit = formatCurrency(ele.profit);
                    var ma_font1 = 'fonthong';
                    if(parseFloat(allProfit) < 0){
                        ma_font1 = 'fontlv';
                    }
                    //持仓金额
                    var costmoney = formatCurrency(ele.costmoney);

                    //持仓金额
                    var marketvalue = formatCurrency(ele.marketvalue);
                    //昨日收益
                    var yetProfit = formatCurrency(ele.marketvalue_rose);
                    var ma_font2 = 'fonthong';
                    if(parseFloat(yetProfit) < 0){
                        ma_font2 = 'fontlv';
                    }

                    /*var subTime = ele.createTime;
                    subTime = subTime.substring(0,4)+'.'+subTime.substring(5,7)+'.'+subTime.substring(8,10);*/

                    var ma_content = '<tr><td><a href="../home/combination.html?groupcode='+groupCode+'&groupname='+groupName+'">'+groupName+'<br><span class="font12hui9">'+groupCode+'</span></a></td><td>'+costmoney+'</td><td>'+marketvalue+'</td><td class="'+ma_font1+'">'+allProfit+'</td><td class="'+ma_font2+'">'+yetProfit+'<br>';
                    $.post(mainUrl+'groupFund_singleListQuery',{groupFund_id:ele.id},function(data){
                        var data= JSON.parse(data);
                        var date = data.data[0].navdate;
                        //console.log(date);
                        ma_content += '<span class="font12hui9">'+date.substring(date.length-4,date.length-2)+'-'+date.substring(date.length-2)+'</span></td><td><a class="group_buy" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'>追加</a> <a class="shuhui_group" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'>赎回</a><a class="group_detail" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'>详情</a></td></tr>';
                        $('#groupall table tbody').append(ma_content);
                        //confirmDetail2();
                        //点击按钮后跳转和方法
                        buygroup();
                        redeemgroup();
                        groupdetail();
                    });


                });

                }
                getAssMsg01(costmoney,groupStatus,fundStatus,tacticsStaus);
            }else{
                var ma_content = '<tr><td colspan="6"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#groupall table tbody').append(ma_content);
            }
        }
    });
}


//获取策略基金内容
function getAssMsg11(costmoney,groupStatus,fundStatus,tacticsStaus){
    $.ajax({
        url: mainUrl + "groupFundListQuery",
        data:{"zhlb":1},
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#tacticsall table tbody').html("");
            if (data.retcode == 0000){
                //hideloading();
                if(data.data.length==0){
                    if(tacticsStaus==undefined||tacticsStaus==0){
                        var ma_content = '<tr><td colspan="6"><span class="none_tishi">您没有购买策略组合</span><a class="none_tobuy" href="../home/dipper.html">立即购买</a></td></tr>';
                        $('#tacticsall table tbody').append(ma_content);
                    }else{
                        var ma_content = '<tr><td colspan="6"><span class="none_tishi">您有'+tacticsStaus+'只策略正在申请中</span><a class="none_tobuy" href="../home/dipper.html">立即购买</a></td></tr>';
                        $('#tacticsall table tbody').append(ma_content);
                    }

                }else{
                    $(data.data).each(function (index, ele) {
                        //组合名称
                        var groupName = ele.group_name;
                        //组合代码
                        var groupCode = ele.group_id;
                        //累计收益
                        var allProfit = formatCurrency(ele.profit);
                        var ma_font1 = 'fonthong';
                        if(parseFloat(allProfit) < 0){
                            ma_font1 = 'fontlv';
                        }
                        //持仓金额
                        var costmoney = formatCurrency(ele.costmoney);

                        //持仓金额
                        var marketvalue = formatCurrency(ele.marketvalue);
                        //昨日收益
                        var yetProfit = formatCurrency(ele.marketvalue_rose);
                        var ma_font2 = 'fonthong';
                        if(parseFloat(yetProfit) < 0){
                            ma_font2 = 'fontlv';
                        }

                        /*var subTime = ele.createTime;
                         subTime = subTime.substring(0,4)+'.'+subTime.substring(5,7)+'.'+subTime.substring(8,10);*/

                        var ma_content = '<tr><td><a href="../home/dipper.html">'+groupName+'<br><span class="font12hui9">'+groupCode+'</span></a></td><td>'+costmoney+'</td><td>'+marketvalue+'</td><td class="'+ma_font1+'">'+allProfit+'</td><td class="'+ma_font2+'">'+yetProfit+'<br>';
                        $.post(mainUrl+'groupFund_singleListQuery',{groupFund_id:ele.id},function(data){
                            var data= JSON.parse(data);
                            var date = data.data[0].navdate;
                            //console.log(date);
                            ma_content += '<span class="font12hui9">'+date.substring(date.length-4,date.length-2)+'-'+date.substring(date.length-2)+'</span></td><td><a class="group_buy" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'>追加</a> <a class="shuhui_group" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'>赎回</a><a class="group_detail" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'>详情</a></td></tr>';
                            $('#tacticsall table tbody').append(ma_content);
                            //confirmDetail2();
                            //点击按钮后跳转和方法
                            buygroup();
                            redeemgroup();
                            groupdetail();
                        });


                    });

                }
                getAssMsg2(costmoney,groupStatus,fundStatus);
                //getAssMsg2(costmoney,groupStatus,fundStatus);
            }else{
                var ma_content = '<tr><td colspan="6"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#tacticsall table tbody').append(ma_content);
            }
        }
    });
}

//获取在途基金内容
function getAssMsg2(costmoney,groupStatus,fundStatus) {
    $.ajax({
        url: mainUrl + "GetAsset_fundInTransit",
        data: "",
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#fundway table tbody').html("");
            if (data.retcode == 0000) {

                if(data.data.length==0){
                    transitStatus = true;
                    var ma_content = '<tr><td colspan="6"><span class="none_tishi">您还未购买基金</span><a class="none_tobuy" href="../fund/fund_all.html">立即购买</a></td></tr>';
                    $('#fundway table tbody').append(ma_content);
                    $('#fundway_num').hide();
                }else{
                    fundStatus=data.data.length;
                    $('#fundway_num').show();
                    //$('#fundway_num').html("");
                    var fundnum=data.data.length;
                    if(fundnum>99){
                        var fundnum1=99;
                    }else{
                        fundnum1=fundnum;
                    }
                    //console.log(fundnum1);
                    $("#fundway_num").html(fundnum1);

                $(data.data).each(function (index, ele) {

                    //已撤基金状态5
                    //console.log(ele.status);
                    /*if(ele.status == 5){
                        return false;
                    }*/
                    if(ele.fundname == undefined){
                        ele.fundname = "";
                    }
                    var fundName = ele.fundname;
                    if(fundName.length>13){
                        fundName = fundName.substring(0,13)+'...';
                    }
                    var fundCode = ele.fundcode;
                    var subTime = ele.transactiondata;
                    subTime = subTime.substring(0,4)+'.'+subTime.substring(4,6)+'.'+subTime.substring(6);


                    var business="";
                    var businessstate="";

                    var targetfundname = "";
                    var targetfundcode = "";

                    if(ele.businesscode == '24'){
                        //确认份额
                        business = '赎回';
                        var subValue = formatCurrency(ele.applicationvol)+"份";
                        businessstate= '赎回中';
                    }else if(ele.businesscode == '36'){
                        business = '转换';
                        var subValue= ele.applicationvol+"份";//test
                        businessstate = '转换中';
                        targetfundname = ele.targetfundname;
                        targetfundcode = ele.targetfundcode;
                    }else{
                        //if(ele.businesscode == '20' || ele.businesscode == '22')
                        //申请金额
                        business = '申购';
                        var subValue= formatCurrency(ele.applicationamount)+"元";
                        costmoney+=parseFloat(ele.applicationamount);
                        businessstate = '申请中';

                    }
                    //未撤基金状态   02
                    if(ele.status == 02){
                        var ma_content5 = '<tr><td>'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></td><td>'+business+'</td><td>'+subValue+'</td><td>'+subTime+'</td><td>'+businessstate+'</td><td>'+targetfundname+'<br><span class="font12hui9">'+targetfundcode+'</span></td><td><a class="zuijia_buy" data-code='+ele.fundcode+' data-name='+ele.fundname+'>追加</a><a class="kill_fund" data-id="'+ele.appsheetserialno+'">撤单</a></td></tr>';
                    }else{
                        var ma_content5 = '<tr><td>'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></td><td>'+business+'</td><td>'+subValue+'</td><td>'+subTime+'</td><td>'+businessstate+'</td><td>'+targetfundname+'<br><span class="font12hui9">'+targetfundcode+'</span></td><td><a class="zuijia_buy" data-code='+ele.fundcode+'>追加</a></td></tr>';
                    }
                    $('#fundway table tbody').append(ma_content5);
                    buyfund();
                    killfund();

                });
                }

                //现金宝在途
                $('#cashway table tbody').html("");
                if(data.tData&&data.tData!=""){
                   /* $("#xianjin").show();*/
                    var cashStatus=data.tData.length;
                    $('#cash_num').show();
                    //$('#fundway_num').html("");
                    var cashnum=data.tData.length;
                    if(cashnum>99){
                        var cashnum=99;
                    }else{
                        cashnum=cashnum;
                    }
                    //console.log(fundnum1);
                    $("#cash_num").html(cashnum);
                    $(data.tData).each(function (index, ele) {
                        //基金名称
                        var fundName = "现金宝";
                        if(fundName.length>13){
                            fundName = "现金宝";
                        }
                        var fundCode = ele.fundcode;
                        fundCode = fundCode.substring(0,fundCode.length-3);

                        //申请金额
                        if(ele.businesscode==22||ele.businesscode=='22'){
                            var applicationamount = formatCurrency(ele.applicationamount);
                        }else if(ele.businesscode==24||ele.businesscode=='24'){
                            var applicationamount = formatCurrency(ele.applicationvol);
                        }
                        //买入时间
                        var transactiondata = ele.transactiondata;
                        transactiondata = transactiondata.substring(0,4)+'.'+transactiondata.substring(4,6)+'.'+transactiondata.substring(6);
                        //交易状态
                        var status = ele.status;
                        var statusname="";
                        if(status==2){
                            statusname="申请中";

                        }
                        //总资产
                        if(ele.businesscode==22||ele.businesscode=='22'){
                            costmoney+=parseFloat(ele.applicationamount);
                        }else if(ele.businesscode==24||ele.businesscode=='24'){
                            costmoney+=parseFloat(ele.applicationvol);
                        }


                        var ma_content = '<tr><td><a>'+fundName+'</a></td><td>'+applicationamount+'</td><td>'+transactiondata+'</td><td class="fonthong">'+statusname+'</td><td><a class="cash_buy" data-id='+ele.id+' data-code='+ele.fundcode+' data-name='+ele.fundname+'>转入</a></td></tr>';

                        /*var ma_content = '<li class="ma_content ma_conS clearfix">';
                        /!*ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                         ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                         ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';*!/
                        ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>申请金额(元)</h3><span>'+applicationamount+'</span></div>';
                        ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>买入时间</h3><span>'+transactiondata+'</span></div>';
                        ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>交易状态</h3><span>'+statusname+'</span></div>';
                        ma_content += '</li>';*/
                        $('#cashway table tbody').append(ma_content);
                        /*buycash();*/
                    });


                }else{
                    XJB_show1=true;
                    $('#cash_num').hide();
                    if(XJB_show&&XJB_show1){
                        var ma_content = '<tr><td colspan="5"><span class="none_tishi">您还未购买现金宝！</span><a class="none_tobuy" href="javascript:void(0);" onclick="buyNewStep_cash("000662", "银华活钱宝货币F");">立即转入</a></td></tr>';
                        /*var ma_content = '<li class="ma_content ma_conS">';
                        ma_content += '<div class="ma_cont_right clearfix"><a class="XJB_buy" >立即存入</a></div>';*/
                        $('#cashway table tbody').append(ma_content);

                    }
                }
                getAssMsg3(costmoney,groupStatus,fundStatus);
                costmoney = formatCurrency(costmoney);
                $('#tatolassets').html(costmoney);
            } else {
                var ma_content = '<tr><td colspan="6"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#fundway table tbody').append(ma_content);
            }
        },
        error: function (data) {
            $('#fundway table tbody').html("");
            var ma_content = '<tr><td colspan="6"><span class="none_tishi">服务器错误！</span><a class="none_tobuy" href="#">请稍候重试！</a></td></tr>';
            $('#fundway table tbody').append(ma_content);
        }
    })
}




//获取持有基金优选内容
function getAssMsg3(costmoney,groupStatus,fundStatus) {
    $.ajax({
        url: mainUrl + "asset_summary",
        data: "",
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#fundall table tbody').html("");
            if (data.retcode == 0000) {
                if(data.data.gongMuList.length==0){
                    var ma_content = '<tr><td colspan="6"><span class="none_tishi">您没有购买基金！</span><a class="none_tobuy" href="../fund/fund_all.html">立即购买</a></td></tr>';
                    $('#fundall table tbody').append(ma_content);
                    //$('#fundall_num').hide();
                }else{
                //getAssMsg4(groupSingle,groupStatus);
                $(data.data.gongMuList).each(function (index, ele) {
                    //基金名称
                    var fundName = ele.fundname;
                    if(fundName.length>13){
                        fundName = fundName.substring(0,13)+'...';
                    }
                    var fundCode = ele.fundcode;
                    fundCode = fundCode.substring(0,fundCode.length-3);
                    //累计收益
                    var allProfit = formatCurrency(ele.floatprofit);
                    var ma_font1 = 'fonthong';
                    if(parseFloat(allProfit) < 0){
                        ma_font1 = 'fontlv';
                    }
                    //持仓金额
                    var marketvalue = formatCurrency(ele.fundmarketvalue);

                    //买入金额
                    var costmoney = formatCurrency(ele.costmoney);
                    //昨日收益
                    var yetProfit = formatCurrency(ele.fundmarketvalue_ud);
                    var ma_font2 = 'fonthong';
                    if(parseFloat(yetProfit) < 0){
                        ma_font2 = 'fontlv';
                    }
                    var date = ele.navdate;
                    if(index<5){
                        var ma_content = '<tr><td><a href="../fund/fund-detail.html?fundid='+ele.fundcode+'&fundname='+ele.fundname+'">'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></a></td><td>'+costmoney+'</td><td>'+marketvalue+'</td><td class="'+ma_font1+'">'+allProfit+'</td><td class="'+ma_font2+'">'+yetProfit+'<br><span class="font12hui9">'+date.substring(date.length-4,date.length-2)+'-'+date.substring(date.length-2)+'</span></td><td><a class="zuijia_buy" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>追加</a> <a class="regular_buy" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>定投</a><a class="shuhui_buy_move san_x">更多</a><div class="handmore" style="display: none;"><a class="redeemfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>赎回</a><a class="detailfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>详情</a><a class="convertfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>转换</a><a class="modifyfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>修改分红方式</a></div></td></tr>';
                    }else{
                        var ma_content = '<tr class="hide"><td><a href="../fund/fund-detail.html?fundid='+ele.fundcode+'&fundname='+ele.fundname+'">'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></a></td><td>'+costmoney+'</td><td>'+marketvalue+'</td><td class="'+ma_font1+'">'+allProfit+'</td><td class="'+ma_font2+'">'+yetProfit+'<br><span class="font12hui9">'+date.substring(date.length-4,date.length-2)+'-'+date.substring(date.length-2)+'</span></td><td><a class="zuijia_buy" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>追加</a> <a class="regular_buy" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>定投</a><a class="shuhui_buy_move san_x">更多</a><div class="handmore" style="display: none;"><a class="redeemfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>赎回</a><a class="detailfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>详情</a><a class="convertfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>转换</a><a class="modifyfund" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'>修改分红方式</a></div></td></tr>';
                    }
                    $('#fundall table tbody').append(ma_content);
                    //confirmDetail();

                    buyfund();
                    regularfund();
                    morecz();
                    redeemfund()
                    detailfund();
                    convertfund();
                    modifyfund();
                });
                    var ma_content1='<tr><td colspan="6" id="xia"><img src="../images/assets/xia.png" class="xia"></td></tr>';
                     ma_content1 +='<tr style="display: none;" id="shang"><td colspan="6" id="shang"><img src="../images/assets/shang.png" class="shang"></td></tr>';
                    $('#fundall table tbody').append(ma_content1);
                    $('#xia').on("click",function(){
                        $('#fundall table tbody tr').removeClass("hide");
                        $(this).hide();
                        $("#shang").show();
                    });
                    $('#shang').on("click",function(){
                        getAssMsg3(costmoney,groupStatus,fundStatus)
                    });
                }
                getAssMsg4();
            } else {
                var ma_content = '<tr><td colspan="6"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#fundall table tbody').append(ma_content);
            }
        },
        error: function (data) {
            $('#fundall table tbody').html("");
            var ma_content = '<tr><td colspan="6"><span class="none_tishi">服务器错误！</span><a class="none_tobuy" href="#">请稍候重试！</a></td></tr>';
            $('#fundall table tbody').append(ma_content);
        }
    })
}

//获取定投计划
function getAssMsg4(){
    $.ajax({
        url: mainUrl + "castqueryapi",
        data: "",
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            getAssMsg5();
            $('#fundreg table tbody').html("");
            if (data.retcode == 0000) {
                if(data.data.length==0){
                    var ma_content = '<tr><td colspan="6"><span class="none_tishi">您没有定投计划！</span><a class="none_tobuy" href="../fund/fund_all.html">立即定投</a></td></tr>';
                    $('#fundreg table tbody').append(ma_content);
                    $('#fundreg_num').hide();
                }else{
                    $('#fundreg_num').show();
                    $('#fundreg_num').html("");
                    var fundregnum=data.data.length;
                     if(fundregnum>99){
                        var fundregnum1=99;
                    }else{
                        fundregnum1=fundregnum;
                    }
                    $("#fundreg_num").html(fundregnum1);

                    $(data.data).each(function (index, ele) {
                        //基金名称
                        var fundName = ele.fundname;
                        if(fundName.length>13){
                            fundName = fundName.substring(0,13)+'...';
                        }
                        var fundCode = ele.fundcode;
                        //fundCode = fundCode.substring(0,fundCode.length-3);
                        //协议类型
                        var regularbasisquota = ele.regularbasisquota;

                        //扣款周期
                        var DateDeductions = ele.DateDeductions;

                        //扣款金额
                        var firstinvestamount = formatCurrency(ele.firstinvestamount);
                        //支付方式
                        var channelname = ele.channelname;
                        /*var ma_font2 = 'fonthong';
                        if(parseFloat(yetProfit) < 0){
                            ma_font2 = 'fontlv';
                        }*/
                        var transactionaccountid = ele.transactionaccountid;
                        var ma_content = '<tr><td>'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></td><td>'+regularbasisquota+'</td><td>'+DateDeductions+'</td><td >'+firstinvestamount+'</td><td >'+channelname+'</span></td><td><a class="timeinvest_stop" data-id='+ele.transactionaccountid+' data-buyno="'+ele.buyplanno+'" data-name='+ele.fundname+' data-code='+ele.fundcode+'>终止</a></td></tr>';
                        $('#fundreg table tbody').append(ma_content);
                        //confirmDetail();
                        stopfund();
                    });
                }
            } else {
                var ma_content = '<tr><td colspan="6"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#fundreg table tbody').append(ma_content);
            }
        },
        error: function (data) {
            $('#fundreg table tbody').html("");
            var ma_content = '<tr><td colspan="6"><span class="none_tishi">服务器错误！</span><a class="none_tobuy" href="#">请稍候重试！</a></td></tr>';
            $('#fundreg table tbody').append(ma_content);
        }
    })

};
//短期理财
//获取短期理财
function getAssMsg5(){
    $.ajax({
        url: mainUrl + "shortPeriod",
        data: "",
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#short-fund table tbody').html("");
            if (data.retcode == 0000){
                //未购买的情况
                if(data.data.length==0){
                    var ma_content5 = '<tr><td colspan="5"><span class="none_tishi">您还未购买短期理财</span><a class="none_tobuy" href="../fund/chuangfu.html">立即购买</a></td></tr>';
                    $('#short-fund table tbody').append(ma_content5);

                }else {


                    $(data.data).each(function (index, ele) {
                        //组合名称
                        var groupName = ele.product_name;
                        //累计收益
                        var allProfit = formatCurrency(ele.currentPeriod_income);
                        var ma_font1 = 'fonthong';
                        if(parseFloat(allProfit) < 0){
                            ma_font1 = 'fontlv';
                        }
                        //持仓金额
                        var marketvalue = formatCurrency(ele.invest_money);
                        //预期收益
                        //var yetProfit = formatCurrency(ele.forecast_endIncome);
                        //var ma_font2 = 'ma_valueAdd';
                        //if(parseFloat(yetProfit) < 0){
                            //ma_font2 = 'ma_valueRmv';
                        //}
                        var ma_content5 = '<tr><td>'+groupName+'</td><td>'+marketvalue+'</td><td>'+ele.curPeriod_carInteDay+'</td><td>'+ele.curPeriod_endDay+'</td><td class='+ma_font1+'>'+allProfit+'</td></tr>';
                        $('#short-fund table tbody').append(ma_content5);
                    });
                }
            }else{
                var ma_content5 = '<tr><td colspan="6"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#short-fund table tbody').append(ma_content5);
            }
            //getAssMsg5();
        }
    });
}

//购买组合
function buygroup(){
    $(".group_buy").unbind("click").click(function(){
        var groupcode=$(this).attr("data-id");
        var groupname=$(this).attr("data-name");
        buyGroupStep1(groupcode,groupname);
    });
}
//赎回组合
function redeemgroup(){
    $(".shuhui_group").unbind("click").click(function(){
        var groupid=$(this).attr("data-group");
        var groupname=$(this).attr("data-name");
        var groupcode=$(this).attr("data-code");
        backGroupStep1(groupname,groupcode,groupid);
    });
}

//组合详情
function groupdetail(){
    $(".group_detail").unbind("click").click(function(){
        var groupid=$(this).attr("data-group");
        var groupcode=$(this).attr("data-id");
        var fundgroupname=$(this).attr("data-name");
        window.location.href = "../assets/assets_group_detial.html?fundgroupcode=" + groupcode + "&fundgroupname=" + fundgroupname+"&fundid=" +groupcode+"&groupFundBuyId=" +groupid;
    });
}

//购买基金
function buyfund(){
    $(".zuijia_buy").unbind("click").click(function(){
        var fundcode=$(this).attr("data-code");
        var fandcode1=fundcode.substring(0,6);
        var fandname=$(this).attr("data-name");
        buyNewStep1(fandcode1,fandname);
    });
}

//购买现金宝
function buycash(){
    $(".cash_buy").unbind("click").click(function(){
        var fundcode=$(this).attr("data-code");
        var fandcode1=fundcode.substring(0,6);
        var fandname=$(this).attr("data-name");
        buyNewStep_cash(fandcode1,fandname);
    });
}

//基金撤单
function killfund(){
    $(".kill_fund").unbind("click").click(function(){
        var id=$(this).attr("data-id");
        showAlertHint("确定撤除交易信息吗？",function killfund1(){
            var param = {
                "cancetrading.tpasswd": "aaa",
                "cancetrading.originalappsheetno" :id
            };
            //var param = JSON.stringify(cancetrading);
            $.ajax({
                url: mainUrl + "newtradingcance",
                data: param,
                dataType: "JSON",
                success: function (data) {
                    if(data.retcode == "0000"){
                        showAlert("撤单成功!",gotoassets);
                    }else{
                        setErrorMsg(data.retcode,data.retmsg);
                    }
                },
                error: function (data) {
                    showAlert("网络错误！请稍候重试！");

                }
        });
            /*$.get(mainUrl+'newtradingcance',param,function(data){
                var data = JSON.parse(data);
                if(data.retcode == "0000"){
                    showAlert("撤单成功!",gotoassets);
                }else{
                    setErrorMsg(data.retcode,data.retmsg);
                }
            });*/

        });
    });
};

//定投基金
function regularfund(){
    $(".regular_buy").unbind("click").click(function(){
        var fundcode=$(this).attr("data-code");
        timeinvestStep1(fundcode);
    });
}

//更多操作
function morecz(){
        $(".shuhui_buy_move").unbind("click").click(function(){
            //$(".shuhui_buy_move").each(function(i){
            //console.log(this);
            //if($(this).next().css('display')=="block"){
                $(".shuhui_buy_move").next().hide();
            //}
            //});
            if($(this).hasClass("san_x")){
                $(this).removeClass("san_x").addClass("san_s");
                $(this).next().show();
            }else{
                $(this).removeClass("san_s").addClass("san_x");
                $(this).next().hide();
            }
            /*console.log($(this).next().css('display'));
            if($(this).next().css('display')=="none"){
                $(this).next().show();
            }else if($(this).next().css('display')=="block"){
                $(this).next().hide();
            }*/



    });

}

//赎回现金宝
function redeemcash(){
    $(".cash_shuhui").unbind("click").click(function(){
        var fundid=$(this).attr("data-id");
        var fundcode=$(this).attr("data-code");
        var fundname=$(this).attr("data-name");
        newRedeemStep_cash(fundcode,fundname,fundid);
    });
}

//赎回基金
function redeemfund(){
    $(".redeemfund").unbind("click").click(function(){
        var fundid=$(this).attr("data-id");
        var fundcode=$(this).attr("data-code");
        var fundname=$(this).attr("data-name");
        newRedeemStep1(fundcode,fundname,fundid);
    });
}
//基金详情
function detailfund(){
    $(".detailfund").unbind("click").click(function(){
        var fundid=$(this).attr("data-id");
        var fundcode=$(this).attr("data-code");
        var fundname=$(this).attr("data-name");
        window.location.href = '../assets/assets_fund_detial.html?fundid='+fundid+'&fundname='+fundname+'&fundcode='+fundcode+'';
    });
}

//现金宝详情
function detailcash(){
    $(".cash_detail").unbind("click").click(function(){
        var fundid=$(this).attr("data-id");
        var fundcode=$(this).attr("data-code");
        var fundname=$(this).attr("data-name");
        window.location.href = '../assets/assets_cash_detial.html?fundid='+fundid+'&fundname='+fundname+'&fundcode='+fundcode+'';
    });
}

//基金转换
function convertfund(){
    $(".convertfund").unbind("click").click(function(){
        var fundid=$(this).attr("data-id");
        var fundcode=$(this).attr("data-code");
        var fundname=$(this).attr("data-name");
        convertStep1(fundid,fundcode);
    });
}

//基金修改分红
function modifyfund(){
    $(".modifyfund").unbind("click").click(function(){
        var fundid=$(this).attr("data-id");
        var fundcode=$(this).attr("data-code");
        var fundname=$(this).attr("data-name");
        bonusfundStep1(fundcode,fundid);
    });
}

function stopfund(){
    $(".timeinvest_stop").unbind("click").click(function(){
        var fundid=$(this).attr("data-id");
        var fundcode=$(this).attr("data-code");
        var fundname=$(this).attr("data-name");
        var fundbuyno=$(this).attr("data-buyno");
        timeinvest_stopStep1(fundcode,fundname,fundbuyno);
    });
}
function gotoassets(){
    window.location.href = "assets.html";
}


//基金代码实时检索
function SuggestRemote() {
    var params = {
        "page" : 1,
        "pageRecorders" : 2000
    };
    //var url = {url:mainUrl + "/MutualFundListManacheQueryAction", data:params,type:"get",dataType:"json",}
    //var deferred = $.Deferred();
    //var deferred = $q.defer();
    //console.log( "# GET " + url + " ..." );
    //console.log(params);
    $.ajax({
        url : mainUrl + "MutualFundListManacheEasyAction",
        data : params,
        dataType : "JSON",
        success : function(ret) {
            if (ret && ret.retcode && ret.retcode == "0000") {
                var data = ret.data;
                var results = [];
                var results1 = [];
                var results2 = [];
                //console.log(data);
                if (data) {
                    $.each(data,function(i,n){
                        //var product = data;
                        results.push({
                            name : n.fundName,
                            windcode : n.fInfoWindcode,
                            netValue : n.fundName+n.fInfoPinYin+n.fInfoWindcode
                        });

                    });


                    /* if (/[0-9]+/.test(keywords)) {
                     params.flat = 0;
                     console.log(params.flat);*/
                    $('#fundZm').typeahead({
                        source : results,
                        items : 10,
                        display : 'netValue',
                        val : 'name',
                        netValue : 'windcode',
                        itemSelected : displayResult
                    });


                }
                //监控表单数据输入状态插件

            } else {
                console.log("1114");
            }
        },

        error : function(response) {
            console.log("# ERROR:" + JSON.stringify(response) + " ... FROM: ");
        }
    });

};


function displayResult(item, val, text, netValue) {
    $('#fundZm').attr("data-id",netValue);
    console.log(item);
    console.log(val);
    console.log(text);
    console.log(netValue);
    window.location.href = "../fund/fund-detail.html?fundid=" +netValue+ "&fundname="+val+"";
};