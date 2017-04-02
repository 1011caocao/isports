<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2016/12/26
 * Time: 14:02
 */

namespace Home\Controller;


use Think\Controller;

class AddressController extends CommonController
{
    /**
     * @var \Common\Model\AreaModel
     *
     */
    private $_model;
    protected function _initialize(){
        $this->_model=D('Area');
    }

    /**
     * 基础定位
     * 根据客户端IP获取地址
     * @return json
     */
    public function getLocation(){
    	//根据IP查询
    	$area = $this->_model->getCityFromIp(C('DEFAULT_LOCATION'));
    	return send_json(1,'成功',$area);
    }
    
    
    /**
     * 根据ajax传过来的父类id查找下级id
     * @param $parent_id
     */
    public function getListByParentId($parent_id)
    {
        //判断是否为ajax提交
        if(IS_AJAX){
            $list=$this->_model->getListByParentId($parent_id);
            $this->ajaxreturn($list);
        }

    }

    /**
     * 根据县级id查找学校名字
     * 用于四级联动
     * @param $id
     */
    public function getSchoonNameByAreaId($id)
    {
        //判断是否为ajax提交
        if(IS_AJAX){
            $list=M('School')->where(array('area_id'=>$id,'status'=>1))->select();
            foreach($list as $k=>$v){
                $data[$k]['school_name']=$v['school_name'];
                $data[$k]['id']=$v['id'];
            }
            $this->ajaxReturn($data);
        }
    }
    
}