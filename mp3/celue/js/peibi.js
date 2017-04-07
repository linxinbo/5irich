/**
 * Created by dell on 2017/2/9.
 */
var dipper={};
$(document).ready(function(){
    getDipperRatio()
})
function getDipperRatio(){
    $.ajax({
        url: 'http://www.5irich.com/queryCcbl',
        data: null,
        dataType: 'JSON',
        success: function(data){
            if(data.retcode == '0000'){
                console.log(data);
                createDipperRatio(data.data);
            }
        },
        error: function(data){
            console.log(data);
        }

    });
};
function createDipperRatio(data){

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
        console.log(ratio)
        dipper.ratio2 = createRatio1(ratio,ratioDate);
        $('.dipper-record').append(dipper.ratio2);

        if(index == 0){
            var efund = data[0].efundProportion*100;
            var mfund = data[0].mfundProportion*100;
            $(".huo").html(mfund+"%");
            $(".gu").html(efund+"%");
            ratioChart(ratio);
        }
    });
}
function ratioChart(data){
   $(".chart").highcharts( {
       chart: {
           type: 'column',
           height: 250
       },
       title: {
           text: ''
       },
       xAxis: {
           type: 'category'
       },
       yAxis: {
           title: {
               text: ''
           }
       },
       legend: {
           enabled: false
       },
       credits: {enabled:false},
       exporting: {enabled:false},
       plotOptions: {
           series: {
               pointWidth:30,
               borderWidth: 0,
               dataLabels: {
                   enabled: true,
                   format: '{point.y:.1f}%'
               }
           }
       },
       tooltip: {
           pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
       },
       series: [{
           name: 'Brands',
           colorByPoint: true,
           data: data
       }]
   })

};
function createRatio1(data,date){
    var ratioStr = '<tr><td class="dipper-line"><strong></strong><span></span></td>';
    ratioStr += '<td class="dipper-date">'+date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8)+'</span></td><td><ul class="dipper-record-ratio">';
    $.each(data,function(index,element){
        ratioStr +=  '<li><p>'+element[0]+'</p><span>'+element[1].toFixed(2)+'%</span></li>';
    });
    ratioStr += '</ul></td></tr>';
    return ratioStr;
}

