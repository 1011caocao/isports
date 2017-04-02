<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/22
 * Time: 16:01
 */

namespace Home\Controller;


use Think\Controller;

class BusinessController extends CommonController
{
    /**
     * @var \Common\Model\BusinessPublishModel
     *
     */
    private $_model;
    protected function _initialize(){
        $this->_model=D('BusinessPublish');
    }
    /**
     * 商业活动首页
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
		//获取商业活动信息
		$resultData = $this->_model->getBusinessList($data,$page,$pageSize);
        //获取总数量
		$menusCount = $this->_model->getBusinessCount($data);
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
        //学校规模
        $schoolSize=$this->_model->getSchoolSize();
        //活动类型
        $activityType=$this->_model->getActivityType();
        //获得城市
        $provinces=D('Area')->getListByParentId();
        //查询城市
        $cities=D('Area')->getListByParentId($data['province_id']);
        //查询县级
        $areas=D('Area')->getListByParentId($data['city_id']);
        //预算金额
        $money=D('GroupPublish')->getMoney();
        //返回数据
        $Data=array(
            'schoolSize'=>$schoolSize,
            'activityType'=>$activityType,
            'provinces'=>$provinces,
            'money'=>$money,
            'resultData'=>$resultData,
            'pageRes'=>$pageRes,
            'cities'=>$cities,
            'areas'=>$areas,
        	'page'=>$page
        );
        $this->assign($Data);
        $this->display('index');
    }

    /** 
     * 商业活动详情页面
     * @param int $id 活动ID
     */
    public function businessDetails($id)
    {
        //根据id获得活动详情数据
        $row=$this->_model->getBusinessDetailsById($id);

        $this->assign('row',$row);
        $this->display();
    }
    /**
     * 商业活动申请操作
     * @param int $data['id'] 活动ID
     * @param string $data['reason'] 申请原因 
     * 
     * 1.验证是否能申请
     * 2.添加申请数据
     * 
     * @return json
     */
    public function businessApplyAjax(){
    	if(IS_AJAX){
    		$data = I('post.');
    		//1.查询该用户是否能够申请此活动
    		$isApply = D('BusinessApply')->isApplyBusiness($data['id']);
    		if(!$isApply){
    			$error = D('BusinessApply')->getError();
    			return send_json(0,'申请失败',$error);
    		}
    		//可以申请
    		$applyRes = D('BusinessApply')->addApply($data);
    		if(!$applyRes){
    			$error = D('BusinessApply')->getError();
    			return send_json(0,'操作失败',$error);
    		}
    		return send_json(1,'申请成功，请耐心等待审核');
    	}
    }
    
}