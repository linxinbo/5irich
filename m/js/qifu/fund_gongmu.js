var loadNum = 1;

$(function () {

	//设置基金种类导航
	var ww = window.innerWidth;
    $("#gm_select").css("width",ww-60);
    $("#type1").css("width",(ww-60)/2-10);
    $("#type2").css("width",(ww-60)/2);
	/*var size = $(".gm_type li").length;
	var navW = 70;
	if (ww > 320 && ww <= 360) {
		navW = 80;
	} else if (ww > 360) {
		navW = 80;
	}

	$(".over_flow ul").css("width", navW * size);
	$(".over_flow ul li").css("width", navW);*/
	getGongmu(1);
	goNextPage();
	/*$(".gm_type li").click(function () {
		loadNum = 1;
		var flag = $(this).index();
		$(".gm_type li").removeClass("gm_sel");
		$(".gm_type").attr("data_index", flag);
		$(this).addClass("gm_sel");

		if (flag == 0) {
			$(".gm_list_data").html("");
			getGongmu(1);
		} else if (flag == 1) {
			$(".gm_list_data").html("");
			gongmuType("货币市场型",loadNum);
		} else if (flag == 2) {
			$(".gm_list_data").html("");
			gongmuType("混合型",loadNum);
		} else if (flag == 3) {
			$(".gm_list_data").html("");
			gongmuType("债券型",loadNum);
		} else if (flag == 4) {
			$(".gm_list_data").html("");
			gongmuType("股票型",loadNum);
		} else if (flag == 5) {
			$(".gm_list_data").html("");
			gongmuType("QDII",loadNum);
		} else if (flag == 6) {
			$(".gm_list_data").html("");
			gongmuType("指数型",loadNum);
		} else if (flag == 7) {
			$(".gm_list_data").html("");
			gongmuType("其他",loadNum);
		}
	});*/
    $("#gm_all").click(function(){
        $("#type1").val(0);
        $("#type2").val(0);
        getGongmu(1);
    });
    $("#type1").change(function(){
        getType();
    });
    $("#type2").change(function(){
        getType();
    })
})
//获取查询种类
function getType(){
    loadNum = 1;
    var val1 = $("#type1 option:selected").val();
    var val2 = $("#type2 option:selected").val();
    var text1 = $("#type1 option:selected").text();
    var text2 = $("#type2 option:selected").text();
    if(val1 == 0 && val2 == 0){
        $(".gm_list_data").html("");
        getGongmu(1);
    }else if(val1 == 0 && val2 !== 0){
        $(".gm_list_data").html("");
        gongmuType(text2,loadNum);
    }else if(val1 !== 0 && val2 == 0){
        $(".gm_list_data").html("");
        gongmuType2(text1,loadNum);
    }else if(val1 !== 0 && val2 !== 0){
        $(".gm_list_data").html("");
        gongmuType3(text1,text2,loadNum);
    }
}
//查询全部
function getGongmu(page) {
	hideloading();
	showLoading();
	//	公募基金
	$.ajax({
		type: "post",
		url: mainUrl + "MutualFundListManacheAction",
		data: {
			page: page,
			pageRecorders: 20
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
				//				$(".gm_list_data").html("");
				$(data.data).each(function (i, n) {
					var fundid = n.fInfoWindcode + "";
					//fundid = fundid.substring(0, 6);
					var fNavUnit;
					var gains;
					var Quarter;
					var Year;

					if (n.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(n.fNavUnit * 10000) / 10000;
					};
					if (n.gracet == undefined) {
						gains = "-";
					} else {
						gains = n.gracet;
					};
					if (n.fAvgReturnQuarter == undefined) {
						Quarter = "-";
					} else {
						Quarter = Number(n.fAvgReturnQuarter)
						console.log(typeof (Quarter));
						Quarter = Math.round(Quarter * 100) / 100 + "%";

					};
					if (n.fAvgReturnThisYear == undefined) {
						Year = "-";
					} else {
						Year = Number(n.fAvgReturnThisYear);
						Year = Math.round(Year * 100) / 100 + "%";
					};

					var gm_list_data = '<li class="gm_list">' + '<div class="gm_header">' + '<div class="table_header"><span class="deal_name">' + n.fundName + '</span><span class="deal_code">' + fundid + '</span><a class="go-add" data-id="' + fundid + '" data-name="' + n.fundName + '" data-value="' + fNavUnit + '"><span class="add_collect add_hide">模拟购买</span></a><a class="go-buy" data-id="' + fundid + '"  data-name="' + n.fundName + '" data-type="'+n.fInfoFirstInvestType+'"><span>购买</span></a></div>' + '</div>' + '<div class="table_data_list">' + '<table class="table_data">' + '<tr><td class="td_1">最新净值：</td><td class="td_2">' + fNavUnit + '</td><td class="td_3">日涨幅：</td><td class="td_4 a'+page+i+'">' + gains + '</td></tr>' + '<tr><td class="td_1">累计三月：</td><td class="td_2 a'+page+i+'">' + Quarter + '</td><td class="td_3">累计一年：</td><td class="td_4">' + Year + '</td></tr>' + '</table>' + '<div class="gm_detail"></div>' + '</div>' + '</li>';

					$(".gm_list_data").append(gm_list_data);
                    var value1 = n.gracet.substring(0,n.gracet.length-1); //取值 转数字
                    //根据正负判断颜色
                    if(value1>0){
                        $(".td_4.a"+page+i).css('color','#ff3b2f');
                    }else if(value1<0){
                        $(".td_4.a"+page+i).css('color','#03d908');
                    }else {
                        $(".td_4.a"+page+i).css('color','#c6c6c6');
                    }
                    var value2 = n.fAvgReturnQuarter.substring(0,n.fAvgReturnQuarter.length-1);
                    if(value2>0){
                        $(".td_2.a"+page+i).css('color','#ff3b2f');
                    }else if(value2<0){
                        $(".td_2.a"+page+i).css('color','#03d908');
                    }else{
                        $(".td_2.a"+page+i).css('color','#c6c6c6');
                    }
					buyAddDetail();
				});

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			page--;
			hideloading();
			showAlert("服务器错误！");
		}
	})
}
//查询公司名称
function gongmuType2(managementComp, page) {
	hideloading();
	showLoading();
	//	公募基金
	$.ajax({
		type: "post",
		url: mainUrl + "MutualFundListManacheQueryAction",
		data: {
			page: page,
			pageRecorders: 20,
			managementComp: managementComp,
            
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
//				$(".gm_list_data").html("");
				$(data.data).each(function (i, m) {
					var fundid = m.fInfoWindcode + "";
					//fundid = m.fInfoWindcode.substring(0, 6);
					var fNavUnit = Math.round(m.fNavUnit * 10000) / 10000;
					console.log(fNavUnit);
					var gracet = m.gracet;
					var Quarter_ser = Math.round(m.fAvgReturnQuarter * 100) / 100 + "%";
					var Year_ser = Math.round(m.fAvgReturnYear * 100) / 100 + "%"

					if (m.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(m.fNavUnit * 10000) / 10000;
					};
					if (m.gracet == undefined) {
						gracet = "-";
					} else {
						gracet = m.gracet;
					};
					if (m.fAvgReturnQuarter == undefined) {
						Quarter_ser = "-";
					} else {
						Quarter_ser = Math.round(m.fAvgReturnQuarter * 100) / 100 + "%";
					};
					if (m.fAvgReturnYear == undefined) {
						Year_ser = "-";
					} else {
						Year_ser = Math.round(m.fAvgReturnYear * 100) / 100 + "%"
					};

					var gm_list_data = '<li class="gm_list">' + '<div class="gm_header">' + '<div class="table_header"><span class="deal_name">' + m.fundName + '</span><span class="deal_code">' + fundid + '</span><a class="go-add" data-id="' + fundid + '" data-name="' + m.fundName + '" data-value="' + fNavUnit + '"><span class="add_collect add_hide">模拟购买</span></a><a class="go-buy" data-id="' + fundid + '"  data-name="' + m.fundName + '" data-type="'+m.fInfoFirstInvestType+'"><span>购买</span></a></div>' + '</div>' + '<div class="table_data_list">' + '<table class="table_data">' + '<tr><td class="td_1">最新净值：</td><td class="td_2">' + fNavUnit + '</td><td class="td_3">日涨幅：</td><td class="td_4 b'+page+i+'">' + gracet + '</td></tr>' + '<tr><td class="td_1">累计三月：</td><td class="td_2 b'+page+i+'">' + Quarter_ser + '</td><td class="td_3">累计一年：</td><td class="td_4">' + Year_ser + '</td></tr>' + '</table>' + '<div class="gm_detail"></div>' + '</div>' + '</li>';

					$(".gm_list_data").append(gm_list_data);
                    var value3 = m.gracet.substring(0,m.gracet.length-1); //取值 转数字
                    //根据正负判断颜色
                    if(value3>0){
                        $(".td_4.b"+page+i).css('color','#ff3b2f');
                    }else if(value3<0){
                        $(".td_4.b"+page+i).css('color','#03d908');
                    }else {
                        $(".td_4.b"+page+i).css('color','#c6c6c6');
                    }
                    var value4 = m.fAvgReturnQuarter.substring(0,m.fAvgReturnQuarter.length-1);
                    if(value4>0){
                        $(".td_2.b"+page+i).css('color','#ff3b2f');
                    }else if(value4<0){
                        $(".td_2.b"+page+i).css('color','#03d908');
                    }else{
                        $(".td_2.b"+page+i).css('color','#c6c6c6');
                    }
					buyAddDetail();
				});
//				goNextPage();
				var ser_length = $(".gm_list_data li").length;
				if (ser_length == 0) {
					$(".search_prompt").show();
				} else {
					$(".search_prompt").hide();
				}

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误！");
		}
	})
}

