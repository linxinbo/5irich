/**
 * Created by d on 2016/6/10.
 */
$(function(){
    var username = $.cookie("username");
    if (username == "" || username == null || username == undefined|| username == "null") {
        $('.private-lay').show();
        $('.private-tip').show();
    }else{
        testList();
    }
    var height=window.screen.height;
    var boxheight=$(".private-tip").height();
    var footer=$("footer").height();
    var newheight=(height-boxheight-footer)/2;
    $(".private-tip").css({top:newheight+"px"});


});
function testList(){
    showLoading();
    $.ajax({
        url: mainUrl+'queryQuestionnaireStatus',
        data: "",
        dataType: "JSON",
        success: function(data){
            hideloading();
            if(data.retcode == "0000"){
                load_private_fund();
                z_back();
            }else if(data.retcode == "0001"){
                window.location.href="hot_testList.html";
            }
        },
        error: function(data){
            hideloading();
            //setErrorMsg(data);
            setErrorMsg(data.retcode, data.retmsg);

        }
    });
}
function load_private_fund(){
    showLoading();
    $.ajax({
        type: 'get',
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
                var classname="hot";
                if(state=="火热进行中"){
                    var classname="hot";
                }else{
                    var classname="over";
                }
                var date1 = n.date;
                swiperHtml += "<div class='huodong menddd'><h2 class='mendd'>"+title+"</h2><a href='"+linkurl+"'><img class='tupian' src='"+imgurl+"' alt='"+title+"'/></a><i class='"+classname+"'></i></div>";
            });
            $(".private_fund").append(swiperHtml);
        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });



}