<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/22
 * Time: 15:36
 */

namespace Home\Controller;

use Think\Controller;

class UserController extends IdentityController
{
	/**
	 * 个人中心
	 */
	public function index()
	{
		$certifiedUserModel=D('CertifiedUser');
		$list=$certifiedUserModel->getList();
		$this->assign($list);
		//myPrint($list);
		$this->display('index');
	}
	
    public function certification()
    {
    	//初始化
    	$res = '';
    	$certificationModel=D('Certification');
    	//获取认证状态,0为可以认证，1为不能认证
    	$status = $certificationModel->checkStatus();
        if(IS_POST){
//         	myPrint(I('post.'));
//         	myPrint($_FILES);
        	//验证当前角色与认证是否一致，不一致不能更新认证
        	$role = $certificationModel->checkRole();
        	//如果没有正在审核的信息,并且认证与角色不冲突
        	if(!$status && $role){
        		//验证基本信息
	            if ($certificationModel->create()===false) {
	                $res = $certificationModel->getError();
	            }
	            switch(I('post.form')){
	            	//甲方企业认证
	                case 1:
	                    if($certificationModel->addCompany()===false) {
	                        $res = $certificationModel->getError();
	                    }
	                    break;
	                //传媒公司认证
	                case 2:
	                    if($certificationModel->addResource()===false) {
	                        $res = $certificationModel->getError();
	                    }
	                    break;
	                //校园组织认证
	                case 3:
	                    if($certificationModel->addGroup()===false) {
	                        $res = $certificationModel->getError();
	                    }
	                    break;
	                //演艺人认证
	                case 4:
	                    if($certificationModel->addActor()===false) {
	                        $res = $certificationModel->getError();
	                    }
	                    break;
                    default:
                    	$res = '非法操作';
	            }
	            if(!$res) $res = '认证申请填写成功，待审核';
        	}else{
        		$res = '认证申请不合法！';
        	}
        }
        //获取城市信息
        $provinces=D('Area')->getListByParentId();
        //获取公司规模
        $companySize=M('CompanySize')->select();
        //获取组织规模
        $organizeSize=M('OrganizeSize')->select();
        //演艺类型
        $artType=M('ArtType')->where(array('status'=>array('eq','1')))->order('id desc')->select();
        $Data=array(
	        'companySize'=>$companySize,
        	'organizeSize'=>$organizeSize,
        	'artType'=>$artType,
	        'provinces'=>$provinces,
	        'status'=>$status,
        	'res'=>$res
        );
        $this->assign($Data);
        $this->display('certification');
    }

	/**
	 * 我的贝壳币管理
	 */
    public function myWallet()
    {
		$icowryModel=D('IcowryLog');
		//分页
		$page = I('page',1);
		//每页10条数据
		$pageSize =12;
		//获取商业活动信息
		$resultData = $icowryModel->getIcowryList($page,$pageSize);
		//获取总数量
		$menusCount = $icowryModel->getIcowryCount();
		$Page = new \Think\Page($menusCount,$pageSize);
		//输出分页样式
		$pageRes = $Page->show();
		$Data=array(
			'resultData'=>$resultData,
			'pageRes'=>$pageRes
		);
		$this->assign($Data);
        $this->display('myWallet');
    }

    public function changePwd()
    {
    	$this->display('changePwd');
    }

}