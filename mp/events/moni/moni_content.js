/**
 * Created by CJQF on 2016/8/19.
 */
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: mainUrl + "WebProportionalQueryAction",
        data: {
            groupId: "zn1002"
        },
        dataType: "json",
        success: function (data) {
            hideloading();

            console.log(data);
            var tbdata  =[];
            var wzdata1 =[];
            if (data.retcode == 0000) {
                $(".csdj_ul").html("");
                console.log(data);
                $(data.data).each(function(i,n){
                    var pie_right = '<div class="zngroup_list"><div class="zngroup_list_left"><i class="zngroup_box bgcolor'+i+'"></i></div><div class="zngroup_list_right"><h2 style="color: #ee524f">'+n.fdProportional+'%</h2><span>近一年的收益</span></div><div class="zngroup_list_center"><h2 class="fontb'+i+'">'+ n.fundName +'('+n.fundId.substring(0,6)+')</h2><span>组合占比 '+n.fdProportional+'%</span></div>';
                    //</div><div class="skillbar clearfix mtopdd" data-percent="'+ n.fdProportional+'%" data-name="'+ n.fundName+'" data-id="'+ n.fundId+'"><div class="skillbar-title"><span>'+ n.fundName +'</span></div><div class="skillbar-bar bgcolor'+i+'"></div><div class="skill-bar-percent fontb'+i+'" style="font-size: 14px;">'+n.fdProportional+'%</div></div>';
                    $(".csdj_ul").append(pie_right);
                    tbdata.push({"value":Number(n.fdProportional), "name":n.fundName});
                    wzdata1[i]= n.fundName;
                    //console.log(i);



                });
                //sconsole.log(tbdata);
                //console.log(wzdata1);
                myChart.setOption({
                    legend: {data: wzdata1},
                    series: [{data: tbdata}]//根据名字对应到相应的系列
                });

                $('.skillbar').each(function(){
                    $(this).find('.skillbar-bar').animate({
                        width:$(this).attr('data-percent')
                    },2000);
                });

                $('.skillbar').unbind("click").click(function () {
                    var fundname=$(this).attr("data-name");
                    var fundid=$(this).attr("data-id")
                    window.location.href="../fund/fund_detail.html?fundid="+fundid+"&fundname="+fundname;
                });

            } else {
                setErrorMsg(data.retcode, data.retmsg);
            }
        },
        error: function (data) {
            hideloading();
            showAlert("服务器错误！");
        }
    });


});