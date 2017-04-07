//http://124.65.138.58:8080/Wirich2.0/MutualFundListManacheFuzzyQueryAction
$(function () {
	$("#search_button").click(function () {
		$(".search_hide").hide();
		$("#search_list ul").show().html("");
		var flat;
		var search_text = $("#search").val();

		var yes =/^[0-9]*$/;
		var yesa =/^[\u4e00-\u9fa5]{0,}$/;
		var yesb =/^[A-Za-z]+$/;
		if(search_text==""){
			showAlert("基金信息不能为空");
			return false;
		}else if (yes.test(search_text)){
			var fInfoWindcode = $("#search").val();
			flat = 0;
			searchFund(flat,search_text);
		}else if (yesa.test(search_text)) {
			var fundName = $("#search").val();
			flat = 1;
			searchFund(flat,search_text);
		}else if (yesb.test(search_text)) {
			var fundName = $("#search").val();
			flat = 2;
			searchFund(flat,search_text);
		}else{
			showAlert("只能输入基金代码、或者基金名称、英文！");
		}
	})

})

function searchFund(flat,search_word) {
	showLoading();
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
			hideloading();
			console.log(data);
			if (data.retcode == 0000) {
				$("#checkboxDiv").html("");
//				if(data.data.length==0){
//					showAlert("暂无相关基金！")
//				}
				$(data.data).each(function (i, n) {
					var fundid = n.fInfoWindcode+"";
					//fundid= fundid.substring(0,6);
					var search_list = '<li data-id="'+fundid+'"  data-name="'+n.fundName+'">' + fundid +'&nbsp&nbsp&nbsp&nbsp&nbsp'+ n.fundName + '</li>';
					$("#search_list ul").append(search_list);
					$("#search_list ul li").unbind("click").click(function(){
						var fundid  = $(this).attr("data-id");
						var fundname  = $(this).attr("data-name");
						window.location.href="../fund/fund_detail.html?fundid="+fundid+"&fundname="+fundname;
					});
				})
                var ser_length = $("#search_list ul li").length;
                if(ser_length == 0){
                    $(".search_prompt").show();
                }else{
                    $(".search_prompt").hide();
                }
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		}
	})
}
