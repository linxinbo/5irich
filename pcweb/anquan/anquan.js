/**
 * Created by dell on 2016/12/29.
 */
/**
 * Created by dell on 2016/12/28.
 */
$(document).ready(function(){
    $(".menu1 ul li").eq(0).css({background:"#ff9900",color:"#fff"});
    $(".menu1 ul li").hover(function() {
        $(this).css({background:"#ff9900",color:"#fff"});
    }, function() {
        $(this).css({background:"#fff",color:"#000"});
    });
    var mark = 1;
    $(".menu1 ul li").click(function() {
        mark = 2; //改变标记
        $(".menu1 ul li").css({background:"#fff",color:"#000"});

        $(this).css({background:"#ff9900",color:"#fff"});
        //$(".menu1 ul li").css({background:"#fff",color:"#000"});
        var $index = $(this).index(); //找到了对应的序列号
        var $top = $("#main .floor").eq($index).offset().top; //获取制定Floor与浏览器上面的距离
        $("body,html").animate({
            scrollTop: $top//设置距离顶端的滚动距离
        }, 500, function() {
            mark = 1;
        }); //浏览器滚动的高度
    });
    $(window).scroll(function() {
        if(mark==1){
            var $t = $(this).scrollTop(); //获取距离顶端的滚动距离

            var $obj = $("#main .floor");
            $obj.each(function(index,item) {

                var $height = $(this).offset().top + $(this).height()/2;

                if ($t < $height) {
                    $(".menu1 ul li").css({background:"#fff",color:"#000"});
                    $(".menu1 ul li").eq(index).css({background:"#ff9900",color:"#fff"});
                    return false;
                }
            });
        }


    });
})