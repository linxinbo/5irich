/**
 * Created by dell on 2017/3/27.
 */
var leiji = 0;
var zong = 0;
var yester = 0;
$(document).ready(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var imgurl = $.cookie("imgurl");
    $(".topbox .name").html(username);
    if(imgurl != undefined && imgurl){
        $('.mytouxiang1').attr('src',imgurl);
    }
    if(username == "" || username == null || username == undefined|| username == "null") {
        window.location.href = "login.html";
    }else if(isopen != 1) {
        window.location.href = "account.html";
    }else {
        $.ajax({
            type:"get",
            url: mainUrl + "asset_castsurely",
            dataType:"JSON",
            success:function(data){
                if(data.retcode==0000){
                    $(data.data).each(function(i,n){
                          var fundname= n.fundname;
                          var jine= n.fundmarketvalue;
                          var shouyi= n.floatprofit;
                          var yesshouyi= n.fundmarketvalue_ud;
                         var fundid= n.transactionaccountid;
                          var fundcode= n.fundcode;
                          var date= n.navdate.substring(4,8);
                          var newdatearr=new Array();
                          newdatearr=date.split("");
                          newdatearr.splice(2,0,"-");
                         var newdate1=newdatearr.join("");
                          $(".topbox .date").html("("+newdate1+")");
                          zong+=Number(jine);
                          leiji+=Number(shouyi);
                          yester+=parseFloat(yesshouyi);
                          var box=$("<ul class='list' data-id="+fundid+" data-code="+fundcode+" data-name="+fundname+"><li><span class='lista'>"+fundname+"</span><span class='listb'>"+shouyi+"</span></li>" +
                              "<li><span class='listc'>持仓金额："+jine+"</span><span class='listd'>累计收益</span></li></ul>");
                          $(".dangqian").append(box);

                    });
                    $(".list").click(function(){
                        var fundid = $(this).attr("data-id");
                        var fundname = $(this).attr("data-name");
                        var fundcode = $(this).attr("data-code");
                        window.location.href = "asset_detail.html?fundid=" + fundid + "&fundname=" + fundname+"&fundcode=" + fundcode;

                    })
                   $(".topbox .zongzichan").html(zong);
                    $(".topbox .leiji").html(leiji);
                    $(".topbox .yester").html(yester.toFixed(2));
                }else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }
        });
        $(".mytouxiang1").click(function(){
            window.location.href="center.html";
        })

    }
})
