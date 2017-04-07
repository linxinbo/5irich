$(function(){
    var args = new getArgs();
    var ordername = args.ordername;
    var orderday = args.orderday;
    var lowest = args.lowest;
    var orderrate = decodeURIComponent(args.orderrate);
    $(".short_term_tt").html("创富宝——"+ordername);
    $(".orderday").html(orderday);
    $(".lowest").html(lowest+"万元");
    $(".orderrate").html(orderrate+"%");
    $(".short_tab li").click(function(){
        $(".short_tab li").removeClass("select1");
        $(this).addClass("select1");
        var index = $(this).index();
        if(index == 0){
            $(".table_data").show();
            $(".table_ques").hide();
        }else{
            $(".table_data").hide();
            $(".table_ques").show();
        }
    });
    $(".ordernow").click(function(){
        var username = $.cookie("username");
        if (username == "" || username == null || username == undefined || username == "null") {
            setErrorMsg(1001);
        } else {
            window.location.href = "../order_qifu/order_index.html";
        }
    })
})