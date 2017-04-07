$(document).ready(function(){
    $(".faq").click(function(){
		if(!$(this).children(".faq_a").is(':hidden')){
			$(this).children(".faq_a").hide();
			$(this).children(".li_t1").css("border-bottom","1px solid #DEDEDE");
			return;
		}
        $(this).children(".faq_a").show();
		$(this).siblings().children(".li_t1").removeAttr("style");
        $(this).children(".li_t1").css("border","0");
        $(this).siblings().children(".faq_a").hide();
    })
    $(".myMessages").click(function(){
    	//console.log($(this).find(".my_a_m_a").css("white-space"))
    	var openOrClose=$(this).find(".my_a_m_a").css("white-space");
    	var saveOrDel=$(this).find(".myMessageSigle").css("margin-left");
    	//if(saveOrDel!="-60"){}
    	if(openOrClose=="nowrap"){
    		$(this).find(".my_a_m_a").css({"height":"auto","white-space":"normal"});
    		var openOrCloseH=$(this).find(".myMessageSigle").height();
    		$(this).find(".li_arrow").addClass("li_arrow_tr");
    	}else{
    		$(this).find(".my_a_m_a").css({"height":"39px","white-space":"nowrap"});
    		var openOrCloseH=$(this).find(".myMessageSigle").height();
			$(this).find(".li_arrow").removeClass("li_arrow_tr");
    	}
        
    })
})

	