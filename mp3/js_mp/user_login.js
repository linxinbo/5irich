/**
 * Created by d on 2016/5/4.
 */
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
    $("#jzwo").click(function () {
        if ($(this).prop("checked")) {
            var loginaccount = $('#cardNo').val();
            $.cookie("loginaccount", loginaccount, 100);
        } else {
            $.cookie("loginaccount", null, 100);
        }
    });
});
