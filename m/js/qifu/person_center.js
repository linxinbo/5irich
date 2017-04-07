$(function (){
	var isopen = $.cookie("isopen");
	var name = $.cookie("username");
	$(".contect_us").unbind("click").click(function () {
		showAlert("暂缓开通，敬请期待！");

	});

//	$(".person_list li:eq(1)").unbind("click").click(function () {
//		if (name == "" || name == null|| name == "null" || name == undefined) {
//			setErrorMsg(1001);
//		} else {
//			if (isopen != 1) {
//				//			        showAlert("暂缓开通，敬请期待！");
//				showAlert("您还未开户！，请开户后进行相关操作");
//			} else {
//				window.location.href = "optional.html";
//			}
//		}
//
//	})

	$(".person_list li:eq(4)").unbind("click").click(function () {
		if (name == "" || name == null|| name == "null"  || name == undefined) {
			setErrorMsg(1001);
		} else {
			if (isopen != 1) {
				//			        showAlert("暂缓开通，敬请期待！");
				showAlert("您还未开户！，请开户后进行相关操作");
			} else {
				window.location.href = "../sigin/change_deal.html";
			}
		}
	})


	$(".person_list li:eq(2)").unbind("click").click(function () {
		if (name == "" || name == null || name == "null" || name == undefined) {
			setErrorMsg(1001);
		} else {
			if (isopen != 1) {
				//			        showAlert("暂缓开通，敬请期待！");
				showAlert("您还未开户！，请开户后进行相关操作");
			} else {
				window.location.href = "my_bank.html";
			}
		}
	})
	
//		$(".person_list li:eq(3)").unbind("click").click(function () {
//		if (name == "" || name == null || name == "null" || name == undefined) {
//			setErrorMsg(1001);
//		} else {
//				window.location.href = "../sigin/change_step1.html";
//		}
//	})
})
