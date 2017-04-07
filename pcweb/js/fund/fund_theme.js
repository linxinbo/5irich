/**
 * Created by linxi on 2016/12/6.
 */
$(function(){
    //载入主题基金
    themes();


});


function themes(){
    $.ajax({
        type: "GET",
        //url: mainUrl + "pcweb/data/theme.json",//测试环境
        url: mainUrl + "data/theme.json",//生产环境
        dataType: "json",
        success: function (data) {
            $("#fund_theme").html("");
            var fundThemeHtml = '';
            $(data).each(function (i, n) {
                var imgurl = n.image;
                var linkurl = n.url;
                var title = n.title;
                fundThemeHtml += '<div class="theme"><h2>'+title+'</h2><a href="'+linkurl+'"><img src="../'+imgurl+'"></a><div class="hot_theme"><img src="../images/theme/hot_theme.png"></div></div>';
            });
            $("#fund_theme").append(fundThemeHtml);
        },
        error:function(data){
            $("#fund_theme").html("");
            var fundThemeHtml = '';
                fundThemeHtml += '<div class="theme"><h2>暂无主题基金</h2></div>';
            $("#fund_theme").append(fundThemeHtml);
        }
    });

};