require.config({
	baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'complex': 'complex'
　　 }

});
require(['jquery','complex'],function($,complex){
	//各种效果实现
	$('.close').click(function(){
		$('.popBox').css('display','none').next('#popUp').css('display','none');
	});
	$('#Apply').on('click',function(){
		$('.popBox').css('display','block').next('#popUp').css('display','block');
	});
	var stateClick=true;
	$('.clickGet').bind('click',function(){
		if(stateClick){
			$('.contactBox').css('display','block');
			stateClick=false;
			$('.showright').css('display','none').next('.showdown').css('display','block');
		}else{
			$('.contactBox').css('display','none');
			$('.showright').css('display','block').next('.showdown').css('display','none');
			stateClick=true;
		}
		
	});
	
	//二维码/下拉等效果实现
	//鼠标滑过实现二维码显示
	$('.planar').mouseover(function(){
		$('.online').css('display','block');
		$(this).find('img').css('display','none')
		
	}).mouseout(function(){
		$('.online').css('display','none');
		$(this).find('img').css('display','block')
		
	});
	$('.up').mouseover(function(){
		$('.return').css('display','block');
		$(this).find('img').css('display','none')
	}).mouseout(function(){
		$('.return').css('display','none');
		$(this).find('img').css('display','block')
		
	});
	//返回顶部
	$('.up').click(function(){
		$("body,html").animate({scrollTop:0},600);
	}).css('cursor','pointer');
	//二维码显示
	$('.contact1').mouseenter(function(){
		$('.slightlyQR').css('display','block');
		$('.triangle').css('display','block');
	}).mouseout(function(){
		$('.slightlyQR').css('display','none');
		$('.triangle').css('display','none');
	});
});