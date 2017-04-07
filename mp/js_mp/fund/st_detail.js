$(function(){
	console.log(1);
    var args = new getArgs();
    var ordername = args.ordername;
    var orderday = args.orderday;
    var lowest = args.lowest;
    var orderrate = decodeURIComponent(args.orderrate);
    $(".jy_header_name").html("创富宝——"+ordername);
    $(".jy_days").html(orderday);
    $(".jy_money").html(lowest+"万元");
    $(".jy_orderrate").html(orderrate+"%");
    $(".jy__contentName").html(ordername+orderday);
    
    $(".jy__content_ul li").click(function(){
        $(".jy__content_ul li").removeClass("jy__content_white");
        $(this).addClass("jy__content_white");
        var index = $(this).index();
        if(index == 0){
            $(".jy__content_font").show();
            $(".jy__content_question").hide();
        }else{
            $(".jy__content_font").hide();
            $(".jy__content_question").show();
        }
    });
    $(".jy_yuyue").click(function(){
        var username = $.cookie("username");
        if (username == "" || username == null || username == undefined || username == "null") {
            setErrorMsg(1001);
        } else {
            window.location.href = "order.html";
        }
    })
})