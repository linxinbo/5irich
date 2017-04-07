$(function(){
    //轮播图
    $('.carousel').carousel();

    //$.get('../pcweb/data/banners.json',function(data){//测试环境
    $.get('data/banners.json',function(data){//生产环境
        //var data = JSON.parse(data);
        debug(typeof data);
        var carouselIndicators = '<li data-target="#myCarousel" data-slide-to="0" class="active" ></li>';
        var carouselInner = null;
        var arrImage = [];
        $('.carousel-indicators').append(carouselIndicators);
        $.each(data,function(index,ele){
            arrImage.push(ele.image);
            carouselIndicators = '<li data-target="#myCarousel" data-slide-to='+(index+1)+'></li>';
            carouselInner = '<div class="item" style="background-image: url('+ele.image+')"><a href='+ele.url+' class="carousel-lay"></a></div>';
            $('.carousel-indicators').append(carouselIndicators);
            $('.carousel-inner').append(carouselInner);
        });
        $('.carousel-indicators li').on('mouseenter',function(){
            var dataIndex = Number($(this).attr('data-slide-to'));
            console.log(dataIndex);
            $("#myCarousel").carousel(dataIndex)
        });
    });
});
