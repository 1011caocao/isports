require.config({
   baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'compatibility':'compatibility',
	   'MD5' :'../../../../ShellWeb/plugin/md5',
	   'layer':'../../../../ShellWeb/js/require/layer/layer'
　　 }
	
　　});

require(['jquery','compatibility','MD5','layer'],function($,compatibility,MD5,layer){
	layer.config({
		path: '../../../../ShellWeb/js/require/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	});
	compatibility.compatibility();
	//初始化选择判断是否回填用户名和密码
	if(localStorage.getItem('userdata1')){
		var data=JSON.parse(localStorage.getItem('userdata1'));
		if(data.state==true){
			var phone=data.phone;
			var upwn=data.upwn;
			$('.phone').val(phone);
			$('.upwn').val(upwn);
		}
	}
	var data=JSON.parse(localStorage.getItem('userdata'));
	$('#login').click(function(){
		var phone=$('.phone').val();
		var password=$('.upwn').val();
		var data={
			phone:phone,
			password:password
		};
		console.log(data);
		layer.alert('电话号码或密码验证失败', {
			skin: 'layui-layer-yellow'
			,closeBtn: 0
			,anim: 0 //动画类型
		});
		$.ajax({
			data:data,
			type: "post",
			url:'',
			dataType: "json",
			async: true,
			success: function (result) {
				if(result.state==1){
					window.location=scope.index;
				}else{
					$('.reminder').css('display','block');
				}
			}
		});
	});
	$('.phone').focus(function(){
		$('.reminder').css('display','none');
	});
	$('.upwn').focus(function(){
		$('.reminder').css('display','none');
	});
	
	
	//自动记住用户名和密码
	var state=false;
	$('.automate').click(function(){
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
			data.upwn=upwn1;
			data.state=state;
			localStorage.setItem('userdata1',JSON.stringify(data));
		}else{
			return('哈哈哈,我去...')
		}
	});
	
});