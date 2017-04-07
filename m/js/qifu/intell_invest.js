var riskmatching = 1;//风险等级是否匹配	1 匹配，	0不匹配
var fundnamea;
var fundida;
var user_money;//跳转到定投页面时 附带的金额
var invest_scene;

$(document).ready(function () {
	//给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算。   
	Number.prototype.add = function (arg) {  
	    return accAdd(arg, this);  
	};  
	//给Number类型增加一个add方法，，使用时直接用 .sub 即可完成计算。   
	Number.prototype.sub = function (arg) {  
	    return Subtr(this, arg);  
	}; 
	//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算。   
	Number.prototype.mul = function (arg) {  
	    return accMul(arg, this);  
	}; 
	//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算。   
	Number.prototype.div = function (arg) {  
	    return accDiv(this, arg);  
	}; 
	var fundDetail = new getFundDetail();
	
	var money = fundDetail.money;//用户准备每月定投的钱
	var fundcode = fundDetail.fundcode;//定投的基金代码
	var type= fundDetail.type;//基金类型
	var fundname= fundDetail.fundname;//基金名称
	var instruction= fundDetail.instruction;//专家评语
	var invest_money= fundDetail.invest_money;//该基金最小定投金额
	var maxmin=fundDetail.maxmin;//按照用户的计划该基金会为用户带来多少收益，是个区间值
	var scene=fundDetail.scene;//场景类型
	
	fundida=fundcode;
	
	$("#invest_money").html(invest_money);
	$("#invest_fundcode").html(fundcode);
	$("#invest_fundname").html(fundname);
	$("#invest_fundtype").html(type);
	$("#invest_maxminMoney").html(maxmin);
	$("#py").html(instruction);
	
	//走势图
	$(".zst").attr("src","img_detail/"+scene+"_trade.png");
	
	$(".span2").html(money);
	if(parseInt(money)<parseInt(invest_money)){
		user_money=invest_money;
		replace_mark("0",scene);
	}else{
		user_money=money;
		replace_mark("1",scene);
	}
});

//定投
function intell_invest() {
    hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "precastopenapi",
		data: {
			"surelyOpen.fundcode": fundida,//基金代码
			"surelyOpen.buyflag":0//是否验证风险等级,0表示是
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				var risklevel=data.data.risklevel;
				fundnamea=data.data.fundname;
				fundida=data.data.fundcode;
				
				if(risklevel == 0000 || risklevel=="0000"){
					riskmatching = 0;
					gobuynext();
				}
				else{
					if (risklevel == 1014 || risklevel=="1014") {
						riskmatching = 0;
						showAlertHint('基金的风险级别高于您个人风险承受能力，是否继续交易？', gobuynext);
					}else if (risklevel == 1012 || risklevel=="1012"){
						//进入风评页面
						setErrorMsg(risklevel, data.retmsg);
					}
				}
				
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}

		},
	    error:function(){
			hideloading();
			alert("服务器错误");
		}
	});
};

//购买下一页
function gobuynext() {
	window.location.href = "investfund.html?riskmatching=" + riskmatching 
	+ "&fundname=" + fundnamea + "&fundcode=" + fundida+"&investperiods=0&user_money="+user_money;
}

