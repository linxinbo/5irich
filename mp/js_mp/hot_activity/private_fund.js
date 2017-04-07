/**
 * Created by d on 2016/6/10.
 */
$(function(){
    load_private_fund();
    z_back();
});
function load_private_fund(){
    showLoading();
    $.ajax({
        type: 'post',
        url: mainUrl + "mp/data_mp/private.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".private_fund").html("");
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
            $(".private_fund").append(swiperHtml);
        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });



};