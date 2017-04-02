<?php

namespace Common\Model;

use Think\Model;

class ResourceApplyModel extends Model
{
	
	/**
	 * 查询该资源是否能被此用户申请，验证该活动申请情况。
	 * 
	 * 1.查询传媒资源是否存在
	 * 2.是否时登录
	 * 3.是否为认证角色，是否有权限申请
	 * 4.是否为自己发布的资源
	 * 5.是否申请过，不能重复申请
	 * 6.申请时间是否在内
	 * 7.人数限制
	 * 
	 * @param int $id 该资源ID
	 * $return boolean true为可申请，false为不能被申请
	 */
	public function isApplyResource($id){
		$where['rp_id'] = array('eq',$id);
		$where['status'] = array('eq',1);
		//1.查询传媒资源是否存在
		$rp = D('ResourcesPublish')->where($where)->find($id);
		if(!$rp){
			$this->error = '该资源不存在';
			return false;
		}
		//查询用户ID
		$userId = get_user_id();
		//2.检查是否登录
		if(!$userId){
			$this->error = '未登录，请先登录';
			return false;
		}
		//3.用户是否已认证，判断权限
		if(session('USER.role')<=0){
			$this->error = '请您先认证，再申请该资源';
			return false;
		}
		//4.资源为自己发布的，不能申请。
		if($userId==$rp['uid']){
			$this->error = '不能申请自己发布的资源';
			return false;
		}
		//5.是否申请过此资源，不能重复申请
		$condition['rp_id'] = array('eq',$id);
		$condition['apply_uid'] = array('eq',get_user_id());
		$condition['status'] = array('egt',0);
		$apply = $this->where($condition)->find();
		if($apply){
			$this->error = '您已申请过此资源';
			return false;
		}
		//6.资源时间已过，必须小于资源开始时间
		if($rp['activity_start_time']<NOW_TIME){
			$this->error = '超出该资源时间范围';
			return false;
		}
		//7.资源人数已满
// 		if($rp['apply_success']==$rp['apply_total']){
// 			$this->error = '该资源申请人数已满';
// 			return false;
// 		}
		return true;
	}
	
	/**
     * 添加申请传媒资源的数据
     * 1.添加resource_apply表数据
     * 2.修改resources_publish表申请人数+1
     */
    public function addApply($data){
    	$this->rp_id     = $data['id'];
    	$this->content   = $data['content'];
    	$this->apply_uid = get_user_id();
    	$this->add_time  = NOW_TIME;
//     	myPrint($this->data);
    	$this->startTrans();
    	//1.添加resource_apply表数据
    	if(!$this->add()){
    		$this->error = '插入数据出错';
    		$this->rollback();
    		return false;
    	}
    	//2.修改resource_publish表相关数据
    	$where['id'] = $data['id'];
    	$publishRes = D('ResourcesPublish')->where($where)->setInc('apply_ing');
    	if(!$publishRes){
    		$this->error = '插入数据出错';
    		$this->rollback();
    		return false;
    	}
    	//推送消息(暂缓)
        //扣除贝壳币，ID为2的是申请
    	$coinCost = M('CoinCostType')->where(array('id'=>2))->getField('coin_cost');
   		//第一个参数为数量，第二个为类型：1为增加，2为减少
    	$costRes = setIcowryCoin($coinCost,2);
    	if(!$costRes){
    		$this->error = '插入数据出错';
    		$this->rollback();
    		return false;
    	}
		$this->commit();
		return true;
    }

	/**
	 * 资源申请的详情
	 * @param $id
	 * @return mixed
	 */
	public function getResourceApplyDetail($id)
	{
		$row=$this->where(array('id'=>$id))->find();
		return $row;
	}
	
}