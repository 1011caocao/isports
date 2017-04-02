
require.config({
	baseUrl: "../../../ShellWeb/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		  'complex': 'complex',
		  'layer' :'../../../ShellWeb/js/require/layer/layer'
　　 }
});
require(['jquery','complex','layer'],function($,complex,layer){
	 layer.config({
	 	path: '../../js/require/layer/' //定义layer.js所在的目录，可以是绝对目录，也可以是相对目录
	 });
	//弹出框显示
	$('.close').click(function(){
		$('.popBox').css('display','none').next('#popUp').css('display','none');
	});
	//测试layer方法
	$('#Apply').on('click',function(){
		layer.open({
			content: '测试回调',
			success: function(layero, index){
				layer.alert('这是一个layer');
			}
		});
	});
	//鼠标滑过实现二维码显示
	$("#nav").css('display','block');
	$('.planar').mouseover(function(){
		$('.online').css('display','block');
		$(this).find('img').css('display','none');
	}).mouseout(function(){
		$('.online').css('display','none');
		$(this).find('img').css('display','block')
	});
	$('.up').mouseover(function(){
		$('.return').css('display','block');
		$(this).find('img').css('display','none');
	}).mouseout(function(){
		$('.return').css('display','none');
		$(this).find('img').css('display','block');
	});
	//点击返回顶部
	$('.up').click(function(){
		$("body,html").animate({scrollTop:0},600);
	}).css('cursor','pointer');
	//下拉列表选项
	$('.pullBox').mouseover(function(){
		$('.pullDown').stop().slideDown(100);
	});
	$('.pullBox').mouseleave(function(){
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
	//点击退出登录
	$('.exit').click(function(){
		window.location.reload();
		localStorage.clear();
	});
	$('.checkOutPublisherMessage').find('.ckPMImg').mouseover(function(){
		$(this).prop('src','../../img/commercialActivity/Next%20page.png');
	}).mouseleave(function(){
		$(this).prop('src','../../img/commercialActivity/Next%20page2.png');
	});
});
