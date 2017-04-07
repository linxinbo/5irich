/**
 * Created by linxi on 2017/2/27.
 */
var username = $.cookie("username");
var newurl = document.referrer;
var isopen = $.cookie("isopen");
$(document).ready(function () {
    if (username == "" || username == null || username == undefined	|| username == "null") {
        showAlert("您没有登录！",gologin);
    }else{
        queryPrizeList();



    }



    function queryPrizeList(){
        showLoading();
        $.ajax({
            type: "GET",
            url: mainUrl + "queryPrizeList",
            data:"",
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log(data);
                if(data.retcode==0000){
                    $(".product").html("");
                    $(data.data).each(function(i,n){

                        var pie_right = '<div class="pro"><div class="pic"><img src="images/lipin_'+n.id+'.png" alt=""></div>'+
                            '<div class="des"><ul><li>'+ n.prizeName+'</li><li>投资免费拿：<span style="color:#ef5374">'+ n.prizeOriginal+'</span>元</li>' +
                            '<li>砍价最低拿：<span style="color:#ef5374">'+ n.prizeDiscount+'</span>元</li>'+
                            '<li><span class="k_goddess" data_id="'+n.id+'" data_name="'+n.prizeName+'" prizeB="'+n.prizeOriginal+'" prizeD="'+n.prizeDiscount+'">去砍价</span><span>兑换礼物</span></li></ul></div></div>';
                        $(".product").append(pie_right);
                        $(".k_goddess").on("click",function(){
                            var id=$(this).attr("data_id");
                            var name=$(this).attr("data_name");
                            var prizeB=$(this).attr("prizeB");
                            var prizeD=$(this).attr("prizeD");
                            window.location.href="k_goddess.html?prizeId="+id+"&prizeB="+prizeB+"&prizeD="+prizeD+"";
                        });



                    });
                }else{
                    setErrorMsg(data.retcode,data.retmsg)
                }


            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误！");
            }
        });
    }



});