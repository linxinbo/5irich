$(function(){
    var comb = {};
    comb.groupcode = getArgs().groupcode || 'ZN2004';
    comb.groupname = getArgs().groupname || '智能组合2004';
    comb.grouplevel = getArgs().grouplevel || 'B4';
    comb.startType = 2;//收益年限
    comb.data = {};
    comb.msg = [];//基金推荐理由
    comb.msg1 = '';//涨幅、净值
    comb.msg2 = '';//最大回撤等
    comb.ratio1 = '';
    comb.ratio2 = '';
    //收益走势图

    $('.detail-title li:eq(0)').html(comb.groupname);
    $('.dipper-buy').on('click',function(){
        var chouj=$(".buygroup_m").val();
        if(isNaN(chouj)){
            showAlert("请填写金额!");
            return false;
        }
        buyGroupStep1(comb.groupcode,comb.groupname,chouj);
    });
    getCombIncome();
    $('.detail-date tr td span').on('click',function(){
        $(this).addClass('act').parent().siblings().find('span').removeClass('act');
        comb.startType = $(this).attr('data-index');
        getCombIncome();
    });
    function getCombIncome(){
        $.ajax({
            url: mainUrl+'WebQueryGroupChartAction',
            data: {
                groupId: comb.groupcode,
                startType: comb.startType
            },
            dataType: 'JSON',
            success: function(data){
                debug(data);
                if(data.retcode == '0000'){
                    createIncomeChart(data.data)
                }

            },
            error: function(data){
                debug(data);
            }

        });
    }
    function createIncomeChart(data){
        for(var i = 0;i < data.yfnavTurnRatioList.length;i++){
            data.yfnavTurnRatioList[i] = Number(data.yfnavTurnRatioList[i]);
        }
        for(var i = 0;i < data.ysDqCloseList.length;i++){
            data.ysDqCloseList[i] = Number(data.ysDqCloseList[i]);
        }
        var interval = parseInt(data.xList.length/5);
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
                categories: data.xList,
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
                name: comb.groupname,
                data: data.yfnavTurnRatioList
            }, {
                name: '沪深300',
                data: data.ysDqCloseList
            }]
        });
    }
    //组合数据展示
    getIntellData();
    function getIntellData(){
        $.ajax({
            url: mainUrl+'WebLevelQueryAction',
            data: {
                groupLevel: comb.grouplevel
            },
            dataType: 'JSON',
            success: function(data){
                comb.data.createTime = data.data.createTime;
                comb.data.fdGroupMin = data.data.fdGroupMin.toFixed(2);
                comb.data.fdGroupValue = data.data.fdGroupValue;
                comb.data.fdGroupBenchMark = data.data.fdGroupBenchMark;
                comb.data.fdGroupPriorityDesc = data.data.fdGroupPriorityDesc;
                $('.detail-data-bug input:eq(0)').attr('placeholder',comb.data.fdGroupMin+'元起购');
                getIntellData1();
                debug(data);
            }
        });
    }
    function getIntellData1(){
        $.ajax({
            url: mainUrl+'queryMonthProfit',
            data: {
                groupId: comb.groupcode
            },
            dataType: 'JSON',
            success: function(data){
                comb.data.dayGrowthRate = data.data.dayGrowthRate;
                comb.data.monthProfit = data.data.monthProfit;
                comb.data.priceDate = data.data.priceDate;
                getIntellData2();
                debug(data);

            }
        });
    }
    function getIntellData2(){
        $.ajax({
            url: mainUrl+'queryGroupFundSharpe',
            data: {
                groupId: comb.groupcode
            },
            dataType: 'JSON',
            success: function(data){
                comb.data.zdhc = data.data.zdhc;
                comb.data.xpbl = data.data.xpbl;
                createDipperMsg(comb.data);
                debug(comb.data)
            }
        });
    }
    function createDipperMsg(data){
        comb.font1 = 'font-red';
        comb.font2 = 'font-red';
        if(Number(data.monthProfit) < 0){
            comb.font1 = 'font-green';
        }
        //console.log(Number(data.monthProfit))
        if(Number(data.dayGrowthRate) < 0){
            comb.font2 = 'font-green';
        }
        comb.msg = data.fdGroupPriorityDesc.split('，');
        var msgStr = '';
        $.each(comb.msg,function(index,ele){
            msgStr += '<li>'+ele+'</li>';
        });
        var zdhc=Number(data.zdhc)*100;
        $('.detail-abstract').empty();
        $('.detail-abstract').append(msgStr);
        comb.msg1 += '<li><span class="detail-data-data1name">近一月涨幅</span><strong class="detail-month-increase '+comb.font1+'">'+data.monthProfit+'%</strong></li>';
        comb.msg1 += '<li><span class="detail-data-data1name">日涨幅</span><strong class="detail-day-increase '+comb.font2+'">'+data.dayGrowthRate+'%</strong></li>';
        comb.msg1 += '<li><span class="detail-data-data1name">单位净值<span class="detail-data-update">('+data.priceDate.substring(4,6)+'-'+data.priceDate.substring(6,8)+')</span></span><strong class="detail-data-value">'+Number(data.fdGroupValue).toFixed(2)+'</strong></li>';
        $('.detail-data-data1').empty();
        $('.detail-data-data1').append(comb.msg1);
        comb.msg2 += '<li><div>成立日期：<span class="detail-data-create">'+data.createTime.substring(0,4)+'-'+data.createTime.substring(4,6)+'-'+data.createTime.substring(6,8)+'</span></div>';
        comb.msg2 += '<div>最大回撤：<span class="detail-data-retreat">'+zdhc.toFixed(2)+'%</span></div></li>';
        comb.msg2 += '<li><div>历史年化收益：<span class="detail-data-gainyear">'+data.fdGroupBenchMark+'</span></div>';
        comb.msg2 += '<div>夏普比率：<span class="detail-data-xiapu">'+Number(data.xpbl).toFixed(2)+'</span></div></li>';
        $('.detail-data-data2').empty();
        $('.detail-data-data2').append(comb.msg2);
    }
    getCombRatio();
    //配置比例
    function getCombRatio(){
        $.ajax({
            type: "post",
            url: mainUrl + "WebProportionalQueryAction",
            data: {
                groupId: comb.groupcode
            },
            dataType: "json",
            success: function (data) {
                if (data.retcode == '0000') {
                    comb.chartdata1 = [];
                    $(data.data).each(function (index, element) {
                        (comb.chartdata1).push([element.fundName, Number(element.fdProportional),element.fundId]);
                    });
                    ratioChart(comb.chartdata1);
                    comb.ratio1 = '<div><span>股基 90%</span><span>货基 10%</span></div>';
                    comb.ratio1 += createRatio(comb.chartdata1);
                    $('.dipper-proportion ul').append(comb.ratio1);
                }
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
            //ratioStr +=  '<li><p><a href='+mainUrl+'pcweb/fund/fund-detail.html?fundid='+element[3]+'&fundname='+element[0]+'>' + element[0] + '</a></p>'+element[1].toFixed(2)+'%</li>';//测试环境
            ratioStr +=  '<li><p><a href='+mainUrl+'fund/fund-detail.html?fundid='+element[3]+'&fundname='+element[0]+'>' + element[0] + '</a></p>'+element[1].toFixed(2)+'%</li>';
        });
        return ratioStr;
    }
    //持仓记录
    getRatioMemory();
    function getRatioMemory(){
        $.ajax({
            type: "post",
            url: mainUrl + "WebAnnouncementQueryAction",
            data: {
                groupId: comb.groupcode
            },
            dataType: "json",
            success: function (data) {
                if (data.retcode == '0000') {
                    $.each(data.data,function(index,element){
                    //console.log(data.data);
                        var combratio = element.actionText.split('：');
                        //console.log(combratio);
                        //console.log(combratio[1]);
                        var combratio1 = combratio[1].substring(0,combratio[1].length-1);
                        var combratio2 = combratio1.split('，');
                        $.each(combratio2,function(index1,ele){
                            combratio2[index1] = combratio2[index1].replace(/\（\d+\）/,',').split(',');
                        });
                        comb.date = element.annDate;
                        var combratio3 = createRatio1(comb.date,combratio2);
                        $('.dipper-record').append(combratio3);
                    });
                }
            }
        });
    }
    function createRatio1(date,data){
        var ratioStr = '<tr><td class="dipper-line"><strong></strong><span></span></td>';
        ratioStr += '<td class="dipper-date">'+date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8)+'<span></span></td><td><ul class="dipper-record-ratio">';
        $.each(data,function(index,element){
            ratioStr +=  '<li><p>'+element[0]+'</p>'+element[1]+'</li>';
        });
        ratioStr += '</ul></td></tr>';
        return ratioStr;
    }


});

