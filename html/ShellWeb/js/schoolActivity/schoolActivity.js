require.config({
	baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery" : "jquery",
	      'complex' : 'complex',
　　　　	  'unslider' : '../../../ShellWeb/js/require/unslider.min',
		  'cityselect' : '../../../ShellWeb/js/require/jquery.cityselect'
　　 },
	shim: {
		'unslider':{
			deps: ['jquery'],
			exports: 'jQuery.fn.unslider'
		},
		'cityselect': {
			deps: ['jquery'],
			exports: 'jQuery.fn.citySelect'
		}
　　 }
});
require(['jquery','complex','cityselect','unslider'],function($,complex){
	$("#city").citySelect({   
    	url:"../../plugin/city.min.js",   
   		prov:"四川", //省份  
    	city:"成都", //城市  
    	dist:"青羊区", //区县  
    	nodata:"none" //当子集无数据时，隐藏select  
	});
	//公共模块各种效果实现
	complex.complex();
	//定义轮播模块
	var unslider04 = $('#b04').unslider({
        dots: true
    });
    data04 = unslider04.data('unslider');
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
	//点击退出登录状态按钮
	$('.exit').click(function(){
		localStorage.clear();
		var url1=window.location.href;
		window.location=url1;
	});
	//判断本地中是否缓存有当前用户的注册信息，如有替换掉头部头像显示已登录状态
	var data=JSON.parse(localStorage.getItem('userdata')) ? JSON.parse(localStorage.getItem('userdata')) : 0;
	if(data!=0){
		var phone=data.phone;//从localStorage获取电话号码
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
});