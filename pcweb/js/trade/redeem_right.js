/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    var redeemshare = args.redeemshare;
    //var amount = args.amount;
    $(".fundname").html(fundname);
    $(".redeemshare").html(redeemshare);
    //$(".amount").html(amount+"元");
});