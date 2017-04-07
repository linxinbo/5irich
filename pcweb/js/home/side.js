$(function(){



//头部菜单固定
    $(document).scroll(function(){
        if($(document).scrollTop() >= 65){
            $('#home-cheader').css({
                'background': '#fff',
                'position': 'fixed'
            })
        }
        if($(document).scrollTop() < 65){
            $('#home-cheader').css({
                'background': 'none',
                'position': 'absolute'
            })
        }
        if($(document).scrollTop() >= 540){
            $('#home-cheader').css({
                'box-shadow': '0 -1px 6px #bc8f4e'
            })
        }
        if($(document).scrollTop() < 540){
            $('#home-cheader').css({
                'box-shadow': 'none'
            })
        }
    });
    //getAccumulatedData
    $.get(mainUrl+'getAccumulatedData',function(data){
        debug(data);
        var data = JSON.parse(data);
        if(data.retcode == '0000'){
            $('.home-money strong').html('0');
            $('.home-person strong').html('0');
            $('.home-money strong').html((data.data.money/100000000).toFixed(2));
            $('.home-person strong').html((data.data.person/10000).toFixed(2));
        }
    });
    //图片移入移出效果
    $('.automatic-investment-img').on('mouseenter',function(){
        $(this).find('img').addClass('active');
    });
    $('.automatic-investment-img').on('mouseleave',function(){
        $(this).find('img').removeClass('active');
    });
    $('.customer-evaluation-img li').on('mouseenter',function(){
        $(this).find('.layer').show();
        $(this).find('.customer-evaluation-layer').addClass('active');
    });
    $('.customer-evaluation-img li').on('mouseleave',function(){
        $(this).find('.layer').hide();
        $(this).find('.customer-evaluation-layer').removeClass('active');
    });
});
