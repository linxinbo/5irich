/**
 * Created by linxi on 2016/12/28.
 */

var one_mon = new Date().getTime() - 30 * 24 * 3600 * 1000;
var thr_mon = new Date().getTime() - 90 * 24 * 3600 * 1000;
var six_mon = new Date().getTime() - 270 * 24 * 3600 * 1000;
one_mon = new Date(one_mon).Format("yyyyMMdd");
thr_mon = new Date(thr_mon).Format("yyyyMMdd");
six_mon = new Date(six_mon).Format("yyyyMMdd");
var isopen = $.cookie("isopen");
var username = $.cookie("username");
$(document).ready(function () {
    var enddate = new Date().Format("yyyyMMdd");
    //用户登陆验证
    if(username == "" || username == null || username == undefined|| username == "null") {
        setErrorMsg(1001);//重写报错处理
        return false;
    }else if(isopen != 1) {
        showAlert("您还未开户！，请开户后进行相关操作",gourl);//重写报错处理
        return false;
    }else{
        historyTrading(20000101,enddate,22,1,20);

        //切换交易类型
        $("#trade_type a").on("click",function(){
            $(this).siblings().removeClass("select").end().addClass("select");
            var businesscode=$(this).attr("data-code");
            if(businesscode==0){
                businesscode="";
            }
            historyTrading(20000101,enddate,businesscode,1,20);
        });

        //切换时间
        $("#trade_time a").on("click",function(){
            $(this).siblings().removeClass("select").end().addClass("select");
            var tradetime=$(this).attr("data-id");
            var businesscode1=$("#trade_type a.select").attr("data-code");
            //onsole.log(businesscode1);
            if(businesscode1==0){
                businesscode1="";
            }

            if(tradetime==0){
                var begindate = 20000101;
                var enddate1 = new Date().Format("yyyyMMdd");
                historyTrading(begindate,enddate1,businesscode1,1,20);

            }else{
                if(tradetime==1||tradetime=="1"){
                    var begindate = one_mon;
                }else if(tradetime==3||tradetime=="3"){
                    begindate = thr_mon;
                }else if(tradetime==6||tradetime=="6"){
                    begindate = six_mon;
                }
                var enddate2 = new Date().Format("yyyyMMdd");
                historyTrading(begindate,enddate2,businesscode1,1,20);
            }

        });

        var start = {
            dateCell: '#startDate',
            format: 'YYYY-MM-DD',
            minDate:  '1900-01-01',
            isinitVal:true,
            festival:true,
            ishmsVal:false,
            maxDate: jeDate.now(0), //最大日期
            choosefun: function(elem){
                end.minDate = elem; //开始日选好后，重置结束日的最小日期
                jeDate(end);
                jeDate(start);
            },
            okfun:function(elem){
                $('.nt_sDate').removeClass('nt_navdown').addClass('nt_navup');
                $('.nt_sDate').html(elem);
                beginDate = elem.split('-').join('');
                var dateMin = parseInt(beginDate);
                var dateMax = parseInt(endDate);
                if(dateMin > dateMax){
                    showAlert('开始时间应该小于结束时间！');
                    return false;
                }
                //getHistoryDeal(beginDate, endDate);
            }
        };
        var end = {
            dateCell: '#endDate',
            format: 'YYYY-MM-DD',
            minDate: '1900-00-00',
            festival:true,
            maxDate: jeDate.now(0), //最大日期
            choosefun: function(elem){
                start.maxDate = elem; //将结束日的初始值设定为开始日的最大日期
                jeDate(start);
                jeDate(end);
            },
            okfun:function(elem){
                $('.nt_eDate').removeClass('nt_navdown').addClass('nt_navup');
                $('.nt_eDate').html(elem);
                endDate = elem.split('-').join('');
                var dateMin = parseInt(beginDate);
                var dateMax = parseInt(endDate);
                if(dateMin > dateMax){
                    showAlert('开始时间应该小于结束时间！');
                    return false;
                }
                //getHistoryDeal(beginDate, endDate);
            }
        };
        jeDate(start);
        jeDate(end);

        //输入时间搜索
        $("#trade_sreach").on("click",function(){
            var beginDate=$("#startDate").val();
            var endDate=$("#endDate").val();
            var businesscode1=$("#trade_type a.select").attr("data-code");
            //console.log(businesscode1);
            var enddate3 = new Date().Format("yyyyMMdd");
            if(businesscode1==0){
                businesscode1="";
            }
            if(beginDate!=""&&endDate!=""){
                var beginDate1 = parseInt(beginDate.split('-').join(''));
                var endDate1 = parseInt(endDate.split('-').join(''));
                historyTrading(beginDate1,endDate1,businesscode1,1,20);
            }else{
                historyTrading(20000101,enddate3,businesscode1,1,20);
            }





        });



    }






});


