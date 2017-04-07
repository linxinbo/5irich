/**
 * Created by d on 2016/6/10.
 */
$(function(){
    load_hot_fund();
    z_back();
    $(".ty_sreach_as").click(function(){
        window.location.href="../search/search.html";
    });
});
function load_hot_fund(){
    showLoading();
    $.ajax({
        type: 'get',
        url: mainUrl + "mp/data_mp/hot_fund.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".hot_fund").html("");
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
                var classname="hot";
                if(state=="火热进行中"){
                    var classname="hot";
                }else{
                    var classname="over";
                }
                var date1 = n.date;
                swiperHtml += "<div class='huodong menddd'><h2 class='mendd'>"+title+"</h2><a href='"+linkurl+"'><img class='tupian' src='"+imgurl+"' alt='"+title+"'/></a><i class='"+classname+"'></i></div>";
            });
            $(".hot_fund").append(swiperHtml);
        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });



};