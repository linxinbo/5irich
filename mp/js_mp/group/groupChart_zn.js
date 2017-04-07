var newchart = {};

function setDataChart(option) {
	var chart = new Highcharts.Chart(option);

}

function getGroupIncomeData(fundid, date) {
	//	hideloading();
	showLoading();
	$.ajax({
		type: "post",
		url: "http://www.5irich.com/" + "WebQueryGroupChartAction",
		data: {
			"groupId": fundid,
			"startType": date
		},
		dataType: "json",
		success: function (data) {
			console.log(data);

			if (data.retcode == 0000) {
				hideloading();
				if (date == 0) {
					//净值收益
					mydata.x1 = data.data.yfnavTurnRatioList;

					mydata.y1 = data.data.xList;
					mydata.a1 = data.data.yfnavUnitList;
					//沪深300；  
					mydata.n1 = data.data.ysDqCloseList;
					setprecentDataType(mydata.x1);
					setprecentDataType(mydata.n1);
					setDataType(mydata.a1);



				} else if (date == 1) {
					//净值收益
					mydata.x3 = data.data.yfnavTurnRatioList;
					mydata.y3 = data.data.xList;
					mydata.a3 = data.data.yfnavUnitList;
					//沪深300；

					mydata.n3 = data.data.ysDqCloseList;
					setprecentDataType(mydata.x3);
					setprecentDataType(mydata.n3);
					setDataType(mydata.a3);


				} else if (date == 2) {
					//净值收益
					mydata.x6 = data.data.yfnavTurnRatioList;
					mydata.y6 = data.data.xList;
					mydata.a6 = data.data.yfnavUnitList;
					//沪深300；
					mydata.n6 = data.data.ysDqCloseList;
					setprecentDataType(mydata.x6);
					setprecentDataType(mydata.n6);
					setDataType(mydata.a6);

					newchart.option.xAxis.categories = mydata.y6;
					newchart.option.series[0].data = mydata.x6;
					newchart.option.series[1].data = mydata.n6;

					setDataChart(newchart.option);



				} else if (date == 3) {
					//净值收益
					mydata.xYear = data.data.yfnavTurnRatioList;
					mydata.yYear = data.data.xList;
					mydata.aYear = data.data.yfnavUnitList;
					//沪深300；
					mydata.nYear = data.data.ysDqCloseList;
					setprecentDataType(mydata.xYear);
					setprecentDataType(mydata.nYear);
					setDataType(mydata.aYear);


				}
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误");
		}
	})

}

var mydata = {
	//	x: ["01-02", "01-03", "01-04", "01-05", "01-06", "01-07", "01-08", "01-09", "01-10", "01-11", "01-12", "01-13", "01-14", "01-15", "01-16", "01-17", "01-18", "01-19", "01-20", "01-21", "01-22"],
	//	y: [1.1, 1.9, 5.3, 2.6, 1.1, 3.0, 4.8, 1.1, 1.9, 5.3, 2.6, 1.1, 3.0, 4.8, 1.1, 1.9, 5.3, 2.6, 1.1, 3.0, 4.8]
	//	y:[0, -1.9700, -1.2300, 1.6600, 3.0000, 6.3200, 6.2400, 5.0400, 7.5300, 8.9800, 8.9900, 10.3300, 7.1100, 8.6900, 10.1300]
	//  x净值收益，y为时间；a为净值率；
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
	n1: 0,
	n3: 0,
	n6: 0,
	nYear: 0,
};
//步长
var steplength;

var ydara = {
	x: [-3, -2, -1, 0, 1, 2, 3, 4]
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
		text: "净值收益(%)", //指定图表标题
	},
	xAxis: {
		categories: "", //指定x轴分组
		labels: {
			style: {
				color: "#000",
				fontSize: "10px"
			},
			rotation: -70,
			step: 1 /*中间间隔数*/
		},
		/*gridLineWidth: 1,*/ //不要纵轴线
		tickInterval: 15,
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
		gridLineColor: "#cccccc",
		gridLineWidth: 1,
		tickLength: 3,
		tickWidth: 1
	},
	series: [{ //指定数据列
			name: '净值收益', //数据列名
			data: "", //数据
			dataLabels: { //是否显示数据值；
				enabled: false
			},
			marker: { //是否显示数据点
				enabled: false
			},
			color: "red"
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
			color: "#389ad7"

			}
				],
	credits: { //商标
		enabled: false
	},
	/*	tooltip: { //弹出提示框
			crosshairs: {
				width: 1,
				color: "#000"
			},
			shared: true,
			useHTML: true,
			backgroundColor: "#7ab8fe",
			//                pointFormatter: function() {
			//                    return "<span>{this.y}</span>"
			//                },
			pointFormat: "<span>{point.y}</span>", //<span>{point.key}</span>
			style: {
				color: "#ffffff"
			},
			valueSuffix: "%"
		},*/
	legend: {
		enabled: true
	},
	plotOptions: {}
}

//转换为数值型
function setDataType(data) {
	for (var i = 0; i < data.length; i++) {
		var n = Number(data[i]);
		data[i] = n;
	}
	return data;
}

//百分比转换为数值型
function setprecentDataType(data) {
	for (var i = 0; i < data.length; i++) {

		//var index = data[i].indexOf("%");
		//var n = data[i].substring(0, index);
		n = Number(data[i]);
		data[i] = n;
		//		alert(data[i]);
	}
	return data;
}
