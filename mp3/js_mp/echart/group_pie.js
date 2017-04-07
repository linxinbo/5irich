/**
 * Created by CJQF on 2016/8/12.
 */
//app.title = '环形图';

var myChart = echarts.init(document.getElementById('chart-panel'),theme);
myChart.title = '环形图';
        myChart.title = '智能组合';
        var option = {
            title:{
                text:'智能组合'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {d}%",
                position:[10,10]//修改显示位置
                // formatter: "{a} <br>{b} : ({d}%)"原来的换行
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                {
                    name:'组合基金占比',
                    type:'pie',
                    radius: ['64%', '86%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[]
                }
            ]
        };
        myChart.setOption(option);




//异步加载数据
/*
$.get('data.json').done(function (data) {
    // 填入数据
    myChart.setOption({
        xAxis: {
            data: data.categories
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '销量',
            data: data.data
        }]
    });
});
*/
