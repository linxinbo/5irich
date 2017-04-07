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
        var travelTime = args.travelTime;
        var cycle = args.cycle;

        var now = new Date();
        var year = now.getFullYear();    //获取完整的年份(4位,1970-????)
        var month = now.getMonth()+1;//获取当前月份(0-11,0代表1月)
        var day = now.getDate();//获取当前日(1-31)
        var date1=year+"-"+p(month)+"-"+p(cycle);
        console.log(date1);
        if(parseFloat(day)>parseFloat(cycle)){
            console.log(11);
            var date2=getNextMonth(date1);
        }else{
            var date2=date1;
        }
        console.log(date2);
        var date3=getNextMonth(date2);
        /*getMonths(date1 , date2)*/

        //插入旅行计划名称和人数
        $(".nextM").html(date2+" 第一次存钱");
        $(".nextnextM").html(date3+" 第二次存钱");
        $(".Realization").html(travelTime+" 目标实现！");



    };

    function p(s) {
        return s < 10 ? '0' + s: s;
    }

    function getNextMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }

});