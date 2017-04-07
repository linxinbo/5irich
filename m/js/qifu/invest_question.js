$(document).ready(function () {
		var args = new getArgs();
		var type=args.type;
		var fundcode=type_fundcode(type);
		var sceneInfo=sceneName(type);
		
		$(".header").find("h1").html(sceneInfo);
		$("title").html(sceneInfo); 
		
		if(type=="old"){
			$(".hme").attr("style","display:none");
		}else{
			$(".old").attr("style","display:none");
			if(type=="house"){
				$("#span_marry_education").attr("style","display:none");
			}else{
				$("#span_house").attr("style","display:none");
			}
		}
		
		$(".queren").on("click", function () {
			
			var money=$("#money").val();
			var money1=$("#money1").val();
			var money2=$("#money2").val();
			var year=$("#year").val(); 
			var age1=$("#age1").val(); 
			var age2=$("#age2").val(); 
			
			if(type=="old"){
				if(checkZero(age1)||checkZero(money)||checkZero(money2)||checkZero(age2)){
					showAlert("请完善问题！");
					return;
				}
				if(parseInt(age2)-parseInt(age1)<=0){
					showAlert("退休年龄要大于现在的年龄！");
					return;
				}
				//跳转到推荐基金的详情页
				window.location.href="fund_detail.html?money="+money2+"&year="+(parseInt(age2)-parseInt(age1))+"&fundcode="+fundcode+"&scene="+type;
			}
			else{
				if(checkZero(money)||checkZero(money1)||checkZero(money2)||checkZero(year)){
					showAlert("请完善问题！");
					return;
				}
				//跳转到推荐基金的详情页
				window.location.href="fund_detail.html?money="+money2+"&year="+year+"&fundcode="+fundcode+"&scene="+type;
			}
		});
});
	
	//检测输入的值是否为空或者为0
	function checkZero(value){
		if(value==''||value==undefined||value=='undefined'||parseInt(value)==0){
			return true;
		}
		return false;
	}
	
	//校验输入的是否是正整数
	function checkNumber(obj){
		if(/\D/.test(obj.value))
		{
			showAlert("请输入正整数！");
			obj.value='';
		}
	}
	//只能输入带小数点的正数
	function checkNumberPoint(obj){
		if(!/^[0-9]{0}([0-9]|[.])+$/.test(obj.value))
		{
			showAlert("请输入数字！");
			obj.value='';
		}
	}
	
	//根据类型，返回相应的场景信息
	function sceneName(type){
		if(type=="house"){
			return "购买住房定投";
		}else if(type=="marry"){
			return "结婚生子定投";
		}else if(type=="education"){
			return "子女教育定投";
		}else if(type=="old"){
			return "颐养天年";
		}
	}
	
	//根据场景返回相应的基金代码
	function type_fundcode(type){
		if(type=="house"){
			return "110008";//买房：易方达稳健收益Ｂ（110008）
		}else if(type=="marry"){
			return "000205";//结婚：易方达投资级信用债A（000205）
		}else if(type=="education"){
			return "000311";//教育：景顺长城沪深300增强（000311）
		}else if(type=="old"){
			return "590007";//养老：中邮上证380增强（590007）
		}
	}