//查询种类
function gongmuType(investType, page) {
	hideloading();
	showLoading();
	//	公募基金
	$.ajax({
		type: "post",
		url: mainUrl + "MutualFundListManacheQueryAction",
		data: {
			page: page,
			pageRecorders: 20,
			investType: investType,
            
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
//				$(".gm_list_data").html("");
				$(data.data).each(function (i, m) {
					var fundid = m.fInfoWindcode + "";
					//fundid = m.fInfoWindcode.substring(0, 6);
					var fNavUnit = Math.round(m.fNavUnit * 10000) / 10000;
					console.log(fNavUnit);
					var gracet = m.gracet;
					var Quarter_ser = Math.round(m.fAvgReturnQuarter * 100) / 100 + "%";
					var Year_ser = Math.round(m.fAvgReturnYear * 100) / 100 + "%"

					if (m.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(m.fNavUnit * 10000) / 10000;
					};
					if (m.gracet == undefined) {
						gracet = "-";
					} else {
						gracet = m.gracet;
					};
					if (m.fAvgReturnQuarter == undefined) {
						Quarter_ser = "-";
					} else {
						Quarter_ser = Math.round(m.fAvgReturnQuarter * 100) / 100 + "%";
					};
					if (m.fAvgReturnYear == undefined) {
						Year_ser = "-";
					} else {
						Year_ser = Math.round(m.fAvgReturnYear * 100) / 100 + "%"
					};

					var gm_list_data = '<li class="gm_list">' + '<div class="gm_header">' + '<div class="table_header"><span class="deal_name">' + m.fundName + '</span><span class="deal_code">' + fundid + '</span><a class="go-add" data-id="' + fundid + '" data-name="' + m.fundName + '" data-value="' + fNavUnit + '"><span class="add_collect add_hide">模拟购买</span></a><a class="go-buy" data-id="' + fundid + '"  data-name="' + m.fundName + '" data-type="'+m.fInfoFirstInvestType+'"><span>购买</span></a></div>' + '</div>' + '<div class="table_data_list">' + '<table class="table_data">' + '<tr><td class="td_1">最新净值：</td><td class="td_2">' + fNavUnit + '</td><td class="td_3">日涨幅：</td><td class="td_4 b'+page+i+'">' + gracet + '</td></tr>' + '<tr><td class="td_1">累计三月：</td><td class="td_2 b'+page+i+'">' + Quarter_ser + '</td><td class="td_3">累计一年：</td><td class="td_4">' + Year_ser + '</td></tr>' + '</table>' + '<div class="gm_detail"></div>' + '</div>' + '</li>';

					$(".gm_list_data").append(gm_list_data);
                    var value3 = m.gracet.substring(0,m.gracet.length-1); //取值 转数字
                    //根据正负判断颜色
                    if(value3>0){
                        $(".td_4.b"+page+i).css('color','#ff3b2f');
                    }else if(value3<0){
                        $(".td_4.b"+page+i).css('color','#03d908');
                    }else {
                        $(".td_4.b"+page+i).css('color','#c6c6c6');
                    }
                    var value4 = m.fAvgReturnQuarter.substring(0,m.fAvgReturnQuarter.length-1);
                    if(value4>0){
                        $(".td_2.b"+page+i).css('color','#ff3b2f');
                    }else if(value4<0){
                        $(".td_2.b"+page+i).css('color','#03d908');
                    }else{
                        $(".td_2.b"+page+i).css('color','#c6c6c6');
                    }
					buyAddDetail();
				});
//				goNextPage();
				var ser_length = $(".gm_list_data li").length;
				if (ser_length == 0) {
					$(".search_prompt").show();
				} else {
					$(".search_prompt").hide();
				}

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误！");
		}
	})
}

