$(document).ready(function () {
		$("#checkboxDiv").delegate(".deal_code,.deal_name", "click", function (e) {

			if ($(".opt_edit").is(":hidden")) {
				return false;
			} else {
				e.stopPropagation();
				var fundid = $(this).attr("data-id");
				var fundname = $(this).attr("data-name");
				window.location.href = "../fund/fund_detail.html?fundid=" + fundid + "&fundname=" + fundname;
			}
		});
		var array = [];
		$("#checkboxDiv").delegate(".opt_list", "click", function (e) {
			e.stopPropagation();
			var input = $(this).find("input");
			var objectid = input.attr("object_id");
			var val = input.val();
			if ($(".opt_edit").is(":hidden")) {
				if (val == 0) {
					$(input).addClass("change_sel");
					$(input).attr("value", "1");
					array.push(objectid);
				} else {
					$(input).removeClass("change_sel");
					$(input).attr("value", "0");
					var index = $.inArray(objectid, array);
					array.splice(index, 1);
				}
				sum();
			} else {
				return false;
			}
		});
		mychoice();

		$(".choose_del").click(function () {
			$("input[value='1']").parent().parent().remove();
			var sum = ($("input[value='1']").length);
			$(".choose_del").removeClass("choose_delete");
			$(".selected").html("已选中" + sum + "个");
			deletFund(array);
		});
	});
	//我的自选基金
function mychoice() {
	hideloading();
	showLoading();
	//	查询自选
	$.ajax({
		type: 'post',
		url: mainUrl + 'getChoice',
		data: {
			page: 0,
			rows: 15
		},
		dataType: 'json',
		success: function (data) {
			hideloading();
			console.log(data.retcode);
			if (data.retcode == 0000) {
				$(data.data).each(function (i, n) {
					var fundid = n.fundCode + "";
					//fundid = fundid.substring(0, 6);
					var chicelist = '<li class="opt_list" data-id="' + fundid + '"  data-name="' + n.fundShortName + '"><div class="opt_header"><input type="checkbox" class="opt_choose" name="checked" value="0" object_id="' + n.objectid + '">';
					chicelist += '<div class="table_header"><span class="deal_code" data-id="' + fundid + '"  data-name="' + n.fundShortName + '">' + fundid + '</span><span class="deal_name" data-id="' + fundid + '"  data-name="' + n.fundShortName + '">' + n.fundShortName + '</span><a class="go-buy" data-id="' + fundid.substring(0, 6) + '"  data-name="' + n.fundShortName + '"><span>购买</span></a></div></div><div class="clear"></div></li>';
					$("#checkboxDiv").append(chicelist);
					//点击购买
					$("a.go-buy").unbind("click").click(function (e) {
						e.stopPropagation();
						console.log("ss");
						var fundname = $(this).attr("data-name");
						var fundid = $(this).attr("data-id");
						buyStep1(fundid, fundname);
					});

				});

			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error:function(data){
			hideloading();
			showAlert("服务器错误！");
        }
	})
}
//删除自选基金
function deletFund(array) {
	hideloading();
	showLoading();
  	array = array.join();
	console.log(array);
	$.ajax({
		url: mainUrl + "delChoice",
		data: {
			choiceId: array
		},
		dataType: "JSON",
		success: function (data) {
			hideloading();
			console.log(data);
			if (data.retcode == 0000) {
				$("input[value='1']").parent().parent().remove();
				showAlert("删除自选基金成功！");
				window.location.reload();
			} else {
				setErrorMsg(data.retcode, data.retmsg);
			}
		},
		error:function(data){
			hideloading();
		}
	})
}
