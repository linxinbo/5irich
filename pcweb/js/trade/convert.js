/**
 * Created by linxi on 2016/12/21.
 */
var kaiguan=true;
var buyflag;
$(document).ready(function () {
    var args = new getArgs();
    var tano = args.tano;
    var fundcode = args.fundcode;
    var fundname = args.fundname;
    var per_min_24 = args.per_min_24;
    var per_max_24 = args.per_max_24;
    var availablevol = args.availablevol;
    var sharetype = args.sharetype;
    var transactionaccountid=args.fundid;
    //fundname fundcode插入页面
    $(".convertfundname").html(fundname + "(" + fundcode + ")");

    //插入页面可赎回份额
    $(".convertshare").attr("placeholder", "最多可转换" + availablevol+"份");

    //点击全部插入
    $(".shareall").click(function(){
        $(".convertshare").val(availablevol);
    });

    //查询可以转换的基金列表
    querytransferapi(tano,fundcode);



    //绑定下拉菜单事件
    $.divselect("#divselect","#inputselect");


    //提交转换
    $(".convertfund").click(function(){
        if(convertformVerify().convertformVer){
            //防止重复提交
            if(kaiguan){
                kaiguan = false;
                convertStep3();
            }
            //buyStep4();
        }else{
            showAlert("请填写完整表单！")
        }

    });


    //提交方法
    function convertStep3(){
        $(".convertfund").attr('disabled',"true");
        $(".convertfund").removeClass("purchase_submit").addClass("purchase_submit1");
        $(".convertfund").html('正在提交……');
        var convertforminfo1=convertformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "transferig",
            data: {
                "transfer.tano": tano,
                "transfer.fundcode": fundcode,
                "transfer.fundname": fundname,
                "transfer.targetfundname": convertforminfo1.targetfundname,
                "transfer.applicationamount": convertforminfo1.convertshare,
                "transfer.targetfundcode": convertforminfo1.targetfundcode,
                "transfer.transactionaccountid": transactionaccountid,
                "transfer.tpasswd": convertforminfo1.pw,
                "transfer.sharetype": "A",
                "transfer.targetsharetype": "A"/*"rateBean.businesscode": businesscode,
                 "rateBean.tano": tano,
                 "rateBean.sharetype": sharetype,
                 "revcFundListBean.first_per_min_20": first_per_min_20,
                 "revcFundListBean.first_per_max_20": first_per_max_20*/
            },
            dataType: "JSON",
            success: function (data) {
                //data = $.parseJSON(data);
                //hideloading();
                console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    //console.log(data);
                    //上传改回来的
                    kaiguan = false;
                    window.location.href = "convert_right.html?fundname=" + fundname + "&targetfundname=" + convertforminfo1.targetfundname + "&convertshare=" + convertforminfo1.convertshare + "";
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                    kaiguan = true;
                    $(".convertfund").removeAttr("disabled");
                    $(".convertfund").html('确认提交');
                    $(".convertfund").removeClass("purchase_submit1").addClass("purchase_submit");
                }
            },
            error: function (data) {
                //hideloading();
                kaiguan = true;
                $(".convertfund").removeAttr("disabled");
                $(".convertfund").html('确认提交');
                $(".convertfund").removeClass("purchase_submit1").addClass("purchase_submit");
                showAlert("请稍后重试！服务器错误");
            }
        })

    }


    //风险提示借口显示
    $(".fund_name").blur(function(){
        if(convertformVerify().convertformshare&&convertformVerify().convertformshareS&&convertformVerify().convertformshareD&&convertformVerify().convertformfundname){
            fundtransferapi(tano,fundcode,buyflag,transactionaccountid);
        }else{
            showAlert("请填写完整表单！")
        }

    });

    //风险提示借口方法
    function fundtransferapi(tano,fundcode,buyflag,transactionaccountid){
        var convertforminfo=convertformMsg();
        $.ajax({
            type: "post",
            url: mainUrl + "fundtransferapi",
            data: {
                "reference.tano": tano,
                "reference.fundcode": fundcode,
                "reference.buyflag": buyflag,
                "reference.applicationamount": convertforminfo.convertshare,
                "reference.targetfundcode": convertforminfo.targetfundcode,
                "reference.transactionaccountid": transactionaccountid
                /*"rateBean.businesscode": businesscode,
                 "rateBean.tano": tano,
                 "rateBean.sharetype": sharetype,
                 "revcFundListBean.first_per_min_20": first_per_min_20,
                 "revcFundListBean.first_per_max_20": first_per_max_20*/
            },
            dataType: "JSON",
            success: function (data) {
                //			data = $.parseJSON(data);

                //hideloading();
                console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    //console.log(data);
                    //上传改回来的
                    if(data.data.validation == "0000"){
                        if(data.data.risklevel=="1014"||data.data.risklevel==1014){
                            $(".risk").show();
                        }else{
                            $(".risk").hide();
                        }
                    }
                    //window.location.href = "buynewconfirm.html?tano=" + tano + "&sharetype=" + sharetype + "&buyflag=" + buyflag + "&fundname=" + fundname + "&fundid=" + fundid + "&businesscode=" + businesscode + "&first_per_min_20=" + first_per_min_20 + "&first_per_max_20=" + first_per_max_20 + "&bankNo=" + bankNo + "&applicationamt=" + applicationamt + "&chaniled=" + chaniled + "&transactionaccountid=" + transactionaccountid + "&moneyaccount=" + moneyaccount + "&branchcode=" + branchcode + "&pw=" + pw+ "&status=" + status;
                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                //hideloading();
                alert("请稍后重试！服务器错误");
            }
        })

    };


    //错误提示，表单验证
    $('.convertinput').on('blur',function(){
        if($(this).hasClass('fund_name')){
            if(!convertformVerify().convertformfundname){
                $(".fund_name_error1").html("请选择转换基金");
                $(".fund_name_error").show();
            }else {
                $(".fund_name_error").hide();
            }
        }
        if($(this).hasClass('convertshare')){
            if(!convertformVerify().convertformshare){
                $(".convertshare_error1").html("请输入份额");
                $(".convertshare_error").show();
            }else if(!convertformVerify().convertformshareS){
                $(".convertshare_error1").html("最低转换份额为"+per_min_24+"份");
                $(".convertshare_error").show();
            }else if(!convertformVerify().convertformshareD){
                $(".convertshare_error1").html("最高转换份额为"+per_max_24+"份");
                $(".convertshare_error").show();
            }else {
                $(".convertshare_error").hide();
            }
        }

        if($(this).hasClass('pw')){
            if(!convertformVerify().convertformpw){
                $(".password_error1").html("交易密码不能空或小于6位");
                $(".password_error").show();
            }else {
                $(".password_error").hide();
            }
        }

        if($(this).hasClass('yes')){
            if(!convertformVerify().convertformyes){
                $('.yes_error1').html('请阅读风险提示');
                $('.yes_error').show();
            }else {
                $('.yes_error').hide();
            }
        }

    });

    //验证表单数据
    function convertformVerify(){
        var verify = {};
        verify.convertformVer = true;
        verify.convertformfundcode = true;
        verify.convertformfundname = true;
        verify.convertformshare = true;
        verify.convertformshareS = true;
        verify.convertformshareD = true;
        verify.convertformpw = true;
        verify.convertformyes = true;
        var user = convertformMsg();
        //var regPhone = /^1[0-9]{10}$/;
        //var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
        var reg = new RegExp("^[0-9]*$");

        //验证输入金额数字
        if(isNaN(user.convertshare)||user.convertshare==""){
            verify.convertformshare = false;
            verify.convertformVer = false;
        }
        if(parseFloat(user.convertshare)<parseFloat(per_min_24)){
            verify.convertformshareS = false;
            verify.convertformVer = false;
        }
        if(parseFloat(user.convertshare)>parseFloat(per_max_24)){
            verify.convertformshareD = false;
            verify.convertformVer = false;
        }
        if(user.targetfundcode ==""){
            verify.convertformfundcode = false;
            verify.convertformVer = false;
        }

        if(user.targetfundname ==""){
            verify.convertformfundname = false;
            verify.convertformVer = false;
        }

        if(user.pw == "" || user.pw.length<6){
            verify.convertformpw = false;
            verify.convertformVer = false;
        }


        if(!user.yes){
            console.log(user.yes);
            verify.convertformyes = false;
            verify.convertformVer = false;
        }
        return  verify;
    }

    //获取表单内容
    function convertformMsg(){
        var convertformMsg = {};
        convertformMsg.convertshare = $(".convertshare").val();//转换份额
        convertformMsg.targetfundcode = $(".fund_name").attr("data-id");//fundid
        convertformMsg.targetfundname = $('.fund_name').val();////fundname
        convertformMsg.pw = $('.pw').val();//密码
        convertformMsg.yes = $('.yes').is(':checked');//阅读提示
        return convertformMsg;
    }








    //查询可以转换的基金列表
    function querytransferapi(tano,fundcode){
        console.log("获取可转换的基金列表！");
        //showLoading();
        $.ajax({
            type: "post",
            url: mainUrl + "querytransferapi",
            data: {
                "conversion.tano": tano,
                "conversion.fundcode": fundcode
            },
            dataType: "JSON",
            async: false,
            success: function (data) {
                //data = $.parseJSON(data);
                //hideloading();
                //console.log(data);
                if (data.retcode == 0000 || data.retcode == "0000") {
                    //查询基金列表
                    var results = [];
                    if(data.data&&data.data.length>0){
                        $(".xuanze ul").html("");
                        var fundselect="";

                        $(data.data).each(function (i, n) {
                            var targetfundcode = n.targetfundcode;
                            var fundname = n.fundname;
                            results.push({
                                name : n.fundname,
                                windcode : n.targetfundcode,
                                netValue : n.fundname+n.targetfundcode
                            });
                            fundselect +="<li data-id='" + n.targetfundcode + "'>"+n.fundname+"</li>";
                        });
                        //实时检索插件
                        $(".xuanze ul").html(fundselect);
                        $('.fund_name').typeahead({source : results,items : 10,display : 'netValue',val : 'name',netValue : 'windcode',itemSelected : displayResult});
                    }else{
                        showAlert('没有可以转换的基金',goback);

                    }

                } else {
                    setErrorMsg(data.retcode, data.retmsg);
                }
            },
            error: function (data) {
                //hideloading();
                showAlert("网络错误，请稍后重试！");
            }
        })
    }


    //搜索结果点击
    function displayResult(item, val, text, netValue) {
        $('.fund_name').attr("data-id",netValue);
        $('.fund_name').attr("data-name",val);
        console.log(item);
        console.log(val);
        console.log(text);
        console.log(netValue);
        //window.location.href = "fund-detail.html?fundid=" +netValue+ "&fundname="+val+"";
    };





});


//模拟下拉菜单
jQuery.divselect = function(divselectid,inputselectid) {
    var inputselect = $(inputselectid);
    $(divselectid+" cite").click(function(){
        var ul = $(divselectid+" ul");
        if(ul.css("display")=="none"){
            ul.slideDown("fast");
        }else{
            ul.slideUp("fast");
        }
    });
    $(divselectid+" ul li").click(function(){
        var txt = $(this).text();
        //$(divselectid+" cite").html(txt);
        var value = $(this).attr("data-id");
        inputselect.val(txt);
        inputselect.attr("data-id",value)
        $(divselectid+" ul").hide();

    });
};


function goback(){
    history.go(-1);
};