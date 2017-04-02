<?php
namespace Home\Controller;

use Think\Controller;

class LoginController extends CommonController
{
	
	private $_model;
	
	protected function _initialize(){
		$this->_model=D('User');
	}

    /**
     * 用户注册模块
     * 1，判断是否为ajax提交
     */
    public function enroll(){
        //判断是否为AJAX提交
        if (IS_AJAX) {
            //收集数据
            if ($this->_model->create('','enroll') === false) {
                $res = $this->_model->getError();
                return send_json(0, $res);
            }
            //检查验证码是否正确
            $code = I('code');
            if($this->_model->validateRegCode($code) === false && !C('TEST')){
                return send_json(0,'验证码错误');
            }
            //执行方法
            if ($this->_model->addUser() === false) {
                return send_json(0, '注册失败');
            }
            return send_json(1, '注册成功');
        } else {
            $this->display('enroll');
        }
    }
    /**
     * 用户登录
     */
    public function login(){
        //判断是否为AJAX提交
        if (IS_AJAX) {
            //收集数据
            if ($this->_model->create()===false) {
                $res = $this->_model->getError();
                return send_json(0, $res);
            }
            //执行方法
            $userInfo = $this->_model->checkLogin();
            if ($userInfo===false) {
                $res = $this->_model->getError();
                return send_json(0, $res);
            }
            //登陆成功，返回个人信息，保存在本地
            return send_json(1, '登录成功',$userInfo);
        } else {
            $this->display('login');
        }
    }
    
    /**
     * AJAX验证码是否正确
     */
    public function checkRegCodeAjax()
    {
    	if(IS_AJAX){
    		$code = I('post.code');
    		$phone = I('post.phone');
    		$res = $this->_model->validateRegCode($code,$phone);
    		if($res || C('TEST')){
    			return send_json(1, '验证码正确');
    		}else{
    			return send_json(0, '验证码错误');
    		}
    	}
    }
    
    /**
     * 发送注册验证码,阿里大于频率限制每个用户1分钟一条，一天7条
     */
    public function GetRegCode()
    {
    	if(IS_AJAX){
    		$phone = I('post.phone');
    		if(C('TEST') || $this->_model->sendRegSMS($phone)){
    			return send_json(1,'发送成功');
    		}else{
    			return send_json(0,'发送失败');
    		}
    	}
    }

    /**
     * 注册的时候验证电话号码是否被注册
     */
    public function checkEnrollPhone()
    {
        $res=$this->_model->getUserByPhone(I('post.phone'));
        if($res===false){
            return send_json(1,'允许注册');
        }else{
            return send_json(0,'用户已被注册');
        }

    }

    /**
     * 登录的时候验证电话号码
     */
    public function checkLoginPhone()
    {
        $res=$this->_model->getUserByPhone(I('ajax.phone'));
        if($res===false){
            return send_json(0,'电话号码未注册');
        }else{
            return send_json(1,'允许登录');
        }
    }
    
    /**
     * 退出登录
     */
    public function loginOut()
    {
    	//删除SESSION和自动登录的COOKIE,并跳转到登录页面
    	session('USER',null);
    	cookie('AUTO_LOGIN_TOKEN',null);
    	$this->redirect('/login/login');
    }
    
    /**
     * 关于爱贝壳页面显示
     */
    public function aboutBeike()
    {
        $this->display('aboutBeike');
    }
}