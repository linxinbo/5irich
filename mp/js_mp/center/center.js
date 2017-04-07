/**
 * Created by d on 2016/4/26.
 */
$(function (){
    var isopen = $.cookie("isopen");
    var name = $.cookie("username");
    $(".contect_us").unbind("click").click(function () {
        showAlert("暂缓开通，敬请期待！");

    });
    if (name == "" || name == null|| name == "null"  || name == undefined) {
        setErrorMsg(1001);
    } else {
        var center_username="尊敬的 "+name+" 用户您好!"
        $("#center_username").append(center_username);
    }

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

    $(".user_center_m li:eq(2)").unbind("click").click(function () {
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
    });


    $(".user_center_m li:eq(4)").unbind("click").click(function () {
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
    });

});