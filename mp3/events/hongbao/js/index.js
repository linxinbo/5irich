(function(){
    $('.con_reg').on('touchstart',function(){
        window.location.href = mainUrl+"mp/login.html";
    });
    $('.con_tj').on('touchstart',function(){
        var userName = $.cookie('username');
        if(userName == "" || userName == null || userName == "undefined" || userName == undefined){
            window.location.href = mainUrl+"mp/login.html";
        }else{
        	var userOpen = $.cookie('useropen');
            var url="http://www.5irich.com/mp/sigin/sigin.html?phone="+userOpen;
            $('.tipLayer').css('height',$('.tuijian').css('height')).show();
            $('.con_copyTip').show();
            $('.con_copyTip #copy_text').val(url);
        }
    });
    $('#tuijian_txt').on('touchstart',function(){
        $('.layer').css({
        	'top':$(window).height(),
        	'height': $('.tuijian').css('height')
        }).show();
        $('.layer').animate({'top':0},1000);
        $('.lay_main').css('top',$(window).height()).show();
        $('.lay_main').animate({'top':0},1000);
    });
    $('.lay_close').on('touchstart',function(){
        $('.layer').animate({'top':$(window).height()},1000,function(){
            $(this).hide();
        });
        $('.lay_main').animate({'top':$(window).height()},1000,function(){
            $(this).hide();
        });
    });
    $('.lay_tipClose').on('touchstart',function(){
        $('.tipLayer').hide();
        $('.con_copyTip').hide();
    });
})();