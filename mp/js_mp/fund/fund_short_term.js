$(function () {
    var hash = window.location.hash;
    if (hash == "#5" || hash == "") {
        window.location.hash = "5";
        $(".money_5").addClass("qianshu_active");
        
    } else if (hash == "#20") {
        window.location.hash = "20";
        $(".money_20").addClass("qianshu_active");
    } else {
        window.location.hash = "100";
        $(".money_100").addClass("qianshu_active");
    }
    $(".money_5").click(function () {
        $(".qianshu li").removeClass("qianshu_active");
        $(this).addClass("qianshu_active");
        window.location.hash = "5";
        load_5();
    });
    $(".money_20").click(function () {
        $(".qianshu li").removeClass("qianshu_active");
        $(this).addClass("qianshu_active");
        window.location.hash = "20";
        load_20();
    });
    $(".money_100").click(function () {
        $(".qianshu li").removeClass("qianshu_active");
        $(this).addClass("qianshu_active");
        window.location.hash = "100";
        load_100();
    });
    
    
});