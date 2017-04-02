require.config({
   baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'compatibility':'compatibility'
		
　　 }
});
require(['jquery','compatibility'],function($,compatibility){
	//ie8placeholder兼容
	compatibility.compatibility();
	//验证密码是否合乎规范
	$('.inputUpwn').blur(function(){
		var upwn=$(this).val();
		var upwnReg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,12}$/;
		if(upwnReg.test(upwn)){
			$(this).parent().next().next('.judge').find('.correct').css('display','block').next('img').css('display','none');
			$(this).parents('.new').find('.warnning').css('display','noen');
		}else{
			$(this).parent().next().next('.judge').find('.error').css('display','block').prev('img').css('display','none');
			$(this).parents('.new').find('.warnning').css('display','block');
		}
	});
	//确认密码
	$('.confirmUpwn').blur(function(){
		var conf=$(this).val();
		var upwn=$('.inputUpwn').val();
		if(upwn==''){
			return('');
		}else{
			if(conf==upwn){
				$(this).parent().next().next('.judge').find('.correct').css('display','block').next('img').css('display','none');
				$(this).parents('.confirm').find('.warnning').css('display','none');
			}else{
				$(this).parent().next().next('.judge').find('.error').css('display','block').prev('img').css('display','none');
				$(this).parents('.confirm').find('.warnning').css('display','block');
			}
		}
		
	});
	
	//密码的动态显示
	var state=true;
	var browser=navigator.appName ;
	var b_version=navigator.appVersion ;
	var version=b_version.split(";"); 
	var trim_Version=version[1].replace(/[ ]/g,""); 
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
		var val='';
		
		$('.showUpwn').click(function(){
			val=$(this).prev().find('input').val();
			
			if(state){
				$(this).find('img').prop('src','/public/img/common/showLogo.png');
				$(this).prev('.upwnBox').html('<input type="text" placeholder="8-12位数字或字母及其组合" class="inputUpwn l" value='+val+'>');
				state=false;
				
			}else{
				$(this).find('img').prop('src','/public/img/common/hideLogo.png');
				$(this).prev('.upwnBox').html('<input type="password" placeholder="8-12位数字或字母及其组合" class="inputUpwn l" value='+val+'>');
				state=true;
			}
		});
		$('.showUpwn1').click(function(){
			val=$(this).prev().find('input').val();
			
			if(state){
				$(this).find('img').prop('src','/public/img/common/showLogo.png');
				$(this).prev('.upwnBox').html('<input type="text" placeholder="8-12位数字或字母及其组合" class="confirmUpwn l" value='+val+'>');
				state=false;
				
			}else{
				$(this).find('img').prop('src','/public/img/common/hideLogo.png');
				$(this).prev('.upwnBox').html('<input type="password" placeholder="8-12位数字或字母及其组合" class="confirmUpwn l" value='+val+'>');
				state=true;
			}
		});
	}else{
		$('.showUpwn').click(function(){
			if(state){
				$(this).find('img').prop('src','/public/img/common/showLogo.png');
				$(this).prev('.upwnBox').find('input').prop('type','text');
				state=false;
			}else{
				$(this).find('img').prop('src','/public/img/common/hideLogo.png');
				$(this).prev('.upwnBox').find('input').prop('type','password');
				state=true;
			}
		});
		$('.showUpwn1').click(function(){
			if(state){
				$(this).find('img').prop('src','/public/img/common/showLogo.png');
				$(this).prev('.upwnBox').find('input').prop('type','text');
				state=false;
			}else{
				$(this).find('img').prop('src','/public/img/common/hideLogo.png');
				$(this).prev('.upwnBox').find('input').prop('type','password');
				state=true;
			}
		});
	}
});
