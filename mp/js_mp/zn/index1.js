/**
 * Created by d on 2016/6/10.
 */
$(document).ready(function () {
    var args = new getArgs();
    var select_da1 = args.select_da1;
    $(".tm_content li").each(function (i) {
        //
        i=i+1;
        $(this).children("a").click(function(){
            console.log(i);
            $(this).parent().siblings().children("a").removeClass("zn_line_btn1");
            $(this).addClass("zn_line_btn1");
            //$("#zn_step1").addClass("zn_btn1").attr("disabled",false);
            var select_name=$(this).parent().attr("data-name");
            console.log(select_name);
            var date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));
            $.cookie("select_da2", select_name, {
                path: '/',
                expires: date
            });
            window.location.href = "index2.html?select_da1=" + select_da1 + "&select_da2="+select_name+"";
        });
    });
    $("#zn_step1").click(function(){
        window.location.href = "../home.html";
    });

    $("#zn_step2").click(function(){
        window.location.href = "index.html?repeat=ok";
    });

});