/**
 * Created by dell on 2016/11/30.
 */
Highcharts.theme = {
    colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
        backgroundColor: null,
    },
    title: {
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    },
    tooltip: {
        borderWidth: 0,
        borderColor:'#ff9900',
        backgroundColor: 'rgba(204,210,216,0.6)',
        shadow: false,
       // shared: true,
      //  useHTML: true,
        //headerFormat: '<small>日期：{point.key}</small><div>',
        //pointFormat: '<span style="color: {series.color};"> {series.name}：' +
        //'{point.y} </span> ',
        //footerFormat: '</div>',
        valueDecimals: 2
        //crosshairs: [{            // 设置准星线样式
        //    width: 1,
        //    color: '#999999'
        //}, {
        //    width: 1,
        //    color: "#999999",
        //    dashStyle: 'solid',
        //    zIndex: 100
        //}]
        //positioner: function() {
        //    return {
        //        x: 34,
        //        y: -5
        //    }
        //}
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '11px',
            borderRadius:"50%"
        },
        align:"right",
        verticalAlign:"top",
        x:-60,
        itemDistance:50,
        symbolRadius:10
    },
    xAxis: {
        gridLineWidth: 1,
        labels: {
            style: {
                fontSize: '12px'
            }
        },

    },
    yAxis: {
        //minorTickInterval: 'auto',
        title: {
            style: {
                textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '11px'
            }
        },
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function (e) {
                        /*hs.htmlExpand(null, {
                         pageOrigin: {
                         x: e.pageX || e.clientX,
                         y: e.pageY || e.clientY
                         },
                         headingText: this.series.name,
                         maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                         this.y + ' visits',
                         width: 200
                         });
                         */
                        /*$('.message').html( '日期：'+this.point.key + this.series.name+': ' +
                         this.point.y + '% ');*/
                    }
                },
            },
            marker: {
                lineWidth: 0.5,
            }
        },
    },



    // General
    background2: '#FFFFFF'

};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
