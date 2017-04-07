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
				$(data.data).each(function (i, n) {
					var fundid = n.fundId;
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
					var group_list = '<li class="group_list">' + '<div class="table_data_list">' + '<div class="table_header"><span class="group_name">' + n.fundName + '</span><span style="float: right;height:51px;line-height:51px">详情＞</span></div>' + '<table class="table_data">' + '<tr><td class="td_1">成立以来收益</td><td class="td_2">起购金额</td></tr>' + '<tr><td class="td_1  i profit" profit="'+ profit +'">' + fdReturnYearRatio + '</td><td class="td_2 money">' + start_money + '元</td></tr>' + '</table>' + '</div>' + '<div class="go-buy" data-id="' + n.fundId + '" data-name="' + n.fundName + '"><span>立即购买</span></div>' + '</li>';
                  /*         
                        
                        
                        '<li class="group_list">' + '<div class="group_header">' + '<div class="table_header"><span class="group_name">' + n.fundName + '</span><a class="go-buy" data-id="' + n.fundId + '" data-name="' + n.fundName + '"><span>购买</span></a></div>' + '</div>' + '<div class="table_data_list">' + '<table class="table_data">' + '<tr><td class="td_1">成立以来收益</td><td class="td_2">起购金额</td><td class="td_3"></td></tr>' + '<tr><td class="td_1 i profit" profit="'+ profit +'">' + fdReturnYearRatio + '</td><td class="td_2  money">' + start_money + '</td><td class="td_3">详情></td></tr>' + '</table>' + '</div>' + '</li>';*/
					$(".group_list_data").append(group_list);
					var value = n.fdReturnYearRatio; //取值 转数字
					//根据正负判断颜色
					if (value > 0) {
						$(".td_1.i").css('color', '#d61020');
					} else if (value < 0) {
						$(".td_1.i").css('color', '#14a945');
					} else {
						$(".td_1.i").css('color', '#323232');
					}
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
	//基金详情
	$(".table_data_list").click(function () {
		var fundid = $(this).parent().find(".go-buy").attr("data-id");
		var fundname = $(this).parent().find(".go-buy").attr("data-name");
        var profit = $(this).find(".profit").attr("profit");
		window.location.href = "../group/group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
		console.log("s");
	})

	
	//点击购买
	$(".go-buy").unbind("click").click(function (e) {
		var fundid =$(this).attr("data-id");
		var fundname =$(this).attr("data-name");
		e.stopPropagation();
		console.log("ss");
//		showAlert("暂不支持购买，敬请期待");
		groupBuyStep1(fundid, fundname);
	});
	/*//加自选
	$("a.go-add").unbind("click").click(function (e) {
		e.stopPropagation()
		console.log("加自选");
		var fundname = $(this).attr("data-name");
		var fundid = $(this).attr("data-id");
		var fundvalue = $(this).attr("data-value");
		addFund(fundid, fundname, fundvalue);
	});*/
}
