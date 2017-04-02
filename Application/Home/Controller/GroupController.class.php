<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2016/12/26
 * Time: 17:23
 */

namespace Home\Controller;


use Common\Model\BusinessPublishModel;
use Think\Controller;

class GroupController extends CommonController
{
    /**
     * @var \Common\Model\GroupPublishModel
     *
     */
    private $_model;
    protected function _initialize(){
        $this->_model=D('GroupPublish');
    }

    public function index()
    {
//     	myPrint(I('param.'));
        //获取查询数据
        $data = I('param.',array());
        unset($data['page']);
        //分页
        $page = I('page',1);
        //每页10条数据
        $pageSize = C('PAGE_SIZE_LIST');
        //获取校园活动信息
        $resultData = $this->_model->getGroupList($data,$page,$pageSize);
        //获取总数量
//         myPrint($resultData);
        $menusCount = $this->_model->getGroupCount($data);
        $Page = new \Think\Page($menusCount,$pageSize,$data);
        //输出分页样式
        $pageRes = $Page->show();
        //ajax查询返回JSON数据
        if(IS_AJAX){
            $Data=array(
                'resultData'=>$resultData,
                'pageRes'=>$pageRes,
            	'page'=>$page
            );
            return send_json(1,'获取成功',$Data);
        }
        $businessPublishModel=D('BusinessPublish');
        //学校规模
        $schoolSize=$businessPublishModel->getSchoolSize();
        //活动类型
        $activityType=$businessPublishModel->getActivityType();
        //地址
        $provinces=D('Area')->getListByParentId();
        //查询城市
        $cities=D('Area')->getListByParentId($data['province_id']);
        //查询县级
        $areas=D('Area')->getListByParentId($data['city_id']);
        //赞助方式
        $advertise=$this->_model->getAdvertiseName();
        //预算金额
        $money=$this->_model->getMoney();
        //返回数据
        $Data=array(
            'schoolSize'=>$schoolSize,
            'activityType'=>$activityType,
            'provinces'=>$provinces,
            'advertise'=>$advertise,
            'money'=>$money,
            'resultData'=>$resultData,
            'pageRes'=>$pageRes,
            'cities'=>$cities,
            'areas'=>$areas,
        	'page'=>$page
        );
        $this->assign($Data);
        $this->display();
    }

    /**
     * 校园活动详细信息（页面展示）
     * @param int $id
     */
    public function groupDetails($id)
    {
    	//根据id获得数据
    	$row=$this->_model->getGroupDetailsById($id);

    	$this->assign('row',$row);
        $this->display();
    }
    
    /**
     * 添加申请信息AJAX方法
     * @param int $data['id'] 活动ID
     * @param string $data['reason'] 申请原因 
     * 
     * 1.验证是否能申请
     * 2.添加申请数据
     * 
     * @return json
     */
    public function groupApplyAjax()
    {
    	if(IS_AJAX){
    		$data = I('post.');
    		//1.查询该用户是否能够申请此活动
    		$isApply = D('GroupApply')->isApplyGroup($data['id']);
    		if(!$isApply){
    			return send_json(0,'申请失败',D('GroupApply')->getError());
    		}
    		//可以申请
    		$applyRes = D('GroupApply')->addApply($data);
    		if(!$applyRes){
    			return send_json(0,'操作失败',D('GroupApply')->getError());
    		}
    		return send_json(1,'申请成功，请耐心等待审核');
    	}
    }
    
    

}