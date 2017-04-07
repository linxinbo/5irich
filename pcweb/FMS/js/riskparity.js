/**
 * Created by linxi on 2016/11/28.
 */

$(function () {
    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;
        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());
    // Build the chart
 function initchart(datas){
     console.log(datas)
     $('#container').highcharts({
         chart: {
             /*type: 'pie',*/
             backgroundColor: 'rgba(0,0,0,0)'
         },
         credits:{
             enabled:false // 禁用版权信息
         },
         title: {
             text:null
         },
         /*lables: {
          style: {
          textShadow: 'none'
          }
          },*/
         tooltip: {
             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
         },
         legend:{
             align:"center",
             itemStyle:{ cursor: 'pointer', color: '#ffffff',fontFamily:'微软雅黑',fontWeight:'none'},


         },
         plotOptions: {
             pie: {
                 allowPointSelect: true,
                 cursor: 'pointer',
                 /*connectorColor: '#ffffff',*/
                 dataLabels: {
                     borderColor: '#FFFFFF',
                     borderRadius: '0',
                     borderWidth: '0',
                     enabled: true,
                     format: '{point.name}: {point.percentage:.1f} %',
                     style: {
                         color: '#ffffff',
                         fontSize:'16px',
                         fontFamily:'微软雅黑',
                         textOutline:'0',
                         fontWeight:'none'
                     },
                     shadow: false

                 },
                 showInLegend: true,

             },
             series: {
                 events: {
                     legendItemClick: function () {
                         return false;
                     }
                 }
             }


         },
         series: [{
             type: 'pie',
             name: '权重',
             data: datas
         }]
         /*series:riskParity()*/
     });
     /*$('.highcharts-text-outline').css('display','none');
     $('.highcharts-legend-item').on('click',function(){
         return false;
     })//类似这样的禁止*/
 }
    riskParity(initchart);

});
function riskParity(callback){
    var params = {};
    //showLoading();
    var tbdata = [];
    //var tbdata1={};
    $.ajax({
        url : mainUrl + "cal_weight1",
        data : params,
        dataType : "JSON",
        async : true,//表示异步回调函数获取值
        success : function(response) {
            var colors1=riskParityColor;
            var data=response.data;
            console.log(data);

            $(data).each(function(i,n){
                /*tbdata1=;*/
               /* tbdata.push(,);*/
                tbdata.push({name:n.name,y:Number(n.weight)});
            });

            /*$('#container').series[0].setData(tbdata);*/
            /*Highcharts.setOption({//legend: {data: wzdata1},
             series: [{data: tbdata}]//根据名字对应到相应的系列
             });*/
            if(callback){
                callback(tbdata);
            }
            console.log(tbdata);
            return tbdata;
        }
    });
    console.log(tbdata);
    return tbdata;
};