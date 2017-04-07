/**
 * Created by d on 2016/6/11.
 */
var startX = 0, startY = 0,movex= 0,movey=0;var levelzm="";
var diyigci=true;
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
            var allSelect = select_da1.toUpperCase()+ select_da2.toUpperCase()+select_da3.toUpperCase()+select_da4.toUpperCase()+select_da5.toUpperCase();
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
                    if (response) {
                        var level = response.retmsg;
                        //window.location.href="home.html?level="+level+"";
                        console.log(level);
                        levelzm=level.substring(0,1);
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


                        /*touch.on('.djtu li', 'swipeleft swiperight', function(ev){
                            console.log("you have done", ev.type);

                        });*/
                        isTouchDevice();
                        /*$('.djtu li').on('touchstart', function (e) {
                            console.log(e);
                            console.log(e.originalEvent.changedTouches[0].pageX);
                            console.log(e.originalEvent.changedTouches[0].pageY);

                        });*/

                        /*$('.djtu li').on('touchend', function (e) {
                            console.log(e);
                        });*/


                        /*$(".djtu li").each(function (i) {
                            console.log(i);
                            $(this).click(function(){
                                var liid=$(this).attr("data-id");
                                $(this).siblings().children().removeClass("bj0");
                                /!*$(this).siblings().children().children("span").removeClass("tjdshow");
                                $(".djtu li:eq("+liid+")").children().children("span").addClass("tjdhide");*!/
                                //var lidi2=liid-1;
                                $(".djtu li:eq("+lidi2+")").children("div").addClass("bj0");
                                /!*$(".djtu li:eq("+liid+")").children().children("span").addClass("tjdshow");*!/
                                var liid1=parseInt(liid)+1;
                                var levelid=levelzm+liid1;
                                console.log(levelid);
                                webGroupQuery(levelid);
                            });
                        });
*/

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
        levelzm=level.substring(0,1);
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
        isTouchDevice();
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


                    buyGroup(fdGroupCode,fdGroupName);
                    moniBuyGroup(fdGroupCode);
                    getGroupIncomeData(fundid, 0);
                    getGroupIncomeData(fundid, 1);
                    getGroupIncomeData(fundid, 2);
                    getGroupIncomeData(fundid, 3);




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
                                var fundname5= n.fundName;
                                if(fundname5.length>15){
                                    fundname5=fundname5.substring(0,15)+'...';
                                }
                                var pie_right = '<div class="zngroup_list" data-name="'+ n.fundName +'" data-id="'+n.fundId+'"><div class="zngroup_list_left"><i class="zngroup_box bgcolor'+i+'"></i></div><div class="zngroup_list_right"><h2 style="color: #ee524f">'+n.fdProportional+'%</h2><span>组合占比</span></div><div class="zngroup_list_center"><h2 class="fontb'+i+'">'+ fundname5 +'</h2><span>基金代码： '+n.fundId.substring(0,6)+'</span></div>';
                                //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                                $(".csdj_ul").append(pie_right);
                                if(i==0){
                                    /*tbdata.push({"value":Number(n.fdProportional), "name":n.fundName,selected:false});*/
                                    tbdata.push({"value":Number(n.fdProportional), "name":n.fundName});
                                }else{
                                    tbdata.push({"value":Number(n.fdProportional), "name":n.fundName});
                                }

                                /*wzdata1.push(n.fundName);*/

                                //wzdata1[i]= n.fundName;
                                //console.log(i);



                            });
                            $("#group_advantage").html("");
                            var fdinfo1=data.data[0].fdInfo;
                            var fdinfo2=fdinfo1.split("，");
                            $("#group_advantage").append(fdinfo2[0].substring(3,fdinfo2[0].length)+"<br>"+fdinfo2[1]+"<br>"+fdinfo2[2]);

                            console.log(wzdata1);
                            console.log(tbdata);
                            myChart.setOption({
                                legend: {data: wzdata1},
                                series: [{data: tbdata}]//根据名字对应到相应的系列
                            });
                            /*var tooltip = myChart.component.tooltip;*/
                            console.log(myChart.dispatchAction);
                            /*myChart.dispatchAction({type: 'legendSelect', name: '广发稳健增长'});*/
                            myChart.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: 0
                            });

                            myChart.dispatchAction({
                                type: 'showTip',
                                // 屏幕上的 x 坐标
                                //x: 20,
                                // 屏幕上的 y 坐标
                                //y: 50,
                                seriesIndex: 0,
                                dataIndex: 0
                            });
                            /*myChart.dispatchAction({type: 'pieSelect', seriesIndex: 0, dataIndex: 0});*/
                            /*myChart.on('pieselected', function (params) {
                                console.log(params);
                                    /!*type: 'pieselected',
                                        // 系列 ID，可以在 option 中传入
                                        seriesId: 0,
                                    // 数据名称
                                    name: "",
                                        // 所有数据的选中状态表。
                                        selected: {}*!/

                            });*/

                            myChart.on('click', function (param) {
                                if(diyigci){
                                    diyigci=true;
                                    var index = param.dataIndex;
                                    if(index!=0){
                                        console.log(index);
                                        myChart.dispatchAction({
                                            type: 'downplay',
                                            // 可选，系列 index，可以是一个数组指定多个系列
                                            seriesIndex: 0,
                                            // 可选，系列名称，可以是一个数组指定多个系列
                                            //seriesName?: string|Array,
                                            // 可选，数据的 index
                                            dataIndex: 0,
                                            // 可选，数据的 名称
                                            //name?: string
                                        })

                                    }
                                }


                            });


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
                    //groupBuyStep1(fdGroupCode,fdGroupName);
                    //原来的组合购买
                    buyGroupStep1(fdGroupCode,fdGroupName);
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


