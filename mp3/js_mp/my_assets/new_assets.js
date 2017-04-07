var XJB_show=false;
var XJB_show1=false;
(function(){
    var costmoney;//资产
    var groupStatus = false;
    var groupStatus1 = false;
    var transitStatus = false;
    var groupSingle = false;
    var tacticsStaus = false;
    $(function(){
        var isopen = $.cookie("isopen");
        var username = $.cookie("username");
        var isweixin = $.cookie("isweixin");
        var imgurl = $.cookie("imgurl");

        //console.log($.cookie());
        if(imgurl != undefined && imgurl){
            $('.ma_userhead').attr('src',imgurl);
        }
        if (username == "" || username == null || username == undefined|| username == "null") {
            setErrorMsg(1001);
            return false;
        } else if(isweixin == '0' ||isweixin == 0){
            $('.ma_nav').hide();
            $(".ma_noDataWei").show();
            return false;
        } else {
            $('.ma_name').html(username);
            if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
                $(".ma_nav").hide();
                $(".ma_noDataAll").show();
            } else {
                getAssMsg(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus);
            }
        }
    });

    //获取账户所有信息
    function getAssMsg(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus){
        showLoading();
        $.ajax({
            url: mainUrl + "asset_summary",
            data: "",
            dataType: "JSON",
            success: function (data) {
                hideloading();
                if (data.retcode == 0000){
                    //总资产
                    costmoney = parseFloat(data.data.totalfundmarketvalue);
                    getAssMsg00(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus);
                    //昨日收益
                    var yetIncome = formatCurrency(data.data.totaldayrose);
                    //总收益
                    var allIncome = formatCurrency(data.data.totalfundbalance);
                    //no data status
                    var groupStatus = false;
                    var singleStatus = false;
                    var transitStatus = false;
                    var date = data.data.tradingdate;
                    //console.log(date);
                    $('#ma_yetGain .ma_num').html("0.00");
                    $('#ma_totalVal .ma_num').html("0.00");
                    $('#ma_accEarn .ma_num').html("0.00");
                    $('#ma_yetGain .ma_num').html(yetIncome);
                    $('#ma_yetGain .ma_font').html("日收益(元)"+date.substring(date.length-4,date.length-2)+"-"+date.substring(date.length-2));
                    $('#ma_accEarn').html(allIncome);
                    //新增现金宝处理
                    if(data.tData&&data.tData!=""){
                        $("#xianjin").show();
                        $(data.tData).each(function (index, ele) {
                            //基金名称
                            var fundName = ele.fundname;
                            if(fundName.length>13){
                                fundName = fundName.substring(0,13)+'...';
                            }
                            var fundCode = ele.fundcode;
                            fundCode = fundCode.substring(0,fundCode.length-3);
                            //累计收益
                            var allProfit = formatCurrency(ele.floatprofit);
                            //持仓金额
                            var marketvalue = formatCurrency(ele.availablevol);
                            //昨日收益
                            var fundmarketvalue_ud = formatCurrency(ele.fundmarketvalue_ud);
                            var ma_font5 = 'ma_valueAdd';
                            if(parseFloat(ele.fundmarketvalue_ud) < 0){
                                ma_font5 ='ma_valueRmv';
                            }
                            var ma_font2 = 'ma_valueAdd';
                            if(parseFloat(allProfit) < 0){
                                ma_font2 = 'ma_valueRmv';
                            }
                            var date = ele.navdate;
                            var ma_content = '<li class="ma_content ma_conS clearfix">';
                            /*ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                            ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                            ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';*/
                            ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>总金额(元)</h3><span>'+marketvalue+'</span></div>';
                            ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>昨日收益(元)</h3><span class="'+ma_font5+'">'+fundmarketvalue_ud+'</span></div>';
                            ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>累计收益(元)</h3><span class="'+ma_font2+'">'+allProfit+'</span></div>';
                            ma_content += '</li>';
                            $('#xianjin').append(ma_content);
                            confirm_tData_Detail();
                        });


                    }else{
                        XJB_show=true;
                    }

                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }
        });
    }
    //获取策略基金在途
    function getAssMsg00(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus) {
        $.ajax({
            url: mainUrl + "GetAsset_groupFundInTransit",
            data: {"zhlb":1},
            dataType: "JSON",
            success: function (data) {
                //console.log(data);
                if (data.retcode == 0000) {
                    $('.ma_comC').html();
                    if(data.data.length==0){
                        tacticsStaus = true;
                    }
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
                        var ma_content = '<li class="ma_content"><div class="ma_contL clearfix">';
                        ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                        ma_content += '<span class="ma_noCancle" data-id="ele.appsheetserialno"></span></div><div class="ma_contR clearfix">';
                        ma_content += '<span class="ma_contL3">申请金额(元)：<span>'+subValue+'</span></span>';
                        ma_content += '<span class="ma_contL4">申请时间：<span>'+subTime+'</span></span>';
                        ma_content += '<span class="ma_contRb">申请中</span></div></li>';
                        $('.ma_comC').append(ma_content);
                    });
                    getAssMsg11(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus);
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                showAlert("服务器错误！");
            }
        })
    }
    //获取组合基金在途
    function getAssMsg0(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus) {
        $.ajax({
            url: mainUrl + "GetAsset_groupFundInTransit",
            data: {"zhlb":0},
            dataType: "JSON",
            success: function (data) {
                //console.log(data);
                if (data.retcode == 0000) {
                    $('.ma_comb').html();
                    if(data.data.length==0){
                        groupStatus1 = true;
                    }
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
                        var ma_content = '<li class="ma_content"><div class="ma_contL clearfix">';
                        ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                        ma_content += '<span class="ma_noCancle" data-id="ele.appsheetserialno"></span></div><div class="ma_contR clearfix">';
                        ma_content += '<span class="ma_contL3">申请金额(元)：<span>'+subValue+'</span></span>';
                        ma_content += '<span class="ma_contL4">申请时间：<span>'+subTime+'</span></span>';
                        ma_content += '<span class="ma_contRb">申请中</span></div></li>';
                        $('.ma_comb').append(ma_content);
                    });
                    getAssMsg1(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus);
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                showAlert("服务器错误！");
            }
        })
    }
    //获取策略基金内容
    function getAssMsg11(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus){
        $.ajax({
            url: mainUrl + "groupFundListQuery",
            data:{"zhlb":1},
            dataType: "JSON",
            success: function (data) {
                //console.log(data);
                if (data.retcode == 0000){
                    hideloading();
                    if(data.data.length==0){
                        if(tacticsStaus){
                            $(".ma_comC").hide();
                            groupStatus = true;
                        }
                    }
                    getAssMsg0(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus);
                    $(data.data).each(function (index, ele) {
                        //组合名称
                        var groupName = ele.group_name;
                        //累计收益
                        var allProfit = formatCurrency(ele.profit);
                        //持仓金额
                        var marketvalue = formatCurrency(ele.marketvalue);
                        //昨日收益
                        var ma_font2 = 'ma_valueAdd';
                        if(parseFloat(allProfit) < 0){
                            ma_font2 = 'ma_valueRmv';
                        }
                        var ma_content = '<li class="ma_content ma_conZ" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'><div class="ma_contL clearfix">';
                        ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+groupName+'</span><span class="ma_contL2">'+ele.group_id+'</span></div>';
                        ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                        ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';
                        ma_content += '<span class="ma_contRb">累计收益(元)</span></div></li>';
                        $('.ma_comC').append(ma_content);
                        confirmDetail2();
                    });
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }
        });
    }
    //获取组合基金内容
    function getAssMsg1(costmoney,groupStatus,transitStatus,groupStatus1,tacticsStaus){
        $.ajax({
            url: mainUrl + "groupFundListQuery",
            data: {"zhlb":0},
            dataType: "JSON",
            success: function (data) {
                //console.log(data);
                if (data.retcode == 0000){
                    hideloading();
                    if(data.data.length==0){
                        if(groupStatus1){
                            $(".ma_comb").hide();
                            groupStatus = true;
                        }
                    }
                    getAssMsg2(costmoney,groupStatus,transitStatus,groupStatus1);
                    $(data.data).each(function (index, ele) {
                        //组合名称
                        var groupName = ele.group_name;
                        //累计收益
                        var allProfit = formatCurrency(ele.profit);
                        //持仓金额
                        var marketvalue = formatCurrency(ele.marketvalue);
                        //昨日收益
                        var ma_font2 = 'ma_valueAdd';
                        if(parseFloat(allProfit) < 0){
                            ma_font2 = 'ma_valueRmv';
                        }
                        var ma_content = '<li class="ma_content ma_conZ" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'><div class="ma_contL clearfix">';
                        ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+groupName+'</span><span class="ma_contL2">'+ele.group_id+'</span></div>';
                        ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                        ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';
                        ma_content += '<span class="ma_contRb">累计收益(元)</span></div></li>';
                        $('.ma_comb').append(ma_content);
                        confirmDetail2();
                    });
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }
        });
    }//获取在途基金内容
    function getAssMsg2(costmoney,groupStatus,transitStatus) {
        $.ajax({
            url: mainUrl + "GetAsset_fundInTransit",
            data: "",
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                var isRedeemData=[];
                if (data.retcode == 0000) {
                    $('.ma_pref').html();
                    if(data.data.length==0){
                        transitStatus = true;
                    }

                    $(data.data).each(function (index, ele) {
                        //基金名称
                        if(ele.status == 5){
                            return;
                        }
                        if(ele.fundname == undefined){
                            ele.fundname = "";
                        }
                        var fundName = ele.fundname;
                        if(fundName.length>13){
                            fundName = fundName.substring(0,13)+'...';
                        }
                        var transactionaccountid=ele.transactionaccountid;
                        var fundCode = ele.fundcode;
                        isRedeemData.push({"fundCode":fundCode,"transactionaccountid":transactionaccountid});
                        var subTime = ele.transactiondata;
                        subTime = subTime.substring(0,4)+'.'+subTime.substring(4,6)+'.'+subTime.substring(6);

                        if(ele.businesscode == '24'){
                            //确认份额
                            var subName1 = '赎回份额';
                            var subValue = formatCurrency(ele.applicationvol);
                            var subName2 = '赎回时间';
                            var ma_can = 'ma_noCancle';
                            var subName3 = "";
                            var subName4 = '赎回中';
                            if(ele.status == 2){
                                subName3 = '撤销';
                                ma_can = 'ma_cancle';
                            }else if(ele.status == 06){
                                subName3 = '已报';
                            }

                        }else if(ele.businesscode == '20'){
                            var subName1 = '转换金额(元)';
                            var subValue= formatCurrency(ele.applicationamount);//test
                            //申请时间
                            var subName2 = '转换时间';
                            //申请状态
                            var ma_can = 'ma_noCancle';
                            var subName3 = "";
                            subName4 = '转换中';
                            if(ele.status == 2){
                                subName3 = '撤销';
                                ma_can = 'ma_cancle';
                            }
                        }else{
                            //if(ele.businesscode == '20' || ele.businesscode == '22')
                            //申请金额
                            var subName1 = '申请金额(元)';
                            var subValue= formatCurrency(ele.applicationamount);
                            costmoney+=parseFloat(ele.applicationamount);
                            //申请时间
                            var subName2 = '申请时间';
                            //申请状态
                            var ma_can = 'ma_noCancle';
                            var subName3 = "";
                            subName4 = '申请中';
                            if(ele.status == 2){
                                subName3 = '撤销';
                                ma_can = 'ma_cancle';
                            }
                        }
                        var ma_content = '<li class="ma_content"><div class="ma_contL clearfix">';
                        ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                        ma_content += '<span class='+ma_can+' data-id='+ele.appsheetserialno+'>'+subName3+'</span></div><div class="ma_contR clearfix">';
                        ma_content += '<span class="ma_contL3">'+subName1+'：<span>'+subValue+'</span></span>';
                        ma_content += '<span class="ma_contL4">'+subName2+'：<span>'+subTime+'</span></span>';
                        ma_content += '<span class="ma_contRb">'+subName4+'</span></div></li>';
                        $('.ma_pref').append(ma_content);
                        $(".ma_cancle").click(function(){
                            var id = $(this).attr("data-id");
                                var param = {
                                    "cancetrading.tpasswd": 'aaa',
                                    "cancetrading.originalappsheetno" :id
                                };
                            showAlertHint('是否撤单？',cancel);
                            function cancel(){
                                $.get(mainUrl+'newtradingcance',param,function(data){
                                    var data = JSON.parse(data);
                                    if(data.retcode == "0000"){
                                        showAlert("撤单成功!",replacePage);
                                    }else{
                                        showAlert("撤单失败!");
                                    }
                                });
                            }
                        });
                    });
                    //新增现金宝处理
                    if(data.tData&&data.tData!=""){
                        $("#xianjin").show();
                        $(data.tData).each(function (index, ele) {
                            //基金名称
                            var fundName = ele.fundname;
                            if(fundName.length>13){
                                fundName = fundName.substring(0,13)+'...';
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
                            var ma_content = '<li class="ma_content ma_conS clearfix">';
                            /*ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                             ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                             ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';*/
                            ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>申请金额(元)</h3><span>'+applicationamount+'</span></div>';
                            ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>买入时间</h3><span>'+transactiondata+'</span></div>';
                            ma_content += '<div class="ma_cont_left clearfix" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><h3>交易状态</h3><span>'+statusname+'</span></div>';
                            ma_content += '</li>';
                            $('#xianjin').append(ma_content);
                        });


                    }else{
                        XJB_show1=true;
                        if(XJB_show&&XJB_show1){
                            var ma_content = '<li class="ma_content ma_conS">';
                            ma_content += '<div class="ma_cont_right clearfix"><a class="XJB_buy">立即转入</a></div>';
                            $('#xianjin').append(ma_content);

                        }
                        $(".XJB_buy").click(function () {
                            buyNewStep1("000662", "银华活钱宝货币F");
                        });
                    }
                    //handleData();
                    costmoney = formatCurrency(costmoney);
                    $('#ma_totalVal .ma_num').html(costmoney);
                    getAssMsg3(costmoney,groupStatus,transitStatus,groupStatus1,isRedeemData);
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                showAlert("服务器错误！");
            }
        })
    }
    //获取基金优选内容
    function getAssMsg3(costmoney,groupStatus,transitStatus,groupStatus1,isRedeemData) {
        $.ajax({
            url: mainUrl + "asset_summary",
            data: "",
            dataType: "JSON",
            success: function (data) {
                if (data.retcode == 0000) {
                    if(data.data.gongMuList.length==0){
                        if(transitStatus){
                            $('.ma_pref').hide();
                            groupSingle = true;
                        }
                    }
                    getAssMsg4(groupSingle,groupStatus,groupStatus1);
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
                        //持仓金额
                        var marketvalue = formatCurrency(ele.fundmarketvalue);
                        //昨日收益
                        var ma_font2 = 'ma_valueAdd';
                        if(parseFloat(allProfit) < 0){
                            ma_font2 = 'ma_valueRmv';
                        }
                        var date = ele.navdate;
                        if(isRedeemData&&isRedeemData.length!=0){
                            var flag=false;
                            for(var k=0;k<isRedeemData.length;k++){
                                var ele1=isRedeemData[k];
                                if(fundCode==ele1.fundCode&&ele.transactionaccountid==ele1.transactionaccountid){
                                    flag=true;
                                    break;
                                }
                            }
                            if(flag){
                                console.log(11);
                                ma_content = '<li class="ma_content ma_conS" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><div class="ma_contL clearfix">';
                                ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                                ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                                ma_content += '<span class="ma_contL3">交易状态：<span>赎回中</span></span>';
                                ma_content += '<span class="ma_contRb">累计收益(元)</span></div></li>';
                                //return false;
                            }else{
                                console.log(22);
                                ma_content = '<li class="ma_content ma_conS" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><div class="ma_contL clearfix">';
                                ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                                ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                                ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';
                                ma_content += '<span class="ma_contRb">累计收益(元)</span></div></li>';
                            }
                            $('.ma_pref').append(ma_content);
                            confirmDetail();
                            //});


                        }else{

                            var ma_content = '<li class="ma_content ma_conS" data-id='+ele.transactionaccountid+' data-name='+ele.fundname+' data-code='+ele.fundcode+'><div class="ma_contL clearfix">';
                            ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+fundName+'</span><span class="ma_contL2">'+fundCode+'</span></div>';
                            ma_content += '<span class='+ma_font2+'>'+allProfit+'</span></div><div class="ma_contR clearfix">';
                            ma_content += '<span class="ma_contL3">持仓金额(元)：<span>'+marketvalue+'</span></span>';
                            ma_content += '<span class="ma_contRb">累计收益(元)</span></div></li>';
                            $('.ma_pref').append(ma_content);
                            confirmDetail();

                        }
                    });

                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                showAlert("服务器错误！");
            }
        })
    }
    //获取短期理财
    function getAssMsg4(groupSingle,groupStatus,groupStatus1){
        $.ajax({
            url: mainUrl + "shortPeriod",
            data: "",
            dataType: "JSON",
            success: function (data) {
                //console.log(data);

                if (data.retcode == 0000){
                    hideloading();

                    if(data.data.length==0){
                        if(groupStatus && groupSingle && groupStatus1){
                            $(".ma_nav").hide();
                            $(".ma_noData").show();
                        }else{
                            $(".ma_short").hide();
                        }
                    }
                    $(data.data).each(function (index, ele) {
                        //组合名称
                        var groupName = ele.product_name;
                        //累计收益
                        var allProfit = formatCurrency(ele.currentPeriod_income);
                        var ma_font1 = 'fontRed';
                        if(parseFloat(allProfit) < 0){
                            ma_font1 = 'fontGreen';
                        }
                        //持仓金额
                        var marketvalue = formatCurrency(ele.invest_money);
                        //预期收益
                        if(ele.forecast_endIncome||ele.forecast_endIncome!=""||ele.forecast_endIncome!=undefined){
                            //console.log(ele.forecast_endIncome);
                            var yetProfit = formatCurrency(ele.currentPeriod_income);
                        }else{
                            var yetProfit = 0;
                        }

                        var ma_font2 = 'ma_valueAdd';
                        if(parseFloat(yetProfit) < 0){
                            ma_font2 = 'ma_valueRmv';
                        }
                        var ma_content = '<li class="ma_content" data-id='+ele.group_id+' data-code='+ele.group_id+' data-name='+groupName+' data-group='+ele.id+'><div class="ma_contL clearfix">';
                        ma_content += '<div class="ma_contL0"><span class="ma_contL1">'+groupName+'</span></div>';
                        ma_content += '<span class='+ma_font2+'>'+yetProfit+'</span></div><div class="ma_contR clearfix">';
                        ma_content += '<span class="ma_contL3">累计收益(元)：<span class='+ma_font1+'>'+allProfit+'</span></span>';
                        ma_content += '<span class="ma_contL4">持仓金额(元)：<span>'+marketvalue+'</span></span>';
                        ma_content += '<span class="ma_contRb">预期收益(元)</span></div></li>';
                        $('.ma_short').append(ma_content);
                    });
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }
                getAssMsg5();
            }
        });
    }
    function getAssMsg5(groupSingle,groupStatus){
        $.ajax({
            url: mainUrl + "raffleUseResult",
            data: "",
            dataType: "JSON",
            success: function (data) {
                //console.log(data);
                if (data.retcode == '0000'){
                    $('.ma_tiyan').show();
                    $(".ma_noData").hide();
                    var ma_content = '<li class="ma_content"><div class="ma_contL clearfix">';
                    ma_content += '<div class="ma_contL0"><span class="ma_contL1">银华活钱宝F</span><span class="ma_contL2">000662</span></div>';
                    ma_content += '<span class="ma_valueAdd">'+data.data.activity_fundshare+'</span></div><div class="ma_contR clearfix">';
                    ma_content += '<span class="ma_contL3">持仓金额(元)：<span>50000.00</span></span>';
                    ma_content += '<span class="ma_contRb">累计收益(元)</span></div></li>';
                    $('.ma_tiyan').append(ma_content);
                }else if (data.retcode == '0001'){
                    $('.ma_tiyan').hide();
                }
            }
        });
    }

    //跳转基金详情页
    function confirmDetail(){
        $(".ma_pref .ma_conS").click(function () {
            var fundid = $(this).attr("data-id");
            var fundname = $(this).attr("data-name");
            var fundcode = $(this).attr("data-code");
            window.location.href = "../asset-detail/asset-detail.html?fundid=" + fundid + "&fundname=" + fundname+"&fundcode=" + fundcode;
        });
    }
    //现金宝详情也
    function confirm_tData_Detail(){
        $(".ma_cont_left").click(function () {
            var fundid = $(this).attr("data-id");
            var fundname = $(this).attr("data-name");
            var fundcode = $(this).attr("data-code");
            window.location.href = "../asset-detail/asset-tdata-detail.html?fundid=" + fundid + "&fundname=" + fundname+"&fundcode=" + fundcode;
        });
    }
    function confirmDetail2(){
        $(".ma_conZ").click(function () {
            var fundid = $(this).attr("data-id");
            var fundname = $(this).attr("data-name");
            var fundcode = $(this).attr("data-code");
            var groupFundBuyId = $(this).attr("data-group");
            window.location.href = "../asset-detail/asset-group-detail.html?fundgroupcode=" + fundcode + "&fundgroupname=" + fundname+"&fundid=" + fundid+"&groupFundBuyId=" + groupFundBuyId;
        });
    }
    function replacePage(){
        window.location.reload("true");
    }


})();

