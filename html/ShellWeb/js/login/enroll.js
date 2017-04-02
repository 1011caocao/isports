require.config({
   baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'compatibility':'compatibility',
		'layer' :'../../../../ShellWeb/js/require/layer/layer'
　　 }
	
　　});

require(['jquery','compatibility','layer'],function($,compatibility,layer){
	//ie8兼容
	compatibility.compatibility();
	layer.config({
		path: '../../../../ShellWeb/js/require/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	});

	$('.phoneNumber').blur(function(){
		var phone=$('.phoneNumber').val();
		var phoneReg = /^1(3[0-9]|5[012356789]|7[678]|8[0-9])(?=\d{8}$)/g;
		if(phoneReg.test(phone)==false){
			$(this).next('.judge').find('.error').css('display','block').prev('img').css('display','none');
			$(this).parents('.number').find('.warnning').css('display','block');
		}else{
			$.ajax({
				data:phone,
				type: "post",
				url:'',
				dataType: "json",
				async: true,
				success: function (result) {
					if(result.state==1){
						$(this).next('.judge').find('.correct').css('display','block').next('img').css('display','none');
						$(this).parents('.number').find('.warnning').css('display','none');
					}else{
						//替换电话号码验证失败信息，如电话号码已注册
						$(this).parents('.number').find('.warnning').html(result.message);
						$(this).next('.judge').find('.error').css('display','block').prev('img').css('display','none');
						$(this).parents('.number').find('.warnning').css('display','block');

					}
				}
			});

		}
	});
	$('.upwnNumber').blur(function(){
		
		var upwReg= /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,12}$/;
		var upw=$('.upwnNumber').val();
		
		if(!!!upwReg.test(upw)){
			$(this).parents('.upwn').find('.warnning').css('display','block');
			$(this).parents('.inputBox').next('.judge').find('.error').css('display','block').prev('img').css('display','none');
		}else{
			$(this).parents('.upwn').find('.warnning').css('display','none');
			$(this).parents('.inputBox').next('.judge').find('.correct').css('display','block').next('img').css('display','none');
		}
	});
	$('.confirmNumber').blur(function(){
		var upw=$('.upwnNumber').val();
		var con=$('.confirmNumber').val();
		if(upw==''){
			return('哈达');
		}else{
			if(!!!(upw==con)){
				$(this).parents('.inputBox').next('.judge').find('.error').css('display','block').prev('img').css('display','none');
				$(this).parents('.confirmUpwn').find('.warnning').css('display','block');
			}else{
				$(this).parents('.inputBox').next('.judge').find('.correct').css('display','block').next('img').css('display','none');
				$(this).parents('.confirmUpwn').find('.warnning').css('display','none');
			}
		}
		
	});
	var state=true;
	
	
	//兼容ie8浏览器点击事件显示或者隐藏密码
	var browser=navigator.appName ;
	var b_version=navigator.appVersion ;
	var version=b_version.split(";"); 
	var trim_Version=version[1].replace(/[ ]/g,""); 
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
		var val='';
		
		$('.showHide').click(function(){
			val=$(this).prev().find('input').val();
			
			if(state){
				$(this).find('img').prop('src','../../img/common/showLogo.png');
				$(this).prev('.upwnBox').html('<input type="text" placeholder="8-12位数字或字母及其组合" class="input upwnNumber" value='+val+'>');
				state=false;
				
			}else{
				$(this).find('img').prop('src','../../img/common/hideLogo.png');
				$(this).prev('.upwnBox').html('<input type="password" placeholder="8-12位数字或字母及其组合" class="input confirmNumber" value='+val+'>');
				state=true;
			}
		});
	}else{
		$('.showHide').click(function(){
		if(state){
			$(this).find('img').prop('src','../../img/common/showLogo.png');
			$(this).prev('.upwnBox').find('input').prop('type','text');
			state=false;
		}else{
			$(this).find('img').prop('src','../../img/common/hideLogo.png');
			$(this).prev('.upwnBox').find('input').prop('type','password');
			state=true;
		}
		
	});
	}
	//存储用户名和密码
	$('.confirmEnroll').click(function(){

		var phone=$('.phoneNumber').val();
		var upwn=$('.upwnNumber').val();
		var password=upwn;
		//本地存储用户名和密码
		var data1=new Object;
		data1.phone=phone;
		data1.upwn=upwn;
		localStorage.setItem('userdata',JSON.stringify(data1));
		var data=new Object();
		data.phone=phone;
		data.password=password;
		console.log(password);
			$.ajax({
				data:data,
				type: "post",
				url:'',
				dataType: "json",
				async: true,
				success: function (result) {
					if(result.state==1){

					}else{

					}
				}
			});

	});
	//点击获取验证码短信
	var clickTime=true,time,index=60;
	$('.getCode').on('click',function(){
		clickTime=false;
		clearInterval(time);
		if(clickTime=true){
			var $this=$(this);
			$(this).css({'background':'gray'});
			$this.text(index);
			time=setInterval(function(){
				index--;
				$this.text(index);
				if(index==0){
					clearInterval(time);
					$this.text('获取验证码').css({'background':'#ff9700'});
					clickTime=true;
					index=60;
				}
			},1000);
			//发送验证码短信
/*			$.ajax({
				data:data,
				type: "post",
				url:'',
				dataType: "json",
				async: true,
				success: function (result) {
					if(result.state==1){

					}else{

					}
				}
			});*/

		}else{
			return
		}
	});
	function authCode(n){
		var arr=new Array();
		for(var i = 0;i<n;i++){
			var b=parseInt(Math.random()*100);
			if(b >=65&& b <=90){
				arr.push(String.fromCharCode(b));
			}else if(b  >=0&&b<=25){
				arr.push(String.fromCharCode(b+97));
			}
			else{
				arr.push(b%10);
			}
		}
		return arr.join('');
	}
	
	
	
	
});
