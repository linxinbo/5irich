var newchart = {};
//步长
var steplength;
$(function () {
    //var args = new getArgs();
    //	var fundid = args.fundid;
    //	var type = args.type;
    $(".dechart ul li:eq(0)").css({color:"#ff9900",fontWeight:"700"}).siblings("li").css({color:"#333",fontWeight:"500"});

});
//根据基金类型绘制收益走势；
function drawLine(fundid, type) {
    if (type == "货币型" || type == "货币市场型") {
       newchart.option.title.text = "";
        newchart.option.series[0].name = "七日年化收益率";
       $(".dechart ul li:eq(0)").html("七日年化收益率");
        $(".dechart ul li:eq(1)").html("每万份收益");
        getCoinIncomeData(fundid, 0);
        getCoinIncomeData(fundid, 1);
        getCoinIncomeData(fundid, 2);
        getCoinIncomeData(fundid, 3);
        getCoinIncomeData(fundid, 6);
        //切换收益
        $(".dechart ul li").click(function () {

            $(".kmap_date td span").removeClass("selexx");
            $(".kmap_date td span:eq(2)").addClass("selexx");
            $(this).css({color:"#ff9900",fontWeight:"700"}).siblings("li").css({color:"#333",fontWeight:"500"});
            /**  点击切换收益种类**/
            if ($(this).index() != 1) {
                newchart.option.xAxis.tickInterval=30;

                newchart.option.title.text = "";
                newchart.option.series[0].name = "七日年化收益率（%）";
               // $(".chartTit,.kmap_box").show();
                $(".dechart ul").attr("data-type", 0);
                newchart.option.xAxis.categories = mydata.y6;
                newchart.option.series[0].data = mydata.x6;

            }
            if ($(this).index() == 1) {
                newchart.option.xAxis.tickInterval=30;

                newchart.option.title.text = "";
                newchart.option.series[0].name = "每万份收益";
                newchart.option.xAxis.categories = mydata.y6;
                newchart.option.series[0].data = mydata.a6;
                $(".dechart ul").attr("data-type", 1);
            }
            setDataChart(newchart.option);
        });
        //切换时间
        $(".kmap_date td span").unbind("click").click(function () {
            $(".kmap_date td span").removeClass("selexx");
            $(this).addClass("selexx");
            var _index = $(this).attr("data-index");
            var incomeType = $(".dechart ul").attr("data-type");
            if (incomeType == 0) {
                if (_index == 0) {
                    newchart.option.xAxis.tickInterval=6;

                    newchart.option.xAxis.categories = mydata.y1;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x1;
                } else if (_index == 1) {
                    newchart.option.xAxis.tickInterval=16;

                    newchart.option.xAxis.categories = mydata.y3;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x3;
                } else if (_index == 2) {
                    newchart.option.xAxis.tickInterval = 30;

                    newchart.option.xAxis.categories = mydata.y6;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x6;
                } else if (_index == 3) {
                    newchart.option.xAxis.tickInterval = 60;

                    newchart.option.xAxis.categories = mydata.yYear;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.xYear;
                }else if (_index == 6) {
                    newchart.option.xAxis.tickInterval= 200;

                    newchart.option.xAxis.categories = mydata.yall;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.xall;
                }
            } else {
                if (_index == 0) {
                    newchart.option.xAxis.tickInterval=6;

                    newchart.option.xAxis.categories = mydata.y1;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.a1;
                } else if (_index == 1) {
                    newchart.option.xAxis.tickInterval=16;

                    newchart.option.xAxis.categories = mydata.y3;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.a3;
                } else if (_index == 2) {
                    newchart.option.xAxis.tickInterval = 30;

                    newchart.option.xAxis.categories = mydata.y6;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.a6;
                } else if (_index == 3) {
                    newchart.option.xAxis.tickInterval= 60;

                    newchart.option.xAxis.categories = mydata.yYear;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.aYear;
                }else if (_index == 6) {
                    newchart.option.xAxis.tickInterval= 200;

                    newchart.option.xAxis.categories = mydata.yall;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.aall;
                    console.log(mydata.yall)
                }
            }
            setDataChart(newchart.option);
        });
    } else {
        //读取收益并绘制；
        getFundIncomeData(fundid, 0);
        getFundIncomeData(fundid, 1);
        getFundIncomeData(fundid, 2);
        getFundIncomeData(fundid, 3);
        getFundIncomeData(fundid, 6);
        //切换收益
        $(".dechart ul li").click(function () {
          //  $("ul.navtab1 li").removeClass("selexx");
            $(".kmap_date td span").removeClass("selexx");
            $(".kmap_date td span:eq(2)").addClass("selexx");
            $(this).css({color:"#ff9900",fontWeight:"700"}).siblings("li").css({color:"#333",fontWeight:"500"})
            /**  点击切换收益种类**/
            if ($(this).index() != 1) {
                newchart.option.xAxis.tickInterval=30;
             //   newchart.option.title.text = "净值收益（%）";
                newchart.option.series = [{ //指定数据列
                    name: '净值收益', //数据列名
                    data: "", //数据
                    dataLabels: { //是否显示数据值；
                        enabled: false
                    },
                    marker: { //是否显示数据点
                        enabled: false
                    },
                    color: "#ff9900"
                },
                    {
                        name: '沪深300',
                        data: '',
                        dataLabels: { //是否显示数据值；
                            enabled: false
                        },
                        marker: { //是否显示数据点
                            enabled: false
                        },
                        color: "#3ca5e6"

                    }];
                newchart.option.series[0].name = "净值收益"
             //   $(".chartTit,.kmap_box").show();
                $(".dechart ul").attr("data-type", 0);
                newchart.option.xAxis.categories = mydata.y6;
                newchart.option.series[0].data = mydata.x6;
                newchart.option.series[1].data = mydata.n6;
            }
            if ($(this).index() == 1) {
                newchart.option.xAxis.tickInterval=30;
                newchart.option.title.text = "";
                newchart.option.series = [{ //指定数据列
                    name: '净值收益', //数据列名
                    data: "", //数据
                    dataLabels: { //是否显示数据值；
                        enabled: false
                    },
                    marker: { //是否显示数据点
                        enabled: false
                    },
                    color: "#ff9900"
                }];
                newchart.option.series[0].name = "累计净值"
                //				newchart.option.series[1].data = "";
                newchart.option.xAxis.categories = mydata.y6;
                newchart.option.series[0].data = mydata.a6;
                $(".dechart ul").attr("data-type", 1);
            }
            setDataChart(newchart.option);
        });
        //切换时间；
        $(".kmap_date td span").unbind("click").click(function () {
            $(".kmap_date td span").removeClass("selexx");
            $(this).addClass("selexx");
            var _index = $(this).attr("data-index");
            var incomeType = $(".dechart ul").attr("data-type");

            if (incomeType == 0) {
                if (_index == 0) {
                    newchart.option.xAxis.tickInterval=6;

                    newchart.option.xAxis.categories = mydata.y1;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x1;
                    newchart.option.series[1].data = mydata.n1;
                } else if (_index == 1) {
                    newchart.option.xAxis.tickInterval=16;

                    newchart.option.xAxis.categories = mydata.y3;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x3;
                    newchart.option.series[1].data = mydata.n3;
                } else if (_index == 2) {
                    newchart.option.xAxis.tickInterval = 30;

                    newchart.option.xAxis.categories = mydata.y6;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x6;
                    newchart.option.series[1].data = mydata.n6;
                } else if (_index == 3) {
                    newchart.option.xAxis.tickInterval = 60;

                    newchart.option.xAxis.categories = mydata.yYear;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.xYear;
                    newchart.option.series[1].data = mydata.nYear;
                }else if (_index == 6) {
                    newchart.option.xAxis.tickInterval = 400;

                    newchart.option.xAxis.categories = mydata.yall;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.xall;
                    newchart.option.series[1].data = mydata.nall;
                }
            } else {
                //				newchart.option.series[1].data = "";
                if (_index == 0) {
                    newchart.option.xAxis.tickInterval=6;

                    newchart.option.xAxis.categories = mydata.y1;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.a1;
                } else if (_index == 1) {
                    newchart.option.xAxis.tickInterval=16;

                    newchart.option.xAxis.categories = mydata.y3;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.a3;
                } else if (_index == 2) {
                    newchart.option.xAxis.tickInterval= 30;

                    newchart.option.xAxis.categories = mydata.y6;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.a6;
                } else if (_index == 3) {
                    newchart.option.xAxis.tickInterval= 60;

                    newchart.option.xAxis.categories = mydata.yYear;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.aYear;
                }else if (_index == 6) {
                    newchart.option.xAxis.tickInterval= 400;

                    newchart.option.xAxis.categories = mydata.yall;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.aall;
                }
            }
            setDataChart(newchart.option);
        });
    }
}
//绘制图表；
function setDataChart(option) {
    var chart = new Highcharts.Chart(option);
}
//非货币型基金走势；
function getFundIncomeData(fundid, date) {
  //  hideloading();
   // showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "fundnav",
        data: {
            "Windcode": fundid,
            "type": date
        },
        dataType: "json",
        success: function (data) {

            if (data.retcode == 0000) {
                if (date == 0) {
                    //净值收益
                    mydata.x1 = data.data.navList;
                    mydata.y1 = data.data.xList;
                    mydata.a1 = data.data.fNavAccumulated;
                    //沪深300；
                    mydata.n1 = data.data.sh300List;
                    setDataType(mydata.x1);
                    setDataType(mydata.n1);
                    setDataType(mydata.a1);


                } else if (date == 1) {
                    //净值收益
                    mydata.x3 = data.data.navList;
                    mydata.y3 = data.data.xList;
                    mydata.a3 = data.data.fNavAccumulated;
                    //沪深300；
                    mydata.m3 = data.data.xList;

                    mydata.n3 = data.data.sh300List;
                    setDataType(mydata.x3);
                    setDataType(mydata.n3);
                    setDataType(mydata.a3);

                } else if (date == 2) {
                    //净值收益
                    mydata.x6 = data.data.navList;
                    mydata.y6 = data.data.xList;
                    mydata.a6 = data.data.fNavAccumulated;
                    //沪深300；
                    mydata.m6 = data.data.xList;
                    mydata.n6 = data.data.sh300List;
                    console.log(mydata.n6);
                    setDataType(mydata.x6);
                    setDataType(mydata.n6);
                    setDataType(mydata.a6);

                    newchart.option.xAxis.categories = mydata.y6;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x6;
                    newchart.option.series[1].data = mydata.n6;
                  //  hideloading();
                    setDataChart(newchart.option);
                } else if (date == 3) {
                    //净值收益
                    mydata.xYear = data.data.navList;
                    mydata.yYear = data.data.xList;
                    mydata.aYear = data.data.fNavAccumulated;
                    //沪深300；
                    mydata.mYear = data.data.xList;
                    mydata.nYear = data.data.sh300List;
                    console.log(mydata.nYear);
                    setDataType(mydata.xYear);
                    setDataType(mydata.nYear);
                    setDataType(mydata.aYear);
                }else if (date == 6) {
                    //净值收益
                    mydata.xall = data.data.navList;
                    mydata.yall = data.data.xList;
                    mydata.aall = data.data.fNavAccumulated;
                    //沪深300；
                    mydata.mYear = data.data.xList;
                    mydata.nall = data.data.sh300List;
                    setDataType(mydata.xall);
                    setDataType(mydata.nall);
                    setDataType(mydata.aall);
                }
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
           // hideloading();
            showAlert("服务器错误");
        }
    })

}
//货币基金收益走势；
function getCoinIncomeData(fundid, date) {
   // hideloading();
  //  showLoading();

    $.ajax({
        type: "post",
        url: mainUrl + "theYield",
        data: {
            "Windcode": fundid,
            "type": date
        },
        dataType: "json",
        success: function (data) {

            if (data.retcode == 0000) {
                if (date == 0) {
                    //七日年化
                    mydata.x1 = data.data.fInfoYearlyroe;

                    mydata.y1 = data.data.xList;
                    //万份收益
                    mydata.a1 = data.data.fInfoUnityield;
                    //沪深300；
                    setDataType(mydata.x1);
                    setDataType(mydata.a1);

                } else if (date == 1) {
                    //七日年化
                    mydata.x3 = data.data.fInfoYearlyroe;

                    mydata.y3 = data.data.xList;
                    //万份收益
                    mydata.a3 = data.data.fInfoUnityield;
                    //沪深300；
                    mydata.m3 = data.data.xList;
                    setDataType(mydata.x3);
                    setDataType(mydata.a3);

                } else if (date == 2) {
                    //七日年化
                    mydata.x6 = data.data.fInfoYearlyroe;

                    mydata.y6 = data.data.xList;
                    //万份收益
                    mydata.a6 = data.data.fInfoUnityield;
                    //沪深300；
                    mydata.m6 = data.data.xList;
                    setDataType(mydata.x6);
                    setDataType(mydata.a6);
                    newchart.option.xAxis.categories = mydata.y6;
                    //				newchart.option.series[0].data=mydata.y;
                    newchart.option.series[0].data = mydata.x6;
                    //					newchart.option.series[1].data = mydata.n1;
                    newchart.option.series.splice(1, 1);
                   // hideloading();
                    setDataChart(newchart.option);
                } else if (date == 3) {
                    //七日年化
                    mydata.xYear = data.data.fInfoYearlyroe;

                    mydata.yYear = data.data.xList;
                    //万份收益
                    mydata.aYear = data.data.fInfoUnityield;
                    //沪深300；
                    mydata.mYear = data.data.xList;
                    setDataType(mydata.xYear);
                    setDataType(mydata.aYear);
                }else if (date == 6) {

                     mydata.xall=data.data.fInfoYearlyroe;
                     mydata.yall=data.data.xList;

                     mydata.aall=data.data.fInfoUnityield;
                    setDataType(mydata.xall);
                    setDataType(mydata.aall);
                }
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
         //   hideloading();
            showAlert("服务器错误");
        }
    })
}
// 走势数据
var mydata = {

    x1: 0,
    y1: 0,
    a1: 0,
    x3: 0,
    y3: 0,
    a3: 0,
    x6: 0,
    y6: 0,
    a6: 0,
    xYear: 0,
    yYear: 0,
    aYear: 0,
    xall:0,
    yall:0,
    aall:0,
    n1: 0,
    n3: 0,
    n6: 0,
    nYear: 0,
    nall:0
};


newchart.option = {
    chart: {
        type: 'line', //指定图表的类型，默认是折线图（line）
        renderTo: 'container',
        style: {
            backgroundColor: "#fff"
        }
    },
    title: {
        text: "", //指定图表标题
        align:'right'
    },
    xAxis: {
        categories: "", //指定x轴分组
        labels: {
            style: {
                color: "#000",
                fontSize: "11px"
            },
            rotation: 0,
            step: 1 /*中间间隔数*/
        },
        gridLineColor: "#ffffff",
        /*gridLineWidth: 1,*/ //不要纵轴线
        tickInterval: 30,
        //		tickAmount: 8, //未知
        tickLength: 5,
        tickWidth: 1,
        tickmarkPlacement: "between",
        /*坐标在中间显示*/

    },
    yAxis: {
        //		categories: ydara.x,
        title: {
            text: null //指定y轴的标题
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        gridLineColor: "#d8dce0",
        //tickInterval: 5,   //y轴背景方格间距
        //gridLineWidth: 1,
        tickLength: 3,
        tickWidth: 1,
        //tickPixelInterval:5  //y轴坐标值的密度
    },
    series: [

        { //指定数据列
            name: '净值收益', //数据列名
            data: "", //数据
            dataLabels: { //是否显示数据值；
                enabled: false
            },
            marker: { //是否显示数据点
                enabled: false
            },
            color: "#ff9900"
        },
        {
            name: '沪深300',
            data: '',
            dataLabels: { //是否显示数据值；
                enabled: false
            },
            marker: { //是否显示数据点
                enabled: false
            },
            color: "#3ca5e6"

        }
    ],
    credits: { //商标
        enabled: false
    },
    legend: {
        enabled: true
    },
    plotOptions: {}
}

//转换为数值型
function setDataType(data) {

    if(data==null){
        data="";
    }else{
        for (var i = 0; i < data.length; i++) {
            var n = Number(data[i]);
            data[i] = n;
        }
    }
    return data;
}
