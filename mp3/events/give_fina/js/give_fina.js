var username = $.cookie("username");
var newurl = document.referrer;
var isopen = $.cookie("isopen");
    $(function(){
        //active msg
        $('.gf_actMsg').off('click').on('click',function(){
            $('.gf_layer').css({
                'top':$(window).height()
            }).show();
            $('.gf_layer').animate({'top':0},500);
            $('.gf_layCon').css('top',$(window).height()).show();
            $('.gf_layCon').animate({'top':'20%'},500);
        });
        $('.lay_close').off('click').on('click',function(){
            $('.gf_layer').animate({'top':$(window).height()},500,function(){
                $(this).hide();
            });
            $('.gf_layCon').animate({'top':$(window).height()},500,function(){
                $(this).hide();
            });
        });
        $('#gf_bugfund').off("click").on('click',function (e) {
            var fundid ='000662';
            var fundname ='银华活钱宝F';
            e.stopPropagation();
            buyStep1(fundid,fundname);
        });
        


            if (username == "" || username == null || username == undefined	|| username == "null") {
                showAlert("您没有登录！",goMoniLogin);
                return;
            }else if (isopen != 1) {
                    //			        showAlert("暂缓开通，敬请期待！");
                showAlert("您还未开户！，请开户后进行相关操作",goisopen);
                return;
            } else {
            	
            	$.ajax({
            		type: "GET",
            		url: mainUrl + "getUserInfo",
            		data: "",
            		dataType: "JSON",
            		success: function (response) {
            			console.log(response);
            			if (response.retcode == 0) {
            				$('#gf_joinAct').off("click").on('click',function (e) {
            		        	moni_CJ();
            		        });
            			}else if(response.retcode == 1){
            				$('#gf_before').hide();
            				$('#gf_after').show();
                            moni_group_show();
            			}
            		},
            		error: function (response1) {
            			showAlert("服务器错误！");
            		}
            	});
            }     
        });

        function moni_CJ(){
                if (username == "" || username == null || username == undefined	|| username == "null") {
                    showAlert("您没有登录！",goMoniLogin);
                }else{
                    if (isopen != 1) {
                        //			        showAlert("暂缓开通，敬请期待！");
                        showAlert("您还未开户！，请开户后进行相关操作",goisopen);
                    } else {
                        /*window.location.href = "../sigin/change_deal.html";*/

                        $.ajax({
                            type: "GET",
                            url: mainUrl + "joinActivity",
                            data: "",
                            dataType: "JSON",
                            success: function (data) {
                            	console.log(data);
                                if (data.retcode == "0000" && data.retmsg == "申购金额小于500") {
                                    showAlert("当您的申购金额大于500时，您将获得参加活动名额！");
                                
                                } else if(data.retcode == "0000" && data.retmsg == "保存成功"){
                                	
                                    showAlert("您已成功参加活动！",gomonihome);
                                    
                                } else {
                                	showAlert("您未购买基金！");
                                } 
                            },
                            error: function (data) {
                                showAlert("服务器错误！");
                            }
                        });
                    }
                }
        }

        function moni_group_show(){
            $.ajax({
                type: "GET",
                url: mainUrl + "getUserInfo",
                data: "",
                dataType: "JSON",
                success: function (data) {
                    console.log(data);
                    if(data.data){
                        var activity_todayincome=data.data.activity_todayincome;
                        var activity_totalincome=data.data.activity_totalincome;
                        var activity_nowvalue=data.data.activity_nowvalue;
                        $(".ztsy").html("");
                        $(".ljsy").html("");
                        $(".zcb").html("");
                        $(".ztsy").append(activity_todayincome+"元");
                        $(".ljsy").append(activity_totalincome+"元");
                        $(".zcb").append(activity_nowvalue+"元");
                    }
                },
                error: function (data) {
                    showAlert("服务器错误！");
                }
            });
        
        
        }

        function goMoniLogin(){
            window.location.href = mainUrl+"mp/login.html";
        }

        function goMoniIndex(){
            window.location.href = mainUrl+"mp/home.html";
        }

        function goisopen(){
            window.location.href = mainUrl+"mp/account/account.html";
        }

        function gomonihome(){
            window.location.href = mainUrl+"mp/events/give_fina/give_fina.html";
        }

