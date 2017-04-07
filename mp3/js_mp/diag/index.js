/**
 * Created by d on 2016/6/10.
 */
$(document).ready(function () {
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var args = new getArgs();
    var repeat = args.repeat;
    /*if (username == "" || username == null || username == undefined	|| username == "null") {

    } else {
        $.ajax({
            url : mainUrl + "queryRecord",
            data : "",
            dataType : "JSON",
            success : function(response) {
                console.log(response);
                if(response.retcode=="0000"){
                    var level=response.data.level;
                    if(repeat=="ok"){

                    }else{
                        window.location.href="zn_home.html?level="+level+"";
                    }
                }
            },
            error : function(response1) {
            showAlert("服务器错误！");
        }
    });

    }*/

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
               if(n.questionLocationPage==1){
                swiperHtml += "<li data-name='"+ n.id+"'><a class='zn_line_btn line"+i+"'><span>"+ n.answerContest+"</span></a></li>";
               }
            });
            $(".tm_content").append(swiperHtml);*/

            $(".tm_content li a").on("click",function(){
                $(this).parent().siblings().children().removeClass("zn_line_btn1");
                $(this).addClass("zn_line_btn1");
                //$("#zn_step1").addClass("zn_btn1").attr("disabled",false);
                var select_name=$(this).parent().attr("data-name");
                //console.log(select_name);
                var date = new Date();
                date.setTime(date.getTime() + (30 * 60 * 1000));
                $.cookie("select_da1", select_name, {
                    path: '/',
                    expires: date
                });
                window.location.href = "index1.html?select_da1=" + select_name + "";
            });
        /*},
        error : function(response1) {
            showAlert("服务器错误！");
        }
    });
*/
    /*$("#zn_step1").click(function(){
        window.location.href = "../home.html";
    });*/
});
