<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/21
 * Time: 9:42
 */

namespace Common\Model;


use Think\Model;

class BusinessPublishModel extends Model
{
	//自动验证
	protected $_validate=array(
        array('name','require','活动名称不能为空'),
        array('activity_id','require','活动必选'),
        array('money','require','经费预算必填'),
        array('prepay_ratio','require','预付比例必选'),
        array('apply_start_time','require','开始申请时间不能为空'),
        array('apply_end_time','require','结束申请时间不能为空'),
        array('activity_start_time','require','活动开始时间不能为空'),
        array('activity_end_time','require','活动结束时间不能为空'),
        array('popular','require','人气要求不能为空'),
		array('apply_total','require','活动申请名额不能为空'),
		array('check_id','checkIsEmpty','验收方式必选',1,'function'),
		array('campaign_id','checkIsEmpty','活动宣传方式必选',1,'function'),
		array('money','number','赞助金额必须为数字'),
		array('popular','number','人气要求必须为数字'),
		array('apply_total','number','活动申请名额必须为数字'),
	);
	//自动完成
	protected $_auto=array(
		array('add_time',NOW_TIME),
		array('money','abs','','function'),
		array('popular','abs','','function'),
		array('apply_total','abs','','function'),
	);
	public function addBusinessPublish()
	{
		//获取当前用户的id
		$uid=get_user_id();
		//判断当前用户的贝壳币是否有余额
		$this->checkUserCoin($uid);
		//判断开始时间小于结束时间
		$apst=strtotime($this->data['apply_start_time']);
		$apet=strtotime($this->data['apply_end_time']);
		$ast=strtotime($this->data['activity_start_time']);
		$aet=strtotime($this->data['activity_end_time']);
		if($apst>$apet){
			$this->error='申请开始时间不能大于申请结束时间';
			return false;
		}
		if($ast>$aet){
			$this->error='活动开始时间不能大于活动结束时间';
			return false;
		}
		if($apet>$ast){
			$this->error = '申请活动结束时间不能大于活动开始时间';
			return false;
		}
		$this->data['apply_start_time']=$apst;
		$this->data['apply_end_time']=$apet;
		$this->data['activity_start_time']=$ast;
		$this->data['activity_end_time']=$aet;
		//发布的活动待审核默认为0
		$this->data['status']=0;
		$this->data['uid']=$uid;
		//城市选择province_name,city_name,county_name
		//判断城市是否选择为不限
		if($this->data['province_id']) {
			$this->data['province_name'] = D('Area')->getNameById($this->data['province_id']);
			if ($this->data['city_id']) {
				$this->data['city_name'] = D('Area')->getNameById($this->data['city_id']);
				if ($this->data['province_id']) {
					$this->data['county_name'] = D('Area')->getNameById($this->data['county_id']);
					if ($this->data['school_id']) {
						//根据id查到学校名称
						$this->data['school_name'] = implode(',',$this->getSchoolNamesByIds($this->data['school_id']));
					}
				}
			}
		}
		//判断是否选择学校
		//数组转换为字符串，并以逗号隔开
		$this->data['check_id']=implode(',',$this->data['check_id']);
		$this->data['campaign_id']=implode(',',$this->data['campaign_id']);
		$this->data['activity_name']=$this->getActicityNameById($this->data['activity_id']);
		$res=$this->add();
		if(!$res){
			$this->error='发布失败';
			return false;
		}
	}
    /**
     * 得到商业活动展示的字段，包括
     * 活动名称，活动开始结束时间，地区，学校，活动类型，金额，发布企业
     * 用于首页显示
     * @return mixed
     */
    public function getBusinessList($data = array(),$page = 1,$pageSize = 10)
    {
    	//有查询条件
    	if($data){
	    	$condition = $this->conditionHandle($data);
    	}
	    //查找条件，状态为正常，申请时间大于现在的时间才能显示
        $condition['bp.status'] = 1;
        $condition['bp.apply_end_time'] = array('gt',NOW_TIME);
        $offset = ($page-1)*$pageSize;
        $rows= $this->field('bp.id,bp.name,a.area_name,bp.activity_start_time,bp.school_id,bp.activity_end_time,bp.money,bp.activity_name,cu.company_name')->alias('bp')->join('ic_area as a on bp.city_id=a.area_id')->join('ic_certified_user as cu on bp.uid=cu.uid')->where($condition)->order('list_order desc')->limit($offset,$pageSize)->select();
		//判断资源学校是否为多个,将字符串转换为数组
		foreach($rows as $k=>$row){
			//将字符串转换为数组
			$row['school_id']=explode(',',$row['school_id']);
			//如果id为0则显示不限
			if(in_array(0,$row['school_id'])){
				$row['school_name']='不限';
			}else{
				//如果id为多个就显示第一个学校
				$row['school_name']=D('ResourcesPublish')->getSchoolNameById($row['school_id'][0]);
			}
			$rows[$k]=$row;
		}
		return $rows;
    }

