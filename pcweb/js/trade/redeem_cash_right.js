/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    var redeemshare = args.redeemshare;
    //var amount = args.amount;
    $(".fundname").html("现金宝");
    $(".redeemshare").html(redeemshare+"元");
    //$(".amount").html(amount+"元");
});