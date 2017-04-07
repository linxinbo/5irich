/**
 * Created by d on 2016/6/9.
 */
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
                $(".my_order_data").empty();
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
                    var order_data = '<div class="mtopdd">';
                    order_data += '<div class="order_head"><span class="order_name">'+order_name+'</span><i class="t_xia"></i></div>';
                    order_data += '<ul class="order_data">';
                    order_data += '<li><span>预约金额</span></li><li><span>'+money+'</span></li><li><span>预约时间</span></li><li><span>'+time_1+'&nbsp;'+time_2+'</span></li><li class="td_1"><span>姓名</span></li><li class="td_1"><span>'+n.name+'</span></li><li class="td_2"><span>预约手机号</span></li><li class="td_2"><span>'+phone+'</span></li><li class="td_3"><span>身份证号</span></li><li class="td_3"><span>'+ID_num+'</span></li>';
                    order_data += '<li class="td_1"><span>处理状态</span></li>';
                    order_data += '<li class="dispose '+deal_status+'"><span></span></li>';
                    order_data += '</ul></div>';
                    $(".my_order_data").append(order_data);
                });
            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        }
    });
});