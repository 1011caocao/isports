<?php
/**
 * Created by PhpStorm.
 * Admin: Administrator
 * Date: 2017/3/31
 * Time: 16:35
 */

namespace Admin\Controller;


use Think\Controller;

class AdminController extends CommonController
{
    private $_adminModel;
    protected function _initialize(){
        $this->_adminModel = D('Admin');
    }
    /**
     * 展示所有的管理员列表
     */
    public function index()
    {
        $adminLists=$this->_adminModel->getAdmin();
        $this->assign('adminLists',$adminLists);
        $this->display();
    }


}