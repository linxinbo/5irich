var dipper = {};
dipper.type = 1;
dipper.msg1 = '';
dipper.msg2 = '';
dipper.ratio1 = '';
dipper.ratio2 = '';
dipper.startType = 6;
$(function(){
    getDipperMsg();
    getDipperIncome();
    $('.dipper-list-name').on('click',function(){
        $('.dipper-list-name').removeClass('act');
        $(this).addClass('act');
        $('.dipper-content').hide();
        if($(this).hasClass('dipper-list-description')){
            $('.dipper-description').show();
        }else if($(this).hasClass('dipper-list-ratio')){
            $('.dipper-ratio').show();
            getDipperRatio();
        }else {
            $('.dipper-know').show();
        }
    });
    function getDipperMsg(){
        $.ajax({
            url: mainUrl+'queryNewDes',
            data: null,
            dataType: 'JSON',
            success: function(data){
                debug(data);
                if(data.retcode == '0000'){
                    createDipperMsg(data.data);
                }else {
                    debug(data);
                }
            },
            error: function(data){
                debug(data);
            }

        });
    }
    function createDipperMsg(data){
        dipper.font1 = 'font-red';
        dipper.font2 = 'font-red';
        if(Number(data.monthincome) < 0){
            dipper.font1 = 'font-green';
        }
        console.log(Number(data.monthincome))
        if(Number(data.navUd) < 0){
            dipper.font2 = 'font-green';
        }
        var zdhc=Number(data.zdhc)*100;
        dipper.msg1 += '<li><span class="detail-data-data1name">近一月涨幅</span><strong class="detail-month-increase '+dipper.font1+'">'+formaterIncrease(data.monthincome)+'%</strong></li>';
        dipper.msg1 += '<li><span class="detail-data-data1name">日涨幅</span><strong class="detail-day-increase '+dipper.font2+'">'+formaterIncrease(data.navUd)+'%</strong></li>';
        dipper.msg1 += '<li><span class="detail-data-data1name">单位净值<span class="detail-data-update">('+data.navdate.substring(4,6)+'-'+data.navdate.substring(6,8)+')</span></span><strong class="detail-data-value">'+Number(data.nav).toFixed(4)+'</strong></li>';
        $('.detail-data-data1').empty();
        $('.detail-data-data1').append(dipper.msg1);
        dipper.msg2 += '<li><div>成立日期：<span class="detail-data-create">'+data.fundCreattime.substring(0,4)+'-'+data.fundCreattime.substring(4,6)+'-'+data.fundCreattime.substring(6,8)+'</span></div>';
        dipper.msg2 += '<div>最大回撤：<span class="detail-data-retreat">'+zdhc.toFixed(2)+'%</span></div></li>';
        dipper.msg2 += '<li><div>历史年化收益：<span class="detail-data-gainyear">'+formaterIncrease(data.returnYear)+'%</span></div>';
        dipper.msg2 += '<div>夏普比率：<span class="detail-data-xiapu">'+Number(data.xpbl).toFixed(2)+'</span></div></li>';
        $('.detail-data-data2').empty();
        $('.detail-data-data2').append(dipper.msg2);
    }
    function getDipperRatio(){
        $.ajax({
            url: mainUrl+'queryCcbl',
            data: null,
            dataType: 'JSON',
            success: function(data){
                console.log(data);
                if(data.retcode == '0000'){
                    createDipperRatio(data.data);
                }else {
                    debug(data);
                }
            },
            error: function(data){
                debug(data);
            }

        });
    }
    function createDipperRatio(data){
        $('.dipper-record').empty();
        $('.dipper-proportion ul').empty();
        $.each(data,function(index,element){
            var ratio = [];
            var ratioAll = data[index].positionProportion.split(";");
            var ratioDate = data[index].transferDate;
            for(var i = 0;i < ratioAll.length;i++){
                if(ratioAll[i]){
                    ratioAll[i] = ratioAll[i].split(',');
                    ratioAll[i][1] = Number(ratioAll[i][1])*100;
                    ratio.push(ratioAll[i]);
                }
            }
            dipper.ratio2 = createRatio1(ratio,ratioDate);
            $('.dipper-record').append(dipper.ratio2);
            if(index == 0){
                var efund = data[0].efundProportion*100;
                var mfund = data[0].mfundProportion*100;
                ratioChart(ratio);
                dipper.ratio1 = '<div><span>股基 '+efund+'%</span><span>货基 '+mfund+'%</span></div>';
                dipper.ratio1 += createRatio(ratio);
                $('.dipper-proportion ul').append(dipper.ratio1);
            }
        });
    }
    function ratioChart(data){
        Highcharts.setOptions({
            colors: ['#ff9900', '#ffa51e', '#ffaf3c', '#ffbe50', '#ffc873', '#ffd796', '#ffe6b4']
        });
        Highcharts.chart('dipper-proportion-chart', {
            chart: {
                height: 240,
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false

            },
            title: {
                text: null
            },
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<small>{point.key}</small><table>',
                pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                '<td style="text-align: right"><b>{point.y} %</b></td></tr>',
                footerFormat: '</table>',
                valueDecimals: 2
            },
            series: [{
                shadow: { "color": "#fff5e5", offsetX: 0, offsetY: 0, opacity: 1, width: 10 },
                type: 'pie',
                name: '组合占比',
                innerSize: '70%',
                borderWidth: 0,
                data: data,
                dataLabels: {
                    enabled: false
                }
            }],
            credits: {
                enabled: false
            }
        });
    }
    function createRatio(data){
        var ratioStr = '';
        $.each(data,function(index,element){
            ratioStr +=  '<li><p>'+element[0]+'</p>'+element[1]+'%</li>';
        });
        return ratioStr;
    }
    function createRatio1(data,date){
        var ratioStr = '<tr><td class="dipper-line"><strong></strong><span></span></td>';
        ratioStr += '<td class="dipper-date">'+date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8)+'</span></td><td><ul class="dipper-record-ratio">';
        $.each(data,function(index,element){
            ratioStr +=  '<li><p>'+element[0]+'</p>'+element[1].toFixed(2)+'%</li>';
        });
        ratioStr += '</ul></td></tr>';
        return ratioStr;
    }
    function formaterIncrease(data){
        return Number(data*100).toFixed(2);
    }

    $('.detail-date tr td span').on('click',function(){
        $(this).addClass('act').parent().siblings().find('span').removeClass('act');
        dipper.startType = $(this).attr('data-index');
        getDipperIncome();
    });
    function getDipperIncome(){
        $.ajax({
            url: mainUrl+'queryBdqxChart',
            data: {
                startType: dipper.startType
            },
            dataType: 'JSON',
            success: function(data){
                debug(data);
                if(data.retcode == '0000'){
                    createIncomeChart(data.data);

                }

            },
            error: function(data){
                debug(data);
            }

        });
    }
    function createIncomeChart(data){
        $('.dipper-increase').html("");
        $('.dipper-hs300').html("");
        $('.dipper-increase').html(Number(data.yfnavTurnRatioList[(data.yfnavTurnRatioList.length-1)]).toFixed(2)+'%');
        $('.dipper-hs300').html(Number(data.ysDqCloseList[(data.ysDqCloseList.length-1)]).toFixed(2)+'%');
        for(var i = 0;i < data.yfnavTurnRatioList.length;i++){
            data.yfnavTurnRatioList[i] = Number(data.yfnavTurnRatioList[i]);
        }
        for(var i = 0;i < data.ysDqCloseList.length;i++){
            data.ysDqCloseList[i] = Number(data.ysDqCloseList[i]);
        }
        var interval = parseInt(data.xtradeDtList.length/5);
        Highcharts.setOptions({
            colors: ['#ff9900', '#3ca5e6']
        });
        Highcharts.chart('detail-linechart', {
            chart: {
                type: 'line',
                backgroundColor: "#fff",
                height: 300
            },
            title: {
                text: null
            },
            xAxis: {
                categories: data.xtradeDtList,
                labels: {
                    enabled: true,
                    formatter: function () {
                        return this.value;
                    },
                    y: 25
                },
                gridLineWidth: 1,
                lineWidth: 1,
                lineColor: '#edf0f4',
                tickInterval: interval
                //间隔使用长度/5
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            yAxis: {
                labels: {
                    enabled: true,
                    formatter: function () {
                        return this.value + '%';
                    }
                },
                title: {
                    enabled: false
                },
                visible: true
            },
            tooltip: {
                pointFormat: '{series.name}-收益率：{point.y}%',
                crosshairs: 1
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: "北斗七星",
                data: data.yfnavTurnRatioList
            },{
                name: '沪深300',
                data: data.ysDqCloseList
            }]
        });
    }

    //策略购买
    $(".dipper-buy").on("click",function(){
        var groupid=$(this).attr("data-id");
        var groupname=$(this).attr("data-name");
        var money=$("#money").val();
        var reg = new RegExp("^[0-9]*$");
        if(!reg.test(money)&&money==""){
            showAlert("您输入的金额不合法");
            return;
        }else {
            buyGroupStep1(groupid, groupname, money);
        }

    })

});
