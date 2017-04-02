require.config({
	//定义基准路径
	baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
	      'laydate':'../../plugin/laydate/laydate',//日期控件引入
	      'cityselect':'../../js/require/jquery.cityselect'//地址控件引入
　　 },
	//基于jquery插件的配置
	shim :{
		'laydate': {
			deps: ['jquery'],
			exports: 'jQuery.fn.laydate'
		},
		'cityselect': {
			deps: ['jquery'],
			exports: 'jQuery.fn.citySelect'
		}
	}
});
define('complex',['jquery','laydate','cityselect'],function($){
	var complex=function(){
		//根据滚动距离判断是否显示回到顶部
		$(window).scroll(function(){
			var scroll=$(document).scrollTop();
			var height=$(window).height()/2;
			if(scroll>height){
				$('#nav').stop().fadeIn();
			}else{
				$('#nav').stop().fadeOut();
			}
		});
		//鼠标滑过显示联系我们
		$('.contact1').mouseenter(function(){
				$('.slightlyQR').css('display','block');
				$('.triangle').css('display','block');
		}).mouseout(function(){
				$('.slightlyQR').css('display','none');
				$('.triangle').css('display','none');
		});
		//鼠标滑过实现二维码显示
		$('.planar').mouseover(function(){
			$('.online').css('display','block');
			$(this).find('img').css('display','none');
		}).mouseout(function(){
			$('.online').css('display','none');
			$(this).find('img').css('display','block');
		});
		//回到顶部进行提示
		$('.up').mouseover(function(){
			$('.return').css('display','block');
			$(this).find('img').css('display','none');
		}).mouseout(function(){
			$('.return').css('display','none');
			$(this).find('img').css('display','block');
		});
		//点击返回顶部
		$('.up').click(function(){
			$("body,html").animate({scrollTop:0},600);
		}).css('cursor','pointer');
		//日期的选择的
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
		//城市插件的选择
		getAddress('#city');
		getAddress('#city1');
		getAddress('#city2');
		getAddress('#city3');
		getAddress('#city4');
		getAddress('#city5');
		getAddress('#city6');
		getAddress('#city7');

		//封装地址插件的选择
		function getAddress(id){
			$(id).citySelect({
				url:"../../plugin/city.min.js",
				prov:"四川", //省份
				city:"成都", //城市
				dist:"青羊区", //区县
				nodata:"none" //当子集无数据时，隐藏select
			});
		};
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
		 getCheckBoxValue : function(className){
				obj = document.getElementsByClassName(className);
				check_val = [];
				for(k in obj){
					if(obj[k].checked)
						check_val.push(obj[k].value);
				}
				return check_val;
		}

};

	return {
		complex:complex,
		eventUntil : EventUntil
	}
});
