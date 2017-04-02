
require.config({
	baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'complex': 'complex',
		 'layer' :'/public/js/require/layer/layer'
　　 }
});
require(['jquery','complex','layer'],function($,complex,layer){
	 layer.config({
	 	path: '/public/js/require/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
	 });
	//各种效果实现
	//弹出框显示
	$('.close').click(function(){
		$('.popBox').css('display','none').next('#popUp').css('display','none');
	});
	$('#Apply').on('click',function(){
		// $('.popBox').css('display','block').next('#popUp').css('display','block');
	});
	var stateClick=true;
	$('.clickGet').bind('click',function(){
		if(stateClick){
			stateClick=false;
			$('.contactBox').css('display','block');
			$('.showright').css('display','none').next('.showdown').css('display','block');
		}else{
			$('.contactBox').css('display','none');
			$('.showright').css('display','block').next('.showdown').css('display','none');
			stateClick=true;
		}
	});
	//二维码/下拉等效果实现
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
		$(this).find('img').css('display','block')
		
	});
	//返回顶部
	$('.up').click(function(){
		$("body,html").animate({scrollTop:0},600);
	}).css('cursor','pointer');
	//二维码显示
	$('.contact1').mouseenter(function(){
		$('.slightlyQR').css('display','block');
		$('.triangle').css('display','block');
	}).mouseout(function(){
		$('.slightlyQR').css('display','none');
		$('.triangle').css('display','none');
	});
	//
	$('.checkOutPublisherMessage').find('.ckPMImg').mouseover(function(){
		$(this).prop('src','/public/img/commercialActivity/Next%20page.png');
	}).mouseleave(function(){
		$(this).prop('src','/public/img/commercialActivity/Next%20page2.png');
	});
	
	//申请活动AJAX
	$("#Apply").on('click',function(){
		if(!scope.id){
			window.open('/login/login');
			return false;
		}
		var reason = $('.extraMessage').val();
		if(reason==''){
			dialog.error('申请理由不能为空');
			return false;
		}
		var data = new Object();
		data.id = $(this).val();
		data.content = reason;
 		$.ajax({
 			data:data,
 			type: "post",
 			url:scope.url,
 			dataType: "json",
 			async: true,
 			success: function (result) {
 				if(result.status==1){
 					//申请成功
 					dialog.success(result.message);
 				}else{
 					//申请失败
 					dialog.error(result.message+':'+result.data);
 				}
 			}
 		});
	});
	//资源照片鼠移上添加图片放大效果
	$(".showBigPicture").mouseover(function(){
		var url=$(this).attr("src");
		$(".scalePictureBox").show().find("img").attr("src",url);
	}).mouseleave(function(){
		$(".scalePictureBox").hide();
	});
	
});
