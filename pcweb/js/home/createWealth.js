$(function(){
    load();
    function load(){
        $.ajax({
            type:"get",
            //url:mainUrl+"pcweb/data/pcguding.json",//测试环境
            url:mainUrl+"data/pcguding.json",//生产环境
            dataType:"JSON",
            beforeSend: function() {
                $(".create-wealth ul").html("");
            },
            success:function(data){
                for(i=0;i<data[5].length;i++){
                    var num= Number(data[5][i].profitRate*100).toFixed(2);
                    var min=data[5][i].min/10000;
                    var str = '<li class="product product0"><h1>'+data[5][i].name+'</h1><p><span class="biaoqian">复利滚存</span><span class="biaoqian">一次性还本息</span></p>';
                    str += '<p class="obj">历史年化收益率</p><p class="data">'+num+'<span class="baifenbi">%</span> </p>';
                    str += '<p class="qitou">起投金额：<span>'+min+'万</span> 投资期限：<span>'+data[5][i].days+'天</span></p><span class="home-button1 chuangfubao">立即查看</span></li>';
                    $(".create-wealth ul").append(str);
                }
                $(".chuangfubao").on("click",function(){
                    window.location.href= mainUrl+'fund/chuangfu.html';
                });
            }
        })

    }
});
