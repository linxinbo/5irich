//判断当前页是否为xxx.html
function isUrl(url){
	var s = ".+"+ url.replace(".","\\.") +"(\\?|$|#)";
	var reg = new RegExp(s);
	if(reg.test(location.href)){
		return true;
	}else{
		return false;	
	}
}
//弹出框 只有确认按钮
function showAlert(str,callback){
	if(false){
		alert(str);
		if(callback){
			callback();
		}
	}

	hideAlert();

	var alertBoxMask = $('<div class="alertBoxMask"></div>');
	
	var alertBox;
	var alertBox_h = '';
	alertBox_h += '<div class="alertBox">';
	alertBox_h += '<h3>提示</h3>';
	alertBox_h += '<p>'+ str +'</p>';
	alertBox_h += '<div class="alertBtn">确认</div>';
	alertBox_h += '<div class="clearfix"></div>';
	alertBox_h += '</div>';
	alertBox = $(alertBox_h);
	alertBoxMask.append(alertBox);
	
	$("body").append(alertBoxMask);
	var alertMaskH;
	if($(document).height() >= $(window).height()){
		alertMaskH=$(document).height();
	}else{
		alertMaskH=$(window).height();
	}
	$(".alertBoxMask").height(alertMaskH);
	var alertH = $(".alertBox").height();
	$(".alertBox").css("margin-top",-Math.ceil(alertH/2));
	$(".alertBox .alertBtn").click(function(){
		if(callback){
			callback();
		}
		hideAlert();
	});

}
function hideAlert(){
	if($(".alertBoxMask")){
		$(".alertBoxMask").remove();
	}		
}

//Confirm框 带有确定和取消按钮
function showConfirm(str, callback, tit, btn, callback2){
	var str, tit, btn;
	try { str = str || ''; } catch(e) { str = ''; }
	try { tit = tit || '提示'; } catch(e) { tit = '提示'; }
	try { btn = btn || ['确认','取消']; } catch(e) { btn = ['确认','取消']; }
	
	var confirmBox;
	var confirmBoxMask = $('<div class="confirmBoxMask"></div>');

	var _h = '';
	_h += '<div class="confirmBox">';
	_h += '<h3>提示</h3>';
	_h += '<p>'+ str +'</p>';
	_h += '<div class="confirmBtn">';
	_h += '<div class="btnL">'+ btn[1] +'</div>';
	_h += '<div class="btnR">'+ btn[0] +'</div>';
	_h += '</div>';
	_h += '<div class="clearfix"></div>';
	_h += '</div>';
	confirmBox = $(_h);
	confirmBoxMask.append(confirmBox);
	
	$("body").append(confirmBoxMask);
	var alertH = $(".confirmBox").height();
	$(".confirmBox").css("margin-top",-Math.ceil(alertH/2));
	$(".confirmBox .confirmBtn .btnR").click(function(){
		if(callback){
			callback();
		}
		hideConfirm();
	});

	$(".confirmBox .confirmBtn .btnL").click(function(){
		if(callback2){
			callback2();
		}else{
			hideConfirm();
		}
	});
	
}
//Confirm框 带有密码输入框确定和取消按钮
function showPwdConfirm(str, callback, tit, btn, callback2){
	var str, tit, btn;
	try { str = str || ''; } catch(e) { str = ''; }
	try { tit = tit || '提示'; } catch(e) { tit = '提示'; }
	try { btn = btn || ['确认','取消']; } catch(e) { btn = ['确认','取消']; }
	
	var confirmBox;
	var confirmBoxMask = $('<div class="confirmBoxMask"></div>');

	var _h = '';
	_h += '<div class="confirmBox">';
	_h += '<h3>提示</h3>';
	_h += '<div><input type="password" id="payBoxPwd" style="margin: 5px auto;display: block;border:none;text-align:center;width:100%;height:40px;" placeholder="输入交易密码"></div>';
	_h += '<div class="confirmBtn">';
	_h += '<div class="btnL">'+ btn[1] +'</div>';
	_h += '<div class="btnR">'+ btn[0] +'</div>';
	_h += '</div>';
	_h += '<div class="clearfix"></div>';
	_h += '</div>';
	confirmBox = $(_h);
	confirmBoxMask.append(confirmBox);
	
	$("body").append(confirmBoxMask);
	var alertH = $(".confirmBox").height();
	$(".confirmBox").css("margin-top",-Math.ceil(alertH/2));
	$(".confirmBox .confirmBtn .btnR").click(function(){
		if(callback){
			callback();
		}
		hideConfirm();
	});

	$(".confirmBox .confirmBtn .btnL").click(function(){
		if(callback2){
			callback2();
		}else{
			hideConfirm();
		}
	});
	
}
function hideConfirm(){
	if($(".confirmBoxMask")){
		$(".confirmBoxMask").remove();
	}	
}
//显示loading框
function showLoading(){
	var main = $('<div class="alertBoxMask2"></div>');
	var loadBox = $('<div id="loadingBox"></div>');
	for(var i=0;i<8;i++){
		var o = $('<div id="circular_'+(i+1)+'" class="circular"></div>');
		loadBox.append(o);
	}
	loadBox.append($('<div class="clearfix"></div>'));
	main.append(loadBox);
	$("body").append(main);
	$(".alertBoxMask2").height(window.screen.height);
	var l = (window.innerWidth-$("#loadingBox").width())/2;
	var t = (window.innerHeight-$("#loadingBox").height())/2;
	loadBox.css("left",l);
	loadBox.css("top",t);
}
//移除loading框
function hideLoading(){
	if($(".alertBoxMask")){
		$(".alertBoxMask").remove();
	}	
}


//初始化上拉刷新组件
/** 0119 s 完全覆盖即可  **/
//function setPullLoad(wraTop,callback,className){
//	var o = className?className:"iscroll_wrapper";
//	$("body").css("position","inherit")
//	$('.'+o).css("top",wraTop);
//  var myScroll = new IScroll($('.'+o)[0], {
//    scrollX: false,
//    scrollY: true,
//    mouseWheel: true,
//    click: true
//  });
//  
//  myScroll.on('scrollMove', function() {
//    var $wrapper = $(this.wrapper);
//    var $pullUp = $wrapper.find('.pullup');
//    if (this.maxScrollY - this.y > 40) {
//      $pullUp.addClass('flip').find('.label').html('松开加载更多...');
//    } else {
//      $pullUp.removeClass('flip').find('.label').html('上拉加载更多...');
//    }
//  });
//  myScroll.on('scrollEnd', function() {
//	if(!$(this.wrapper).find('.pullup').is(':hidden')){
//		var $wrapper = $(this.wrapper);
//		var $pullUp = $wrapper.find('.pullup');
//		if ($pullUp.hasClass('flip')) {
//		  $pullUp.removeClass('flip').addClass('loading').find('.label').html('加载中...');
//		  pullUpAction($wrapper);
//		}
//	}
//  });
//  
//  function pullUpAction($wrapper) {
//	  if(!callback){
//		  var $pullUp = $wrapper.find('.pullup');
//		  setTimeout(function() {
//			$pullUp.removeClass('flip loading').find('.label').html('上拉加载更多...');
//			myScroll.refresh();
//		  }, 3000);
//	  }else{
//		  callback(function(){
//			  myScroll.refresh();
//			  $(".pullup").removeClass("loading");
//		  });  
//	  }
//  }	
//}