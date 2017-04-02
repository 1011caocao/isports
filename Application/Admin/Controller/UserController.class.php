<?php
/**
 * CodingBy lihang
 */

namespace Admin\Controller;

use Common\Model\CertificationModel;
use Think\Page;
class UserController extends CommonController
{
	private $_UserModel;
	protected function _initialize(){
        $this->_UserModel = D('User');
	}

    /**
     * 显示用户管理列表
     *
     */
	public function index()
	{
		$page = I('page',1);
		$data = array();
		//获取数据，分页
		$users = $this->_UserModel->getUsers($data,$page,C('ADMIN_PAGE_SIZE'));
// 		myPrint($users);
		//获取总数量
		$userCount = $this->_UserModel->getUserCount($data);
		//分页样式
		$Page = new Page($userCount,C('ADMIN_PAGE_SIZE'),$data);
//		myPrint($users);
		$pageRes = $Page->show();
        $this->assign('page',$page);
		$this->assign('users',$users);
		$this->assign('pageRes',$pageRes);
		$this->display();
	}

	/**
     * 切换用户状态
     */
	public function changeStatus()
    {
	    if(IS_AJAX){
	        //获取用户ID
	        $uid = I('post.uid');
            //更改用户状态
            $res = $this->_UserModel->changeStatus($uid);
            if($res){
                return send_json(1,'更新成功');
            }else{
                $data = $this->_UserModel->getError();
                return send_json(0,'更新失败',$data);
            }
        }
    }

    /**
     * 用户待认证的信息
     * @param int $id 用户ID
     */
    public function CertificationInfo($uid)
    {
       // 根据角色，获取认证信息
        $user = D('Certification')->getUserInfo($uid);
        if(!$user){
            get404();
        }
//        myPrint($user);
        $this->assign('user',$user);
        $this->display('certificationinfo');
    }
    /**
     * 用户角色认证
     * @param int $id 用户ID
     */
    public function verify()
    {
        if(IS_AJAX){
            //获取用户ID
            $uid = I('post.uid');
            //更改用户状态
            $res =$this->_CertifiedUserModel->verify($uid);
            if($res){
                return send_json(1,'认证成功');
            }else{
                $data = $this->_CertifiedUserModel->getError();
                return send_json(0,'认证失败',$data);
            }
        }
    }

    /**
     * 添加用户
     */
    public function add()
    {
        if(IS_POST){
            //修改用户
            if(I('post.id')){
                return $this->save(I('post.'));
            }
            if ($this->_UserModel->create()===false) {
                $res=$this->_UserModel->getError();
                return send_json(0,'添加用户失败',$res);
            }
            if ($this->_UserModel->addUser()===false) {
                $res=$this->_UserModel->getError();
                return send_json(0,'添加用户失败',$res);
            }
            return send_json(1,'添加用户成功');
        }else{
            $this->display('add');
        }
    }

    /**
     * 修改用户基本信息
     * @param $id
     */
    public function edit($id)
    {
        $user = $this->_UserModel->findOneById($id);
        $this->assign('user',$user);
        $this->display();
    }

    /**
     * 保存修改的用户信息
     * @param $data
     */
    public function save($data)
    {
        $id = $data['id'];
        unset($data['id']);
        try{
            $id = $this->_UserModel->updateById($id,$data);
            if($id === false){
                return send_json(0,'更新失败');
            }else{
                return send_json(1,'更新成功');
            }
        }catch (Exception $e){
            return send_json(0,$e->getMessage());
        }

    }
}