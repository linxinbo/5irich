
var moneyList = {
    RiId:"",
    ChoiceYear: "",
    MoneyMonth: "",
    LossValue: ""
};
//var mainUrl="http://localhost:8080/Wirich2.0/";
// var dom=document.querySelector("[name=username]");
// var btn=document.querySelector("#sub");
// dom.addEventListener("input",function(e){
//   if(this.value.trim().length){
//     btn.removeAttribute("disabled");
//   }else{
//     btn.disabled="disabled";
//   }
// },false);
//jquery version
$(function(){    
    //判断提交按钮可用    
    //判断提交按钮可用
    $("#sub").click(function () {
    	getRegularList();
    	console.log(moneyList.RiId);
    	console.log(moneyList.ChoiceYear);
    	console.log(moneyList.LossValue);
    	console.log(moneyList.MoneyMonth);
        if (moneyList.RiId == "" || moneyList.ChoiceYear == "" || moneyList.LossValue == "" || moneyList.MoneyMonth == "") {
            showAlert("问卷调查没有完成！");
            return;
        } else {
            answer=moneyList.RiId+"_"+moneyList.ChoiceYear+"_"+moneyList.LossValue+"_"+moneyList.MoneyMonth;
            console.log(answer);
            getRegular();
        }
    });


})

function getRegular() {
    console.log(answer);
    $.ajax({
        url: mainUrl + "intellAutoCalculateInvestGruop",
        data: {
            "invest_group_info": answer,//i.m.result
            //"group_answer": "1D_2D_3B"//i.m.result
        },
        dataType: "JSON",
        success: function (data) {
            if(data.retcode==0000||data.retcode=="0000"){
                var regularCode=data.data.group_info.fdGroupCode;
                //showAlert("感谢您的支持!"+groupCode.substring(5,6));
                window.location.href="../investment/investment.html?group_code="+regularCode+"&answer="+answer;
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
function getRegularList() {
    moneyList.RiId=$("#RiId").val();
    moneyList.ChoiceYear=$(".year").val();
    moneyList.MoneyMonth=$(".monthmoney").val();
    moneyList.LossValue=$(".loss").val();
}
/*
/*
function myCheck()
{
    for(var i=0;i<document.form1.elements.length-1;i++)
    {
        if(document.form1.elements[i].value=="")
        {
            //alert("当前表单不能有空项");
            //一进入页面将光标定位到第一个input
            document.form1.elements[i].focus();
            return false;
        }
    }
   return true;


}
*/
