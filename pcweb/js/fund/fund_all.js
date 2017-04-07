/**
 * Created by linxi on 2016/12/5.
 */

$(function(){

    //载入基金公司名称
    companies();

    //监控输入
    SuggestRemote();
    onFundType(1,10);
    $("#fundtype a").click(function(){
        $(this).siblings().removeClass("select").end().addClass("select");
        var fundtype=$(this).attr("data-type");
        var fundRisk=$("#fundRisk a.select").attr("data-id");
        console.log(fundRisk);
        var managementComp=$("#managementComp a.select").attr("data-name");
        console.log(managementComp);
        onFundType(1,10,fundtype,fundRisk,managementComp);
    });

    $("#fundRisk a").click(function(){
        $(this).siblings().removeClass("select").end().addClass("select");
        var fundtype=$("#fundtype a.select").attr("data-type");
        var fundRisk=$(this).attr("data-id");
        var managementComp=$("#managementComp a.select").attr("data-name")
        onFundType(1,10,fundtype,fundRisk,managementComp);
    });


    $("#managementComp").on("click","a",function(){
        $(this).siblings().removeClass("select").end().addClass("select");
        var fundtype=$("#fundtype a.select").attr("data-type");
        var fundRisk=$("#fundRisk a.select").attr("data-id");
        var managementComp=$(this).attr("data-name")
        onFundType(1,10,fundtype,fundRisk,managementComp);
    });

    $(".fund_search_btn").on("click",function(){
        var fund_input=$('.fund_input').val();
        if(fund_input==""||fund_input==null||fund_input==undefined){
            showAlert("请填写基金名称/代码/首字母");
        }else if(fund_input=="创富宝"){
            window.location.href = "chuangfu.html";
        }else {
            MutualFundListManacheFuzzyQueryAction(fund_input,1,20);
        }

    });







});

