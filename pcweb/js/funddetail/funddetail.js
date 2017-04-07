/**
 * Created by dell on 2016/11/29.
 */
var fund_type;
var threemonth;
var fl;
var managers=[];
var classname1;
var fundid;
var fundid_short;
$(document).ready(function(){
    var three;
    var args = new getArgs();
    fundid =args.fundid;
    var fundname=args.fundname;
    fundid_short=fundid.substring(0,6);
    //ziliao(fundid);
    yejipaiming(fundid);
    //console.log(threemonth);
    //console.log(fund_type);
    $(".debtn ul li").click(function(){
        $(this).addClass("select").siblings().removeClass("select");
    });

    $(".yeji").click(function(){
        $(".one").css({display:"block"});
        $(".two").css({display:"none"});
        $(".three").css({display:"none"});
        $(".four").css({display:"none"});
        if($(".one").html()==""){
            yejipaiming(fundid);
            historyjz(fundid);
        }
    });
    $(".zuhe").click(function(){
        $(".two").css({display:"block"});
        $(".one").css({display:"none"});
        $(".three").css({display:"none"});
        $(".four").css({display:"none"});
        if($(".two").html()==""){
            zichanpie(fundid);
            hangyepie(fundid);
            zhongcanggu(fundid);
        }
    });
    $(".dangan").click(function(){
        $(".three").css({display:"block"});
        $(".one").css({display:"none"});
        $(".two").css({display:"none"});
        $(".four").css({display:"none"});
        if($(".three").html()==""){
            jijingaikuang(fundid)
        }
    });
    jiaoyifeilv(fundid);
    $(".feilvbtn").click(function(){
        $(".four").css({display:"block"});
        $(".one").css({display:"none"});
        $(".two").css({display:"none"});
        $(".three").css({display:"none"});
        $(".feilv").show();

    });
    /*function type(fundid){
        $.ajax({
            type:"get",
            url:mainUrl+"fundRead",
            data:{
                Windcode: fundid
            },
            async:false,
            dataType:"JSON",
            success:function(data){
                type= data.data.fundType;
            }
        });
        return type;
    }*/
       //获取行业名称

   $(".fdgoumai").click(function(){
       var reg = new RegExp("^[0-9]*$");
       var money=$(".money").val();
       if(!reg.test(money)){
           showAlert("您输入的金额不合法");
           return;
       }else{
           buyNewStep1(fundid_short,fundname,money);
       }

   });
  $(".dingtou").click(function(){
      timeinvestStep1(fundid);
  });
})

function ziliao(fundid){
    $.ajax({
        url: mainUrl + "fundRead",
        data:{
            "Windcode":fundid
        },
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            var risk;
            var level = data.data.riskLevel;  //风险等级
            var fundType = data.data.fundType;
            //基金类型；
            // var classname1;
            var classname2;
            fund_type= data.data.fundType;
            //console.log(fund_type);
            drawLine(fundid, fundType);
            var fundname=data.data.fInfoShortname;
            $(".fdetail li:eq(0)").html(fundname+"&nbsp;<span>"+fundid_short+"</span>");

            var min_money=data.data.fPchredmRedmminamt;  //最小申购金额
            if(min_money==undefined){
                $(".deone .money").attr("placeholder","");
            }else{
                $(".deone .money").attr("placeholder",min_money+"元起购");
            }
            //var min_money1=min_money.toFixed(2);
            //console.log(data.data.fPchredmRedmminamt)
            var fIssueTotalunit = data.data.fIssueTotalunit; //基金规模；
            var name = data.data.name; //基金经理；
            var fInfoSetupdate = gettime(data.data.fInfoSetupdate); //成立日期；
            var fInfoFirstinvesttype = data.data.fInfoFirstinvesttype; //投资类型；
            var fInfoCorpFundmanagementcomp = data.data.fInfoCorpFundmanagementcomp; //基金公司；
            var starlevel = data.data.starlevel; //星级；
            /*var thmonth=threemonth(fundid); //近3个月涨幅*/
            var jz=jingzhi(fundid);  //净值

            if(Number(jz.zhangfu)<0){
                jz.zhangfu=jz.zhangfu+"%";
                classname2="fontgreen";
            }else{
                jz.zhangfu="+"+jz.zhangfu+"%";
                classname2="fontred";
            }

            if(fundType==""||fundType== undefined){
                fundType="—";
            }
            if(fInfoCorpFundmanagementcomp==""||fInfoCorpFundmanagementcomp== undefined){
                fInfoCorpFundmanagementcomp="—";
            }
            if(fInfoSetupdate==""||fInfoSetupdate== undefined){
                fInfoSetupdate="—";
            }
            if(name==""||name== undefined){
                name="—";
            }
            if(fIssueTotalunit==""||fIssueTotalunit== undefined){
                fIssueTotalunit="—";
            }else{
                fIssueTotalunit=fIssueTotalunit+"亿元";
            }
            if(starlevel==""||starlevel== undefined ||starlevel== 0){
                starlevel="暂无评级"
            }else{
                starlevel=starlevel+"星级";
            }
            if(level=="01"){
                risk="低风险"
            }else if(level=="02"){
                risk="中低风险"
            }else if(level=="03"){
                risk="中等风险"
            }else if(level=="04"){
                risk="中高风险"
            }else if(level=="05"){
                risk="高风险"
            }
            if(fundType=="货币型"||fundType=="货币市场型"){
                var coins=coinseven(fundid);
                $(".fdetail li:eq(2)").html("<div>7日年化收益 <i>（"+gettime(coins.time)+"）</i></div>");
                $(".fdetail li:eq(3)").html("<div style='color:#fe3309;'>"+zhuanhuan(coins.shouyi)+" </div>");

            }else{
                $(".fdetail li:eq(2)").html("<div>单位净值 <i>（"+jz.datenew+"）</i></div>  <div>近3月涨幅</div>");
                $(".fdetail li:eq(3)").html("<div>"+jz.jingzhinumber+"<span class="+classname2+">"+jz.zhangfu+"</span> </div> <div id='thmonth' class="+classname1+">"+threemonth+"</div>");
            }

            $(".fdetail li:eq(1)").html("<div>"+risk+"</div>");
            $(".fdetail li:eq(4)").html("<div>基金类型：<span class='type'>"+fundType+"</span></div> <div>基金经理：<span>"+name+"</span></div>");
            $(".fdetail li:eq(5)").html("<div>基金规模：<span>"+fIssueTotalunit+"</span></div> <div>基金公司：<span>"+fInfoCorpFundmanagementcomp+"</span> </div>")
            $(".fdetail li:eq(6)").html("<div>成立日期：<span>"+fInfoSetupdate+"</span></div> <div>银河评级：<span>"+starlevel+"</span></div>")
            manager(fundid);
            historyjz(fundid);
        }
    })

}
function coinseven(fundid){
    var coin={
        shouyi:0,
        time:0
    }
    $.ajax({
        type:"get",
        url:mainUrl+"monetaryFund",
        data:{
            windcode:fundid
        },
        dataType:"JSON",
        async:false,
        success:function(data){
            coin.shouyi=data.data.fInfoYearlyroe;
            coin.time=data.data.fInfoEnddate;
        }
    });
    return coin;

}
/*function threemonth(fundid){
 var threemonth;
 $.ajax({
 type:"get",
 url:mainUrl+"fixedsa",
 data: {
 Windcode: fundid
 },
 dataType: "JSON",
 async:false,
 success:function(data){
 if(data.retcode==0000) {
 var three = Number(data.data.fAvgreturnGuarter);
 three = three.toFixed(2);
 threemonth = three+"%";
 }else{
 setErrorMsg(data.retcode, data.retmsg);
 }
 }
 });
 return threemonth;

 }*/   //近3个月涨跌幅