function moniBuyGroup(fundid){
    //点击购买
    $("#zn_step2").unbind("click").click(function (e) {
        e.stopPropagation();
        console.log("ss");
        //showAlert("暂不支持购买，敬请期待");
        window.location.href="../moni/moni_group.html?fundid="+fundid;
    });
}


///左右滑动事件

//touchstart事件
function touchSatrtFunc(evt) {
    try{
        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

        var touch = evt.originalEvent.touches[0]; //获取第一个触点
        //console.log(touch.pageX);
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        //记录触点初始位置
        startX = x;
        startY = y;
        var text = 'TouchStart事件触发：（' + x + ', ' + y + '）';
        //$("#result").append(text);
    }catch (e) {
        console.log('touchSatrtFunc：' + e.message);
    }
}



//touchmove事件，这个事件无法获取坐标
function touchMoveFunc(evt) {
    try
    {   //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        var touch = evt.originalEvent.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        var text = 'TouchMove事件触发：（' + x + ', ' + y + '）';
        //判断滑动方向
        var pwidth=$('.djtu li').parent().width();  //获取ul的宽度 移动端宽度自适应
        //console.log(pwidth);
        var vwidth=pwidth/10;   //获取li的宽度 移动端宽度自适应
        //console.log(vwidth);
        var touchid=Math.round(x/vwidth); //取整四舍五入
        //溢出屏幕处理
        if(touchid>9){
            touchid=9;
        }
        if(touchid<0){
            touchid=0;
        }
        //var touchid=touchid-1;
        /*text += '<br/>左右滑动';*/
            //var liid=$(this).attr("data-id");
        $('.djtu li').siblings().children().removeClass("bj0");
        $(".djtu li:eq("+touchid+")").children("div").addClass("bj0");//改变css样式
        /*$(".djtu li:eq("+liid+")").children().children("span").addClass("tjdshow");*/
       /* var liid1=parseInt(touchid)+1;
        var levelid=levelzm+liid1;
        console.log(levelzm);
        console.log(levelid);
        webGroupQuery(levelid);*/



        if (y - startY != 0) {
            text += '<br/>上下滑动';
        }
        //$("#result").append(text);
    }
catch (e) {
    console.log('touchMoveFunc：' + e.message);
    }

}

//touchend事件
function touchEndFunc(evt) {
    try {
        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        var touch = evt.originalEvent.changedTouches[0]; //获取第一个触点
        //console.log(evt);
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        var text = 'TouchMove事件触发：（' + x + ', ' + y + '）';
        //判断滑动方向
        var pwidth=$('.djtu li').parent().width();//获取ul的宽度 移动端宽度自适应

        //console.log(pwidth);
        var vwidth=pwidth/10;//获取li的宽度 移动端宽度自适应
        //console.log(vwidth);
        var touchid=Math.floor(x/vwidth);
        //溢出屏幕处理
        if(touchid>=9){
            touchid=9;
        }
        if(touchid<=0){
            touchid=0;
        }
        /*text += '<br/>左右滑动';*/
        //var liid=$(this).attr("data-id");
        $('.djtu li').siblings().children().removeClass("bj0");
        $(".djtu li:eq("+touchid+")").children("div").addClass("bj0");
        /*$(".djtu li:eq("+liid+")").children().children("span").addClass("tjdshow");*/
        var liid1=parseInt(touchid)+1;
        var levelid=levelzm+liid1;
        //console.log(levelzm);

        //执行获取用户等级对应的组合
        webGroupQuery(levelid);

    }catch (e) {
        console.log('touchEndFunc：' + e.message);
    }

}

//绑定事件
function bindEvent() {
    //console.log("1");
    $('.djtu li').on('touchstart', touchSatrtFunc);
    $('.djtu li').on('touchmove', touchMoveFunc);
    $('.djtu li').on('touchend', touchEndFunc);
    //console.log("2");
}
//判断是否支持触摸事件
function isTouchDevice() {
    $("#version").innerHTML = navigator.appVersion;
    try {
        document.createEvent("TouchEvent");
        console.log("支持TouchEvent事件！");
        bindEvent(); //绑定事件
    }catch (e){
        console.log("不支持TouchEvent事件！" + e.message);
    }
}
