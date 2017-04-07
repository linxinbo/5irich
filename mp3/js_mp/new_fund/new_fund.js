$(function(){
    load_gg();
    load_zh();
    bd();
    $(".nav_obj li").eq(0).children("span").css({"borderBottom":"solid 3px #ff9900","color":"#ff9b00"});
});
function load_gg(){
    showLoading();
    $.ajax({
        type: "GET",
        url: mainUrl + "mp/data_mp/banners.json",
        dataType: "json",
        success: function (data) {
            hideloading();
            $(".swiper-wrapper").html("");
            var swiperHtml = '';
            console.log(data);
            $(data).each(function (i, n) {
                var imgurl = n.image;
                var linkurl = n.url;
                swiperHtml += "<div class='swiper-slide'><a href='"+mainUrl+"mp/"+linkurl+"'><img src='"+mainUrl+"mp/"+imgurl+"'></a></div>";
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
function load_zh(){
 
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
                $(".nfund_dis").html("");
                var arr=["精选高成长标的，实现高收益","平衡资产配置，稳健收益","债券为主，权益产品为辅"]
                for(var i=0;i<data.data.length;i++) {
                    var fundId = data.data[i].fundId;
                    var newst= data.data[i].fdGroupValue.toFixed(4);
                    var fundName = data.data[i].fundName;
                    var profit = (data.data[i].fdReturnYearRatio*100).toFixed(2);
                    var showOrder=data.data[i].showOrder;
                    //判断分析级别和颜色和显示隐藏
                    var classNamecn1;
                    var classNamecn2;
                    if(showOrder==1){
                        classNamecn1="低风险";
                        classNamecn2="稳健型";
                    }else if(showOrder==2){
                        classNamecn1="中风险";
                        classNamecn2="平衡型";
                    }else{
                        classNamecn1="高风险";
                        classNamecn2="高收益";
                    }
                    //var strHtml = "<ul fund_id="+fundId+" fundName="+fundName+" profit="+profit+" class='nfund_list'><li class='list_a'><div class='lista1'><p>"+fundName+"</p></div><div class='lista2'><a>"+classNamecn+"</a></div></li><li class='list_b'><div class='listb_box1'><p class='listb1'>"+profit+"<a class='percent'>%</a></p></div><div class='listb_box2'><p class='listc1'>最新净值"+newst+"</p></div></li>" +
                    //    "<li class='list_c'><span class='listb2'>成立以来收益率</span><span class='listc2'>无申购费</span></li></ul>"
                      var box=$("<div class='newbox'fund_id="+fundId+" fundName="+fundName+" profit="+profit+" ></div>");
                      var first=$("<div class='first'><p>成立以来收益率</p><p>+"+profit+"%</p></div>");
                      var second=$("<ul class='second'><li>"+fundName+"</li><li><span>1000元起购</span><span>"+classNamecn1+"</span><span>"+classNamecn2+"</span></li><li>"+arr[i]+"</li></ul>");
                      box.append(first,second);
                       $(".nfund_dis").append(box);

                };
                $(".newbox").on("click",changelist)
            }else{
                setErrorMsg(data.retcode, data.retmsg); //错误提示框
            }
            
        },error:function(data){

            showAlert("服务器错误");
        }
    });
   
};

$(".nav_obj li").click(function(){

    $(this).children("span").css({"borderBottom":"solid 3px #ff9900","color":"#ff9b00"}).end().siblings().children("span").css({"borderBottom":"none","color":"#444"});
    //console.log($(this).children("span").css({"borderBottom":"solid 3px #ff9900","color":"#ff9b00"}).end().siblings());
    if($(this).index()==0){
        $(".nfund_tlist").empty();
        $(".nfund_content").children().show();
        $(".nfund_dis").empty();
        $(".swiper-wrapper").empty();
        load_gg();
        load_zh();

    }
    if($(this).index()==2){
        $(".nfund_tlist").empty();
       $(".nfund_content").children().hide();
        getStockTypeList("混合型", 0)
    }else if($(this).index()==3){
        $(".nfund_tlist").empty();
        $(".nfund_content").children().hide();
        getStockTypeList("债券型", 1)
    }else if($(this).index()==4){
        $(".nfund_tlist").empty();
       $(".nfund_content").children().hide();
        getStockTypeList("货币型", 2)
    }else if($(this).index()==1){
        $(".nfund_tlist").empty();
        $(".nfund_content").children().hide();
        getStockTypeList("QDII", 3)
    }else if($(this).index()==5){
        $(".nfund_tlist").empty();
        $(".nfund_content").children().hide();
        getStockTypeList("股票型", 4)
    }
});
	$(".nfund_word").click(function () {
		$(".nfund_nav").hide();
		$(".nfund_content").hide();
		$(".nfund_tlist").empty();
		var flat;
		var search_text1 = $(".nfund_sear").val();
		var yes =/^[0-9]*$/;
		var yesa =/^[\u4e00-\u9fa5]{0,}$/;
		var yesb =/^[A-Za-z]+$/;
		//if(search_text1 == "创富宝"){
		//	window.location.href=mainUrl+"mp/fund/short-term.html#5";
		//}
			if(search_text1=="" || search_text1==null ){
				showAlert("基金信息不能为空");
				load_gg();
                load_zh();
                $(".nfund_nav").show();
		        $(".nfund_content").show();
				return false;
			}else if (yes.test(search_text1)){
				var fInfoWindcode = search_text1;
				flat = 0;
				searchFund(flat,fInfoWindcode);
			}else if (yesa.test(search_text1)) {
				var fundName = search_text1;
				flat = 1;
				searchFund(flat,fundName);
			}else if (yesb.test(search_text1)) {
				var fundName = search_text1;
				flat = 2;
				searchFund(flat,fundName);
			}else{
				showAlert("只能输入基金代码、或者基金名称、英文！");
				
			}
		

	});
function getStockTypeList(stockType, stockcode) {

    $.ajax({
        type: "post",
        url: mainUrl + "products",
        data: {
            fdType: stockType,
            pageSize: 0
        },
        dataType: "JSON",
        success: function (data) {
            console.log(data)
            if (data.retcode == 0000) {
                $(data.data).each(function (i, n) {
                    var strHtml = "";
                    var classname;
                    var fundId = n.fundId.slice(0,6);
                    var fundId1=n.fundId;
                    var fundName = n.fundName;
                    var fNavUnit = parseFloat(n.fNavUnit).toFixed(4);
                    var fundTypeGoods = n.fundTypeGoods;
                    var fAvgreturnYear = parseFloat(n.fAvgreturnYear).toFixed(2);
                    var value1 = n.fAvgreturnYear; //取值 转数字
                    if(fAvgreturnYear<0){
                        classname="tlistb11"
                    }else{
                        classname="tlistb1"
                    }

               strHtml="<ul fund_id="+fundId1+" fundname="+fundName+" type="+stockType+" class='tlist'><li class='tlist_a'><div class='tlista_box1'><p class='tlista1'>"+fundName+"<span class='nfund_num'>"+fundId+"</span></p><p class='tlista2'>最新净值"+fNavUnit+"</p></div>" +
                   "<div class='tlista_box2'><p class="+classname+">"+fAvgreturnYear+"%</p><p class='tlistb2'>近一年收益</p></div></li></ul>"

                    $(".nfund_tlist").append(strHtml);

                    console.log("刷新 基金列表");

                });
                   $(".tlist").on("click",changesort)
            } else {
                setErrorMsg(data.retcode);
            }
        },
        error: function (data) {

            alert("服务器错误！");
        }

    })
}
function searchFund(flat,search_word) {
    showLoading();
    //记录一共有几条数据
    $.ajax({
        url: mainUrl + "MutualFundListManacheFuzzyQueryAction",
        data: {
            page: "1",
            pageRecorders:"25",
            information: search_word,
            flat: flat
        },
        dataType: "JSON",
        success: function (data) {
             hideloading();
            console.log(data);
            if (data.retcode == 0000) {


				if(data.data==null){
					showAlert("暂无相关基金！")
					load_gg();
                    load_zh();
                    $(".nfund_nav").show();
		            $(".nfund_content").show();
		            $(".nfund_dis").empty();
				}
                $(data.data).each(function(i, n) {
                    var strHtml = "";
                    var classname;
                    var fundId = n.fInfoWindcode.slice(0,6);
                    var fundId1=n.fInfoWindcode;
                    var fundName = n.fundName;
                    var fNavUnit = parseFloat(n.fNavUnit).toFixed(4);
                    var fundTypeGoods = n.fundTypeGoods;
                    var fAvgreturnYear = parseFloat(n.fAvgReturnYear).toFixed(2)+"%";
                    if(n.fAvgReturnYear==""){
                    	fAvgreturnYear="—";
                    	classname="tlistb111";
                    }
                    else if(parseFloat(n.fAvgReturnYear)<0){
                        classname="tlistb11"
                    }else{
                        classname="tlistb1"
                    }
                 strHtml="<ul fund_id="+fundId1+" fundName="+fundName+" class='tlist'><li class='tlist_a'><div class='tlista_box1'><p class='tlista1'>"+fundName+"<span class='nfund_num'>"+fundId+"</span></p><p class='tlista2'>最新净值"+fNavUnit+"</p></div>" +
                   "<div class='tlista_box2'><p class="+classname+">"+fAvgreturnYear+"</p><p class='tlistb2'>近一年收益</p></div></li></ul>"

                    $(".nfund_tlist").append(strHtml);

                });
                   $(".tlist").on("click",changesear)
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
         
        }
    })
}
function bd(){
    $.ajax({
        url:'http://www.5irich.com/queryNewDes',
        data: null,
        dataType: 'JSON',
        success:function(data){
             if(data.retcode=="0000"){
                 var onemonth=data.data.monthincome;
                 var onemonth1=Number(onemonth*100).toFixed(2)+"%";
                 var classname;
                 if(onemonth<0){
                     $(".newbox1 .zhangfu").attr("style","color:#008000");
                 }else{
                     onemonth1="+"+onemonth1;
                     $(".newbox1 .zhangfu").attr("style","color:#FD0000");
                 }
                 $(".newbox1 .zhangfu").html(onemonth1);
             }
        }
    })
}
//跳转至详情页
function changelist(){
	var fundid=$(this).attr("fund_id");
	var fundname=$(this).attr("fundName");
	var profit=$(this).attr("profit");
     window.location.href = mainUrl+"mp/group/group_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&profit=" +profit;
		
}
function changesort(){
	var fundid=$(this).attr("fund_id");
	var fundname=$(this).attr("fundName");
	var type=$(this).attr("type");
     window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname + "&type=" +type;
	
}
function changesear(){
	var fundid=$(this).attr("fund_id");
	var fundname=$(this).attr("fundName");
     window.location.href = mainUrl+"mp/fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
	
}