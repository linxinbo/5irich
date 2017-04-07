/**
 * Created by d on 2016/4/24.
 */
//首页图片展示区域
$(function(){
    $(".head_sreach_hd").click(function(){
        window.location.href="../search/search.html";
    });
    console.log($.cookie("sourceId"));
});

function load_gg(){
    showLoading();
    $.ajax({
        type: 'post',
        url: mainUrl + "mp/data_mp/banners.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".swiper-wrapper").html("");
        },
        success: function (data) {
            hideloading();
            var swiperHtml = '';
            console.log(data);
            $(data).each(function (i, n) {
                var imgurl = n.image;
                var linkurl = n.url;
                swiperHtml += "<div class='swiper-slide'><a href='../"+linkurl+"'><img src='../"+imgurl+"'></a></div>";
            });
            $(".swiper-wrapper").append(swiperHtml);

        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });
};