//生成基金的详细信息
var getFundDetail = function () //作用是获取当前网页的查询条件
{
	var args = new getArgs();
	
	var money = args.money;//用户准备每月定投的钱
	var year = args.year;//准备定投多少年
	var fundcode = args.fundcode;//定投的基金代码
	var type;//基金类型
	var fundname;//基金名称
	var instruction;//专家评语
	var invest_money;//该基金最小定投金额
	var maxmin="(262174.80~953562.29)";//按照用户的计划该基金会为用户带来多少收益，是个区间值
	var scene=args.scene;//场景类型
	var percentage=0;
	var percentageMax=0;
	var percentageMin=0;
	var percentage_flag=true;//判断预期收益率是几个
	var percentage_money;//计算预期收益用的金额
	
	if(fundcode=="110008"){
		invest_money="100";
		type="债券型";
		fundname="易方达稳健收益Ｂ";
		instruction="买房往往是较短时间的一个目标，这样的目标需要稳健增长，风险控制较好的基金来作为资产的增值。这样的情况适合易方达稳健收益B这样的波动小、走势平稳、回撤小且有一定收益的基金。";
		percentage_flag=false;
		percentage=17.56;
	}else if(fundcode=="000205"){
		invest_money="100";
		type="债券型";
		fundname="易方达投资级信用债A";
		instruction="以结婚目的的投资，这关系到一个家庭的未来。这样的需求要做的更多的是一个储蓄，同时获得一定的收益，目前的利率持续下降简单储蓄和货币基金无法满足需求，而风险很小收益不错的纯债基金易方达投资级信用债A是不错的选择。";
		percentage_flag=false;
		percentage=10.61;
	}else if(fundcode=="000311"){
		invest_money="10";
		type="指数型";
		fundname="景顺长城沪深300增强";
		instruction="教育定投是为孩子未来的教育做的一个长期投资，这样的情况投资时间较长很适合投资波动较大的指数型基金。景顺长城沪深300增强跟踪沪深300指数，这个指数很大程度上反映的是股市的情况，而增强型的基金在跟踪指数的基础上做出一些加强，增强收益便面风险，是长期定投的优质选择。";
		percentageMax=19.92;
		percentageMin=5.68;
	}else{
		invest_money="1000";
		type="指数型";
		fundname="中邮上证380增强";
		instruction="养老定投是一个长期的准备和储蓄过程，这样的一个定投可以选择一个高波动的高收益的基金。时间可以平滑账户的波动，降低风险增加收益，实现一个稳健长期的投资理财。指数基金跟踪指数，适合长期的投资，增强型的基金更能实现超越指数的收益。中邮上证380增强就是一直增强型的指数基金，适合长期养老定投。";
		percentageMax=22.4;
		percentageMin=4.8;
	}
	
	if(parseInt(money)<parseInt(invest_money)){
		percentage_money=invest_money;
	}else{
		percentage_money=money;
	}
	
	var fundDetail = new Object(); //声明一个空对象
	
	fundDetail["money"]=money;//
	fundDetail["year"]=year;
	fundDetail["fundcode"]=fundcode;
	fundDetail["invest_money"]=invest_money;
	fundDetail["type"]=type;
	fundDetail["fundname"]=fundname;
	fundDetail["instruction"]=instruction;
	if(percentage_flag){
		var max=accMul(accMul(accAdd(1,percentageMax.div(100)),accMul(year,12)),percentage_money);
		var min=accMul(accMul(accAdd(1,percentageMin.div(100)),accMul(year,12)),percentage_money);
		maxmin="("+min+"~"+max+")";
	}else{
		var maxmin_temp=accMul(accMul(accAdd(1,percentage.div(100)),accMul(year,12)),percentage_money);
		maxmin=maxmin_temp;
	}
	fundDetail["maxmin"]=maxmin;
	fundDetail["scene"]=scene;
	invest_scene=scene;
	
	return fundDetail; // 返回此对象
};

//替换背景图，flag=0时为失败，flag=1时为成功
function replace_mark(flag,scene){
	if(flag=="0"){
		$("#mark").attr("style","background:url(img_detail/"+scene+"_failed.png) repeat-y scroll 0 0 / 100% auto;");
		$(".queren").attr("style","color:#ccc; background:#999;");
	}else{
		$("#mark").attr("style","background:url(img_detail/"+scene+"_success.png) repeat-y scroll 0 0 / 100% auto;");
		$(".span1").attr("style","display:none;");
		$(".queren").attr("style","color:#fff; background:#1B75DA;");
	}
}

function goto_back(){
	window.location.href="invest_question.html?type="+invest_scene;
}

//加法函数  
function accAdd(arg1, arg2) {  
    var r1, r2, m;  
    try {  
        r1 = arg1.toString().split(".")[1].length;  
    }  
    catch (e) {  
        r1 = 0;  
    }  
    try {  
        r2 = arg2.toString().split(".")[1].length;  
    }  
    catch (e) {  
        r2 = 0;  
    }  
    m = Math.pow(10, Math.max(r1, r2));  
    return (arg1 * m + arg2 * m) / m;  
}
  
//减法函数  
function Subtr(arg1, arg2) {  
    var r1, r2, m, n;  
    try {  
        r1 = arg1.toString().split(".")[1].length;  
    }  
    catch (e) {  
        r1 = 0;  
    }  
    try {  
        r2 = arg2.toString().split(".")[1].length;  
    }  
    catch (e) {  
        r2 = 0;  
    }  
    m = Math.pow(10, Math.max(r1, r2));  
     //last modify by deeka  
     //动态控制精度长度  
    n = (r1 >= r2) ? r1 : r2;  
    return ((arg1 * m - arg2 * m) / m).toFixed(n);  
}  
  
  
//乘法函数  
function accMul(arg1, arg2) {  
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();  
    try {  
        m += s1.split(".")[1].length;  
    }  
    catch (e) {  
    }  
    try {  
        m += s2.split(".")[1].length;  
    }  
    catch (e) {  
    }  
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);  
}   
  
//除法函数  
function accDiv(arg1, arg2) {  
    var t1 = 0, t2 = 0, r1, r2;  
    try {  
        t1 = arg1.toString().split(".")[1].length;  
    }  
    catch (e) {  
    }  
    try {  
        t2 = arg2.toString().split(".")[1].length;  
    }  
    catch (e) {  
    }  
    with (Math) {  
        r1 = Number(arg1.toString().replace(".", ""));  
        r2 = Number(arg2.toString().replace(".", ""));  
        return (r1 / r2) * pow(10, t2 - t1);  
    }  
}   
