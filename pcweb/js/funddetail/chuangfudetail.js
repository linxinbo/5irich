/**
 * Created by dell on 2016/12/23.
 */
    $(document).ready(function(){
        var args=new getArgs();
        var name=args.name;
        var day=args.day;
        var rate=args.rate;
        var money=args.money;
        $(".name").html("创富宝——"+name);
        $(".des li:nth-of-type(1) span").html(rate+"%");
        $(".des li:nth-of-type(2) span").html(money+"万");
        $(".des li:nth-of-type(3) span").html(day+"天");
        $(".con2 button").click(function(){


            var moneyin=$(this).siblings().val();
            var biaozhun=Number(money+"0000");

           if(Number(moneyin)<biaozhun){
              showAlert("您输入的金额小于起投金额");
              return;
          }else{
              //跳转
               alert("success")
          }
        })
        $('.con2 input').bind('input propertychange', function() {
                var reg = new RegExp("^[0-9]*$");
                var moneyin=$(this).val();
                var biaozhun=Number(money+"0000");
              if(!reg.test(moneyin)){
                   showAlert("您输入的金额不合法");
                  return;
              }else {
                  var shouyi=Number(moneyin)*Number(day)*Number(rate)/100/365;
                  $(".shouyi").html(shouyi.toFixed(2));

              }
        });
    })

