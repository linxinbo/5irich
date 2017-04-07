/**
 * Created by linxi on 2016/12/14.
 */
$(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    var isweixin = $.cookie("isweixin");
    var imgurl = $.cookie("imgurl");
    var args = new getArgs();
    var fundgroupname = args.fundgroupname;//基金名称
    var fundgroupcode = args.fundgroupcode;//基金代码
    var groupFundBuyId = args.groupFundBuyId;//id

    $(".position_fund_title a").html(fundgroupname);//基金名称
    $(".position_fund_title span").html(fundgroupcode);//基金代码

    if (username == "" || username == null || username == undefined|| username == "null") {
        setErrorMsg(1001);
        return false;
    }else if (isopen == "" || isopen == null || isopen == undefined|| isopen == "null"||isopen==0||isopen=="0") {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);
    }else{
        groupAssets(fundgroupcode);
        group_gg(fundgroupcode);//组合公告
        webGroupQuery(fundgroupcode);//组合比例
        groupAssets_read(groupFundBuyId);//组合资产+单条和总资产
        groupdayincome(fundgroupcode,groupFundBuyId,0,10);//组合每日收益
        groupfundlist(groupFundBuyId)//组合交易记录
        if(fundgroupname==""&&fundgroupcode==""&&groupFundBuyId==""||fundgroupname==undefined&&fundgroupcode==undefined&&groupFundBuyId==undefined){
            //showAlert("参数错误！",goNewAsset);错误处理重新写
        }else{
            $(".fund_redeem").off("click").on("click",function(){   //赎回
                backGroupStep1(fundgroupname, fundgroupcode,groupFundBuyId);
            });
            $(".fund_buy").off("click").on("click",function(){   //赎回
                buyGroupStep1(fundgroupcode,fundgroupname);
            });


        }
    }
    //组合信息切换
    $("#positionlist a").click(function(){
        $(this).siblings().removeClass("select").end().addClass("select");
        var tradeid=$("#positionlist a.select").attr("data-id");
        if(tradeid==1){
            $("#investment").show();
            $("#dayincome").hide();
            $("#trade_record").hide();
            $("#position").hide();
        }else if(tradeid==2){
            $("#investment").hide();
            $("#dayincome").show();
            $("#trade_record").hide();
            $("#position").hide();
        }else if(tradeid==3){
            $("#investment").hide();
            $("#dayincome").hide();
            $("#trade_record").show();
            $("#position").hide();
        }else if(tradeid==4){
            $("#investment").hide();
            $("#dayincome").hide();
            $("#trade_record").hide();
            $("#position").show();
        }
    });

});


//组合资产显示
function groupAssets(){


}

