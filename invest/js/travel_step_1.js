/**
 * Created by linxi on 2017/3/23.
 */
$(function(){
    var isopen = $.cookie("isopen");
    var username = $.cookie("username");
    //引导用户登录开户
    if(username == "" || username == null || username == undefined|| username == "null") {
        window.location.href = "login.html";
    }else if(isopen != 1) {
        window.location.href = "account.html";
    }else{
        var args = new getArgs();
        var destName = args.destName;
        var destMunber = args.destMunber;
        //切换人数
        $(".t_f_munber a").click(function(){
            $(this).siblings().removeClass('sele').end().addClass('sele');
        });
        //插入旅行目的地信息
        var destName1=destName+'豪华7日游';
        $(".travel_dest").html(destName1);
        //插入旅行金额
        $(".travel_read span").html(destMunber);

        //点击下一步
        $(".btn_next_travel").click(function(){
            var travelTime=$("#demo2").html();
            var travelNum=$(".t_f_munber a.sele").attr("data-id");
            if(travelTime=="请选择出游的具体时间"){
                showAlertApp("请选择旅行时间");
                return false;
            }
            if(travelNum==""||travelNum==undefined){
                showAlertApp("请选择旅行人数");
                return false;
            }
            window.location.href = "travel_step_2.html?destName=" + destName1 + "&destMunber=" + destMunber+"&travelTime="+travelTime+"&travelNum="+travelNum;
        });

    };



});