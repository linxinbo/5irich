/**
 * Created by CJQF on 2016/9/5.
 */
$(function() {
    var args = new getArgs();
    var rank = args.rank;
    var dlevel = args.dlevel;
    var plevel = args.plevel;
    var rank_s = args.rank_s;
    var rank_s1 = rank_s.substring(1);
    var asset = args.asset;
    var code = args.code;
    $("#grade_s span").html("");
    $("#grade_s span,.diag_grade1_span1").append(rank);
    $(".diag_grade1_span2").append(rank_s1);
    if(dlevel=="大于"){
        $("#grade_s img").attr("src","../images_mp/diag/diag_grade2.png");
    }else if(dlevel=="小于"){
        $("#grade_s img").attr("src","../images_mp/diag/diag_grade.png");
    }else {
        $("#grade_s img").attr("src","../images_mp/diag/diag_grade1.png");
    }
    if(plevel=="远大于"){
        $("#grade_x img").attr("src","../images_mp/diag/result_table5.png");

    }else if(plevel=="大于"){
        $("#grade_x img").attr("src","../images_mp/diag/result_table4.png");
    }else if(plevel=="等于"){
        $("#grade_x img").attr("src","../images_mp/diag/result_table3.png");
    }else if(plevel=="远小于"){
        $("#grade_x img").attr("src","../images_mp/diag/result_table2.png");
    }else {
        $("#grade_x img").attr("src","../images_mp/diag/result_table1.png");
    }
    $(".diag_grade1_span3").append(plevel);

    $(".diag_btn1").click(function(){
        window.location.href = "zn_home.html?rank=" + rank_s + "&asset="+asset+"&code="+code+"";
    });

});