//查询公司名称  基金种类
function gongmuType3(managementComp, investType, page) {
	hideloading();
	showLoading();
	//	公募基金
	$.ajax({
		type: "post",
		url: mainUrl + "MutualFundListManacheQueryAction",
		data: {
			page: page,
			pageRecorders: 20,
			investType: investType,
            managementComp: managementComp
            
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
//				$(".gm_list_data").html("");
				$(data.data).each(function (i, m) {
					var fundid = m.fInfoWindcode + "";
					//fundid = m.fInfoWindcode.substring(0, 6);
					var fNavUnit = Math.round(m.fNavUnit * 10000) / 10000;
					console.log(fNavUnit);
					var gracet = m.gracet;
					var Quarter_ser = Math.round(m.fAvgReturnQuarter * 100) / 100 + "%";
					var Year_ser = Math.round(m.fAvgReturnYear * 100) / 100 + "%"

					if (m.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(m.fNavUnit * 10000) / 10000;
					};
					if (m.gracet == undefined) {
						gracet = "-";
					} else {
						gracet = m.gracet;
					};
					if (m.fAvgReturnQuarter == undefined) {
						Quarter_ser = "-";
					} else {
						Quarter_ser = Math.round(m.fAvgReturnQuarter * 100) / 100 + "%";
					};
					if (m.fAvgReturnYear == undefined) {
						Year_ser = "-";
					} else {
						Year_ser = Math.round(m.fAvgReturnYear * 100) / 100 + "%"
					};

					var gm_list_data = '<li class="gm_list">' + '<div class="gm_header">' + '<div class="table_header"><span class="deal_name">' + m.fundName + '</span><span class="deal_code">' + fundid + '</span><a class="go-add" data-id="' + fundid + '" data-name="' + m.fundName + '" data-value="' + fNavUnit + '"><span class="add_collect add_hide">模拟购买</span></a><a class="go-buy" data-id="' + fundid + '"  data-name="' + m.fundName + '" data-type="'+m.fInfoFirstInvestType+'"><span>购买</span></a></div>' + '</div>' + '<div class="table_data_list">' + '<table class="table_data">' + '<tr><td class="td_1">最新净值：</td><td class="td_2">' + fNavUnit + '</td><td class="td_3">日涨幅：</td><td class="td_4 b'+page+i+'">' + gracet + '</td></tr>' + '<tr><td class="td_1">累计三月：</td><td class="td_2 b'+page+i+'">' + Quarter_ser + '</td><td class="td_3">累计一年：</td><td class="td_4">' + Year_ser + '</td></tr>' + '</table>' + '<div class="gm_detail"></div>' + '</div>' + '</li>';

					$(".gm_list_data").append(gm_list_data);
                    var value3 = m.gracet.substring(0,m.gracet.length-1); //取值 转数字
                    //根据正负判断颜色
                    if(value3>0){
                        $(".td_4.b"+page+i).css('color','#ff3b2f');
                    }else if(value3<0){
                        $(".td_4.b"+page+i).css('color','#03d908');
                    }else {
                        $(".td_4.b"+page+i).css('color','#c6c6c6');
                    }
                    var value4 = m.fAvgReturnQuarter.substring(0,m.fAvgReturnQuarter.length-1);
                    if(value4>0){
                        $(".td_2.b"+page+i).css('color','#ff3b2f');
                    }else if(value4<0){
                        $(".td_2.b"+page+i).css('color','#03d908');
                    }else{
                        $(".td_2.b"+page+i).css('color','#c6c6c6');
                    }
					buyAddDetail();
				});
//				goNextPage();
				var ser_length = $(".gm_list_data li").length;
				if (ser_length == 0) {
					$(".search_prompt").show();
				} else {
					$(".search_prompt").hide();
				}

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误！");
		}
	})
}


