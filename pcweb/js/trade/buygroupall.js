var tano;//组合中基金对应的ta公司代码串
var comfundlist; //组合对应的fundcode串，做为第四步的入参
var comratelist;//基金比例串，作为第4步入参
var buyflag = 0;
var transactionaccountid;//交易账号
var groupname;//组合名称
var groupId;//组合代码
var first_per_min_20;//最小限额
var isopen = $.cookie("isopen");
var username = $.cookie("username");
//购买第一步，风险测试；
function buyGroupStep1(groupid, groupnamea,chouj) {
	//用户登陆验证
	if(username == "" || username == null || username == undefined|| username == "null") {
		setErrorMsg(1001);//重写报错处理
		return false;
	}else if(isopen != 1) {
		showAlert("您还未开户！，请开户后进行相关操作",gourl);//重写报错处理
		return false;
	}else {
		groupId = groupid;
		groupname = groupnamea;
		buygogroupnext(chouj);
	}
}

//购买group下一页
function buygogroupnext(chouj) {
	window.location.href = mainUrl+"trade/buygroup.html?buyflag=" + buyflag + "&groupId=" + groupId +"&groupname="+groupname+"&chouj="+chouj;
}


