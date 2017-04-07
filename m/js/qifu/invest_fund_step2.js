//第二步需要购买参数
var fundcode;
var riskmatching;
var channelid;
var tano;
var moneyaccount;
var sharetype='A';
var firstinvestamount;
var investperiods;
var investcyclevalue;
var operorg;
var tpasswd;
//最小定投金额
var per_min_39;
var fundname;

//根据数字转换 星期数
function transformCN(en){
  var cn="";
  switch(en)
  {
    case 1:
      cn="一";
      break;
    case 2:
      cn="二";
      break;
    case 3:
      cn="三";
      break;
    case 4:
      cn="四";
      break;
    default:
      cn="五";
  }
  return cn;
}

$(document).ready(function () {
		var args = new getArgs();
		fundname = args.fundname;
		var investperiods_temp=args.investperiods;
		var user_money=args.user_money;
		if(user_money!=""&&parseInt(user_money)!=0){
			$("#drawMoneyNum").val(user_money);
		}
		fundcode = args.fundcode;
		riskmatching = args.riskmatching;//风险等级是否匹配	1 匹配，	0不匹配
		
		//扣款周期类型
		if(investperiods_temp!=""&&investperiods_temp!="undefined"&&investperiods_temp!=undefined){
			investperiods=investperiods_temp;
			//假如investperiods_temp不为空，表示是从智能定投入口进入
			$(".investperiods").parent().find("span").html("每月");
			//清空之前的数据
			$(".investcyclevalue").parent().find("span").html("请选择");
			$(".investcyclevalue").html("");
			//月的1~28号
			for(var i=1;i<=28;i++){
				var option = "<option value='" + i + "'>" + i + "日</option>";
				//填充投资周期类型
				$(".investcyclevalue").append(option);
			}
		}else{
			$(".investperiods").parent().find("span").html("请选择");
		}
		//扣款周期
		$(".investcyclevalue").parent().find("span").html("请选择");
		
		//填充投资周期类型
		for(var i=0;i<3;i++){
			if(i==0){
				var option = "<option value='" + i + "'>每月</option>";
				$(".investperiods").append(option);
			}else if(i==1){
				var option = "<option value='" + i + "'>每周</option>";
				$(".investperiods").append(option);
			}else{
				var option = "<option value='" + i + "'>每双周</option>";
				$(".investperiods").append(option);
			}
		}
		
		/**获取用户银行卡列表----begin**/
		$.ajax({
			url: mainUrl + "precastopenapi",
			data: {
				"surelyOpen.fundcode": fundcode,//基金代码
				"surelyOpen.buyflag":0//是否验证风险等级,0表示是
			},
			dataType: "JSON",
			success: function (data) {
				hideloading();
				if (data.retcode == 0000) {
					console.log("最低定投额度"+data.data.per_min_39);
					per_min_39=data.data.per_min_39;//最小定投金额
					tano=data.data.tano;//最小定投金额
					$("#drawMoneyNum").attr("placeholder", "最低定投额度" + per_min_39);
					$(data.data.listmap).each(function (i, n) {
						if (i == 0) {
							$(".bank_no").parent().find("span").html("请选择");
						}
						var option = "<option data_b='" + n.moneyaccount + "' data_c='315' value='" + n.channelid + "'>" + getbanktype(n.channelid) + n.depositcard + "</option>";
						//填充用户的银行卡列表信息
						$(".bank_no").append(option);
					});
				} else {
					setErrorMsg(data.retcode, data.retmsg);
				}
			},
		    error:function(){
				hideloading();
				alert("服务器错误");
			}
		});
		/**获取用户银行卡列表----end**/
		
		$('.fund_id span').html(fundname);
		$('.fund_id').append("(" + fundcode + ")");

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
			
		//下一步按钮	
		$("#drawBtn").click(function () {
			
			var investperiods = $(".investperiods").parent().find("span").html();
			if (investperiods == "请选择") {
				showAlert("请选择扣款周期类型");
				return;
			}
			
			var investcyclevalue = $(".investcyclevalue").parent().find("span").html();
			if (investcyclevalue == "请选择") {
				showAlert("请选择扣款周期");
				return;
			}
			
			var bankNo = $(".bank_no").parent().find("span").html();
			if (bankNo == "请选择") {
				showAlert("请选择银行卡");
				return;
			}
			
			var money = $("#drawMoneyNum").val();
			if (money == "" | money == null) {
				showAlert("请输入定投金额！");
				return;
			}
			
			if(per_min_39!=undefined && per_min_39!=0&&per_min_39!=""){
				if(parseInt(money)<parseInt(per_min_39)){
					showAlert("输入金额小于最低定投额度"+per_min_39+"!");
					return;
				}
				firstinvestamount=money;
			}
			
			buyStep2(investperiods,investcyclevalue,bankNo);
		});

		//扣款周期类型列表发生变化时的操作
		$(".investperiods").change(function () {
			var val = $(this).val();
			var html = $(this).find("option:selected").html();
			console.log("扣款周期类型----"+val);
			investperiods=val;
			$(this).parent().children("span").html(html);
			//每月
			if(val==0){
				//清空之前的数据
				$(".investcyclevalue").parent().find("span").html("请选择");
				$(".investcyclevalue").html("");
				//月的1~28号
				for(var i=1;i<=28;i++){
					var option = "<option value='" + i + "'>" + i + "日</option>";
					//填充投资周期类型
					$(".investcyclevalue").append(option);
				}
			}
			//每周
			else if(val==1){
				//清空之前的数据
				$(".investcyclevalue").parent().find("span").html("请选择");
				$(".investcyclevalue").html("");
				//周几
				for(var i=1;i<=5;i++){
					var option = "<option value='" + i + "'>周" + transformCN(i) + "</option>";
					//填充投资周期类型
					$(".investcyclevalue").append(option);
				}
			}
			//每双周
			else if(val==2){
				//清空之前的数据
				$(".investcyclevalue").parent().find("span").html("请选择");
				$(".investcyclevalue").html("");
				//周几
				for(var i=1;i<=5;i++){
					var option = "<option value='" + i + "'>周" + transformCN(i) + "</option>";
					//填充投资周期类型
					$(".investcyclevalue").append(option);
				}
			}
		});
		
		//扣款周期列表发生变化时的操作
		$(".investcyclevalue").change(function () {
			var val = $(this).val();
			var html = $(this).find("option:selected").html();
			console.log("扣款周期----"+val);
			investcyclevalue=val;
			$(this).parent().children("span").html(html);
		});
		
		//银行卡列表发生变化时的操作
		$(".bank_no").change(function () {
			var val = $(this).val();
			var html = $(this).find("option:selected").html();
			console.log("select选择的值"+val);
			moneyaccount = $(this).find("option:selected").attr("data_b");
			operorg=val;
			channelid=val;
			$(this).parent().children("span").html(html);
		});
		
	});

