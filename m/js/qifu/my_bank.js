$(function(){
    hideloading();
    showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "relationList",
        data: "",
        dataType: "json",
        success: function (data) {
            hideloading();
            if (data.retcode == 0000) {
                $(".bank_list ul").html("");
                $(data.data).each(function (i, n) {
                    var name = getbanktype(n.channelid);
                    var bank_list = '<li>'
                                        +'<div class="bank_head"><span class="bank_name">'+name+'</span><span class="bank_del"></span></div>'
                                        +'<div class="bank_num"><span>'+n.depositacct+'</span></div>'
                                    +'</li>';
                    $(".bank_list ul").append(bank_list);
                    $(".bank_del").unbind('click').click(function(){
                        showAlertDel(flag);
                        $(this).parents("li").addClass("li_del");
                    });
                });
            } else {
                setErrorMsg(data.retcode);
            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误");
        }
    })
})


var flag=false;

//弹出框 确认按钮加提示表示
function showAlertDel(callback, callback2) {
	if (false) {
		if (callback) {
			callback();
		}
	}

	hideAlert();

	var alertBoxMask = $('<div class="alertBoxNew"></div>');

	var alertBox;
	var alertBox_h = '';
	alertBox_h += '<div class="alertContent"><div class="pack">';
	alertBox_h += '<h3>是否删除该银行卡信息</h3>';
	alertBox_h += '<div class="subButton"><a class="cancle">取消</a><a class="confirm">确认</a></div>';
	alertBox_h += '<div class="clearfix"></div>';
	alertBox_h += '</div></div>';
	alertBox = $(alertBox_h);
	alertBoxMask.append(alertBox);

	$("body").append(alertBoxMask);
	$(".alertContent").height($(".alertText2").height() + 110);
	var alertMaskH;
	var contH = $(window).width();
	contH = parseInt((contH - 250) / 2);
	$(".alertContent").css("left", contH);
	if ($(document).height() >= $(window).height()) {
		alertMaskH = $(document).height();
	} else {
		alertMaskH = $(window).height();
	}
	$(".alertBoxNew").height(alertMaskH);
	var alertH = $(".alertContent").height();
	$(".alertContent").css("margin-top", -Math.ceil(alertH / 2));
	$(".subButton .confirm").click(function () {
		console.log("点击确认按钮！");
        $(".li_del").remove();
        var length = $(".bank_list ul li").size();
        console.log(length);
        if(length==0){
            $(".zanwu").show();
        }
		hideConfirm();
	});

	$(".subButton .cancle").click(function () {
		console.log("点击取消按钮！");
		if (callback2) {
			callback2();
		} else {
			hideConfirm();
		}
	});
}