/**
 * Created by d on 2016/6/11.
 */
$(document).ready(function () {
    var args = new getArgs();
    var select_da1 = args.select_da1;
    var select_da2 = args.select_da2;
    var select_da3 = args.select_da3;
    var select_da4 = args.select_da4;
    var select_da5 = args.select_da5;

    var rank = args.rank;
    var asset = args.asset;
    var code = args.code;
    var level = args.level;
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    //console.log(username);

    var sourceId="QQ";//写死的来源
    var date1 = new Date();
    date1.setTime(date1.getTime() + (30 * 60 * 1000));
    if(sourceId!==""){
        $.cookie("sourceId", sourceId, {
            path: '/',
            expires: date1
        });
    }


    if(level=="" || level == null || level == "null" || level == undefined){
        //console.log(select_da1);
        if (select_da1 == undefined || select_da2 == undefined || select_da3 == undefined || select_da4 == undefined || select_da5 == undefined) {
            //showAlert("问卷调查没有完成！",goindex);
            //return;
            if(rank == undefined || asset == undefined || code==undefined){
                showAlert("问卷调查没有完成！");
            }else {
                //$(".djtu").hide();
                posnGroupQuery(rank,asset,code);
            }
        } else {
            var allSelect = select_da1+ select_da2+select_da3+select_da4+select_da5;
            var params1 = {
                "result": allSelect,
            };
            showLoading();
            $.ajax({
                url: mainUrl + "riskRating",
                data: params1,
                dataType: "JSON",
                success: function (response) {
                    hideloading();
                    //console.log(response);
                    if (response) {
                        var level = response.retmsg;
                        //window.location.href="home.html?level="+level+"";
                        console.log(level);
                        var levelzm=level.substring(0,1);
                        var leveldj=level.substring(1);
                        $(".zn_fxdj i").html("");
                        $(".zn_fxdj i").append("风险等级"+leveldj+"级");
                        var leveldj1=leveldj-1;
                        $(".djtu li").siblings().children("div").removeClass("bj0");
                        $(".djtu li").siblings().children("span").removeClass("tjdshow");
                        $(".djtu li:eq("+leveldj1+")").children("span").addClass("tjdhide");
                        $(".djtu li:eq("+leveldj1+")").children("div").addClass("bj0");
                        $(".djtu li:eq("+leveldj1+")").children("span").addClass("tjdshow");
                        webGroupQuery(level);
                        $(".djtu li").each(function (i) {
                            console.log(i);

                            $(this).click(function(){
                                var liid=$(this).attr("data-id");
                                $(this).siblings().children().removeClass("bj0");
                                /*$(this).siblings().children().children("span").removeClass("tjdshow");
                                 $(".djtu li:eq("+liid+")").children().children("span").addClass("tjdhide");*/
                                $(".djtu li:eq("+liid+")").children("div").addClass("bj0");
                                /*$(".djtu li:eq("+liid+")").children().children("span").addClass("tjdshow");*/
                                var liid1=parseInt(liid)+1;
                                var levelid=levelzm+liid1;
                                webGroupQuery(levelid);


                            });





                        });


                        var username = $.cookie("username");
                        if (username == "" || username == null || username == undefined	|| username == "null") {
                        } else {
                            var params2 = {
                                "level": level,
                                "info.age": "",
                                "info.sex": ""
                            };
                            $.ajax({
                                url: mainUrl + "save_updateScore",
                                data: params2,
                                dataType: "JSON",
                                success: function (response) {
                                    console.log(response);
                                    if (response.retcode == "0000") {
                                        console.log(response.retmsg);
                                    }

                                },
                                error: function (response1) {
                                    showAlert("服务器错误！");
                                }
                            });


                        }
                    }
                },
                error: function (response1) {
                    showAlert("服务器错误！");
                }
            });
        }


    }else{
        /*var levelzm=level.substring(0,1);
        var leveldj=level.substring(1);
        $(".zn_fxdj i").html("");
        $(".zn_fxdj i").append("风险等级"+leveldj+"级");
        var leveldj1=leveldj-1;
        $(".djtu li").siblings().children("div").removeClass("bj0");
        $(".djtu li").siblings().children("span").removeClass("tjdshow");
        $(".djtu li:eq("+leveldj1+")").children("span").addClass("tjdhide");
        $(".djtu li:eq("+leveldj1+")").children("div").addClass("bj0");
        $(".djtu li:eq("+leveldj1+")").children("span").addClass("tjdshow");
        webGroupQuery(level);
        $(".djtu li").each(function (i) {
            console.log(i);

            $(this).click(function(){
                var liid=$(this).attr("data-id");
                $(this).siblings().children().removeClass("bj0");
                /!*$(this).siblings().children().children("span").removeClass("tjdshow");
                 $(".djtu li:eq("+liid+")").children().children("span").addClass("tjdhide");*!/
                $(".djtu li:eq("+liid+")").children("div").addClass("bj0");
                /!*$(".djtu li:eq("+liid+")").children().children("span").addClass("tjdshow");*!/
                var liid1=parseInt(liid)+1;
                var levelid=levelzm+liid1;
                webGroupQuery(levelid);


            });
        });*/
        //$(".djtu").hide();
        var levelzm=level.substring(0,1);
        var leveldj=level.substring(1);
        $(".zn_fxdj i").html("");
        $(".zn_fxdj i").append("风险等级"+leveldj+"级");
        var leveldj1=leveldj-1;
        $(".djtu li").siblings().children("div").removeClass("bj0");
        $(".djtu li").siblings().children("span").removeClass("tjdshow");
        $(".djtu li:eq("+leveldj1+")").children("span").addClass("tjdhide");
        $(".djtu li:eq("+leveldj1+")").children("div").addClass("bj0");
        $(".djtu li:eq("+leveldj1+")").children("span").addClass("tjdshow");
        webGroupQuery(level);
        $(".djtu li").each(function (i) {
            //console.log(i);

            $(this).click(function(){
                var liid=$(this).attr("data-id");
                $(this).siblings().children().removeClass("bj0");
                /*$(this).siblings().children().children("span").removeClass("tjdshow");
                 $(".djtu li:eq("+liid+")").children().children("span").addClass("tjdhide");*/
                $(".djtu li:eq("+liid+")").children("div").addClass("bj0");
                /*$(".djtu li:eq("+liid+")").children().children("span").addClass("tjdshow");*/
                var liid1=parseInt(liid)+1;
                var levelid=levelzm+liid1;
                webGroupQuery(levelid);


            });
        });

    }

});