	/**
	 * @param $uid 传入该用户的id
	 * @param $p
	 * 查找我的发布，发布信息
	 */
	public function getMyPublish($uid,$page=1,$pageSize=20)
	{
		$offset = ($page-1)*$pageSize;
		//$condition=array('status'=>array(array('eq',1),array('eq',2), 'or'),'uid'=>$uid);
		$condition=array('uid'=>$uid);
		$rows=$this->field('id,style,name,apply_end_time,apply_ing,status')->table('ic_business_publish')->where($condition)->union('SELECT `id`,`style`,`name`,`apply_end_time`,`apply_ing`,`status` FROM ic_group_publish WHERE `uid`='.$uid.' ORDER BY `status` asc LIMIT '.$offset.','.$pageSize.'',true)->select();
		$rows=D('ResourcesPublish')->addMyPublishType($rows);
		return $rows;
	}

	public function getMyPublishCount($uid)
	{
//		$condition=array('status'=>array(array('eq',1),array('eq',2), 'or'),'uid'=>$uid);
		$condition=array('uid'=>$uid);
		$row=$this->field('name,apply_end_time,apply_ing,status')->table('ic_business_publish')->where($condition)->union('SELECT `name`,`apply_end_time`,`apply_ing`,`status` FROM ic_group_publish WHERE `uid`='.$uid.'',true)->select();
		 return count($row);
	}
    /**
     * 得到商业活动的条数
     * @param array $data
     * @return mixed
     */
    public function getBusinessCount($data = array())
    {
    	if($data){
    		$condition = $this->conditionHandle($data);
    	}
        //状态为1才能正常显示
        $condition['status'] = array('eq',1);
        return $this->where($condition)->alias('bp')->count();
    }

