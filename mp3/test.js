/**
 * Created by CJQF on 2016/10/17.
 */
$(document).ready(function () {
    var username = $.cookie("username");
    var isopen = $.cookie("isopen");
    console.log(username);
    $("#name").html("");
    $("#name").append(username);
    $("#isopen").html("");
    $("#isopen").append(kh(isopen));



});


function kh(val){
    if (val == "" || val == null || val == undefined|| val == "null"||val==0||val=="0") {
        return "未开户"
    } else {
        return "已开户"
    }
}