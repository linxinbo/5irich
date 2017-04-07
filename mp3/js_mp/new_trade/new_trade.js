(function(){
    $(function(){
        var one_mon = new Date().getTime() - 30 * 24 * 3600 * 1000;
        var thr_mon = new Date().getTime() - 90 * 24 * 3600 * 1000;
        var six_mon = new Date().getTime() - 270 * 24 * 3600 * 1000;
        var one_year = new Date().getTime() - 365 * 24 * 3600 * 1000;
        var thr_year = new Date().getTime() - 3 * 365 * 24 * 3600 * 1000;
        var businesscode = "";

        one_mon = new Date(one_mon).Format("yyyyMMdd");
        thr_mon = new Date(thr_mon).Format("yyyyMMdd");
        six_mon = new Date(six_mon).Format("yyyyMMdd");
        one_year = new Date(one_year).Format("yyyyMMdd");
        thr_year = new Date(thr_year).Format("yyyyMMdd");

        var begindate = one_mon;
        var date = null;
        var isopen = $.cookie("isopen");
        var username = $.cookie("username");

        var tradeStatus = 'B';//Judgment select which query interface
        var ntClassB = $('.nt_class');
        var ntClassA = $('#nt_class');
        var ntTimeB = $('.nt_time');
        var ntTimeA = $('#nt_time');
        var nt_classH = $('#nt_time ul').height();

        nt_navClick (ntClassB,ntClassA,ntTimeB,ntTimeA);
        nt_navClick (ntTimeB,ntTimeA,ntClassB,ntClassA);

        if (username == "" || username == null || username == undefined|| username == "null") {
            setErrorMsg(1001);
            return;
        }
        if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
            setErrorMsg(1007);
            return;
        } else {
            //Application inquiry
        	getConfirmDeal(begindate, businesscode);
            $('.nt_queryA').off('click').on('click',function(){
                tradeStatus = 'A';
                //style change
                clearNtStatus();
                $('.nt_query').removeClass('nt_ac');
                $(this).addClass('nt_ac');
                $('.nt_nav').show();
                $('.nt_class').html('交易类型');
                $('.nt_time').html('交易时间');
                //Query information display
                getHistoryDeal(one_mon, "");

            });
            //Query in transit
            $('.nt_queryB').off('click').on('click',function(){
                $('.nt_query').removeClass('nt_ac');
                $(this).addClass('nt_ac');
                $('.nt_nav').hide();
                getOnthewayDeal(one_mon,"");
            });
            //Confirmation query
            $('.nt_queryC').off('click').on('click',function(){
                tradeStatus = 'B';
                clearNtStatus();
                $('.nt_query').removeClass('nt_ac');
                $(this).addClass('nt_ac');
                $('.nt_nav').show();
                $('.nt_class').html('交易类型');
                $('.nt_time').html('交易时间');
                getConfirmDeal(one_mon, "");

            });
            //Processing cancle
            $('.nt_queryD').off('click').on('click',function(){
                $('.nt_query').removeClass('nt_ac');
                $(this).addClass('nt_ac');
                $('.nt_nav').hide();
                canclelist();
            });
            
                $('#nt_class ul li').on('click',function(){
                	//console.log(tradeStatus);
                    $('#nt_class ul li').removeClass('nt_sure');
                    var nt_status = $(this).attr('class');
                    //console.log(nt_status);
                    switch (nt_status){
                        case 'nt_sureA':
                            businesscode = "";
                            $('.nt_class').html('全部交易');
                            break;
                        case 'nt_sureB':
                            businesscode = 20;
                            $('.nt_class').html('认购');
                            break;
                        case 'nt_sureC':
                            businesscode = 22;
                            $('.nt_class').html('申购');
                            break;
                        case 'nt_sureD':
                            businesscode = 24;
                            $('.nt_class').html('赎回');
                            break;
                        case 'nt_sureE':
                            businesscode = 36;
                            $('.nt_class').html('转换');
                            break;
                    }
                    $(this).addClass('nt_sure');
                    nt_dealay = false;
                    $('.nt_nav ul li span').removeClass('nt_navdown');
                    $('.nt_nav ul li span').addClass('nt_navup');
                    $('#nt_class').animate({
                        'height':0
                    },500,function(){
                        $('#nt_class').css('height',nt_classH);
                        $('#nt_class').hide();
                        nt_dealay = true;
                    });
                    //console.log(businesscode+":"+begindate);
                    if(tradeStatus == 'A'){
                        getHistoryDeal(begindate, businesscode);
                    } else {
                        getConfirmDeal(begindate, businesscode);
                    }
                });
            $('#nt_time ul li').on('click',function(){
                $('#nt_time ul li').removeClass('nt_sure');
                var nt_status = $(this).attr('class');
                switch (nt_status){
                    case 'nt_sure1':
                        begindate = one_mon;
                        $('.nt_time').html('1个月内');
                        break;
                    case 'nt_sure2':
                        begindate = thr_mon;
                        $('.nt_time').html('3个月内');
                        break;
                    case 'nt_sure3':
                        begindate = six_mon;
                        $('.nt_time').html('6个月内');
                        break;
                    case 'nt_sure4':
                        begindate = one_year;
                        $('.nt_time').html('1年内');
                        break;
                    case 'nt_sure5':
                        begindate = thr_year;
                        $('.nt_time').html('3年内');
                        break;
                }
                $(this).addClass('nt_sure');
                nt_dealay = false;
                $('.nt_nav ul li span').removeClass('nt_navdown');
                $('.nt_nav ul li span').addClass('nt_navup');
                $('#nt_time').animate({
                    'height':0
                },500,function(){
                    $('#nt_time').css('height',nt_classH);
                    $('#nt_time').hide();
                    nt_dealay = true;
                });
                if(tradeStatus == 'A'){
                    getHistoryDeal(begindate, businesscode);
                } else {
                    getConfirmDeal(begindate, businesscode);
                }
            });
        }
        
        //获取申请查询信息
        function getHistoryDeal(begindate, businesscode) {
            hideloading();
            showLoading();
            $(".nt_content ul").html("");
            $.ajax({
                url: mainUrl + "tradingList",
                data: {
                    "begindate": begindate,
                    "enddate": date,
                    "businesscode": businesscode,
                    "page": "1",
                    "rows": "50"
                },
                dataType: "JSON",
                success: function (data) {
                    hideloading();
                    if (data.retcode == "0000") {
                        if(data.data.list.length == 0){
                            $('.nt_noData .nt_nodataTip').html('申请信息');
                            $('.nt_noData .nt_nodataTip1').show();
                            $('.nt_noData').show();
                            return;
                        }else{
                            $('.nt_noData').hide();
                        }
                        $(data.data.list).each(function (index, ele) {
                            var name = getBussessName(ele.businesscode);
                            var payname = getPayName(ele.paystatus);
                            var statsname = getstatsName(ele.status);
                            var fundid = ele.fundcode.substring(0, 6);
                            var fundname = ele.fundname;
                            if(fundname.length>10){
                                fundname = fundname.substring(0,10)+'...';
                            }

                            var fundMsg = '<li><div class="nt_conT clearfix">';
                            fundMsg += '<h3 data-id = '+ele.fundcode+' data-name='+ele.fundname+'>'+fundname+'&nbsp<span>'+fundid+'</span></h3>';
                            fundMsg += '<p>申请日期：<span>'+ele.operdate+'</span></p>';
                            fundMsg += '</div> <div class="nt_conB"><ul class="clearfix">';
                            fundMsg += '<li class="nt_applyC"><span>'+ele.applicationvol+'</span><br />申请份额</li>';
                            fundMsg += '<li class="nt_applyM"><span>'+formatCurrency(ele.applicationamount)+'</span><br />申请金额</li>';
                            fundMsg += '<li class="nt_applyS"><span>'+statsname+'</span><br />处理状态</li></ul> </div> </li>';
                            $(".nt_conSet").append(fundMsg);
                            confirmDetail();
                        })
                    } else {
                        setErrorMsg(data.retcode, data.retmsg); //错误提示框
                    }
                },
                error: function (data) {
                    hideloading();
                    showAlert("服务器错误");
                }
            });
        }
        //在途信息查询
        function getOnthewayDeal(begindate, businesscode) {
            hideloading();
            showLoading();
            $(".nt_content ul").html("");
            $.ajax({
                url: mainUrl + "tradingOnthewayList",
                data: {
                    begindate: begindate,
                    enddate: date,
                    businesscode: businesscode,
                    page: "1",
                    rows: "50"
                },
                dataType: "JSON",
                success: function (data) {
                    hideloading();
                    if (data.retcode == "0000") {
                        if(data.data.list.length == 0){
                            $('.nt_noData .nt_nodataTip').html('在途信息');
                            $('.nt_noData .nt_nodataTip1').hide();
                            $('.nt_noData').css('padding-top','13em');
                            $('.nt_noData').show();
                            return;
                        }else{
                            $('.nt_noData').hide();
                        }
                        $(data.data.list).each(function (index, ele) {
                            var name = getBussessName(ele.businesscode);
                            var payname = getPayName(ele.paystatus);
                            var statsname = getstatsName(ele.status);
                            var fundid = ele.fundcode.substring(0, 6);
                            var fundname = ele.fundname;
                            if(fundname.length>10){
                                fundname = fundname.substring(0,10)+'...';
                            }
                            var fundMsg = '<li><div class="nt_conT clearfix">';
                            fundMsg += '<h3 data-id = '+ele.fundcode+' data-name='+ele.fundname+'>'+fundname+'&nbsp<span>'+fundid+'</span></h3>';
                            fundMsg += '<p>申请日期：<span>'+ele.operdate+'</span></p>';
                            fundMsg += '</div> <div class="nt_conB"><ul class="clearfix">';
                            fundMsg += '<li class="nt_applyC"><span>'+ele.applicationvol+'</span><br />申请份额</li>';
                            fundMsg += '<li class="nt_applyM"><span>'+formatCurrency(ele.applicationamount)+'</span><br />申请金额</li>';
                            fundMsg += '<li class="nt_applyS"><span>'+statsname+'</span><br />处理状态</li></ul> </div> </li>';
                            $(".nt_conSet").append(fundMsg);
                            confirmDetail();
                        });
                    } else {
                        setErrorMsg(data.retcode, data.retmsg); //错误提示框
                    }
                },
                error: function (data) {
                    hideloading();
                    showAlert("服务器错误");
                }
            });
        }
        //获取确认查询信息
        function getConfirmDeal(begindate, businesscode) {
            hideloading();
            showLoading();
            $(".nt_content ul").html("");
            $.ajax({
                url: mainUrl + "historyTrading",
                data: {
                    "begindate": begindate,
                    "enddate": date,
                    "businesscode": businesscode,
                    "page": "1",
                    "rows": "50"
                },
                dataType: "JSON",
                success: function (data) {
                    hideloading();
                    if (data.retcode == "0000") {
                        if(data.data.list.length == 0){
                            $('.nt_noData .nt_nodataTip').html('确认信息');
                            $('.nt_noData .nt_nodataTip1').show();
                            $('.nt_noData').show();
                            return;
                        }else{
                            $('.nt_noData').hide();
                        }                      
                        $(data.data.list).each(function (index, ele) {                     
                            var name = getBussessName(ele.businesscode);
                            var fundid = ele.fundcode.substring(0, 6);
                            var fundname = ele.fundname;                        
                            if(fundname.length>10){
                                fundname = fundname.substring(0,10)+'...';
                            }
                            var fundMsg = '<li><div class="nt_conT clearfix">';
                            fundMsg += '<h3 data-id = '+ele.fundcode+' data-name='+ele.fundname+'>'+fundname+'&nbsp<span>'+fundid+'</span></h3>';
                            fundMsg += '<p>业务名称：<span>'+name+'</span></p>';
                            fundMsg += '</div> <div class="nt_conB"><ul class="clearfix">';
                            fundMsg += '<li class="nt_applyC"><span>'+ele.confirmedvol+'</span><br />确认份额</li>';
                            fundMsg += '<li class="nt_applyM"><span>'+formatCurrency(ele.confirmedamount)+'</span><br />确认金额</li>';
                            fundMsg += '<li class="nt_applyS"><span>'+ele.charge+'</span><br />手续费</li></ul> </div> </li>';
                            $(".nt_conSet").append(fundMsg);
                            confirmDetail();
                        })
                    } else {
                        setErrorMsg(data.retcode, data.retmsg); //错误提示框
                    }
                },
                error: function(){
                    hideloading();
                    showAlert("服务器错误");
                }
            });
        }
        //撤单信息查询
        function canclelist() {
            showLoading();
            $(".nt_content ul").html("");
            $.ajax({
                type: "post",
                url: mainUrl + "cancellationList",
                data: {},
                dataType: "JSON",
                success: function (data) {
                    hideloading();
                    if (data.retcode == 0000) {
                        if(data.data.length == 0){
                            $('.nt_noData .nt_nodataTip').html('撤单');
                            $('.nt_noData .nt_nodataTip1').hide();
                            $('.nt_noData').show();
                            return;
                        }else{
                            $('.nt_noData').hide();
                        }
                        $(data.data).each(function(index,ele){
                            var fundid= ele.fundcode+"";
                            fundid=fundid.substring(0,6);
                            var fundname = ele.fundname;
                            if(fundname.length>10){
                                fundname = fundname.substring(0,10)+'...';
                            }
                            var fundMsg = '<li><div class="nt_conT clearfix">';
                            fundMsg += '<h3 data-id = '+ele.fundcode+' data-name='+ele.fundname+'>'+fundname+'&nbsp<span>'+fundid+'</span></h3>';
                            fundMsg += '<p>下单时间：<span>'+ele.opertime+'</span></p>';
                            fundMsg += '</div> <div class="nt_conB"><ul class="clearfix">';
                            fundMsg += '<li class="nt_applyC"><span>'+getBussessName(ele.businesscode)+'</span><br />业务名称</li>';
                            fundMsg += '<li class="nt_applyM"><span>'+ele.operdate+'</span><br />申请日期</li>';
                            fundMsg += '<li class="nt_applyS"><span id="trade_cd" data-id='+ele.appsheetserialno+'>撤单</span><br />操作</li></ul> </div> </li>';
                            //<button id='trade_cd' class='btn_home1 jy_btn_lanse' data-id='"+n.appsheetserialno+"'>撤单</button>
                            $(".nt_conSet").append(fundMsg);
                            //confirmDetail();
                            $("#trade_cd").unbind("click").click(function(e){
                                e.stopPropagation();
                                var id = $(this).attr("data-id");
                                showAlert("确认撤单吗？",goCancle(id));
                            });
                        })

                    } else {
                        setErrorMsg(data.retcode, data.retmsg);
                    }
                },
                error: function (data) {
                    hideloading();
                    alert("请稍后重试！");
                }
            })
        }
//去撤单；
        function goCancle(number){
            return function(){
                showLoading();
                $.ajax({
                    type: "post",
                    url: mainUrl + "CancellationAction",
                    data: {
                        "fundsingl.appsheetserialno": number
                    },
                    dataType: "JSON",
                    success: function (data) {
                        hideloading();
                        if (data.retcode == 0000) {
                            showAlert("撤单成功！",canclelist);
                        } else {
                            setErrorMsg(data.retcode, data.retmsg);
                        }
                    },
                    error: function (data) {
                        hideloading();
                        alert("请稍后重试！");
                    }
                })
            }
        }
        //跳转基金详情页
        function confirmDetail(){
            $(".nt_conT h3").click(function () {
                var fundid = $(this).attr("data-id");
                var fundname = $(this).attr("data-name");
                window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
            });
        }
        //清除默认状态
        function clearNtStatus(){
            $('.nt_nav ul li span').removeClass('nt_navdown');
            $('.nt_nav ul li span').addClass('nt_navup');
            $('.nt_nav .nt_navCont').css('height',0).hide();
            nt_dealay = true;
            $('#nt_class ul li').removeClass('nt_sure');
            $('#nt_time ul li').removeClass('nt_sure');
            $('#nt_class .nt_sureA').addClass('nt_sure');
            $('#nt_time .nt_sure1').addClass('nt_sure');
        }

    });
        //navbar click
        function nt_navClick (ntClick,ntChange,ntChange1,ntChange2){
            var nt_classH =  ntChange.height();
            var nt_dealay = true;
            ntClick.off('click').on('click',function(){
                if(ntChange1.hasClass('nt_navdown')){
                    ntChange1.removeClass('nt_navdown').addClass('nt_navup');
                    ntChange2.css('height',0).hide();
                    nt_dealay = true;
                }
                if(nt_dealay){
                    nt_dealay = false;
                    if(ntClick.hasClass('nt_navup')){
                        ntClick.removeClass('nt_navup').addClass('nt_navdown');
                        ntChange.css({
                            'height':0
                        });
                        ntChange.show().animate({
                            'height':nt_classH
                        },500,function(){
                            nt_dealay = true;
                        });
                    } else{
                        ntClick.removeClass('nt_navdown').addClass('nt_navup');
                        ntChange.animate({
                            'height':0
                        },500,function(){
                            ntChange.css('height',nt_classH);
                            ntChange.hide();
                            nt_dealay = true;
                        });
                    }
                }
            });
        }

})();
