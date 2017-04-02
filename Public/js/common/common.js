
$(function(){
	 head_user();
	 initState();
});

	
	//效果的一些集合
	var head_user=function(){

		//鼠标移上显示个人中心菜单
		$('.slideDown').mouseover(function(){
			$('.personalCenter').stop().slideDown();
			$('.personalTriangle').stop().slideDown();
		});
		
		$('.loginEnroll').mouseleave(function(){
			$('.personalCenter').stop().slideUp();
			$('.personalTriangle').stop().slideUp();
		});
		
		$('.exit').click(function(){
			localStorage.clear();
			window.location.href='/login/loginOut';
			return false;
		});
		$(".upToIndex").click(function(){
			window.location.href="/";
		}).css("cursor","pointer");
	};
	var initState=function(){
		//获取当前用户所在的城市
	    	//如果查询到了cookie
	        if(getCookie('city')){
	        	var $address_city=$('.addressCity');
				$address_city.text(decodeURI(getCookie('city')));
	        }else{
	        	//获取城市
	    		$.ajax({
	    			data:'',
	    			type: "post",
	    			url:'/address/getLocation',
	    			dataType: "json",
	    			async: true,
	    			success: function (result) {
	    				if(result.status==1){
	    					var $address_city=$('.addressCity');
	    					$address_city.text(result.data);
	    				}else{
	    					//替换电话号码验证失败信息，如电话号码已注册
	    					$address_city.text('未知');
	    				}
	    			}
	    		});
	        }
	}
	
	var dialog={
		error : function (message) {
			layer.open({
				content:message,
				icon:2,
				title:'错误提示',
			});
		},

		//成功弹出层
		success : function (message) {
			layer.open({
				content:message,
				icon:1,
				yes:function () {
					window.location.reload();
				},
			});
		},

		// 确认弹出层
		confirm : function(message, url) {
			layer.open({
				content : message,
				icon:3,
				btn : ['是','否'],
				yes : function(){
					location.href=url;
				},
			});
		},

		//无需跳转到指定页面的确认弹出层
		toconfirm : function(message) {
			layer.open({
				content : message,
				icon:3,
				btn : ['确定'],
			});
		}
	};
	
	function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return arr[2]; return null;
    };
	
    //将时间戳转换为特定分隔符分隔的日期格式
    function timestampToDateStr(timestamp,separator) {
        var timestamp = parseInt(timestamp)*1000;
        var dd = new Date(timestamp);
        var y = dd.getFullYear();
        var m = dd.getMonth()+1 <10 ? '0'+(dd.getMonth()+1) : dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate() < 10 ? '0'+dd.getDate() : dd.getDate();

        return y+separator+m+separator+d;
    }
	
	
