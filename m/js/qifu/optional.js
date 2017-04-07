$(function(){
    $(".opt_edit").click(function(){
        $(this).hide();
        $(".opt_cancel").show();
        $(".opt_choose").show();
        $(".table_header").addClass("table_header_add");
        $(".table_data_par").hide();
        $(".go-buy").hide();
        $(".option_data ul li").addClass("change_1");
        $(".foot_del").show();
    });
    $(".opt_cancel").click(function(){
        $(this).hide();
        $(".opt_edit").show();
        $(".opt_choose").hide();
        $(".table_header").removeClass("table_header_add");
        $(".table_data_par").show();
        $(".go-buy").show();
        $(".option_data ul li").removeClass("change_1");
        $(".foot_del").hide();
        $(".opt_choose").removeClass("change_sel");
    });
    $("#checkboxDiv input[type='checkbox']").click(function(){
        var val = $(this).val();
        var length = $(".option_data ul li").size();
        if(val==0){
            $(this).addClass("change_sel");
            $(this).attr("value","1");
        }else{
            $(this).removeClass("change_sel");
            $(this).attr("value","0");
        }
        sum();
    });

})
//计数
function sum(){
    var sum = ($("input[value='1']").length);
    if(sum>0){
        $(".selected").html("已选中"+sum+"个");
        $(".choose_del").addClass("choose_delete");
    }else{
		        $(".selected").html("已选中0个");
        $(".choose_del").removeClass("choose_delete");
    }    
}