    /**
     * 处理封装查询语句
     */
    public function conditionHandle($array){
    	//排除空数据,重构查询语句
    	foreach ($array as $k=>$v){
    		if($v){
    			$condition['bp.'.$k] = $v;
    		}
    	}
		//myPrint($condition);
		if(!$condition['bp.province_id']){
			unset($condition['bp.city_id']);
			unset($condition['bp.county_id']);
		}elseif(!$condition['bp.city_id']){
			unset($condition['bp.county_id']);
		}
    	//预算金额
    	//有详细金额值，优先具体值查询
    	if($condition['bp.money_min'] || $condition['bp.money_max']){
    		$condition['bp.money'] = array();
    		//最小金额
    		if($condition['bp.money_min']){
    			$condition['bp.money'][] = array('egt',$condition['bp.money_min']);
    		}
    		//最大金额
    		if($condition['bp.money_max']){
    			$condition['bp.money'][] = array('elt',$condition['bp.money_max']);
    		}
    	}elseif($condition['bp.money_type']){
    		//查询预算金额类型区间
    		$moneyType = $this->getMoneyType($condition['bp.money_type']);
    		$condition['bp.money'] = array(array('egt',$moneyType['money_min']),array('elt',$moneyType['money_max']));
    	}
    	if($condition['bp.school_name']){
    		$condition['bp.school_name'] = array('like','%'.$condition['bp.school_name'].'%');
    	}
    	unset($condition['bp.money_max']);
    	unset($condition['bp.money_min']);
    	unset($condition['bp.money_type']);
    	return $condition;

    }
	/**
	 * 查询商业活动详情
	 * @param int $id
	 * @return $row
	 */
	public function getBusinessDetailsById($id,$type)
	{
		//查询活动详情数据
		if($type==1){
			$condition=array('bp.id'=>$id);
		}else{
			$condition=array('bp.id'=>$id,'bp.status'=>1);
		}
		$row=$this->field('bp.*,iu.portrait,cu.company_name,cu.icowry_coin,ss.size as school_size')
		->alias('bp')
		->join('ic_user as iu on iu.id=bp.uid')
		->join('ic_certified_user as cu on cu.uid=bp.uid')
		->join('ic_school_size as ss on bp.school_size=ss.id')
		->where($condition)
		->find();
		//查询活动类型
		$row['campaign_name'] = implode('、', $this->getCampaignNameById($row['campaign_id']));
		//查询验收方式
		$row['check_name'] = implode('、', $this->getCheckTypeById($row['check_id']));
// 		myPrint($row);
		//增加浏览次数
		$this->addReadTotal($id);
		return $row;
	}
	/**
	 * 查询活动的活动类型
	 * $ids 为活动类型ID，多个逗号隔开
	 */
	public function getCampaignNameById($ids){
		return M('CampaignType')->where(array('id'=>array('in',$ids)))->getField('campaign_name',true);
	}
	/**
	 * 查询活动的验收类型
	 * $ids 为验收类型ID，多个逗号隔开
	 */
	public function getCheckTypeById($ids){
		return M('CheckType')->where(array('id'=>array('in',$ids),'status'=>array('eq',1)))->getField('check_name',true);
	}
	
	/**
	 * 增加浏览次数
	 */
	public function addReadTotal($id){
		//前端访问，IP限制次数
		if(isHome() && isSameIp('bp'.$id)){
			return $this->where(array('id'=>array('eq',$id)))->setInc('read_total',1);
		}
	}
	
    /**
     * 学校规模
     * @return mixed
     */
    public function getSchoolSize()
    {
        return M('SchoolSize')->select();
    }

    /**
     * 活动类型
     * @return mixed
     */
    public function getActivityType()
    {
        return M('ActivityType')->order('id desc')->where(array('status'=>1))->select();
    }

	/**
	 * 根据id查找活动名字
	 * @param $id
	 * @return mixed
	 */
	public function getActicityNameById($id)
	{
		$row=M('ActivityType')->find($id);
		return $row['activity_name'];
	}
    /**
     * 金额区间
     * @return mixed
     */
    public function getMoneyType($moneyType){
    	return M('MoneyType')->find($moneyType);
    }

	/**
	 * 活动宣传方式
	 * @return mixed
	 */
	public function getCampaignType()
	{
		return M('CampaignType')->order('id desc')->where(array('status'=>1))->select();
	}

	/**
	 * 活动验收方式
	 * @return mixed
	 */
	public function getCheckType()
	{
		return M('CheckType')->where(array('status'=>1))->select();
	}

	/**
	 * 通过多个学校id查找学校名字
	 * @param $ids
	 * @return array
	 */
	public function getSchoolNamesByIds($ids)
	{
		$where['id'] = array('in', $ids);
		$rows=M('School')->field('school_name')->where($where)->select();
		$list=array();
		foreach($rows as $k=>$v){
			$list[$k]=$v['school_name'];
		}
		return $list;
	}

	/**
	 * 发布时，检查用户的贝壳币是否足够
	 * @param $uid
	 * @return bool
	 */
	public function checkUserCoin($uid)
	{
		$userCoin=M('CertifiedUser')->where(array('uid'=>$uid))->getField('icowry_coin');
		if($userCoin<1){
			$this->error='抱歉您的贝壳币不足';
			return false;
		}
	}

