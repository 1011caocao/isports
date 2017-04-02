require.config({
   baseUrl: "js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'unslider' : 'unslider.min',
	   'myScroll' :'../../../ShellWeb/plugin/scroll'
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
	//效果的一些集合
	var data=JSON.parse(localStorage.getItem('userdata'));
	if(data){
		var phone=data.phone;
		$('.loginEnroll').find('.replaceBox').html('<img class="personalLogo" src="img/common/home-Personal_03.png"/><a class="dataUser" href="#">'+data.phone+'</a>');
		//鼠标移上显示个人中心菜单
		$('.loginEnroll').mouseover(function(){
			$('.personalCenter').stop().slideDown();
			$('.personalTriangle').stop().slideDown();
		});
		$('.loginEnroll').mouseleave(function(){
			$('.personalCenter').stop().slideUp();
			$('.personalTriangle').stop().slideUp();
		});	
	}
	$('.exit').click(function(){
		localStorage.clear();
		var url1=window.location.href;
		window.location=url1;
	});
	$('.detailMessage').click(function(){
		window.location=scope.commercialActivit_url;
	});

	//页面一些效果的集合如实现二维码显示
	$('.contact1').mouseenter(function(){
		$('.slightlyQR').css('display','block');
		$('.triangle').css('display','block');
	});
	$('.contact1').mouseout(function(){
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
	});
	$('.planar').mouseout(function(){
		$('.online').css('display','none');
		$(this).find('img').css('display','block')
	});
	$('.up').mouseover(function(){
		$('.return').css('display','block');
		$(this).find('img').css('display','none')
	});
	$('.up').mouseout(function(){
		$('.return').css('display','none');
		$(this).find('img').css('display','block')
	});
	//返回顶部
	$('.up').click(function(){
		$("body,html").animate({scrollTop:0},600);
	}).css('cursor','pointer');
	//下拉列表选项

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
});
　　　
	



		
　　














