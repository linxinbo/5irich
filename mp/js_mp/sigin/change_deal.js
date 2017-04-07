/**
 * Created by d on 2016/5/7.
 */
$(function () {

})

function changeDealPW() {
    var pw1 = $("#PW1").val();
    var newPW1 = $("#newPW1").val();
    var newPW2 = $("#newPW2").val();
    var str1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

    if (pw1 == "" || pw1 == null || newPW1 == "" || newPW1 == null || newPW2 == "" || newPW2 == null) {
        showAlert("密码不能为空");
        return;
    }
    if (newPW1 != newPW2) {
        showAlert("两次输入的密码不一致！");
        return;
    }
    if (!str1.test(newPW1)) {
        showAlert("密码为6-16位数字和字母间隔！");
        return;
    }
    /*	if (str2.test(newPW1) || str2.test(newPW2)) {
     showAlert("交易密码不能含有连续3位数字或字母！"); //"交易密码格式错误！"
     return;
     }*/

    changeDealAjax(pw1, newPW1);
}

//修改交易密码
function changeDealAjax(pw1, newPW1) {
    hideloading();
    showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "modifyBusinessPW",
        data: {
            "busPWModifyBean.oldpwd": pw1,
            "busPWModifyBean.newpwd": newPW1
        },
        dataType: "json",
        success: function (data) {
            hideloading();
            if (data.retcode == 0000) {
                window.location.href = "change_deal_right.html";
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误");
        }
    })
}