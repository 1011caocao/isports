<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/2/7
 * Time: 10:37
 */

namespace Common\Model;


use Think\Model;

class CertifiedUserModel extends  Model
{
    /**
     * @param $uid
     *1 后台操作通过认证的用户，将用户信息从认证临时表中(certification)转存到用户认证表(certified_user)中
     *  在转存的过程中，将certified_user中的status改为1
     *2 将用户认证的角色和上传的头像转存到user基本表中
     *3 添加入驻信息到身份认证统计表中(identity_count)
     *4 身份证表状态更改每个数据表的数据
     *5 根据每个角色的不同更改图片的状态
     *6 认证成功之后，每个用户赠送相应的贝壳币
     **/
    public function verify($uid)
    {
        //查找当前的认证用户的认证信息
        $row=M('Certification')->field(array('option_name','option_time','add_time'),true)->where(array('uid'=>$uid))->find();
        //保存该用户的角色
        $role=$row['role'];
        unset($row['role']);
        //保存该用户的头像
        $portrait=$row['portrait'];
        unset($row['portrait']);
        //添加的时间
        //如果有公司规模添加公司规模冗余字段
        if($row['company_size']){
            //判断是传媒公司还是校园组织
            if($role==2){
                $row['company_size_name']=M('CompanySize')->where(array('id'=>$row['company_size']))->getField('size');
            }else{
                $row['company_size_name']=M('OrganizeSize')->where(array('id'=>$row['company_size']))->getField('size');
            }
        }
        //更改status状态
        $row['status']=1;
        $row['add_time']=NOW_TIME;
        //开启事物
        $this->startTrans();
        //转存基本信息
        if ($this->add($row)===false) {
            $this->error='保存认证信息失败';
            $this->rollback();
            return false;
        }
        //给这条信息操作的操作人员并保存certification表中
        if ($this->saveMsgCertification($uid)===false) {
            $this->error='记录操作人员出错';
            $this->rollback();
            return false;
        }
        //更改user表中的头像和状态和认证角色
        if ($this->changeUser($uid,$role,$portrait)===false) {
            $this->error='保存基本信息失败';
            $this->rollback();
            return false;
        }
        //添加入驻信息
        if ($this->addCount($role)===false) {
            $this->error='保存入驻统计信息失败';
            $this->rollback();
            return false;
        }
        //认证之后添加十个珍珠币在贝壳币相应表中 认证对应的状态为4
        if ($this->addIcon($uid)===false) {
            $this->error='保存贝壳币记录失败';
            $this->rollback();
            return false;
        }
        //身份证照片状态更改
        if ($this->changeIdentityImg($uid)===false) {
            $this->error='身份证照片状态修改失败';
            $this->rollback();
            return false;
        }
        //有企业风采的角色 将企业风采的对应的数据状态更改为1
        switch($role){
            case 1://甲方企业
                if ($this->changeCompanyImg($uid)===false) {
                    $this->error='企业风采状态修改失败';
                    $this->rollback();
                    return false;
                }
                break;
            case 2://传媒公司
                if ($this->changeCaseShow($uid)===false) {
                    $this->error='案例展示状态修改失败';
                    $this->rollback();
                    return false;
                }
                break;
            case 3://校园组织
                if ($this->changeCompanyImg($uid)===false) {
                    $this->error='企业风采状态修改失败';
                    $this->rollback();
                    return false;
                }
                if ($this->changeCaseShow($uid)===false) {
                    $this->error='案例展示状态修改失败';
                    $this->rollback();
                    return false;
                }
                break;
            case 4://演艺人
                if ($this->changeCompanyImg($uid)===false) {
                    $this->error='企业风采状态修改失败';
                    $this->rollback();
                    return false;
                }
                if ($this->changeArtLicence($uid)===false) {
                    $this->error='演艺人相关证书状态修改失败';
                    $this->rollback();
                    return false;
                }
                break;
            default:
                break;
        }
        $this->commit();
        return true;
    }

