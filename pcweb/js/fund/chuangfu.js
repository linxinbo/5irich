/**
 * Created by dell on 2016/12/22.
 */
$(document).ready(function(){
    var hash = window.location.hash;
    load_5();
    window.location.hash = "5";
    if (hash == "#5" || hash == "") {
        window.location.hash = "5";
        $(".five").addClass("qianshu_active");

    } else if (hash == "#20") {
        window.location.hash = "20";
        $(".twenty").addClass("qianshu_active");
    } else {
        window.location.hash = "100";
        $(".hundred").addClass("qianshu_active");
    }
    $(".five").click(function () {
        $(".display ul li").removeClass("qianshu_active");
        $(this).addClass("qianshu_active");
        window.location.hash = "5";
        load_5();
    });
    $(".twenty").click(function () {
        $(".display ul li").removeClass("qianshu_active");
        $(this).addClass("qianshu_active");
        window.location.hash = "20";
        load_20();
    });
    $(".hundred").click(function () {
        $(".display ul li").removeClass("qianshu_active");
        $(this).addClass("qianshu_active");
        window.location.hash = "100";
        load_100();
    });

    function load_5(){
        $.ajax({
            type:"get",
            //url:mainUrl+"pcweb/data/pcguding.json",//测试环境
            url:mainUrl+"data/pcguding.json",//生产环境
            dataType:"JSON",
            beforeSend: function() {
                $(".product").html("");
            },
            success:function(data){
                console.log(data)
                for(i=0;i<data[5].length;i++){
                    var num= Number(data[5][i].profitRate*100).toFixed(2);
                    var min=String(data[5][i].min);
                    var money= min.substring(0, min.length-4);
                    var h=$("<h1 name="+data[5][i].name+" day="+data[5][i].days+" rate="+num+" money="+money+">"+ data[5][i].name+"</h1>");

                    var p1=$("<p><span class='biaoqian'>复利滚存</span><span class='biaoqian'>一次性还本息</span></p>");
                    var p2=$("<p class='obj'>历史年化收益率</p>");
                    var p3=$("<p class='data'>"+num+"<span class='baifenbi'>%</span> </p>");
                    var p4=$(" <p class='qitou'>起投金额：<span>"+money+"</span>万 投资期限：<span>"+ data[5][i].days+"天</span></p>");
                    var btn=$("<button data-id='"+money+"'>立即预约</button>")

                    $(".product"+i).append(h,p1,p2,p3,p4,btn);

                }
                $("button").on("click",function(){
                    var min_20=$(this).attr("data-id");
                    window.location.href="order.html?min_20="+min_20+"";

                });
                $(".product h1").click(function(){
                    var name=$(this).attr("name");
                    var day=$(this).attr("day");
                    var rate=$(this).attr("rate");
                    var money=$(this).attr("money");
                    window.location.href="chuangfudetail.html?name="+name+"&day="+day+"&rate="+rate+"&money="+money;
                })
            }
        })

    }
    function load_20(){
        $.ajax({
            type:"get",
            //url:mainUrl+"pcweb/data/pcguding.json",//测试环境
            url:mainUrl+"data/pcguding.json",//生产环境
            dataType:"JSON",
            beforeSend: function() {
                $(".product").html("");
            },
            success:function(data){
                for(i=0;i<data[20].length;i++){
                    var num= Number(data[20][i].profitRate*100).toFixed(2);
                    var min=String(data[20][i].min);
                    var money= min.substring(0, min.length-4);
                    var h=$("<h1 name="+data[20][i].name+" day="+data[20][i].days+" rate="+num+" money="+money+">"+ data[20][i].name+"</h1>");
                    var p1=$("<p><span class='biaoqian'>复利滚存</span><span class='biaoqian'>一次性还本息</span></p>");
                    var p2=$("<p class='obj'>历史年化收益率</p>");

                    var p3=$("<p class='data'>"+num+"<span class='baifenbi'>%</span> </p>");
                    var min=String(data[20][i].min);
                    var p4=$(" <p class='qitou'>起投金额：<span>"+money+"</span>万 投资期限：<span>"+ data[20][i].days+"天</span></p>");
                    var btn=$("<button data-id='"+money+"'>立即预约</button>")

                    $(".product"+i).append(h,p1,p2,p3,p4,btn);

                }
                $("button").on("click",function(){
                    var min_20=$(this).attr("data-id");
                    window.location.href="order.html?min_20="+min_20+"";

                });
                $(".product h1").click(function(){
                    var name=$(this).attr("name");
                    var day=$(this).attr("day");
                    var rate=$(this).attr("rate");
                    var money=$(this).attr("money");
                    window.location.href="chuangfudetail.html?name="+name+"&day="+day+"&rate="+rate+"&money="+money;
                })
            }
        })

    }
    function load_100(){
        $.ajax({
            type:"get",
            //url:mainUrl+"pcweb/data/pcguding.json",//测试环境
            url:mainUrl+"data/pcguding.json",//生产环境
            dataType:"JSON",
            beforeSend: function() {
                $(".product").html("");
            },
            success:function(data){
                console.log(data)
                for(i=0;i<data[100].length;i++){
                    var num= Number(data[100][i].profitRate*100).toFixed(2);
                    var min=String(data[100][i].min);
                    var money= min.substring(0, min.length-4);
                    var h=$("<h1 name="+data[100][i].name+" day="+data[100][i].days+" rate="+num+" money="+money+">"+ data[100][i].name+"</h1>");

                    var p1=$("<p><span class='biaoqian'>复利滚存</span><span class='biaoqian'>一次性还本息</span></p>");
                    var p2=$("<p class='obj'>历史年化收益率</p>");
                    var num= Number(data[100][i].profitRate*100).toFixed(2);
                    var p3=$("<p class='data'>"+num+"<span class='baifenbi'>%</span> </p>");
                    var min=String(data[100][i].min);
                    var money= min.substring(0, min.length-4);
                    var p4=$(" <p class='qitou'>起投金额：<span>"+money+"</span>万 投资期限：<span>"+ data[100][i].days+"天</span></p>");
                    var btn=$("<button data-id='"+money+"'>立即预约</button>")

                    $(".product"+i).append(h,p1,p2,p3,p4,btn);
                }
                $("button").on("click",function(){
                    var min_20=$(this).attr("data-id");
                    window.location.href="order.html?min_20="+min_20+"";

                });
                $(".product h1").click(function(){
                    var name=$(this).attr("name");
                    var day=$(this).attr("day");
                    var rate=$(this).attr("rate");
                    var money=$(this).attr("money");
                    window.location.href="chuangfudetail.html?name="+name+"&day="+day+"&rate="+rate+"&money="+money;
                })
            }
        })

    }
})
