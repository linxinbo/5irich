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
    var level = args.level;
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    console.log(username);


    if(level=="" || level == null || level == "null" || level == undefined){
        console.log(select_da1);
        if (select_da1 == undefined || select_da2 == undefined || select_da3 == undefined || select_da4 == undefined || select_da5 == undefined) {
            showAlert("问卷调查没有完成！",goindex);
            //return;
        } else {
            var allSelect = select_da1.toUpperCase() + select_da2.toUpperCase() + select_da3.toUpperCase() + select_da4.toUpperCase() + select_da5.toUpperCase();
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
                    console.log(response);
                    if (response.retcode == "0000") {
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
            console.log(response);
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

                $.ajax({
                    type: "post",
                    url: mainUrl + "WebProportionalQueryAction",
                    data: {
                        groupId: fdGroupCode
                    },
                    dataType: "json",
                    success: function (data) {
                        hideloading();

                        console.log(data);
                        var tbdata  =[];
                        var wzdata1 =[];
                        if (data.retcode == 0000) {
                            $(".csdj_ul").html("");
                            console.log(data);
                            $(data.data).each(function(i,n){
                                var pie_right = '<div class="zngroup_list"><div class="zngroup_list_left"><i class="zngroup_box bgcolor'+i+'"></i></div><div class="zngroup_list_right"><h2 style="color: #ee524f">'+n.fdProportional+'%</h2><span>近一年的收益</span></div><div class="zngroup_list_center"><h2 class="fontb'+i+'">'+ n.fundName +'('+n.fundId.substring(0,6)+')</h2><span>组合占比 '+n.fdProportional+'%</span></div>';
                                //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                                $(".csdj_ul").append(pie_right);
                                tbdata.push({"value":Number(n.fdProportional), "name":n.fundName});
                                wzdata1[i]= n.fundName;
                                //console.log(i);



                            });
                            //sconsole.log(tbdata);
                            //console.log(wzdata1);
                            /*myChart.setOption({
                                legend: {data: wzdata1},
                                series: [{data: tbdata}]//根据名字对应到相应的系列
                            });
*/
                            $('.skillbar').each(function(){
                                $(this).find('.skillbar-bar').animate({
                                    width:$(this).attr('data-percent')
                                },2000);
                            });

                            $('.skillbar').unbind("click").click(function () {
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
                $("#zn_step1").unbind("click").click(function (e) {
                    e.stopPropagation();
                    console.log("ss");
                    groupBuyStep1(fdGroupCode,fdGroupName);
                });
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