//第二步
function buyStep2(investperiods_html,investcyclevalue_html,bankNo_html) {
	console.log("进入确认页面");
	showLoading();
	window.location.href = "investfund_comfirm.html?fundcode=" + fundcode + "&riskmatching=" + riskmatching 
	+ "&channelid=" + channelid + "&tano=" + tano + "&moneyaccount=" + moneyaccount + "&firstinvestamount=" 
	+ firstinvestamount + "&investperiods=" + investperiods + "&investcyclevalue=" + investcyclevalue 
	+ "&operorg=" + operorg+"&sharetype="+sharetype+"&investperiods_html="+investperiods_html+"&investcyclevalue_html="
	+investcyclevalue_html+"&bankNo_html="+bankNo_html+"&fundname="+fundname;
}
	
//判断银行卡类别
function getbanktype(code) {
	var bankname;
	var bankcode = code.substring(0, 4);
	if (bankcode == "KQ01") {
		bankname = "快钱-工商银行";
		return bankname;
	} else if (bankcode == "KQ02") {
		bankname = "快钱-农业银行";
		return bankname;
	} else if (bankcode == "KQ03") {
		bankname = "快钱-中国银行";
		return bankname;
	} else if (code == "KQ04") {
		bankname = "快钱-建设银行";
		return bankname;
	} else if (bankcode == "KQ05") {
		bankname = "快钱-招商银行";
		return bankname;
	} else if (bankcode == "KQ06") {
		bankname = "快钱-交通银行";
		return bankname;
	} else if (bankcode == "KQ07") {
		bankname = "快钱-中信银行";
		return bankname;
	} else if (bankcode == "KQ08") {
		bankname = "快钱-浦发银行";
		return bankname;
	} else if (bankcode == "KQ09") {
		bankname = "快钱-兴业银行";
		return bankname;
	} else if (bankcode == "KQ10") {
		bankname = "快钱-广发银行";
		return bankname;
	} else if (bankcode == "KQ11") {
		bankname = "快钱-平安银行";
		return bankname;
	} else if (bankcode == "KQ12") {
		bankname = "快钱-华夏银行";
		return bankname;
	} else if (bankcode == "KQ13") {
		bankname = "快钱-光大银行";
		return bankname;
	} else if (bankcode == "KQ14") {
		bankname = "快钱-民生银行";
		return bankname;
	} else if (bankcode == "KQ15") {
		bankname = "快钱-邮储银行";
		return bankname;
	} else if (bankcode == "9001") {
		bankname = "通联-光大银行";
		return bankname;
	} else if (bankcode == "9002") {
		bankname = "通联-平安银行";
		return bankname;
	} else if (bankcode == "9003") {
		bankname = "通联-浦发银行";
		return bankname;
	} else if (bankcode == "9004") {
		bankname = "通联-工商银行";
		return bankname;
	} else if (bankcode == "9005") {
		bankname = "通联-农业银行";
		return bankname;
	} else if (bankcode == "9006") {
		bankname = "通联-建设银行";
		return bankname;
	} else if (bankcode == "9007") {
		bankname = "通联-邮储银行";
		return bankname;
	} else if (bankcode == "9008") {
		bankname = "通联-温州银行";
		return bankname;
	} else if (bankcode == "9009") {
		bankname = "通联-交通银行";
		return bankname;
	} else if (bankcode == "9010") {
		bankname = "通联-民生银行";
		return bankname;
	} else if (bankcode == "9011") {
		bankname = "通联-中国银行";
		return bankname;
	} else if (bankcode == "9012") {
		bankname = "通联-上海银行";
		return bankname;
	} else if (bankcode == "9014") {
		bankname = "通联-大连银行";
		return bankname;
	} else if (bankcode == "9015") {
		bankname = "通联-汉口银行";
		return bankname;
	} else if (bankcode == "9016") {
		bankname = "通联-广发银行";
		return bankname;
	} else if (bankcode == "9017") {
		bankname = "通联-中信银行";
		return bankname;
	} else if (bankcode == "9019") {
		bankname = "通联-兴业银行";
		return bankname;
	} else if (bankcode == "9021") {
		bankname = "通联-招商银行";
		return bankname;
	} else if (bankcode == "8866") {
		bankname = "民生银行";
		return bankname;
	}
}
