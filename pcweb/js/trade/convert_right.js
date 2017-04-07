/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    var targetfundname = args.targetfundname;
    var convertshare = args.convertshare;
    $(".fundname").html(fundname);
    $(".targetfundname").html(targetfundname);
    $(".convertshare").html(convertshare+"份");
});