    /**\
     * 记录当前认证的操作人员
     * @param $uid
     * @return bool
     */
    public function saveMsgCertification($uid)
    {
        //记录当前给这条记录操作的人员
        $optionData=array(
            'status'=>1,
            'uid'=>$uid,
            'option_name'=>session('adminUser.realname'),
            'option_time'=>NOW_TIME
        );
        return M('Certification')->save($optionData);
    }
    /**
     * @param $uid
     * @return bool
     * 演艺人相关证书状态修改
     */
    public function changeArtLicence($uid)
    {
        return M('ArtLicence')->where(array('uid'=>$uid))->setField('status',1);

    }
    /**
     * @param $uid
     * @return bool
     * 添加贝壳币使用记录
     */
    public function addIcon($uid)
    {
        $coin_cost_name=M('CoinCostType')->where(array('id'=>4))->getField('coin_cost_name');
        $coinData=array(
            'uid'=>$uid,
            'coin_cost_id'=>4,
            'coin_cost_name'=>$coin_cost_name,
            'coin_event'=>$coin_cost_name,
            'add_time'=>NOW_TIME,
            'coin_number'=>C('I_COIN_CERTIFIED')
        );
        return M('IcowryLog')->add($coinData);
    }

    /**
     * @param $role
     * @return bool
     * 添加入驻信息
     */
    public function addCount($role)
    {
        return M('IdentityCount')->where(array('id'=>$role))->setInc('count',1);

    }

    /**
     * @param $uid
     * @return bool
     * 案例展示状态修改
     */
    public function changeCaseShow($uid)
    {
       return M('CaseShow')->where(array('uid'=>$uid))->setField('status',1);
    }
    /**
     * @param $uid
     * @return bool
     * 更改身份证照片状态
     */
    public function changeIdentityImg($uid)
    {
        return M('IdentityImg')->where(array('uid'=>$uid))->setField('status',1);
    }
    /**
     * @param $uid
     * @param $role
     * @param $portrait
     * @return bool
     * 次修改user表中的数据
     */
    public function changeUser($uid,$role,$portrait)
    {
        $userMsg=array(
            'id'=>$uid,
            'role'=>$role,
            'portrait'=>$portrait,
            'status'=>1
        );
        return M('User')->save($userMsg);
    }

    /**
     * @param $uid
     * @return bool
     * 更改企业风采图片
     */
    public function changeCompanyImg($uid)
    {
       return M('CompanyImg')->where(array('uid'=>$uid))->setField('status',1);

    }
    /**
     * 分页演艺人数据
     * @return array
     */
    public function getList()
    {
        //得到当前用户的id
        $uid=get_user_id();
        //获取基本信息
        $row=$this->where(array('uid'=>$uid))->find();
        //删除身份证信息
        unset($row['identity']);
        //获取当前用户的认证角色
        $role=session('USER.role');
        //获取企业风采图片
        if($role==1||$role==3||$role==4){
            $companyImgs=M('CompanyImg')->where(array('uid'=>$uid,'status'=>1))->select();
        }
        if($role==4){
            $artLicences=M('ArtLicence')->where(array('uid'=>$uid,'status'=>1))->select();
        }
       //获取案例展示
        if($role==2||$role==3){
            $caseShows=M('CaseShow')->where(array('uid'=>$uid,'status'=>1))->select();
        }
        //案例中的照片有可能只有两张或者一张,先做处理，方便前端展示
        foreach($caseShows as $k=>$v){
            $v['caseShowImgs']=(array_filter(array($v['path1'],$v['path2'],$v['path3'])));
            $caseShows[$k]=$v;
        }
        //myPrint($row);
//        myPrint($caseShows);
        return array(
            'row'=>$row,
            'companyImgs'=>$companyImgs,
            'caseShows'=>$caseShows,
            'artLicences'=>$artLicences
        );

    }

