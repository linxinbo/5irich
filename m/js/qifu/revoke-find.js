$(function(){
	$(".change_halfway").click(function () {
	    $(".revoke_data ul").html("");
	    window.location.href = "halfway-find.html";
	  });

  $(".change_apply").click(function () {
		$(".deal_data ul").html("");
		window.location.href = "apply-find.html";
	});
  $(".change_confirm").click(function () {
    $(".apply_data ul").html("");
    window.location.href = "confirm-find.html";
  });
  $(".change_revoke").click(function () {
    $(".revoke_data ul").html("");
    window.location.href = "revoke-find.html";
  });

});