//组合资产显示-详细+总资产自己处理
function groupAssets_read(val){
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
            if(data.retcode=="0000"||data.retcode==0000){
                $("#investment1 table tbody").html("");
                var fundmarketvalue_ud_total=0;
                var fundmarketvalue_total=0;
                var floatprofit_total=0;
                var costmoney_total=0;
                var createTime;
                //console.log(data);
                if(data.data){
                    $(data.data).each(function(i,n){
                        var fundname= n.fundname;

                        fundmarketvalue_ud_total += parseFloat(n.fundmarketvalue_ud);
                        fundmarketvalue_total += parseFloat(n.fundmarketvalue);
                        floatprofit_total += parseFloat(n.floatprofit);
                        costmoney_total += parseFloat(n.costmoney);
                        createTime= n.createTime;
                        if(fundname.length>11){
                            fundname=fundname.substring(0,11)+'...';
                        }
                        //累计收益颜色
                        var ma_font1 = 'fonthong';
                        if(parseFloat(n.floatprofit) < 0){
                            ma_font1 = 'fontlv';
                        }
                        //累计收益率处理
                        var addincomerate= n.addincomerate;
                        var oneI = addincomerate.indexOf("-");
                        var oneII = addincomerate.indexOf(".");
                        if (oneI == 0 && oneII == 1) {
                            addincomerate = "-0." + addincomerate.substring(2);
                            addincomerate = Number(addincomerate);
                            addincomerate = addincomerate * 100;
                        }
                        //收益为.09情况；
                        if (oneII == 0) {
                            addincomerate = "0" + addincomerate;
                            addincomerate = Number(addincomerate);
                            addincomerate = addincomerate * 100;
                        }
                        addincomerate = addincomerate.toString();
                        //累计收益率处理颜色
                        var zr_font = "fonthong";
                        if(parseFloat(addincomerate) < 0){
                            zr_font = 'fontlv';
                        }

                        //基金占比

                        var pie_right='<tr><td>'+fundname+'<span class="font12hui9">'+n.fundcode.substring(0,6)+'</span></td><td>'+formatCurrency(n.costmoney)+'元</td><td>'+formatCurrency(n.fundmarketvalue)+'元</td><td class="'+ma_font1+'">'+formatCurrency(n.floatprofit)+'元</td><td class="'+zr_font+'">'+parseFloat(addincomerate).toFixed(2)+'%</td></tr>';
                        //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                        $("#investment1 table tbody").append(pie_right);


                        $(".adeyester i").html("");
                        $(".adeyester i").append(n.navdate.substring(n.navdate.length-4, n.navdate.length));


                    });
                    $(".adeyester span").html("");
                    $(".adeyester span").append(formatCurrency(fundmarketvalue_ud_total));
                    //$(".adeyester i").append(n.navdate.substring(n.navdate.length-5, n.navdate.length));

                    $(".adecurr a").html("");//组合市值
                    $(".adecurr a").append(formatCurrency(fundmarketvalue_total));//组合市值

                    //买入金额
                    $(".createTime").html("");
                    $(".createTime").html("买入时间："+createTime.substring(0,10));

                    //创建时间
                    $(".costmoney_total").html("");
                    $(".costmoney_total").html("买入金额："+formatCurrency(costmoney_total)+"元");

                    //累计收益率
                    var incometotal=floatprofit_total/fundmarketvalue_total;
                    var incometotal1=incometotal*100;
                    $(".incometotal").html("");
                    $(".incometotal").html("累计收益率："+incometotal1.toFixed(2)+"%");


                    $(".adetotal a").html("");  //组合累计收益
                    $(".adetotal a").append(formatCurrency(floatprofit_total));//组合累计收益
                    //累计收益颜色
                    if(parseFloat(floatprofit_total)>0){
                        $(".adetotal a").addClass("fonthong")
                    }else{
                        $(".adetotal a").addClass("fontlv")
                    }
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
            //hideloading();
            showAlert("服务器错误！");
        }
    })



}

