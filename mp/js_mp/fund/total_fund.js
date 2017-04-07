var loadNum = 1;

$(function () {
	getGongmu(1);
	goNextPage();
    
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
        $(".viewport").html("");
        getGongmu(1);
    }else if(val1 == 0 && val2 !== 0){
        $(".viewport").html("");
        gongmuType(text2,loadNum);
    }else if(val1 !== 0 && val2 == 0){
        $(".viewport").html("");
        gongmuType2(text1,loadNum);
    }else if(val1 !== 0 && val2 !== 0){
        $(".viewport").html("");
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
			console.log(data.data);
			if (data.retcode == 0000) {
				$(data.data).each(function (i, n) {
					var strHtml = "";
					var fundId = n.fInfoWindcode + "";
					var fundName = n.fundName;
					var fNavUnit = n.fNavUnit;
					var fundTypeGoods = n.fInfoFirstInvestType;
					var fAvgreturnYear = parseFloat(n.fAvgreturnYear);
					if (n.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(n.fNavUnit * 10000) / 10000;
					};
					if (n.fInfoFirstInvestType == undefined) {
						fAvgreturnYear = "-";
					} else {
						fAvgreturnYear = Math.round(n.fNavUnit * 10000) / 10000;
					};
					var Year;
					if (n.fAvgReturnThisYear == undefined) {
						Year = "-";
					} else {
						Year = Number(n.fAvgReturnThisYear);
						Year = Math.round(Year * 100) / 100 + "%";
					};

					var value1 = n.fAvgReturnThisYear; //取值 转数字
					console.log(value1);
					var className="font_hongse";
					if(value1>0){
						className="font_hongse";
					}else if(value1<0){
						className="font_lv";
					}else{
						className="font_heise";
					}

					
					
					strHtml = "<ul class='jijinlist_table mtopd'>";
                    strHtml += "<li class='bottomline tj_li'>";
                    strHtml += "<h2 class='jijinlist_table_t'>";
                    strHtml += "<em>"+fundName+"</em>";
                    strHtml += "<i>（"+fundId.substring(0, 6)+"）</i></h2>";
                    strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                    strHtml += "<span class='t_span'>模拟购买</span>";
                    strHtml += "<i class='t_san mleft5'></i></a></li>";
                    strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='tj_li1'><a class='rightline'>";
                    strHtml += "<span class='datitle font_heise'>"+Number(fNavUnit).toFixed(4)+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>最新净值</b></a></li><li class='tj_li2'>";
                    strHtml += "<a class='rightline' profit='"+Year+"'><span class='datitle "+className+"'>"+Year+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>近一年收益率</b></a></li>";
                    strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                    strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' data-fundTypeGoods='"+fundTypeGoods+"' class='btn_home btn_lanse tj_buy'>立即购买</button>";
                    strHtml += "<span class='xxiaotitle font_huise mtop'>申购费率</span>";
                    strHtml += "<b class='xxiaotitle font_lanse'>"+fanhuiz(fundTypeGoods)+"</b></a></li></ul></div></ul>";
                    $(".tot_content").append(strHtml);



                    /*var value1 = n.gracet.substring(0,n.gracet.length-1); *///取值 转数字
                  //暂无数据
    				var ser_length = $(".tot_content ul").length;
    				if (ser_length == 0) {
    					$(".search_prompt").show();
    				} else {
    					$(".search_prompt").hide();
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
			console.log(data.data);
			if (data.retcode == 0000) {
//				$(".gm_list_data").html("");
				$(data.data).each(function (i, n) {
					var strHtml = "";
					var fundId = n.fInfoWindcode + "";
					var fundName = n.fundName;
					var fNavUnit = n.fNavUnit;
					var fundTypeGoods = n.fInfoFirstInvestType;
					var fAvgreturnYear = parseFloat(n.fAvgreturnYear);
					if (n.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(n.fNavUnit * 10000) / 10000;
					};
					if (n.fInfoFirstInvestType == undefined) {
						fAvgreturnYear = "-";
					} else {
						fAvgreturnYear = Math.round(n.fNavUnit * 10000) / 10000;
					};
					var Year_ser = Math.round(n.fAvgReturnYear * 100) / 100 + "%";
					if (n.fAvgReturnYear == undefined) {
						Year_ser = "-";
					} else {
						Year_ser = Math.round(n.fAvgReturnYear * 100) / 100 + "%"
					};

					var value2 = n.fAvgReturnYear; //取值 转数字
					var className2="font_hongse";
					if(value2>0){
						className2="font_hongse";
					}else if(value2<0){
						className2="font_lv";
					}else{
						className2="font_heise";
					}
					
					strHtml = "<ul class='jijinlist_table mtopd'>";
                    strHtml += "<li class='bottomline tj_li'>";
                    strHtml += "<h2 class='jijinlist_table_t'>";
                    strHtml += "<em>"+fundName+"</em>";
                    strHtml += "<i>（"+fundId.substring(0, 6)+"）</i></h2>";
                    strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                    strHtml += "<span class='t_span'>模拟购买</span>";
                    strHtml += "<i class='t_san mleft5'></i></a></li>";
                    strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='tj_li1'><a class='rightline'>";
                    strHtml += "<span class='datitle font_heise'>"+Number(fNavUnit).toFixed(4)+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>最新净值</b></a></li><li class='tj_li2'>";
                    strHtml += "<a class='rightline' profit='"+Year_ser+"'><span class='datitle "+className2+"'>"+Year_ser+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>近一年收益率</b></a></li>";
                    strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                    strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' data-fundTypeGoods='"+fundTypeGoods+"' class='btn_home btn_lanse tj_buy'>立即购买</button>";
                    strHtml += "<span class='xxiaotitle font_huise mtop'>申购费率</span>";
                    strHtml += "<b class='xxiaotitle font_lanse'>"+fanhuiz(fundTypeGoods)+"</b></a></li></ul></div></ul>";
                    $(".tot_content").append(strHtml);
                    buyAddDetail();
				});
//				goNextPage();
				//暂无数据
				var ser_length = $(".tot_content ul").length;
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
			console.log(data.data);
			if (data.retcode == 0000) {
				$(data.data).each(function (i, n) {
					var strHtml = "";
					var fundId = n.fInfoWindcode + "";
					var fundName = n.fundName;
					var fNavUnit = n.fNavUnit;
					var fundTypeGoods = n.fInfoFirstInvestType;
					var fAvgreturnYear = parseFloat(n.fAvgreturnYear);
					if (n.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(n.fNavUnit * 10000) / 10000;
					};
					if (n.fInfoFirstInvestType == undefined) {
						fAvgreturnYear = "-";
					} else {
						fAvgreturnYear = Math.round(n.fNavUnit * 10000) / 10000;
					};
					var Year_ser;
					if (n.fAvgReturnYear == undefined) {
						Year_ser = "-";
					} else {
						Year_ser = Math.round(n.fAvgReturnYear * 100) / 100 + "%"
					};
					var value3 = n.fAvgReturnYear; //取值 转数字
					var className3="font_hongse";
					if(value3>0){
						className3="font_hongse";
					}else if(value3<0){
						className3="font_lv";
					}else{
						className3="font_heise";
					}

					strHtml = "<ul class='jijinlist_table mtopd'>";
                    strHtml += "<li class='bottomline tj_li'>";
                    strHtml += "<h2 class='jijinlist_table_t'>";
                    strHtml += "<em>"+fundName+"</em>";
                    strHtml += "<i>（"+fundId.substring(0, 6)+"）</i></h2>";
                    strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                    strHtml += "<span class='t_span'>模拟购买</span>";
                    strHtml += "<i class='t_san mleft5'></i></a></li>";
                    strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='tj_li1'><a class='rightline'>";
                    strHtml += "<span class='datitle font_heise'>"+Number(fNavUnit).toFixed(4)+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>最新净值</b></a></li><li class='tj_li2'>";
                    strHtml += "<a class='rightline' profit='"+Year_ser+"'><span class='datitle "+className3+"'>"+Year_ser+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>近一年收益率</b></a></li>";
                    strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                    strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' data-fundTypeGoods='"+fundTypeGoods+"' class='btn_home btn_lanse tj_buy'>立即购买</button>";
                    strHtml += "<span class='xxiaotitle font_huise mtop'>申购费率</span>";
                    strHtml += "<b class='xxiaotitle font_lanse'>"+fanhuiz(fundTypeGoods)+"</b></a></li></ul></div></ul>";
                    $(".tot_content").append(strHtml);
					buyAddDetail();
				});
//				goNextPage();
				//暂无数据
				var ser_length = $(".tot_content ul").length;
				console.log(ser_length);
				if (ser_length == 0||ser_length=="0") {
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
			console.log(data.data);
			if (data.retcode == 0000) {
//				$(".gm_list_data").html("");
				$(data.data).each(function (i, n) {
					var strHtml = "";
					var fundId = n.fInfoWindcode + "";
					var fundName = n.fundName;
					var fNavUnit = n.fNavUnit;
					var fundTypeGoods = n.fInfoFirstInvestType;
					var fAvgreturnYear = parseFloat(n.fAvgreturnYear);
					if (n.fNavUnit == undefined) {
						fNavUnit = "-";
					} else {
						fNavUnit = Math.round(n.fNavUnit * 10000) / 10000;
					};
					if (n.fInfoFirstInvestType == undefined) {
						fAvgreturnYear = "-";
					} else {
						fAvgreturnYear = Math.round(n.fNavUnit * 10000) / 10000;
					};
					var Year_ser;
					if (n.fAvgReturnYear == undefined) {
						Year_ser = "-";
					} else {
						Year_ser = Math.round(n.fAvgReturnYear * 100) / 100 + "%"
					};
					var value4 = n.fAvgReturnYear; //取值 转数字
					var className4="font_hongse";
					if(value4>0){
						className4="font_hongse";
					}else if(value4<0){
						className4="font_lv";
					}else{
						className4="font_heise";
					}
					strHtml = "<ul class='jijinlist_table mtopd'>";
                    strHtml += "<li class='bottomline tj_li'>";
                    strHtml += "<h2 class='jijinlist_table_t'>";
                    strHtml += "<em>"+fundName+"</em>";
                    strHtml += "<i>（"+fundId.substring(0, 6)+"）</i></h2>";
                    strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                    strHtml += "<span class='t_span'>模拟购买</span>";
                    strHtml += "<i class='t_san mleft5'></i></a></li>";
                    strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='tj_li1'><a class='rightline'>";
                    strHtml += "<span class='datitle font_heise'>"+Number(fNavUnit).toFixed(4)+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>最新净值</b></a></li><li class='tj_li2'>";
                    strHtml += "<a class='rightline' profit='"+Year_ser+"'><span class='datitle "+className4+"'>"+Year_ser+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>近一年收益率</b></a></li>";
                    strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                    strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' data-fundTypeGoods='"+fundTypeGoods+"' class='btn_home btn_lanse tj_buy'>立即购买</button>";
                    strHtml += "<span class='xxiaotitle font_huise mtop'>申购费率</span>";
                    strHtml += "<b class='xxiaotitle font_lanse'>"+fanhuiz(fundTypeGoods)+"</b></a></li></ul></div></ul>";
                    $(".viewport").append(strHtml);
					buyAddDetail();
				});
//				goNextPage();
				//暂无数据
				var ser_length = $(".viewport ul").length;
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


//购买 模拟购买 详情
function buyAddDetail() {
	//基金详情
	$(".tj_li").on("click",function(){
        var ordername = $(this).parent().find(".jijinlist_table_content").find(".tj_buy").attr("data-name");
        var fundId = $(this).parent().find(".jijinlist_table_content").find(".tj_buy").attr("data-id");
        var fundTypeGoods = $(this).parent().find(".jijinlist_table_content").find(".tj_buy").attr("data-fundTypeGoods");
        window.location.href = "../fund/fund_detail.html?fundid=" + fundId + "&fundname=" + ordername + "&type=" + fundTypeGoods;
    })
    $(".tj_li1").on("click",function(){
    	var ordername = $(this).parent().find(".tj_buy").attr("data-name");
        var fundId = $(this).parent().find(".tj_buy").attr("data-id");
        var fundTypeGoods = $(this).parent().find(".tj_buy").attr("data-fundTypeGoods");
        window.location.href = "../fund/fund_detail.html?fundid=" + fundId + "&fundname=" + ordername + "&type=" + fundTypeGoods;
    })
    $(".tj_li2").on("click",function(){
    	var ordername = $(this).parent().find(".tj_buy").attr("data-name");
        var fundId = $(this).parent().find(".tj_buy").attr("data-id");
        var fundTypeGoods = $(this).parent().find(".tj_buy").attr("data-fundTypeGoods");
        window.location.href = "../fund/fund_detail.html?fundid=" + fundId + "&fundname=" + ordername + "&type=" + fundTypeGoods;
    })
	
	
	//立即购买
	/*$(".normal2_list[data-expand=" + stockcode + "]").find(".funs_list").append(stringhtml);*/
	$("button.tj_buy").unbind("click").click(function (e) {
		e.stopPropagation();
		console.log("购买");
		var fundname = $(this).attr("data-name");
		var fundid = $(this).attr("data-id");
		fundid=fundid.substring(0, 6);
		buyStep1(fundid, fundname);
	});
	//模拟购买
	$("a.more_c").unbind("click").click(function (e) {
		e.stopPropagation();
		console.log("模拟购买");
		var fundname = $(this).attr("data-name");
		var fundid = $(this).attr("data-id");
		var fundvalue = $(this).attr("data-value");
		Simulation(fundid);
	})
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
                        getGongmu(loadNum);
                    }else if(val1 == 0 && val2 !== 0){
                        gongmuType(text2,loadNum);
                    }else if(val1 !== 0 && val2 == 0){
                        gongmuType2(text1,loadNum);
                    }else if(val1 !== 0 && val2 !== 0){
                        gongmuType3(text1,text2,loadNum);
                    }
			}
		}
	})
}


function fanhuiz(val){
	if(val=="货币型"||val=="货币市场型"){
		return "免费";
	}else{
		return "最低4折";
	}
}