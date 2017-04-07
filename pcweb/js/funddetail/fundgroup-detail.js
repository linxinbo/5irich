/**
 * Created by dell on 2016/12/19.
 */
$(document).ready(function(){
    var args = new getArgs();
    var fundid = args.fundid;
    ziliao("CJ1001")
    function ziliao(fundid){
        $.ajax({
            type:"get",
            url:mainUrl+"WebQueryGroupDetialAction",
            dataType:"json",
            data:{
                groupId:fundid
            },
            success:function(data){
                  var sinceFoundGracet=data.data.sinceFoundGracet;
                  if(sinceFoundGracet<0){
                      $(".allshouyi").addClass("fontgreen");
                  }else{
                      $(".allshouyi").addClass("fontred");
                  }
                  $(".allshouyi").html(sinceFoundGracet);
                  var jingzhi=data.data.fdGroupValue;
                  var day=data.data.amountOfIncreaseAndDecrease;
                if(day<0){
                    $(".day").addClass("fontgreen");
                }else{
                    $(".day").addClass("fontred");
                    day="+"+day;
                }
                $(".day").html(day);
                var update="("+gettime(data.data.priceDt)+")";
                $(".update").html(update);
                var chengli=gettime(data.data.createTime);
                $(".jingzhi").html(jingzhi);
                $(".chengli").html(chengli);
                var yeji=data.data.fdGroupBenchMark;
                $(".yeji").html(yeji);
            }
        })
    }

    $(".buy").click(function(){
        if(Number($(".text").val())<1000){
             $(".tishi").css({display:"block"})
        }
    })
    $(".text").focus(function(){
        $(".tishi").css({display:"none"})
    })
})
function zhuanhuan(string){
    var string1=Number(string).toFixed(2)+"%";
    return string1;
}  //数值保留两位小数并加%
function gettime(time){

    if(time==null||time.length!==8){
        return "";
    }else{
        var yyyy = time.substring(0,4);
        var mm = time.substring(4,6);
        var dd = time.substring(6,8);
        if(mm.substring(0,1) == 0){
            mm = mm.substring(1,2);
        }
        if(dd.substring(0,1) == 0){
            dd = dd.substring(1,2);
        }
        return yyyy + "-" + mm + "-" + dd ;
    }
}   //日期截取