function MutualFundListManacheFuzzyQueryAction(keywords, page, offset){
    var params = {
        "page" : page,
        "pageRecorders" : offset,
        "information" : keywords
    };
    if( /[0-9]+/.test(keywords) ) {
        params.flat = 0;
    } else if( /[a-zA-Z0-9]+/.test(keywords) ) {
        params.flat = 2;
    } else {
        params.flat = 1;
    }
    $.ajax({
        type: 'post',
        url: mainUrl + "MutualFundListManacheFuzzyQueryAction",
        data: params,
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if(data.retcode=="0000"||data.retcode==0000){
                $(".fund_list table tbody").html("");
                var fundtypehtml="";
                var data1=data.data;
                if(data1){


                    $(data1).each(function (i, n) {
                        var fundName= n.fundName;
                        var fundCodeall=n.fInfoWindcode;
                        var fundCode=fundCodeall .substring(0,6);
                        var fNavUnit= Number(n.fNavUnit);
                        var fAvgrReturnMonth= Number(n.fAvgrReturnMonth);
                        var fAvgReturnQuarter= Number(n.fAvgReturnQuarter);
                        var fAvgReturnHalfYear= Number(n.fAvgReturnHalfYear);
                        var fAvgReturnYear= Number(n.fAvgReturnYear);
                        var fAvgReturnThisYear= Number(n.fAvgReturnThisYear);
                        var classname="";
                        if(fAvgrReturnMonth>0){
                            classname="fonthong";
                        }else if(fAvgrReturnMonth<0){
                            classname="fontlv";
                        }else{
                            classname="";
                        }
                        var classname1="";
                        if(fAvgReturnQuarter>0){
                            classname1="fonthong";
                        }else if(fAvgReturnQuarter<0){
                            classname1="fontlv";
                        }else{
                            classname1="";
                        }
                        var classname2="";
                        if(fAvgReturnHalfYear>0){
                            classname2="fonthong";
                        }else if(fAvgReturnHalfYear<0){
                            classname2="fontlv";
                        }else{
                            classname2="";
                        }
                        var classname3="";
                        if(fAvgReturnYear>0){
                            classname3="fonthong";
                        }else if(fAvgReturnYear<0){
                            classname3="fontlv";
                        }else{
                            classname3="";
                        }
                        var classname4="";
                        if(fAvgReturnThisYear>0){
                            classname4="fonthong";
                        }else if(fAvgReturnThisYear<0){
                            classname4="fontlv";
                        }else{
                            classname4="";
                        }
                        fundtypehtml+='<tr><td class="detailall" code="'+fundCodeall+'" name="'+fundName+'">'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></td><td>'+fNavUnit.toFixed(4)+'<br><span class="font12hui9">'+ n.priceDate+'</span></td><td class="'+classname+'">'+fAvgrReturnMonth.toFixed(2)+'%</td><td class="'+classname1+'">'+fAvgReturnQuarter.toFixed(2)+'%</td><td class="'+classname2+'">'+fAvgReturnHalfYear.toFixed(2)+'%</td><td class="'+classname3+'">'+fAvgReturnYear.toFixed(2)+'%</td><td class="'+classname4+'">'+fAvgReturnThisYear.toFixed(2)+'%</td><td><a class="fund_buy" name="'+fundName+'" id="'+fundCode+'">立即购买</a></td></tr>';
                    });
                    $(".fund_list table tbody").append(fundtypehtml);
                    $(".fund_buy").click(function(){

                        var name=$(this).attr("name");
                        var id=$(this).attr("id");
                        buyNewStep1(id,name);
                    });
                    $(".detailall").off("mouseover").on("mouseover",function(){
                        $(this).css({cursor:"pointer"});
                    })
                    $(".detailall").click(function(){
                        var code=$(this).attr("code");
                        var name=$(this).attr("name");
                        window.location.href="../fund/fund-detail.html?fundid="+code+"&fundname="+name;
                    })
                    //总条数
                    var totalRecord=data.total;
                    //计算分页总页数算法
                    var totalPages1=totalRecord % offset == 0 ? totalRecord / offset : totalRecord / offset + 1 ;
                    //console.log(totalPages1);

                    //paginator分页插件写法
                    var options = {
                        currentPage: page,//当前页
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
                            MutualFundListManacheFuzzyQueryAction(keywords,page,offset)
                        },

                    };
                    //$("#example").bootstrapPaginator(options);
                    console.log(data1);
                    if(data1.length==0||data1==undefined){
                        $("#sample_2_paginate").hide();
                        $("#sample_1_paginate").hide();
                    }else{
                        $("#sample_2_paginate").hide();
                        var element=$("#sample_1_paginate");
                        element.bootstrapPaginator(options);
                    }
                }else{
                    var fundtypehtml="";
                    fundtypehtml+='<tr><td colspan="8">暂无数据!</td></tr>'
                    $(".fund_list table tbody").append(fundtypehtml);
                    $("#sample_2_paginate").hide();
                    $("#sample_1_paginate").hide();
                }

            }else{
                $(".fund_list table tbody").html("");
                var fundtypehtml="";
                fundtypehtml+='<tr><td colspan="8">暂无数据，错误信息：'+data.retmsg+'</td></tr>'
                $(".fund_list table tbody").append(fundtypehtml);
            }



        },error:function(data){
            var fundtypehtml="";
            fundtypehtml+='<tr><td colspan="8">服务器错误！</td></tr>'
            $(".fund_list table tbody").append(fundtypehtml);
        }
    });



};
//基金代码实时检索
function SuggestRemote() {
    var params = {
        "page" : 1,
        "pageRecorders" : 2000
    };
    //var url = {url:mainUrl + "/MutualFundListManacheQueryAction", data:params,type:"get",dataType:"json",}
    //var deferred = $.Deferred();
    //var deferred = $q.defer();
    //console.log( "# GET " + url + " ..." );
    //console.log(params);
    $.ajax({
        url : mainUrl + "MutualFundListManacheEasyAction",
        data : params,
        dataType : "JSON",
        success : function(ret) {
            if (ret && ret.retcode && ret.retcode == "0000") {
                var data = ret.data;
                var results = [];
                var results1 = [];
                var results2 = [];
                //console.log(data);
                if (data) {
                    $.each(data,function(i,n){
                        //var product = data;
                        results.push({
                            name : n.fundName,
                            windcode : n.fInfoWindcode,
                            netValue : n.fundName+n.fInfoPinYin+n.fInfoWindcode
                        });

                    });


                    /* if (/[0-9]+/.test(keywords)) {
                     params.flat = 0;
                     console.log(params.flat);*/
                    $('#fundZm').typeahead({
                        source : results,
                        items : 10,
                        display : 'netValue',
                        val : 'name',
                        netValue : 'windcode',
                        itemSelected : displayResult
                    });


                }
                //监控表单数据输入状态插件

            } else {
                console.log("1114");
            }
        },

        error : function(response) {
            console.log("# ERROR:" + JSON.stringify(response) + " ... FROM: ");
        }
    });

};


