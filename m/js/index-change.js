$(function(){
	if(isUrl("index-new.html")){//全功能基金首页
		//搜索框
		$(".searchIcon").click(function(){
			if($(".search_box").is(":hidden")){
				$(".search_box").show(300);
				$(".iscroll_wrapper").animate({"top":122});
			}else{
				$(".search_box").hide(300);
				$(".iscroll_wrapper").animate({"top":88});
			}
		});
		//设置基金种类导航
//		var ww = window.innerWidth;
//		var size = $(".collect_nav li").length;
//		var navW = 70;
//		if(ww > 320 && ww <= 360){
//			navW = 80;
//		}else if(ww > 360){
//			navW = 80;	
//		}
//		
//		$(".collect_nav ul").css("width",navW*size);
//		$(".collect_nav ul li").css("width",navW);
		/*
		var target = $(".collect_nav ul");
		touch.on(target, 'swipeleft', function(ev){
			console.log("向左滑动.");
			var leftw = navW*size-ww;
			target.animate({"left":-leftw});
		});
		touch.on(target, 'swiperight', function(ev){
			console.log("向右滑动.");
			target.animate({"left":0});
		});*/
		
		$(".collect_nav ul li").click(function(){
			//alert($(this).index());	
			var pw = $(".collect_nav ul li.sele").next().css("width");
			$(".collect_nav ul li.sele").next().removeAttr("style");
			$(".collect_nav ul li.sele").next().css("width",pw);
			$(".collect_nav ul li.sele").next().css("background","url(../images/line_1@2x.png) no-repeat left center;");
			$(".collect_nav ul li").removeClass("sele");
			$(this).addClass("sele");
			
			$(this).next().css("background","none");
		});
		$(".fund_name .collectIcon_hollow").click(function(){
			showAlert("收藏基金成功");	
		});
		$(".fund_name .collectIcon_solid").click(function(){
			showAlert("取消收藏成功");	
		});
		//初始化上拉刷新 0118
//		<!-- 0118 s -->
//		setPullLoad(88,function(){
//			alert("调用Ajax");	
//		});
		
		//监测键盘弹出，解决某些机型上键盘收回后底部工具栏页面居中问题
		var wh = window.innerHeight;
		window.onresize = function(){
			//$(".header h1").html(wh+"=="+window.innerHeight);
			var focusNodeName = document.activeElement.nodeName;
			if(window.innerHeight < wh && focusNodeName.toLocaleLowerCase() == "input"){
				$(".navbar").hide();
				//$(".navbar").css("position","absolute");
			}else{
				$(".navbar").show();
				//$(".navbar").css("position","fixed");
			}
		}
		$(document).on('blur', 'input, textarea', function () {
			$(".navbar").show();
		});
		$(document).on('focus', 'input, textarea', function () {
			$(".navbar").hide();
		});
	}else if(isUrl("fund_detail.html")){//全功能基金详情页
		$("ul.navtab1 li").click(function(){
			$("ul.navtab1 li").removeClass("sele");
			$(this).addClass("sele");
		});
		$("header dl.collectIcon").click(function(){
			showAlert("收藏基金成功");	
			$(this).find("dt").removeClass("wjx1").addClass("wjx2");
		});
		
		/** 0124 start **/
		$(".kmap_date td span").click(function(){
			$(".kmap_date td span").removeClass("sele");
			$(this).addClass("sele");
			var _index = $(this).attr("data-index");
			var myData = null;
			if(_index == 0){
				myData = {x:["01-02","01-03","01-04","01-05","01-06","01-07","01-08"],y:[1.1,1.9,5.3,2.6,1.1,3.0,4.8]};
			}else if(_index == 1){
				myData = {x:["01-02","01-03","01-04","01-05","01-06","01-07","01-08"],y:[11,9,0,26,11,30,48]};
			}else if(_index == 2){
				myData = {x:["02","03","04","05","06","07","08"],y:[1.1,1.9,5.3,26,11,3.0,4.8]};
			}
			setChartJS(myData);
		});
		/** 初始化曲线图 Chart  start **/
		var myData = {x:["01-02","01-03","01-04","01-05","01-06","01-07","01-08"],y:[1.1,1.9,5.3,2.6,1.1,3.0,4.8]};
		setChartJS(myData);
		/** 初始化曲线图 Chart  end **/
		
		/** 0124 end **/
	}
});

/** 0124 start **/
//绘制曲线图 Chart
function setChartJS(data){
	var lineChartData = {
			labels : data.x,
			datasets : [
				{
					label: "My Second dataset",
					fillColor : "rgba(151,187,205,0.2)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(151,187,205,1)",
					data : data.y
				}
			]
		}
		if(typeof(ctx) == "undefined"){
			ctx = document.getElementById("chart_canvas").getContext("2d");
		}
		window.myLine = new Chart(ctx).Line(lineChartData, {
			responsive: true,
			showTooltips : false,
			pointDot : false,
			bezierCurve : false,
			datasetStrokeWidth :1
		});
}
/** 0124 end **/