/**
 * 前端登录业务类
 * Created by maikuraki on 2016/10/24.
 */

var regis = {
    check : function () {
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        var repassword = $("input[name='repassword']").val();
        var phone = $("input[name='phone']").val();
        if(!username){
        	dialog.error("用户名不能为空！");
        	return;
        }
        if(!password){
        	dialog.error("密码不能为空！");
        	return;
        }
        if(!repassword){
            dialog.error("确认密码不能为空！");
            return;
        }
        if(!phone){
            dialog.error("电话号码不能为空！");
            return;
        }
        if(password!=repassword){
            dialog.error("两次密码不一致");
            return;
        }
        var data = {'username':username,'password':password,'repassword':repassword,'phone':phone};
        $.post('/Admin/login/regis',data,function (result) {
            if(result.status==0){
                //注册失败
                return dialog.error(result.data);
            }
            if(result.status==1){
                //注册成功
                dialog.success('注册成功待审核',"/Admin/login/index");
                //window.location.href="/Admin/login/index";//跳转到index控制器
            }
        },'json');
    }

};
var login = {
    check : function () {
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        if(!username){
            dialog.error("用户名不能为空！");
            return;
        }
        if(!password){
            dialog.error("密码不能为空！");
            return;
        }
        var data = {'username':username,'password':password};
        $.post('/Admin/login/check',data,function (result) {
            if(result.status==0){
                //登录失败
                return dialog.error(result.message);
            }
            if(result.status==1){
                //登陆成功
                window.location.href="/Admin/index/index";//跳转到index控制器
            }
        },'json');
    }

}


$(function(){
	document.onkeydown = function(e){ 
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	    	login.check();
	     }
	}
	});