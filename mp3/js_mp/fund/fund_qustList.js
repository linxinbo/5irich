/**
 * Created by d on 2016/6/11.
 */
var socreList = {
    questA: 0,
    questB: 1,
    questC: 4,
    questD: 8,
    questE: 10,
    ansA: "D",
    ansB: "A",
    ansC: "B",
    ansD: "C",
    ansE: "A"
};
var score;
var ans;
var questNum;
var papercode;
$(document).ready(function () {
    //接口调用风险评估答卷
    getQustList();

    //评估 风险等级   然后 跳转 评估成功页面
    $("#ques_submit").click(function () {
        if (socreList.ansA == "" || socreList.ansB == "" || socreList.ansC == "" || socreList.ansD == "" || socreList.ansE == "") {
            showAlert("问卷调查没有完成！");
        } else {
            getRisktest();
        }
    });

})


//提交问卷调查

function getRisktest() {
    hideloading();
    showLoading();
    $.ajax({
        url: mainUrl + "risktest",
        data: {
            "testBean.papercode":papercode ,
            "testBean.answer": socreList.ansA+"|"+ socreList.ansB+"|"+ socreList.ansC+"|"+ socreList.ansD+"|"+ socreList.ansE,//i.m.result
            "testBean.invtp": "1",
            "testBean.iscontinue": "1",
            "testBean.pointList": socreList.questA+"|"+ socreList.questB+"|"+ socreList.questC+"|"+ socreList.questD+"|"+ socreList.questE //i.m.resultpoint
        },
        dataType: "JSON",
        success: function (data) {
            hideloading();
            if(data.retcode==0000||data.retcode=="0000"){
                var newurl = document.referrer;
                if (newurl == "" || newurl == null) {
                    window.location.href="../sigin/qust-right.html";
                }
                else{
                    if (isLastUrl("change_right.html") || isLastUrl("sigin-right.html") || isLastUrl("sigin-right-open.html") || isLastUrl("account_right.html")) {
                        showAlert("风险评测成功", function(){window.location.href = "home.html";});
                    }else {
                        //跳转到本页面的上一个页面
                        showAlert("风险评测成功", function(){window.location.href=document.referrer;});
                    }
                }
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
        socreList.questA = score;
        socreList.ansA = ans;
        console.log(socreList.ansA);
    } else if (questNum == 1 || questNum == "1") {
        socreList.questB = score;
        socreList.ansB = ans;
        console.log(socreList.ansB);

    } else if (questNum == 2 || questNum == "2") {
        socreList.questC = score;
        socreList.ansC = ans;
        console.log(socreList.ansC);

    } else if (questNum == 3 || questNum == "3") {
        socreList.questD = score;
        socreList.ansD = ans;
        console.log(socreList.ansD);

    } else if (questNum == 4 || questNum == "4") {
        socreList.questE = score;
        socreList.ansE = ans;
        console.log(socreList.ansD);

    }

}

function getQustList() {
    showLoading();
    $.ajax({
        url: mainUrl + "rskAssQustList",
        data: {},
        dataType: "JSON",
        success: function (data) {

            hideloading();
            if(data.retcode==0000||data.retcode=="0000"){
                papercode= data.data.paprCode;
                $(".bgbox1").html("");

                $(data.data.qustList).each(function (i, n) {
                    var x = i + 1;
                    var quesName = '<dl class="ysy_agree"><dt class="">' + x + '.</dt><dd>' + n.questName + '</dd></dl>';
                    $(".bgbox1").append(quesName);
                    var ul = $('<ul data-num=' + i + '></ul>');
                    $(".bgbox1").append(ul);
                    var anstada = "";
                    $(n.itemList).each(function (i, m) {
                        anstada += '<li>' + '<dl class="ysy_agree">' + '<dt class="sele2" data-score="' + m.resultpoint + '" data-rest="' + m.result + '"></dt>' + '<dd data-score="' + m.resultpoint + '" data-rest="' + m.result + '">' + m.result + '&nbsp;' + m.resultcontent + '</dd>' + '</dl>' + '</li>';

                    });
                    $(".bgbox1 ul[data-num=" + i + "]").append(anstada);
                    defaultSel();
                    $("ul .ysy_agree dt").unbind("click").click(function () {
                        console.log("ss")
                        var prevUl = $(this).parents("ul");
                        score = $(this).attr("data-score");
                        ans = $(this).attr("data-rest");
                        questNum = prevUl.attr("data-num");
                        console.log(score);
                        //设置分数；
                        setScore(questNum);
                        prevUl.find("dt.def2").removeClass("def2").addClass("sele2");
                        $(this).removeClass("sele2").addClass("def2");
                    });
                    $("ul .ysy_agree dd").unbind("click").click(function () {
                        console.log("m");
                        var prevUl = $(this).parents("ul");
                        score = $(this).attr("data-score");
                        ans = $(this).attr("data-rest");
                        questNum = prevUl.attr("data-num");
                        //设置分数；
                        setScore(questNum);
                        prevUl.find("dt.def2").removeClass("def2").addClass("sele2");
                        $(this).prev("dt").removeClass("sele2").addClass("def2");
                    });
                });
            }else{
                setErrorMsg(data.retcode,data.retmsg);
            }
        },
        error:function(data){
            hideloading();
            alert("服务器错误");
        }
    });
};


function defaultSel(){
    $(".bgbox1 ul[data-num=0] li:eq(3) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=1] li:eq(0) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=2] li:eq(1) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=3] li:eq(2) dt").attr("class","def2");
    $(".bgbox1 ul[data-num=4] li:eq(0) dt").attr("class","def2");
}