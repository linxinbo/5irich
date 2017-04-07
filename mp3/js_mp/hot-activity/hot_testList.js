(function(){
    $(function(){
        $('.test-answer').on('click',function(){
            $(this).parent().children().removeClass('test-answer-act');
            $(this).addClass('test-answer-act');
        });
        $('.test-usersn').on('blur',function(){
            if(IdentityCodeValid($(this).val())){
                $('.test-usersn').css('border-color','#ff9900');
            }else{
                $('.test-usersn').css('border-color','red');
            }
        });
        $('.test-username').on('blur',function(){
            if($(this).val() != null && $(this).val() != ""){
                $('.test-username').css('border-color','#ff9900');
            }else{
                $('.test-username').css('border-color','red');
            }
        });
        $('#ques_submit').on('click',function(){
            var riskRange = 1;
            var riskCont = null;
            var riskNum = 0;
            $('.test-answer-sum').each(function(index,ele){
                $(this).children().each(function(index,ele){
                    if($(this).hasClass('test-answer-act')){
                        riskNum += 5-index;
                    }
                });
            });
            if(riskNum <= 35){
                riskRange = 1;
                riskCont = "保守型投资者。";
            }else if(riskNum <= 45){
                riskRange = 2;
                riskCont = "稳健型投资者。";
            }else if(riskNum <= 55){
                riskRange = 3;
                riskCont = "平衡型投资者。";
            }else if(riskNum <= 65){
                riskRange = 4;
                riskCont = "积极型投资者。";
            }else{
                riskRange = 5;
                riskCont = "激进型投资者。";
            }
            if(testCommit()){
                var param = {
                    "sn": $('.test-usersn').val(),
                    "name": $('.test-username').val()
                };
                $.ajax({
                    url: mainUrl+'questionnaireStatus',
                    data: param,
                    dataType: "JSON",
                    success: function(data){
                        if(data.retcode == "0000"){
                            showAlert('您的风险等级为'+riskRange+'级,属于'+riskCont,toPrivate);
                        }else{
                            setErrorMsg(data.retcode)
                        }
                    }
                });
            }else{
                showAlert("请输入正确的身份信息！");
            }
        });
        function toPrivate(){
            window.location.href = "private_fund.html";
        }
        function testCommit(){
            var testBoll = true;
            if(!IdentityCodeValid($('.test-usersn').val())){
                testBoll = false;
            }
            if(!($('.test-username').val() != null && $('.test-username').val() != "")){
                testBoll = false;
            }
            return testBoll;
        }
    });
})();