//获取组合基金内容
function historyTrading(begindate,enddate,businesscode,page,rows){
    $('#trade_history table thead').html("");
    if(businesscode==22){
        var ma_content_t = '<tr><th>基金名称/代码</th><th>交易时间</th><th>交易金额（元）</th><th>手续费（元）</th><th>支付方式（尾号）</th><th>交易状态</th></tr>';
        $('#trade_history table thead').append(ma_content_t);
    }else if(businesscode==20){
        var ma_content_t = '<tr><th>基金名称/代码</th><th>交易时间</th><th>交易金额（元）</th><th>手续费（元）</th><th>支付方式（尾号）</th><th>交易状态</th></tr>';
        $('#trade_history table thead').append(ma_content_t);
    }else if(businesscode==24){
        var ma_content_t = '<tr><th>基金名称/代码</th><th>交易时间</th><th>交易份额（份）</th><th>手续费（元）</th><th>支付方式（尾号）</th><th>交易状态</th></tr>';
        $('#trade_history table thead').append(ma_content_t);
    }else if(businesscode==36){
        var ma_content_t = '<tr><th>基金名称/代码</th><th>交易时间</th><th>交易份额（份）</th><th>手续费（元）</th><th>转入基金名称/代码</th><th>交易状态</th></tr>';
        $('#trade_history table thead').append(ma_content_t);
    }else if(businesscode==39){
        var ma_content_t = '<tr><th>基金名称/代码</th><th>交易时间</th><th>定投金额（元）</th><th>手续费（元）</th><th>支付方式（尾号）</th><th>交易状态</th></tr>';
        $('#trade_history table thead').append(ma_content_t);
    }else if(businesscode==29){
        var ma_content_t = '<tr><th>基金名称/代码</th><th>交易时间</th><th>修改前</th><th>修改后</th><th>交易状态</th></tr>';
        $('#trade_history table thead').append(ma_content_t);
    }else if(businesscode==43){
        var ma_content_t = '<tr><th>基金名称/代码</th><th>权益登记日</th><th>金额（元）</th><th>份额（份）</th><th>分红发放日</th><th>交易状态</th></tr>';
        $('#trade_history table thead').append(ma_content_t);
    }

    var params = {
        "startDate" : begindate,
        "endDate" : enddate,
        "businessCode" : businesscode,
        "page" : page,
        "rows" : rows
    };
    $.ajax({
        url: mainUrl + "singleTradeInfoAllQuery",
        data: params,
        dataType: "JSON",
        success: function (data) {
            //console.log(data);
            $('#trade_history table tbody').html("");
            if (data.retcode == 0000){
                //hideloading();
                if(data.data.length==0){
                    var ma_content = '<tr><td colspan="6"><span class="none_tishi">您还没有交易记录!</span><a class="none_tobuy" href="../fund/fund_all.html">立即购买</a></td></tr>';
                    $('#trade_history table tbody').append(ma_content);
                }else{
                    $(data.data).each(function (index, ele) {
                        //基金名称
                        var fundname = ele.fundname;
                        if(fundname !=undefined && (fundname != null || fundname != "")){
                            if(fundname.length>13){
                                fundname = fundname.substring(0,13)+'...';
                            }
                        }else{
                            fundname = '';
                        }

                        //基金代码
                        var fundcode = ele.fundcode;
                        var fundcode1 = fundcode.substring(0,6);

                        //确认时间
                        if(ele.transactioncfmdate != undefined && (ele.transactioncfmdate != null || ele.transactioncfmdate != "")) {
                            var transactioncfmdate = formattedDateFilter(ele.transactioncfmdate);
                        }else{
                            var transactioncfmdate = '';
                        }

                        //交易金额
                        /*if(ele.confirmedamount != undefined && (ele.confirmedamount != null || ele.confirmedamount != "") &&  ele.confirmedamount != "0.00"){
                            var tradeValue = formatCurrency(ele.confirmedamount);
                            var tradeValue1 = '元';
                        }else if(ele.confirmedvol != undefined &&(ele.confirmedvol != null || ele.confirmedvol != "") && ele.confirmedvol != "0.00"){
                            var tradeValue = formatCurrency(ele.confirmedvol);
                            var tradeValue1 = '份';

                        }else if(ele.applicationamount != undefined && (ele.applicationamount != null || ele.applicationamount != "") && ele.applicationamount != "0.00"){
                            var tradeValue = formatCurrency(ele.applicationamount);
                            var tradeValue1 = '元';

                        }else if(ele.applicationvol != undefined && (ele.applicationvol != null || ele.applicationvol != "") && ele.applicationvol != "0.00"){
                            var tradeValue = formatCurrency(ele.applicationvol);
                            var tradeValue1 = '份';
                        }else{
                            var tradeValue = "";
                            var tradeValue1 = "";
                        }*/

                        //交易手续费
                        if(ele.charge != undefined && (ele.charge != null || ele.charge != "")){
                            var charge= formatCurrency(ele.charge);
                        }else{
                            var charge= "0.00";
                        }


                        //交易银卡卡尾号
                        if(ele.depositacct != undefined && (ele.depositacct != null || ele.depositacct != "")){
                            var depositacct=ele.depositacct.substring(ele.depositacct.length-4,ele.depositacct.length);//保留最后四位
                        }else{
                            var depositacct="";//保留最后四位
                        }

                        //交易银行
                        if(ele.bankname != undefined && (ele.bankname != null || ele.bankname != "")){
                            var bankname=ele.bankname.split("银行")[0];
                            var bankname1=bankname.substring(bankname.length-2,bankname.length)+"银行";
                        }else{
                            var bankname1="";
                        }
                        var status=ele.status;
                        if(status==08){
                            var statusname="已结束";
                        }

                        if(ele.businesscode==22){
                            var confirmedamount = formatCurrency(ele.confirmedamount);
                            var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+confirmedamount+'</td><td>'+charge+'</td><td>'+bankname1+depositacct+'</td><td>'+statusname+'</td>';
                            $('#trade_history table tbody').append(ma_content);
                        }else if(ele.businesscode==20){
                            var confirmedamount = formatCurrency(ele.confirmedamount);
                            var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+confirmedamount+'</td><td>'+charge+'</td><td>'+bankname1+depositacct+'</td><td>'+statusname+'</td>';
                            $('#trade_history table tbody').append(ma_content);
                        }else if(ele.businesscode==24){
                            var confirmedamount = formatCurrency(ele.confirmedamount);
                            var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+confirmedamount+'</td><td>'+charge+'</td><td>'+bankname1+depositacct+'</td><td>'+statusname+'</td>';
                            $('#trade_history table tbody').append(ma_content);
                        }else if(ele.businesscode==36){
                            var confirmedvol = formatCurrency(ele.confirmedvol);
                            var targetfundcode = ele.targetfundcode;
                            var targetfundname = ele.targetfundname;
                            if(targetfundname==undefined){
                                targetfundname="";
                            }
                            var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+confirmedvol+'</td><td>'+charge+'</td><td>'+targetfundname+'<br><span class="font12hui9">'+targetfundcode+'</span></td><td>'+statusname+'</td>';
                            $('#trade_history table tbody').append(ma_content);
                        }else if(ele.businesscode==39){
                            var confirmedamount = formatCurrency(ele.confirmedamount);
                            var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+confirmedamount+'</td><td>'+charge+'</td><td>'+bankname1+depositacct+'</td><td>'+statusname+'</td>';
                            $('#trade_history table tbody').append(ma_content);
                        }else if(ele.businesscode==29){
                            var defdividendmethod=ele.defdividendmethod;
                            if(defdividendmethod==0){
                                var defdividendmethodname="红利再投资";
                                var defdividendmethodname1="现金分红";
                            }else if(defdividendmethod==1){
                                var defdividendmethodname="现金分红"
                                var defdividendmethodname1="红利再投资";
                            }
                            var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+defdividendmethodname1+'</td><td>'+defdividendmethodname+'</td><td>'+statusname+'</td>';
                            $('#trade_history table tbody').append(ma_content);
                        }else if(ele.businesscode==43){
                            if(ele.confirmedamount != undefined && (ele.confirmedamount != null || ele.confirmedamount != "") &&  ele.confirmedamount != "0.00"){
                                var confirmedamount = formatCurrency(ele.confirmedamount);
                            }else{
                                var confirmedamount = "";
                            }
                            if(ele.confirmedvol != undefined &&(ele.confirmedvol != null || ele.confirmedvol != "") && ele.confirmedvol != "0.00"){
                                var confirmedvol = formatCurrency(ele.confirmedvol);
                            }else{
                                var confirmedvol = "";
                            }
                            var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+confirmedamount+'</td><td>'+confirmedvol+'</td><td>'+transactioncfmdate+'</td><td>'+statusname+'</td>';
                            $('#trade_history table tbody').append(ma_content);
                        }

                        //业务名称
                        /*var businesscode=translateBusinessCode(ele.businesscode);
                        var ma_content = '<tr><td>'+fundname+'<br><span class="font12hui9">'+fundcode1+'</span></td><td>'+transactioncfmdate+'</td><td>'+tradeValue+tradeValue1+'</td><td>'+charge+'</td><td>'+bankname1+depositacct+'</td><td>'+businesscode+'</td>';
                        $('#trade_history table tbody').append(ma_content);*/
                    });


                    //总条数
                    var totalRecord=parseFloat(data.totalAccount);
                    //计算分页总页数算法
                    var totalPages1=totalRecord % rows == 0 ? totalRecord / rows : totalRecord / rows + 1 ;
                    //console.log(totalPages1);
                    //var pageNum1=pageNum+1;

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
                            historyTrading(begindate,enddate,businesscode,page,rows)
                        },



                    }
                }
                var element=$("#sample_2_paginate");
                element.bootstrapPaginator(options);

            }else{
                /*var ma_content = '<tr><td colspan="6"><span class="none_tishi">'+data.retmsg+'</span><a class="none_tobuy" href="#">'+data.retcode+'</a></td></tr>';
                $('#trade_history table tbody').append(ma_content);*/
                setErrorMsg(data.retcode,data.retmsg);
            }
        }
    });
}

