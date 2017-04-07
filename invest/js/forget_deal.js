$(function(){
    var snType = 0;
    var sn = $.cookie("sn");
    var mobile = $.cookie("sendTel");
    var name = $.cookie("username");
    $('#tradepass').off('click').on('click',function(){
    	hideloading();
    	showLoading();
        var params = {
            "queryBean.certificatetype" : snType,
            "queryBean.certificateno" : sn,
            "queryBean.mobileno" : mobile,
            "queryBean.custname" : name
        };
        console.log(params);
        $.ajax({
            url : mainUrl + "queryForCustnoInfo",
            data : params,
            dataType : "JSON",
            success:function(data){
            	hideloading();
                if(data.retcode == '0000'){
                    $('#fd_con').hide();
                    $('#fd_main').show();
                    $('#fd_main1').show();
                }else{
                    setErrorMsg(data.retcode,data.retmsg);
                }

            },
            error:function(data){
            	hideloading();
                setErrorMsg(data.retcode,data.retmsg);
            }
        });
    });
    $('#fd_getPsw').off('click').on('click',function(){
        var fd_checkCode = $('#PW1').val();
        var fd_password = $('#newPW1').val();
        var fd_confirm = $('#newPW2').val();
        hideloading();
        validate(fd_password,fd_confirm,fd_checkCode);


    });

    function validate (fd_password,fd_confirm,fd_checkCode) {
            var fd_str = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (fd_password == "" || fd_password == null || fd_confirm == "" || fd_confirm == null || fd_checkCode == "" || fd_checkCode == null) {
                showAlert("密码和验证码不能为空");
                return false;
            }
            if (!fd_str.test(fd_password)) {
                showAlert("交易密码应该为6-16位数字和字母间隔！");
                return false;
            }
            if (fd_password != fd_confirm) {
                showAlert("密码前后不一致");
                return false;
            }
        	showLoading();
        var params1 = {
            "newPsw" : fd_password,
            "resetBean.certificateno" : sn,
            "checkNo" : fd_checkCode,
            "queryBean.custname" : name
        };
        $.ajax({
            url : mainUrl + "getBackPsw",
            data : params1,
            dataType : "JSON",
            success:function(data){
            	hideloading();
                if(data.retcode == '0000'){
                    showAlert('您的交易密码已经设置成功！',goPerson);
                }else {
                    setErrorMsg(data.retcode,data.retmsg);
                }

            },
            error:function(err){
            	hideloading();
                setErrorMsg(err.retcode,err.retmsg);
            }
        });
    }
    function goPerson (){
        window.location.href = "center.html";
    }
});
