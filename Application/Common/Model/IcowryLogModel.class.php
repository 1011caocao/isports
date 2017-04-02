<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/1/13
 * Time: 19:02
 */

namespace Common\Model;


use Think\Model;

class IcowryLogModel extends Model
{
    /**
     * 获取贝壳币使用记录的分页数据
     * @param $page
     * @param $pageSize
     * @return array
     */
    public function getIcowryList($page,$pageSize)
    {
        //获取当前用户的id
        $uid=get_user_id();
        //分页显示
        $offset = ($page-1)*$pageSize;
        $rows=$this->where(array('uid'=>$uid))->order(array('id'=>'desc',))->limit($offset,$pageSize)->select();
        $list=array();
        foreach($rows as $k=>$row){
            //判断如果为正数就加+
            $list[$k]=$row;
            if($row['coin_number']>0){
                $list[$k]['coin_number']='+'.$row['coin_number'];
            }
        }
        return $list;
    }

    /**
     * 获取贝壳币使用记录的分页数据总条数
     * @return mixed
     */
    public function getIcowryCount()
    {
        //获取当前用户的id
        $uid=get_user_id();
        return $this->where(array('uid'=>$uid))->count();
    }
}