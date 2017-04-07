/**
 * Created by d on 2016/4/24.
 */
//首页图片展示区域
$(function(){
    load_gg();
    load_zh();

});

function load_gg(){
    showLoading();
    $.ajax({
        type: "GET",
        url: mainUrl + "mp/data_mp/banners.json",
        dataType: "json",
        /*async:false,*/
        success: function (data) {
            hideloading();
            $(".swiper-wrapper").html("");
            var swiperHtml = '';
            console.log(data);
            $(data).each(function (i, n) {
                var imgurl = n.image;
                var linkurl = n.url;
                swiperHtml += "<div class='swiper-slide'><a href='"+linkurl+"'><img src='"+imgurl+"'></a></div>";
            });
            $(".swiper-wrapper").append(swiperHtml);
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                paginationClickable: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false
            });
        },
        error:function(data){
            hideloading();
        }
    });



};

//首页独家组合列表
function load_zh(){
    showLoading();
    var params = {"fundGroup" : 2};
    $.ajax({
        type: 'post',
        url: mainUrl + "/recommended",
        data: params,
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            hideloading();
            if(data.retcode="0000"){
                //result = response1.data;
                $(data.data).each(function (i, n) {
                    var fundid = n.fundId;
                    var fundName = n.fundName;
                    var profit = (n.fdReturnYearRatio*100).toFixed(2)+"%";
                    var profit1 = (n.fdReturnYearRatio*100).toFixed(2);
                    var showOrder=n.showOrder;
                    //判断分析级别和颜色和显示隐藏
                    var className="zh_btn_chen";
                    var classNamecn="高收益";
                    var classNamecn1="长期增值";
                    var classNamelabel="labelidshow";
                    if(showOrder==3){
                        className="btn_outline_hongse";
                        classNamecn="理性投资";
                        classNamelabel="labelidshow";
                        classNamecn1="业绩更优";
                    }else if(showOrder==2){
                        className="btn_outline_chengse";
                        classNamecn="资产配置";
                        classNamecn1="风险适中";
                        classNamelabel="labelidshow";
                    }else{
                        className="btn_outline_huangse";
                        classNamecn="稳健首选";
                        classNamecn1="分散风险";
                        classNamelabel="labelidshow";
                    }
                    var strHtml = "<ul class='jijinlist_table menddd'>";
                    strHtml += "<li class='bottomline'>";
                    strHtml += "<h2 class='jijinlist_table_t' data-id='"+fundid+"' data-name='"+fundName+"' profit='"+profit1+"'>";
                    strHtml += "<em>"+fundName+"</em>"
                    strHtml += "<i class='btn_fxdj btn_outline_lanse mleft "+classNamelabel+"'>"+classNamecn+"</i><i class='btn_fxdj "+className+" mleft'>"+classNamecn1+"</i></h2>";
                    strHtml += "<a href='#' class='more_c'>";
                    strHtml += "<span class='t_span'></span>";
                    strHtml += "<i class='t_san mleft5' style='float: right;'></i></a></li>";
                    strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='zuhe_left'><a class='rightline'>";
                    strHtml += "<span class='datitle font_heise'>"+n.fdGroupValue+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>最新净值</b></a></li><li class='zuhe_center'>";
                    strHtml += "<a class='rightline' profit='"+profit1+"'><span class='datitle font_hongse'>"+profit+"</span>";
                    strHtml += "<b class='xiaotitle font_huise mtopd'>成立以来收益率</b></a></li>";
                    strHtml += "<li class='zuhe_right textcenter'><a>";
                    strHtml += "<button data-id='"+fundid+"' data-name='"+fundName+"' class='btn_home btn_outline_lanse'>立即购买</button>";
                    strHtml += "<span class='xxiaotitle font_huise mtop'>无申购费</span>";
                    strHtml += "</a></li></ul></div></ul>";
                    $(".jijinlistnew").append(strHtml);
                    buyGroupDetail();
                });

            }else{
                setErrorMsg(data.retcode, data.retmsg); //错误提示框
            }
        },error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });
}

function buyGroupDetail() {

    //基金详情
    $(".jijinlist_table_t").click(function () {
        var fundid = $(this).attr("data-id");
        var fundname = $(this).attr("data-name");
        var profit = $(this).attr("profit");
        window.location.href = "group/group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
        console.log("详情");
    });

    $(".jj_store3 .zuhe_left").click(function () {
        var fundid = $(this).parent().find(".zuhe_right button").attr("data-id");
        var fundname = $(this).parent().find(".zuhe_right button").attr("data-name");
        var profit = $(this).parent().find(".zuhe_center a").attr("profit");
        window.location.href = "group/group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
        console.log("详情");
    });
    $(".jj_store3 .zuhe_center").click(function () {
        var fundid = $(this).parent().find(".zuhe_right button").attr("data-id");
        var fundname = $(this).parent().find(".zuhe_right button").attr("data-name");
        var profit = $(this).find("a").attr("profit");
        window.location.href = "group/group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
        console.log("详情");
    });


    //点击购买
    $(".jj_store3 .zuhe_right button").unbind("click").click(function (e) {
        var fundid =$(this).attr("data-id");
        var fundname =$(this).attr("data-name");
        e.stopPropagation();
        console.log("购买");
        groupBuyStep1(fundid,fundname);
    });
}