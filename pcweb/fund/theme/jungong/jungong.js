/**
 * Created by dell on 2017/1/3.
 */
$(".jg_tableName").off("mouseover").on("mouseover",function(){
    $(this).css({cursor:"pointer"});
})
$(".jg_tableName").click(function(){

    var id=$(this).siblings(".id").html()+".OF";
    var name=$(this).html();
    var type=$(this).attr("type");
    window.location.href="../../fund-detail.html?fundid="+id+"&fundname="+name+"&type="+type;//跳转到详情页
})