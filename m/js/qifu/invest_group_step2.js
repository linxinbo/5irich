var groupname="智能定投组合";//组合名称
var combinationcode;//组合代码
var limitmin;//最小限额
var limitmax;//最大限额
var investperiods=0;//循环周期类型（组合定投，只有月，默认为0）
var investcyclevalue;//循环周期
var depositacct;
var moneyaccount;
var channelid;
var cycleSelect_html;
var bank_no_html;

$(document).ready(function () {
	
	//密码输入框
	$(".pass_trade").focus(function () {
		$("i[data_rest=ID_rest]").show();
	});
	$(".pass_trade").blur(function () {
		if ($(this).val() == "") {
			$("i[data_rest=ID_rest]").hide();
		}
	});
	$("i[data_rest=ID_rest]").on("click", function () {
			$(".pass_trade").val("");
			$(this).hide();
	});
	
	//从url中截取组合代码
	var args = new getArgs();
	combinationcode = args.combinationcode;
	MoneyMonth = args.MoneyMonth;
	$('#myAccount span').html(groupname);
	$('#myAccount').append("(" + combinationcode + ")");
	$('#drawMoneyNum').val(MoneyMonth);
	//组合定投第一步，初始化一些东西
	$.ajax({
		type: "post",
		url: mainUrl + "groupbuyPre",
		data: {
			"combination.combinationcode": combinationcode,
			"combination.buyflag":1
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				combinationcode=data.data.combinationcode;
				limitmin=data.data.limitmin;//组合购买最小金额
				limitmax=data.data.limitmax;//组合购买最大金额
				
				//填充选择银行卡列表
				$(data.data.listmap).each(function (i, n) {
					
					var depositcard = n.depositcard;//银行卡号（带*）
					var moneyaccount = n.moneyaccount;
					var channelid = n.channelid;
					if (i == 0) {
						$(".bank_no").parent().find("span").html("请选择");
					}
					var option = "<option data_a='" + depositcard + "' data_b='" + moneyaccount + "' data_c='" + channelid + "'>" + getbanktype(n.channelid) + depositcard.substring(8) + "</option>";
					$(".bank_no").append(option);
				});
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	});
	
	//填充定投周期
	for(var k=1;k<=28;k++){
		if (k == 1) {
			$(".cycle_no").parent().find("span").html("请选择");
		}
		var option = "<option  value='" + k + "'>每月" + k + "日</option>";
		$(".cycle_no").append(option);
	}
	
	$(".cycleSelect").change(function () {
		var html = $(this).find("option:selected").html();
		console.log(html);
		investcyclevalue=$(this).val();
		console.log(investcyclevalue);
		$(this).parent().children("span").html(html);
		cycleSelect_html=$(this).parent().children("span").html();
	});
	
	$(".opaSelect").change(function () {
		var html = $(this).find("option:selected").html();
		console.log(html);
		depositacct=$(this).find("option:selected").attr("data_a");
		moneyaccount = $(this).find("option:selected").attr("data_b");
		channelid=$(this).find("option:selected").attr("data_c");
		
		$(this).parent().children("span").html(html);
		bank_no_html=$(this).parent().children("span").html();
	});
	
	$("#drawBtn").click(function () {
		
		if(investcyclevalue == ""||investcyclevalue==0||investcyclevalue==undefined||investcyclevalue=='undefined'){
			showAlert('请选择定投周期');
			return;
		}
		
		if($(".bank_no").parent().find("span").html()=='请选择'){
			showAlert('请选择银行卡');
			return;
		}
		
		var drawMoneyNum=$("#drawMoneyNum").val();
		if(drawMoneyNum==""||drawMoneyNum==0||drawMoneyNum==undefined||drawMoneyNum=='undefined'){
			showAlert('请填写金额');
			return;
		}
		
		drawMoneyNum = Number(drawMoneyNum);
		
		if(drawMoneyNum<limitmin){
			showAlert('填写金额小于组合最小定投金额');
			return;
		}
		
		if($("#tradePW").val()==""||$("#tradePW").val()=="undefined"||$("#tradePW").val()==undefined){
			showAlert('请输入交易密码');
			return;
		}
		
		
		window.location.href="group_confirm.html?combinationcode=" + combinationcode
		+"&groupname="+groupname
		+"&bank_no_html="+bank_no_html
		+"&cycleSelect_html="+cycleSelect_html
		+"&depositacct="+depositacct
		+"&moneyaccount="+moneyaccount
		+"&channelid="+channelid
		+"&investcyclevalue="+investcyclevalue
		+"&investperiods="+investperiods
		+"&tradePW="+$("#tradePW").val()
		+"&drawMoneyNum="+$("#drawMoneyNum").val();
	});
	
});


