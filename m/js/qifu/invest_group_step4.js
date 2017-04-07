
$(document).ready(function () {
	
	//从url中截取组合代码
	var args = new getArgs();
	var mainplanno = args.mainplanno;
	var firstinvestdate = args.firstinvestdate;
	$('#mainplanno').html(mainplanno);
	$('#firstinvestdate').html(firstinvestdate);
	
});


