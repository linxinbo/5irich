/**
 * Created by linxi on 2016/12/26.
 */
var paprCode;
var i;
$(function() {
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var isweixin = $.cookie("isweixin");
    var imgurl = $.cookie("imgurl");
    if (username == "" || username == null || username == undefined || username == "null") {
        showAlert("您没有登录！",loginStart);
        return false;
    } else if (isopen == '0' || isopen == 0) {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);
        return false;
    } else {
        //后台判断用户是否登录的接口
        $.ajax({
            url: mainUrl + "getLoginUserInfoForRequest",
            data: "",
            dataType: "JSON",
            success: function (data) {
                //hideloading();
                var riskdj="";
                var riskdjsm="";
                var riskfx="";
                var rsiksy="";
                console.log(data);
                if (data.data.status){
                    risklquery();

                    $(".btn-risk").unbind("click").on("click",function(){
                        var answer="";
                        var score="";

                        $(".risktest1").each(function(index,ele){
                            i=index+1;
                            var name="A"+i;
                            console.log(i);
                            //$(this).children().children().each(function(i,n){
                                var t=$("input:radio[name='"+name+"']:checked").val();
                                var y=$("input:radio[name='"+name+"']:checked").attr("data-id");
                                    answer +=""+t+"|";
                                    score += ""+y+"|";



                            //});

                        });
                        var answer1=answer.substring(0,answer.length-1);
                        var score1=score.substring(0,score.length-1);
                        if(answer.length==i*2){

                            $.ajax({
                                type: "post",
                                url: mainUrl + "riskltest",
                                data: {
                                    "leveltest.papercode": paprCode,
                                    "leveltest.answer": answer1,
                                    "leveltest.pointList": score1,
                                    "leveltest.invtp": 1,
                                    "leveltest.iscontinue": 1
                                },
                                dataType: "JSON",
                                success: function (data) {
                                    //hideloading();
                                    if (data.retcode == 0000) {
                                        var newurl = document.referrer;
                                        console.log(newurl);
                                        if (newurl == "" || newurl == null) {
                                            showAlert("提交成功",gorisk)
                                        } else{
                                            window.location.href=document.referrer;
                                        }
                                    } else {
                                        setErrorMsg(data.retcode, data.retmsg);
                                        //错误信息增加
                                        //$(".bugmsg").html(data.retmsg);
                                        //$("#bugmsg").show();
                                    }
                                },
                                error: function (data) {
                                    //hideloading();
                                    //alert("请稍后重试！");
                                    showAlert("网络错误，请稍后重试！");
                                    //$("#bugmsg").show();
                                }
                            })


                        }else{
                            showAlert("请填写完整表单！")
                            return false;
                        }
                        //console.log(answer,score)





                    });


                }else{
                    showAlert("您没有登录！",loginStart);
                    //showAlert(data.data.msg, gologin);

                }
            }
        });



    }
});

function risklquery(){
    $.ajax({
        url: mainUrl + "risklquery",
        data: "",
        dataType: "JSON",
        success: function (data) {
            //hideloading();
            console.log(data);
            var riskhtml="";
            if(data.retcode="0000"){
                paprCode=data.data.paprCode;
                for(var i=0;i<data.data.qustList.length;i++){
                    var m=i+1;
                    riskhtml += "<h3 class='risktitle1'>"+m+"."+data.data.qustList[i].questName+"</h3><div style='padding: 20px;' class='risktest1'><ul>";
                    for(var j=0;j<data.data.qustList[i].itemList.length;j++){
                        riskhtml += '<li><label class="riskmleft5"><input type="radio" value="'+data.data.qustList[i].itemList[j].result+'" name="A'+m+'" data-id="'+data.data.qustList[i].itemList[j].resultpoint+'">'+data.data.qustList[i].itemList[j].resultcontent+'</label></li>';
                    }
                    riskhtml += "</ul></div>";
                }
                $(".riskcontent1").html(riskhtml);


            }else{
                setErrorMsg(data.retcode,data.retmsg);
            }
        },
        error: function (data) {
            //hideloading();
            showAlert("网络错误，请稍后重试！");
            //$("#bugmsg").show();
        }
    });
}

function gorisk(){
    window.location.href = "my_risk.html";
}