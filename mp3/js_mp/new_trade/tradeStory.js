(function(){
    $(function(){
        var businesscode = "";
        var beginDate = '19000101';
        var endDate = new Date().Format("yyyyMMdd");
        var isopen = $.cookie("isopen");
        var username = $.cookie("username");
        var tradeStatus = 'A';//Judgment select which query interface
        var start = {
            dateCell: '#startDate',
            format: 'YYYY-MM-DD',
            minDate:  '1900-01-01',
            isinitVal:true,
            festival:true,
            ishmsVal:false,
            maxDate: jeDate.now(0), //最大日期
            choosefun: function(elem){
                end.minDate = elem; //开始日选好后，重置结束日的最小日期
                jeDate(end);
                jeDate(start);
                $('#jedatebox').css('left','0');
            },
            okfun:function(elem){
                $('.nt_sDate').removeClass('nt_navdown').addClass('nt_navup');
                $('.nt_sDate').html(elem);
                beginDate = elem.split('-').join('');
                var dateMin = parseInt(beginDate);
                var dateMax = parseInt(endDate);
                if(dateMin > dateMax){
                    showAlert('开始时间应该小于结束时间！');
                    return false;
                }
                getHistoryDeal(beginDate, endDate);
            }
        };
        var end = {
            dateCell: '#endDate',
            format: 'YYYY-MM-DD',
            minDate: '1900-00-00',
            festival:true,
            maxDate: jeDate.now(0), //最大日期
            choosefun: function(elem){
                start.maxDate = elem; //将结束日的初始值设定为开始日的最大日期
                jeDate(start);
                jeDate(end);
            },
            okfun:function(elem){
                $('.nt_eDate').removeClass('nt_navdown').addClass('nt_navup');
                $('.nt_eDate').html(elem);
                endDate = elem.split('-').join('');
                var dateMin = parseInt(beginDate);
                var dateMax = parseInt(endDate);
                if(dateMin > dateMax){
                    showAlert('开始时间应该小于结束时间！');
                    return false;
                }
                getHistoryDeal(beginDate, endDate);
            }
        };
        jeDate(start);
        jeDate(end);

        if (username == "" || username == null || username == undefined|| username == "null") {
            setErrorMsg(1001);
            return false;
        }
        if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
            setErrorMsg(1007);
            return false;
        } else {
            //Application inquiry
            getHistoryDeal(beginDate, endDate);
            $('.nt_queryA').off('click').on('click',function(){
                tradeStatus = 'A';
                //style change
                clearStatus();
                $(this).addClass('nt_ac');
                //Query information display
                getHistoryDeal(beginDate, endDate);

            });
            //Query in transit
            $('.nt_queryB').off('click').on('click',function(){
                tradeStatus = 'B';
                clearStatus();
                $(this).addClass('nt_ac');
                getHistoryDeal(beginDate, endDate);
            });
            //Confirmation query
            $('.nt_queryC').off('click').on('click',function(){
                tradeStatus = 'C';
                clearStatus();
                $(this).addClass('nt_ac');
                getHistoryDeal(beginDate, endDate);

            });
            //Processing cancle
            $('.nt_queryD').off('click').on('click',function(){
                tradeStatus = 'D';
                clearStatus();
                $(this).addClass('nt_ac');
                getHistoryDeal(beginDate, endDate);
            });
            $('.nt_queryE').off('click').on('click',function(){
               $('.nt_nav').toggle();
            });
            $('.inDate').on('click',function(){
                $('.nt_navCon').removeClass('nt_navdown').addClass('nt_navup');
                $(this).prev().removeClass('nt_navup').addClass('nt_navdown');
            });
            $('#startDate').on('click',function(){
                $('#jedatebox').css('left','0');
            });
        }

        //查询信息
        function getHistoryDeal(beginDate, endDate) {
            hideloading();
            showLoading();

            $(".nt_content ul").html("");
            $.ajax({
                url: mainUrl + "singleTradeInfoAllQuery",
                data: {
                    "startDate": beginDate,
                    "endDate": endDate,
		    "page":1,
		    "rows":1000
                },
                dataType: "JSON",
                success: function (data) {
                    console.log(data);
                    hideloading();
                    if (data.retcode == "0000") {
                        if(data.data.length == 0){
                            $('.nt_noData').show();
                            return false;
                        }else{
                            $('.nt_noData').hide();
                        }
                        $(data.data).each(function (index, ele) {
                            if(ele.fundname == undefined){
                                ele.fundname = "";
                            }
                            if(ele.businesscode == undefined){
                                return;
                            }
                            if((tradeStatus == 'B')&&(ele.businesscode != '22' && ele.businesscode != '20')){
                                return;
                            }
                            if((tradeStatus == 'C')&&(ele.businesscode != '24')){
                                return;
                            }
                            if((tradeStatus == 'D')&&(ele.businesscode == '22' || ele.businesscode == '20' || ele.businesscode == '24')){
                                return;
                            }
                            var fundcode = ele.fundcode.substring(0, 6);
                            var fundname = ele.fundname;
                            if(fundname.length>10){
                                fundname = fundname.substring(0,10)+'...';
                            }
                            var tradeDate = ele.transactiondata;
                            var tradeStyle = getBussessName(ele.businesscode);
                            switch(ele.businesscode){
                                case '20':
                                    if(ele.status == '02' || ele.status == '06'|| ele.status == '07'){
                                        var tradeStat = '申请中';
                                    }else{
                                        var tradeStat = getstatsName(ele.status);
                                    }
                                    break;
                                case '22':
                                    if(ele.status == '02' || ele.status == '06'|| ele.status == '07'){
                                        var tradeStat = '申请中';
                                    }else{
                                        var tradeStat = getstatsName(ele.status);
                                    }
                                    break;
                                case '39':
                                    if(ele.status == '02' || ele.status == '06'|| ele.status == '07'){
                                        var tradeStat = '申请中';
                                    }else{
                                        var tradeStat = getstatsName(ele.status);
                                    }
                                    break;
                                case '24':
                                    if(ele.status == '02' || ele.status == '06'|| ele.status == '07'){
                                        var tradeStat = '赎回中';
                                    }else{
                                        var tradeStat = getstatsName(ele.status);
                                    }
                                    break;
                                case '36':
                                    if(ele.status == '02' || ele.status == '06'|| ele.status == '07'){
                                        var tradeStat = '转换中';
                                    }else{
                                        var tradeStat = getstatsName(ele.status);
                                    }
                                    break;
                                default:
                                    var tradeStat = getstatsName(ele.status);
                                    break;
                            }
                            if(ele.status == '08'){
                                var tradeStat = '已成功';
                            }
                            console.log(typeof ele.confirmedamount);
                            if(ele.confirmedamount != undefined && (ele.confirmedamount != null || ele.confirmedamount != "") &&  ele.confirmedamount != "0.00"){
                                var tradeValue = formatCurrency(ele.confirmedamount);
                                var tradeValue1 = '元';
                            }else if(ele.confirmedvol != undefined &&(ele.confirmedvol != null || ele.confirmedvol != "") && ele.confirmedvol != "0.00"){
                                var tradeValue = formatCurrency(ele.confirmedvol);
                                var tradeValue1 = '份';

                            }else if(ele.applicationamount != undefined && (ele.applicationamount != null || ele.applicationamount != "") && ele.applicationamount != "0.00"){
                                var tradeValue = formatCurrency(ele.applicationamount);
                                var tradeValue1 = '元';

                            }else if(ele.applicationvol != undefined && (ele.applicationvol != null || ele.applicationvol != "") && ele.applicationvol != "0.00"){
                                var tradeValue = formatCurrency(ele.applicationvol);
                                var tradeValue1 = '份';
                            }else{
                                var tradeValue = "";
                                var tradeValue1 = "";
                            }
                            var fundMsg = '<li class="nt_cont"><div class="ma_contL clearfix">';
                            fundMsg += '<div class="ma_contL0"><span class="ma_contL1">'+fundname+'</span><span class="ma_contL2">'+fundcode+'</span></div>';
                            fundMsg += '<span class="ma_valueAdd">'+tradeValue+'<i class="ma_fontM">'+tradeValue1+'</i></span>';
                            fundMsg += '</div><div class="ma_contR clearfix"><span class="ma_contL3">交易时间：<span>'+tradeDate+'</span></span>';
                            fundMsg += '<span class="ma_contL4">交易类型：<span>'+tradeStyle+'</span></span>';
                            fundMsg += '<span class="ma_contRb">'+tradeStat+'</span></div></li>';
                            $(".nt_box").append(fundMsg);
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
        function confirmDetail(){
            $(".nt_conT h3").click(function () {
                var fundid = $(this).attr("data-id");
                var fundname = $(this).attr("data-name");
                window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
            });
        }
        function clearStatus(){
            beginDate = '19000000';
            endDate = new Date().Format("yyyyMMdd");
            $('.nt_navCon').removeClass('nt_navdown').addClass('nt_navup');
            $('.nt_sDate').html('选择开始时间');
            $('.nt_eDate').html('选择结束时间');
            $('.nt_nav').hide();
            $('.nt_query').removeClass('nt_ac');
        }

    });

})();