function jingzhi(fundid){
    var jingzhi={
        datenew: 0,
        jingzhinumber:0,
        zhangfu:0
    };
    $.ajax({
        type:"get",
        url:mainUrl+"Funav",
        data: {
            Windcode: fundid
        },
        dataType: "JSON",
        async:false,
        success:function(data){
            if(data.retcode==0000){
                var date=data.data.priceDate.substring(4,8);
                var datearr=[];
                datearr=date.split("");
                datearr.splice(2,0,"-");
                date=datearr.join("");
                jingzhi.datenew=date;
                jingzhi.jingzhinumber=Number(data.data.fNavUnit).toFixed(4);
                jingzhi.zhangfu=Number(data.data.gains).toFixed(2);
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }

        }
    })
    return jingzhi;
}        //净值

function gettime(time){

    if(time==null||time.length!==8){
        return "";
    }else{
        var yyyy = time.substring(0,4);
        var mm = time.substring(4,6);
        var dd = time.substring(6,8);
        if(mm.substring(0,1) == 0){
            mm = mm.substring(1,2);
        }
        if(dd.substring(0,1) == 0){
            dd = dd.substring(1,2);
        }
        return yyyy + "-" + mm + "-" + dd ;
    }
}   //日期截取
function gettime1(time){
    var yyyy = time.substring(0,4);
    var mm = time.substring(5,7);
    var dd = time.substring(8,10);
    return yyyy + "" + mm + "" + dd ;
}   //选择日期转换
function yejipaiming(fundid){
    $.ajax({
        type: "get",
        url:  mainUrl+"fixedsa",
        data: {
            Windcode: fundid
        },
        //async:false,
        dataType: "JSON",
        success:function(data){
            if(data.retcode=="0000"){
                var three = Number(data.data.fAvgreturnGuarter);
                if(three==""||three==undefined){
                    threemonth="--";
                }else{
                    //three = three.toFixed(2);
                    threemonth = three.toFixed(2)+"%";
                }

                if(three<0){
                    classname1="fontgreen"
                }else{
                    classname1="fontred"
                }
                //$("#thmonth").html(threemonth);
                //$("#thmonth").addClass(classname1);
                var paiming=$("<div class='paiming'></div>");
                var p=$("<h3>业绩排名</h3>")
                var table=$("<table style='margin:0 auto;'></table>");
                var tr1=$("<tr style='border:none;background:#EBEDF3; '><td>产品</td><td>今年以来</td><td>近1月</td><td>近3月</td><td>近6月</td><td>近1年</td><td>近3年</td><td>成立以来</td></tr>");
                var tr2=$("<tr><td>本产品</td><td class="+panduan(data.data.fAvgreturnThisyear)+">"+zhuanhuan(data.data.fAvgreturnThisyear)+"</td><td class="+panduan(data.data.fAvgreturnMonth)+">"+zhuanhuan(data.data.fAvgreturnMonth)+"</td><td class="+panduan(data.data.fAvgreturnGuarter)+">"+zhuanhuan(data.data.fAvgreturnGuarter)+"</td><td class="+panduan(data.data.fAvgreturnHalfyear)+">"+zhuanhuan(data.data.fAvgreturnHalfyear)+"</td><td class="+panduan(data.data.fAvgreturnYear)+">"+zhuanhuan(data.data.fAvgreturnYear)+"</td><td class="+panduan(data.data.fAvgreturnThreeyear)+">"+zhuanhuan(data.data.fAvgreturnThreeyear)+"</td><td class="+panduan(data.data.fAvgreturnSincefound)+">"+zhuanhuan(data.data.fAvgreturnSincefound)+"</td></tr>");
                var hushen=HS();
                var tr3=$("<tr><td>沪深300</td><td class="+panduan(hushen.thisyear)+">"+zhuanhuan(hushen.thisyear)+"</td><td class="+panduan(hushen.onemonth)+">"+zhuanhuan(hushen.onemonth)+"</td><td class="+panduan(hushen.threemonth)+">"+zhuanhuan(hushen.threemonth)+"</td><td class="+panduan(hushen.halfyear)+">"+zhuanhuan(hushen.halfyear)+"</td><td class="+panduan(hushen.oneyear)+">"+zhuanhuan(hushen.oneyear)+"</td><td class="+panduan(hushen.threeyear)+">"+zhuanhuan(hushen.threeyear)+"</td><td class="+panduan(hushen.chenglihou)+">"+zhuanhuan(hushen.chenglihou)+"</td></tr>");
                var tr4=$("<tr><td>同类平均</td><td class="+panduan(data.data.fSfreturnThisyear)+">"+zhuanhuan(data.data.fSfreturnThisyear)+"</td><td class="+panduan(data.data.fSfreturnRecentmonth)+">"+zhuanhuan(data.data.fSfreturnRecentmonth)+"</td><td class="+panduan(data.data.fSfreturnRecentquarter)+">"+zhuanhuan(data.data.fSfreturnRecentquarter)+"</td><td class="+panduan(data.data.fSfreturnRecenthalfyear)+">"+zhuanhuan(data.data.fSfreturnRecenthalfyear)+"</td><td class="+panduan(data.data.fSfreturnRecentyear)+">"+zhuanhuan(data.data.fSfreturnRecentyear)+"</td><td class="+panduan(data.data.fSfreturnRecentthreeyear)+">"+zhuanhuan(data.data.fSfreturnRecentthreeyear)+"</td><td class="+panduan(data.data.FsfreturnRincefound)+">"+zhuanhuan(data.data.FsfreturnRincefound)+"</td></tr>");
                var tr5=$("<tr><td>同类排名</td><td>"+data.data.fSfrankThisyeart+"</td><td>"+data.data.fSfrankRecentmontht+"</td><td>"+data.data.fSfrankRecentquartert+"</td><td>"+data.data.fSfrankRecenthalfyeart+"</td><td>"+data.data.fSfrankRecentyeart+"</td><td>"+data.data.fSfrankRecentthreeyeart+"</td><td>"+data.data.fSfrankSincefoundt+"</td></tr>");
                var tr6=$("<tr class='tr6'><td>四分位排名</td></tr>");
                var tr61=$("<td tp="+fourfrank(data.data.fSfrankThisyeartp).number+"><span></span><span></span><span></span><span></span><i>"+fourfrank(data.data.fSfrankThisyeartp).word+"</i></td>")
                var tr62=$("<td tp="+fourfrank(data.data.fSfrankRecentmonthtp).number+"><span></span><span></span><span></span><span></span><i>"+fourfrank(data.data.fSfrankRecentmonthtp).word+"</i></td>")
                var tr63=$("<td tp="+fourfrank(data.data.fSfrankRecentquartertp).number+"><span></span><span></span><span></span><span></span><i>"+fourfrank(data.data.fSfrankRecentquartertp).word+"</i></td>")
                var tr64=$("<td tp="+fourfrank(data.data.fSfrankRecenthalfyeartp).number+"><span></span><span></span><span></span><span></span><i>"+fourfrank(data.data.fSfrankRecenthalfyeartp).word+"</i></td>")
                var tr65=$("<td tp="+fourfrank(data.data.fSfrankRecentyeartp).number+"><span></span><span></span><span></span><span></span><i>"+fourfrank(data.data.fSfrankRecentyeartp).word+"</i></td>")
                var tr66=$("<td tp="+fourfrank(data.data.fSfrankRecentthreeyeartp).number+"><span></span><span></span><span></span><span></span><i>"+fourfrank(data.data.fSfrankRecentthreeyeartp).word+"</i></td>")
                var tr67=$("<td tp="+fourfrank(data.data.fSfrankSincefoundtp).number+"><span></span><span></span><span></span><span></span><i>"+fourfrank(data.data.fSfrankSincefoundtp).word+"</i></td>")
                tr6.append(tr61,tr62,tr63,tr64,tr65,tr66,tr67);
                table.append(tr1,tr2,tr3,tr4,tr5,tr6);
                paiming.append(p,table);
                $(".detwocon .one").append(paiming);
                ziliao(fundid);

            }
            var length=$(".tr6 td").length;
            for(var i=0;i<length;i++){
                var num= $(".tr6 td:eq("+(i+1)+")").attr("tp");
                $(".tr6 td:eq("+(i+1)+")").children("span:eq("+(num-1)+")").css({background:"#7cb5ea"})
            }
        }
    });

}  //业绩排名tab1
function historyjz(fundid){
    //var ftype=type(fundid);
    //console.log(fund_type);
    if(fund_type=="货币型"||fund_type=="货币市场型"){
        var jz=$("<div class='jz'></div>");
        var p1=$("<h3 >历史净值</h3>");
        $(".detwocon .one").append(jz);
        $(".jz").append(p1);
        //var ftype=type(fundid);
        var jztable=$("<table class='jztable' style='margin:0 auto;'><tr><td>收益时间</td><td>每万份收益率</td><td>七日年化收益率</td></tr></table>");
        $(".jz").append(jztable);
        $.ajax({
            type:"get",
            url:mainUrl+"monetaryFundall",
            data:{
                windcode:fundid
            },
            dataType:"JSON",
            //async:false,
            success:function(data){
                if(data.retcode=="0000"){
                    $(data.data).each(function(i,n){
                        var time=gettime(n.fInfoEnddate);
                        var wan= n.fInfoUnityield;
                        var shouyilv= zhuanhuan(n.fInfoYearlyroe);
                        var tr1=$("<tr><td>"+time+"</td><td>"+ wan+"</td><td class='fontred'>"+shouyilv+"</td></tr>");
                        $(".jztable").append(tr1);
                    })
                }
            }
        })

    }else{
        var jz=$("<div class='jz'></div>");
        var datebox=$("<div class='databox' style='float:right;margin-right:40px;'><input id='kaishi' class='start' style='border:solid 1px #d9dce0;' placeholder='开始日期' type='text'><span>&nbsp;--&nbsp;</span><input id='jieshu' class='end' style='border:solid 1px #d9dce0;' placeholder='结束日期' type='text'></div>");
        var p1=$("<h3 >历史净值</h3>");
        $(".detwocon .one").append(jz);
        $(".jz").append(p1,datebox);
        //var ftype=type(fundid);
        var jztable=$("<table class='jztable' style='margin:0 auto;'><tr><td>净值日期</td><td>单位净值</td><td>累计净值</td><td>日涨幅</td></tr></table>");
        $(".jz").append(jztable);
        $.ajax({
            type:"get",
            url:mainUrl+"fundnavall",
            data:{
                windcode:fundid
            },
            dataType:"JSON",
            //async:false,
            success:function(data){
                if(data.retcode=="0000"){
                    $(data.data).each(function(i,n){
                        var navacc=Number(n.fNavAccumulated);
                        var gains=Number(n.gains);
                        if(navacc<0){
                            navacc=navacc.toFixed(2);
                        }else{
                            navacc="+"+navacc.toFixed(2);
                        }
                        if(gains<0){
                            gains=gains.toFixed(2)+"%";
                        }else{
                            gains="+"+gains.toFixed(2)+"%";
                        }
                        var tr1=$("<tr><td>"+gettime(n.priceDate)+"</td><td>"+ Number(n.fNavUnit).toFixed(4)+"</td><td class="+panduan(n.fNavAccumulated)+">"+navacc+"</td><td class="+panduan(n.gains)+">"+gains+"</td></tr>");
                        $(".jztable").append(tr1);
                    })
                    // $(".jz").append(jztable);
                }
            }
        });
        laydate({
            elem: '#kaishi'
        });

        laydate({
            elem: '#jieshu',
            choose:function(){
                var start=gettime1($(".start").val());
                var end=gettime1($(".end").val());
                if($(".start").val()==""&&($(".end").val()=="")){
                    $.ajax({
                        type: "get",
                        url: mainUrl+"fundnavall",
                        dataType: "JSON",
                        data: {
                            windcode: fundid
                        },
                        success: function (data) {
                            if(data.retcode=="0000"){
                                $(".jztable").empty();
                                var tr0 = $("<tr><td>净值日期</td><td>单位净值</td><td>累计净值</td><td>日涨幅</td></tr>");
                                $(".jztable").append(tr0);
                                //console.log(data.data)
                                for(i=0;i<data.data.length;i++){
                                    var navacc = Number(data.data[i].fNavAccumulated);
                                    var gains = Number(data.data[i].gains);
                                    if (navacc < 0) {
                                        navacc =  navacc.toFixed(2);
                                    } else {
                                        navacc = "+" + navacc.toFixed(2);
                                    }
                                    if (gains < 0) {
                                        gains = gains.toFixed(2) + "%";
                                    } else {
                                        gains = "+" + gains.toFixed(2) + "%";
                                    }
                                    var tr1=$("<tr><td>"+gettime(data.data[i].priceDate)+"</td><td>"+ Number(data.data[i].fNavUnit).toFixed(4)+"</td><td class="+panduan(data.data[i].fNavAccumulated)+">"+navacc+"</td><td class="+panduan(data.data[i].gains)+">"+gains+"</td></tr>");
                                    $(".jztable").append(tr1);
                                }
                            }

                        }
                    });
                }else {

                    $.ajax({
                        type: "get",
                        url: mainUrl+"fundnavall",
                        dataType: "JSON",
                        data: {
                            windcode: fundid,
                            startdate: start,
                            enddate: end
                        },
                        success: function (data) {
                            if(data.retcode=="0000"){
                                $(".jztable").empty();
                                var tr0 = $("<tr><td>净值日期</td><td>单位净值</td><td>累计净值</td><td>日涨幅</td></tr>");
                                $(".jztable").append(tr0);
                                for(i=0;i<data.data.length;i++){
                                    var navacc = Number(data.data[i].fNavAccumulated);
                                    var gains = Number(data.data[i].gains);
                                    if (navacc < 0) {
                                        navacc = "-" + navacc.toFixed(2);
                                    } else {
                                        navacc = "+" + navacc.toFixed(2);
                                    }
                                    if (gains < 0) {
                                        gains = "-" + gains.toFixed(2) + "%";
                                    } else {
                                        gains = "+" + gains.toFixed(2) + "%";
                                    }
                                    var tr1=$("<tr><td>"+gettime(data.data[i].priceDate)+"</td><td>"+ Number(data.data[i].fNavUnit).toFixed(4)+"</td><td class="+panduan(data.data[i].fNavAccumulated)+">"+navacc+"</td><td class="+panduan(data.data[i].gains)+">"+gains+"</td></tr>");
                                    $(".jztable").append(tr1);
                                }
                            }

                        }
                    });
                }
            }
        })
    }


}    //历史净值 tab1
function jijingaikuang(fundid){
    $.ajax({
        type:"get",
        url:mainUrl+"fundRead",
        dataType:"JSON",
        data:{
            Windcode: fundid
        },
        success:function(data){
            if(data.retcode=="0000") {
                var gaikuang = $("<div class='gaikuang'></div>");
                var p1 = $("<h3>基金概况</h3>");
                var p2 = $("<h3>投资目标</h3>");
                var p3 = $("<h3>投资范围</h3>");
                var p4 = $("<h3>投资理念</h3>");
                var p5 = $("<h3>基金经理</h3>");
                var box = $("<div class='box'></div>");
                //var mana = manager(fundid);
                var table = $("<table style='margin:0 auto;'></table>");
                var tablemana = $("<table style='margin:0 auto;'></table>");
                var manatr1 = $("<tr><td>历任经理</td><td>任职起始日</td><td>任职终止日</td><td>任职天数</td></tr>");
                tablemana.append(manatr1);
                var fInfoName=data.data.fInfoName;
                var fullName=data.data.fullName;
                var fInfoFirstinveststyle=data.data.fInfoFirstinveststyle;
                var fundType=data.data.fundType;
                var name=data.data.name;
                var fInfoCustodianbank=data.data.fInfoCustodianbank;
                var fInfoCorpFundmanagementcomp=data.data.fInfoCorpFundmanagementcomp;
                var fPchredmRedmminamt=data.data.fPchredmRedmminamt;
                var fInfoManagementfeeratio=data.data.fInfoManagementfeeratio;
                if(fInfoName==""||fInfoName==undefined){
                    fInfoName="--";
                }
                if( fullName==""|| fullName==undefined){
                    fullName="--";
                }
                if( fInfoFirstinveststyle==""|| fInfoFirstinveststyle==undefined){
                    fInfoFirstinveststyle="--";
                }
                if( fundType==""|| fundType==undefined){
                    fundType="--";
                }
                if( name==""|| name==undefined){
                    name="--";
                }
                if( fInfoCustodianbank==""|| fInfoCustodianbank==undefined){
                    fInfoCustodianbank="--";
                }
                if( fInfoCorpFundmanagementcomp==""|| fInfoCorpFundmanagementcomp==undefined){
                    fInfoCorpFundmanagementcomp="--";
                }
                if(fPchredmRedmminamt==""||fPchredmRedmminamt==undefined){
                    fPchredmRedmminamt="--";
                }else{
                    fPchredmRedmminamt=Number(fPchredmRedmminamt).toFixed(2);
                }
                if(fInfoManagementfeeratio==""||fInfoManagementfeeratio==undefined){
                    fInfoManagementfeeratio="--";
                }else{
                    fInfoManagementfeeratio=Number(fInfoManagementfeeratio).toFixed(2)+"%";
                }
                var tr1 = $("<tr><td class='tablename'>基金简称</td><td>" + fInfoName + "</td><td class='tablename'>最新份额</td><td>" + Number(data.data.fPrtNetasset).toFixed(2) + "亿份</td><td class='tablename'>最低申购额度</td><td>" + data.data.fPchredmPchminamt*10000 + "元</td></tr>");
                var tr2 = $("<tr><td class='tablename'>基金代码</td><td>" + fundid_short + "</td><td class='tablename'>最新规模</td><td>" + data.data.fIssueTotalunit + "亿元</td><td class='tablename'>最小赎回份额</td><td>" + fPchredmRedmminamt+ "份</td></tr>");

                var tr3 = $("<tr><td class='tablename'>基金全称</td><td>" + fullName + "</td><td class='tablename'>投资类型</td><td>" + fInfoFirstinveststyle + "</td><td class='tablename'>基金管理费</td><td>" + fInfoManagementfeeratio + "</td></tr>");
                var tr4 = $("<tr><td class='tablename'>基金类型</td><td>" + fundType + "</td><td class='tablename'>基金经理</td><td>" + name + "</td><td class='tablename'>基金托管人</td><td>" +fInfoCustodianbank + "</td></tr>");
                var tr5 = $("<tr><td class='tablename'>成立日期</td><td>" + gettime(data.data.fInfoSetupdate) + "</td><td class='tablename'>基金管理人</td><td>" + fInfoCorpFundmanagementcomp + "</td><td class='tablename'>基金托管费</td><td>" + zhuanhuan(data.data.fInfoCustodianfeeratio) + "</td></tr>");
            }
            for(i=0;i<managers.length;i++){

                var end;
                var diff;

                if(managers[i].end==undefined){
                    end="—";
                    diff="—";
                    var photo=$("<div class='photo'></div>");
                    box.append(photo);
                    var img1 = mainUrl + "images/managers/" + managers[i].id + ".png";
                        $.ajax({
                            type: "get",
                            url: img1,
                            async:false,
                            success: function (data) {
                                var img = $('<img id="fund_head" src="../../images/managers/' + managers[i].id + '.png">');
                                var manades=$("<div class='manades'><div class='maname'>"+managers[i].managername+"&nbsp;&nbsp;<span>"+managers[i].edu+"</span></div><div class='resume'>"+managers[i].resume+"</div></div>")
                                photo.append(img, manades);
                            },
                            error: function (data) {
                                var img = $('<img src="../../images/managers/default.jpg">')
                                var manades=$("<div class='manades'><div class='maname'>"+managers[i].managername+"&nbsp;&nbsp;<span>"+managers[i].edu+"</span></div><div class='resume'>"+managers[i].resume+"</div></div>")
                                photo.append(img, manades);
                            }
                        });
                    //else{
                    //    var img=$("<img id='fund_head' src='../../images/manager/default.jpg'>")
                    //    photo.append(img,manades);
                    //}

                }else{
                    end=gettime(managers[i].end);
                    diff=managers[i].end-managers[i].start+"天";
                }
                var manatr2=$("<tr><td>"+managers[i].managername+"</td><td>"+gettime(managers[i].start)+"</td><td>"+end+"</td><td>"+diff+"</td></tr>");
                tablemana.append(manatr2);

            }
            //if(managers.length>=2){
            //    for(i=0;i<managers.length;i++){
            //        var photo=$("<div class='photo'></div>");
            //        if(managers[i].id.length){
            //            var img=$("<img src='../images/manager/"+managers[i].id+".png'>")
            //        }else{
            //            var img=$("<img src='../images/manager/default.jpg'>")
            //        }
            //        var manades=$("<div class='manades'><div class='maname'>"+managers[i].managername+"&nbsp;&nbsp;<span>"+managers[i].edu+"</span></div><div class='resume'>"+managers[i].resume+"</div></div>")
            //        photo.append(img,manades);
            //        box.append(photo);
            //        var end;
            //        var diff;
            //        if(managers[i].end==undefined){
            //            end="—";
            //            diff="—";
            //        }else{
            //            end=gettime(managers[i].end);
            //            diff=managers[i].end-managers[i].start+"天";
            //        }
            //        var manatr2=$("<tr><td>"+managers[i].managername+"</td><td>"+gettime(managers[i].start)+"</td><td>"+end+"</td><td>"+diff+"</td></tr>");
            //        tablemana.append(manatr2);
            //    }
            //}else{
            //
            //    for(i=0;i<1;i++){
            //        var photo=$("<div class='photo'></div>");
            //        if(managers[i].id.length>0){
            //            var img=$("<img src='../images/manager/"+managers[i].id+".png'>")
            //        }else{
            //            var img=$("<img src='../images/manager/default.jpg'>")
            //        }
            //        var manades=$("<div class='manades'><div class='maname'>"+managers[i].managername+"&nbsp;&nbsp;<span>"+managers[i].edu+"</span></div><div class='resume'>"+managers[i].resume+"</div></div>")
            //        photo.append(img,manades);
            //        box.append(photo);
            //        var end;
            //        var diff;
            //        if(managers[i].end==undefined){
            //            end="—";
            //            diff="—";
            //        }else{
            //            end=gettime(managers[i].end);
            //            diff=managers[i].end-managers[i].start+"天";
            //        }
            //        var manatr2=$("<tr><td>"+managers[i].managername+"</td><td>"+gettime(managers[i].start)+"</td><td>"+end+"</td><td>"+diff+"</td></tr>");
            //        tablemana.append(manatr2);
            //    }
            //}

            table.append(tr1,tr2,tr3,tr4,tr5);
            var fInfoInvestobject=data.data.fInfoInvestobject;
            var fInfoInvestscope=data.data.fInfoInvestscope;
            var fInfoInvestconception=data.data.fInfoInvestconception;
            if(fInfoInvestobject==""||fInfoInvestobject==undefined){
                fInfoInvestobject="--";
            }
            if(fInfoInvestscope==""||fInfoInvestscope==undefined){
                fInfoInvestscope="--";
            }
            if(fInfoInvestconception==""||fInfoInvestconception==undefined){
                fInfoInvestconception="--";
            }
            var tar=$("<span>&nbsp;&nbsp;&nbsp;&nbsp;"+fInfoInvestobject+"</span>");
            var fanwei=$("<span>&nbsp;&nbsp;&nbsp;&nbsp;"+fInfoInvestscope+"</span>");
            var linian=$("<span>&nbsp;&nbsp;&nbsp;&nbsp;"+fInfoInvestconception+"</span>");
            gaikuang.append(p1,table,p2,tar,p3,fanwei,p4,linian,p5,box,tablemana);
            $(".detwocon .three").append(gaikuang);

        }
    })

}  //基金概况tab3
//function feilvone(fundid){
//    var fl;
//    $.ajax({
//        type:"get",
//        url:mainUrl+"mutualfee",
//        data:{
//            windcode:fundid
//        },
//        dataType:"JSON",
//        async:false,
//        success:function(data){
//            if(data.data==""){
//                fl="";
//            }else{
//                for(i=0;i<data.data.length;i++) {
//                    if (data.data[i].feeType == "申购费") {
//                        fl = data.data[i].fundDiscountFee;
//                        break;
//                    }
//                }
//            }
//
//        }
//    });
//    return fl;
//}  //获取费率

