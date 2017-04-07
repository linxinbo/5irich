var intell = {};
intell.level = getArgs().grouplevel || 'B4';
intell.groupcode = getArgs().groupcode || 'ZN2004';
intell.grouoname = getArgs().groupname || '智能组合2004';
intell.chartdata1 = ['智能组合', 100];
intell.Rank = intell.level.substring(1);
intell.futurePro = [];
$(function () {
    //判断是否登陆
    debug($.cookie("username"));
    if ($.cookie("username")) {
        $.ajax({
            url: mainUrl + "queryRecord",
            data: "",
            dataType: "JSON",
            success: function (response) {
                debug(response);
                if (response.retcode == "0000") {
                    intell.level = response.data.level;
                    intell.Rank = intell.level.substring(1);
                }
                debug('intell'+response.retcode);
                $('.home-rank').html(intell.Rank);
                $('.home-risk-btn').css('left', (parseInt(intell.Rank)*74.3-50));
                intellGroup();
                $('.home-intell-test').html('重新测评 >');
            },
            error: function (response1) {
                debug(response1);
                $('.home-intell-test').html('重新测评 >');
                $('.home-rank').html(intell.Rank);
                $('.home-risk-btn').css('left', (parseInt(intell.Rank)*74.3-50));
                intellGroup();
            }
        });
    } else {
        $('.home-rank').html(intell.Rank);
        $('.home-risk-btn').css('left', (parseInt(intell.Rank)*74.3-50));
        intellGroup();
    }
    $('.test-answer').on('click',function(){
        $(this).addClass('on').parent().siblings().find('span').removeClass('on');
    });
    $('.home-intell-test').on('click',function(){
        $('.home-layer').show();
        $('.intell-test').show();
    });
    $('.intell-test-close').on('click',function(){
        $('.home-layer').hide();
        $('.intell-test').hide();
    });
    $('.intell-skill-list ul li').on('mouseenter',function(){
        $(this).addClass('act').siblings().removeClass('act');
        var index = $(this).index();
        $(this).parent().parent().find('ol li').hide();
        $(this).parent().parent().find('ol li:eq('+index+')').show();
    });
    //提交测评结果
    $('.test-submit').on('click',function(){
        debug(getValue());
        if(getValue().length != 5){
            alert('请填写完整信息！');
        }else {
            var params = {
                "result": getValue()
            };
            $.ajax({
                url: mainUrl + "riskRating",
                data: params,
                dataType: "JSON",
                success: function (response) {
                    if (response) {
                        intell.level = response.retmsg;
                        intell.Rank=intell.level.substring(1);
                        $('.home-intell-test').html('重新测评 >');
                        $('.test-answer').removeClass('on');
                        $('.home-layer').hide();
                        $('.intell-test').hide();
                        $('.home-rank').html(intell.Rank);
                        $('.home-risk-btn').css('left', (parseInt(intell.Rank)*74.3-50));
                        intellGroup();
                        saveData();
                    }
                },
                error: function (response) {
                    showAlert('系统繁忙，请稍后再试');
                }
            });
        }
    });
    //保存测评结果
    function saveData(){
        if ($.cookie("username")) {
            var params2 = {
                "level": intell.level,
                "info.age": "",
                "info.sex": ""
            };
            $.ajax({
                url: mainUrl + "save_updateScore",
                data: params2,
                dataType: "JSON",
                success: function (response) {
                    if (response.retcode == "0000") {
                        debug(response)
                    }

                },
                error: function (response1) {
                    showAlert("系统繁忙，请稍后再试！");
                }
            });
        }
    }
    //获取测评数据
    function getValue(){
        var answerArr = [];
        $('.test-question ol li').find('.on').each(function(index,element){
            answerArr.push($(this).find('input').val());
        });
        return answerArr.join("");
    }
    //获取组合名称
    function intellGroup() {
        var params = {
            "groupLevel": intell.level
        };
        $.ajax({
            url: mainUrl + "WebLevelQueryAction",
            data: params,
            dataType: "JSON",
            success: function (response) {
                if (response.retcode = "0000") {
                    intell.groupcode = response.data.fdGroupCode;
                    intell.groupname = response.data.fdGroupName;
                    $('.home-chart1-num').html("");
                    $('.home-chart1-num').html(response.data.fdGroupBenchMark);
                    intell.futurePro[0] = response.data.fdGroupFep1.split(",");
                    intell.futurePro[1] = response.data.fdGroupFep2.split(",");
                    intell.futurePro[2] = response.data.fdGroupFep3.split(",");
                    //intell.futurePro[3] = response.data.fdGroupFep4.split(",");
                    $.each(intell.futurePro,function(index,element){
                        $.each(intell.futurePro[index],function(index1,element1){
                            intell.futurePro[index][index1] = parseInt(element1);
                        });
                    });
                    debug(intell.futurePro)
                }
                intellData();

            },
            error: function (response1) {
                debug('错误！');
                intellData();
            }
        });
    }
    //获取组合数据
    function intellData() {
        $.ajax({
            type: "post",
            url: mainUrl + "WebProportionalQueryAction",
            data: {
                groupId: intell.groupcode
            },
            dataType: "json",
            success: function (data) {
                $('.intell-funddetail ul').html("");
                if (data.retcode == '0000') {
                    intell.chartdata1 = [];
                    $(data.data).each(function (index, element) {
                        var fundname = element.fundName;
                        if (fundname.length > 10) {
                            fundname = fundname.substring(0, 10) + '...';
                        }
                        var fundcode = element.fundId.substring(0, 6);
                        var fundProportional = element.fdProportional;
                        var fundDetail = '<li><p>' + fundname + '<span>' + fundcode + '</span></p><strong>' + fundProportional + '%</strong></li>';
                        $('.intell-funddetail ul').append(fundDetail);
                        (intell.chartdata1).push([element.fundName, Number(element.fdProportional)]);

                    });
                    intellChart(intell.chartdata1);
                }
            }
        });
    }
    //画智能投顾图
    function intellChart(data) {
        Highcharts.setOptions({
            colors: ['#ff9900', '#ffa51e', '#ffaf3c', '#ffbe50', '#ffc873', '#ffd796', '#ffe6b4']
        });
        Highcharts.chart('home-chart1-pie', {
            chart: {
                height: 200,
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: 'rgba(0,0,0,0)'

            },
            title: {
                text: '组 合 <br />占 比',
                align: "center",
                style: { "color": "#ffa926", "fontSize": "18px" },
                verticalAlign: "middle",
                y: -5
            },
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<small>{point.key}</small><table>',
                pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                '<td style="text-align: right"><b>{point.y} %</b></td></tr>',
                footerFormat: '</table>',
                valueDecimals: 2
            },
            series: [{
                shadow: { "color": "#fff5e5", offsetX: 0, offsetY: 0, opacity: .1, width: 10 },
                type: 'pie',
                name: '组合占比',
                innerSize: '53%',
                borderWidth: 0,
                data: data,
                dataLabels: {
                    enabled: false
                }
            }],
            credits: {
                enabled: false
            }
        });
    }
    //拖拽
    $('.home-risk-btn').mousedown(function (ev) {
        $(this).addClass('active');
        var event = ev || event;
        var firstX = event.pageX;
        var offsetX = $('.home-risk-bar').offset().left;
        var disX = firstX - $(this).offset().left;
        $(document).on('mousemove', move);
        $(document).on('mouseup', remove);
        function move(ev) {
            var event = ev || event;
            var x = event.pageX - offsetX - disX;
            if (x <= -12) {
                x = -12;
            }
            if (x > 731) {
                x = 731;
            }
            intell.Rank = Math.ceil((x + 13) / 74.4);
            if(intell.Rank<=0){
                intell.Rank=1;
            }else if(intell.Rank>10){
                intell.Rank=10;
            }
            $('.home-rank').html(intell.Rank);
            $('.home-risk-btn').css('left', x);
            return false;
        }
        function remove() {
            $('.home-risk-btn').removeClass('active');
            intell.level = intell.level.substring(0,1)+intell.Rank;
            intellGroup();
            $(document).off('mousemove', move);
            $(document).off('mouseup', remove);
        }
    });
    $('.home-risk-bar').on('mouseenter', function () {
        $('.home-risk-tip').show();
    });
    $('.home-risk-bar').on('mouseleave', function () {
        $('.home-risk-tip').hide();
    });
    $('.home-risk-bar').on('click', function (ev) {
        var event = ev || event;
        var firstX = event.pageX;
        var offsetX = $('.home-risk-bar').offset().left;
        var disX = firstX - offsetX;
        var offsetW = parseInt($('.home-risk-btn').width())/2;
        var x = disX - offsetW;
        debug(disX+':'+offsetW);
        intell.Rank = Math.ceil((x + 13) / 74.4);
        if(intell.Rank<=0){
            intell.Rank=1;
        }else if(intell.Rank>10){
            intell.Rank=10;
        }
        debug(intell.Rank);
        $('.home-rank').html(intell.Rank);
        $('.home-risk-btn').css('left', x);
        intell.level = intell.level.substring(0,1)+intell.Rank;
        intellGroup();
    });
    //跳转组合详情
    $('.intell-detail').on('click',function(){
        window.location.href = mainUrl+'home/combination.html?groupcode=' + intell.groupcode + '&groupname=' + intell.grouoname + '&grouplevel=' + intell.level;//生产环境
        //window.location.href = mainUrl+'pcweb/home/combination.html?groupcode=' + intell.groupcode + '&groupname=' + intell.grouoname + '&grouplevel=' + intell.level;//测试环境
    });
});