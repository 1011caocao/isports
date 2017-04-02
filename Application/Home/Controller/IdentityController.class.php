<?php
namespace Home\Controller;

use Think\Controller;

class IdentityController extends CommonController
{
	public function __construct()
	{
		parent::__construct();
		$this->_init();
	}
	/**
	 * 初始化
	 * 判断是否登录
	 */
	private function _init()
	{
		//判断用户是否登录
		$user = $this->isLogin();
		//没有登录跳转到登录页面
		if(!$user){
			$this->redirect('/login/login');
		}
		//如果是验证模块自身，就不进行验证角色了。
		if(!in_array(strtolower(__ACTION__),C('CERTIFICATION_DENY'))){
			$user = $this->isCertification();
			if(!$user){
				$this->redirect('/user/certification');
			}
		}
	
	}
	/**
	 * 获取登录用户信息
	 * @return array
	 */
	public function getLoginUser()
	{
		return session('USER');
	}
	
	/**
	 * 判断用户是否登录
	 * @return boolean
	 */
	public function isLogin()
	{
		$user = $this->getLoginUser();
		if($user && is_array($user)){
			return $user;
		}
		return false;
	}
	/**
	 * 判断用户是否认证
	 * @return boolean
	 */
	public function isCertification()
	{
		$user = $this->getLoginUser();
		//判断是否为认证用户
		if($user && $user['role']){
			return $user;
		}
		return false;
	}
}