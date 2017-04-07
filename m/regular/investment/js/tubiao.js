/**
 * Created by znn on 2016/3/1.
 */
$(function () {
    // Create the chart
    /*getdatajson();*/
    var Chartjson=[{
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
    }];
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '收益走势图标'
        },
        subtitle: {
            enabled: false
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                enabled: false//侧边title默认为true
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}万'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> 万元<br/>'
        },

        series: [{
            name: '走势',
            colorByPoint: true,
            data:Chartjson
        }],
        drilldown: {
            series: []
        }
    });
});
/*function getdatajson(){
    $.ajax({
        url: mainUrl + "intellAutoCalculateGruop",
        data: {},
        dataType: "JSON",
        success: function (data) {
            if(data.retcode==0000||data.retcode=="0000"){
                var getDataJson=data.data.ZN_groupCode;
            }else{
                setErrorMsg(data.retcode,data.retmsg);
            }

        },
        error:function(){
            alert("服务器错误");
        }
    });
}*/