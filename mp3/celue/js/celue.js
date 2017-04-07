/**
 * Created by dell on 2017/2/8.
 */
$(document).ready(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    getDipperMsg()
    getDipperIncome(0);
    function getDipperMsg(){
        $.ajax({
            url:'http://www.5irich.com/queryNewDes',
            data: null,
            dataType: 'JSON',
            success: function(data){
                if(data.retcode == '0000') {
                    var class1;
                    var onemonth=data.data.monthincome;
                    var day=data.data.navUd;
                    var jingz=Number(data.data.nav).toFixed(2);
                    var onemonth1=Number(onemonth*100).toFixed(2)+"%";
                    var day1=Number(day*100).toFixed(2)+"%";
                    if(onemonth<0){
                        $(".onemonth").attr("style","color:#008000");
                    }else{
                        $(".onemonth").attr("style","color:#FF0000");
                    }
                    if(day<0){
                        $(".day").attr("style","color:#008000");
                    }else{
                        $(".day").attr("style","color:#FF0000");
                    }
                    $(".onemonth").html(onemonth1);
                    $(".day").html(day1);
                    $(".jingz").html(jingz);
                    $(".date").html(data.data.navdate.substring(4,6)+'-'+data.data.navdate.substring(6,8));
                    $(".create").html(data.data.fundCreattime.substring(0,4)+'-'+data.data.fundCreattime.substring(4,6)+'-'+data.data.fundCreattime.substring(6,8))
                    $(".his").html(Number(data.data.returnYear*100).toFixed(2)+"%");
                    $(".huiche").html(Number(data.data.zdhc*100).toFixed(2)+"%");
                    $(".bilv").html(Number(data.data.xpbl).toFixed(2));
                }
            },
            error: function(data){
                console.log(data);
            }

        });
    }
    function getDipperIncome(number){
        $.ajax({
            url:"http://www.5irich.com/queryBdqxChart",
            data: {
                startType: number
            },
            dataType: 'JSON',
            success: function(data){
               console.log(data);
                if(data.retcode == '0000'){
                    createIncomeChart(data.data);

                }

            },
            error: function(data){
                //debug(data);
            }

        });
    }
    function createIncomeChart(data){
        var yf=Number(data.yfnavTurnRatioList[(data.yfnavTurnRatioList.length-1)]).toFixed(2)+'%';
        var ys=Number(data.ysDqCloseList[(data.ysDqCloseList.length-1)]).toFixed(2)+'%';
        if(data.yfnavTurnRatioList[(data.yfnavTurnRatioList.length-1)]<0){
            $('.dipper-increase').attr("style","color:#008000");
        }else{
            yf="+"+yf;
            $('.dipper-increase').attr("style","color:#FF0000");
        }
        if(data.ysDqCloseList[(data.ysDqCloseList.length-1)]<0){
            $('.dipper-hs300').attr("style","color:#008000");
        }else{
             ys="+"+ys;
            $('.dipper-hs300').attr("style","color:#FF0000");
        }
        $('.dipper-increase').html(yf);
        $('.dipper-hs300').html(ys);
        for(var i = 0;i < data.yfnavTurnRatioList.length;i++){
            data.yfnavTurnRatioList[i] = Number(data.yfnavTurnRatioList[i]);
        }
        for(var i = 0;i < data.ysDqCloseList.length;i++){
            data.ysDqCloseList[i] = Number(data.ysDqCloseList[i]);
        }
        var interval = parseInt(data.xtradeDtList.length/2);

      $(".detail-linechart").highcharts({
          chart: {
              type: 'line',
              backgroundColor: "#fff",
              height:200

          },
          title: {
              text: null
          },
          xAxis: {
              categories: data.xtradeDtList,
              labels: {
                  enabled: true,
                  formatter: function () {
                      return this.value;
                  }

              },
              gridLineWidth: 0,
              lineWidth: 1,
              lineColor: '#edf0f4',
              tickInterval: interval
              //间隔使用长度/5
          },
          legend: {
              enabled: false
          },
          credits: {
              enabled: false
          },
          yAxis: {
              labels: {
                  enabled: true,
                  formatter: function () {
                      return this.value + '%';
                  }
              },
              title: {
                  enabled: false
              },
              visible: true
          },
          tooltip: {
              pointFormat: '{series.name}-收益率：{point.y}%',
              crosshairs: 1
          },
          plotOptions: {
              line: {
                  marker: {
                      enabled: false,
                      symbol: 'circle',
                      radius: 2,
                      states: {
                          hover: {
                              enabled: true
                          }
                      }
                  }
              }
          },
          series: [{
              name: "北斗七星",
              data: data.yfnavTurnRatioList,
              color:'#ff9900'
          },{
              name: '沪深300',
              data: data.ysDqCloseList,
              color: "#3ca5e6"
          }]
      })

    }
    $(".time li").click(function(){
        var number=$(this).attr("data-index");
        $(this).addClass("active").siblings().removeClass("active");
        getDipperIncome(number);
    });
    $(".shuoming").click(function(){
        window.location.href="shuoming.html";
    });
    $(".xuzhi").click(function(){
        window.location.href="xuzhi.html";
    });
    $(".peibi").click(function(){
        window.location.href="peibi.html";
    });
    function goMoniLogin(){
        window.location.href = mainUrl+"mp/login.html";
    }
    function goisopen(){
        window.location.href = mainUrl+"mp/account/account.html";
    }

    $(".ljbuy").click(function(){
        if(username == "" || username == null || username == undefined	|| username == "null"){
            showAlert("您没有登录！",goMoniLogin);
            return;
        }else if(isopen != 1) {
            showAlert("您还未开户！，请开户后进行相关操作", goisopen);
            return;
        }
        var args = new getArgs();
        var fundid = args.groupId;
        var fundname = args.groupname;
        console.log(fundid);
        buyGroupStep1(fundid, fundname);
    })
})