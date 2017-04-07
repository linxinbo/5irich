$(function () {
	$(".fund_pro").click(function () {
		$(".fund_pro").addClass("selected");
		$(".rate").removeClass("selected");
		$(".fund_pro_data").show();
		$(".rate_data").hide();
		getFundPro();
	});
	$(".rate").click(function () {
		$(".rate").addClass("selected");
		$(".fund_pro").removeClass("selected");
		$(".rate_data").show();
		$(".fund_pro_data").hide();
		getRate();
	});
});
//基金概况接口
function getFundPro() {
	var args = new getArgs();
	var fundid = args.fundid;
	hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "webfixed",
		data: {
			Windcode: fundid
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000 || data.retcode == "0000") {
				$(".fund_pro_data").html("");
				var fund_pro_data = '<li>' + '<span class="span_1">业绩比较基准:</span><span>' + data.data.fInfoBenchmark + '</span>' + '</li>' + '<li>' + '<span class="span_2">投资目标:</span><span>' + data.data.fInfoInvestobject + '</span>' + '</li>' + '<li>' + '<span class="span_3">投资范围:</span><span>' + data.data.fInfoInvestscope + '</span>' + '</li>' + '<li>' + '<span class="span_4">投资理念:</span><span>' + data.data.fInfoInvestconception + '</span>' + '</li>' + '<li>' + '<span class="span_5">决策依据:</span><span>' + data.data.fInfoDecisionBasis + '</span>' + '</li>';
				$(".fund_pro_data").append(fund_pro_data);

			} else {
				setErrorMsg(data.retcode, data.retmsg);
                //无数据时显示文字提示
                $(".fund_pro_data").html("暂无概况信息！");
                $(".fund_pro_data").addClass("zanwuxinxi");
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误");
		}
	});
};
//基金交易汇率接口
function getRate() {
	var args = new getArgs();
	var fundid = args.fundid;
	hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "mutualfee",
		data: {
			Windcode: fundid
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000 || data.retcode == "0000") {
				$(".rate_data li table").html("");
				var rengou_head = '<tr><td>认购金额(元)</td><td>原费率(%)</td><td>折扣费率(%)</td></tr>';
				var shengou_head = '<tr><td>申购金额(元)</td><td>原费率(%)</td><td>折扣费率(%)</td></tr>';
				var shuhui_head = '<tr><td>赎回金额(元)</td><td>原费率(%)</td><td>折扣费率(%)</td></tr>';
				var qita_head = '<tr><td>其他费率</td><td>费率(%)</td></tr>';
				$(".rate_data li .rengou").append(rengou_head);
				$(".rate_data li .shengou").append(shengou_head);
				$(".rate_data li .shuhui").append(shuhui_head);
				$(".rate_data li .qita").append(qita_head);
				$(data.data).each(function (i, n) {
					if (n.feeType == "认购费") {
						var rengou_data = '<tr><td>' + n.feeInterval + '</td><td>' + n.fundBasicFee + '</td><td>' + n.fundDiscountFee + '</td></tr>';
						$(".rate_data li .rengou").append(rengou_data);
					} else if (n.feeType == "申购费") {
						var shengou_data = '<tr><td>' + n.feeInterval + '</td><td>' + n.fundBasicFee + '</td><td>' + n.fundDiscountFee + '</td></tr>';
						$(".rate_data li .shengou").append(shengou_data);
					} else if (n.feeType == "赎回费") {
						var shuhui_data = '<tr><td>' + n.feeInterval + '</td><td>' + n.fundBasicFee + '</td><td>' + n.fundDiscountFee + '</td></tr>';
						$(".rate_data li .shuhui").append(shuhui_data);
					} else {
						var qita_data = '<tr><td>' + n.feeType + '</td><td>' + n.fundBasicFee + '</td></tr>';
						$(".rate_data li .qita").append(qita_data);
					};
				});
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			showAlert("服务器错误");
		}
	});
};
window.onload = getFundPro();
