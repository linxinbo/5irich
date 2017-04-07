$(function(){
    groupDetail();
    $(".switch_bar ul li").click(function(){
        $(".switch_bar ul li").removeClass("select");
        $(this).addClass("select");
        var flag = $(this).index();
        if(flag == 0){
            $(".trend_show").show();
            $(".group_pz_show").hide();
            $(".main_info_show").hide();
            $(".history_zz_show").hide();
        }else if(flag == 1){
            $(".trend_show").hide();
            $(".group_pz_show").show();
            $(".main_info_show").hide();
            $(".history_zz_show").hide();
            groupConfig();
        }else if(flag == 2){
            $(".trend_show").hide();
            $(".group_pz_show").hide();
            $(".main_info_show").show();
            $(".history_zz_show").hide();
             groupDetail();
        }else if(flag == 3){
            $(".trend_show").hide();
            $(".group_pz_show").hide();
            $(".main_info_show").hide();
            $(".history_zz_show").show();
            history();
        }
    })
})

function groupDetail(){
    var args = new getArgs();
    var fundid = args.fundid;
    var fundname = args.fundname;
    var profit = args.profit;
    var profit1 = args.profit + "%";
    hideloading();
	showLoading();
	//组合基金详情
	$.ajax({
		type: "post",
		url: mainUrl + "WebQueryGroupDetialAction",
		data: {
			groupId: fundid
		},
		dataType: "json",
		success: function (data) {
            var priceDt = data.data.priceDt.substring(0,4)+"-"+data.data.priceDt.substring(4,6)+"-"+data.data.priceDt.substring(6,data.data.priceDt.length);
            console.log(priceDt);
            var fdGroupMin = data.data.fdGroupMin.substring(0,data.data.fdGroupMin.length-3)
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
                $(".group_detail").html("");
                var group_detail = '<div class="group_header">'
                                        +'<div class="table_header"><span class="group_name">'+data.data.fdGroupName+'</span><span class="group_ID">（'+fundid+'）</span></div>'
                                    +'</div>'
                                    +'<div class="table_data_list">'
                                        +'<table class="table_data">'
                                            +'<tr><td class="td_1">单位净值('+priceDt+')</td><td class="td_2">日涨幅</td><td class="td_8">成立以来收益</td></tr>'
                                            +'<tr><td class="td_1 i">'+data.data.fdGroupValue+'</td><td class="td_2 i">'+data.data.amountOfIncreaseAndDecrease+'</td><td class="td_8 i">'+profit1+'</td></tr>'
                                        +'</table>'
                                    +'</div>'
                $(".group_detail").append(group_detail);
                var value1 = data.data.fdGroupValue; //取值 转数字
                //根据正负判断颜色
                if(value1>0){
                    $(".td_1.i").css('color','#ef3d3e');
                }else if(value1<0){
                    $(".td_1.i").css('color','#14a945');
                }else{
                    $(".td_1.i").css('color','#323232');
                }
                var value2 = data.data.amountOfIncreaseAndDecrease; //取值 转数字              
//				alert(typeof(value2));
				var index = value2.indexOf("-");
                //根据正负判断颜色
                if(index>0){
                    $(".td_2.i").css('color','#ef3d3e');
                }else if(index<0){
                    $(".td_2.i").css('color','#14a945');
                }else{
                    $(".td_2.i").css('color','#323232');
                }
                var value3 = profit;
                if(value3>0){
                    $(".td_8.i").css('color','#ef3d3e');
                }else if(value3<0){
                    $(".td_8.i").css('color','#14a945');
                }else{
                    $(".td_8.i").css('color','#323232');
                }
                $(".main_info_show").html("");
                var main_info_show = '<div>'
                                        +'<table>'
                                            +'<tr><td class="td_3">组合名称</td><td class="td_4">'+data.data.fdGroupName+'</td></tr>'
                                            +'<tr><td class="td_3">基金组合代码</td><td class="td_4">'+fundid+'</td></tr>'
                                            +'<tr><td class="td_3">申购起点</td><td class="td_4">'+fdGroupMin+'元</td></tr>'
                                            +'<tr><td class="td_3">购买方式</td><td class="td_4">'+data.data.fdBuyDesc+'</td></tr>'
                                            +'<tr><td class="td_3">购买费率</td><td class="td_4">'+data.data.fdGroupFee+'</td></tr>'
                                            +'<tr class="noline"><td class="td_3">业绩基准</td><td class="td_4">'+data.data.fdGroupBenchMark+'</td></tr>'
                                        +'</table>'
                                    +'</div>'
                $(".main_info_show").append(main_info_show);
                buyGroup();
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

function history(){
    var str = $(".group_ID").html();
    var groupId = str.substring(1,7);
    var enddate = new Date().Format("yyyyMMdd");
    hideloading();
	showLoading();
	//组合基金历史净值
	$.ajax({
		type: "post",
		url: mainUrl + "WebHistoryNavQueryAction",
		data: {
			groupId: groupId,
            enddate: enddate
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
                $(".history_data table").html("");
                var table_head = '<tr><th>净值日期</th><th>组合净值</th><th>涨跌幅</th></tr>'
                $(".history_data table").append(table_head);
				$(data.data).each(function(i,n){
                    var priceDate = n.priceDate.substring(0,4)+"-"+n.priceDate.substring(4,6)+"-"+n.priceDate.substring(6,n.priceDate.length);
                    var history_data = '<tr><td class="td_5">'+priceDate+'</td><td class="td_6">'+n.fdGroupUnitValue+'</td><td class="td_7 '+i+'" value="'+n.gracet+'">'+n.gracet+'%</td></tr>';
                    $(".history_data table").append(history_data);
                    var value = n.gracet; //取值 转数字
                    //根据正负判断颜色
                    if(value>0){
                        $(".td_7."+i).parent().css('color','#ef3d3e');
                    }else if(value<0){
                        $(".td_7."+i).parent().css('color','#14a945');
                    }else{
                        $(".td_7."+i).parent().css('color','#323232');
                    }
                });
                $(".history_data table tr:gt(8)").hide();
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

function goHistory(){
    var str = $(".group_ID").html();
    var groupId = str.substring(1,7);
    window.location.href = "history_data.html?groupId="+groupId;
}

function groupConfig(){
    var str = $(".group_ID").html();
    var groupId = str.substring(1,7);
    hideloading();
	showLoading();
	//组合基金历史净值
	$.ajax({
		type: "post",
		url: mainUrl + "WebProportionalQueryAction",
		data: {
			groupId: groupId
		},
		dataType: "json",
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
                $(".pie_right table").html("");
                $(".pie_list ul").html("");
                var first_list = '<li>'
                                        +'<div><span class="list_title">组合点评</span></div>'
                                        +'<p>'+data.data[0].fdInfo+'，通过基金经理的积极配置，力图给投资者带来超额回报，本基金组合偏向成长股票型。</p>'
                                    +'</li>';
                $(".pie_list ul").append(first_list);
				$(data.data).each(function(i,n){
					pie.doughnutData[i].value=n.fdProportional;
                    var pie_right = '<tr><td><span class="circle color_'+i+'"></span></td><td>'+n.fundName+'</td><td>'+n.fdProportional+'%</td></tr>';
                    /*$(".color_"+n).css({'width':'10px','margin-right':'5px','border-radius':'5px'});*/
                    $(".pie_right table").append(pie_right);
                    //var fundId = n.fundId.substr(0,6);
                    var fundId = n.fundId;//带有基金后缀
                    var pie_list = '<li>'
                                        +'<div><span class="list_title" data-id="'+fundId+'" data-name="'+n.fundName+'">'+n.fundName+'（'+fundId+'）</span><span class="list_detail">详情></span></div>'
                                        +'<p>'+n.fdGroupInfo+'</p>'
                                    +'</li>';
                    $(".pie_list ul").append(pie_list);
                    configDetail();
                });
				canvasPie();
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

function configDetail() {
	//基金详情
	$(".list_detail").click(function () {
		var fundid = $(this).parent().find(".list_title").attr("data-id");
		var fundname = $(this).parent().find(".list_title").attr("data-name");
		window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
		console.log("s");
	})
}


function buyGroup() {
    var args = new getArgs();
    var fundid = args.fundid;
    var fundname = args.fundname;
	//点击购买
	$("a.go-buy").unbind("click").click(function (e) {
		e.stopPropagation();
		console.log("ss");
//        showAlert("暂不支持购买，敬请期待");
		groupBuyStep1(fundid, fundname);
	});
}