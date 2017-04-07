/**
 * Created by d on 2016/6/10.
 */
$(document).ready(function () {
    var args = new getArgs();
    var select_da1 = args.select_da1;
    var select_da2 = args.select_da2;
    var select_da3 = args.select_da3;
    $(".tm_content li").each(function (i) {
        $(this).children("a").click(function(){
            $(this).parent().siblings().children("a").removeClass("zn_line_btn1");
            $(this).addClass("zn_line_btn1");
            var select_name=$(this).parent().attr("data-name");
            //console.log(select_name);
            var date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));
            $.cookie("select_da4", select_name, {
                path: '/',
                expires: date
            });
            window.location.href = "index4.html?select_da1=" + select_da1 + "&select_da2="+select_da2+"&select_da3="+select_da3+"&select_da4="+select_name+"";

        });
    });
    $("#zn_step1").click(function(){
        window.location.href = "../home.html";
    });

    $("#zn_step2").click(function(){
        window.location.href = "index2.html";
    });

});