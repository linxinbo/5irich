(function(){
    $(function(){       
        var isopen = $.cookie("isopen");
        var username = $.cookie("username");
        var isweixin = $.cookie("isweixin");                       
        var imgurl = $.cookie("imgurl");
        if(imgurl != undefined && imgurl){
        	$('.ma_userhead').attr('src',imgurl);
        }
        console.log(imgurl);
        if (username == "" || username == null || username == undefined|| username == "null") {
            setErrorMsg(1001);
            return;
        } else if(isweixin == '0' ||isweixin == 0){
            var ma_date = new Date();
            var ma_Date = ma_date.getFullYear()+'-'+(ma_date.getMonth()+1)+'-'+ma_date.getDate();
            $('.ma_date').html(ma_Date);
            $('.ma_chart').hide();
            $('.ma_nav').hide();
            $(".ma_con .ma_noDataWei").show();
            return;
        } else {
        	//$('.ma_name').html(username);
        	if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
            	var ma_date = new Date();
                var ma_Date = ma_date.getFullYear()+'-'+(ma_date.getMonth()+1)+'-'+ma_date.getDate();
        		$('.ma_date').html(ma_Date);
        		$(".ma_con .ma_noDataAll").show();
            } else {
            	getAssMsg();
                $('.ma_query').off('click').on('click',function(){
                    $('.ma_query').removeClass('ma_ac');
                    $(this).addClass('ma_ac');
                    var ma_sure = $(this).hasClass('ma_queryA');
                    if(ma_sure){
                        getAssMsg1();
                    }else{
                        getduanli();
                    }
                });
            }
        }
    });

    //获取账户所有信息
    function getAssMsg(){
        showLoading();
        $.ajax({
            url: mainUrl + "userAsset",
            data: "",
            dataType: "JSON",
            success: function (data) {
                hideloading();
                //console.log(data);
                //持仓总资产data.totalfundmarketvalue
                //历史总收益data.totalfundbalance
                //累计收益率data.data.totalfundprofit
                //console.log(data);
                if (data.retcode == 0000){
                    //持仓总成本
                    var costmoney = formatCurrency(data.data.totalfundmarketvalue);
                    //总收益
                    var income = formatCurrency(data.data.totalfundbalance);
                    //总收益率
                    var incomePercent = data.data.totalfundprofit;
                    if(data.data.tradingdate == undefined){
                    	var tradingDate = new Date();
            			var tradingDate = tradingDate.getFullYear()+'-'+(tradingDate.getMonth()+1)+'-'+tradingDate.getDate();
                    }else{
                    	var tradingDate = data.data.tradingdate;
                    	tradingDate = tradingDate.substring(0,4)+'-'+tradingDate.substring(4,6)+'-'+tradingDate.substring(6);
                    }                                                          
                    //console.log(tradingDate);
                    $('#ma_yetGain span').html("0.00%");
                    $('#ma_totalVal span').html("0.00");
                    $('#ma_accEarn span').html("0.00");
                    $('.ma_date').html(tradingDate);
                    $('#ma_yetGain span').html(incomePercent+'%');
                    $('#ma_totalVal span').html(costmoney);
                    $('#ma_accEarn span').html(income);
                    //绘图
                    //公募基金
                    var percent_a = data.data.public_totalfundmarketvalue;
                    percent_a = formatCurrency(percent_a) + " 元";
                    //短期理财
                    var percent_b = data.data.short_totalfundmarketvalue;
                    if(typeof (percent_b) == "undefined"){
                        percent_b = "0.00 元";
                    }else{
                        percent_b = formatCurrency(percent_b) + " 元";
                    }
                    $('.ma_listA').html("");
                    $('.ma_listB').html("");
                    $('.ma_listC').html("");
                    $('.ma_listA').html(percent_a);
                    $('.ma_listB').html(percent_b);
                    $('.ma_listC').html("0.00 元");

                    var percent_e = data.data.public_totalfundmarketvalue;
                    var percent_c = data.data.short_totalfundmarketvalue;
                    //console.log(data+':'+percent_c+":"+percent_e)
                    var gongmuFlag = true;
                    var duanliFlag = true;
                    if (percent_c == 0 || percent_c == 0.0 || percent_c == "0.0" || percent_c == "" || percent_c == null) {
                        duanliFlag = false;
                        percent_c = 0.01;
                    }
                    if (percent_e == 0 || percent_e == 0.0 || percent_e == "0.0" || percent_e == "" || percent_e == null) {
                        gongmuFlag = false;
                        percent_e = 0.01;
                    }
                    if (!duanliFlag && !gongmuFlag) {
                        canvasChart(1, 0, 0, 0);
                    } else {
                        canvasChart(percent_e, percent_c, 0, 1);
                    }
                    //信息显示
                    if (typeof(data.data.gongMuList) == undefined || typeof(data.data.gongMuList) == "undefined"||data.data.gongMuList.length==0||data.data.gongMuList.length=="0"||data.data.gongMuList==""||data.data.gongMuList==null) {
                        $(".ma_con .ma_noData").show();
                        return;
                    } else {
                    	 $(".ma_con .ma_noData").hide();
                    }
                        $(data.data.gongMuList).each(function (index,ele) {
                            //基金名称 代码fundname fundcode
                            //累计收益 floatprofit
                            //成本 （持仓金额）costmoney
                            //近一年收益   百分数
                            var income_2 = ele.addincomerate;//收益率
                            var floatprofit = ele.floatprofit;//累计收益
                            income_2 = income_2.toString();
                            floatprofit = floatprofit.toString();
                            var oneI = income_2.indexOf("-");
                            var oneII = income_2.indexOf(".");
                            var twoI = floatprofit.indexOf("-");
                            var twoII = floatprofit.indexOf(".");
                            //收益为负情况  -.09
                            if (twoI == 0 && twoII == 1) {
                                floatprofit = "-0." + floatprofit.substring(2);
                            }
                            if (twoII == 0) {
                                floatprofit = "0" + floatprofit;
                            }
                            //收益为负情况  -.09
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
                            var fundName = ele.fundname;
                            var fundCode = ele.fundcode;
                            if(fundName.length>10){
                                fundName = fundName.substring(0,10)+'...';
                            }
                            fundCode = fundCode.substring(0,6);
                            var ma_content = '<li class="clearfix"><div class="ma_conT clearfix">';
                            ma_content += '<h4 data-id='+ ele.fundcode+" "+ 'data-name=' + ele.fundname +'>'+fundName+'&nbsp<strong>'+fundCode+'</strong></h4>';
                            ma_content += '<span class = "ma_goBack" data-id='+ ele.fundcode.substring(0, 6) +" "+ 'data-name=' + ele.fundname +" "+  'data-transactionaccountid='+ ele.transactionaccountid+'>赎回</span>';
                            ma_content += '<span class = "ma_goBuy" data-id='+ ele.fundcode.substring(0, 6)+" "+ 'data-name='+ele.fundname+'>追加</span></div><div class="ma_conL">';
                            ma_content += '<p class="clearfix">最新净值<span>'+getdoit4(ele.nav)+'</span></p>';
                            ma_content += '<p class="clearfix">成本(元)<span>'+formatCurrency(ele.costmoney)+'</span></p>';
                            ma_content += '<p class="clearfix">参考市值(元)<span>'+formatCurrency(ele.fundmarketvalue)+'</span></p>';
                            ma_content += '</div><div class="ma_conR"><p class="clearfix">持有份额<span>'+formatCurrency(ele.fundvolbalance)+'</span></p>';
                            ma_content += '<p class="clearfix">累计收益(元)<span>'+formatCurrency(floatprofit)+'</span></p>';
                            ma_content += '<p class="clearfix">累计收益率<span>'+getdoit2(income_2)+'%</span></p></div></li>';
                            $('.ma_content').append(ma_content);
                            $('.ma_conT h4').off('click').on('click',function(){
                                    var fundid = $(this).attr("data-id");
                                    var fundname = $(this).attr("data-name");
                                    window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
                            });
                            $(".ma_goBuy").unbind("click").click(function (e) {
                                e.stopPropagation();
                                var fundname = $(this).attr("data-name");
                                var fundid = $(this).attr("data-id");
                                buyNewStep1(fundid, fundname);
                            });
                            $(".ma_goBack").unbind("click").click(function (e) {
                                e.stopPropagation();
                                var fundid = $(this).attr("data-id");
                                var fundname = $(this).attr("data-name");
                                var transactionaccountid = $(this).attr("data-transactionaccountid");
                                newbackStep1(fundid, fundname,transactionaccountid);
                            });
                        });
                    
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }


        });
    }
    //获取公募基金信息
    function getAssMsg1(){
        showLoading();
        $.ajax({
            url: mainUrl + "userAsset",
            data: "",
            dataType: "JSON",
            success: function (data) {
                hideloading();
                $('.ma_content').html("");
                if (data.retcode == 0000){
                    if (typeof(data.data.gongMuList) == undefined || typeof(data.data.gongMuList) == "undefined"||data.data.gongMuList.length==0||data.data.gongMuList.length=="0"||data.data.gongMuList==""||data.data.gongMuList==null) {
                        $(".ma_con .ma_noData").show();
                        return;
                    } else {
                    	$(".ma_con .ma_noData").hide();
                    }
                        $(data.data.gongMuList).each(function (index,ele) {
                            var income_2 = ele.addincomerate;//收益率
                            var floatprofit = ele.floatprofit;//累计收益
                            income_2 = income_2.toString();
                            floatprofit = floatprofit.toString();
                            var oneI = income_2.indexOf("-");
                            var oneII = income_2.indexOf(".");
                            var twoI = floatprofit.indexOf("-");
                            var twoII = floatprofit.indexOf(".");
                            //收益为负情况  -.09
                            if (twoI == 0 && twoII == 1) {
                                floatprofit = "-0." + floatprofit.substring(2);
                            }
                            if (twoII == 0) {
                                floatprofit = "0" + floatprofit;
                            }
                            //收益为负情况  -.09
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
                            var fundName = ele.fundname;
                            var fundCode = ele.fundcode;
                            if(fundName.length>10){
                                fundName = fundName.substring(0,10)+'...';
                            }
                            fundCode = fundCode.substring(0,6);
                            var ma_content = '<li class="clearfix"><div class="ma_conT clearfix">';
                            ma_content += '<h4 data-id='+ ele.fundcode +" "+ 'data-name=' + ele.fundname +'>'+fundName+'&nbsp<strong>'+fundCode+'</strong></h4>';
                            ma_content += '<span class = "ma_goBack" data-id='+ ele.fundcode.substring(0, 6) +" "+ 'data-name=' + ele.fundname +" "+  'data-transactionaccountid='+ ele.transactionaccountid+'>赎回</span>';
                            ma_content += '<span class = "ma_goBuy" data-id='+ ele.fundcode.substring(0, 6)+" "+ 'data-name='+ele.fundname+'>追加</span></div><div class="ma_conL">';
                            ma_content += '<p class="clearfix">最新净值<span>'+getdoit4(ele.nav)+'</span></p>';
                            ma_content += '<p class="clearfix">成本(元)<span>'+formatCurrency(ele.costmoney)+'</span></p>';
                            ma_content += '<p class="clearfix">参考市值(元)<span>'+formatCurrency(ele.fundmarketvalue)+'</span></p>';
                            ma_content += '</div><div class="ma_conR"><p class="clearfix">持有份额<span>'+formatCurrency(ele.fundvolbalance)+'</span></p>';
                            ma_content += '<p class="clearfix">累计收益(元)<span>'+formatCurrency(floatprofit)+'</span></p>';
                            ma_content += '<p class="clearfix">累计收益率<span>'+getdoit2(income_2)+'%</span></p></div></li>';
                            $('.ma_content').append(ma_content);
                            $('.ma_conT h4').off('click').on('click',function(){
                                var fundid = $(this).attr("data-id");
                                var fundname = $(this).attr("data-name");
                                window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
                            });
                            $(".ma_goBuy").unbind("click").click(function (e) {
                                e.stopPropagation();
                                var fundname = $(this).attr("data-name");
                                var fundid = $(this).attr("data-id");
                                buyNewStep1(fundid, fundname);
                            });
                            $(".ma_goBack").unbind("click").click(function (e) {
                                e.stopPropagation();
                                var fundid = $(this).attr("data-id");
                                var fundname = $(this).attr("data-name");
                                var transactionaccountid = $(this).attr("data-transactionaccountid");
                                newbackStep1(fundid, fundname,transactionaccountid);
                            });
                        });
                    
                }else{
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }


        });
    }
    function getduanli() {
        showLoading();
        $.ajax({
            url: mainUrl + "shortPeriod",
            data: "",
            dataType: "JSON",
            success: function (data) {
                if (data.retcode == 0000) {
                    hideloading();
                    $('.ma_content').html("");
                    if(data.data.length==0){
                        $(".ma_con .ma_noData").show();
                        return;
                    }else{
                    	 $(".ma_con .ma_noData").hide();
                    }
                        $(data.data).each(function (i, n) {
                            //持仓成本
                            var corpus = n.invest_money;
                            //预期收益
                            var expect_annualised = n.expect_annualised;
                            expect_annualised = expect_annualised + "%";
                            //本期收益
                            var currentPeriod_income = n.currentPeriod_income;
                            currentPeriod_income = currentPeriod_income;
                            //预计收益
                            var forecast_endIncome = n.forecast_endIncome;
                            var fundName = n.product_name;

                            var ma_content = '<li class="clearfix"><div class="ma_conT clearfix">';
                            ma_content += '<h4>'+fundName+'</h4></div><div class="ma_conL">';
                            ma_content += '<p class="clearfix">投资本金(元)<span>'+formatCurrency(corpus)+'</span></p>';
                            ma_content += '<p class="clearfix">预期年化<span>'+expect_annualised+'</span></p>';
                            ma_content += '</div><div class="ma_conR"><p class="clearfix">本期收益(元)<span>'+formatCurrency(currentPeriod_income)+'</span></p>';
                            ma_content += '<p class="clearfix">预计到期(元)<span>'+forecast_endIncome+'</span></p></div></li>';
                            $('.ma_content').append(ma_content);
                        });
                 

                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误！");
            }
        })
    }
    //截取%
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
    function getdoit4(n) {
        var x = n.indexOf(".");
        if (x == -1) {
            return n;
        }
        n = n.substring(0, x + 5);
        return n;
    }
    //绘图
    function canvasChart(value_com, value_short, value_high, isopen) {
        var color_com = "";
        var color_short = "";
        color_com = "#c252f4";
        color_short = "#fec92d";
        var color_high = "#33acf5";
        if (isopen == 0) {
            value_com == 100;
            color_com = "#cccccc";
            color_short = "#cccccc";
            color_high = "#cccccc";
        }
        var doughnutData = [
            {
                value: value_com,
                color: color_com
            },
            {
                value: value_short,
                color: color_short
            },
            {
                value: value_high,
                color: color_high
            }
        ];
        var ctx = document.getElementById("chart-canvas").getContext("2d");
        window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {
        	showTooltips:false,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 1,
            percentageInnerCutout : 50,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false

        });
    }

})();