//交易类型
function translateBusinessCode(keyword){
    var dictionary = {"20": "认购","22":"申购", "24":"赎回", "36":"转换","39":"定投", "29":"修改分红方式", "60":"定投设置","43":"分红"};
    return dictionary[keyword];
};

//支付状态
function translatePayStatus(keyword){
    var dictionary = {
        "00":"未支付",
        "01":"委托正在处理",
        "02":"支付成功",
        "03":"支付失败",
        "04":"正报",
        "05":"对账待处理",
        "06":"支付可疑",
        "07":"托收成功",
        "08":"支付成功，确认失败或撤单成功"
    }
    return dictionary[keyword]
};

//交易状态
function translateStatus(keyword){
    var dictionary = {
        "00":"待复核",
        "01":"未勾对",
        "02":"未报",
        "03":"待撤",
        "04":"废单",
        "05":"已撤",
        "06":"已报",
        "07":"已确认",
        "08":"已结束"
    }
    return dictionary[keyword]
};

//格式化日期
function formattedDateFilter( obj ) {
    if( obj && /^(\d{4})(\d{2})(\d{2})$/.test(obj) ) {
        var groups = obj.match(/^(\d{4})(\d{2})(\d{2})$/);
        return groups[1] + '-' + groups[2] + '-' + groups[3];
    } else {
        return obj;
    }

};
