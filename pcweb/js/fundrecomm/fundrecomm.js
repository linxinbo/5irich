/**
 * Created by dell on 2016/11/22.
 */
$(document).ready(function(){


        getStockTypeList("混合型",0,".frhunhe");
        getStockTypeList("债券型",1,".frzhaiquan");
        getStockTypeList("货币型",2,".frhuobi");
        getStockTypeList("QDII",3,".frqd");
        getStockTypeList("股票型",4,".frgp");

    function getStockTypeList(stockType, stockcode,box) {
        $.ajax({
            type: "get",
            url: "http://www.5irich.com/products",
            data: {
                fdType: stockType,
                pageSize: 0
            },
            dataType: "JSON",
            success: function (data) {
                //console.log(data)
                if (data.retcode == 0000) {
                    $(data.data).each(function (i, n) {
                        var strHtml = "";
                        var classname;
                        var fundId = n.fundId.slice(0,6);
                        var fundId1=n.fundId;
                        var fundName = n.fundName;
                        var fNavUnit = parseFloat(n.fNavUnit).toFixed(4);  //最新净值
                        var fundTypeGoods = n.fundTypeGoods;
                        var fAvgreturnYear = parseFloat(n.fAvgreturnYear).toFixed(2)+"%";  //近一年收益
                        if(n.fAvgreturnYear<0 ){
                            classname="green"
                        }else{
                            classname="red"
                        }
                        var paiming= n.fSfrankRecentyear;
                        var reason= n.recommendReason;
                        var frtuijian=$("<ul class='frtuijian' fund_id="+fundId1+" fundname="+fundName+" type="+stockType+"></ul>");
                        var li1=$("<li class='fredetail' style='text-align: left;padding-left:20px;' fund_id="+fundId1+" fundname="+fundName+" type="+stockType+"><i>"+fundName+"<br><span>"+fundId+"</span></i><a></a></li>");
                        var li2=$("<li><i>"+fNavUnit+"<br><span></span></i><a></a></li>");   //缺少最新净值时间
                        var li3=$("<li class='"+classname+"'>"+fAvgreturnYear+"<a></a></li>");
                        var li4=$("<li>"+paiming+"<a></a></li>");
                        var li5=$("<li class='reason'><i>"+reason+"</i><a></a></li>");
                        var li6=$("<li class='ljbuy'style='cursor: pointer;'><span style='color:#ff9900;padding:5px 5px;'>立即购买<a></a></span></li>")
                        frtuijian.append(li1,li2,li3,li4,li5,li6);
                        $(box).append(frtuijian);
                        $(".fredetail").off("mouseover").on("mouseover",function(){  //跳转到详情页
                                $(this).css({cursor:"pointer"});
                        })
                        $(".fredetail").off("click").on("click",function(){//跳转到详情页
                                var id=$(this).attr("fund_id");
                                var name=$(this).attr("fundname");
                                var type=$(this).attr("type");
                                window.location.href="../fund/fund-detail.html?fundid="+id+"&fundname="+name+"&type="+type;

                        });
                        $(".ljbuy").click(function(){
                            var id= $(this).parent("ul").attr("fund_id").substring(0,6);
                            var name=$(this).parent("ul").attr("fundname");
                            buyNewStep1(id,name);
                        });
                        $(".ljbuy span").mouseover(function(){
                             $(this).css({background:"#ff9900",color:"#fff",border:"solid 1px #ff9900"})
                        });
                        $(".ljbuy span").mouseout(function(){
                            $(this).css({background:"#fff",color:"#ff9900",border:"none"})
                        })
                        $(".frtuijian").mouseover(function(){
                            $(this).css({background:"#F5F8FC"})
                        });
                        $(".frtuijian").mouseout(function(){
                            $(this).css({background:"#fff"})
                        })
                    });


                } else {
                    setErrorMsg(data.retcode,data.redmsg);
                }
            },
            error: function (data) {
                showAlert("服务器错误！");
            }

        })
    }
})