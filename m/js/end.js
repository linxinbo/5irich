$(document).ready(function () {
	<!-- 0118 s -->
	if(isUrl("end_index.html")){//高端存入首页
		setPullLoad(50,function(){
			alert("调用Ajax");	
		});
	<!-- 0118 e -->
	}else if(isUrl("end_save_confirm.html")){//高端存入确认页
		$(".ysy_agree dt").click(function(){
			if($(this).hasClass("def2")){
				$(this).removeClass("def2").addClass("sele2");
			}else{
				$(this).removeClass("sele2").addClass("def2");
			}
		});	
		$(".opaSelect").change(function(){
			var val = $(this).val();
			//$(this).prev("span").html(val);
			$(this).parent().children("span").html(val);
		});
		
	}else if(isUrl("end_draw_confirm.html")){//高端取现确认页
		$(".opaSelect").change(function(){
			var val = $(this).val();
			//$(this).prev("span").html(val);
			$(this).parent().children("span").html(val);
		});
	}
});