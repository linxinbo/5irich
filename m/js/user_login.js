$(document).ready(function () {
	$("#cardNo").focus(function () {
		$("[data_rest='ID_rest']").show();
		$("#cardNo").parents("li").next(".errorLi").hide();
	});
	$("#tradePW").focus(function () {
		$("[data_rest='PW_rest']").show();
	});
	$("#cardNo").blur(function () {
		var cardNo = $(this).val();
		if (cardNo == "") {
			$("[data_rest='ID_rest']").hide();
		}
	});
	$("#tradePW").blur(function () {
		var tradePW = $(this).val();
		if (tradePW == "") {
			$("[data_rest='PW_rest']").hide();
		}
	});
	$("[data_rest='ID_rest']").click(function () {
		$("#cardNo").val("");
		$(this).hide();
	})
	$("[data_rest='PW_rest']").click(function () {
		$("#tradePW").val("");
		$(this).hide();
	})
	$("#rememberName i").click(function () {
		if ($(this).hasClass("radio_b")) {

			$(this).removeClass("radio_b");
			$.cookie("loginaccount", null, 100);
		} else {


			$(this).addClass("radio_b");
			var loginaccount = $('#cardNo').val();
			$.cookie("loginaccount", loginaccount, 100);
		}
	});
});
