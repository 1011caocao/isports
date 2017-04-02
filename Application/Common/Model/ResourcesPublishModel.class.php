<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/22
 * Time: 10:43
 */

namespace Common\Model;


use Think\Model;

class ResourcesPublishModel extends Model
{
    //自动验证
    protected $_validate=array(
        array('name','require','活动名称不能为空'),
        array('resource_aid','require','资源类型必选'),
        array('money','require','金额必填'),
        array('resource_desc','require','资源描述必填'),
        array('prepay_ratio','require','预付比例必选'),
        array('activity_start_time','require','活动开始时间不能为空'),
        array('activity_end_time','require','活动结束时间不能为空'),
        array('province_id','require','省份必选'),
        array('city_id','require','城市必选'),
        array('county_id','require','县必选'),
        array('school_id','require','学校必选'),
        array('money','number','金额必须为数字'),
        array('check_id','checkIsEmpty','验收方式必选',1,'function'),

    );
    //自动完成
    protected $_auto=array(
        array('add_time',NOW_TIME),
        array('money','abs','','function'),
    );
    /**
     * 发布资源
     * @return boolean
     */
    public function addResourcePublish()
    {
        switch ($this->data['resource_aid']) {
            case 1:
                if (!I('post.flow_rate')) {
                    $this->error = '日流量必填必填';
                    return false;
                } else {
                    $this->data['people'] = I('post.flow_rate');
                }
                break;
            case 2:
                if (!I('post.square') || !I('post.container_number')) {
                    $this->error = '场馆面积和容纳人数必填';
                    return false;
                } else {
                    $this->data['people'] = I('post.container_number');
                    $this->data['area'] = I('post.square');
                }
                break;
            case 3:
                if (!I('post.fan_number')) {
                    $this->error = '粉丝数量必填';
                    return false;
                } else {
                    $this->data['people'] = I('post.fan_number');
                }
                break;
            case 4:
                if (!I('post.daynumber')) {
                    $this->error = '日受众人数必填';
                    return false;
                } else {
                    $this->data['people'] = I('post.daynumber');
                }
                break;
            case 13:
                $this->data['people'] = '';
                $this->data['area'] = '';
                break;
            default:
                $this->error = '输入不合法';
        }
        //开启事物
        $this->startTrans();
        //判断时间
        $ast=strtotime($this->data['activity_start_time']);
        $aet=strtotime($this->data['activity_end_time']);
        if($ast>$aet){
            $this->error='资源使用开始时间不能大于使用结束时间';
            return false;
        }
        $this->data['activity_start_time']=$ast;
        $this->data['activity_end_time']=$aet;
        //获取当前用户的id
        $uid=get_user_id();
        $this->data['uid']=$uid;
        //发布的活动待审核默认为0
        $this->data['status']=0;
        //城市选择province_name,city_name,county_name
        $this->data['province_name'] = D('Area')->getNameById($this->data['province_id']);
        $this->data['city_name'] = D('Area')->getNameById($this->data['city_id']);
        $this->data['county_name'] = D('Area')->getNameById($this->data['county_id']);
        //根据id查到学校名称
        $this->data['school_name'] = $this->getSchoolNameById($this->data['school_id']);
        //资源类型
        $this->data['resource_aname']=$this->getResourceNameById($this->data['resource_aid']);
        if($this->data['resource_bid']){
            $this->data['resource_bname']=$this->getResourceNameById($this->data['resource_bid']);
        }
        $this->data['check_id'] = implode(',', $this->data['check_id']);
        $res=$this->add();
        if(!$res){
            $this->error='发布失败';
            $this->rollback();
            return false;
        }
        //获取图片信息
        $img=I('post.imgUrl');
        if(empty($img)){
            $this->error='至少上传一张资源图片';
            return false;
        }
        foreach($img as $v){
            if($v){
                $imgData[]=array(
                    'rp_id'=>$res,
                    'resource_path'=>$v,
                    'add_time'=>NOW_TIME,
                );
            }
        }
        if (M('ResourcesImg')->addAll($imgData)===false) {
            $this->error='资源图片添加错误';
            $this->rollback();
            return false;
        }
        //提交
        $this->commit();
        return true;
    }
    /**
     * 得到资源展示的字段，包括
     *资源名称，资源开始结束时间，地区，学校，活动类型，金额，发布企校园组织
     * @return mixed
     */
    public function getResourceList($data = array(),$page = 1,$pageSize = 10)
    {
        //有查询条件
        if($data){
            $condition = $this->conditionHandle($data);
        }
        //查找条件，状态为正常，资源开始时间时间大于现在的时间才能显示
        $condition['rp.status'] = 1;
        $condition['rp.activity_start_time'] = array('gt',NOW_TIME);
        //myPrint($condition);
        $offset = ($page-1)*$pageSize;
        //查询资源发布基本信息
        $rows= $this->field('rp.id,rp.name,a.area_name,rp.money,rp.resource_aname,rp.resource_bname,rp.school_id,cu.company_name,rp.activity_start_time,rp.activity_end_time')
        ->alias('rp')
        ->join('ic_area as a on rp.city_id=a.area_id')
        ->join('ic_certified_user as cu on rp.uid=cu.uid')
        ->where($condition)->order('rp.list_order desc,rp.read_total desc')
        ->limit($offset,$pageSize)
        ->select();
        //判断资源学校是否为多个,将字符串转换为数组
        foreach($rows as $k=>$row){
            //将字符串转换为数组
            $row['school_id']=explode(',',$row['school_id']);
            //如果id为0则显示不限
            if(in_array(0,$row['school_id'])){
                $row['school_name']='不限';
            }else{
                //如果id为多个就显示第一个学校
                $row['school_name']=$this->getSchoolNameById($row['school_id'][0]);
            }
            //资源分类查询，如果有子分类就显示子分类b
            if($row['resource_bname']){
                $row['resource_name']=$row['resource_bname'];
            }else{
                $row['resource_name']=$row['resource_aname'];
            }
            $rows[$k]=$row;
        }
        return $rows;
    }
    /**
     * 得到资源活动的条数
     * @param array $data
     * @return mixed
     */
    public function getResourceCount($data = array())
    {
        if($data){
            $condition = $this->conditionHandle($data);
        }
        //状态为1才能正常显示
        $condition['status'] = array('eq',1);
        return $this->where($condition)->alias('rp')->count();
    }
    /**
     * 处理封装查询语句
     */
    public function conditionHandle($array){
        //排除空数据,重构查询语句
        foreach ($array as $k=>$v){
            if($v){
                $condition['rp.'.$k] = $v;
            }
        }
        //myPrint($condition);
        if(!$condition['rp.province_id']){
            unset($condition['rp.city_id']);
            unset($condition['rp.county_id']);
        }elseif(!$condition['rp.city_id']){
            unset($condition['rp.county_id']);
        }
        //预算金额
        //有详细金额值，优先具体值查询
        if($condition['rp.money_min'] || $condition['rp.money_max']){
            $condition['rp.money'] = array();
            //最小金额
            if($condition['rp.money_min']){
                $condition['rp.money'][] = array('egt',$condition['rp.money_min']);
            }
            //最大金额
            if($condition['rp.money_max']){
                $condition['rp.money'][] = array('elt',$condition['rp.money_max']);
            }
        }elseif($condition['rp.money_type']){
            //查询预算金额类型区间
            $moneyType = D('BusinessPublish')->getMoneyType($condition['rp.money_type']);
            $condition['rp.money'] = array(array('egt',$moneyType['money_min']),array('elt',$moneyType['money_max']));
        }
        if($condition['rp.school_name']){
            $condition['rp.school_name'] = array('like','%'.$condition['rp.school_name'].'%');
        }
        unset($condition['rp.money_max']);
        unset($condition['rp.money_min']);
        unset($condition['rp.money_type']);
        return $condition;
        //myPrint($condition);
    }
	
