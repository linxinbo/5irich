$(function(){
	//登录前首页
	if(isUrl("index-before.html")){
		/* 初始化图片轮播 start */
		$('#slides').slidesjs({
        width: window.innerWidth,
        height: 50,
        navigation: false,
        play: {
            active: false,
            auto: true,
            interval: 4000,
            swap: true
        }
      });
	  //点击图片事件
	  $(".slidesjs-control img").click(function(){
		 alert($(this).attr("data-id")); 
	  });
	  /* 初始化图片轮播 end */
	}else if(isUrl("index-after.html")){//登录后首页
		$(".hint marquee").click(function(){
			showAlert("12月29日09:00至1月5日09:00，增值宝快速取现快来体验吧。",function(){
				alert("ok");	
			});
			/*showConfirm("xxx", function(){
				alert("确定");	
			}, "title", null);*/
		});
	}
});