<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2016/12/27
 * Time: 10:08
 */

namespace Home\Controller;


use Think\Controller;

class ResourceController extends CommonController
{
    /**
     * @var \Common\Model\ResourcesPublishModel
     *
     */
    private $_model;
    protected function _initialize(){
        $this->_model=D('ResourcesPublish');
    }
    /**
     * 传媒资源首页
     */
    public function index()
    {
        //获取查询数据
        $data = I('param.',array());
        unset($data['page']);
        //分页
        $page = I('page',1);
        //每页10条数据
        $pageSize = C('PAGE_SIZE_LIST');
        //获取资源活动信息
        $resultData = $this->_model->getResourceList($data,$page,$pageSize);
        //获取总数量
        $menusCount = $this->_model->getResourceCount($data);
// 		myPrint($menusCount);
        $Page = new \Think\Page($menusCount,$pageSize,$data);
        //输出分页样式
        $pageRes = $Page->show();
        //ajax查询返回JSON数据
        if(IS_AJAX){
            $Data = array(
                'resultData'=>$resultData,
                'pageRes'=>$pageRes,
            	'page'=>$page
            );
            return send_json(1,'获取成功',$Data);
        }
        $businessPublishModel=D('BusinessPublish');
        //学校规模
        $schoolSize=$businessPublishModel->getSchoolSize();
        //地址
        $provinces=D('Area')->getListByParentId();
        //查询城市
        $cities=D('Area')->getListByParentId($data['province_id']);
        //查询县级
        $areas=D('Area')->getListByParentId($data['city_id']);
        //资源类型回显
        $resourceB=$this->_model->getResourceByParentId($data['resource_aid']);
        //预算金额
        $money=D('GroupPublish')->getMoney();
        //资源类型
        $resources=$this->_model->getResourceByParentId();
        //返回数据
        $Data=array(
            'schoolSize'=>$schoolSize,
            'provinces'=>$provinces,
            'money'=>$money,
            'resources'=>$resources,
            'resultData'=>$resultData,
            'pageRes'=>$pageRes,
            'cities'=>$cities,
            'areas'=>$areas,
            'resourceB'=>$resourceB,
        	'page'=>$page
        );
        $this->assign($Data);
        $this->display();
    }
    /**
     * 
     * 页面AJAX请求，根据资源A类型，获取资源B类型
     * @param int $parent_id
     */
    public function getResourceByParentId($parent_id)
    {
        //判断是否为ajax提交
        if(IS_AJAX){
            $list=$this->_model->getResourceByParentId($parent_id);
            $this->ajaxreturn($list);
        }

    }
    
    /**
     * 活动详情页面，申请页面
     * @param unknown $id
     */
    public function resourceDetails($id)
    {
    	//获取资源详情
    	$row = $this->_model->GetResourceDetailById($id);
//     	myPrint($row);
    	$this->assign('row',$row);
    	$this->display('resourceDetail');
        
    }
    
    /**
     * 资源活动申请操作
     * @param int $data['id'] 活动ID
     * @param string $data['reason'] 申请原因 
     * 
     * 1.验证是否能申请
     * 2.添加申请数据
     * 
     * @return json
     */
    public function resourceApplyAjax(){
    	if(IS_AJAX){
    		$data = I('post.');
    		//1.查询该用户是否能够申请此活动
    		$isApply = D('ResourceApply')->isApplyResource($data['id']);
    		if(!$isApply){
    			$error = D('ResourceApply')->getError();
    			return send_json(0,'申请失败',$error);
    		}
    		//可以申请
    		$applyRes = D('ResourceApply')->addApply($data);
    		if(!$applyRes){
    			$error = D('ResourceApply')->getError();
    			return send_json(0,'操作失败',$error);
    		}
    		return send_json(1,'申请成功，请耐心等待审核');
    	}
    }
    
}