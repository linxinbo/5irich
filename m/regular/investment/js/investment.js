/**
 * Created by znn on 2016/3/5.
 */
//var mainUrl="http://localhost:8080/Wirich2.0/";
var args = new getArgs();
var ZN_groupCode = args.group_code;
var answer=args.answer;
var arr=answer.split("_");
/*for(var k=0;k<arr.length;k++){		
}*/
//页面显示并处理传输过来的数据
var RiId=arr[0];	
var ChoiceYear=arr[1];
if(RiId=="RiId05"){
	var LossMoney=arr[2];
	var MoneyMonth=arr[3];
	var MoneyTotal="";
	var MoneyNow="";
}else{
	var LossMoney=arr[5];
	var MoneyMonth=arr[4];
	var MoneyTotal=arr[2];
	var MoneyNow=arr[3];		
}
if(RiId=="RiId04"){
	var ChoiceYear=MoneyTotal-ChoiceYear;
}    
var riPlan="每月投入"+MoneyMonth+"元<br />连续投入"+ChoiceYear+"年<br />预计到期本息:";
/*if(RiId=="RiId05"){
	var riPlanz=MoneyMonth*(ChoiceYear*12)+"元";
}else{
	var riPlanz=(MoneyMonth*(ChoiceYear*12))+MoneyNow*10000+"元";
}*/
console.log(RiId);
var riPlany=ChoiceYear+"年";
var riPlanm=MoneyMonth+"元";
$("#riPlan").append(riPlan);
$("#riPlany").append(riPlany);
$("#riPlanm").append(riPlanm);
$(document).ready(function () {		
	//页面显示并处理传输过来的数据
	//请求数据
	getRegular();
	/*$.getJSON("data/Intelligent.json",function(data){  
        var $jsontip = $("#jsonTip");        
        $jsontip.empty();//清空内容  
        $.each(data,function(infoIndex,info){        	  
              if(info.retcode==ZN_groupCode){
            	  console.log(info.data);
            	  var riPlanp=info.data[1].pjnsy;
            	  console.log(info.data.length);
            	  var j=info.data.length-1;
            	  var riPlanzj=info.data[j].reason;            	  
                  $("#riPlanp").append(riPlanp);
                  $("#riPlanzj").append(riPlanzj);
            	  for(var k=0;k<info.data.length;k++){
            		  if(info.data[k].product_id==1 || info.data[k].product_id=="1"){
            		  var strHtml="";
            		  var m=k-2;
                      strHtml += "<div class='tr tr"+m+"'><i></i><span>"+info.data[k].jjmc+"("+info.data[k].fundcode+")"+"</span>";  
                      strHtml += "<p>"+info.data[k].fundratio+"</p><div class='clear'></div>";
                      $jsontip.after(strHtml);
                      //显示处理后的数据 
                      
              }}}
            })  
        
        })*/
	
	
});
function getRegular() {
    console.log(answer);
    var $jsontip = $("#jsonTip");        
    $jsontip.empty();//清空内容     
    $.ajax({
        url: mainUrl + "intellAutoCalculateInvestGruop",
        data: {
            "invest_group_info": answer,//i.m.result
            //"group_answer": "1D_2D_3B"//i.m.result
        },
        dataType: "JSON",
        success: function (data) {
            if(data.retcode==0000||data.retcode=="0000"){
              var riPlanpp=data.data.group_info.fdReturnYearRatio*100;
              var riPlanppw=riPlanpp.toFixed(2)+"%";
              console.log(riPlanpp);
              lilv=data.data.group_info.fdReturnYearRatio;             
              var riPlanzj=data.data.group_info.fdGroupPriorityDesc;
              $("#riPlanpp").append(riPlanppw);
              $("#riPlanzj").append(riPlanzj);
              //计算预计到期本息
              var v=lilv;//年利率
              var zlv=lilv/12;//周期利率
              var mm=MoneyMonth;//每个投入金额
              var y=ChoiceYear;//连续投资年限
              var zz=mm*(1+zlv)*(Math.pow((1+zlv),y*12)-1)/(zlv);
              //固定每月投入金额年限的利率计算
              var cc=MoneyNow*10000;//固定每月投入金额的本金
              var yy=((1+v)*Math.pow((1+zlv),y))*cc;//初始投资的利率+本金
              //console.log(yy)
              if(RiId=="RiId05"){
                  var tt=zz+cc;
              }else{
            	  var tt=zz+cc+yy;
              }
              //截取小数点后两位              
              $("#riPlanz").append(tt.toFixed(2));//截取小数点后两位
              //计算预计到期本息              
            	for(var i=0;i<data.data.group_fund.length;i++){
            		var strHtml="";
          		    var m=i+1;
          		    console.log(m);
                    strHtml += "<div class='tr tr"+m+"'><i></i><span>"+data.data.group_fund[i].fundName+"("+data.data.group_fund[i].fundId+")"+"</span>";  
                    strHtml += "<p>"+data.data.group_fund[i].fdProportional+"</p><div class='clear'></div>";
                    $jsontip.before(strHtml);       		
            	}               
            }else{
                setErrorMsg(data.retcode,data.retmsg);
            }

        },
        error:function(){
            //hideloading();
            alert("服务器错误");
        }
    });
};

