$(function(){
    //私募基金
    window.onload=function getSelf(){
        $.ajax({
            url: mainUrl+"privatefundlist",
            data: {
                page: "1",
                pageRecorders: "50"
            },
            dataType: "JSON",
            success: function (data) {
                alert(data.retcode);
                $(".self_data ul").html("")
                $(data.data).each(function(i,n){
                    var simudata ='<li>'
                +'<div class="table_header"><span class="self_name">'+n.name+'</span><input type=submit value="购买" class="self_buy" /></div>'
                +'<table class="table_data">'
                    +'<tr><td class="td_1">基金经理:</td><td class="td_2">'+n.fInfoFundmanager+'</td><td class="td_3">成立日期:</td><td class="td_4">2015-9-17</td></tr>'
                    +'<tr><td class="td_1">单位净值:</td><td class="td_2 font_color">999.99</td><td class="td_3">净值日期:</td><td class="td_4">2015-9-18</td></tr>'
                    +'<tr><td class="td_1">复权净值:</td><td class="td_2 font_color">999.99</tds><td class="td_3">累计收益:</td><td class="td_4 font_color">'+n.favgreturnsincefound+'</td></tr>'
                +'</table>'
                +'<table class="table_rule">'
                    +'<tr><td class="td_5">基本要素:</td><td class="td_6">100万起</td></tr>'
                    +'<tr><td class="td_5">开放日期:</td><td class="td_6">成立之后的每月15日<br/>(如遇节假日则为该日之前最近一个工作日)</td></tr>'
                    +'<tr><td class="td_5">费率结构:</td><td class="td_6">认购费1%</td></tr>'
                    +'<tr><td class="td_5">赎回费率:</td><td class="td_6">封闭期内赎回费为3%；封闭期后无赎回费</td></tr>'
                +'</table>'
            +'</li>';
                    $(".self_data ul").append(simudata); 
                })
            }
        })
    };
})