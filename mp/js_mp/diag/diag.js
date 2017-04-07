 $(function(){
	 var args = new getArgs();
	 var select_da1 = args.select_da1;
	 var select_da2 = args.select_da2;
	 var select_da3 = args.select_da3;
	 var select_da4 = args.select_da4;
	 var select_da5 = args.select_da5;

	 //监控输入
	 SuggestRemote();

	 $('.diag_btn').on('click',function(){
		 if($('.diag_fundN').val() && $('.diag_fundV').val()){
			 var fundN = $('.diag_fundN').val();
			 var fundV = $('.diag_fundV').val();
			 var fundC = $('.diag_fundN').attr("data-id");
			 var fund = '<li class="bottom_line">'
			 fund += '<h2 class="diag_title1"><span>'+fundN+'</span><i>'+fundC.substring(0,6)+'</i><em style="display: none">'+fundC+'</em></h2>'
			 fund += '<span class="diag_title2">持仓金额：<i>'+fundV+'</i>元</span>'
			 fund += '<img src="../images_mp/diag/delete.png" class="diag_delete"></li>'
                    
			 $('.diag_fundN').val("");
			 $('.diag_fundV').val("");
			 $('.diag_form1 ul').prepend($(fund));
			 $('.diag_delete').on('click',function(){
				 $(this).parent().remove();
			 });
		 } else {
			 showAlert('请您将信息填写完整！');
		 }
	 });

	 if (select_da1 == undefined || select_da2 == undefined || select_da3 == undefined || select_da4 == undefined || select_da5 == undefined) {
		 showAlert("问卷调查没有完成！");
		 //return;
	 } else {
		 var allSelect = select_da1 + select_da2 + select_da3 + select_da4 + select_da5;
		 var params1 = {
			 "result": allSelect,
		 };
		 showLoading();
		 $.ajax({
			 url: mainUrl + "riskRating",
			 data: params1,
			 dataType: "JSON",
			 success: function (response) {
				 hideloading();
				 console.log(response);
				 if (response) {
					 var level = response.retmsg;

					 $("#diag_dj").append(level.substring(1));
					 $('.diag_btn5').on('click', function () {
						 window.location.href = "zn_home.html?level=" + level + "";


					 });

					 $('.diag_btn1').on('click', function () {
						 var group_fund = $('#group_fund li');
						 var jijin='';
						 var jine='';
						 var results5 = [];
						 for (i = 0; i < group_fund.length; i++) {
							 console.log(group_fund[i]);
							 var fundname = group_fund.eq(i).children('h2').children('span').html();
							 var fundcode = group_fund.eq(i).children('h2').children('i').html();
							 var fundmoney = group_fund.eq(i).children('span').children('i').html();
							 jijin +=fundcode+",";
							 jine +=fundmoney+",";
						 }
						 var jijin1=jijin.substring(0,jijin.length-1);
						 var jine1=jine.substring(0,jine.length-1);
						 console.log(level);
						 if(jijin1==""&&jine1==""){
							 window.location.href = "zn_home.html?level=" + level + "";
						 }else{
						 	var params2 = {
							 	"code": jijin1,
							 	"asset": jine1,
							 	"rank": level
						 	};
						 	$.ajax({
							 	url: "http://diag.5irich.com/accountrank",
							 	data: params2,
							 	dataType: "JSON",
							 	success: function (response2) {
								 	var rank=response2.rank;
								 	var plevel=response2.plevel;
								 	var dlevel=response2.dlevel;
								 	window.location.href = "diag_result.html?rank=" + rank + "&rank_s="+level+"&asset="+jine1+"&code="+jijin1+"&dlevel="+dlevel+"&plevel="+plevel+"";
							 	},
							 	error: function (response2) {
								 	showAlert("服务器错误！");
							 	}

						 	});
						 }


					 });
				 }

			 },
			 error: function (response1) {
				 showAlert("服务器错误！");
			 }

		 });
	 }






});

 //基金代码实时检索
 function SuggestRemote() {
	 var params = {};
	 //var url = {url:mainUrl + "/MutualFundListManacheQueryAction", data:params,type:"get",dataType:"json",}
	 //var deferred = $.Deferred();
	 //var deferred = $q.defer();
	 //console.log( "# GET " + url + " ..." );
	 //console.log(params);
	 $.ajax({
		 url : mainUrl + "queryAllZhenDuanFund",
		 data : params,
		 dataType : "JSON",
		 success : function(ret) {
			 if (ret && ret.retcode && ret.retcode == "0000") {
				 var data = ret.data;
				 var results = [];
				 var results1 = [];
				 var results2 = [];
				 //console.log(data);
				 if (data) {
					 $.each(data,function(i,n){
						 //var product = data;
						 results.push({
							 name : n.fundname,
							 windcode : n.fundcode,
							 netValue : n.fundname+n.fundpy+n.fundcode
						 });

					 });


					/* if (/[0-9]+/.test(keywords)) {
						 params.flat = 0;
						 console.log(params.flat);*/
						 $('#fundZm').typeahead({
							 source : results,
							 items : 10,
							 display : 'netValue',
							 val : 'name',
							 netValue : 'windcode',
							 itemSelected : displayResult
						 });


					 //}
				 /*else if (/[a-zA-Z0-9]+/.test(keywords)) {
						 params.flat = 2;
						 console.log(params.flat);
						 $('#fundZm').typeahead({
							 source : results,
							 items : 10,
							 display : 'netValue',
							 val : 'name',
							 netValue : 'windcode',
							 itemSelected : displayResult
						 });

					 } else {
						 params.flat = 1;
						 console.log(params.flat);
						 console.log(results);
						 $('#fundZm').typeahead({
							 source : results,
							 items : 10,
							 display : 'name',
							 val : 'name',
							 netValue : 'windcode',
							 itemSelected : displayResult
						 });

					 }*/

				 }
				 //监控表单数据输入状态插件

			 } else {
				 console.log("1114");
			 }
		 },

		 error : function(response) {
			 console.log("# ERROR:" + JSON.stringify(response) + " ... FROM: ");
		 }
	 });

 }


 function formatCurrency(num) {
		num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num))
			num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10)
			cents = "0" + cents;
		for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ','
					+ num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + num + '.' + cents);
}