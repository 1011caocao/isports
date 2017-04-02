+require.config({
	baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
　　　　	 'unslider':'/public/js/require/unslider.min',
		'complex': 'complex'
　　 },
	shim: {

		 'unslider':{
		 	deps: ['jquery'],
　　　　　　　　exports: 'jQuery.fn.unslider'
		 }
　　　　}
		
});
require(['jquery','complex','unslider'],function($,complex){
	//各种效果实现
	complex.complex();
	//定义轮播模块
	var unslider04 = $('#b04').unslider({
        dots: true
    }),
    data04 = unslider04.data('unslider');
    
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
	 //登录状态判断
	 
	var data=JSON.parse(localStorage.getItem('userdata'));
	if(data){
		var phone=data.phone;
		$('.personalP').attr('src','/public/img/common/home-Personal_03.png');
		$('.personalBox').html('<a class="dataUser" href="#">'+data.phone+'</a><a class="exit" href="#">退出</a>');
	}
	/****************************筛选条件*****************************/
	//省份筛选
	$('#province').change(function(){
		$('#cities').val('0');
		$('#area').val('0');
		getVariable();
	}).next('#cities').change(function(){
		$('#area').val('0');
		getVariable();
	}).next('#area').change(function(){
		getVariable();
	});
	//点击筛选条件增加选项样式
	$('.commerciaty_school_size .typeDetail').find('span').bind('click',function(){
		$(this).addClass('getActive').siblings().removeClass('getActive');
		getVariable();
	});
	$('.activity_type .typeDetail').find('span').bind('click',function(){
		$(this).addClass('getActive').siblings().removeClass('getActive');
		getVariable();
	});

	$('.budget_money .typeDetail').find('span').bind('click',function(){
		$(this).addClass('getActive').siblings().removeClass('getActive');
		getVariable();
	});
	
	//点击学校搜索
	$('.schoolInputSearch').click(function(){
		getVariable();
	});
	
	//根据价格区间进行筛选
	$('.userDefineButton').click(function(){
		getVariable();
	});
	//ajax获取数据
	function getVariable(){
		var $province=$('#province').val(),
		 	$citys=$('#cities').val(),
		 	$area=$('#area').val(),
			$schoolSize=$('.commerciaty_school_size .typeDetail').find('.getActive').attr('name'),
			$activityType=$('.activity_type .typeDetail').find('.getActive').attr('name'),
			$moneyBudget=$('.budget_money .typeDetail').find('.getActive').attr('name');
			$searchSchool=$('.schoolActivitySearchBox').find('.sASInput').val();
			$minMoney=$('.userDefineMFrom').val();
			$maxMoney=$('.userDefineMTo').val();
			var data=new Object();
			data.province_id=$province;//省份
			data.city_id=$citys;//城市
			data.county_id=$area;//地区
			data.school_size=$schoolSize ? $schoolSize : 0;//校园规模
			data.activity_id=$activityType ? $activityType : 0;//活动类型
			data.money_type=$moneyBudget ? $moneyBudget : 0;//预算金额
			data.school_name=$searchSchool;//学校名称
			data.money_min=$minMoney;//自定义金额最小值
			data.money_max=$maxMoney;//自定义金额最大值
			$.ajax({
				data:data,
				type: "post",
				url:'/business/index/page/'+page,
				dataType: "json",
				async: true,
				success: function (result) {
//					console.log(result);return;
					if(result.status==1){
						var i=0,l=result.data.resultData.length,html='';
						//有数据
						if(l!=0){
							for(;i<l;i++){
								html+='<div class="example"><div class="exampleName l">'+result.data.resultData[i].name+'</div>'+
									'<div class="exampleType l">'+result.data.resultData[i].activity_name+'</div>'+
									'<div class="examplePlace l">'+result.data.resultData[i].area_name+'</div>'+
									'<div class="exampleSchool l">'+result.data.resultData[i].school_name+'</div>'+
									'<div class="exampleTime l">'+timestampToDateStr(result.data.resultData[i].activity_start_time,'.')+'-'+timestampToDateStr(result.data.resultData[i].activity_end_time,'.')+'</div>'+
									'<div class="exampleMoney l">￥'+result.data.resultData[i].money+'</div>'+
									'<div class="exampleCompany l">'+result.data.resultData[i].company_name+'</div>'+
									'</div>';
							}
							$('.listContainer').html(html);
						}else{
							$('.listContainer').html('<span style="width:100%;height:100px;font-size:20px;display:block;line-height:100px;text-align:center;">没有信息！</span>');
						}
						$('.pageBox').html(result.data.pageRes);
					}else{
						
					}
				}
			});
	}




//ajax分页
//	$('.pagination li').find('a').click(function(){
//		var page = $(this).text();
//		getVariable(page);
//		return false;
//	});
	
	
})

