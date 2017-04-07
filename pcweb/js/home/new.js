$(function(){
    $('.automatic-investment-details').on('click',function(){
        var dataNews = $(this).attr('data-news');
        var newsHref;
        if(dataNews == 1){
            newsHref = 'dataNews=3'
        }
        if(dataNews == 2){
            newsHref = 'dataNews=5'
        }
        if(dataNews == 3){
            newsHref = 'dataNews=4'
        }
        //window.location.href='../pcweb/news/news.html?' + newsHref;//测试环境
        window.location.href='../news/news.html?' + newsHref;//测试环境
    });
    //news
    var params = {
        "pxxh" : 3,
        "pageNum" : 1,
        "pageSize" : 5
    };
    showNews(params,'.home-news-point');
    params.pxxh = 5;
    showNews(params,'.home-news-new');
    params.pxxh = 4;
    showNews(params,'.home-news-media');
//资讯展示
    function showNews(params,newCont){
        $.get(mainUrl+'groupArt',params,function(data){
            //debug(data);
            var data = JSON.parse(data);
            if(data.retcode == '0000'){
                $(newCont).html('');
                $.each(data.data,function(index,element){
                    debug(element.name);
                    var newsPoint ='<a href="'+mainUrl+'getArtContent?artId='+element.objectId+'">'+element.name+'</a>';
                    $(newCont).append(newsPoint);
                });
            }else{
                showAlert("资讯信息获取失败！");
            }
        });
    }

});
