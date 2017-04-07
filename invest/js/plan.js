/**
 * Created by dell on 2017/3/24.
 */
$(document).ready(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");

    //引导用户登录开户
    if(username == "" || username == null || username == undefined|| username == "null") {
        window.location.href = "login.html";
    }else if(isopen != 1) {
        window.location.href = "account.html";
    }else {
        $.ajax({
            type: "get",
            url: mainUrl + "queryScene",
            dataType: "JSON",
            success: function (data) {
                if(data.retcode==0000){
                    if(data.data.length==0){
                        var box=$("<div class='null'>您还没有计划</div>");
                        $(".planlist").append(box);
                            var height=window.screen.height;
                            var boxheight=$(".null").height();
                            var boxwidth=$(".null").width();
                            var footer=$(".footer").height();
                            var newheight=(height-boxheight-footer)/2;
                            $(".null").css({top:newheight+"px"});
                    }else{
                        $(data.data).each(function(i,n){
                            var number= n.scene_no; //计划编号
                            var mokuai;
                            var imgsrc;
                            switch(number)
                            {
                                case "A":
                                    mokuai="旅行度假";
                                    imgsrc="images/plan_travel.png";
                                    break;
                                case "B":
                                    mokuai="子女教育";
                                    imgsrc="images/plan_edu.png";
                                    break;
                                case "C":
                                    mokuai="购房置业";
                                    imgsrc="images/plan_home.png"
                                    break;
                            }
                            var scenename= n.scene_name;
                            var money= n.scene_money;
                            var jihua= n.scene_scheme;
                            var account= n.debit_account;
                            var box=$("<div class='list'><img src='images/top.png' style='width:100%;'>" +
                                "<ul><li><div style='position: relative;'><img src='"+imgsrc+"' class='touxiang'><div class='biaoti'>"+mokuai+"</div></div></li>" +
                                "<li class='li2'><div><span style='font-size:1.4em;font-weight: 700;'>"+scenename+"</span></div><div><span style='font-size:1.4em;'>￥"+money+"</span></div></li>" +
                                "<li><span style='font-size: 1.1em;color:#787c82;'>定投方案：</span><span style='font-size: 1.2em;'>"+jihua+"</span></li>" +
                                "<li style='padding-bottom:1.5em;'><span style='font-size: 1.1em;color:#787c82;'>扣款账户：</span><span style='font-size: 1.2em;'>"+account+"</span></li>" +
                                " <li class='stop' style='color:#ff9600;text-align: center;font-size: 1.4em;border-top: solid 1px #edf0f4;'>终止计划</li></ul></div>");
                            $(".planlist").append(box);

                        })
                        $(".stop").click(function(){
                            console.log(1)
                        })
                    }

                }else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            }
        })

    }

})