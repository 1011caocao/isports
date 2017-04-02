<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/22
 * Time: 10:08
 */

namespace Common\Model;


use Think\Model;

class GroupPublishModel extends Model
{
    //自动验证
    protected $_validate=array(
        array('name','require','活动名称不能为空'),
        array('activity_id','require','活动类型必选'),
        array('money','require','赞助金额必填'),
        array('prepay_ratio','require','预付比例必选'),
        array('apply_start_time','require','开始申请时间不能为空'),
        array('apply_end_time','require','结束申请时间不能为空'),
        array('activity_start_time','require','活动开始时间不能为空'),
        array('activity_end_time','require','活动结束时间不能为空'),
        array('popular','require','人气要求不能为空'),
        array('apply_total','require','活动申请名额不能为空'),
        array('province_id','require','省份必选'),
        array('city_id','require','城市必选'),
        array('county_id','require','县必选'),
        array('school_id','require','学校必选'),
        array('advertise_id','checkIsEmpty','广告植入方式必选',1,'function'),
		array('check_id','checkIsEmpty','验收方式必选',1,'function'),
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
    public function addGroupPublish()
    {
        //判断开始时间小于结束时间
        $apst = strtotime($this->data['apply_start_time']);
        $apet = strtotime($this->data['apply_end_time']);
        $ast = strtotime($this->data['activity_start_time']);
        $aet = strtotime($this->data['activity_end_time']);
        if ($apst > $apet) {
            $this->error = '申请开始时间不能大于申请结束时间';
            return false;
        }
        if ($ast > $aet) {
            $this->error = '活动开始时间不能大于活动结束时间';
            return false;
        }
        $this->data['apply_start_time'] = $apst;
        $this->data['apply_end_time'] = $apet;
        $this->data['activity_start_time'] = $ast;
        $this->data['activity_end_time'] = $aet;
        //获取当前用户的id
        $this->data['uid'] = get_user_id();
        //发布的活动待审核默认为0
        $this->data['status'] = 0;
        //城市选择province_name,city_name,county_name
        $this->data['province_name'] = D('Area')->getNameById($this->data['province_id']);
        $this->data['city_name'] = D('Area')->getNameById($this->data['city_id']);
        $this->data['county_name'] = D('Area')->getNameById($this->data['county_id']);
        //根据id查到学校名称
        $this->data['school_name'] = D('ResourcesPublish')->getSchoolNameById($this->data['school_id']);
        //数组转换为字符串，并以逗号隔开
        $this->data['check_id'] = implode(',', $this->data['check_id']);
        $this->data['advertise_id'] = implode(',', $this->data['advertise_id']);
        $this->data['activity_name'] = D('BusinessPublish')->getActicityNameById($this->data['activity_id']);
        //myPrint($this->data());
        $res=$this->add();
        if(!$res){
            $this->error='发布失败';
            return false;
        }
    }
    /**
     * 得到校园活动展示的字段，包括
     *活动名称，活动开始结束时间，地区，学校，活动类型，金额，发布企校园组织
     * @return mixed
     */
    public function getGroupList($data = array(),$page = 1,$pageSize = 10)
    {
        //有查询条件
        if($data){
            $condition = $this->conditionHandle($data);
        }
        $condition['gp.status'] = 1;
        $condition['gp.apply_end_time'] = array('gt',NOW_TIME);
       // myPrint($condition);
        $offset = ($page-1)*$pageSize;
        return $this->field('gp.id,gp.name,a.area_name,gp.activity_start_time,gp.activity_end_time,gp.school_name,gp.money,gp.activity_name,cu.company_name')->alias('gp')->join('ic_area as a on gp.city_id=a.area_id')->join('ic_certified_user as cu on gp.uid=cu.uid')->where($condition)->order('listorder')->limit($offset,$pageSize)->select();
    }
    /**
     * 处理封装查询语句
     */
    public function conditionHandle($array){
        //排除空数据,重构查询语句
        foreach ($array as $k=>$v){
            if($v){
                $condition['gp.'.$k] = $v;
            }
        }
        //myPrint($condition);
        if(!$condition['gp.province_id']){
            unset($condition['gp.city_id']);
            unset($condition['gp.county_id']);
        }elseif(!$condition['gp.city_id']){
            unset($condition['gp.county_id']);
        }
        //预算金额
        //有详细金额值，优先具体值查询
        if($condition['gp.money_min'] || $condition['gp.money_max']){
            $condition['gp.money'] = array();
            //最小金额
            if($condition['gp.money_min']){
                $condition['gp.money'][] = array('egt',$condition['gp.money_min']);
            }
            //最大金额
            if($condition['gp.money_max']){
                $condition['gp.money'][] = array('elt',$condition['gp.money_max']);
            }
        }elseif($condition['gp.money_type']){
            //查询预算金额类型区间
            $moneyType = D('BusinessPublish')->getMoneyType($condition['gp.money_type']);
            $condition['gp.money'] = array(array('egt',$moneyType['money_min']),array('elt',$moneyType['money_max']));
        }
        if($condition['gp.school_name']){
            $condition['gp.school_name'] = array('like','%'.$condition['gp.school_name'].'%');
        }
        //赞助方式
        if($condition['gp.advertise_id']){
            $condition['gp.advertise_id']=array('like','%'.$condition['gp.advertise_id'].'%');
        }
        unset($condition['gp.money_max']);
        unset($condition['gp.money_min']);
        unset($condition['gp.money_type']);
        return $condition;

    }
    
    /**
     * 查询校园组织的活动详情
	 * @param int $id
	 * @return $row
     */
    public function getGroupDetailsById($id,$type)
    {
        //如果参数为1,则查询出没有status 条件的数据
        if($type=1){
            $condition = array('gp.id'=>array('eq',$id));
        }else{
            $condition = array('gp.id'=>array('eq',$id),'gp.status'=>array('eq',1));
        }
    	$row = $this->field('gp.*,u.portrait,cu.company_name,cu.icowry_coin,cu.company_size_name as organize_size,ss.size as school_size')
    	->alias('gp')
    	->join('ic_user as u on u.id=gp.uid')
    	->join('ic_certified_user as cu on gp.uid=cu.uid')
    	->join('ic_school_size as ss on gp.school_size=ss.id')
    	->where($condition)
		->find();
        //查询广告植入方式
		$row['advertise_name'] = implode('、', $this->getAdvertiseNameById($row['advertise_id']));
		//查询验收方式
		$row['check_type'] = implode('、', $this->getSchoolSize($row['check_id']));
    	//增加浏览次数
    	$this->addReadTotal($id);
    	return $row;
    }
    
    
    /**
     * 得到商业活动的条数
     * @param array $data
     * @return mixed
     */
    public function getGroupCount($data = array())
    {
        if($data){
            $condition = $this->conditionHandle($data);
        }
        //状态为1才能正常显示
        $condition['status'] = array('eq',1);
        $condition['gp.apply_end_time'] = array('gt',NOW_TIME);
        return $this->where($condition)->alias('gp')->count();
    }
    /**
     * 取得赞助广告方式
     * @return mixed
     */
    public function getAdvertiseName()
    {
        return M('AdvertiseType')->where(array('status'=>1))->select();
    }

    /**
     * 根据ID取得赞助广告方式
     * @return mixed
     */
    public function getAdvertiseNameById($id)
    {
    	$data['status'] = 1;
    	$data['id'] = array('in',$id);
    	return M('AdvertiseType')->where($data)->getField('advertise_name',true);
    }
    
    /**
     * 取得预算价格分段
     * @return mixed
     */
    public function getMoney()
    {
        //得到列表
        $moneyList=M('MoneyType')->where(array('status'=>1))->select();
        //数据总条数
        $count=M('MoneyType')->where(array('status'=>1))->count();
        //将最后一条数据的最大值改为以上，方便显示
        $moneyList[$count-1]['money_max']='以上';
        return $moneyList;
    }
    
    /**
     * 查询活动的验收类型
     * $ids 为验收类型ID，多个逗号隔开
     */
    public function getSchoolSize($ids){
    	return M('CheckType')->where(array('id'=>array('in',$ids),'status'=>array('eq',1)))->getField('check_name',true);
    }
    
    /**
     * 增加浏览次数
     */
    public function addReadTotal($id){
    	//前端访问，IP限制次数
    	if(isHome() && isSameIp('gp'.$id)){
    		return $this->where(array('id'=>array('eq',$id)))->setInc('read_total',1);
    	}
    }
    /**
     * 后台获取校园活动的所有分页数据
     * @param $data
     * @param $page
     * @param int $pageSize
     * @return mixed
     */
    public function getAllGroupPublish($data,$page,$pageSize=10)
    {
        $offset=($page-1)*$pageSize;
        $rows=$this->where($data)->order('add_time desc')->limit($offset,$pageSize)->select();
        return $rows;
    }

    /**
     * 后台获取校园活动的所有数据条数
     * @param $data
     * @return mixed
     */
    public function getAllGroupPublishCount($data){
        $count=$this->where($data)->count();
        return $count;
    }
    /**
     * 获取校园活动详情
     * @param $id
     * @return mixed
     */
    public function getGroupInfo($id)
    {
        $row=$this->where(array('id'=>$id))->find();
        //查询广告植入方式
        $row['advertise_name'] = implode('、', $this->getAdvertiseNameById($row['advertise_id']));
        //查询验收方式
        $row['check_type'] = implode('、', $this->getSchoolSize($row['check_id']));
       // myPrint($row);
        return $row;
    }
    public function checkGroup($id)
    {
        //开启事物
        $this->startTrans();
        //查找这个活动发布的用户和活动名称
        $groupMsg=$this->where(array('id'=>$id))->find();
        $uid=$groupMsg['uid'];
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
        if (D('BusinessPublish')->decCoin($uid,1)===false) {
            $this->error='减少用户贝壳币失败';
            $this->rollback();
            return false;
        }
        //添加贝壳币日志
        if (D('BusinessPublish')->addDecCoinLog($uid,1,$groupMsg['name'])===false) {
            $this->error='添加用户贝壳币日志失败';
            $this->rollback();
            return false;
        }
        $this->commit();
        return true;
    }
    /**
     * 下线发布 将状态更改为3 已完成的状态
     * @param $id
     */
    public function deleteGroup($id)
    {
        $this->where(array('id'=>$id))->setField('status',3);
    }
}