function jiaoyifeilv(fundid){
    $.ajax({
        type:"get",
        url:mainUrl+"mutualfee",
        data:{
            windcode:fundid
        },
        dataType:"JSON",
        success:function(data){

            if(data.retcode=="0000"){

                /*$(".buybox p").html(fl_one);*/
                var feilv=$("<div class='feilv' style='display: none;'></div>");
                var pfree1=$("<p>前端认购费率</p>");
                var pfree2=$("<p>前端申购费率</p>");
                var pfree3=$("<p>后端申购费率</p>");
                var pfree4=$("<p>赎回费率</p>");
                var pfree5=$("<p style='float:left;width:50%;'>申购限制</p>");
                var pfree6=$("<p style='float:left;width:50%;margin-left:0;'>赎回限制</p>")
                var tablefei1=$("<table><tr><td>认购金额（元）</td> <td>原认购费率（%）</td><td>理财易站折扣费率（%）</td></tr></table>");
                var tablefei2=$("<table><tr><td>申购金额（元）</td> <td>原申购费率（%）</td><td>理财易站折扣费率（%）</td></tr></table>");
                var tablefei3=$("<table><tr><td>赎回金额（元）</td> <td>原赎回费率（%）</td><td>理财易站折扣费率（%）</td></tr></table>");
                var tablehou=$("<table><tr><td>暂无此收费</td></tr></table>");
                var xianzhitable=$("<table><tr><td>单笔申购</td><td>1000元</td><td>单笔赎回</td><td>100份</td></tr><tr><td>追加申购</td><td>1000元</td><td>最低保留</td><td>100份</td></tr></table>");
                $(data.data).each(function(i,n){
                    if(n.feeType=="认购费"){
                        var tablefeitr1=$("<tr><td>"+n.feeInterval+"</td><td>"+ n.fundBasicFee+"</td><td>"+ n.fundDiscountFee+"</td></tr>");
                        tablefei1.append(tablefeitr1);
                    }else if(n.feeType=="申购费"){
                        var tablefeitr2=$("<tr><td>"+n.feeInterval+"</td><td>"+ n.fundBasicFee+"</td><td>"+ n.fundDiscountFee+"</td></tr>");
                        if(fl){
                            return;
                        }else{
                            fl=n.fundDiscountFee;
                        }
                        tablefei2.append(tablefeitr2);
                    }else if(n.feeType=="赎回费"){
                        var tablefeitr3=$("<tr><td>"+n.feeInterval+"</td><td>"+ n.fundBasicFee+"</td><td>"+ n.fundDiscountFee+"</td></tr>");
                        tablefei3.append(tablefeitr3);
                    }
                });
                //交易费率
                if(fl=="免费"){
                    var fl1="无申购费";
                }else if(fl==""||fl==undefined){
                    fl1=="";
                }else{
                    fl1="费率<span style='color:#fe3309;'>"+fl+"</span>,申购成功即扣除"
                }
                //console.log(fl1);
                $(".feil").html(fl1);
                //交易费率
                feilv.append(pfree1,tablefei1,pfree2,tablefei2,pfree3,tablehou,pfree4,tablefei3,pfree5,pfree6,xianzhitable);
                $(".detwocon .four").append(feilv);
            }
        }
    })
}   //交易费率tab4
function manager(fundid){
    //var mangers=[];
    $.ajax({
        type:"get",
        url:mainUrl+"allFundManager",
        dataType:"JSON",
        data:{
            windcode:fundid
        },
        //async:false,
        success:function(data){
            if(data.retcode=="0000"){
                $(data.data).each(function(i,n){
                    var  manager={
                        id:0,
                        managername:0,
                        edu:0,
                        resume:0,
                        start:0,
                        end:0,
                        huibao:0
                    };
                    manager.id= n.fInfoFundmanagerId;
                    manager.managername= n.fInfoFundmanager;
                    manager.edu= n.fInfoManagerEducation;
                    manager.resume= n.fInfoManagerResume;
                    manager.start= n.fInfoMangaerStartdate;
                    manager.end= n.fInfoMangaerLeavedate;
                    managers.push(manager);
                });
            }
        }
    })
    //return mangers;
}
function zhuanhuan(string){
    var string1=Number(string).toFixed(2)+"%";
    return string1;
}  //数值保留两位小数并加%
function panduan(string){
    if(Number(string)<0){
        classname="fontgreen";
    }else{
        classname="fontred";
    }
    return classname;
}
function HS(){              //获取沪深300
    var result={
        onemonth:0,
        threemonth:0,
        halfyear:0,
        oneyear:0,
        thisyear:0,
        threeyear:0,
        chenglihou:0
    };
    $.ajax({
        type:"get",
        url:mainUrl+"webtheYields",
        dataType:"JSON",
        async:false,
        success:function(data){
            if(data.retcode=="0000"){
                result. onemonth=data.data["0"];
                result.threemonth=data.data["1"];
                result.halfyear=data.data["2"];
                result.oneyear=data.data["3"];
                result.thisyear=data.data["4"];
                result.threeyear=data.data["5"];
                result.chenglihou=data.data["6"];
            }

        }
    })
    return result;
}   //沪深300
function fourfrank(number){
    var result_f={
        word:0,
        number:0
    };
    if(number==""){
        result_f.word="-";
        result_f.number="100";
    }
    if(number=="1"){
        result_f.word="优秀";
        result_f.number=1;
    }
    if(number=="2"){
        result_f.word="良好";
        result_f.number=2;
    }
    if(number=="3"){
        result_f.word="一般";
        result_f.number=3;
    }
    if(number=="4"){
        result_f.word="不佳";
        result_f.number=4;
    }
    return  result_f;
}  //四分位排名

