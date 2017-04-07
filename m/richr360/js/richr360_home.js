//var mainUrl="http://localhost:8080/Wirich2.0/";
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
});
var sourceId="R360";//写死的来源
var date1 = new Date();
date1.setTime(date1.getTime() + (30 * 60 * 1000));
if(sourceId!==""||sourceId!=="R360"){
	$.cookie("sourceId", sourceId, {
		path: '/',
		expires: date1
	});
}
$(function(){	
	load_zh();
	load_jx();
	load_zhishu();
	console.log($.cookie("sourceId"));
	
});
function load_zh(){
	showLoading();
	hideloading();	
	var params = {"fundGroup" : 2};
	$.ajax({
		type: 'post',
		url: mainUrl + "/recommended",
		data: params,
		dataType: "JSON",
		success: function (data) {
			console.log(data);
			if(data.retcode="0000"){
			//result = response1.data;
			$(data.data).each(function (i, n) {
				var fundid = n.fundId;
                var fundName = n.fundName;
                var fdReturnYearRatio = n.fdReturnYearRatio;
                var profit = (n.fdReturnYearRatio*100).toFixed(2);
                var showOrder=n.showOrder;
				//var fdReturnYearRatio = profit + "%";
				if (n.fundId == undefined) {
					fundId = "-";
				} else {
					fundId = n.fundId;
				};
				if (n.fundName == undefined) {
					fundName = "-";
				} else {
					fundName = n.fundName;
				};				
				if (n.fdReturnYearRatio == undefined) {
					fdReturnYearRatio = "-";
				} else {
					fdReturnYearRatio = (n.fdReturnYearRatio*100).toFixed(2);
					var fdReturnYearRatio1 = fdReturnYearRatio+ "%";
				};
				var className5="zh_btn_chen";
				var classNamecn="高风险高收益";
				var classNamelabel="labelidshow";
				if(showOrder==3){
					className5="zh_btn_hong";
					classNamecn="高风险高收益";
					classNamelabel="labelidhide";
				}else if(showOrder==2){
					className5="zh_btn_chen";
					classNamecn="中高风险";
					classNamelabel="labelidshow";
				}else{
					className5="zh_btn_huang";
					classNamecn="中低风险";
					classNamelabel="labelidshow";
				}

				//var gm_list_data = '<li class="gm_list">' + '<div class="gm_header">' + '<div class="table_header"><span class="deal_name">' + n.fundName + '</span><span class="deal_code">' + fundid + '</span><a class="go-add" data-id="' + fundid + '" data-name="' + n.fundName + '" data-value="' + fNavUnit + '"><span class="add_collect add_hide">+自选</span></a><a class="go-buy" data-id="' + fundid + '"  data-name="' + n.fundName + '" data-type="'+n.fInfoFirstInvestType+'"><span>购买</span></a></div>' + '</div>' + '<div class="table_data_list">' + '<table class="table_data">' + '<tr><td class="td_1">最新净值：</td><td class="td_2">' + fNavUnit + '</td><td class="td_3">日涨幅：</td><td class="td_4 a'+page+i+'">' + gains + '</td></tr>' + '<tr><td class="td_1">累计三月：</td><td class="td_2 a'+page+i+'">' + Quarter + '</td><td class="td_3">累计一年：</td><td class="td_4">' + Year + '</td></tr>' + '</table>' + '<div class="gm_detail"></div>' + '</div>' + '</li>';
				var gm_list_data = '<li>'+'<div class="zuhe_left">'+'<h2 profit="'+ profit +'">'+ fdReturnYearRatio1 +'</h2>'+'<p>近一年涨幅</p></div><div class="zuhe_right"><a class="go_buy" data-id="'+fundid+'" data-name="' + fundName + '"><span>立即购买</span></a></div><div class="zuhe_center"><h2>'+ fundName +'</h2><div style="margin-top:5px;"><a id="labelid" class="zh_btn_lan '+classNamelabel+'">长期稳健</a><a class="'+className5+'" style="margin-left:5px;">'+classNamecn+'</a></div></div></li>';
				$("#djzh").append(gm_list_data);
                
                //根据正负判断颜色
                if(fdReturnYearRatio>0){
                    $("#djzh .zuhe_left h2").css('color','#ff0000');
                }else if(value1<0){
                    $("#djzh .zuhe_left h2").css('color','#03d908');
                }else {
                    $("#djzh .zuhe_left h2").css('color','#c6c6c6');
                }
                buyGroupDetail();
			});
			
			}else{
				setErrorMsg(data.retcode, data.retmsg); //错误提示框
			}			
		    },error:function(data){
		    	hideloading();
				showAlert("服务器错误");     		
     	    }
	});
}

