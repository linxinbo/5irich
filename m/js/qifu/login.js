$(document).ready(function () {
		$.ajax({
			url: mainUrl+"LoginWebAction",
			data: {
				loginName: "18600056520",
				password: "123789",
				loginType: "1",
				token: "14a95f688b68e5964bf00c51be9bb708",
				rdText: "ft5bre"
			},
			dataType: "JSON",
			success: function (data) {
				alert(data.retcode);
			}
	
	
		})
})
