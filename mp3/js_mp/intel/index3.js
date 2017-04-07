/**
 * Created by d on 2016/6/10.
 */
$(document).ready(function () {
    var args = new getArgs();
    var select_da1 = args.select_da1;
    var select_da2 = args.select_da2;
    var select_da3 = args.select_da3;
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
                var j=i-12;
                var answerContest= n.answerContest.split("，");
                if(n.questionLocationPage==4){
                    swiperHtml += "<li data-name='"+ n.id+"'><a class='zn_line_btn line"+j+"'><span>"+ answerContest[0]+"<br>"+answerContest[1]+"</span></a></li>";
                }
            });
            $(".tm_content").append(swiperHtml);*/

            $(".tm_content li a").click(function(){
                var classname=$(this).children().attr("class");
                $(this).children().addClass(classname+"1");
                //$(this).parent().siblings().children("a").removeClass("zn_line_btn1");
                //$(this).addClass("zn_line_btn1");
                var select_name=$(this).parent().attr("data-name");
                //console.log(select_name);
                var date = new Date();
                date.setTime(date.getTime() + (30 * 60 * 1000));
                $.cookie("select_da4", select_name, {
                    path: '/',
                    expires: date
                });
                setTimeout(function(){
                    window.location.href = "index4.html?select_da1=" + select_da1 + "&select_da2="+select_da2+"&select_da3="+select_da3+"&select_da4="+select_name+"";
                },600);

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
        window.location.href = "index2.html";
    });

});