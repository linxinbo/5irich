/**
 * Created by CJQF on 2016/10/12.
 */
$(function(){
    var args = new getArgs();
    var select_da1 = args.select_da1;
    var select_da2 = args.select_da2;
    var select_da3 = args.select_da3;
    var select_da4 = args.select_da4;
    var select_da5 = args.select_da5;


    if (select_da1 == undefined || select_da2 == undefined || select_da3 == undefined || select_da4 == undefined || select_da5 == undefined) {
        showAlert("问卷调查没有完成！");
        //return;
    } else {
        var allSelect = select_da1.toUpperCase()+ select_da2.toUpperCase()+select_da3.toUpperCase()+select_da4.toUpperCase()+select_da5.toUpperCase();
        var params1 = {
            "result": allSelect,
        };
        show_result(select_da1,select_da2,select_da3,select_da4,select_da5);
        showLoading();
        //console.log(params1);
        $.ajax({
            url: mainUrl + "riskRating",
            data: params1,
            dataType: "JSON",
            success: function (response) {
                hideloading();
                //console.log(response);
                if (response) {
                    var level = response.retmsg;

                    $(".diag_pd_title").html("");
                    $(".diag_pd_title").append("您的风险评级结果为 "+level.substring(1)+" 级");
                    var levelnew=level.substring(1);
                    if(levelnew=="1"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_11.png");
                    }else if(levelnew=="2"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_22.png");
                    }else if(levelnew=="3"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_33.png");
                    }else if(levelnew=="4"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_44.png");
                    }else if(levelnew=="5"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_55.png");
                    }else if(levelnew=="6"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_66.png");
                    }else if(levelnew=="7"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_77.png");
                    }else if(levelnew=="8"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_88.png");
                    }else if(levelnew=="9"){
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_99.png");
                    }else {
                        $("#grade_s img").attr("src","../images_mp/diag/icon_grade_100.png");
                    }
                    $('#btn_news').on('click', function () {
                        window.location.href = "zn_home.html?level=" + level + "";


                    });

                    $('#btn_news1').on('click', function () {
                        window.location.href = "diag.html?select_da1=" + select_da1 + "&select_da2="+select_da2+"&select_da3="+select_da3+"&select_da4="+select_da4+"&select_da5="+select_da5+"";
                    });
                }

            },
            error: function (response1) {
                showAlert("服务器错误！");
            }

        });
    }






});


function show_result(select_da1,select_da2,select_da3,select_da4,select_da5){
    var select_da11=1+select_da1;
    var select_da22=2+select_da2;
    var select_da33=3+select_da3;
    var select_da44=4+select_da4;
    var select_da55=5+select_da5;
    var show_result1;
    var show_result2;
    var show_result3;
    var show_result4;
    var show_result5;
    //console.log(select_da55);
    $.ajax({
        type: 'get',
        url: mainUrl + "mp/data_mp/result.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".diag_pd1").html("");
        },
        success: function (data) {
            hideloading();
            var swiperHtml = '';
            //console.log(data);


            $(data).each(function (i, n) {
                if(select_da11== n.id){
                    show_result1= n.result;
                }else if(select_da22==n.id){
                    show_result2= n.result;
                }else if(select_da33== n.id){
                    show_result3= n.result;
                }else if(select_da44== n.id){
                    show_result4= n.result;
                }else if(select_da55== n.id){
                    show_result5= n.result;
                }
            });

            swiperHtml = "<span>"+show_result1+"<br><br>"+show_result2+"<br><br>"+show_result3+"<br><br>"+show_result4+"<br><br>"+show_result5+"</span>";
            //console.log(swiperHtml);
            $(".diag_pd1").append(swiperHtml);
        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });

};