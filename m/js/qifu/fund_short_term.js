$(function () {
    var hash = window.location.hash;
    if (hash == "#5" || hash == "") {
        window.location.hash = "5";
        $(".money_1").addClass("select");
        $(".des_time_1").show();
        $(".des_time_20").hide();
        $(".des_time_100").hide();
    } else if (hash == "#20") {
        window.location.hash = "20";
        $(".money_20").addClass("select");
        $(".des_time_20").show();
        $(".des_time_1").hide();
        $(".des_time_100").hide();
    } else {
        window.location.hash = "100";
        $(".money_100").addClass("select");
        $(".des_time_100").show();
        $(".des_time_20").hide();
        $(".des_time_1").hide();
    }
    $(".money_1").click(function () {
        $(".short_term_nav li").removeClass("select");
        $(this).addClass("select");
        $(".des_time_1").show();
        $(".des_time_20").hide();
        $(".des_time_100").hide();
        window.location.hash = "5";
    });
    $(".money_20").click(function () {
        $(".short_term_nav li").removeClass("select");
        $(this).addClass("select");
        $(".des_time_1").hide();
        $(".des_time_20").show();
        $(".des_time_100").hide();
        window.location.hash = "20";
    });
    $(".money_100").click(function () {
        $(".short_term_nav li").removeClass("select");
        $(this).addClass("select");
        $(".des_time_1").hide();
        $(".des_time_20").hide();
        $(".des_time_100").show();
        window.location.hash = "100";
    });
    $(".tt_bespeak").click(function () {
        var username = $.cookie("username");
        if (username == "" || username == null || username == undefined || username == "null") {
            setErrorMsg(1001);
        } else {
            window.location.href = "../order_qifu/order_index.html";
        }
    })
    $(".tit_1 span").click(function(){
        var ordername = $(this).text();
        var orderday = $(this).parent().parent().find(".tt_top").text();
        var length1 = $(this).parent().parent().find(".tt_percent_1").text().length;
        var orderrate =$(this).parent().parent().find(".tt_percent_1").text().substring(0,length1-1);
        var length2 = window.location.hash.length;
        var lowest = window.location.hash.substring(1,length2);
        window.location.href = "../funds_qifu/fund_short_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
    })
});