//组合环形图
function webGroupQuery(fdGroupCode){

    $.ajax({
        type: "post",
        url: mainUrl + "WebProportionalQueryAction",
        data: {
            groupId: fdGroupCode
        },
        dataType: "json",
        success: function (data) {
            //hideloading();

            //console.log(data);
            var tbdata  =[];
            var wzdata1 =[];
            if (data.retcode == 0000) {

                //console.log(data);
                $(data.data).each(function(i,n){
                    tbdata.push([n.fundName,Number(n.fdProportional)]);
                    wzdata1[i]= n.fundName;
                    //console.log(i);
                });
                //console.log(wzdata1);
                //console.log(tbdata);
                groupfundpie(tbdata);//pie型图
                /*myChart.setOption({
                    legend: {data: wzdata1},
                    series: [{data: tbdata}]//根据名字对应到相应的系列
                });*/

            } else {
                //setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            //hideloading();
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
/*function backGroupStep1(fundgroupname, fundgroupcode,groupFundBuyId){
    window.location.href = "../take_back/back_group.html?fundgroupname=" + fundgroupname + "&fundgroupcode="+fundgroupcode+"&groupFundBuyId=" + groupFundBuyId;
}*/

function goNewAsset() {
    window.location.href = mainUrl+"mp/my-assets/new_assets.html";
}


//基金公告方法
function group_gg(groupId){
    //showLoading();
    //组合基金历史净值
    $.ajax({
        type: "post",
        url: mainUrl + "WebAnnouncementQueryAction",
        data: {
            groupId: groupId
        },
        dataType: "json",
        success: function (data) {
            //hideloading();
            $("#position").html("");
            //console.log(data);
            if (data.retcode == 0000) {
                if(!data.data){
                    var history_data55 = '<p style="line-height: 30px;">暂无调仓记录！</p>';
                    $("#position").append(history_data55);
                }else{
                $(data.data).each(function(i,n){
                    var history_data55 = '<a style="display: block;line-height: 2.8em;border-bottom: 1px solid #dddddd;overflow: hidden;"><span style="float: left;">'+ n.fdGroupAction +'</span><b style="float: right;">'+ n.annDate +'</b></a><p style="padding: 1em;line-height: 1.5;">'+n.actionText+'</p>';
                    $("#position").append(history_data55);
                });
                }
            } else {
                //setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            //hideloading();
            showAlert("服务器错误！");
        }
    })
}


//组合每日收益
function groupdayincome(fundgroupcode,groupFundBuyId,pageNum,pageSize){
    $.ajax({
        url:mainUrl+"queryGroupFundDayProfit",
        data:{
            'groupBean.fdGroupCode':fundgroupcode,   //带OF
            'groupFund_id':groupFundBuyId,
            'pageNum':pageNum,
            'pageSize':pageSize
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            $("#dayincome table tbody").html("");
            if(data.retcode=="0000"){
                $(data.data).each(function(index,item){

                    //插入最新净值
                    var fd_group_unit_value=item.fd_group_unit_value;
                    $(".fd_group_unit_value a").html("");
                    $(".fd_group_unit_value a").append(fd_group_unit_value);


                    var every=parseFloat(item.fundmarketvalue_ud);//昨日收益
                    if(every<0){
                        var classname="fontlv";
                    }else{
                        classname="fonthong";
                        every="+"+formatCurrency(every);
                    }
                    //计算日收益率
                    var dayincomelv=every/(parseFloat(item.fundmarketvalue)-every);
                    var dayincomelv1=dayincomelv*100;
                    //console.log(dayincomelv1);
                    var dayincomelv2=dayincomelv1.toFixed(2);
                    if(dayincomelv2<0){
                        var classname1="fontlv";
                    }else{
                        classname1="fonthong";
                    }
                    var libox='<tr><td>'+item.navdate+'</td><td>'+item.fd_group_unit_value+'</td><td>'+formatCurrency(item.fundmarketvalue)+'</td><td class="'+classname+'">'+every+'</td><td class="'+classname1+'">'+dayincomelv2+'%</td></tr>';
                    $("#dayincome table tbody").append(libox);
                });
                //总条数
                var totalRecord=parseFloat(data.totalAccount);
                //计算分页总页数算法
                var totalPages1=totalRecord % pageSize == 0 ? totalRecord / pageSize : totalRecord / pageSize + 1 ;
                //console.log(totalPages1);
                var pageNum1=pageNum+1;

                //paginator分页插件写法
                var options = {
                    currentPage: pageNum1,//当前页
                    totalPages: totalPages1,//总页数
                    numberofPages: 5,//显示的页数

                    itemTexts: function(type, page, current) { //修改显示文字
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上页";
                            case "next":
                                return "下页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }
                    }, onPageClicked: function (event, originalEvent, type, page) { //异步换页
                        groupdayincome(fundgroupcode,groupFundBuyId,pageNum,page-1)
                    },

                };
                //$("#example").bootstrapPaginator(options);
                var element=$("#sample_2_paginate");
                element.bootstrapPaginator(options);
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }

        },
        error:function(){
            showAlert("服务器错误！");
        }
    })

}


function groupfundlist(groupFundBuyId){
    $.ajax({
        url:mainUrl+"queryGroupFundBuyInfo",
        data:{
            //fundCode:nfcode1,   //不带OF
            groupFund_id:groupFundBuyId
        },
        dataType:"JSON",
        success:function(data){
            //console.log(data);
            if(data.retcode=="0000"){
                $("#trade_record table tbody").html("");
                $(data.data).each(function(index,item){
                    //交易日期
                    var date=item.updateTime;
                    var date1=date.substring(0,10);
                    //基金名称
                    //var name1=item.fundname;
                    var name1=item.group_name;
                    if(name1.length>=10) {
                        name1 = name1.substring(0, 10) + "...";
                    }
                    var costmoney=item.costmoney;
                    var sfyx=item.sfyx;
                    var sfyxname;
                    if(sfyx==1){
                        sfyxname="申购";
                    }else if(sfyx==0){
                        sfyxname="在途";
                    }else if(sfyx==2){
                        sfyxname="赎回";
                    }
                    var leiandzhu='<tr><td>'+date1+'</td><td>'+name1+'</td><td>'+formatCurrency(costmoney)+'</td><td>'+sfyxname+'</td><td>已结束</td></tr>';
                    $("#trade_record table tbody").append(leiandzhu);
                });
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error:function(){
            showAlert("服务器错误！");
        }
    })

};