require.config({
   baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'compatibility':'compatibility',
	   'MD5' :'/public/plugin/md5'
　　 }
	
　　});

require(['jquery','compatibility','MD5'],function($,compatibility,MD5){
	compatibility.compatibility();
	//点击logo跳转到首页
	$(".upToIndex").css("cursor","pointer").click(function(){
		window.location.href="/";
	});
	//初始化选择判断是否回填用户名和密码
	if(localStorage.getItem('userdata1')){
		var data=JSON.parse(localStorage.getItem('userdata1'));
		if(data.state==true){
			var phone=data.phone;
			$('.phone').val(phone);
		}
	}
	var data=JSON.parse(localStorage.getItem('userdata'));
	$('#login').click(function(){
		validateUsername();
	});
	$('.phone').focus(function(){
		$('.reminder').css('display','none');
	});
	$('.upwn').focus(function(){
		$('.reminder').css('display','none');
	});
	
	
	//自动记住用户名和密码
	var state = false;
	$('.automate').change(function(){
		if($('.nextLogin ').find('input').prop('checked')){
			var phone1=$('.phone').val();
			var upwn1=$('.upwn').val();
			if($('.nextLogin ').find('input').prop('checked')){
				state=true;
			}else{
				state=false;
			}
			var data=new Object;
			data.phone=phone1;
			data.state=state;
			localStorage.setItem('userdata1',JSON.stringify(data));
		}else{
			return;
		}
	});
	
	
	  document.onkeydown=function(event){
          var e = event || window.event || arguments.callee.caller.arguments[0];
        
           if(e && e.keyCode==13){ // enter 键
        	   validateUsername();
           }
      }; 
	
	
	//点击或回车登录用户名和密码
      function  validateUsername(){
    	  	var phone=$('.phone').val();
 			var password=MD5.MD5($('.upwn').val());
 			var status=$('.nextLogin').find('input').prop('checked')?1:0;
 			var data={
     			phone:phone,
     			password:password,
     			state:status
 			};
     		$.ajax({
     			data:data,
     			type: "post",
     			url:'/login/login',
     			dataType: "json",
     			async: true,
     			success: function (result) {
     				if(result.status==1){
     					//登陆成功
     					localStorage.setItem('userdata',JSON.stringify(result.data));
     					window.location=scope.index;
     				}else{
     					$('.reminder').css('display','block');
     				}
     			}
     		});
      }
      
	
	
	
});