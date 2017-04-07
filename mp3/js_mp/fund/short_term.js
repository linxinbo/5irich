/**
 * Created by d on 2016/4/24.
 */
//首页图片展示区域
$(function(){
    load_5();
    window.location.hash = "5";
});

function load_5(){
    showLoading();
    $.ajax({
        type: 'post',
        url: mainUrl + "mp/data_mp/guding.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".viewport").html("");
        },
        success: function (data) {
            hideloading();
            console.log(data);
            $(data[5]).each(function (i, n) {
				var strHtml = "";
				//var fundId = n.fundId.substring(0, 6);
				var fundId = n.id;
				console.log(fundId);
				var fundName = n.name;
				var fundDays = n.days;
				var fundProfit = n.profit.toFixed(2);
				var fAvgreturnYear = (parseFloat(n.profitRate))*100;
				
				strHtml = "<ul class='jijinlist_table mtopd'>";
                strHtml += "<li class='bottomline dq_term'>";
                strHtml += "<h2 class='jijinlist_table_t'>";
                strHtml += "<em>"+fundName+"</em>";
                strHtml += "<i>&nbsp;&nbsp;投资收益：<span class='font_hongse'>"+fundProfit+"元（以5万为例）</span></i></h2>";
                /*strHtml += "<i class='btn_fxdj btn_outline_lanse mleft "+classNamelabel+"'>"+classNamecn1+"</i><i class='btn_fxdj "+className+" mleft'>"+classNamecn+"</i>";*/
                strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                strHtml += "<i class='t_san mleft5'></i></a></li>";
                strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='jj_store3_li1'><a class='rightline'>";
                strHtml += "<span class='datitle font_heise dq_days'>"+fundDays+"<i class='dq_xz'>天</i></span>";
                strHtml += "<b class='xiaotitle font_huise mtopd'>产品期限</b></a></li><li class='jj_store3_li2'>";
                strHtml += "<a class='rightline'><span class='datitle font_hongse '>"+fAvgreturnYear.toFixed(2)+"%<i class='dq_xz'></i></span>";
                strHtml += "<b class='xiaotitle font_huise mtopd'>预计年化收益率</b></a></li>";
                strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' class='btn_home btn_lanse st_touzi'>立即预约</button>";
                strHtml += "<span class='xxiaotitle font_huise mtop'>复利滚存</span>";
                strHtml += "<b class='xxiaotitle font_lanse mtop'>一次性还本息</b></a></li></ul></div></ul>";
                $(".viewport").append(strHtml);
                //buyGroupDetail();
				
				//基金详情
				$(".dq_term").on("click",function(){
			        var ordername = $(this).find("h2").find("em").text();
			        var orderday = $(this).parent().find(".jijinlist_table_content").find(".dq_days").text();
			        var length1 = $(this).parent().find(".jj_store3_li2").find("a").find("span").text().length;
			        var orderrate =$(this).parent().find(".jj_store3_li2").find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
			    $(".jj_store3_li1").on("click",function(){
			        var ordername = $(this).parent().parent().parent().find(".dq_term").find("h2").find("em").text();
			        var orderday = $(this).parent().find(".dq_days").text();
			        var length1 = $(this).parent().find(".jj_store3_li2").find("a").find("span").text().length;
			        var orderrate =$(this).parent().find(".jj_store3_li2").find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        console.log(ordername);
			        console.log(orderday);
			        console.log(length1);
			        console.log(orderrate);
			        console.log(length2);
			        console.log(lowest);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
			    $(".jj_store3_li2").on("click",function(){
			        var ordername = $(this).parent().parent().parent().find(".dq_term").find("h2").find("em").text();;
			        var orderday = $(this).parent().find(".dq_days").text();
			        var length1 = $(this).find("a").find("span").text().length;
			        var orderrate =$(this).find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        console.log(ordername);
			        console.log(orderday);
			        console.log(length1);
			        console.log(orderrate);
			        console.log(length2);
			        console.log(lowest);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
				
				//立即投资
				$(".st_touzi").click(function () {
			        var username = $.cookie("username");
			        if (username == "" || username == null || username == undefined || username == "null") {
			            setErrorMsg(1001);
			        } else {
			            window.location.href = "order.html";
			        }
			    })
			})

        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });
};


function load_20(){
    showLoading();
    $.ajax({
        type: 'post',
        url: mainUrl + "mp/data_mp/guding.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".viewport").html("");
        },
        success: function (data) {
            hideloading();
            console.log(data);
            $(data[20]).each(function (i, n) {
				var strHtml = "";
				//var fundId = n.fundId.substring(0, 6);
				var fundId = n.id;
				console.log(fundId);
				var fundName = n.name;
				var fundDays = n.days;
				var fundProfit = n.profit.toFixed(2);
				var fAvgreturnYear = (parseFloat(n.profitRate))*100;
				
				strHtml = "<ul class='jijinlist_table mtopd'>";
                strHtml += "<li class='bottomline dq_term'>";
                strHtml += "<h2 class='jijinlist_table_t'>";
                strHtml += "<em>"+fundName+"</em>";
                strHtml += "<i>&nbsp;&nbsp;投资收益：<span class='font_hongse'>"+fundProfit+"元（以20万为例）</span></i></h2>";
                /*strHtml += "<i class='btn_fxdj btn_outline_lanse mleft "+classNamelabel+"'>"+classNamecn1+"</i><i class='btn_fxdj "+className+" mleft'>"+classNamecn+"</i>";*/
                strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                strHtml += "<i class='t_san mleft5'></i></a></li>";
                strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='jj_store3_li1'><a class='rightline'>";
                strHtml += "<span class='datitle font_heise dq_days'>"+fundDays+"<i class='dq_xz'>天</i></span>";
                strHtml += "<b class='xiaotitle font_huise mtopd'>产品期限</b></a></li><li class='jj_store3_li2'>";
                strHtml += "<a class='rightline'><span class='datitle font_hongse '>"+fAvgreturnYear.toFixed(2)+"%<i class='dq_xz'></i></span>";
                strHtml += "<b class='xiaotitle font_huise mtopd'>预计年化收益率</b></a></li>";
                strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' class='btn_home btn_lanse st_touzi'>立即预约</button>";
                strHtml += "<span class='xxiaotitle font_huise mtop'>复利滚存</span>";
                strHtml += "<b class='xxiaotitle font_lanse mtop'>一次性还本息</b></a></li></ul></div></ul>";
                $(".viewport").append(strHtml);
                //buyGroupDetail();
				
				//基金详情
				$(".dq_term").on("click",function(){
			        var ordername = $(this).find("h2").find("em").text();
			        var orderday = $(this).parent().find(".jijinlist_table_content").find(".dq_days").text();
			        var length1 = $(this).parent().find(".jj_store3_li2").find("a").find("span").text().length;
			        var orderrate =$(this).parent().find(".jj_store3_li2").find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
			    $(".jj_store3_li1").on("click",function(){
			        var ordername = $(this).parent().parent().parent().find(".dq_term").find("h2").find("em").text();
			        var orderday = $(this).parent().find(".dq_days").text();
			        var length1 = $(this).parent().find(".jj_store3_li2").find("a").find("span").text().length;
			        var orderrate =$(this).parent().find(".jj_store3_li2").find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        console.log(ordername);
			        console.log(orderday);
			        console.log(length1);
			        console.log(orderrate);
			        console.log(length2);
			        console.log(lowest);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
			    $(".jj_store3_li2").on("click",function(){
			        var ordername = $(this).parent().parent().parent().find(".dq_term").find("h2").find("em").text();;
			        var orderday = $(this).parent().find(".dq_days").text();
			        var length1 = $(this).find("a").find("span").text().length;
			        var orderrate =$(this).find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        console.log(ordername);
			        console.log(orderday);
			        console.log(length1);
			        console.log(orderrate);
			        console.log(length2);
			        console.log(lowest);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
				
				//立即投资
				$(".st_touzi").click(function () {
			        var username = $.cookie("username");
			        if (username == "" || username == null || username == undefined || username == "null") {
			            setErrorMsg(1001);
			        } else {
			            window.location.href = "order.html";
			        }
			    })
			})

        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });
};



function load_100(){
    showLoading();
    $.ajax({
        type: 'post',
        url: mainUrl + "mp/data_mp/guding.json",
        data: "",
        dataType: "JSON",
        beforeSend: function() {
            $(".viewport").html("");
        },
        success: function (data) {
            hideloading();
            console.log(data);
            $(data[100]).each(function (i, n) {
				var strHtml = "";
				//var fundId = n.fundId.substring(0, 6);
				var fundId = n.id;
				console.log(fundId);
				var fundName = n.name;
				var fundDays = n.days;
				var fundProfit = n.profit.toFixed(2);
				var fAvgreturnYear = (parseFloat(n.profitRate))*100;
				
				strHtml = "<ul class='jijinlist_table mtopd'>";
                strHtml += "<li class='bottomline dq_term'>";
                strHtml += "<h2 class='jijinlist_table_t'>";
                strHtml += "<em>"+fundName+"</em>";
                strHtml += "<i>&nbsp;&nbsp;投资收益：<span class='font_hongse'>"+fundProfit+"元（以100万为例）</span></i></h2>";
                /*strHtml += "<i class='btn_fxdj btn_outline_lanse mleft "+classNamelabel+"'>"+classNamecn1+"</i><i class='btn_fxdj "+className+" mleft'>"+classNamecn+"</i>";*/
                strHtml += "<a href='#' class='more_c'  data-id='" + fundId + "' data-name='" + fundName + "' data-value='" + n.fNavUnit + "'>";
                strHtml += "<i class='t_san mleft5'></i></a></li>";
                strHtml += "<div class='jijinlist_table_content'><ul class='jj_store3'><li class='jj_store3_li1'><a class='rightline'>";
                strHtml += "<span class='datitle font_heise dq_days'>"+fundDays+"<i class='dq_xz'>天</i></span>";
                strHtml += "<b class='xiaotitle font_huise mtopd'>产品期限</b></a></li><li class='jj_store3_li2'>";
                strHtml += "<a class='rightline'><span class='datitle font_hongse '>"+fAvgreturnYear.toFixed(2)+"%<i class='dq_xz'></i></span>";
                strHtml += "<b class='xiaotitle font_huise mtopd'>预计年化收益率</b></a></li>";
                strHtml += "<li class='col-xs-4 col-sm-4 textcenter'><a>";
                strHtml += "<button data-id='"+fundId+"' data-name='"+fundName+"' class='btn_home btn_lanse st_touzi'>立即预约</button>";
                strHtml += "<span class='xxiaotitle font_huise mtop'>复利滚存</span>";
                strHtml += "<b class='xxiaotitle font_lanse mtop'>一次性还本息</b></a></li></ul></div></ul>";
                $(".viewport").append(strHtml);
                //buyGroupDetail();
				
				//基金详情
				$(".dq_term").on("click",function(){
			        var ordername = $(this).find("h2").find("em").text();
			        var orderday = $(this).parent().find(".jijinlist_table_content").find(".dq_days").text();
			        var length1 = $(this).parent().find(".jj_store3_li2").find("a").find("span").text().length;
			        var orderrate =$(this).parent().find(".jj_store3_li2").find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
			    $(".jj_store3_li1").on("click",function(){
			        var ordername = $(this).parent().parent().parent().find(".dq_term").find("h2").find("em").text();
			        var orderday = $(this).parent().find(".dq_days").text();
			        var length1 = $(this).parent().find(".jj_store3_li2").find("a").find("span").text().length;
			        var orderrate =$(this).parent().find(".jj_store3_li2").find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        console.log(ordername);
			        console.log(orderday);
			        console.log(length1);
			        console.log(orderrate);
			        console.log(length2);
			        console.log(lowest);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
			    $(".jj_store3_li2").on("click",function(){
			        var ordername = $(this).parent().parent().parent().find(".dq_term").find("h2").find("em").text();;
			        var orderday = $(this).parent().find(".dq_days").text();
			        var length1 = $(this).find("a").find("span").text().length;
			        var orderrate =$(this).find("a").find("span").text().substring(0,length1-1);
			        var length2 = window.location.hash.length;
			        var lowest = window.location.hash.substring(1,length2);
			        console.log(ordername);
			        console.log(orderday);
			        console.log(length1);
			        console.log(orderrate);
			        console.log(length2);
			        console.log(lowest);
			        window.location.href = "st_detail.html?ordername=" + ordername + "&orderday=" + orderday + "&orderrate=" + orderrate + "&lowest=" +lowest;
			    })
				
				//立即投资
				$(".st_touzi").click(function () {
			        var username = $.cookie("username");
			        if (username == "" || username == null || username == undefined || username == "null") {
			            setErrorMsg(1001);
			        } else {
			            window.location.href = "order.html";
			        }
			    })
			})

        },
        error:function(data){
            hideloading();
            showAlert("服务器错误");
        }
    });
};


