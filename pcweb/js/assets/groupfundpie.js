/**
 * Created by linxi on 2016/12/15.
 */
function groupfundpie(val){
Highcharts.setOptions({
    colors: ['#ff9a00', '#ffa926', '#ffb84d', '#ffc773', '#ffd699']
});

Highcharts.chart('group-chart1-pie', {
    chart: {
        height: 200,
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false

    },
    title: {
        text: '组 合 <br />占 比',
        align: "center",
        style: { "color": "#ffa926", "fontSize": "18px"},
        verticalAlign: "middle",
        y: -5
    },
    series: [{
        shadow: { "color": "#fff5e5", offsetX: 0, offsetY: 0, opacity:1,width: 10},
        type: 'pie',
        name: '组合占比',
        innerSize: '53%',
        borderWidth: 0,
        data: val,
        dataLabels: {
            enabled: false
        }
    }],
    credits: {
        enabled: false
    }
});
}