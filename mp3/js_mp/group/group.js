$(function () {
	groupGet();
})



function groupGet() {
	hideloading();
	showLoading();
	//组合基金
	$.ajax({
		type: 'post',
		url: mainUrl + 'recommendedWeixin', //基金推荐接口 group=2
		data: {
			fundGroup: 2
		},
		dataType: 'json',
		success: function (data) {
			console.log(data);

			if (data.retcode == 0000) {
				$(".group_list_data").html("");
				console.log(data.data);
				$(data.data).each(function (i, n) {
					var fundid = n.fundId;
					var fundName = n.fundName;
					//var profit = (n.fdReturnYearRatio*100).toFixed(2)+"%";
					var profit1 = (n.fdReturnYearRatio*100).toFixed(2);
					var showOrder=n.theDefaultDisplay;
					var start_money;
					hideloading();
					console.log(data.retcode);
					//起购金额
					$.ajax({
						type: 'post',
						url: mainUrl + 'portfolipenedQuery',
						async: false,
						data: {
							"port.combinationcode": fundid
						},
						dataType: 'json',
						success: function (data) {
							if (data.retcode == 0000) {
								start_money = data.data;
								return;
							} else {
								setErrorMsg(data.retcode, data.retmsg);
							}
						},
						error: function (data) {
							hideloading();
							showAlert("服务器错误");
						}
					});
                    var profit = (n.fdReturnYearRatio*100).toFixed(2);
					var fdReturnYearRatio = profit + "%";
					//判断分析级别和颜色和显示隐藏
					var className="zh_btn_chen";
					var classNamecn="高风险高收益";
					var classNamecn1="长期增值";
					var classNamelabel="labelidshow";
					if(showOrder=="3"){
						className="btn_outline_hongse";
						classNamecn="理性投资";
						classNamelabel="labelidshow";
						classNamecn1="业绩更优";
					}else if(showOrder=="2"){
						className="btn_outline_chengse";
						classNamecn="资产配置";
						classNamecn1="风险适中";
						classNamelabel="labelidshow";
					}else{
						className="btn_outline_huangse";
						classNamecn="稳健首选";
						classNamecn1="分散风险";
						classNamelabel="labelidshow";
					}
					var strHtml = "<ul class='jijinlist_table mtopdd'>";
					strHtml += "<li class='bottomline'>";
					strHtml += "<h2 class='jijinlist_table_t' data-id='"+fundid+"' data-name='"+fundName+"' profit='"+profit1+"'>";
					strHtml += "<em>"+fundName+"</em>"
					strHtml += "<i class='btn_fxdj btn_outline_lanse mleft "+classNamelabel+"'>"+classNamecn+"</i><i class='btn_fxdj "+className+" mleft'>"+classNamecn1+"</i></h2>";
					strHtml += "<a href='#' class='more_c'>";
					strHtml += "<span class='t_span'></span>";
					strHtml += "<i class='t_san mleft5' style='float: right;'></i></a></li>";
					strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='zuhe_left'><a class='rightline'>";
					strHtml += "<span class='datitle font_heise'>"+formatNumber_dou(start_money,",")+"元</span>";
					strHtml += "<b class='xiaotitle font_huise mtopd'>起购金额</b></a></li><li class='zuhe_center'>";
					strHtml += "<a class='rightline' profit='"+profit1+"'><span class='datitle font_hongse'>"+fdReturnYearRatio+"</span>";
					strHtml += "<b class='xiaotitle font_huise mtopd'>成立以来收益率</b></a></li>";
					strHtml += "<li class='zuhe_right textcenter'><a>";
					strHtml += "<button data-id='"+fundid+"' data-name='"+fundName+"' class='btn_home btn_outline_lanse'>立即购买</button>";
					strHtml += "<span class='xxiaotitle font_huise mtop'>无申购费</span>";
					strHtml += "</a></li></ul></div></ul>";
                        
                        
                        //'<li class="group_list">' + '<div class="group_header">' + '<div class="table_header"><span class="group_name">' + n.fundName + '</span><a class="go-buy" data-id="' + n.fundId + '" data-name="' + n.fundName + '"><span>购买</span></a></div>' + '</div>' + '<div class="table_data_list">' + '<table class="table_data">' + '<tr><td class="td_1">成立以来收益</td><td class="td_2">起购金额</td><td class="td_3"></td></tr>' + '<tr><td class="td_1 i profit" profit="'+ profit +'">' + fdReturnYearRatio + '</td><td class="td_2  money">' + start_money + '</td><td class="td_3">详情></td></tr>' + '</table>' + '</div>' + '</li>';*/
					$(".group_list_data").append(strHtml);
					buyGroupDetail();
				})

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误");
		}
	});
}

function buyGroupDetail() {

	$(".jijinlist_table_t").click(function () {
		var fundid = $(this).attr("data-id");
		var fundname = $(this).attr("data-name");
		var profit = $(this).attr("profit");
		window.location.href = "group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
		console.log("详情");
	});
	$(".jj_store3 .zuhe_left").click(function () {
		var fundid = $(this).parent().find(".zuhe_right button").attr("data-id");
		var fundname = $(this).parent().find(".zuhe_right button").attr("data-name");
		var profit = $(this).parent().find(".zuhe_center a").attr("profit");
		window.location.href = "group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
		console.log("详情");
	});
	$(".jj_store3 .zuhe_center").click(function () {
		var fundid = $(this).parent().find(".zuhe_right button").attr("data-id");
		var fundname = $(this).parent().find(".zuhe_right button").attr("data-name");
		var profit = $(this).find("a").attr("profit");
		window.location.href = "group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
		console.log("详情");
	});


	//点击购买
	$(".jj_store3 .zuhe_right button").unbind("click").click(function (e) {
		var fundid =$(this).attr("data-id");
		var fundname =$(this).attr("data-name");
		e.stopPropagation();
		console.log("购买");
		groupBuyStep1(fundid,fundname);
	});
}

function formatNumber_dou(n,j){
	var s = n + "";
	var l = s.length;
	var m = l % 3;
	if (m==l) return s;
	else if(m==0) return (s.substring(m).match(/\d{3}/g)).join(j);
	else return [s.substr(0,m)].concat(s.substring(m).match(/\d{3}/g)).join(j);
}