	/**
	 * 后台获取商业活动的所有分页数据
	 * @param $data
	 * @param $page
	 * @param int $pageSize
	 * @return mixed
	 */
	public function getAllBusinessPublish($data,$page,$pageSize=10)
	{
		$offset=($page-1)*$pageSize;
		$rows=$this->where($data)->order('add_time desc')->limit($offset,$pageSize)->select();
		return $rows;
	}

	/**
	 * 后台获取商业活动的所有数据条数
	 * @param $data
	 * @return mixed
	 */
	public function getAllBusinessPublishCount($data){
		$count=$this->where($data)->count();
		return $count;
	}

	/**
	 * 获取商业活动详情
	 * @param $id
	 * @return mixed
	 */
	public function getBusinessInfo($id)
	{
		$row=$this->field('bp.*,ss.size')->alias('bp')
			->join('ic_school_size as ss on ss.id=bp.school_size')
		    ->where(array('bp.id'=>$id))->find();
		//查询活动类型
		$row['campaign_name'] = implode('、', $this->getCampaignNameById($row['campaign_id']));
		//查询验收方式
		$row['check_name'] = implode('、', $this->getCheckTypeById($row['check_id']));
		return $row;
	}

	/**
	 * 1记录操作这条数据的审核人员和时间并更改这条消息的状态
	 * 2扣除发布这条活动的用户的贝壳币
	 * 3将贝壳币使用加入日志
	 * 4
	 * @param $id
	 */
	public function checkBusiness($id)
	{
		//开启事物
		$this->startTrans();
		//查找这个活动发布的用户和活动名称
		$businessMsg=$this->where(array('id'=>$id))->find();
		$uid=$businessMsg['uid'];
		//判断当前的用户的贝壳是否大于1
		$userCoin=M('CertifiedUser')->where(array('uid'=>$uid))->getField('icowry_coin');
		if($userCoin<1){
			$this->error='该用户的贝壳币不足';
			return false;
		}
		//记录当前给这条记录操作的人员和更改状态
		$optionData=array(
			'id'=>$id,
			'status'=>1,
			'option_name'=>session('adminUser.realname'),
			'option_time'=>NOW_TIME
		);
		if ($this->save($optionData)===false) {
			$this->error='记录操作人员出错';
			$this->rollback();
			return false;
		}

		//将用户的贝壳币减少
		if ($this->decCoin($uid,1)===false) {
			$this->error='减少用户贝壳币失败';
			$this->rollback();
			return false;
		}
		//添加贝壳币日志
		if ($this->addDecCoinLog($uid,1,$businessMsg['name'])===false) {
			$this->error='添加用户贝壳币日志失败';
			$this->rollback();
			return false;
		}
		$this->commit();
		return true;
	}

	/**
	 * @param $uid 用户id
	 * @param $cid 珍珠币类型id
	 * @return bool
	 */
	public function decCoin($uid,$cid)
	{
		//查找表中对应的扣除金额
		$coin=M('CoinCostType')->where(array('id'=>$cid))->getField('coin_cost');
		 return M('CertifiedUser')->where(array('uid'=>$uid))->setDec('icowry_coin',$coin);
	}

	/**
	 * 贝壳币减少添加到日志
	 * @param $uid 用户id
	 * @param $cid 珍珠币类型id
	 * @param $activityName 活动id
	 * @return bool
	 */
	public function addDecCoinLog($uid,$cid,$activityName)
	{
		$coinType=M('CoinCostType')->where(array('id'=>$cid))->find();
		$coinLog=array(
			'uid'=>$uid,
			'coin_cost_id'=>$coinType['id'],
			'coin_cost_name'=>$coinType['coin_cost_name'],
			'coin_number'=>'-'.$coinType['coin_cost'],
			'coin_event'=>$activityName?$activityName:$coinType['coin_cost_name'],
			'add_time'=>NOW_TIME
		);
		 return M('IcowryLog')->add($coinLog);
	}

	/**
	 * 下线发布 将状态更改为3 已完成的状态
	 * @param $id
	 */
	public function deleteBusiness($id)
	{
		$this->where(array('id'=>$id))->setField('status',3);
	}
}