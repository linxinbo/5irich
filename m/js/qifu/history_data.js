var page = 1; //当前页
var pageSize = 17; //每页条数
var page_length = 1;//总页数
var num = 0;//tr 总条数
$(function(){
    history();
    function history(){
        var args = new getArgs();
        var groupId = args.groupId;
        var enddate = new Date().Format("yyyyMMdd");
        hideloading();
        showLoading();
        //组合基金历史净值
        $.ajax({
            type: "post",
            url: mainUrl + "WebHistoryNavQueryAction",
            data: {
                groupId: groupId,
                enddate: enddate
            },
            dataType: "json",
            success: function (data) {
                hideloading();
                console.log(data.retcode);
                if (data.retcode == 0000) {
                    $(".history_data table").html("");
                    var table_head = '<tr><th>净值日期</th><th>组合净值</th><th>涨跌幅</th></tr>'
                    $(".history_data table").append(table_head);
                    $(data.data).each(function(i,n){
                        var priceDate = n.priceDate.substring(0,4)+"-"+n.priceDate.substring(4,6)+"-"+n.priceDate.substring(6,n.priceDate.length);
                        var history_data = '<tr><td class="td_5">'+priceDate+'</td><td class="td_6">'+n.fdGroupUnitValue+'</td><td class="td_7 '+i+'">'+n.gracet+'%</td></tr>';
                        $(".history_data table").append(history_data);
                        var value = n.gracet; //取值 转数字
                        //根据正负判断颜色
                        if(value>0){
                            $(".td_7."+i).parent().css('color','#ef3d3e');
                        }else if(value<0){
                            $(".td_7."+i).parent().css('color','#14a945');
                        }else{
                            $(".td_7."+i).parent().css('color','#323232');
                        }
                    });
                    num = $(".history_data table tr").length;
                    console.log(num);
                    page_length = Math.floor(num/17)+1;
                    console.log(page_length);
                    $(".history_data table tr:lt("+(page-1)*pageSize+")").hide();
                    $(".history_data table tr:gt("+page*pageSize+")").hide();
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                hideloading();
                showAlert("服务器错误！");
            }
        })
    }
    $(".first_page").unbind("click").click(function(){
        history();
        page = "1";
    });
    $(".last_page").unbind("click").click(function(){
        history();
        page = page_length;
    });
    $(".pre_page").unbind("click").click(function(){
        if(page>1){
            page--;
        } 
        history();
    });
    $(".next_page").unbind("click").click(function(){
        if(page<page_length){
            page++;
        } 
        history();
    });
})

