/**
 * Created by dell on 2017/3/29.
 */
/**
 * Created by d on 2016/4/26.
 */
$(function (){
    var isopen = $.cookie("isopen");
    var name = $.cookie("username");
    var phone= $.cookie("useropen");
    var imgurl=$.cookie("imgurl");

    $(".contect_us").unbind("click").click(function () {
        showAlert("暂缓开通，敬请期待！");

    });
    if (name == "" || name == null|| name == "null"  || name == undefined) {
        setErrorMsg(1001);
    } else {
        var center_username=name;
        $(".user_headimg").attr("src",imgurl);
        $("#center_username").append(center_username);
        if(phone!=""||phone!=undefined){
            $("#user_phone").append(phone);
        }
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
    $(".user_center_m li:eq(1)").unbind("click").click(function(){
        if (name == "" || name == null|| name == "null"  || name == undefined) {
            setErrorMsg(1001);
        } else {
            window.location.href = "change_step1.html";
        }
    });
    $(".user_center_m li:eq(2)").unbind("click").click(function(){
        if (name == "" || name == null|| name == "null"  || name == undefined) {
            setErrorMsg(1001);
        } else if (isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作");
        } else {
            window.location.href = "forget_deal.html";
        }
    });
    //$(".user_center_m li:eq(4)").unbind("click").click(function(){
    //    if (name == "" || name == null|| name == "null"  || name == undefined) {
    //        setErrorMsg(1001);
    //    } else {
    //        window.location.href = "../center/my_order.html";
    //
    //    }
    //})

    //$(".user_center_m li:eq(5)").unbind("click").click(function(){
    //    if (name == "" || name == null|| name == "null"  || name == undefined) {
    //        setErrorMsg(1001);
    //    } else {
    //        window.location.href = "../trade/tradeStory.html";
    //
    //    }
    //})
    $(".user_center_m li:eq(0)").unbind("click").click(function () {
        if (name == "" || name == null|| name == "null"  || name == undefined) {
            setErrorMsg(1001);
        } else {
            if (isopen != 1) {
                //			        showAlert("暂缓开通，敬请期待！");
                showAlert("您还未开户！，请开户后进行相关操作");
            } else {
                window.location.href = "change_deal.html";
            }
        }
    });


    $(".user_center_m li:eq(3)").unbind("click").click(function () {
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