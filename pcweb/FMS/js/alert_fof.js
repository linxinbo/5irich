/**
 * Created by linxi on 2016/11/30.
 */
$(function () {
    // Create the chart
    /*getdatajson();*/
    alert_fof();

    var fangwenshuju=fangwen3();
    var fangwenshuju1=fangwen4();
    console.log(fangwenshuju1[0].data);
    var maxzhi=Math.max.apply(null, fangwenshuju1[0].data);
    var minzhi=Math.min.apply(null, fangwenshuju1[0].data);
    $('#container2').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: null
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 50,
            y: 20,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories:fangwenshuju ,
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .4)'
            }],
            lineColor:'#ffffff',
            labels:{
                style: {
                    color: '#ffffff',
                    fontSize:'12px',
                    fontFamily:'微软雅黑'
                }

            }
        },
        yAxis: {
            title: {
                text: null
            },
            max:maxzhi,//最大值, // 定义Y轴 最大值
            min:minzhi, // 定义最小值
            lineColor:'#ffffff',
            labels:{
                style: {
                    color: '#ffffff',
                    fontSize:'12px',
                    fontFamily:'微软雅黑'
                },
                /*maxStaggerLines:5*/
                /*staggerLines:5*/


            },
            tickInterval:0.02
        },
        tooltip: {
            shared: true,
            valueSuffix: ' 净值'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.6
            }
        },
        series: fangwenshuju1
    });
    $('.highcharts-plot-band ').css('display','none');
});

function fangwen3(){
    var alert_data1=[];
    var params5 = {};
    $.ajax({
        url : mainUrl + "alert_fof",
        data : params5,
        dataType : "JSON",
        async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
        success : function(response5) {
            var data6=response5.val;
            $(data6).each(function(i,n){
                /*tbdata1=;*/
                /* tbdata.push(,);*/
                alert_data1.push(n.date);
            });
            return alert_data1;
        },
        error : function(response3) {
            console.log("服务器错误"+response3);

        }

    });
    return alert_data1;
}

function fangwen4(){
    var alert_data2=[];
    var alert_data3=[];
    var params5 = {};
    $.ajax({
        url : mainUrl + "alert_fof",
        data : params5,
        dataType : "JSON",
        async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
        success : function(response6) {
            var data7=response6.val;
            $(data7).each(function(i,n){
                /*tbdata1=;*/
                /* tbdata.push(,);*/
                alert_data2.push(Number(n.value));
            });
            alert_data3.push({name:'FOF',data:alert_data2});
            return alert_data3;


        },
        error : function(response3) {
            console.log("服务器错误"+response3);

        }

    });
    return alert_data3;
}

function alert_fof(){
    var params = {};
    $.ajax({
        url: mainUrl + "alert_fof",
        data: params,
        dataType: "JSON",
        //async: false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
        success: function (response9) {
            var data9 = response9.data1;
            $('#fund_list2').html('');
            var tablehtml3 = "";
            $(data9).each(function (i, n) {
                /*tbdata1=;*/
                /* tbdata.push(,);*/
                tablehtml3 += '<div class="change_list1"><a>FOF当前净值为'+ n.nav+'，'+fwarning(n.nav_flag)+''+ n.alert_nav+'预警线</a></div>';
            });
            $('#fund_list2').append(tablehtml3);
            var data8 = response9.data2;
            var tablehtml4 = "";
            $('#fund_list3').html('');
            $(data8).each(function (i, n) {
                /*tbdata1=;*/
                /* tbdata.push(,);*/
                tablehtml4 += '<div class="change_list1"><a>FOF本周净值变化幅度为'+ n.change+'，'+fwarning(n.change_flag)+''+ n.alert_change+'的预警线</a></div>';
            });
            $('#fund_list3').append(tablehtml4);

        },
        error: function (response3) {
            console.log("服务器错误" + response3);
        }

    });

};
