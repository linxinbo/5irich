/**
 * Created by linxi on 2016/11/29.
 */
/**
 * Created by znn on 2016/3/1.
 */
$(function () {
    // Create the chart
    /*getdatajson();*/

    var Chartjson1=cel_weight();
    console.log(Chartjson1);

    $('#container1').highcharts({
        chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: null
        },
        subtitle: {
            enabled: false
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        xAxis: {
            type: 'category',
            lineColor:'#ffffff',
            labels:{
                style: {
                    color: '#ffffff',
                    fontSize:'14px',
                    fontFamily:'微软雅黑'
                }

            }
        },
        yAxis: {
            title: {
                enabled: false//侧边title默认为true
            },
            lineColor:'#ffffff',
            labels:{
                style: {
                    color: '#ffffff',
                    fontSize:'14px',
                    fontFamily:'微软雅黑'
                }

            }

        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%',
                    style: {
                        color: '#ffffff',
                        fontSize:'14px',
                        fontFamily:'微软雅黑'

                    }
                },


            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:14px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> %<br/>'
        },

        series: [{
            name: '权重',
            colorByPoint: true,
            data:Chartjson1
        }],
        drilldown: {
            series: []
        }
    });
    $(".highcharts-drilldown-axis-label").css("color",'#ffffff');
    $(".highcharts-drilldown-axis-label").css("text-decoration",'none');
    $(".highcharts-drilldown-data-label text").css("text-decoration",'none');
});

function cel_weight(){
    var params = {};
    var Chartjson=[/*{
     name: '起始',
     y: 6.6,
     drilldown: null
     },
     {
     name: '1年',
     y: 10.1,
     drilldown: '1年'
     },
     {
     name: '5年',
     y: 24.7,
     drilldown: '5年'
     },
     {
     name: '10年',
     y: 40.8,
     drilldown: '10年'
     },
     {
     name: '15年',
     y: 64.3,
     drilldown: '15年'
     },
     {
     name: '20年',
     y: 88.8,
     drilldown: '20年'
     }*/];
    $.ajax({
        url : mainUrl + "cal_weight2",
        data : params,
        dataType : "JSON",
        async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
        success : function(response) {
            //var colors1=riskParityColor;
            var data_cel=response.data;


            $(data_cel).each(function(i,n){
                /*tbdata1=;*/
                /* tbdata.push(,);*/
                var weight=Number(n.weight);
                var weight1=weight*100;
                Chartjson.push({name:n.name,y:weight1,drilldown: n.name});
            });
            console.log(Chartjson);
            return Chartjson;
            /*$('#container').series[0].setData(tbdata);*/
            /*Highcharts.setOption({//legend: {data: wzdata1},
             series: [{data: tbdata}]//根据名字对应到相应的系列
             });*/
        }
    });
    return Chartjson;
}