//http://124.65.138.58:8080/Wirich2.0/MutualFundListManacheFuzzyQueryAction
$(function () {
	$(".search_prompt").hide();
	$("#search_button").click(function () {
		$(".sreach_body_conent").hide();
		var flat;
		var search_text = $("#search").val();
		var yes =/^[0-9]*$/;
		var yesa =/^[\u4e00-\u9fa5]{0,}$/;
		var yesb =/^[A-Za-z]+$/;
		if(search_text == "创富宝"){
			window.location.href="../fund/short-term.html#5";
		}else{
			if(search_text=="" || search_text==null){
				showAlert("基金信息不能为空");
				$(".sreach_body_conent").show();
				return false;
			}else if (yes.test(search_text)){
				var fInfoWindcode = search_text;
				flat = 0;

				searchFund(flat,fInfoWindcode);
			}else if (yesa.test(search_text)) {
				var fundName = search_text;
				flat = 1;
				searchFund(flat,fundName);
			}else if (yesb.test(search_text)) {
				var fundName = search_text;
				flat = 2;
				searchFund(flat,fundName);
			}else{
				showAlert("只能输入基金代码、或者基金名称、英文！");
				$(".sreach_body_conent").show();
			}
		}
	});


	$(".sreach_btn").click(function () {
		$(".sreach_body_conent").hide();
		var flat;
		var search_text1 = $(this).html();
		var yes =/^[0-9]*$/;
		var yesa =/^[\u4e00-\u9fa5]{0,}$/;
		var yesb =/^[A-Za-z]+$/;
		if(search_text1 == "创富宝"){
			window.location.href="../fund/short-term.html#5";
		}else{
			if(search_text1=="" || search_text1==null ){
				showAlert("基金信息不能为空");
				$(".sreach_body_conent").show();
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
				$(".sreach_body_conent").show();
			}
		}

	});

	WriteFiles();

})

