require.config({
	baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'complex': 'complex'
　　 }	
});
require(['jquery','complex'],function($,complex){
	complex.complex();
	var data=JSON.parse(localStorage.getItem('userdata'));
	if(data){
		var phone=data.phone;
		$('.loginEnroll').find('.replaceBox').html('<img class="personalLogo" src="../../img/common/home-Personal_03.png"/><a class="dataUser" href="#">'+data.phone+'</a>');
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
});
