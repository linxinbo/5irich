$(document).ready(function(){
	var args = new getArgs();
	var fundname = args.fundname;
	var back_count = args.back_count;
	$(".t_name>span").html(fundname);
	$(".t_count>span").html(back_count);
})