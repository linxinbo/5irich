/**
 * Created by d on 2016/6/11.
 */
$(function(){
    load_hot_activity();
    z_back();
});
function load_hot_activity(){
    showLoading();
    $.ajax({
        type: 'post',
        url: mainUrl + "mp/data_mp/hot_activity.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".hot_activity").html("");
        },
        success: function (data) {
            hideloading();
            var swiperHtml = '';
            console.log(data);
            $(data).each(function (i, n) {
                var title= n.title;
                var imgurl = n.image;
                var linkurl = n.url;
                var state = n.state;
                swiperHtml += "<div class='huodong'><a href='"+linkurl+"'><img class='tupian' src='"+imgurl+"' alt='"+title+"'/></a></div>";
            });
            $(".hot_activity").append(swiperHtml);
        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });



};