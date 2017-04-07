$(function(){
    
    hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "queryAppointRecord",
		data: "",
		dataType: "JSON",
		success: function (data) {
			hideloading();
			console.log(data);
			if (data.retcode == 0000) {
                $(".my_order_data ul").html("");
				$(data.data).each(function (i, n) {
                    var order_name = n.productType;
					var  moneyname ="元"
                    if(order_name==1){
                        order_name="创富宝";
                    }else{
                        return false;
                    }
                    var money = n.money;
                    if(money<1000000){
                        money = n.money;
						
                    }else{
                        money = Math.floor(n.money/10000);
						moneyname="万元"
                    }
                    var phone = n.tel.substring(0,3)+"****"+n.tel.substring(n.tel.length-2,n.tel.length);//电话
                    var ID_num = n.sn.substring(0,4)+"****"+n.sn.substring(n.sn.length-4,n.sn.length);//身份证号
                    var time_1 = n.createtime.substring(0,10);//年月日
                    var time_2 = n.createtime.substring(11,n.createtime.length);//时分秒
                    var status = n.deal_status;//处理状态
                    var deal_status;
                    if(status == 0){
                        deal_status = ""
                    }else{
                        deal_status = "deal_status";
                    }
					var order_data = '<li>'
                                        +'<div class="order_head"><span class="order_name">'+order_name+'</span><span class="order_money">预约金额:<span class="money">'+money+'</span>'+moneyname+'</span><span class="order_time">'+time_1+'<br>'+time_2+'</span></div>'
                                        +'<table class="order_data">'
                                            +'<tr><td class="td_1">姓名</td><td class="td_2">预约手机号</td><td class="td_3">身份证号</td></tr>'
                                            +'<tr><td class="td_1">'+n.name+'</td><td class="td_2">'+phone+'</td><td class="td_3">'+ID_num+'</td></tr>'
                                        +'</table>'
                                        +'<div class="dispose '+deal_status+'"></div>'
                                    +'</li>';
					$(".my_order_data ul").append(order_data);
				})
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		}
	})

})