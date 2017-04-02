<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/2/17
 * Time: 14:57
 */

namespace Common\Model;


use Think\Model;

class ArtApplyModel extends Model
{
    /**
     * @param $uid
     * @param int $page
     * @param int $pageSize
     * @return mixed
     * 获取我的申请分页数据
     */
    public function getMyApply($uid,$page=1,$pageSize=20)
    {
        $offset = ($page-1)*$pageSize;
        $condition=array('aa.apply_uid'=>$uid);
        $rows=$this->field('aa.style,aa.id,aa.status,cu.real_name,cu.apply_end_time')->alias('aa')->join('ic_certified_user as cu on cu.uid=aa.ar_id')->where($condition)->table('ic_art_apply')
            ->union('SELECT ba.style,ba.id,ba.status,bp.name,bp.apply_end_time FROM ic_business_apply AS ba JOIN ic_business_publish AS bp ON ba.bp_id=bp.id WHERE ba.apply_uid='.$uid.'',true)
            ->union('SELECT ga.style,ga.id,ga.status,gp.name,gp.apply_end_time FROM ic_group_apply AS ga JOIN ic_group_publish AS gp ON ga.gp_id=gp.id WHERE ga.apply_uid='.$uid.'',true)
            ->union('SELECT ra.style,ra.id,ra.status,rp.name,rp.apply_end_time FROM ic_resource_apply AS ra JOIN ic_resources_publish AS rp ON ra.rp_id=rp.id WHERE ra.apply_uid='.$uid.' ORDER BY status desc LIMIT '.$offset.','.$pageSize.'',true)
            ->select();
        $rows=$this->addMyApplyType($rows);
        return $rows;
    }

    /**
     * @param $uid
     * @return int
     * 得到我的申请数据总条数
     */
    public function getMyApplyCount($uid)
    {
        $condition=array('aa.apply_uid'=>$uid);
        $rows=$this->field('aa.id,aa.status,cu.real_name,cu.apply_end_time')->alias('aa')->join('ic_certified_user as cu on cu.uid=aa.ar_id')->where($condition)->table('ic_art_apply')
            ->union('SELECT ba.id,ba.status,bp.name,bp.apply_end_time FROM ic_business_apply AS ba JOIN ic_business_publish AS bp ON ba.bp_id=bp.id WHERE  ba.apply_uid='.$uid.'',true)
            ->union('SELECT ga.id,ga.status,gp.name,gp.apply_end_time FROM ic_group_apply AS ga JOIN ic_group_publish AS gp ON ga.gp_id=gp.id WHERE ga.apply_uid='.$uid.'',true)
            ->union('SELECT ra.id,ra.status,rp.name,rp.apply_end_time FROM ic_resource_apply AS ra JOIN ic_resources_publish AS rp ON ra.rp_id=rp.id WHERE ra.apply_uid='.$uid.'',true)
            ->select();
          return count($rows);
    }
    public function addMyApplyType($rows)
    {
        foreach($rows as $k=>$row){
            switch($row['status']){
                case 0:
                    $row['type']='待审核';
                    break;
                case 1:
                    $row['type']='申请中';
                    break;
                case 2:
                    $row['type']='通过申请';
                    break;
                case -1:
                    $row['type']='被拒绝';
                    break;
                case -2:
                    $row['type']='审核未通过';
                    break;
                case -3:
                    $row['type']='已完成';
                    break;
            }
            $rows[$k]['type']=$row['type'];
        }
        return $rows;
    }

    /**
     * @param $uid
     * @param int $page
     * @param int $pageSize
     * @return mixed
     * 返回待审核分页数据
     */
    public function getScreenList($uid,$page=1,$pageSize=4)
    {
        $offset = ($page-1)*$pageSize;
        //根据当前的用户查找正在申请的用户
        $condition=array('aa.ar_id'=>$uid,'aa.status'=>1);
        $rows=$this->field('aa.add_time,aa.content,iu.portrait,cu.company_name,cu.real_name')->alias('aa')
            ->join('ic_user as iu on iu.id=aa.apply_uid')
            ->join('ic_certified_user as cu on cu.uid=aa.apply_uid')->where($condition)->limit($offset,$pageSize)->select();
        return $rows;
    }

    /**
     * @param $uid
     * @return mixed
     * 获得总的待审核数据条数
     */
    public function getScreenCount($uid)
    {
        $conditon=array('ar_id'=>$uid,'status'=>1);
        $count=$this->where($conditon)->count();
        return $count;
    }

    /**
     * @param $uid
     * @param int $page
     * @param int $pageSize
     * @return mixed
     * 获取带评论分页数据
     */
    public function getCommentList($uid,$page=1,$pageSize=6)
    {
        $offset = ($page-1)*$pageSize;
        //根据当前的用户查找合作成功待评论的用户
        $condition=array('aa.ar_id'=>$uid,'aa.status'=>2,'aa.publish_score'=>'');
        $rows=$this->field('aa.apply_finish_time,iu.portrait,cu.company_name,cu.real_name')->alias('aa')
            ->join('ic_user as iu on iu.id=aa.apply_uid')
            ->join('ic_certified_user as cu on cu.uid=aa.apply_uid')->where($condition)->limit($offset,$pageSize)->select();
        return $rows;
    }

    /**
     * @param $uid
     * @return mixed
     * 待评论总数据
     */
    public function getCommentCount($uid)
    {
        $condition=array('aa.ar_id'=>$uid,'aa.status'=>2,'aa.publish_score'=>'');
        return $this->where($condition)->count();
    }

    /**
     * 我的申请，申请演艺人的详情
     * @param $id
     * @return mixed
     */
    public function getArtApplyDetail($id)
    {
        $row=$this->where(array('id'=>$id))->find();
        return $row;
    }
}