/**
 * Created by dell on 2016/10/8.
 */
$(document).ready(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var isweixin = $.cookie("isweixin");
    var imgurl = $.cookie("imgurl");
    var args = new getArgs();
    var fundgroupname = args.fundgroupname;
    var fundgroupcode = args.fundgroupcode;
    var groupFundBuyId = args.groupFundBuyId;
    //console.log($.cookie());
    if(imgurl != undefined && imgurl){
        $('.ma_userhead').attr('src',imgurl);
    }
    if (username == "" || username == null || username == undefined|| username == "null") {
        setErrorMsg(1001);
        return false;
    }else if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);
    }else{
        groupAssets(fundgroupcode);
        group_gg(fundgroupcode);
        webGroupQuery(fundgroupcode);
        groupAssets_read(groupFundBuyId);
        if(fundgroupname==""&&fundgroupcode==""&&groupFundBuyId==""||fundgroupname==undefined&&fundgroupcode==undefined&&groupFundBuyId==undefined){
            showAlert("参数错误！",goNewAsset);
        }else{
            $("#group_back").off("click").on("click",function(){   //赎回
                backGroupStep1(fundgroupname, fundgroupcode,groupFundBuyId);
            });

        }



    }

});
//组合资产显示
function groupAssets(){


}

//组合资产显示-详细
function groupAssets_read(val){
    showLoading();
    var groupFund_id=val;
    $.ajax({
        type: "post",
        url: mainUrl + "groupFund_singleListQuery",
        data: {
            groupFund_id: groupFund_id
        },
        dataType: "json",
        success: function (data) {
            //console.log(data);
            hideloading();
            if(data.retcode=="0000"||data.retcode==0000){
                $(".csdj_ul").html("");
                var fundmarketvalue_ud_total=0;
                var fundmarketvalue_total=0;
                var floatprofit_total=0;
                //console.log(data);
                if(data.data){
                $(data.data).each(function(i,n){
                    var fundname= n.fundname;

                    fundmarketvalue_ud_total += parseFloat(n.fundmarketvalue_ud);
                    fundmarketvalue_total += parseFloat(n.fundmarketvalue);
                    floatprofit_total += parseFloat(n.floatprofit);
                    if(fundname.length>11){
                        fundname=fundname.substring(0,11)+'...';
                    }
                    var ma_font1 = 'fontRed';
                    if(parseFloat(n.floatprofit) < 0){
                        ma_font1 = 'fontGreen';
                    }
                    var zr_font = "fontRed";
                    if(parseFloat(n.fundmarketvalue_ud) < 0){
                        zr_font = 'fontGreen';
                    }
                    var pie_right = '<div class="zngroup_list"><div class="zngroup_list_left"><i class="zngroup_box bgcolor'+i+'"></i></div><div class="zngroup_list_right"><h2 style="color: #ee524f"><i class="'+zr_font+'">'+formatCurrency(n.fundmarketvalue_ud)+'</i>元</h2><span>昨日收益</span></div><div class="zngroup_list_center"><h2 class="fontb0">'+fundname+'('+n.fundcode.substring(0,6)+')</h2><span>累计收益：<i class="'+ma_font1+'">'+formatCurrency(n.floatprofit)+'</i> 元 持仓金额：'+formatCurrency(n.fundmarketvalue)+' 元</span></div></div>';
                    //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                    $(".csdj_ul").append(pie_right);


                    $(".adeyester i").html("");
                    $(".adeyester i").append(n.navdate.substring(n.navdate.length-4, n.navdate.length));

                });
                    $(".adeyester span").html("");
                    $(".adeyester span").append(formatCurrency(fundmarketvalue_ud_total));
                    //$(".adeyester i").append(n.navdate.substring(n.navdate.length-5, n.navdate.length));

                    $(".adecurr span").html("");
                    $(".adecurr span").append(formatCurrency(fundmarketvalue_total));
                    $(".adetotal span").html("");
                    $(".adetotal span").append(formatCurrency(floatprofit_total));
                    /*if(fundmarketvalue_ud_total<0){
                        $(".adeyester span").attr("class","fontGreen")
                    }else{
                        $(".adeyester span").attr("class","fontRed")
                    }
                    if(floatprofit_total<0){
                        $(".adetotal span").attr("class","fontGreen")
                    }else{
                        $(".adetotal span").attr("class","fontRed")
                    }
*/
                }else{
                    var pie_right = '<div class="zngroup_list"><div class="zngroup_list_left"><i class="zngroup_box bgcolor0"></i></div><div class="zngroup_list_right"><h2 style="color: #ee524f"></h2><span></span></div><div class="zngroup_list_center"><h2 class="fontb0">暂时没有数据或数据错误！</h2><span>累计收益：0元 持仓金额：0元</span></div></div>';
                    //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                    $(".csdj_ul").append(pie_right);

                }

            }else{

            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误！");
        }
    })



}

//组合环形图
function webGroupQuery(fdGroupCode){
    showLoading();
    $.ajax({
        type: "post",
        url: mainUrl + "WebProportionalQueryAction",
        data: {
            groupId: fdGroupCode
        },
        dataType: "json",
        success: function (data) {
            hideloading();
            //console.log(data);
            var tbdata  =[];
            var wzdata1 =[];
            if (data.retcode == 0000) {

                //console.log(data);
                $(data.data).each(function(i,n){
                    tbdata.push({"value":Number(n.fdProportional), "name":n.fundName});
                    wzdata1[i]= n.fundName;
                    //console.log(i);
                });
                //console.log(wzdata1);
                //console.log(tbdata);
                myChart.setOption({
                    legend: {data: wzdata1},
                    series: [{data: tbdata}]//根据名字对应到相应的系列
                });

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

function getdoit2(n) {
    var x = n.indexOf(".");
    if (x == -1) {
        n = n+'.00';
    } else{
        var len = n.split('.')[1].length;
        if(len==1){
            n = n+'0';
        }else{
            n = n.substring(0, x + 3);

        }
    }
    return n;
}
function backGroupStep1(fundgroupname, fundgroupcode,groupFundBuyId){
    window.location.href = "../take_back/back_group.html?fundgroupname=" + fundgroupname + "&fundgroupcode="+fundgroupcode+"&groupFundBuyId=" + groupFundBuyId;
}

function goNewAsset() {
    window.location.href = mainUrl+"mp/my-assets/new_assets.html";
}


//基金公告方法
function group_gg(groupId){
    showLoading();
    //组合基金历史净值
    $.ajax({
        type: "post",
        url: mainUrl + "WebAnnouncementQueryAction",
        data: {
            groupId: groupId
        },
        dataType: "json",
        success: function (data) {
            hideloading();
            //console.log(data);
            if (data.retcode == 0000) {
                $(".groupnews").html("");
                $(data.data).each(function(i,n){
                    var history_data55 = '<a style="display: block;line-height: 2.8em;border-bottom: 1px solid #dddddd;overflow: hidden;"><span style="float: left;">'+ n.fdGroupAction +'</span><b style="float: right;">'+ n.annDate +'</b></a><p style="padding: 1em;line-height: 1.5;">'+n.actionText+'</p>';
                    $(".groupnews").append(history_data55);

                });
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