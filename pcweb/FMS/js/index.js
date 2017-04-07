/**
 * Created by linxi on 2016/11/28.
 */
var load=true;
$(function () {
    //riskParity();
    /*if(load){
        selectFOF('创金FOF1号');
    }*/
    var args = new getArgs();
    var fofname = args.fofname;
    if(fofname=="创金FOF1号"||fofname==undefined){
        $('.fms_title_center a').siblings().removeClass("select").end().eq(0).addClass("select");
    }else{
        $('.fms_title_center a').siblings().removeClass("select").end().eq(1).addClass("select");
    }
    $('.fms_title_center a').click(function(){
        $(this).siblings().removeClass("select").end().addClass("select");
        var FOFName=$(".fms_title_center a.select").attr("data-name");
        selectFOF(FOFName);
    });

    $("#peizhi").attr("href",'index.html?fofname='+fofname);
    $("#wave").attr("href",'wave.html?fofname='+fofname);

});

function selectFOF(val){
    var params = {
        "fofname" : val
    };
    $.ajax({
        url : mainUrl + "selectfof",
        data : params,
        dataType : "JSON",
        success : function(response) {
            if(response.retcode=="0000"||response.retcode==0000){
                load=false;
                window.location.href = "index.html?fofname="+val;
            }
        }
    });
};



function riskParityColor() {
    var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;
    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
};


//--------------------------------------------
var getArgs = function () //作用是获取当前网页的查询条件
{
    var args = new Object(); //声明一个空对象
    var query = window.location.search.substring(1); // 取查询字符串，如从http://www.snowpeak.org/testjs.htm?a1=v1&a2=&a3=v3#anchor 中截出 a1=v1&a2=&a3=v3。
    var pairs = query.split("&"); // 以 & 符分开成数组
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); // 查找 "name=value" 对
        if (pos == -1) continue; // 若不成对，则跳出循环继续下一对
        var argname = pairs[i].substring(0, pos); // 取参数名
        var value = pairs[i].substring(pos + 1); // 取参数值
        value = decodeURIComponent(value); // 若需要，则解码
        args[argname] = value; // 存成对象的一个属性
    }
    return args; // 返回此对象
};
//--------------------------------------------------