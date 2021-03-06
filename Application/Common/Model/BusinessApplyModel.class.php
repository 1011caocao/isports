<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/2/22
 * Time: 17:54
 */

namespace Common\Model;


use Think\Model;

class BusinessApplyModel extends Model
{
    /**
     * @param $id
     * @param $style
     * @param int $page
     * @param int $pageSize
     * @return mixed
     * 得到我的发布中的发布详情分页数据
     */
    public function getApplyDetailList($id,$style,$page=1,$pageSize=6)
    {
        $offset = ($page-1)*$pageSize;
        //判断为商业活动
        if($style==1){
            $condition=array('ba.status'=>array(array('eq',2),array('eq',1),array('eq',-2), 'or'),'ba.bp_id'=>$id);
            $row=$this->field('ba.id,ba.status,ba.add_time,ba.content,iu.portrait,cu.company_name,cu.real_name')->alias('ba')
                ->join('ic_user as iu on iu.id=ba.apply_uid')
                ->join('ic_certified_user as cu on cu.uid=ba.apply_uid')
                ->where($condition)->limit($offset,$pageSize)->order('ba.status desc')->select();
        }
        if($style==2){
            $condition=array('ga.status'=>array(array('eq',2),array('eq',1),array('eq',-2), 'or'),'ga.gp_id'=>$id);
            $row=M('GroupApply')->field('ga.id,ga.status,ga.add_time,ga.content,iu.portrait,cu.company_name,cu.real_name')->alias('ga')
                ->join('ic_user as iu on iu.id=ga.apply_uid')
                ->join('ic_certified_user as cu on cu.uid=ga.apply_uid')
                ->where($condition)->limit($offset,$pageSize)->order('ga.status desc')->select();
        }
        return $row;
    }

    /**
     * @param $id
     * @param $style
     * @return mixed
     * 我的发布发布详情我的发布总数据
     */
    public function getApplyDetailCount($id,$style)
    {
        if($style==1){
            $condition=array('status'=>array(array('eq',2),array('eq',1),array('eq',-2), 'or'),'bp_id'=>$id);
            $count=$this->where($condition)->count();
        }
        if($style==2){
            $condition=array('status'=>array(array('eq',2),array('eq',1),array('eq',-2), 'or'),'gp_id'=>$id);
            $count=M('GroupApply')->where($condition)->count();
        }
        return $count;
    }

    public function getCommentList($id,$style)
    {

    }

    public function getCommentCount($id,$style)
    {

    }
    
    /**
     * 查询该活动是否能被此用户申请，验证该活动申请情况。
     *
     * 1.查询商业活动是否存在
     * 2.是否已登录
     * 3.是否为认证角色，是否有权限申请
     * 4.是否为自己发布的活动
     * 5.是否申请过，不能重复申请
     * 6.申请时间是否在内
     * 7.人数限制
     *
     * @param int $id 该活动ID
     * $return boolean true为可申请，false为不能被申请
     */
    public function isApplyBusiness($id){
    	$where['bp_id'] = array('eq',$id);
    	$where['status'] = array('eq',1);
    	//1.查询商业活动是否存在
    	$bp = D('BusinessPublish')->where($where)->find($id);
    	if(!$bp){
    		$this->error = '该活动不存在';
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
    		$this->error = '请您先认证，再申请该活动';
    		return false;
    	}
    	//4.活动为自己发布的，不能申请。
    	if($userId==$bp['uid']){
    		$this->error = '不能申请自己发布的活动';
    		return false;
    	}
    	//5.是否申请过此活动，不能重复申请
    	$condition['bp_id'] = array('eq',$id);
    	$condition['apply_uid'] = array('eq',get_user_id());
    	$condition['status'] = array('egt',0);
    	$apply = $this->where($condition)->find();
    	if($apply){
    		$this->error = '您已申请过此活动';
    		return false;
    	}
    	//6.申请时间已过
    	if($bp['apply_start_time']>NOW_TIME || $bp['apply_end_time']<NOW_TIME){
    		$this->error = '超出申请时间范围';
    		return false;
    	}
    	//7.活动人数已满
    	if($bp['apply_success']==$bp['apply_total']){
    		$this->error = '该活动申请人数已满';
    		return false;
    	}
    	return true;
    }
    
    /**
     * 添加申请商业活动的数据
     * 1.添加business_apply表数据
     * 2.修改business_publish表申请人数+1
     */
    public function addApply($data){
    	$this->bp_id     = $data['id'];
    	$this->content   = $data['content'];
    	$this->apply_uid = get_user_id();
    	$this->add_time  = NOW_TIME;
//     	myPrint($this->data);
    	$this->startTrans();
    	//1.添加business_apply表数据
    	if(!$this->add()){
    		$this->error = '插入数据出错';
    		$this->rollback();
    		return false;
    	}
    	//2.修改business_publish表相关数据
    	$where['id'] = $data['id'];
    	$publishRes = D('BusinessPublish')->where($where)->setInc('apply_ing');
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
	 * 商业活动申请的详情
	 * @param $id
	 * @return mixed
	 */
	public function getBusinessApplyDetail($id)
	{
		$row=$this->where(array('id'=>$id))->find();
		return $row;
    }
}