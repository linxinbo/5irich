/**
 * Created by dell on 2016/9/27.
 */
var username = $.cookie("username");
var isopen = $.cookie("isopen");
$(function(){
    $.ajax({
        type:"get",
        url:mainUrl +"getAmount",
        data: "",
        dataType:"JSON",
        success:function(data){
            console.log( data.data)
            if(data.retcode == 0000){
                var num = 200-data.data;
                $(".display span").html(num);
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }

        },
        error: function (data) {
            showAlert("服务器错误！");
        }

    });
    if(username == "" || username == null || username == undefined	|| username == "null"){
        showAlert("您没有登录！",goMoniLogin);
        return;
    }else if(isopen != 1){
        showAlert("您还未开户！，请开户后进行相关操作",goisopen);
        return;
    }else{
        $.ajax({
            type:"get",
            url:mainUrl +"judgeJoin",
            data: "",
            dataType:"JSON",
            success:function(data){

              if(data.retcode=="0"){
                  //showAlert("您未参加活动！");
                  $("#qhongbao").off("click").on("click",function(){
                	  buyStep1("000009","易方达天天A");
                  })
                  return;
              }else if(data.retcode=="1"){
                  $("#qhongbao").off("click").on("click",function(){
                      showAlert("您已抢到红包！");
                      buyStep1("000009","易方达天天A");
                  });
                  
              }
            },
            error: function (data) {
                showAlert("服务器错误！");
            }
        })
    }

})

function goMoniLogin(){
    window.location.href = mainUrl+"mp/login.html";
}
function goisopen(){
    window.location.href = mainUrl+"mp/account/account.html";
}