function buyGroupDetail() {
	//基金详情
	$("#djzh .zuhe_center").click(function () {
		var fundid = $(this).parent().find(".zuhe_right a").attr("data-id");
		var fundname = $(this).parent().find(".zuhe_right a").attr("data-name");
        var profit = $(this).parent().find(".zuhe_left h2").attr("profit");
		window.location.href = "../group/group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
		console.log("s");
	});
	$("#djzh .zuhe_left").click(function () {
		var fundid = $(this).parent().find(".zuhe_right a").attr("data-id");
		var fundname = $(this).parent().find(".zuhe_right a").attr("data-name");
        var profit = $(this).find("h2").attr("profit");
		window.location.href = "../group/group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
		console.log("s");
	});

	
	//点击购买
	$("#djzh .zuhe_right a").unbind("click").click(function (e) {
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

function load_jx(){
	showLoading();
	hideloading();	
	$.ajax({
		type: "post",
		url: mainUrl + "products",
		data: {
			fdType: "混合型",
			pageSize: 0
		},
		dataType: "JSON",
		success: function (data1) {
			console.log(data1);
			if(data1.retcode="0000"){
			//result = response1.data;
		    //$("#jxjj").html("");
			$(data1.data).each(function (i, n) {
				var fundId = n.fundId;
				console.log(fundId);
				var fundname = n.fundName;
				var fAvgreturnYear = parseFloat(n.fAvgreturnYear);
				var fundPersional=n.fundPersional;
				var fundTypeGoods=n.fundTypeGoods;
				//改变每个基金风险等级颜色
				var className="zh_btn_chen";
				if(fundPersional=="中高风险"){
					className="zh_btn_hong";
				}else if(fundPersional=="中低风险"){
					className="zh_btn_huang";
				}else if(fundPersional=="中等风险"){
					className="zh_btn_chen";
				}else{
					className="zh_btn_lv";
				}
               
				var gm_list_data1 = '<li>'+'<div class="zuhe_left">'+'<h2>'+ fAvgreturnYear.toFixed(2)+'%</h2>'+'<p>近一年涨幅</p></div><div class="zuhe_right"><a class="go_buy" data-id="' + fundId + '" data-name="' + fundname + '" data-type="'+ fundTypeGoods +'"><span>立即购买</span></a></div><div class="zuhe_center"><h2>'+ fundname +'</h2><div style="margin-top:5px;"><a class="zh_btn_lan">混合型</a><a class="'+className+'"  style="margin-left:5px;">'+fundPersional+'</a></div></div></li>';
				$("#jxjj").append(gm_list_data1);
                
                //根据正负判断颜色
				//fAvgreturnYear=-0.16;
				 if(fAvgreturnYear>0){
	                    $("#jxjj .zuhe_left h2").css('color','#ff0000');
	                }else if(fAvgreturnYear<0){
	                    $("#jxjj .zuhe_left h2").css('color','#03d908');
	                }else {
	                    $("#jxjj .zuhe_left h2").css('color','#c6c6c6');
	                }
                
                $("#jxjj .zuhe_right a").unbind("click").click(function (e) {
					e.stopPropagation();
					console.log("购买");
					var fundname = $(this).attr("data-name");
					var fundid = $(this).attr("data-id");
					console.log(fundname);
					fundid=fundid.substring(0, 6);
					buyStep1(fundid, fundname);
				});
                $("#jxjj .zuhe_center").click(function () {
            		var fundid = $(this).parent().find(".zuhe_right a").attr("data-id");
            		var fundname = $(this).parent().find(".zuhe_right a").attr("data-name");
                    var type = $(this).parent().find(".zuhe_right a").attr("data-type");
            		window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&type=" +type;
            		console.log("s");
            	});
                $("#jxjj .zuhe_left").click(function () {
            		var fundid1 = $(this).parent().find(".zuhe_right a").attr("data-id");
            		var fundname1 = $(this).parent().find(".zuhe_right a").attr("data-name");
                    var type1 = $(this).parent().find(".zuhe_right a").attr("data-type");
            		window.location.href = "../fund/fund_detail.html?fundid=" + fundid1 + "&fundname=" + fundname1 + "&type=" +type1;
            		console.log("s");
            	});
			});
			
			}else{
				setErrorMsg(data1.retcode, data1.retmsg); //错误提示框
			}			
		    },error:function(data1){
		    	hideloading();
				showAlert("服务器错误");     		
     	    }
	});
}

function load_zhishu(){
	showLoading();
	hideloading();	
	$.ajax({
		type: "post",
		url: mainUrl + "getAllIndexAction",
		data: {},
		dataType: "JSON",
		success: function (data2) {
			console.log(data2);
			if(data2.retcode="0000"){
			result = data2.data;
		    var trade_dt=data2.data[0].trade_dt;
		    
		    $("#trade_dt").append(dateTransform(trade_dt));
			for(var i=0;i<result.length;i++){
		        //写死的按照老板要求排序
		        //0代表沪深300
				//1代表创业扳指	
				//3代表上证指数
				//var a=i;
				if(result[i].s_info_windcode=="000300.SH"){
				    var s_dq_close = result[i].s_dq_close;
				    var s_dq_change = result[i].s_dq_change;
				    var s_dq_pctchange = result[i].s_dq_pctchange;
				    var s_info_windcode=result[i].s_info_windcode;
				}else if(result[i].s_info_windcode=="399006.SZ"){
					var s_dq_close1 = result[i].s_dq_close;
					var s_dq_change1 = result[i].s_dq_change;
					var s_dq_pctchange1 = result[i].s_dq_pctchange;
					var s_info_windcode1 = result[i].s_info_windcode;
				}else if(result[i].s_info_windcode=="399001.SZ"){
					
				}else{
					var s_dq_close3 = result[i].s_dq_close;
					var s_dq_change3 = result[i].s_dq_change;
					var s_dq_pctchange3 = result[i].s_dq_pctchange;
					var s_info_windcode3 = result[i].s_info_windcode;
				}
			};
								
				var className="shishu_lv";
				var className1="shishu_lv";
				var className3="shishu_lv";
				if(s_dq_change<0){
					className="shishu_lv";
				}else{
					className="shishu_hong";
				}
				if(s_dq_change1<0){
					className1="shishu_lv";
				}else{
					className1="shishu_hong";
				}
				if(s_dq_change3<0){
					className3="shishu_lv";
				}else{
					className3="shishu_hong";
				}
				var zsname="上证指数";
				var zsname1="上证指数";
				var zsname3="上证指数";
				if(s_info_windcode=="000300.SH"){
					 zsname="沪深300";
				}else if(s_info_windcode=="399006.SZ"){
					 zsname="创业板指";
				}else if(s_info_windcode=="399001.SZ"){
					 zsname="深证成指";
				}else{
					 zsname="上证指数";
				}
				if(s_info_windcode1=="000300.SH"){
					 zsname1="沪深300";
				}else if(s_info_windcode1=="399006.SZ"){
					 zsname1="创业板指";
				}else if(s_info_windcode1=="399001.SZ"){
					 zsname1="深证成指";
				}else{
					 zsname1="上证指数";
				}
				if(s_info_windcode3=="000300.SH"){
					 zsname3="沪深300";
				}else if(s_info_windcode3=="399006.SZ"){
					 zsname3="创业板指";
				}else if(s_info_windcode3=="399001.SZ"){
					 zsname3="深证成指";
				}else{
					 zsname3="上证指数";
				}
				
			//};
				var gm_list_data1 = '<li><h2>'+zsname+'</h2><p class="'+className+'">'+formatData(s_dq_close)+'</p><span style="margin-right:5px;" class="'+className+'">'+formatData(s_dq_change)+'</span><span class="'+className+'">'+formatData(s_dq_pctchange)+'%</span></li>'+
				 '<li><h2>'+zsname3+'</h2><p class="'+className3+'">'+formatData(s_dq_close3)+'</p><span style="margin-right:5px;" class="'+className3+'">'+formatData(s_dq_change3)+'</span><span class="'+className3+'">'+formatData(s_dq_pctchange3)+'%</span></li>'+
				 '<li><h2>'+zsname1+'</h2><p class="'+className1+'">'+formatData(s_dq_close1)+'</p><span style="margin-right:5px;" class="'+className1+'">'+formatData(s_dq_change1)+'</span><span class="'+className1+'">'+formatData(s_dq_pctchange1)+'%</span></li>';
				$("#zhishu_list").append(gm_list_data1);		
              
			//
			
			}else{
				setErrorMsg(data1.retcode, data1.retmsg); //错误提示框
			};		
		},error:function(data2){
	    	hideloading();
			showAlert("服务器错误");     		
 	    }
});
};

//直接截取小数点后两位
function formatData(oldData){
	var arrNew="";	
	if(oldData&&oldData!=""&&oldData.length!=0){
    var arr=new Array();
	arr=oldData.toString().split(".");
	//console.log(arr[1]);
	arrNew+=arr[0]+".";
	arrNew+=arr[1].substring(0,2);
	return arrNew;
	}else{
		return oldData;
	}
}


//转换数据库日期
function dateTransform(oldDate){
   var resutl="";
   if(oldDate&&oldDate!=null&&oldDate.length!=0){
     resutl+=oldDate.substr(0,oldDate.length-4)+"-";
     resutl+=oldDate.substr(4,2)+"-";
     resutl+=oldDate.substr(6,7);
     return resutl;
   }
   else{
     return oldDate;
   }
 }