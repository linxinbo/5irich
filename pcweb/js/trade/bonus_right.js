/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    var fundcode = args.fundcode;
    var dividendmethodname = args.dividendmethodname;
    var newdividendmethodname = args.newdividendmethodname;
    var appsheetserialno = args.appsheetserialno;
    $(".fundname").html(fundname);
    $(".fundcode").html(fundcode);
    $(".dividendmethodname").html(dividendmethodname);
    $(".newdividendmethodname").html(newdividendmethodname);
    $(".appsheetserialno").html(appsheetserialno);
});