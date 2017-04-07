/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    var fundcode = args.fundcode;
    var amount = args.amount;
    $(".fundname").html(fundname);
    $(".fundcode").html(fundcode);
    $(".amount").html(amount+"元");
});