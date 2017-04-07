// JavaScript Document
$(function(){
	getNum();
	function getNum(){
	 var maxNum = parseInt($('.ul li').eq(0).find('b').html()),	
	 maxHeight = parseInt($('.ul').height()),
	 ipars = maxHeight/maxNum;
	 for(var i=0; i<=5; i++)
	 {
	 	var inum = parseInt($('.ztu li').eq(i).find('b').html());
		$('.ztu li').eq(i).find('span').height(inum*ipars) 
	 }
	}
})