var dipper = {};
dipper.startType = 6;
$(function(){
    $('.dipper-line ul .dipper-date').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        dipper.startType = $(this).attr('data-index');
        getDipperIncome();
    });
    getDipperIncome();
    getDipperYear();
    function getDipperYear(){
        $.ajax({
            url: mainUrl+'queryNewDes',
            data: null,
            dataType: 'JSON',
            success: function(data){
                //console.log(data);
                if(data.retcode == '0000'){
                    var returnYear=parseFloat(data.data.returnYear);
                    //console.log(returnYear);
                    var returnYear1=returnYear*100;
                    $("#celuo").html(returnYear1.toFixed(2)+"%");
                }else {
                    debug(data);
                }
            },
            error: function(data){
                debug(data);
            }

        });
    }
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
                    createIncomeChart(data.data)
                }

            },
            error: function(data){
                setErrorMsg(data);
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
        Highcharts.chart('dipper-chart-line', {
            chart: {
                type: 'line',
                backgroundColor: "rgba(0,0,0,0)",
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
                name: '北斗七星',
                data: data.yfnavTurnRatioList
            }, {
                name: '沪深300',
                data: data.ysDqCloseList
            }]
        });
    }
});
