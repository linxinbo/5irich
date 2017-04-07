/**
 * Created by dell on 2016/11/24.
 */
$(document).ready(function(){

    var promise1=new Promise(function(resolve,reject){
        getgrouplist("风险偏好型","groupcon1","jinqu","积极");
        resolve("success");
        return promise1;
    });
    var promise2=new Promise(function(resolve,reject){
        getgrouplist("稳健平衡型","groupcon2","wenjian","平衡");
        resolve("success");
        return promise2;
    });
    var promise3=new Promise(function(resolve,reject){
        getgrouplist("长期稳健型","groupcon3","changqi","稳健");
        resolve("success");
        return promise3;
    });

    Promise.all([promise1,promise2,promise3]).then(function(resolve,reject){


    })
       function getgrouplist(fdType,boxname,picname,describe){
           $.ajax({
               type:"get",
               url: mainUrl+"WebQueryGroupListAction",
               data:{
                   "fdType" : fdType,
                   "page" :1,
                   "pageRecorders" : 3
               },
               dataType: "JSON",
               success:function(data){
                   if (data.retcode == 0000){
                       $(data.data.list).each(function(i,n){
                           var yearratio=Number(n.fdReturnYearRatio).toFixed(2);
                           var groupname= n.fdGroupName;
                           var groupcode= n.fdGroupCode;
                           var imgname=picname+ (i+1).toString();
                           var imgurl="../images/grouprecomm/"+imgname+".png";
                           var ul=$("<ul class='jinqu1'></ul>");

                           var li1=$("<li><img src="+imgurl+" > <span>创金"+describe+"组合<br>"+(i+1)+"号</span> <div class='mb'></div></li>");
                           var li2=$("<li class='jinquli1'>"+yearratio+"%</li>");
                           var li3=$("<li class='jinquli2'>成立以来收益</li>");
                           var li4=$("<li class='jinquli3'>起投金额：<i>1万元</i></li>");
                           var li5=$("<li class='jinquli4' groupname="+groupname+" groupcode="+groupcode+"><button class='btn'>立即购买</button></li>");
                           ul.append(li1,li2,li3,li4,li5);
                           $("."+boxname).append(ul);
                           $(".jinqu1 .mb").off("mouseover").on("mouseover",function(){
                               $(this).siblings("img").css({transform:"scale(1.3)"});

                           });
                           $(".jinqu1 .mb").off("mouseout").on("mouseout",function(){
                               $(this).siblings("img").css({transform:"scale(1)"});
                           });

                       })
                   }else {
                       setErrorMsg(data.retcode);
                   }

               },
               error: function (data) {

                   alert("服务器错误！");
               }

           })
       }

})