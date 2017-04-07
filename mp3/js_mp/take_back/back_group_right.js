$(document).ready(function(){
	var args = new getArgs();
	var fundgroupname = args.fundgroupname;
	var fundgroupcode = args.fundgroupcode;
	$(".t_name>span").html(fundgroupname);
	$(".t_count>span").html(fundgroupcode);
})