function searchFund(flat,search_word) {
	showLoading();
	//记录一共有几条数据
	$.ajax({
		url: mainUrl + "MutualFundListManacheFuzzyQueryAction",
		data: {
			page: "1",
			pageRecorders:"20",
			information: search_word,
			flat: flat
		},
		dataType: "JSON",
		success: function (data) {
				//存储历史记录
			if($("#search").val() !=null && $("#search").val()!=""){
				console.log($("#search").val());
				ReadFiles($("#search").val());
			}
				hideloading();
			console.log(data);
			if (data.retcode == 0000) {
				$("#checkboxDiv").html("");
				if(data.data && data.data.length !=null && data.data.length != 0 && typeof (data.data) != "undefined"){
					$("#shuzi").html("");
					$("#shuzi").append(data.data.length);
				}else{
					$("#shuzi").html("");
					$("#shuzi").append("0");
					$(".sreach_body_conent").show();
				}
				
//				if(data.data.length==0){
//					showAlert("暂无相关基金！")
//				}
				$(data.data).each(function(i, n) {
					var fundid = n.fInfoWindcode+"";
					//fundid= fundid.substring(0,6);
					var fAvgReturnYear = parseFloat(n.fAvgReturnYear);
					fAvgReturnYear = fAvgReturnYear.toFixed(2);
					var fAvgreturnSincefound = parseFloat(n.fAvgreturnSincefound);
					fAvgreturnSincefound = fAvgreturnSincefound.toFixed(2);
					var classname="font_hongse";
					if(fAvgReturnYear>0){
						classname="font_hongse";

					}else if(fAvgReturnYear<0){
						classname="font_lv";
					}else{
						classname="font_heise";
					}
					var search_list = '<ul class="jijinlist_table mtopd">';
					search_list +=' <li class="bottomline"> <h2 class="jijinlist_table_t"> ';
					search_list +='<em class="sreach_xx" data-id="'+fundid+'" data-name="'+n.fundName+'">'+n.fundName+'</em> <i style="color: #666666">('+fundid.substring(0,6)+')</i>';
					search_list +=' </h2> <a href="../moni/moni_rsg.html?fundid='+ fundid +'" class="more_c"> <span class="t_span">模拟购买</span> <i class="t_san mleft5"></i> </a> </li> <div class="jijinlist_table_content"> <ul class="jj_store3"> ';
					search_list +='<li ><a href="../fund/fund_detail.html?fundid='+fundid+'&fundname='+n.fundName+'" class="rightline"> <span class="datitle font_heise">'+ n.fNavUnit +'</span> <b class="xiaotitle font_huise mtopd">最新净值</b> </a> </li>';
					if(fAvgReturnYear==""||fAvgReturnYear==null){
						search_list +=' <li> <a href="../fund/fund_detail.html?fundid='+fundid+'&fundname='+n.fundName+'" class="rightline"> <span class="datitle '+classname+'">'+fAvgReturnYear+'%</span> <b class="xiaotitle font_huise mtopd">近一年收益率</b> </a> ';
					}else{
						search_list +=' <li> <a href="../fund/fund_detail.html?fundid='+fundid+'&fundname='+n.fundName+'" class="rightline"> <span class="datitle '+classname+'">'+fAvgreturnSincefound+'%</span> <b class="xiaotitle font_huise mtopd">成立以来收益率</b> </a> ';
					}
					search_list +='</li> <li class="col-xs-4 col-sm-4 textcenter"> <a style="padding-top: 0.6em"> <button data-id="'+fundid+'" data-name="'+n.fundName+'" class="btn_home btn_lanse sreach_go_buy">立即购买</button>  </a> </li> ';
					search_list +='</ul>';
					search_list +=' </div> ';
					search_list +='</ul>';
					$("#checkboxDiv").append(search_list);
					$(".sreach_xx").unbind("click").click(function(){
						var fundid  = $(this).attr("data-id");
						var fundname  = $(this).attr("data-name");
						window.location.href="../fund/fund_detail.html?fundid="+fundid+"&fundname="+fundname;
					});


					$(".sreach_go_buy").unbind("click").click(function(){
						var fundid  = $(this).attr("data-id");
						var fundname  = $(this).attr("data-name");
						var fundid1=fundid.substring(0,6);
						console.log(fundname,fundid);
						buyStep1(fundid1,fundname);
					});
				});
                var ser_length = $(".sreach_xx").length;
                if(ser_length == 0 && ser_length && ser_length =="undefined" && ser_length == null){
					$(".search_prompt").hide();
                }else{
					$(".search_prompt").show();
					if($("#shuzi").val() == 0){
						WriteFiles();
						$("#fanhuiSY").hide();
					}
                }
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		}
	})
}

//搜索历史的方法
/**
 * 创建一个window.localstorage象做全局变量
 * */
var storage = window.localStorage;
/**
 * 第一步  判断全局对象的里面是否有数据
 * 		1  没有就添加一条
 * 		2  有就执行第二步
 * 第二步  判断全局对象有几条数据 在0-5之间
 * 第三步  判断全局对象长度是否等于5
 * 		1  等于5 就执行第四步
 * 		2  不等于就在往对象里存一条数据(length+1 是当前长度的下一条)
 * 第四步  判断全局对象的第五条数据是不是空值
 * 		1  不等于null 就直接执行for循环
 * 		   1.判断i+1的值!=6 满足就 删除当前i的数据 在给当前键是i的这个对象 添加i+1的值(注意 i+1 之前已经存储过的)
 * 		   2.不满足就删除当前i的数据  在给当前键是i的这个对象赋值
 * */
function ReadFiles(shuju){
	if(storage.length <= 0){
		storage.setItem('1',shuju);
	}else if(storage.length > 0 && storage.length < 6){
		if(storage.length == 5){
			if(storage.getItem(''+5) != null){
				for(var i=1;i<=storage.length;i++){
					if((i+1) != 6){
						storage.removeItem(''+i);
						storage.setItem(''+ i,storage.getItem(''+(i+1)));
					}else{
						storage.removeItem(''+i);
						storage.setItem(''+ i,shuju);
					}
				}
			}
		}else{
			storage.setItem(''+(storage.length+1),shuju);
		}
	}
}
//显示查询历史
function WriteFiles(){
	storage.removeItem(''+6);
	$("#history").html("");
	if(storage.length > 0 && storage.length < 6){
		for(var i=storage.length;i>0;i--){
			console.log(storage.getItem(''+i));
			var data = storage.getItem(''+i);
			var search_list = '';
			if(data!=null && data != 'null'){
				search_list = '<div class="div_ls"> <span class="span_ls" data-lishi = "'+data+'"> '+data+' </span></div>';
			}else{
				search_list = '';
			}
			$("#history").append(search_list);
			$(".div_ls").unbind("click").click(function(){
				//搜索按钮的点击事件 开始
				$("#search").val($(this).find("span").attr("data-lishi"));
				$(".sreach_body_conent").hide();
				var flat;
				var search_text = $(this).find("span").attr("data-lishi");
				var yes =/^[0-9]*$/;
				var yesa =/^[\u4e00-\u9fa5]{0,}$/;
				var yesb =/^[A-Za-z]+$/;
				if(search_text==""){
					showAlert("基金信息不能为空");
					return false;
				}else if (yes.test(search_text)){
					var fInfoWindcode = search_text;
					flat = 0;
					searchFund(flat,fInfoWindcode);
				}else if (yesa.test(search_text)) {
					var fundName = search_text;
					flat = 1;
					searchFund(flat,fundName);
				}else if (yesb.test(search_text)) {
					var fundName = search_text;
					flat = 2;
					searchFund(flat,fundName);
				}else{
					showAlert("只能输入基金代码、或者基金名称、英文！");
				}
				//搜索按钮的点击事件结束
			});
		}
	}
}
//清空查询历史
function  qingkong(){
	//清空对象里面所有数据的方法
	storage.clear();
	window.location.reload();
}


