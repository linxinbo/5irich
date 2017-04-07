/**
 * Created by linxi on 2016/11/29.
 */
$(function () {
    $("#btn_jisuan").click(function(){
        var Stock_predict=$('.Stock_predict input[name="Stock_predict"]:checked').val();
        var Debt_predict=$('.Debt_predict input[name="Debt_predict"]:checked').val();
        var params4 = {
            "stock_predict" : Stock_predict,
            "debt_predict" : Debt_predict
        };
        $.ajax({
            url : mainUrl + "cal_weight3",
            data : params4,
            dataType : "JSON",
            async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
            success : function(response3) {
                var data5=response3.data;
                $('#datatable tbody').html('');
                var tablehtml="";
                $(data5).each(function(i,n){
                    /*tbdata1=;*/
                    /* tbdata.push(,);*/
                    var weight5=Number(n.weight1)*100;
                    var weight51=weight5.toFixed(2);
                    var weight6=Number(n.weight2)*100;
                    var weight61=weight6.toFixed(2);
                    tablehtml += '<tr><th>'+ n.name+'</th><td>'+weight51+'</td><td>'+weight61+'</td></tr>';
                });
                $('#datatable tbody').append(tablehtml);
            },
            error : function(response3) {
                console.log("服务器错误"+response3);

            }

        });

        $('#container2').highcharts({
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'column',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            title: {
                text: null
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: null
                },
                lineColor:'#eeeeee',
                labels:{
                    style: {
                        color: '#ffffff',
                        fontSize:'12px',
                        fontFamily:'微软雅黑'
                    }

                },
                tickInterval:4
            },
            xAxis: {
                lineColor:'#eeeeee',
                labels:{
                    style: {
                        color: '#ffffff',
                        fontSize:'12px',
                        fontFamily:'微软雅黑'
                    }

                }
            },
            legend:{
                title:{
                    style:{
                        color: '#ffffff',
                        fontSize:'12px',
                        fontFamily:'微软雅黑'
                    }
                },
                itemStyle:{
                    color: '#ffffff'

                }

            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });



    });


    $("#btn-ceshi").click(function(){
        var Stock=$('#Stock').val();
        var debt=$('#debt').val();
        var Basis=$('#Basis').val();
        if(Stock==""||Stock==null||debt==""||debt==null||Basis==""||Basis==null){
            alert("请填写完整的预测信息！")
            return false;
        }
        var params5 = {
            "stock" : Stock,
            "debt" : debt,
            "basis" : Basis
        };
        $.ajax({
            url : mainUrl + "stress_test",
            data : params5,
            dataType : "JSON",
            async : false,//表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
            success : function(response4) {
                var data6=response4.data;
                console.log(data6);
                var future_nav=data6[0].future_nav;
                var future_nav1=future_nav.toFixed(4);
                $('.daan1 a').html('');
                $('.daan1 a').append(future_nav1);
            },
            error : function(response3) {
                console.log("服务器错误"+response3);

            }

        });



    });

});