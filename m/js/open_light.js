$(document).ready(function(){
	(function(){
		function focusf(){
			$(this).parent().prevAll("i").show();
		}
		function blurf(){
			var cardNo = $(this).val();
			if(cardNo==""){
				$(this).parent().prevAll("i").hide();		
			}
		}
		$("#oldPW").focus(focusf);
		$("#oldPW").blur(blurf);
        $("#PW1").focus(focusf);
		$("#PW1").blur(blurf);
		$("#newPW1").focus(focusf);
		$("#newPW1").blur(blurf);
		$("#newPW2").focus(focusf);
		$("#newPW2").blur(blurf);
        $("#phone_num").focus(focusf);
		$("#phone_num").blur(blurf);
        $("#user_ID").focus(focusf);
		$("#user_ID").blur(blurf);
        $("#user_name").focus(focusf);
		$("#user_name").blur(blurf);
		
		$("i[data_rest=ID_rest]").click(function(){
			$(this).parent().find("#oldPW").val("");
            $(this).parent().find("#PW1").val("");
			$(this).parent().find("#newPW1").val("");
			$(this).parent().find("#newPW2").val("");
            $(this).parent().find("#phone_num").val("");
            $(this).parent().find("#user_ID").val("");
            $(this).parent().find("#user_name").val("");
			$(this).hide();
		})
		
	})();
	
	$("#openLight").click(function(){
		var openCloseLight=$(this).find(".i_open_light").attr("class");
		if(openCloseLight!="i_open_light"){
			$(this).find(".i_open_o").css("margin-left","20px");
			$(this).find(".i_open_light").removeClass("i_close_light");
		}else{
			$(this).find(".i_open_o").css("margin-left","0");
			$(this).find(".i_open_light").addClass("i_close_light");
		}
	})
	$("#u_openLight").click(function(){
		showPwdConfirm();	
	});
	
})

