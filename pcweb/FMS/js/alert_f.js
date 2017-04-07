/**
 * Created by linxi on 2016/11/30.
 */
$(function () {
    $('.float_c').hide();
    alert_f();


});

function alert_f(){
    var params = {};
    $.ajax({
        url: mainUrl + "alert_f",
        data: params,
        dataType: "JSON",
        //async: false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
        success: function (response3) {
            var data1 = response3.data1;
            $('#fund_list tbody').html('');
            var tablehtml = "";
            $(data1).each(function (i, n) {
                /*tbdata1=;*/
                /* tbdata.push(,);*/
                tablehtml += '<tr data-name="'+n.fname+'"><td>'+n.fname+'</td><td>'+ n.freturn_month+'</td><td>'+ n.freturn_season+'</td><td>'+ n.freturn+'</td><td>'+ n.fsharpe+'</td><td>'+ n.fmaxdown+'</td><td>'+ fwarning(n.fwarning)+'</td></tr>';
            });
            $('#fund_list tbody').append(tablehtml);
            var data2 = response3.data2;
            var tablehtml1 = "";
            $('#fund_list1').html('');
            $(data2).each(function (i, n) {
                /*tbdata1=;*/
                /* tbdata.push(,);*/
                var nav_flag= n.nav_flag;
                if(nav_flag==1){
                    tablehtml1 += '<div class="change_list"><span>'+ n.fname+':</span><a>本周的变化幅度为'+ n.sub_change+' % ，'+fwarning(n.change_flag)+' '+ n.alert_change+'% 的预警线; 触发0.98%的预警线</a></div>';
                }else{
                    tablehtml1 += '<div class="change_list"><span>'+ n.fname+':</span><a>本周的变化幅度为'+ n.sub_change+' % ，'+fwarning(n.change_flag)+' '+ n.alert_change+'% 的预警线</a></div>';
                }

            });
            $('#fund_list1').append(tablehtml1);

            alert_f_zs();

        },
        error: function (response3) {
            console.log("服务器错误" + response3);
        }

    });

};


function fwarning(val){
    var val1=Number(val);
    if(val1==0){
        return "未触发"

    }else{
        return "已触发"
    }

}

function alert_f_zs(){

    $('#fund_list tbody tr').click(function(){
        var dataname=$(this).attr("data-name");
        var fangwenshuju2=fangwen(dataname);
        var fangwenshuju3=fangwen1(dataname);

        var maxzhi1=Math.max.apply(null, fangwenshuju3[0].data);
        var minzhi1=Math.min.apply(null, fangwenshuju3[0].data);
        var a=$(this).offset();
        var y= a.top;
        $('.float_c').css({position: "absolute",top:y+35,width: '500px',left: '50%','margin-left':'-250px',display: 'block'});

        $('#container1').highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: '净值走势图'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 50,
                y: 30,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories:fangwenshuju2,
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .4)'
                }],
                tickInterval:10
            },
            yAxis: {
                max:maxzhi1, // 定义Y轴 最大值
                min:minzhi1, // 定义最小值
                title: {
                    text: null
                },
                tickInterval:0.04
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
            series: fangwenshuju3
        });
        $('.highcharts-plot-band ').css('display','none');

    });
    console.log()
    $('#guanbi').click(function(){
        $('.float_c').hide();
    });

}


function fangwen(dataname){
    var alert_data1=[];
    var params5 = {
        "fname":dataname
    };
    $.ajax({
        url : mainUrl + "fval",
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

function fangwen1(dataname){
    var alert_data2=[];
    var alert_data3=[];
    var params5 = {
        "fname":dataname
    };

    $.ajax({
        url : mainUrl + "fval",
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
            alert_data3.push({name:dataname,data:alert_data2});
            return alert_data3;


        },
        error : function(response3) {
            console.log("服务器错误"+response3);

        }

    });
    return alert_data3;
}