    /**
     * 根据资源活动ID来查询详情
     * @param int $id
     */
    public function GetResourceDetailById($id){
    	$condition = array('rp.id'=>array('eq',$id),'rp.status'=>array('eq',1));
    	$row = $this->field('rp.*,u.portrait,cu.company_name,cu.icowry_coin,cu.company_size_name as organize_size,cu.cooperation_count,ss.size as school_size')
    	->alias('rp')
    	->join('ic_user as u on u.id=rp.uid')
    	->join('ic_certified_user as cu on rp.uid=cu.uid')
    	->join('ic_school_size as ss on rp.school_size=ss.id')
    	->where($condition)
		->find();
        //查询资源照片
        $where = array('rp_id'=>array('eq',$id),'status'=>array('eq',1));
        $row['img'] = D('ResourcesImg')->where($where)->select();
// 		$row['advertise_name'] = implode('、', $this->getAdvertiseNameById($row['advertise_id']));
		//查询验收方式
		$row['check_type'] = $this->getCheckType($row['check_id']);
// 		myPrint($row);
    	//增加浏览次数
    	$this->addReadTotal($id);
    	return $row;
    }

    /**
     * 我的资源分页数据
     * @param $uid
     * @param int $page
     * @param int $pageSize
     * @return mixed
     */
    public function getMyResource($uid,$page=1,$pageSize=20)
    {
        $offset = ($page-1)*$pageSize;
        //$condition=array('status'=>array(array('eq',1),array('eq',2), 'or'),'uid'=>$uid);
        $condition=array('uid'=>$uid);
        $rows=$this->field('name,activity_end_time,status,money')->where($condition)->order('status asc')->limit($offset,$pageSize)->select();
        //因为根据不同的状态，有不同的显示文字
        $rows=$this->addMyPublishType($rows);
        //根据资源类型不一样，价钱显示不一样
        return $rows;
    }

