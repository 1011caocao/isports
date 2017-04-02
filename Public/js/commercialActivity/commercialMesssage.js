require.config({
	baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
	      "complex": "complex"
　　 }
});
require(['jquery','complex'],function($,complex){
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
		$(this).find('img').css('display','none');
	}).mouseout(function(){
		$('.online').css('display','none');
		$(this).find('img').css('display','block');
	});
	$('.up').mouseover(function(){
		$('.return').css('display','block');
		$(this).find('img').css('display','none');
	}).mouseout(function(){
		$('.return').css('display','none');
		$(this).find('img').css('display','block');
	});
	//返回顶部
	$('.up').click(function(){
		$("body,html").animate({scrollTop:0},600);
	}).css('cursor','pointer');
	//下拉列表选项
	$('.pullBox').mouseover(function(){
		$('.pullDown').stop().slideDown(100);
	}).mouseleave(function(){
		$('.pullDown').stop().slideUp(100);
	});
	//二维码显示
	$('.contact1').mouseenter(function(){
		$('.slightlyQR').css('display','block');
		$('.triangle').css('display','block');
	}).mouseout(function(){
		$('.slightlyQR').css('display','none');
		$('.triangle').css('display','none');
	});
	$('.next').mouseover(function(){
		$(this).find('.nextPage1').css('display','none').prev('.nextPage2').css('display','block');
	}).mouseleave(function(){
		$(this).find('.nextPage1').css('display','block').prev('.nextPage2').css('display','none');
	});
	var data=JSON.parse(localStorage.getItem('userdata'));
	if(data){
		var phone=data.phone;
		$('.loginEnroll').find('.replaceBox').html('<img class="personalLogo" src="../../img/common/home-Personal_03.png"/><a class="dataUser" href="#">'+data.phone+'</a>');
		//鼠标移上显示个人中心菜单
		$('.loginEnroll').mouseover(function(){
			$('.personalCenter').stop().slideDown();
			$('.personalTriangle').stop().slideDown();
		}).mouseleave(function(){
			$('.personalCenter').stop().slideUp();
			$('.personalTriangle').stop().slideUp();
		});	
	}
	$('.exit').click(function(){
		localStorage.clear();
		var url1=window.location.href;
		window.location=url1;
	});
});
