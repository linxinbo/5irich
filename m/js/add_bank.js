$(document).ready(function () {
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
		$("#bankNo").focus(focusf);
		$("#bankNo").blur(blurf);
		$("#phone").focus(focusf);
		$("#phone").blur(blurf);
	})();
	
	
	$(".ysy_agree dt").click(function(){
		if($(this).hasClass("def")){
			$(this).removeClass("def").addClass("sele");
		}else{
			$(this).removeClass("sele").addClass("def");
		}
	});
	/*** 银行卡4位分隔 ***/
	$('#bankNo').keyup(function(){
		var value=$(this).val().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
		$(this).val(value)
	})
});




