require.config({
   baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'unslider' : 'unslider.min',
	   'myScroll' :'/public/plugin/scroll'
　　 },
	shim: {
		　'unslider': {
　　　　　　	deps: ['jquery'],
　　　　　　　　exports: 'jQuery.fn.unslider'
　　　　　　},
		'myScroll' :{
			deps: ['jquery'],
			exports: 'jQuery.fn.myScroll'
		}
　　　　}	
　　});

require(['jquery','unslider','myScroll'],function($){
	//最新动态滚动
	$('div.marguneeBox li:even').addClass('lieven');
	$("div.marguneeBox").myScroll({

		speed:40,
		rowHeight:32
	});
	//轮播图
	var unslider04 = $('#b04').unslider({
        dots: true
    }),
    data04 = unslider04.data('unslider');
    
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
	
	$('.detailMessage').click(function(){
		window.location=scope.commercialActivit_url;
	});

	//页面一些效果的集合如实现二维码显示
	$('.contact1').mouseenter(function(){
		$('.slightlyQR').css('display','block');
		$('.triangle').css('display','block');
	}).mouseout(function(){
		$('.slightlyQR').css('display','none');
		$('.triangle').css('display','none');
	});
	$(window).scroll(function(){
		var scroll=$(document).scrollTop();
		var height=$(window).height()/2;
		if(scroll>height){
			$('#nav').stop().fadeIn();
		}else{
			$('#nav').stop().fadeOut();
		}
	});
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
	//点击跳转到发布页面
	//演艺人才中心轮播图
	 var unslider04 = $('#showTimeLunbo').unslider({
			dots: true
	 	}),
	 	data04 = unslider04.data('unslider');

	 $('.unslider-arrow04').click(function() {
	 	var fn = this.className.split(' ')[1];
	 	data04[fn]();
	 });
	//传媒资源详情跳转
	$('.resourceMore').click(function(){
		window.location.href="/home/resource/index";
	});
	//商业活动详情跳转
	$('.businessMore').click(function(){
		window.location.href="/home/business/index";
	});
	//校园详情跳转
	$('.group_more').click(function(){
		window.location.href="/home/group/index";
	});
	//演艺人才更多跳转
	$('.group_more').click(function(){
		window.location.href="/home/group/index";
	});
	$('.art_more').click(function(){
		window.location.href="/home/art/index";
	});
});
　　　
	



		
　　














