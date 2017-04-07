var args = new getArgs();
var RiId = args.RiId;
var moneyList = {RiId:"",ChoiceYear: "",MoneyTotal: "",MoneyNow: "",MoneyMonth: "",
    LossMoney:""};
//var mainUrl="http://localhost:8080/Wirich2.0/";
var askList=[  {RiId:'RiId01',
	            ask01:'打算几年后购房？',
	            ask02:'预计购房共需要多少钱？',
	            ask03:'第一笔首付金额是？',
	            ask04:'每月最多可投入多少钱？'},
	            {RiId:'RiId02',
		        ask01:'计划几年后用到这些钱？',
		        ask02:'预计共需要多少钱？',
		        ask03:'现在可以投入多少钱？',
		        ask04:'每月最多可投入多少钱？'},
		        {RiId:'RiId03',
				ask01:'计划几年后用到这些钱？',
				ask02:'预计共需要多少钱？',
				ask03:'现在可以投入多少钱？',
				ask04:'每月最多可投入多少钱？'},
		        {RiId:'RiId04',
				ask01:'我的年龄是多少岁？',
				ask02:'预计退休年龄？',
				ask03:'现在可以投入多少钱？',
				ask04:'每月最多可投入多少钱？'}
		   ];
var args = new getArgs();
var askRiId = args.RiId;
console.log(askRiId);
$("#RiId").val(askRiId);
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
    if(!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g,'');
        };
    }
    getAskList();
    //判断提交按钮可用
    $("input:not(#sub)").each(function (i) {
        $(this).on("change", function (evt) {
            var flag = true;
            var flagRadio=false;

            if($(this).prop('type')=='radio'){
                if($(this).prop('checked'))
                {
                $(this).parent().siblings().removeClass('ribtn2_2');
                $(this).parent().addClass("ribtn2_2");}
            }

            $("input:not(#sub)").each(function (j) {
                if($(this).prop('type')=='radio')
                {
                    if(!flagRadio)
                    {
                        if($(this).prop('checked'))
                        {
                            flagRadio=true;
                        }}
                }
                else if (!$(this).val().trim().length) {
                    flag = false;
                    return;
                }
            });
            if (flag&&flagRadio) {
                $("#sub").removeAttr("disabled");
                $("#sub").removeClass("ribtn1").addClass("ribtn");
            } else {
                $("#sub").prop("disabled", "disabled");
                $("#sub").removeClass("ribtn").addClass("ribtn1");
            }
        });
    });
    //判断提交按钮可用
    $("#sub").click(function () {
    	getRegularList();
    	if(moneyList.MoneyMonth<100){
        	showAlert("最少不能低于100元！");
        	return;
        }
    	if(RiId=="RiId04"){
    		if(moneyList.ChoiceYear>=moneyList.MoneyTotal){
    			showAlert("退休年龄大于年龄!");
            	return;
    		}
    		
    	}
    	if (moneyList.RiId < 0 || moneyList.ChoiceYear < 0 || moneyList.MoneyTotal < 0 || moneyList.MoneyNow < 0 || moneyList.MoneyMonth < 0 || moneyList.LossMoney <0  ) {
            showAlert("参数不能小于零！");
            return;
        } 
        if (moneyList.RiId == "" || moneyList.ChoiceYear == "" || moneyList.MoneyTotal == "" || moneyList.MoneyNow == "" || moneyList.MoneyMonth == "" || moneyList.LossMoney=="" ) {
            showAlert("问卷调查没有完成！");
            return;
        } else {
            answer=moneyList.RiId+"_"+moneyList.ChoiceYear+"_"+moneyList.MoneyTotal+"_"+moneyList.MoneyNow+"_"+moneyList.MoneyMonth+"_"+moneyList.LossMoney;
            console.log(answer);
            getRegular();
        }
    });


});

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
function getAskList(){	
	for(var i=0;i<askList.length;i++){
		if (askList[i].RiId==askRiId ){
			var ask01=askList[i].ask01;
			var ask02=askList[i].ask02;
			var ask03=askList[i].ask03;
			var ask04=askList[i].ask04;
			console.log(ask01);
			$("#ask01").append(ask01);
			$("#ask02").append(ask02);
			$("#ask03").append(ask03);
			$("#ask04").append(ask04);
		}	
	}
	if(askRiId=="RiId04"){
		$("#ask05").append("年");		
	}else{
		$("#ask05").append("万元");
	};
}

function getRegularList() {
    moneyList.RiId=$("#RiId").val();
    moneyList.ChoiceYear=$("#ChoiceYear").val();
    moneyList.MoneyTotal=$("#MoneyTotal").val();
    moneyList.MoneyNow=$("#MoneyNow").val();
    moneyList.MoneyMonth=$("#MoneyMonth").val();
    moneyList.LossMoney=$('#lossid input[name="lossid"]:checked ').val();
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
