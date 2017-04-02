<?php
/**
 * Created by Zend Studio.
 * User: Lihang
 * Date: 2016/12/5
 * Time: 14:23
 */
namespace Admin\Controller;

use Think\Controller;

class CommonController extends Controller
{
	
	public function __construct(){
		parent::__construct();
		$this->_init();
	}
	
	/**
	 * 初始化
	 */
	private function _init(){
		//如果已经登录
		$isLogin = $this->isLogin();
		if(!$isLogin){
			//跳转登录页面
			$this->redirect('/admin/login');
		}
	}
	
	/**
	 * 获取登录用户信息
	 * @return array
	 */
	public function getLoginUser(){
		return session('adminUser');
	}

	/**
	 * 判断用户是否登录
	 * @return boolean
	 */
	public function isLogin(){
		$user = $this->getLoginUser();
		if($user && is_array($user)){
			return true;
		}
		return false;
	}

}