$(document).ready(function () {
	var args = new getArgs();
	var fundid = args.fundid;
	var fundid_short= fundid.substring(0,6);//去掉后缀
	var fundname = args.fundname;
	var fundtype = args.type;
	getyincang(fundtype);
	$(".fund_name a").html(fundname + "&nbsp;&nbsp(" + fundid_short + ")&nbsp");
	/*$(".income_qifu li").on("click", function () {
		$(this).addClass("active").siblings().removeClass("active");

	});*/
	$(".buy_fund").on("click", function () {
		buyStep1(fundid_short, fundname);
	});
	
	$(".buy_fund_mn").on("click", function () {
		/*Simulation(fundid);*/
	});
	
	findFundDetail_1(fundid);
	findFundDetail_2(fundid);
	/*findFundDetail_3(fundid);*/
});


//查询基金详情接口1
function findFundDetail_1(fundid) {
	console.log("findFundDetail_1======="+fundid);
	hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "Funav",
		data: {
			Windcode: fundid
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			console.log(data.data);
			if (data.retcode == 0000) {
				var fNavAccumulated = data.data.fNavAccumulated; //基金净值；
				var fNavUnit = data.data.fNavUnit; //单位净值；
				var gains = data.data.gains; //涨跌幅；
				var priceDate = data.data.priceDate; //更新时间；
                if(fNavUnit==""||fNavUnit== undefined){
                    $(".td_value_1").html("-");
                }else{
				    $(".td_value_1").html(fNavUnit);//单位净值；
                }
                if(fNavAccumulated==""||fNavAccumulated== undefined){
                    $(".td_value_2").html("-");
                }else{
				    $(".td_value_2").html(fNavAccumulated);//累计净值；
                }
                if(priceDate==""||priceDate== undefined){
                    $(".td_value_0").html("-");
                }else{
				    $(".td_value_0").html("更新时间："+priceDate);//更新时间；
                }
                if(gains==""||gains== undefined){
                    $(".td_value_3").html("-");
                }else{
                    $(".td_value_3").html(gains+"%");//涨跌幅；
                    if(gains<0){
				        $(".td_value_3").css("color","#14a945");
                    };
                }
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		}
	});
}
//查询基金详情接口2
function findFundDetail_2(fundid) {
	console.log("findFundDetail_2======="+fundid);
	hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "fund",
		data: {
			Windcode: fundid
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			console.log(data);
			if (data.retcode == 0000) {
				var fundType = data.data.fundType; //基金类型；
				//var fundcode = fundid.substring(0,6); //基金代码
				var fundcode = fundid; //基金代码
				drawLine(fundcode,fundType);
				var fInfoFirstinveststyle = data.data.fInfoFirstinveststyle; //累计一年；
				var fIssueTotalunit = data.data.fIssueTotalunit; //基金规模；
				var name = data.data.name; //基金经理；
				
				var fInfoSetupdate = gettime(data.data.fInfoSetupdate); //成立日期；
				
				
				var fInfoFirstinvesttype = data.data.fInfoFirstinvesttype; //投资类型；

				
				var fInfoCorpFundmanagementcomp = data.data.fInfoCorpFundmanagementcomp; //管理人；
				var starlevel = data.data.starlevel; //星级；
                /*if(fInfoFirstinveststyle==""||fInfoFirstinveststyle== undefined){
                    $(".td_value_4").html("");
                }else{
				    $(".td_value_4").html(fInfoFirstinveststyle);
                }*/
                if(fundType==""||fundType== undefined){
                    $(".td_value_5").html("");
                }else{
				    $(".td_value_5").html(fundType);//基金类型；
                }
                /*if(fInfoCorpFundmanagementcomp==""||fInfoCorpFundmanagementcomp== undefined){
                    $(".td_value_6").html("");
                }else{
				    $(".td_value_6").html(fInfoCorpFundmanagementcomp);
                }
                if(fInfoSetupdate==""||fInfoSetupdate== undefined){
                    $(".td_value_7").html("");
                }else{
				    $(".td_value_7").html(fInfoSetupdate);
                }
                    if(name==""||name== undefined){
                    $(".td_value_8").html("");
                }else{
				    $(".td_value_8").html(name);
                }
                if(fIssueTotalunit==""||fIssueTotalunit== undefined){
                    $(".td_value_9").html("");
                }else{
				    $(".td_value_9").html(fIssueTotalunit+"亿");
                }
                if(starlevel==""||starlevel== undefined ||starlevel== 0){
                    $(".td_value_10").html("暂无评级");
                }else{
				    $(".td_value_10").html(starlevel+"星级");
                }*/
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		}
	});
}

//查询基金详情接口3
function findFundDetail_3(fundid) {
	console.log("findFundDetail_3======="+fundid);
	hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "fixedsa",
		data: {
			Windcode: fundid
		},
		dataType: "JSON",
		success: function (data) {
			
			hideloading();
			console.log(data);
			if (data.retcode == 0000) {
				var fAvgreturnHalfyear = data.data.fAvgreturnHalfyear; //本年收益；
				var fAvgreturnMonth = data.data.fAvgreturnMonth; //一月收益；
				var fAvgreturnGuarter = data.data.fAvgreturnGuarter; //三月收益；
				var fAvgreturnThisyear = data.data.fAvgreturnThisyear; //六月收益；
				var fAvgreturnYear = data.data.fAvgreturnYear; //一 年收益；
				var fAvgreturnThreeyear = data.data.fAvgreturnThreeyear; //三年收益；
				var fAvgreturnSincefound = data.data.fAvgreturnSincefound; //成立历来收益；

				
				$(".income_per li:eq(0) .in_percent").html(getdoit2(fAvgreturnHalfyear)+"%");
				$(".income_per li:eq(1) .in_percent").html(getdoit2(fAvgreturnMonth)+"%");
				$(".income_per li:eq(2) .in_percent").html(getdoit2(fAvgreturnGuarter)+"%");
				$(".income_per li:eq(3) .in_percent").html(getdoit2(fAvgreturnThisyear)+"%");
				$(".income_per li:eq(4) .in_percent").html(getdoit2(fAvgreturnYear)+"%");
				$(".income_per li:eq(5) .in_percent").html(getdoit2(fAvgreturnThreeyear)+"%");
				$(".income_per li:eq(6) .in_percent").html(getdoit2(fAvgreturnSincefound)+"%");
				
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			showAlert("服务器错误");
		}
	});
}
//截取%；
function  getdoit2(n){
	var x =n.indexOf(".");
	 n = n.substring(0,x+3);
	return  n;
}

//截取%；
function  getdoit4(n){
	var x =n.indexOf(".");
	 n = n.substring(0,x+5);
	return  n;
}
//判断隐藏
function getyincang(fundtype){
	if(fundtype == "货币型" || fundtype == "货币市场型"){
		$(".yincang").html("");
	}
}
//日期截取
function gettime(time){
	
	if(time==null||time.length!==8){
		return "";
	}else{
		var yyyy = time.substring(0,4);
		var mm = time.substring(4,6);
		var dd = time.substring(6,8);
		if(mm.substring(0,1) == 0){
			mm = mm.substring(1,2);
		}
		if(dd.substring(0,1) == 0){
			dd = dd.substring(1,2);
		}
		return yyyy + "年" + mm + "月" + dd + "日";
	}
}