function displayResult(item, val, text, netValue) {
    $('#fundZm').attr("data-id",netValue);
    console.log(item);
    console.log(val);
    console.log(text);
    console.log(netValue);
    window.location.href = "fund-detail.html?fundid=" +netValue+ "&fundname="+val+"";
};


function onFundType(page,pageRecorders,fundtype,fundRisk,managementComp){
    if(fundtype!=""&&fundtype!="null"&&fundRisk=="null"&&managementComp=="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders,
            "investType" : fundtype,
        };
    }else if(fundRisk!=""&&fundRisk!="null"&&fundtype=="null"&&managementComp=="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders,
            "fundRisk" : fundRisk,
        };
    }else if(managementComp!=""&&managementComp!="null"&&fundtype=="null"&&fundRisk=="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders,
            "managementComp" : managementComp,
        };
    }else if(managementComp!=""&&fundtype!=""&&fundRisk!=""&&managementComp!="null"&&fundtype!="null"&&fundRisk!="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders,
            "investType" : fundtype,
            "fundRisk" : fundRisk,
            "managementComp" : managementComp
        };
    }else if(managementComp!=""&&managementComp!="null"&&fundtype!=""&&fundtype!="null"&&fundRisk=="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders,
            "investType" : fundtype,
            "managementComp" : managementComp
        };
    }else if(managementComp!=""&&managementComp!="null"&&fundtype=="null"&&fundRisk!=""&&fundRisk!="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders,
            "fundRisk" : fundRisk,
            "managementComp" : managementComp
        };
    }else if(managementComp=="null"&&fundtype!=""&&fundtype=="null"&&fundRisk!=""&&fundRisk!="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders,
            "fundRisk" : fundRisk,
            "investType" : fundtype
        };
    }else if(fundtype=="null"||fundtype==""&&fundRisk=="null"&&managementComp=="null"){
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders
        };
    }else{
        var params1 = {
            "page" : page,
            "pageRecorders" : pageRecorders
        };
    }
    $.ajax({
        type: 'post',
        url: mainUrl + "MutualFundListManacheQueryAction",
        data: params1,
        dataType: "JSON",
        success: function (data) {
            if(data.retcode=="0000"||data.retcode==0000){
                $(".fund_list table tbody").html("");
                var fundtypehtml="";
                var data1=data.data;
                if(data1){


                $(data1).each(function (i, n) {
                    var fundName= n.fundName;
                    var fundCodeall=n.fInfoWindcode;
                    var fundCode=fundCodeall .substring(0,6);
                    var fNavUnit= Number(n.fNavUnit);
                    var fAvgrReturnMonth= Number(n.fAvgrReturnMonth);
                    var fAvgReturnQuarter= Number(n.fAvgReturnQuarter);
                    var fAvgReturnHalfYear= Number(n.fAvgReturnHalfYear);
                    var fAvgReturnYear= Number(n.fAvgReturnYear);
                    var fAvgReturnThisYear= Number(n.fAvgReturnThisYear);
                    if(n.fNavUnit==""){
                        var fNavUnit1="--";
                    }else{
                        fNavUnit1=Number(n.fNavUnit).toFixed(4);

                    }
                    if(n.fAvgrReturnMonth==""){
                        var fAvgrReturnMonth1="--";
                    }else{
                        fAvgrReturnMonth1=Number(n.fAvgrReturnMonth).toFixed(2)+"%";
                    }
                    if(n.fAvgReturnQuarter==""){
                        var fAvgReturnQuarter1="--";
                    }else{
                        fAvgReturnQuarter1=Number(n.fAvgReturnQuarter).toFixed(2)+"%";
                    }
                    if(n.fAvgReturnHalfYear==""){
                        var fAvgReturnHalfYear1="--";
                    }else{
                        fAvgReturnHalfYear1=Number(n.fAvgReturnQuarter).toFixed(2)+"%";
                    }
                    if(n.fAvgReturnYear==""){
                        var fAvgReturnYear1="--";
                    }else{
                        fAvgReturnYear1=Number(n.fAvgReturnYear).toFixed(2)+"%";
                    }
                    if(n.fAvgReturnThisYear==""){
                        var fAvgReturnThisYear1="--";
                    }else{
                        fAvgReturnThisYear1=Number(n.fAvgReturnThisYear).toFixed(2)+"%";
                    }
                    var classname="";
                    if(fAvgrReturnMonth>0){
                        classname="fonthong";
                    }else if(fAvgrReturnMonth<0){
                        classname="fontlv";
                    }else{
                        classname="";
                    }
                    var classname1="";
                    if(fAvgReturnQuarter>0){
                        classname1="fonthong";
                    }else if(fAvgReturnQuarter<0){
                        classname1="fontlv";
                    }else{
                        classname1="";
                    }
                    var classname2="";
                    if(fAvgReturnHalfYear>0){
                        classname2="fonthong";
                    }else if(fAvgReturnHalfYear<0){
                        classname2="fontlv";
                    }else{
                        classname2="";
                    }
                    var classname3="";
                    if(fAvgReturnYear>0){
                        classname3="fonthong";
                    }else if(fAvgReturnYear<0){
                        classname3="fontlv";
                    }else{
                        classname3="";
                    }
                    var classname4="";
                    if(fAvgReturnThisYear>0){
                        classname4="fonthong";
                    }else if(fAvgReturnThisYear<0){
                        classname4="fontlv";
                    }else{
                        classname4="";
                    }
                    fundtypehtml+='<tr><td class="detailall" code="'+fundCodeall+'" name="'+fundName+'">'+fundName+'<br><span class="font12hui9">'+fundCode+'</span></td><td>'+fNavUnit1+'<br><span class="font12hui9">'+ n.priceDate+'</span></td><td class="'+classname+'">'+fAvgrReturnMonth1+'</td><td class="'+classname1+'">'+fAvgReturnQuarter1+'</td><td class="'+classname2+'">'+fAvgReturnHalfYear1+'</td><td class="'+classname3+'">'+fAvgReturnYear1+'</td><td class="'+classname4+'">'+fAvgReturnThisYear1+'</td><td><a class="fund_buy" name="'+fundName+'" id="'+fundCode+'">立即购买</a></td></tr>';
                });
                $(".fund_list table tbody").append(fundtypehtml);
                    $(".fund_buy").click(function(){
                        var name=$(this).attr("name");
                        var id=$(this).attr("id");
                        buyNewStep1(id,name);
                    });
                    $(".detailall").off("mouseover").on("mouseover",function(){
                        $(this).css({cursor:"pointer"});
                    });
                    $(".detailall").click(function(){
                         var code=$(this).attr("code");
                        var name=$(this).attr("name");
                        window.location.href="../fund/fund-detail.html?fundid="+code+"&fundname="+name;
                    });
                    //总条数
                var totalRecord=data.total;
                    //计算分页总页数算法
                var totalPages1=totalRecord % pageRecorders == 0 ? totalRecord / pageRecorders : totalRecord / pageRecorders + 1 ;
                    //console.log(totalPages1);
                    //paginator分页插件写法
                var options = {
                    currentPage: page,//当前页
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
                        onFundType(page,pageRecorders,fundtype,fundRisk,managementComp)
                    },

                };
                //$("#example").bootstrapPaginator(options);
                        $("#sample_2_paginate").hide();
                        var element=$("#sample_1_paginate");
                        element.bootstrapPaginator(options);

                }else{
                    var fundtypehtml="";
                    fundtypehtml+='<tr><td colspan="8">暂无数据!</td></tr>'
                    $(".fund_list table tbody").append(fundtypehtml);

                }

            }else{
                $(".fund_list table tbody").html("");
                var fundtypehtml="";
                fundtypehtml+='<tr><td colspan="8">暂无数据，错误信息：'+data.retmsg+'</td></tr>'
                $(".fund_list table tbody").append(fundtypehtml);
            }



        },error:function(data){
            var fundtypehtml="";
            fundtypehtml+='<tr><td colspan="8">服务器错误！</td></tr>'
            $(".fund_list table tbody").append(fundtypehtml);
        }
    });



};


function companies(){
    $.ajax({
        type: "GET",
        //url: mainUrl + "pcweb/data/companies.json",//测试环境
        url: mainUrl + "data/companies.json",//生产环境
        dataType: "json",
        success: function (data) {
            $("#managementComp").html("");
            var fundCompaniesHtml = '';
             fundCompaniesHtml +="<a data-name='null' class='select'>全部</a>";
            $(data).each(function (i, n) {
                var fundCompaniesname = n.name;
                var fundCompaniesvalue = n.value;
                fundCompaniesHtml += "<a data-name='"+fundCompaniesvalue+"'>"+fundCompaniesname+"</a>";
            });
            $("#managementComp").append(fundCompaniesHtml);

        },
        error:function(data){
            var fundCompaniesHtml = '';
            fundCompaniesHtml +="<a data-name='null' class='select'>服务器错误</a>";
            $("#managementComp").append(fundCompaniesHtml);
        }
    });
};