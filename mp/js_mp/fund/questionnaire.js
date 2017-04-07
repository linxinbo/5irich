var socreList = {
		ansA: "",
		ansB: "",
		ansC: "",
		ansD: "",
		ansE: "",
		ansF: "",
};
var ans;
var questNum;
var papercode;
var answer="";
$(document).ready(function () {
	var args = new getArgs();
	answer=args.answer;
	//接口调用风险评估答卷
	getQustList();
	//自动填充答案
	autoFill();

	//评估 风险等级   然后 跳转 评估成功页面 
	$(".ques_submit").click(function () {
		if (socreList.ansA == "" || socreList.ansB == "" || socreList.ansC == "" || socreList.ansD == "" || socreList.ansE == ""||socreList.ansF == "") {
			showAlert("问卷调查没有完成！");
			return;
		} else {
			answer=socreList.ansA+"_"+socreList.ansB+"_"+socreList.ansC+"_"+socreList.ansD+"_"+socreList.ansE+"_"+socreList.ansF;
			getRisktest();
		}
	});

});

function  autoFill(){
	
	
	if(answer!=""&&answer!=undefined&&answer!="undefined"){
		//答案集合,length和ul个数一样
		var arr=answer.split("_");
		for(var k=0;k<arr.length;k++){
			//答案
			var selectedValue=arr[k];
			var questNum=$(".bgbox1").find('ul').eq(k).attr("data-num");
			$(".bgbox1").find('ul').eq(k).find('dl').each(function (){
				var dt_answer=$(this).find('dt').attr("data-rest");
				if(selectedValue==dt_answer){
					$(this).find('dt').attr("class","def2");
					setScore_1(questNum,selectedValue);
					return false;
				}
			});
			//$(".bgbox1 ul[data-num=0] li:eq(3) dt").attr("class","def2");
		}
		/*$(".bgbox1 ul[data-num=0] li:eq(3) dt").attr("class","def2");
	    $(".bgbox1 ul[data-num=1] li:eq(0) dt").attr("class","def2");
	    $(".bgbox1 ul[data-num=2] li:eq(1) dt").attr("class","def2");
	    $(".bgbox1 ul[data-num=3] li:eq(2) dt").attr("class","def2");
	    $(".bgbox1 ul[data-num=4] li:eq(2) dt").attr("class","def2");
	    $(".bgbox1 ul[data-num=5] li:eq(2) dt").attr("class","def2");*/
	}
}


//提交问卷调查

function getRisktest() {
    hideloading();
	showLoading();
	$.ajax({
		url: mainUrl + "intellAutoCalculateGruop",
		data: {
			"group_answer": "1"+socreList.ansA+"_2"+ socreList.ansE+"_3"+ socreList.ansD,//i.m.result
			//"group_answer": "1D_2D_3B"//i.m.result
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if(data.retcode==0000||data.retcode=="0000"){
				var groupCode=data.data.ZN_groupCode;
				/*console.log(groupCode);
				console.log(changeSelect_money(socreList.ansC));
				console.log(answer);*/
				//showAlert("感谢您的支持!"+groupCode.substring(5,6));
                window.location.href="index"+groupCode.substring(5,6)+
                	".html?ZN_groupCode="+groupCode+"&groupMoney="+changeSelect_money(socreList.ansC)+"&answer="+answer;
			}else{
				setErrorMsg(data.retcode,data.retmsg);
			}

		},
	    error:function(){
			hideloading();
			alert("服务器错误");
		}
	});
};

//设置分数
function setScore(questNum) {
	if (questNum == 0 || questNum == "0") {
		socreList.ansA = ans;
		console.log(socreList.ansA);
	} else if (questNum == 1 || questNum == "1") {
		socreList.ansB = ans;
		console.log(socreList.ansB);

	} else if (questNum == 2 || questNum == "2") {
		socreList.ansC = ans;
		console.log(socreList.ansC);

	} else if (questNum == 3 || questNum == "3") {
		socreList.ansD = ans;
		console.log(socreList.ansD);

	} else if (questNum == 4 || questNum == "4") {
		socreList.ansE = ans;
		console.log(socreList.ansE);

	}
	else if (questNum == 5 || questNum == "5") {
		socreList.ansF = ans;
		console.log(socreList.ansF);
	}

}

function setScore_1(questNum,ans) {
	if (questNum == 0 || questNum == "0") {
		socreList.ansA = ans;
		console.log(socreList.ansA);
	} else if (questNum == 1 || questNum == "1") {
		socreList.ansB = ans;
		console.log(socreList.ansB);

	} else if (questNum == 2 || questNum == "2") {
		socreList.ansC = ans;
		console.log(socreList.ansC);

	} else if (questNum == 3 || questNum == "3") {
		socreList.ansD = ans;
		console.log(socreList.ansD);

	} else if (questNum == 4 || questNum == "4") {
		socreList.ansE = ans;
		console.log(socreList.ansE);

	}
	else if (questNum == 5 || questNum == "5") {
		socreList.ansF = ans;
		console.log(socreList.ansF);
	}

}

function getQustList() {
		$("ul .ysy_agree dt").unbind("click").click(function () {
			console.log("ss");
			var prevUl = $(this).parents("ul");
			ans = $(this).attr("data-rest");
			questNum = prevUl.attr("data-num");
			//设置分数；
			setScore(questNum);
			prevUl.find("dt.def2").removeClass("def2").addClass("sele2");
			$(this).removeClass("sele2").addClass("def2");
		});
		$("ul .ysy_agree dd").unbind("click").click(function () {
			console.log("m");
			var prevUl = $(this).parents("ul");
			ans = $(this).attr("data-rest");
			questNum = prevUl.attr("data-num");
			//设置分数；
			setScore(questNum);
			prevUl.find("dt.def2").removeClass("def2").addClass("sele2");
			$(this).prev("dt").removeClass("sele2").addClass("def2");
		});
};


function defaultSel(){
    $(".bgbox1 ul[data-num=0] li:eq(3) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=1] li:eq(0) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=2] li:eq(1) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=3] li:eq(2) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=4] li:eq(0) dt").attr("class","def2");
}

function changeSelect_money(type){
	if(type=="A"||type=="B"){
		return "20,000";
	}else if(type=="C"){
		return "50,000";
	}else{
		return "100,000";
	}
}

