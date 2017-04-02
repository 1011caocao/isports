<?php
/**
 * Created by PhpStorm.
 * User: maikuraki
 * Date: 2016/12/4
 * Time: 21:11
 */
namespace Admin\Controller;

use Think\Controller;

class LoginController extends Controller 
{
    /**
     * 注册页面
     */
    public function regis()
    {
        $adminModel=D('Admin');
        if(IS_AJAX){
            if ($adminModel->create()===false) {
                $res=$adminModel->getError();
                return send_json(0,'注册失败',$res);
            }
            if ($adminModel->addAdmin()===false) {
                $res=$adminModel->getError();
                return send_json(0,'注册失败',$res);
            }
            return send_json(1,'注册成功');
        }else{
            $this->display();
        }

    }

    /**
     * 登录页面
     */
    public function index(){
        if(I('session.adminUser')){
            return $this->redirect('index/index');
        }
        return $this->display();
    }
    /*
     * 验证账户
     */
    public function check(){
        if(IS_AJAX){
            $adminModel = D('Admin');
            if($adminModel->create() === false){
                return send_json(0,$adminModel->getError());
            }
            //暂存密码
            $password = $adminModel->password;
            //判断用户是否存在
            $admin = $adminModel->getAdminByUsername($adminModel->username);
            if(!$admin){
                return send_json(0,'用户不存在');
            }
            //判断密码是否正确
            if($admin['password']!=get_md5_password($password)){
                return send_json(0,'密码错误');
            }
            session('adminUser',$admin);
            //修改登录时间和登录ip
            $adminModel->updataLogin(session('adminUser.admin_id'));
            //登录成功
            return send_json(1,'登陆成功');
        }
    }

    /*
     * 退出登录
     */
    public function loginout(){
        session('adminUser',null);
        $this->redirect('login/index');
    }
}