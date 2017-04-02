<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2016/12/27
 * Time: 14:48
 */

namespace Home\Controller;


use Think\Controller;

class ArtController extends CommonController
{
	private $_model;
	
	protected function _initialize(){
		$this->_model = D('CertifiedUser');
	}
	
	
    /**
     * 演艺人才页面
     */
    public function index()
    {
        $certifiedUserModel=D('CertifiedUser');
        //获取查询数据
        $data = I('param.',array());
//         myPrint($data);
        $order=$data['type']?$data['type']:1;
        unset($data['type']);
        unset($data['page']);
        //分页
        $page = I('page',1);
        //每页16条数据
        $pageSize = C('ART_PAGE_SIZE_LIST');
        //获取演艺人信息
        $resultData = $certifiedUserModel->getArtList($data,$page,$pageSize,$order);
        //获取总数量
        $menusCount = $certifiedUserModel->getArtCount($data,$order);
// 		myPrint($menusCount);
		$data['type']=$order;
        $Page = new \Think\Page($menusCount,$pageSize,$data);
        //输出分页样式
        $pageRes = $Page->show();
        //ajax查询返回JSON数据
        if(IS_AJAX){
            $Data = array(
                'resultData'=>$resultData,
                'pageRes'=>$pageRes,
                'order'=>$order,
            	'page'=>$page
            );
            return send_json(1,'获取成功',$Data);
        }
        //获取演艺类型
        $artTypes=M('ArtType')->where(array('status'=>array('eq','1')))->order('id desc')->select();
        //获得城市
        $provinces=D('Area')->getListByParentId();
        //查询城市
        $cities=D('Area')->getListByParentId($data['province_id']);
        //查询县级
        $areas=D('Area')->getListByParentId($data['city_id']);
        $Data=array(
            'artTypes'=>$artTypes,
            'provinces'=>$provinces,
            'cities'=>$cities,
            'areas'=>$areas,
            'pageRes'=>$pageRes,
            'resultData'=>$resultData,
        	'page'=>$page,
        	'type'=>$order
        );
        $this->assign($Data);
        $this->display();
    }
    
    /**
     * 演艺人页面，申请页面
     * @param int $id 演艺人ID
     */
    public function artDetails($id)
    {
    	//获取资源详情
    	$row = $this->_model->GetArtOne($id);
//     	    	myPrint($row);
    	$this->assign('row',$row);
    	$this->display('artDetails');
    
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