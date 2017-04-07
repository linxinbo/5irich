/**
 * Created by linxi on 2016/12/19.
 */
$(document).ready(function () {
    var args = new getArgs();
    var fundname = args.fundname;
    var fundcode = args.fundcode;
    var amount = args.amount;
    var fukuan = args.fukuan;
    var cycle1 = args.cycle1;
    var investday = args.investday;
    $(".fundname").html(fundname);
    $(".fundcode").html(fundcode);
    $(".amount").html(amount+"元");
    $(".fukuan").html(fukuan);
    $(".cycle1").html(zhuandate(cycle1,investday));
    //$(".investday").html(zhuandate(cycle1,investday));
});

function zhuandate(cycle1,investday){
    var cycle2;
    var investday2;
    if(cycle1==0){
        cycle2="每月/";
        investday2=investday+"号";
        return cycle2+investday2
    }else if(cycle1==1){
        cycle2="每周/";
        investday2="周"+investday;
        return cycle2+investday2
    }
    else if(cycle1==2){
        cycle2="双周/";
        investday2="周"+investday;
        return cycle2+investday2
    }
}