    /**
     * 我的资源总条数
     * @param $uid
     * @return mixed
     */
    public function getMyResourceCount($uid)
    {
        $condition=array('uid'=>$uid);
        return $this->where($condition)->count();
    }

    /**
     * 增加状态
     * @param $rows
     * @return mixed
     */
    public function addMyPublishType($rows)
    {
        foreach($rows as $k=>$row){
            switch($row['status']){
                case 0:
                    $row['type']='待审核';
                    break;
                case 1:
                    $row['type']='合作中';
                    break;
                case 2:
                    $row['type']='合作中';
                    break; 
                case 3:
                    $row['type']='已完成';
                    break;
                case 4:
                    $row['type']='审核未通过';
            }
            $rows[$k]['type']=$row['type'];
        }
        return $rows;
    }
    /**
     * 资源类型
     * @param int $parent_id
     * @return mixed
     */
    public function getResourceByParentId($parent_id=0)
    {
        return M('ResourceType')->where(array('parent_id'=>$parent_id,'status'=>1))->select();
    }

    /**
     * 根据学校id获得学校名称
     * @param $id
     * @return mixed
     */
    public function getSchoolNameById($id)
    {
        $array=array('status'=>1,'id'=>$id);
        $schoolList=M('School')->where($array)->find();
        return $schoolList['school_name'];
    }

    /**
     * 通过id查找资源名字
     * @param $id
     * @return mixed
     */
    public function getResourceNameById($id)
    {
        $row=D('ResourceType')->field('resource_name')->where(array('id'=>$id))->getField('resource_name');
        return $row;
    }
    
    /**
     * 根据check_id获取该活动的验收方式
     * @param string id 验收方式ID，多个以逗号隔开
     * @return string $str 返回字符串
     */
    public function getCheckType($ids)
    {
    	$where['status'] = 1;
    	$where['id'] = array('in',$ids);
    	return implode('，', D('CheckType')->where($where)->getField('check_name',true));
    }
    
    /**
     * 增加浏览次数
     */
    public function addReadTotal($id){
    	//前端访问，IP限制次数
    	if(isHome() && isSameIp('rp'.$id)){
    		return $this->where(array('id'=>array('eq',$id)))->setInc('read_total',1);
    	}
    }

    /**
     * 后台获取资源发布的所有分页数据
     * @param $data
     * @param $page
     * @param int $pageSize
     * @return mixed
     */
    public function getAllResourcePublish($data,$page,$pageSize=10)
    {
        $offset=($page-1)*$pageSize;
        $rows=$this->where($data)->order('add_time desc')->limit($offset,$pageSize)->select();
        return $rows;
    }

    /**
     * 后台获取资源活动的所有数据条数
     * @param $data
     * @return mixed
     */
    public function getAllResourcePublishCount($data){
        $count=$this->where($data)->count();
        return $count;
    }
    /**
     * 获取资源详情
     * @param $id
     * @return mixed
     */
    public function getResourceInfo($id)
    {
        $row=$this->field('rp.*,ss.size')->alias('rp')
            ->join('ic_school_size as ss on ss.id=rp.school_size')
            ->where(array('rp.id'=>$id))->find();
        //查询资源照片
        $where = array('rp_id'=>array('eq',$id),'status'=>array('eq',1));
        $row['img'] = D('ResourcesImg')->where($where)->select();
// 		$row['advertise_name'] = implode('、', $this->getAdvertiseNameById($row['advertise_id']));
        //查询验收方式
        $row['check_type'] = $this->getCheckType($row['check_id']);
        return $row;
    }

    /**
     * 审核资源
     * @param $id
     * @return bool
     */
    public function checkResource($id)
    {
        //开启事物
        $this->startTrans();
        //查找这个活动发布的用户和活动名称
        $resourceMsg=$this->where(array('id'=>$id))->find();
        $uid=$resourceMsg['uid'];
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
        if (D('BusinessPublish')->addDecCoinLog($uid,1,$resourceMsg['name'])===false) {
            $this->error='添加用户贝壳币日志失败';
            $this->rollback();
            return false;
        }
        //更改资源照片的状态
        if ($this->changeResourceImg($id)===false) {
            $this->error='更改资源照片状态失败';
            $this->rollback();
            return false;
        }
        $this->commit();
        return true;
    }

    /**
     * 更改资源照片状态
     * @param $id
     * @return bool
     */
    public function changeResourceImg($id)
    {
        return M('ResourcesImg')->where(array('rp_id'=>$id))->setField('status',1);
    }
}