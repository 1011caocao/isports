require.config({
	baseUrl: "../../../ShellWeb/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
	      'complex': 'complex',
　　　　	  'unslider':'../../../ShellWeb/js/require/unslider.min',
		  'cityselect':'../../../ShellWeb/js/require/jquery.cityselect'
　　 },
	shim: {
		　'cityselect': {
　　　　　　	 deps: ['jquery'],
　　　　　　　　exports: 'jQuery.fn.citySelect'
　　　　　　},
		 'unslider':{
		 	 deps: ['jquery'],
　　　　　　　  exports: 'jQuery.fn.unslider'
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
	//各种效果实现
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
	 //登录状态判断
	var data=JSON.parse(localStorage.getItem('userdata'));
	if(data){
		var phone=data.phone;
		$('.personalP').attr('src','../img/common/home-Personal_03.png');
		$('.personalBox').html('<a class="dataUser" href="#">'+data.phone+'</a><a class="exit" href="#">退出</a>');
	}
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
	//点击退出登录状态
	$('.exit').click(function(){
		localStorage.clear();
		var url1=window.location.href;
		window.location=url1;
	});
	//点击筛选条件增加选项样式
	$('.commerciaty_school_size .typeDetail').find('span').bind('click',function(){/*校园规模*/
		$(this).addClass('getActive').siblings().removeClass('getActive');
	});
	$('.activity_type .typeDetail').find('span').bind('click',function(){		   /*活动类型*/
		$(this).addClass('getActive').siblings().removeClass('getActive');
	});
	$('.budget_money .typeDetail').find('span').bind('click',function(){		   /*活动预算金额*/
		$(this).addClass('getActive').siblings().removeClass('getActive');
	});
	//封装获取刷选条件的选项内容方法
	function getVariable(){
		var $province=$('#province').val(),
		 	$citys=$('#citys').val(),
		 	$area=$('#area').val(),
			$schoolSize=$('.commerciaty_school_size .typeDetail').find('.getActive').text(),
			$activityType=$('.activity_type .typeDetail').find('.getActive').text(),
			$moneyBudget=$('.budget_money .typeDetail').find('.getActive').text();
			var data=new Object();
			data.province=$province;
			data.citys=$citys;
			data.area=$area;
			data.schoolSize=$schoolSize;
			data.activityType=$activityType;
			data.moneyBudget=$moneyBudget;
		return data;
	}
});

