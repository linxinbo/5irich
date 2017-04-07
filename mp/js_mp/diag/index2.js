/**
 * Created by d on 2016/6/10.
 */
$(document).ready(function () {
    var args = new getArgs();
    var select_da1 = args.select_da1;
    var select_da2 = args.select_da2;

   /* $.ajax({
        type: "GET",
        url : mainUrlNew + "QuestionQueryMVC.mvc",
        data : "",
        dataType : "JSON",
        success : function(response) {
            console.log(response);
            $(".tm_content").html("");
            var swiperHtml = '';
            $(response).each(function (i, n) {
                var j=i-8;
                if(n.questionLocationPage==3){
                    swiperHtml += "<li data-name='"+ n.id+"'><a class='zn_line_btn line"+j+"'><span>"+ n.answerContest+"</span></a></li>";
                }
            });
            $(".tm_content").append(swiperHtml);*/

            $(".tm_content li a").click(function(){
                $(this).parent().siblings().children().removeClass("zn_line_btn1");
                $(this).addClass("zn_line_btn1");
                //$("#zn_step1").addClass("zn_btn1").attr("disabled",false);
                var select_name=$(this).parent().attr("data-name");
                console.log(select_name);
                var date = new Date();
                date.setTime(date.getTime() + (30 * 60 * 1000));
                $.cookie("select_da3", select_name, {
                    path: '/',
                    expires: date
                });
                window.location.href = "index3.html?select_da1=" + select_da1 + "&select_da2="+select_da2+"&select_da3="+select_name+"";
            });
       /* },
        error : function(response1) {
            showAlert("服务器错误！");
        }
    });*/

    $("#zn_step1").click(function(){
        window.location.href = "../home.html";
    });

    $("#zn_step2").click(function(){
        window.location.href = "index1.html";
    });
});