function zichanpie(fundid){
    $.ajax({
        type:"get",
        url:mainUrl+"webpercentage",
        data:{
            windcode:fundid
        },
        dataType:"JSON",
        success:function(data){
            if(data.retcode=="0000"){
                var huan='<div class="huan clearfix"></div>';
                $(".detwocon .two").append(huan);
                var pie=$("<div class='pie'><p>资产分布</p><p>"+gettime(data.data.fPrtEnddate)+"更新</p></div>");
                var bingchart=$("<div class='bingchart'></div>");
                var box=$("<div class='box' style='position:absolute;top:40%;left:27%;width:133px;height:100px;border:solid 1px #000;text-align: center;'></div>");

                $(".detwocon .two .huan").append(pie);
                $(".pie").append(bingchart);
                var shuju1=data.data.fPrtStocktonav;
                var shuju2=data.data.fPrtCashtonav;
                var shuju3=data.data.fPrtBondtonav;
                var shuju4=data.data.percentageEquity;
                $('.bingchart').highcharts({
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        },
                        marginTop:-100,
                        marginLeft:-50
                    },
                    title: {
                        text:null
                        //verticalAlign:"middle",
                        //useHTML:true

                    },
                    tooltip: {
                        pointFormat: '占比:<b>{point.y:.2f}%</b><br/>'
                    },

                    plotOptions: {
                        //pie: {
                        //    size:190,
                        //    allowPointSelect: false,
                        //    cursor: 'pointer',
                        //    dataLabels: {
                        //        enabled: false
                        //    },
                        //    showInLegend: false,
                        //    innerSize:"70%",
                        //    colors:["#ff9a00","#ffa926","#ffb84d","#ffd699"],
                        //    borderColor:"#fff5e5",
                        //    borderWidth:"5px",
                        //    events:{
                        //        click:function(e){
                        //            var box=$("<div class='box' style='position:absolute;top:40%;left:30%;width:130px;text-align: center;'></div>");
                        //            $(".box").remove();
                        //            var num= Number(e.point.y).toFixed(2)+"%";
                        //            var meg=$("<div style='font-size:19px;color:#333;'>"+e.point.name+"</div><div style='font-size:18px;color:#ff9900;'>"+num+"</div>");
                        //            $(".bingchart").append(box);
                        //            $(".box").append(meg);
                        //
                        //        }
                        //    }
                        //}
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            size:170,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}({point.percentage:.1f}%)',
                                style:{color:"#6e6e6e",fontWeight:"normal"}
                            }
                        }
                    },
                    credits: {enabled:false},
                    exporting: {enabled:false},
                    series: [{
                        //shadow: { "color": "#fff5e5", offsetX: 0, offsetY: 0, opacity:1,width: 9},
                        borderWidth:0,
                        type: 'pie',
                        name: '占比',
                        data: [
                            ['股票',  shuju1],
                            ['现金',  shuju2],
                            ['债券',  shuju3],
                            ['其他',  shuju4]
                        ]
                    }]
                });
                //var pielegend=$("<ul><li><span style='background: #ff9900;'></span>&nbsp;&nbsp;股票&nbsp;&nbsp;&nbsp;&nbsp;"+Number(data.data.fPrtStocktonav).toFixed(2)+"%</li>" +
                //    "<li><span style='background: #ffa926;'></span>&nbsp;&nbsp;债券&nbsp;&nbsp;&nbsp;&nbsp;"+Number(data.data.fPrtBondtonav).toFixed(2)+"%</li>" +
                //    "<li><span style='background: #ffb84d;'></span>&nbsp;&nbsp;现金&nbsp;&nbsp;&nbsp;&nbsp;"+Number(data.data.fPrtCashtonav).toFixed(2)+"%</li>" +
                //    "<li><span style='background: #ffd699;'></span>&nbsp;&nbsp;其他&nbsp;&nbsp;&nbsp;&nbsp;"+Number(data.data.percentageEquity).toFixed(2)+"%</li></ul>");
                //$(".pie").append(pielegend);
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }

        }
    })
}  //tab2 资产分布
function hangyepie(fundid){
    $.ajax({
        type:"get",
        url:mainUrl+"industry",
        data:{
            windcode:fundid
        },
        dataType:"JSON",
        success:function(data){
            if(data.retcode=="0000"){
                var option= {chart: {
                    //plotBackgroundColor: null,
                    //plotBorderWidth: 0,
                    //plotShadow: false
                    type:"bar"
                },
                    title: {
                        text:"",
                        //verticalAlign:"middle",
                        //useHTML:true
                    },
                    tooltip: {
                        pointFormat: '占比:<b>{point.y:.2f}%</b><br/>'
                    },
                    plotOptions: {
                        //pie: {
                        //    size:190,
                        //    allowPointSelect: false,
                        //    cursor: 'pointer',
                        //    dataLabels: {
                        //        enabled: false
                        //    },
                        //    showInLegend: false,
                        //    innerSize:"70%",
                        //    colors:["#198cff","#50aaff","#91c8ff","#afdcff"],
                        //    borderColor:"#ebf5ff",
                        //    borderWidth:"5px",
                        //    events:{
                        //        click:function(e){
                        //            var box=$("<div class='box' style='position:absolute;top:40%;left:30%;width:130px;text-align: center;'></div>");
                        //            $(".box").remove();
                        //            var num= Number(e.point.y).toFixed(2)+"%";
                        //            var meg=$("<div style='font-size:19px;color:#333;'>"+e.point.name+"</div><div style='font-size:18px;color:#4e9eff;'>"+num+"</div>");
                        //            $(".insbingchart").append(box);
                        //            $(".box").append(meg);
                        //
                        //        }
                        //    }
                        //}
                        bar: {
                            allowPointSelect: false,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                style:{color:"#6e6e6e",fontWeight:"normal"},
                                format: '{point.y:.2f}%'
                            },
                            showInLegend: false,
                            colors: ['#00a0e9','#f6b37f','#eb6877','#80c269']
                        }
                    },
                    yAxis : {
                        gridLineWidth: 0,
                        labels: {
                            enabled: false,
                        },
                        title: {
                            text: null
                        }
                    },
                    xAxis : {
                        categories: [],
                        gridLineWidth: 0,
                        labels: {
                            enabled: true
                        }
                    },
                    credits: {enabled:false},
                    exporting: {enabled:false},

                    series: [{
                        //shadow: { "color": "#ebf5ff", offsetX: 0, offsetY: 0, opacity:1,width: 9},
                        //borderWidth:0,
                        //type: 'pie',
                        name: '占比',
                        data: [

                        ]
                    }]}
                if(data.data.length==0){
                    var inspie=$("<div class='inspie'><p>行业分布</p></div>");
                }else{
                    var inspie=$("<div class='inspie'><p>行业分布</p><p>"+gettime(data.data[0].fPrtEnddate)+"更新</p></div>");
                }
                var insbingchart=$("<div class='insbingchart'></div>");
                var insleg=$("<ul class='insleg'></ul>");
                $(".detwocon .two .huan").append(inspie);
                $(".inspie").append(insbingchart,insleg);
                if(data.data.length==0){
                    $(".insbingchart").append("<span style='display: block;text-align: center;margin-top:20%;'>暂无数据</span>");
                }else{
                    for(i=0;i<data.data.length;i++){
                        var arr=[getIndustry(data.data[i].sInfoCsrcinduscode),data.data[i].fPrtIndustonav];
                        option.series[0].data.push(arr);
                        option.xAxis.categories.push(arr[0]);
                        //var li=$("<li><span style=background:"+option.plotOptions.pie.colors[i]+";></span>&nbsp;&nbsp;"+getIndustry(data.data[i].sInfoCsrcinduscode)+"&nbsp;&nbsp;&nbsp;&nbsp;"+Number(data.data[i].fPrtIndustonav).toFixed(2)+"%</li>");
                        //$(".insleg").append(li);

                    }
                    //console.log( option.series[0].data)
                    $(".insbingchart").highcharts(option);
                }
            }else{
                setErrorMsg(data.retcode, data.retmsg);
            }



        }
    })
}    //tab2 行业分布
function zhongcanggu(fundid){
    $.ajax({
        type:"get",
        url:mainUrl+"holding",
        dataType:"JSON",
        data:{
            windcode:fundid
        },
        success:function(data){
            if(data.data.length!=0){
                var zcbox=$("<div class='zcbox'></div>");
                var p1=$("<h3 >重仓股票</h3>");
                var zctable=$("<table class='zctable' style='margin:0 auto;'><tr><td>序号</td><td>股票名称</td><td>持仓市值（元）</td><td>持仓股数（万股）</td><td>占净值比例</td></tr></table>");
                $(".detwocon .two").append(p1,zcbox);
                $(".zcbox").append(zctable);
                $(data.data).each(function(i,n){
                    var tr1=$("<tr><td>"+(i+1)+"</td><td>"+ n.sInfoName+"</td><td>"+n.fprtStkValue+"</td><td>"+ n.fprtStkQuantity+"</td><td>"+ Number(n.fprtStkValueTonav).toFixed(2)+"%</td></tr>");
                    $(".zctable").append(tr1);
                })

            }

        }
    })
}  //tab2重仓股

function getIndustry(code){
    var industries = {
        A:"农、林、牧、渔业",
        B:"采矿业",
        C:"制造业",
        D:"电力、热力、燃气及水生产和供应业",
        E:"建筑业",
        F:"批发和零售业",
        G:"交通运输、仓储和邮政业",
        H:"住宿和餐饮业",
        I:"信息传输、软件和信息技术服务业",
        J:"金融业",
        K:"房地产业",
        L:"租赁和商务服务业",
        M:"科学研究和技术服务业",
        N:"水利、环境和公共设施管理业",
        O:"居民服务、修理和其他服务业",
        P:"教育",
        Q:"卫生和社会工作",
        R:"文化、体育和娱乐业",
        S:"综合"
    };
    if(code) {
        return industries[code.toUpperCase()];
    } else {
        return "其他行业";
    }
};


