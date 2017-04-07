$(document).ready(function () {
	//页头智能组合   智能定投切换
	z_back();
	$(".group_dingtou").hide();
	$(".yuanli").hide();
	$(".gr_active a").click(function(){
		$(".gr_active a").removeClass("active");
		$(this).addClass("active");
		var expandId = $(this).attr("data-expand");
			if (expandId == 0) {
				$(".group_zuhe").show();
				$(".group_dingtou").hide();
			} else if (expandId == 1) {
				$(".group_zuhe").hide();
				$(".group_dingtou").show();
			}
	})
	//配置法则      组合原理切换
	$(".group_faze").click(function(){
		$(".group_faze").addClass("h2_white");
		$(this).removeClass("h2_white");
		var expandId1 = $(this).attr("data-expand1");
			if (expandId1 == 0) {
				$(".faze").show();
				$(".yuanli").hide();
			} else if (expandId1 == 1) {
				$(".faze").hide();
				$(".yuanli").show();
			}
	})
	
	
	
	
	
})