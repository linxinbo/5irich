var newsNum;
var pageTotal;
$(function () {
    var pxxh = 5;
    if(getArgs().dataNews){
        pxxh = getArgs().dataNews;
    }
    if (pxxh == 3) {
        newsNum = 2;
    }
    if (pxxh == 4) {
        newsNum = 1;
    }
    if (pxxh == 5) {
        newsNum = 0;
    }
    toChange();
    $('.news-head li').on('click',function(index){
        newsNum = $(this).index();
        if (newsNum == 0) {
            pxxh = 5;
        }
        if (newsNum == 1) {
            pxxh = 4;
        }
        if (newsNum == 2) {
            pxxh = 3;
        }
        toChange();
    });
    function showLists(page) {
        $('.news-list').html('');
        var params = {
            "pxxh": pxxh,
            "pageNum": page,
            "pageSize": 8
        };
        $.get(mainUrl + 'groupArt', params, function (data) {
            debug(data);
            var data = JSON.parse(data);
            if (data.retcode == '0000') {
                $.each(data.data, function (index, element) {
                    debug(element.name);
                    var newsPoint = '<li class="clearfix"><a class="news-h4 newsPath" href="'+mainUrl+'getArtContent?artId='+element.objectId+'">' + element.name + '</a>';
                    newsPoint += '<span class="news-date">' + element.createTime.substring(0,10) + '</span></li>';
                    $('.news-list').append(newsPoint);

                });
            }else{
                showAlert("资讯信息获取失败！");
            }
        });
    }
    function showNews(params) {
        $.get(mainUrl + 'groupArt', params, function (data) {
            debug(data);
            var data = JSON.parse(data);
            if (data.retcode == '0000') {
                pageTotal = Math.floor(data.total/8);
                $('.news-list').html('');
                $.each(data.data, function (index, element) {
                    debug(element.name);
                    var newsPoint = '<li class="clearfix"><a class="news-h4 newsPath" href="'+mainUrl+'getArtContent?artId='+element.objectId+'">' + element.name + '</a>';
                    newsPoint += '<span class="news-date">' + element.createTime.substring(0,10) + '</span></li>';
                    $('.news-list').append(newsPoint);
                });
                var options = {
                    currentPage: 1,//当前页
                    totalPages: pageTotal,//总页数
                    numberofPages: 5,//显示的页数

                    itemTexts: function (type, page, current) { //修改显示文字
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上页";
                            case "next":
                                return "下页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }
                    }, onPageClicked: function (event, originalEvent, type, page) { //异步换页
                        showLists(page)
                    }

                };
                $("#news-page").bootstrapPaginator(options);
            } else {
                showAlert("资讯信息获取失败！");
            }
        });
    }
    function toChange(){
        $('.news-head li').removeClass('act');
        $('.news-head li').eq(newsNum).addClass('act');
        var params = {
            "pxxh": pxxh,
            "pageNum": 1,
            "pageSize": 8
        };
        showNews(params);
    }
});
