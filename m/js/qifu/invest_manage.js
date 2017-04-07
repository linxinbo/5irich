$(function () {
	//判断是否开户
	var username = $.cookie("username");
	if (username == "" || username == null || username == undefined|| username == "null") {
		setErrorMsg(1001);
	} else {
		getAccount();
	}
	$(".account_data").show();
	//个人资产 公募基金
	function getAccount() {
		console.log("开始刷新公墓基金");
		showLoading();
		$.ajax({
			url: mainUrl + "castqueryapi",
			data: "",
			dataType: "JSON",
			success: function (data) {
				hideloading();
				if (data.retcode == 0000) {
					$(".account_data ul").html("");

					if (data.data == undefined || data.data == "undefined") {

					} else {

						$(data.data).each(function (i, n) {
							var fundcode = n.fundcode;
							console.log(fundcode);
							var channelname = n.channelname;
							var firstinvestamount = n.firstinvestamount;
							var firstinvestdate = n.firstinvestdate;
							var DateDeductions = n.DateDeductions;
							var fundname = n.fundname;
							var regularbasisquota = n.regularbasisquota;
							var depositacctP = n.depositacctP;
							var accountdata = '<li>' + '<div class="table_header"><a class=""><span class="account_code">' + n.fundcode.substring(0, 6) + '</span><span class="account_name">' 
							+ n.fundname + '</span></a><a class="go-stop" data-depositacct="' + n.depositacct + '"  data-transactionaccountid="' + n.transactionaccountid 
							+ '" data-buyplanno="' + n.buyplanno + '" data-branchcode="' + n.branchcode + '" data-channelid="' + n.channelid + 
							'" data-fundcode="' + n.fundcode + '" data-fundname="' + n.fundname + '" data-DateDeductions="' + n.DateDeductions 
							+ '" data-depositacctP="' + n.depositacctP + '" data-firstinvestamount="' + n.firstinvestamount + '" data-channelname="' + n.channelname + '"><span>终止定投</span></a></div>' 
							+ '<table class="table_data">' 
							+ '<tr><td class="td_1">首次扣款日期</td><td class="td_2">' 
							+ firstinvestdate + '</td><td class="td_3">扣款金额(元)</td><td class="td_4">' + firstinvestamount 
							+ '</td></tr>' + '<tr><td class="td_1">扣款周期</td><td class="td_2">' + DateDeductions 
							+ '</td><td class="td_3">协议类型</td><td class="td_4">' + regularbasisquota 
							+ '</td></tr>' + '<tr><td class="td_1">扣款银行</td><td class="td_2">' + channelname 
							+ '</td><td class="td_3">银行卡号</td><td class="td_4">' + depositacctP 
							+ '</td></tr>'+ '</table>' + '</li>';
							
							$(".account_data ul").append(accountdata);
							$("a.go-stop").unbind("click").click(function (e) {
								e.stopPropagation();
								console.log("点击终止");
								var depositacct = $(this).attr("data-depositacct");
								var transactionaccountid = $(this).attr("data-transactionaccountid");
								var buyplanno = $(this).attr("data-buyplanno");
								var branchcode = $(this).attr("data-branchcode");
								var channelid = $(this).attr("data-channelid");
								var fundcode = $(this).attr("data-fundcode");
								var fundname = $(this).attr("data-fundname");
								var DateDeductions = $(this).attr("data-DateDeductions");
								var depositacctP = $(this).attr("data-depositacctP");
								var firstinvestamount = $(this).attr("data-firstinvestamount");
								var channelname = $(this).attr("data-channelname");
								//alert(depositacct+"---"+transactionaccountid+"---"+buyplanno+"---"+branchcode+"---"+channelid);
								//gotoStop1(depositacct, transactionaccountid,buyplanno,branchcode,channelid);
								window.location.href="invest_stop.html?depositacct="+depositacct+"&transactionaccountid="+transactionaccountid
								+"&buyplanno="+buyplanno+"&branchcode="+branchcode+"&channelid="+channelid+"&fundcode="+fundcode
								+"&fundname="+fundname+"&DateDeductions="+DateDeductions+"&depositacctP="+depositacctP
								+"&firstinvestamount="+firstinvestamount+"&channelname="+channelname;
							});
						});
					}
				} else {
					setErrorMsg(data.retcode, data.retmsg);
				}
			}
		});
	};
});

//获取当前日期
function show(){
	var mydate = new Date();
	var str = "" + mydate.getFullYear() + "/";
	str += (mydate.getMonth()+1) + "/";
	str += mydate.getDate();
	return str;
}