//购买 加自选 详情
function buyAddDetail() {
	//基金详情
	$(".table_data_list").click(function () {
		var fundid = $(this).parent().find(".go-buy").attr("data-id");
		var fundname = $(this).parent().find(".go-buy").attr("data-name");
		var fundtype = $(this).parent().find(".go-buy").attr("data-type");
		window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname+"&type="+fundtype;
		console.log("s");
	});

	//点击购买
	$("a.go-buy").unbind("click").click(function (e) {
		e.stopPropagation();
		console.log("ss");
		var fundname = $(this).attr("data-name");
		var fundid = $(this).attr("data-id");
		fundid = fundid.substring(0, 6);
		buyStep1(fundid, fundname);
	});
	/*//加自选
	$("a.go-add").unbind("click").click(function (e) {
		e.stopPropagation();
		console.log("加自选");
		var fundname = $(this).attr("data-name");
		var fundid = $(this).attr("data-id");
		var fundvalue = $(this).attr("data-value");
		addFund(fundid, fundname, fundvalue);
	});*/
	//模拟购买
	$("a.go-add").unbind("click").click(function (e) {
		e.stopPropagation();
		console.log("加自选");
		var fundname = $(this).attr("data-name");
		var fundid = $(this).attr("data-id");
		var fundvalue = $(this).attr("data-value");
		Simulation(fundid)
	});
}


