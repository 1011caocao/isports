require.config({
	baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
	   'layer' :'/public/js/require/layer/layer',
	   'laydate':'/public/plugin/laydate/laydate'
　　 },
	shim :{
		'laydate': {
			deps: ['jquery'],
			exports: 'jQuery.fn.laydate'
		},
		'cityselect': {
			deps: ['jquery']
		}
	}

});
define('complex',['jquery','layer','laydate'],function($,layer){
	layer.config({
		path: '/public/js/require/layer/' //定义layer.js所在的目录，可以是绝对目录，也可以是相对目录
	});
	var complex=function(){
		//将时间戳转换为特定分隔符分隔的日期格式
		function timestampToDateStr(timestamp,separator) {
			var dd = new Date(timestamp);
			var y = dd.getFullYear();
		    var m = dd.getMonth()+1 <10 ? '0'+(dd.getMonth()+1) : dd.getMonth()+1;//获取当前月份的日期
		    var d = dd.getDate() < 10 ? '0'+dd.getDate() : dd.getDate();
		    return y+separator+m+separator+d;
		}
	$('.contact1').mouseenter(function(){
		$('.slightlyQR').css('display','block');
		$('.triangle').css('display','block');
	}).mouseout(function(){
		$('.slightlyQR').css('display','none');
		$('.triangle').css('display','none');
	});
   
    
    $(window).scroll(function(){
    	var scroll=$(document).scrollTop();
    	var height=$(window).height()/2;
    	
    	if(scroll>height){
    		
    		$('#nav').stop().fadeIn();
    	}else{
    		$('#nav').stop().fadeOut();
    	}
    	
    });
	//鼠标滑过实现二维码显示
	$('.planar').mouseover(function(){
		$('.online').css('display','block');
		$(this).find('img').css('display','none')
		
	}).mouseout(function(){
		$('.online').css('display','none');
		$(this).find('img').css('display','block')
		
	});
	$('.up').mouseover(function(){
		$('.return').css('display','block');
		$(this).find('img').css('display','none')
		
	}).mouseout(function(){
		$('.return').css('display','none');
		$(this).find('img').css('display','block')
		
	});
	//返回顶部
	$('.up').click(function(){
		$("body,html").animate({scrollTop:0},600);
	}).css('cursor','pointer');
	//日期的选择
		laydate.skin('molv');
		chooseData($('#startActiveTime'),'#startActiveTime');
		chooseData($('#endActiveTime'),'#endActiveTime');
		chooseData($('#beginningTime'),'#beginningTime');
		chooseData($('#endingTime'),'#endingTime');
		chooseData($('#SABeginTime'),'#SABeginTime');
		chooseData($('#SAEndTime'),'#SAEndTime');
		chooseData($('#SAAtBTime'),'#SAAtBTime');
		chooseData($('#SAAtETime'),'#SAAtETime');
		chooseData($('#MSBeginTime'),'#MSBeginTime');
		chooseData($('#MSEndTime'),'#MSEndTime');
		chooseData($('#requireBtime'),'#requireBtime');
		chooseData($('#requireEtime'),'#requireEtime');
		//封装日期插件方法
		function chooseData($id,id){
			$id.click(function(){
				laydate({
					elem: id,
					format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
					festival: true, //显示节日

				});
			});
		};
		$('#province').change(function(){
			var province_id=$(this).val();
			pro=province_id;
			var that=$(this);
			//发出ajax请求到Address
			var url = '/home/address/getListByParentId';
			data={parent_id:province_id};
			$.getJSON(url,data,function(data){

				//清空之前的省和县，避免下次选择的时候，上次的重复
				that.next('#cities').get(0).length=1;
				that.next('#cities').next('#area').get(0).length=1;
				var html = '';
				$(data).each(function(i, city) {
					html += '<option value="' + city.area_id + '">' + city.area_name + '</option>';
				});
				$(html).appendTo(that.next('#cities'));
			});
		});
		//..................切换cities 获取area................
		$('#cities').change(function(){
			var city_id=$(this).val();
			//发出ajax请求到Address
			var url = '/home/address/getListByParentId';
			data={parent_id:city_id};
			$.getJSON(url,data,function(data){
				//清空之前的县，避免下次选择的时候，上次的重复
				$('#area').get(0).length=1;
				$(data).each(function(i, area) {
					var html = '<option value="' + area.area_id + '">' + area.area_name + '</option>';
					$(html).appendTo($('#area'));
				});
			});
		});
		//.............................................................
		//城市的选择三级联动 身份认证的时候三级联动
		//获取选择下拉框中的值，这个是商业活动的城市选择
		var pro='0',cit='0',ar='0';
		$('.province1').change(function(){
			var province_id=$(this).val();
			pro=province_id;
			var that=$(this);
			//发出ajax请求到Address
			var url = '/home/address/getListByParentId';
			data={parent_id:province_id};
			$.getJSON(url,data,function(data){

				//清空之前的省和县，避免下次选择的时候，上次的重复
				that.next('.cities1').get(0).length=1;
				that.next('.cities1').next('.area1').get(0).length=1;
				var html = '';
				$(data).each(function(i, city) {
					html += '<option value="' + city.area_id + '">' + city.area_name + '</option>';
				});
				$(html).appendTo(that.next('.cities1'));
			});
		});
		//..................切换cities 获取area................
		$('.cities1').change(function(){
			var city_id=$(this).val();
			cit=city_id;
			var that=$(this);
			var htmlList='<option value="">请选择</option>';
			//发出ajax请求到Address
			var url = '/home/address/getListByParentId';
			data={parent_id:city_id};
			$.getJSON(url,data,function(data){
				//清空之前的县，避免下次选择的时候，上次的重复
				that.next('.area1').get(0).length=1;
				$(data).each(function(i, area) {
					htmlList += '<option value="' + area.area_id + '">' + area.area_name + '</option>';	
				});
				that.next('.area1').html(htmlList);
			});
		});
		$('.area1').change(function(){
			var area_id=$(this).val();
			ar=area_id;
			var that=$(this);
			//发出ajax请求到Address
			var url = '/home/address/getSchoonNameByAreaId';
			data={id:area_id};
			$.getJSON(url,data,function(data){
				$('#pop_up_choose_box').find('.pop_content').find('.pop_contentF').empty();
				//清空之前的县，避免下次选择的时候，上次的重复
				//that.next('.area').get(0).length=1;
				var i=0,l;
				data==null ? l=0 : l=data.length;
				for(;i<l;i++){
					var school_clone=$('#pop_up_choose_box').find('.pop_content').find('.cloneBox').find('button[name="clone"]:first').clone(true).show();
					school_clone.attr('school-id',data[i].id);
					school_clone.html(data[i].school_name);
					$('#pop_up_choose_box').find('.pop_content').find('.pop_contentF').append(school_clone);
				}
			});
		});
		//这是校园活动和资源发布的城市选择
		$('.province').change(function(){
			var province_id=$(this).val();
			var that=$(this);
			//发出ajax请求到Address
			var url = '/home/address/getListByParentId';
			data={parent_id:province_id};
			$.getJSON(url,data,function(data){

				//清空之前的省和县，避免下次选择的时候，上次的重复
				that.next('.cities').get(0).length=1;
				that.next('.cities').next('.area').get(0).length=1;
				var html = '';
				$(data).each(function(i, city) {
					html += '<option value="' + city.area_id + '">' + city.area_name + '</option>';
				});
				$(html).appendTo(that.next('.cities'));
			});
		});
		//..................切换cities 获取area................
		$('.cities').change(function(){
			var city_id=$(this).val();
			var that=$(this);
			//发出ajax请求到Address
			var url = '/home/address/getListByParentId';
			data={parent_id:city_id};
			$.getJSON(url,data,function(data){
				//清空之前的县，避免下次选择的时候，上次的重复
				that.next('.area').get(0).length=1;
				$(data).each(function(i, area) {
					var html = '<option value="' + area.area_id + '">' + area.area_name + '</option>';
					$(html).appendTo(that.next('.area'));
				});
			});
		});
		$('.area').change(function(){
			var area_id=$(this).val();
			var that=$(this);
			//发出ajax请求到Address
			var url = '/home/address/getSchoonNameByAreaId';
			var htmlList='<option value="">请选择</option>';
			data={id:area_id};
			$.getJSON(url,data,function(data){
				//清空之前的县，避免下次选择的时候，上次的重复
				if(data){
					$(data).each(function(i, area) {
						htmlList += '<option value="' + area.id + '">' + area.school_name + '</option>';
					});
					that.parents('.common').next('.common_school').find('.host_school').html(htmlList);
				}
			});
		});
		/*
		 ***点击选择学校增加学校的选择
		 */
		//选择学校并记录选择的学校
		$('#commercial_act').on('click',function(){

			if(pro=='0'||cit=='0'||ar=='0'){
				$(this).html('不限');
                $(this).next().attr('school_list','0');
			}else{
				getSchool($(this));
			}

		});
		$('#school_act').on('click',function(){

			if(pro=='0'||cit=='0'||ar=='0'){
				layer.alert('请把地区选择完整！');
			}else{
				getSchool($(this));
			}
		});
		$('#media_act').on('click',function(){

			if(pro=='0'||cit=='0'||ar=='0'){
				layer.alert('请把地区选择完整！');
			}else{
				getSchool($(this));
			}
		});
		//获取学校公用方法
		function getSchool($this){

			$('#pop_up_choose_box').css('display','block');
			$('#pop_up_choose_box .pop_content').find('.choose_school').removeClass('choose_school_active');
			$('.confirm_button').on('click',function(){
				var schools=[],data_school='';
				$(this).parent('.pop_button_box').prev().find('.choose_school_active').each(function(index,element){
					schools.push($(this).text());
                    data_school+=$(this).attr('school-id')+",";

				});
				$('#pop_up_choose_box').css('display','none');
				if(schools.length>0){
					$this.html(schools[0]+'等');
					$this.next('.school_list').attr('school_list',data_school);
				}
			});
		}
	};
	var EventUntil = {
		addHandler : function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			} else if(element.attachEvent){
				element.attachEvent('on'+type,handler);
			} else {
				element['on' + type]=handler;
			}
		},
		getEvent : function(event){
			return event ? event : window.event;
		},
		removeHandler : function(){
			if(element.addEventListener){
				element.removeEventListener(type,handler,false);
			} else if(element.attachEvent){
				element.detachEvent('on'+type,handler);
			} else {
				element['on' + type]=null;
			}
		},
		getTarget : function(event){
			return event.target || event.srcElement;
		},
		preventDefault : function(event){
			if(event.preventDefault){
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		stopPropagation : function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		},
		isQQ : function(QQ){
			var bValidate = RegExp(/^[1-9][0-9]{4,9}$/).test(QQ);
			if (bValidate) {
				return true;
			}
			else{
				return false;
			}
		},
		isPhone : function(Phone){
			var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(Phone);
			if (bValidate) {
				return true;
			}
			else
				return false;
		},
		isEmail : function(Email){
			var bValidate = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(Email);
			if (bValidate) {
				return true;
			}
			else
				return false;
		},
		 personal_img_preview :function($this,that){
			var objUrl = EventUntil.getObjectURL(that.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
			if (objUrl) {
				$this.prev().attr("src", objUrl) ; //将图片路径存入src中，显示出图片
				var $picture_name=$this.val(),
					arr=$picture_name.split('\\'),
					pic_name=arr[arr.length-1];//取得的图片名称
				$this.next().html( pic_name);

			}
		},
		 getObjectURL : function(file) {
			var url = null ;
			if (window.createObjectURL!=undefined) { // basic
				url = window.createObjectURL(file) ;
			} else if (window.URL!=undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(file) ;
			} else if (window.webkitURL!=undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(file) ;
			}
			return url ;
		},
		getCheckBoxValue : function($this){
			var check_val = [];
			$this.each(function(){
				check_val.push($(this).attr('name'));
			});
			return check_val;
		},
		formBlur : function($this){
			$this.blur(function(){
				if($this.val()==''){
					$(this).next('.publish_error').css('display','block');
				}else{
					$(this).next('.publish_error').css('display','none');
				}
			});

		},
		formNextBlur : function($this){
			$this.blur(function(){
				if($this.val()==''){
					$(this).next().next('.publish_error').css('display','block');
				}else{
					$(this).next().next('.publish_error').css('display','none');
				}
			});

		},
		getTimeStamp : function(dateTime){
			var date_,dateString,date,getTime;
			date_=dateTime.replace(/-/g, "/");
			dateString=Date.parse(date_);
			date = new Date(dateString);
			getTime = date.getTime();
			return getTime;
		}


	};
	return {
		complex:complex,
		eventUntil : EventUntil
	}
})
