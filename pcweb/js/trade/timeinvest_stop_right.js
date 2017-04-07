/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    var fundcode = args.fundcode;
    var buyplanno = args.buyplanno;
    var channelname = args.channelname;
    var depositacctP = args.depositacctP;
    var firstinvestamount = args.firstinvestamount;
    var firstinvestdate = args.firstinvestdate;
    //var money = args.money;
    $(".buyplanno").html(buyplanno);
    $(".fundname").html(fundname);
    $(".fundcode").html(fundcode);
    $(".channelname").html(channelname+depositacctP);
    $(".firstinvestamount").html(firstinvestamount);
    $(".firstinvestdate").html(firstinvestdate);
    //$(".money").html(money+"元");
});