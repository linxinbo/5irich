/**
 * Created by CJQF on 2016/9/21.
 */
$(document).ready(function () {
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var args = new getArgs();
    var repeat = args.repeat;
    console.log(username);
    if (username == "" || username == null || username == undefined	|| username == "null") {
        window.location.href="index0.html";

    } else {
        showLoading()
        $.ajax({
            url : mainUrl + "queryRecord",
            data : "",
            dataType : "JSON",
            success : function(response) {
                console.log(response);
                hideloading();
                if(response.retcode=="0000"){
                    var level=response.data.level;
                    if(repeat=="ok"){
                        window.location.href="index0.html";

                    }else if(level==undefined){
                        window.location.href="index0.html";
                    }else{
                        window.location.href="zn_home.html?level="+level+"";
                    }
                }else{
                    window.location.href="index0.html";
                }
            },
            error : function(response1) {
                hideloading();
                showAlert("服务器错误！");
            }
        });

    }
});