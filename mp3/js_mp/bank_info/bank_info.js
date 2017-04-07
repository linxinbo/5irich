/**
 * Created by linxi on 2017/2/22.
 */
$(document).ready(function () {
    showLoading();
    $("#bank_explain").html("");
    $.ajax({
        type: "get",
        url: mainUrl + "mp/data_mp/banksall.json",
        data: "",
        dataType: "JSON",
        success: function (data){
            hideloading();
            $(data).each(function (i, n) {
                if(n.name.substring(0,2)=="通联"){

                }else{
                    var bankinfo='<li style="background: url(images/'+ n.picture+') no-repeat 1em center; background-size: 2em 2em;"><span style="font-size:1.3em;color:#434343;">'+ n.name+'</span><span style="float:right;color:#999;">支持单笔'+parseFloat(n.singlelimit)/10000+'万网上支付交易</span></li>';
                    $("#bank_explain").append(bankinfo);
                }
            });

        },
        error: function (data) {
            hideloading();
            alert("请稍后重试！");
        }});
});