function goindex(){
    window.location.href = mainUrl+"mp/zn/index.html";
}


function webGroupQuery(val){
    var params2 = {
        "groupLevel": val,
    };
    showLoading();
    $.ajax({
        url: mainUrl + "WebLevelQueryAction",
        data: params2,
        dataType: "JSON",
        success: function (response) {
            hideloading();
            //console.log(response);
            if(response.retcode="0000"){
                var leveldj=val.substring(1);
                $(".zn_fxdj i").html("");
                $(".zn_fxdj i").append("风险等级"+leveldj+"级");
                if(response.data){
                var fdGroupCode=response.data.fdGroupCode;
                var fdGroupLevel=response.data.fdGroupLevel;
                var fdGroupName=response.data.fdGroupName;
                $(".csjg h2").html("");
                $(".csjg h2").append(response.data.fdGroupBenchMark);

                    var group_detail = '<span class="group_ID" style="display: none;">'+fundid+'</span>';
                    $(".group_detail").append(group_detail);
                    var fundid = fdGroupCode;


                    buyGroup(fdGroupCode,fdGroupName);

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
                            $(".csdj_ul").html("");
                            //console.log(data);
                            $(data.data).each(function(i,n){
                                var pie_right = '<div class="zngroup_list" data-name="'+n.fundName+'" data-id="'+n.fundId+'"><div class="zngroup_list_left"><i class="zngroup_box bgcolor'+i+'"></i></div><div class="zngroup_list_right"><h2 style="color: #ee524f">'+n.fdProportional+'%</h2><span>组合占比</span></div><div class="zngroup_list_center"><h2 class="fontb'+i+'">'+ n.fundName +'</h2><span>基金代码：'+n.fundId.substring(0,6)+'</span></div>';
                                //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                                $(".csdj_ul").append(pie_right);
                                tbdata.push({"value":Number(n.fdProportional), "name":n.fundName});
                                wzdata1[i]= n.fundName;
                                //console.log(i);



                            });

                            $("#retmsg").html("");
                            var fdinfo1=data.data[0].fdInfo;
                            var fdinfo2=fdinfo1.split("，");
                            $("#retmsg").append(fdinfo2[0].substring(3,fdinfo2[0].length)+"<br>"+fdinfo2[1]+"<br>"+fdinfo2[2]);

                            //console.log(wzdata1);
                            //console.log(tbdata);
                            myChart.setOption({
                                legend: {data: wzdata1},
                                series: [{data: tbdata}]//根据名字对应到相应的系列
                            });


                            /*$('.skillbar').each(function(){
                                $(this).find('.skillbar-bar').animate({
                                    width:$(this).attr('data-percent')
                                },2000);
                            });*/

                            $('.zngroup_list').unbind("click").click(function () {
                                var fundname=$(this).attr("data-name");
                                var fundid=$(this).attr("data-id")
                                window.location.href="../fund/fund_detail.html?fundid="+fundid+"&fundname="+fundname;
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
                /*$("#zn_step1").unbind("click").click(function (e) {
                    e.stopPropagation();
                    console.log("ss");
                    groupBuyStep1(fdGroupCode,fdGroupName);
                });*/
                }else{
                    $(".csdj_ul").html("");
                    var pie_right = '<div class="skillbar clearfix mtopdd" data-percent="0%"><div class="skillbar-title"><span>暂时没有数据！</span></div><div class="skillbar-bar bgcolor0"></div><div class="skill-bar-percent">0%</div></div>';
                    $(".csdj_ul").append(pie_right);
                    showAlert("组合信息获取失败！");
                }

            }else{
                showAlert("没有该组合信息！");
            }
        },
        error: function (response1) {
            showAlert("服务器错误！");
        }
    });

}



function posnGroupQuery(val,asset,code){
    var params2 = {
        "groupLevel": val,
    };
    showLoading();
    $.ajax({
        url: mainUrl + "WebLevelQueryAction",
        data: params2,
        dataType: "JSON",
        success: function (response) {
            hideloading();
            //console.log(response);
            if(response.retcode="0000"){
                $(".djtu").hide();
                $(".footer5").hide();
                var leveldj=val.substring(1);
                $(".zn_fxdj i").html("");
                $(".zn_fxdj i").append("风险等级"+leveldj+"级");
                if(response.data){
                    var fdGroupCode=response.data.fdGroupCode;
                    var fdGroupLevel=response.data.fdGroupLevel;
                    var fdGroupName=response.data.fdGroupName;
                    $(".csjg h2").html("");
                    $(".csjg h2").append(response.data.fdGroupBenchMark);

                    var params2 = {
                        "code": code,
                        "asset": asset,
                        "rank": val
                    };
                    $.ajax({
                        type: "get",
                        url: "http://diag.5irich.com/accounttest",
                        data: params2,
                        dataType: "json",
                        success: function (data) {
                            hideloading();
                            //console.log(data);
                            var tbdata  =[];
                            var wzdata1 =[];
                            if (data.retcode == 0000) {
                                $(".csdj_ul").html("");
                                //console.log(data);
                                var retmsg=data.retmsg;
                                $("#retmsg").html("");
                                $("#retmsg").append(retmsg);
                                $(data.data).each(function(i,n){
                                    var zhanbi=n.fdProportional*100;
                                    var zhanbi1=zhanbi.toFixed(2);
                                    var fund_recent_year_ret= n.fund_recent_year_ret;
                                    var pie_right = '<div class="zngroup_list"><div class="zngroup_list_left"><i class="zngroup_box bgcolor'+i+'"></i></div><div class="zngroup_list_right"><h2 style="color: #ee524f">'+zhanbi1+'%</h2><span>组合占比</span></div><div class="zngroup_list_center"><h2 class="fontb'+i+'">'+ n.fundName +'</h2><span>基金代码： '+n.fundId.substring(0,6)+'</span></div>';
                                    //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                                    $(".csdj_ul").append(pie_right);
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
                                showAlert("服务器错误！");
                            }
                        },
                        error: function (data) {
                            hideloading();
                            showAlert("服务器错误！");
                        }
                    })
                    /*$("#zn_step1").unbind("click").click(function (e) {
                        e.stopPropagation();
                        console.log("ss");
                        groupBuyStep1(fdGroupCode,fdGroupName);
                    });*/
                }else{
                    $(".csdj_ul").html("");
                    var pie_right = '<div class="skillbar clearfix mtopdd" data-percent="0%"><div class="skillbar-title"><span>暂时没有数据！</span></div><div class="skillbar-bar bgcolor0"></div><div class="skill-bar-percent">0%</div></div>';
                    $(".csdj_ul").append(pie_right);
                    showAlert("组合信息获取失败！");
                }

            }else{
                showAlert("没有该组合信息！");
            }
        },
        error: function (response1) {
            showAlert("服务器错误！");
        }
    });

}


function buyGroup(fundid,fundname) {
    //点击购买
    $("#zn_step1").unbind("click").click(function (e) {
        e.stopPropagation();
        console.log("ss");
        //showAlert("暂不支持购买，敬请期待");
        //groupBuyStep1(fundid, fundname);
        //原来的组合购买
        buyGroupStep1(fundid, fundname);
    });
}