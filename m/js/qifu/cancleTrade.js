$(function () {
	//查询撤单列表；
	canclelist();
})

function canclelist() {
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "cancellationList",
		data: {},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				$(".revoke_data ul").html("");
                $(data.data).each(function(i,n){
					var fundid= n.fundcode+"";
					    fundid=fundid.substring(0,6);
					var  html = '<li><div class="table_header"><span class="revoke_code">'+fundid+'</span><span class="revoke_name">'+n.fundname+'</span><a class="revoke" data-id="'+n.appsheetserialno+'"><span>撤单</span></a></div>';
                html+='<table class="table_data"><tr><td class="td_1">业务名称</td><td class="td_2">'+getBussessName(n.businesscode)
+'</td><td class="td_3">申请日期</td><td class="td_4">'+n.operdate+'</td></tr>';
                 html+=   '<tr><td class="td_1">下单时间</td><td class="td_2">'+n.opertime+'</td></tr></table></li>';
					$(".revoke_data ul").append(html);
					cancleDetail();
					$(".revoke").unbind("click").click(function(e){
						e.stopPropagation();
						var id = $(this).attr("data-id");
						showAlert("确认撤单吗？",goCancle(id));
//						goCancle(id)
					});
				})

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	})
}
//去撤单；
function goCancle(number){
	return function(){
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "CancellationAction",
		data: {
			"fundsingl.appsheetserialno": number
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {
				showAlert("撤单成功！",canclelist);
				//刷新列表
//				canclelist();
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	})
	}
}

function cancleDetail(){ 
    $(".revoke_data ul li").unbind("click").click(function () {
        var fundid = $(this).find(".revoke_code").html();
        var fundname = $(this).find(".revoke_name").html();
        window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
        console.log("s");
    })
}
