/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundgroupname = args.fundgroupname;
    var fundgroupcode = args.fundgroupcode;
    //var money = args.money;
    $(".fundgroupname").html(fundgroupname);
    $(".fundgroupcode").html(fundgroupcode);
    //$(".money").html(money+"元");
});