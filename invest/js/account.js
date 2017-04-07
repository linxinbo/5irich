/**
 * Created by d on 2016/5/7.
 */
$(document).ready(function () {
    $(".account").click(function(){
        openStep1();
    });



});
function openStep1() {
    var openName = $("#name").val();
    var cardNo = $("#cardNo").val();
    var email = $("#email").val();
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    var str1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    var clickflag =$('#jzwo').is(':checked');
    var str2 =/^\s+$/g;
    if (openName == "" || openName == null||str2.test(openName)) {
        showAlertApp("姓名不能为空或空格");
        return false;
    }

    //判断身份证号
    if (cardNo == "" || cardNo == null) {
        showAlertApp("身份证号不能为空");
        return false;
    } else {
        if (!checkIdNum(cardNo)) {
            showAlertApp("身份格式错误");
            return false;
        };

    }

    //email
    if (email == "" || email == null) {
        showAlertApp("邮箱不能为空");
        return false;
    } else {
        if (!valiEmail(email)) {
            showAlertApp("邮箱格式错误！");
            return false;
        }

    }
    if (!str1.test(password1)) {
        showAlertApp("密码格式错误，必须为6-16位数字、字母组合");
        return false;
    }
    //密码

    if (password1 == "" || password1 == null || password2 == "" || password2 == null) {
        showAlertApp("密码不能为空");
        return false;
    } else {
        if (password1 != password2) {
            showAlertApp("两次输入的密码不一致");
            return false;
        }

    }
    //同意协议
    if(!clickflag){
        showAlertApp("请阅读相关协议");
        return false;
    }
    window.location.href = "account_confirm.html?openName=" + openName + "&cardNO=" + cardNo +  "&email=" + email + "&password=" + password1 + "";
}