/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var groupname = args.groupname;
    var groupid = args.groupid;
    var money = args.money;
    $(".groupid").html(groupname);
    $(".fundcode").html(groupid);
    $(".money").html(money+"元");
});