//滚动到底时加载数据
function goNextPage(){
	$(window).scroll(function(){
		var o = $("body");
		if(o!=null && o.length !=0){
			//获取网页的完整高度(fix)
			var height= $(document).height();
			//获取浏览器高度(fix)
			var clientHeight =$(window).height();

			//获取网页滚过的高度(dynamic)
			var top= window.pageYOffset || (document.compatMode == 'CSS1Compat' ? document.documentElement.scrollTop :	document.body.scrollTop);

			//当 top+clientHeight = scrollHeight的时候就说明到底儿了
			if((height > clientHeight)&&(top>=(parseInt(height)-clientHeight))){
//				alert("go to next page");
				
					loadNum++;//刷新跳页
					if(loadNum==2){
						
					}
                    var val1 = $("#type1 option:selected").val();
                    var val2 = $("#type2 option:selected").val();
                    var text1 = $("#type1 option:selected").text();
                    var text2 = $("#type2 option:selected").text();
                    if(val1 == 0 && val2 == 0){
                        getGongmu(1);
                    }else if(val1 == 0 && val2 !== 0){
                        gongmuType(text2,loadNum);
                    }else if(val1 !== 0 && val2 == 0){
                        gongmuType2(text1,loadNum);
                    }else if(val1 !== 0 && val2 !== 0){
                        gongmuType3(text1,text2,loadNum);
                    }
					/*var flag = $(".gm_type").attr("data_index");
//				   alert(flag)
					if (flag == 0) {
						getGongmu(loadNum);
					} else if (flag == 1) {
						gongmuType("货币市场型",loadNum);
					} else if (flag == 2) {
						gongmuType("混合型",loadNum);
					} else if (flag == 3) {
						gongmuType("债券型",loadNum);
					} else if (flag == 4) {
						gongmuType("股票型",loadNum);
					} else if (flag == 5) {
						gongmuType("QDII",loadNum);
					} else if (flag == 6) {
						gongmuType("指数型",loadNum);
					} else if (flag == 7) {
						gongmuType("其他",loadNum);
					}*/
			}
		}
	})
}
//页面底部上啦刷新事件 

//function load() {
//
//	document.addEventListener('touchstart', touch, false);
//	document.addEventListener('touchmove', touch, false);
//	document.addEventListener('touchend', touch, false);
//	var starx;
//	var stary; //鼠标移动开始前的纵轴位置；
//	var endy; //鼠标移动后纵轴位置；
//	var endx;
//
//
//	function touch(event) {
//		var event = event || window.event;
//
//		if (event.type == "touchstart") {
//			stary = event.touches[0].clientY;
//			//            console.log(stary);
//		}
//
//		if (event.type == "touchend") {
//			stary = stary;
//			endy = event.changedTouches[0].clientY;
//			//获取网页的完整高度(fix)
//			var height = $(document).height();
//			//获取浏览器高度(fix)
//			var clientHeight = $(window).height();
//			//获取网页滚过的高度(dynamic)
//			var top = window.pageYOffset || (document.compatMode == 'CSS1Compat' ? document.documentElement.scrollTop : document.body.scrollTop);
//			//当 top+clientHeight = scrollHeight的时候就说明到底儿了
//			//当文档高度不满一屏幕时不应该加载；
//			if ((height > clientHeight) && (top >= (parseInt(height) - clientHeight))) {
//				if (stary - endy > 0) {
//					//                                        alert("加载新数据");
//					loadNum++;
//					if(loadNum==2){
//						
//					}
////					alert(loadNum);
//					var flag = $(".gm_type").attr("data_index");
//					if (flag == 0) {
//						getGongmu(loadNum);
//					} else if (flag == 1) {
//						gongmuType("货币市场型",loadNum);
//					} else if (flag == 2) {
//						gongmuType("混合型",loadNum);
//					} else if (flag == 3) {
//						gongmuType("债券型",loadNum);
//					} else if (flag == 4) {
//						gongmuType("股票型",loadNum);
//					} else if (flag == 5) {
//						gongmuType("QDII",loadNum);
//					} else if (flag == 6) {
//						gongmuType("指数型",loadNum);
//					} else if (flag == 7) {
//						gongmuType("其他",loadNum);
//					}
//
//				}
//
//			}
//		}
//	}
//}
//window.addEventListener('load', load, false);
