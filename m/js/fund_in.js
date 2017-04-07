$(document).ready(function () {
	$("header .back").click(function(){
		window.history.go(-1);	
	});
	
	if(isUrl("draw_index.html")){//取现首页
		$(".save_way li").click(function(){
			$(this).addClass("select");
			$(this).siblings().removeClass("select");
			var date_c=$(this).attr("data_c");
			var dataName=$(this).attr("data_name");
			if(date_c=="2"){
				$(".data_way_3").hide();
				if(dataName!="" && dataName!=undefined && dataName!=null){
					//$(".button_a").attr("href",dataName+"_confirm_com.html")
				}
			}else if(date_c=="3"){
				$(".data_way_3").show();
				if(dataName!=""){
					//$(".button_a").attr("href",dataName+"_confirm_date.html")
				}
			}else{
				$(".data_way_3").hide();
			}
			$("#calendarIpt").click(function(){
				$('.ui-slideup-wrap').show();
			});
			$(".data_way_3 .bank_account").click(function(){
				$('.ui-slideup-wrap').show();
			});
		});
		//日历控件
		initCalendar();
	}else if(isUrl("save_index.html")){//存入首页
		$(".save_way li").click(function(){
			$(this).addClass("select");
			$(this).siblings().removeClass("select");
			var date_c=$(this).attr("data_c");
			var dataName=$(this).attr("data_name");
			if(date_c=="2"){
				$(".data_way_2").show();
				$(".data_way_3").hide();
				if(dataName!="" && dataName!=undefined && dataName!=null){
					//$(".button_a").attr("href",dataName+"_confirm_com.html")
				}
				if ($("#saveCycle").val() == "一月"){
					$(".date_tip").show();
				}
			}else if(date_c=="3"){
				$(".data_way_3").show();
				$(".data_way_2").hide();
				$(".date_tip").hide();
				if(dataName!=""){
					//$(".button_a").attr("href",dataName+"_confirm_date.html")
				}
			}else{
				$(".data_way_3").hide();
				$(".data_way_2").hide();
				$(".date_tip").hide();
			}
			$("#calendarIpt").click(function(){
				$('.ui-slideup-wrap').show();
			});
			$(".data_way_3 .bank_account").click(function(){
				$('.ui-slideup-wrap').show();
			});
		});
		//日历控件
		initCalendar();	
	}
	
	$(".opaSelect").change(function(){
		var val = $(this).val();
		//$(this).prev("span").html(val);
		$(this).parent().children("span").html(val);
	});
	//选择时间匹配
	
	$("#saveCycle").change(function(){
		var saveCycle = $("#saveCycle").val();
		if (saveCycle == "一月")
		{
			$("#saveWeek").hide();
			$("#saveDay").show();
			$("#saveWeek").parent().children("span").html("01");
			$(".date_tip").show();
		}else
		{
			$("#saveWeek").show();
			$("#saveDay").hide();
			$("#saveDay").parent().children("span").html("周一");
			$(".date_tip").hide();
		}
	});
	//取现金额判断，提示
	$("#drawBtn").click(function(){
		var accountNO=$("#accountNO").find("b").html();
		var drawMoneyNum=$("#drawMoneyNum").val();
		accountNO=Number(accountNO);
		drawMoneyNum=Number(drawMoneyNum);
		console.log(drawMoneyNum+"---"+accountNO);
		if(drawMoneyNum=="" || drawMoneyNum=="0" || drawMoneyNum==null){
			$("#drawNOerror").html("取现金额不能为0").show();
		}else if(drawMoneyNum>accountNO){
			$("#drawNOerror").html("您输入的金额大于总额").show();
		}else{
			location.href="draw_confirm_now.html";
		}
	});
	$("#drawMoneyNum").focus(function(){
		$("#drawNOerror").hide();
	});
});
   	//时间控件
function initCalendar(){
	var seleDate = null;
    var date = new Date();
   
	//初始化日历控件
    var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var currDateStr = startDate.format("yyyy-MM-dd");
    $('#calendar').calendar({
		swipeable : true,
		minDate: new Date(date.getFullYear(), date.getMonth(), date.getDate())
	});
	//添加日历选中事件
	$('#calendar').select(function(e,date,dateStr){
		seleDate = dateStr;
	});
	//点击"确定"按钮事件
	$(".calendarBox .ok-btn").click(function(){
		!seleDate?seleDate = currDateStr:"";
		$('.ui-slideup-wrap').hide();
		$("#calendarIpt").val(seleDate);
	});
	//点击"取消"按钮事件
	$(".calendarBox .no-btn").click(function(){
		$('.ui-slideup-wrap').hide();
	});
}

/*
//定期下拉框关联
function regularSeleChange(){
	var val = $(this).val();
	var text = $("#regularSele option").not(function(){ return !this.selected }).text();
	$(this).prev("span").html(text);	
	$("#start_saveSele").empty();
	if(val == "0"){
		var curDay = new Date().getDate();
		for(var i=curDay;i<=28;i++){
			$("#start_saveSele").append("<option value='"+i+"'>"+i+"</option>");
		}
	}else if(val == "1" || val == "2"){
		var week = ["周一","周二","周三","周四","周五"]
		for(var i=0;i<week.length;i++){
			$("#start_saveSele").append("<option value='"+i+"'>"+week[i]+"</option>");
		}
	}
}

$("#regularSele").change(regularSeleChange);
$("#start_saveSele").change(function(){
	var text = $("#start_saveSele option").not(function(){ return !this.selected }).text();
	$(this).prev("span").html(text);	
});
$("#start_saveSele").empty();
var curDay = new Date().getDate();
for(var i=curDay;i<=28;i++){
	$("#start_saveSele").append("<option value='"+i+"'>"+i+"</option>");
}*/