    /**
     * 获取演艺人才的分页数据
     * @param array $data
     * @param int $page
     * @param int $pageSize
     * @param $order
     * @return mixed
     */
    public function getArtList($data = array(),$page = 1,$pageSize = 16,$order)
    {
        //排序
        $order=$this->doOrder($order);
        //有查询条件
        if($data){
            $condition = $this->conditionHandle($data);
        }
        $offset = ($page-1)*$pageSize;
        $rows= $this->field('ar.uid,ar.real_name,ar.height,ar.city_name,ar.price,at.name,ar.art_type,u.portrait')->alias('ar')->join('ic_art_type as at on ar.art_type=at.id')->join('ic_user as u on u.id=ar.uid')->where($condition)->order('listorder desc')->limit($offset,$pageSize)->order($order)->select();
        //myPrint($rows);
        return $rows;
    }

    /**
     * 处理筛选条件
     * @param $array
     * @return mixed
     */
    public function conditionHandle($array)
    {
        //排除空数据,重构查询语句
        foreach ($array as $k=>$v){
            if($v){
                $condition['ar.'.$k] = $v;
            }
        }
        //myPrint($condition);
        if(!$condition['ar.province_id']){
            unset($condition['ar.city_id']);
            unset($condition['ar.county_id']);
        }elseif(!$condition['ar.city_id']){
            unset($condition['ar.county_id']);
        }
       // myPrint($condition);
        return $condition;
    }

    /**
     * 演艺人的总数目
     * @param array $data
     * @return mixed
     */
    public function getArtCount($data=array(),$order)
    {
        $order=$this->doOrder($order);
        if($data){
            $condition = $this->conditionHandle($data);
        }
        return $this->where($condition)->alias('ar')->order($order)->count();
    }

    /**
     * 筛选排序条件
     * @param $order
     * @return string
     */
    public function doOrder($order){
        //如果没有传值就默认为价格排序
        switch($order){
            case 0:
                $order='price desc';
                break;
            case 1:
                $order='price desc';
                break;
            case 3:
                $order='score desc';
                break;
            case 2:
                $order='read_total desc';
                break;
            default:
                $this->error='非法操作';
        }
        return $order;
    }

    /**
     * 我的演艺页面数据
     * @param $uid
     * @return bool|mixed
     */
    public function getMyArt($uid)
    {
        if(session('USER.role')!=4){
            $this->error='并没有认证演艺人';
            return false;
        }
        $condition=array('uid'=>$uid);
        $row=$this->field('real_name,price,height,description,city_name')->where($condition)->find();
        return $row;
    }

    /**
     * 我的申请中演艺人详情
     * @param $id
     * @return mixed
     */
    public function getArtDetail($id)
    {
        $uid=M('ArtApply')->where(array('id'=>$id))->getField('ar_id');
        $condition=array('uid'=>$uid);
        $row=$this->alias('ic')->field('ic.real_name,ic.price,ic.height,ic.description,ic.city_name,iu.portrait,it.name')
            ->join('ic_user as iu on ic.uid=iu.id')
            ->join('ic_art_type as it on ic.art_type=it.id')
            ->where($condition)->find();
        return $row;
    }
    
    /**
     * 根据ID获取演艺人信息
     * @param int $id 演艺人ID
     */
    public function getArtOne($id){
    	//获取基本信息
    	$row = $this->find($id);
    	if(!$row){
    		$this->error = '不存在的用户';
    		return false;
    	}
    	//获取演艺人风采照片
    	$row['company_img'] = $this->getCompanyImg($id);
    	//获取演艺人证书
    	$row['art_licence'] = $this->getArtLicence($id);
    	return $row;
    	
    }
    
    /**
     * 根据ID获取认证用户的企业风采照片或者演艺人风采照片(company_img表)
     * @param int $id 认证用户ID
     * 
     * @return mixed
     */
    public function getCompanyImg($id){
    	$condition['uid'] = array('eq',$id);
    	$condition['status'] = 1;
    	return M('CompanyImg')->where($condition)->select();
    }
    
    
    /**
     * 根据ID获取演艺人的证书(art_licence表)
     * @param int $id 演艺人ID
     *
     * @return mixed
     */
    public function getArtLicence($id){
    	$condition['uid'] = array('eq',$id);
    	$condition['status'] = 1;
    	return M('ArtLicence')->where($condition)->select();
    }
}