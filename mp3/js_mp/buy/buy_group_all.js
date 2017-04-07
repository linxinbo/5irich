var tano;//组合中基金对应的ta公司代码串
var comfundlist; //组合对应的fundcode串，做为第四步的入参
var comratelist;//基金比例串，作为第4步入参
var buyflag = 0;
var transactionaccountid;//交易账号
var groupname;//组合名称
var groupId;//组合代码
var first_per_min_20;//最小限额
//购买第一步，风险测试；
function groupBuyStep1(groupid, groupnamea) {
	groupId = groupid;
	groupname = groupnamea;
	console.log($(this));
	showLoading();
	$.ajax({
		type: "post",
		url: mainUrl + "firstBuyGroup",
		data: {
			"cfbean.combinationcode": groupId
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			if (data.retcode == 0000) {

				if (data.data.autRisk == 1014 || data.data.autRisk) {
					comfundlist = data.data.comfundlist;
					comfundlist =repalcecode(comfundlist) ;
					first_per_min_20 = data.data.first_per_min_20;
                    tano = data.data.tano;
										tano =repalcecode(tano) ;

                    comratelist = data.data.comratelist;
                    comratelist = repalcecode(comratelist);
                    buyflag = 1;
					showAlertHint('是否确认购买？', gogroupbuynext);
				} else {
					buyflag = 0;
					gogroupbuynext();
				}
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error: function (data) {
			hideloading();
			alert("请稍后重试！");
		}
	})
}

//购买group下一页
function gogroupbuynext() {
	window.location.href = mainUrl+"/mp/group_buy/group_buy.html?tano=" + tano + "&comfundlist=" + comfundlist + "&buyflag=" + buyflag + "&groupId=" + groupId +"&groupname="+groupname+"&comratelist="+comratelist;
}


