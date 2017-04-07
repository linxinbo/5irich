$(function(){
    groupDetail();


    $(".switch_bar1 ul li").click(function(){
        $(".switch_bar1 ul li").removeClass("select");
        $(this).addClass("select");
        var flag = $(this).index();
        if(flag == 0){
            $(".trend_show").show();
            $(".group_pz_show").hide();
            $(".main_info_show").hide();
            $(".history_zz_show").hide();
            $(".main_info_show_gg").hide();
        }else if(flag == 1){
            $(".trend_show").hide();
            $(".group_pz_show").show();
            $(".main_info_show").hide();
            $(".history_zz_show").hide();
            $(".main_info_show_gg").hide();
            groupConfig();
        }else if(flag == 2){
            $(".trend_show").hide();
            $(".group_pz_show").hide();
            $(".main_info_show").show();
            $(".main_info_show_gg").show();
            $(".history_zz_show").hide();
             groupDetail();
        }else if(flag == 3){
            $(".trend_show").hide();
            $(".group_pz_show").hide();
            $(".main_info_show").hide();
            $(".history_zz_show").show();
            $(".main_info_show_gg").hide();
            historyxx();
        }
    })
})
//基金公告方法
function group_gg(groupId){
    showLoading();
    //组合基金历史净值
    $.ajax({
        type: "post",
        url: mainUrl + "WebAnnouncementQueryAction",
        data: {
            groupId: groupId
        },
        dataType: "json",
        success: function (data) {
            hideloading();
            console.log(data);
            if (data.retcode == 0000) {
                $(".main_info_show_gg").html("");
                $(data.data).each(function(i,n){
                    var history_data55 = '<a style="display: block;line-height: 2.8em;border-bottom: 1px solid #dddddd;overflow: hidden;"><span style="float: left;">'+ n.fdGroupAction +'</span><b style="float: right;">'+ n.annDate +'</b></a><p style="padding: 1em;line-height: 1.5;">'+n.actionText+'</p>';
                    $(".main_info_show_gg").append(history_data55);

                });
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
            console.log(data);
            var priceDt = data.data.priceDt.substring(0,4)+"-"+data.data.priceDt.substring(4,6)+"-"+data.data.priceDt.substring(6,data.data.priceDt.length);
            console.log("priceDT----"+priceDt);
            var fdGroupMin = data.data.fdGroupMin.substring(0,data.data.fdGroupMin.length-3)
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
                $(".group_detail").html("");
                var fdGroupName=data.data.fdGroupName+"("+fundid+")";
                $(".group_name").html("");
                $(".group_name").append(fdGroupName);

                var value1 = Number(data.data.amountOfIncreaseAndDecrease.substring(0,data.data.amountOfIncreaseAndDecrease.length-1));
                //根据正负判断颜色
                console.log(value1);

                var className="font_hongse";
                if(value1>0){
                    className="font_hongse";
                }else if(value1<0){
                    className="font_lv";
                }else{
                    className="font_baise";
                }

                var className1="font_hongse";
                if(profit>0){
                    className1="font_hongse";
                }else if(profit<0){
                    className1="font_lv";
                }else{
                    className1="font_baise";
                }

                var group_detail = '<ul class="asset_content"><li>'
                                        +'<a class="fontleft rightlien_baise">'
                                    +'<span style="font-size: 1.600em; display:block;" class="td_value_3 font_baise">'+data.data.fdGroupValue+'</span><span class="group_ID" style="display: none;">'+fundid+'</span>'
                                    +'<b style="font-size: 1.120em">单位净值</b></a></li><li>'
                                        +' <a class="fontcenter rightlien_baise"><span style="font-size: 1.600em; display:block;" class="td_value_1 '+className+'">'+data.data.amountOfIncreaseAndDecrease+'</span>'
                                            +'<b style="font-size: 1.120em">日涨跌幅(%)</b></a></li><li>'
                                            +'<a class="fontright"><span style="font-size: 1.600em; display:block;" class="td_value_2 '+className1+'">'+profit1+'</span>'
                                        +'<b style="font-size: 1.120em" class="td_value_21">成立以来收益</b></a></li></ul>'
                                    +'<div class="asset_update_time"><span style="float:right;line-height: 1.920em;" class="td_value_00">成立日期：'+data.data.createTime+'</span><span style="float:left;line-height: 1.920em;" class="td_value_0">更新日期：'+data.data.priceDt+'</span></div>'
                $(".group_detail").append(group_detail);
                $(".main_info_show").html("");
                var main_info_show = '<div style="padding: 0 1em;">'
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
                group_gg(fundid);
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

function historyxx(){
    var str = $(".group_ID").html();
    var groupId = str;
    var enddate = new Date().Format("yyyyMMdd");
    var startdate="19700101";
    hideloading();
	showLoading();
	//组合基金历史净值
	$.ajax({
		type: "post",
		url: mainUrl + "WebHistoryNavQueryAction",
		data: {
			groupId: groupId,
            enddate: enddate,
            startdate:startdate,
            page:1
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
    var groupId = str;
    window.location.href = "history_data.html?groupId="+groupId;
}

function groupConfig(){
    var str = $(".group_ID").html();
    var groupId = str;
    hideloading();
	showLoading();
    console.log(groupId);
    $(".pie_right table").html("");
    $(".pie_list ul").html("");
    $.ajax({
        type: "post",
        url: mainUrl + "WebQueryGroupDetialAction",
        data: {
            groupId: groupId
        },
        dataType: "json",
        success: function (data) {
            if(data.retcode == '0000'){
                var first_list = '<li>'
                    +'<div><span class="list_title">组合点评</span></div>'
                    +'<p>'+data.data.fdGroupPriorityDesc+'</p>'
                    +'</li>';
                $(".pie_list ul").append(first_list);
                groupconfig1(groupId);
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误！");
        }
    });

}
function groupconfig1(groupId){
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

            console.log(data);
            if (data.retcode == 0000) {

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
        buyGroupStep1(fundid, fundname);
	});
}