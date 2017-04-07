$(function(){
	 if(isUrl("draw_index.html")){//全功能基金取现首页
		$(".save_payChannel li").click(function(){
			$(this).addClass("select");
			$(this).siblings().removeClass("select");
			var date_c=$(this).attr("data_c");
			if(date_c=="1"){
				$(".money_balance").show();
				$(".money_transfer").hide();
				$(".deposit_type  li[data_c='1']").hide();
				$(".deposit_type  li[data_c='2'").addClass("select");
				$(this).parents("li").next("li").hide();	
			}else if(date_c=="2"){
				$(".money_balance").hide();
				$(".money_transfer").hide();
				$(".deposit_type  li[data_c='1']").show();
				/*  0201 start  */
				$(".deposit_type  li[data_c='1']").addClass("select");
				$(".deposit_type  li[data_c='2']").removeClass("select");
				/*  0201 end  */
				$(this).parents("li").next("li").show();
			}
		});
		
		$(".deposit_type li").click(function(){
			$(this).addClass("select");
			$(this).siblings().removeClass("select");
			var date_c=$(this).attr("data_c");
			if(date_c=="1"){
				$(".data_way_2").hide();
				$(".date_tip").hide();
			}else if(date_c=="2"){
				$(".data_way_2").show();
				
				if ($("#saveCycle").val() == "一月"){
					$(".date_tip").show();
				}
			}
		});
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
	}
});