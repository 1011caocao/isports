require.config({
   baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'compatibility':'compatibility',
	   'layer':'layer/layer'
   　 　　    　 　　
   }
	
　　});

require(['jquery','compatibility','layer'],function($,compatibility,layer){
	layer.config({
		path: '/public/js/require/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	});
	//点击logo跳转到首页
	$(".upToIndex").css("cursor","pointer").click(function(){
		window.location.href="/";
	});
	//ie8兼容
	compatibility.compatibility();
	//定义变量记住当前表单的状态
	var flag_phone=false,flag_upwn=false,flag_confirm_upwn=false,flag_auth_code=false;
	$('.phoneNumber').blur(function(){
		var $this=$(this);
		var phone=$('.phoneNumber').val();
		var phoneReg = /^1(3[0-9]|5[012356789]|7[678]|8[0-9])(?=\d{8}$)/g;
		var data={
			phone:phone
		};
		if(phoneReg.test(phone)==false){
			$(this).next('.judge').find('.error').css('display','block').prev('img').css('display','none');
			$(this).parents('.number').find('.warnning').css('display','block');

		}else{
			$.ajax({
				data:data,
				type: "post",
				url:'/home/login/checkEnrollPhone',
				dataType: "json",
				async: true,
				success: function (result) {
					//console.log(result);
					if(result.status==1){
						//console.log(123);
						$this.next('.judge').find('.correct').css('display','block').next('img').css('display','none');
						$this.parents('.number').find('.warnning').css('display','none');
						flag_phone=true;
					}else{
						//替换电话号码验证失败信息，如电话号码已注册
						$this.parents('.number').find('.warnning').text(result.message).css("display",'block');
						$this.next('.judge').find('.error').css('display','block').prev('img').css('display','none');

					}
				}

			});

		}
	});
	$('.upwnNumber').blur(function(){
		
		var upwReg= /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,12}$/;
		var upw=$('.upwnNumber').val(),len=upw.lenth;
		
		if(!!!upwReg.test(upw) ||(len > 12 || len < 8)){
				$(this).parents('.upwn').find('.warnning').css('display','block').text("密码不规范，请输入8-12位字母和数字组合");
				$(this).parents('.inputBox').next('.judge').find('.error').css('display','block').prev('img').css('display','none');
			
		}else{
			$(this).parents('.upwn').find('.warnning').css('display','none');
			$(this).parents('.inputBox').next('.judge').find('.correct').css('display','block').next('img').css('display','none');
			flag_upwn=true;
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
				flag_confirm_upwn=true;
			}
		}
		
	});
	//验证验证码是否正确
/*	$('.codeNumber').blur(function(){
		var code_number=$(this).val(),code_ajax='';
		if(code_number==code_ajax){
			flag_auth_code=true;
			$(this).next().next().css('display','none');
		}else{
			$(this).next().next().css('display','block');
		}
	});*/
	var state=true;
	
	
	//兼容ie8浏览器点击事件显示或者隐藏密码
	var browser=navigator.appName ;
	var b_version=navigator.appVersion ;
	var version=b_version.split(";"); 
	var trim_Version;
    var ver = toString(version[1]);
    console.log(ver);
    trim_Version=ver.replace(/[ ]/g,"");
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
		var val='';
		$('.showHide').click(function(){
			val=$(this).prev().find('input').val();
			
			if(state){
				$(this).find('img').prop('src','/public/img/common/showLogo.png');
				$(this).prev('.upwnBox').html('<input type="text" placeholder="8-12位数字或字母及其组合" class="input upwnNumber" value='+val+'>');
				state=false;
				
			}else{
				$(this).find('img').prop('src','/public/img/common/hideLogo.png');
				$(this).prev('.upwnBox').html('<input type="password" placeholder="8-12位数字或字母及其组合" class="input confirmNumber" value='+val+'>');
				state=true;
			}
		});
	}else{
		$('.showHide').click(function(){
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
	//存储用户名和密码
	function verification() {
		var phone=$('.phoneNumber').val();
		var upwn=$('.upwnNumber').val();
		var code=$('.codeNumber').val();
		var repassword=$('.confirmNumber').val();
//		console.log(code);return false;
		//本地存储用户名和密码
		var data1=new Object;
		data1.phone=phone;
		localStorage.setItem('userdata',JSON.stringify(data1));
		var data=new Object();
		data.phone=phone;
		data.password=upwn;
		data.code=code;
		data.repassword=repassword;
//		console.log(data);return false;
			$.ajax({
				data:data,
				type: "post",
				url:'/home/login/enroll',
				dataType: "json",
				async: true,
				success: function (result) {
					// console.log(result);return;
					if(result.status==1){
						window.location.href='/user/certification';
					}else{
						layer.alert(result.message, {
							skin: 'layui-layer-lan'
							,closeBtn: 0
							,anim: 0 //动画类型
						});
					}
				}
			});
	};
	//点击获取验证码短信
	var clickTime=true,time='',index=60;
	$('.getCode').on('click',function(){
		var phone=$('.phoneNumber').val();
		var $this=$(this);
		var data=new Object();
		data.phone=phone;
			//发送验证码短信
			if(flag_phone&&flag_upwn&&flag_confirm_upwn){
				$.ajax({
					data:data,
					type: "post",
					url:'/home/login/GetRegCode',
					dataType: "json",
					async: true,
					success: function (result) {
						if(result.status==1){
							clickTime=false;
							clearInterval(time);
							if(clickTime=true){
								$this.css({'background':'gray'});
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
							}else{

							}
						}
					}
				});
			}else{
				var message='<div>'+'请填写完整正确的信息'+'</div>';
				layer.msg(message, {
					time: 2000//20s后自动关闭

				});
			}

	});
	//验证用户验证码
	$('.codeNumber').blur(function(){
		var code=$(this).val(),
		phone=$('.phoneNumber').val(),
		that=$(this),
		data={
			phone:phone,
			code: code
		};
		if(code==''){
			that.next().next('.warnning').css('display','block');
		}else if(code!=''&&phone!=''){
			$.ajax({
				data:data,
				type: "post",
				url:'/login/checkRegCodeAjax',
				dataType: "json",
				async: true,
				success: function (result) {
					//console.log(result);
					if(result.status=='0'){
						that.next().next('.warnning').html(result.message).css('display','block');
					}else if(result.status=='1'){
						that.next().next('.warnning').css('display','none');
						flag_auth_code=true;
					}else{

					}
				}
			})

		}

	});
	//点击弹出爱贝用户协议
	$('.confirmEnroll').on('click',function(){
		var html=$('.about_beike_container').html(),phone=$('.phoneNumber').val();
		var upwn=$('.upwnNumber').val();
		var code=$('.codeNumber').val();
		var repassword=$('.confirmNumber').val();
		var code=$('.codeNumber').val();
		if(phone=''||upwn==''||repassword==''||code==''){
			layer.alert('信息请填写完整!');
		}else if(flag_phone==true&&flag_upwn==true&&flag_confirm_upwn==true&&flag_auth_code==true) {
			layer.open({
				type: 1,
				title: false,
				closeBtn: 0,
				area: ['640px', '500px'],
				shadeClose: true,
				skin: 'yourclass',
				btn: '同意并注册',
				content: html,
				yes: function () {
					verification();
				}

			});
		}
	});
});
