<?php
/**
 * Created by PhpStorm.
 * User: maikuraki
 * Date: 2016/12/6
 * Time: 0:52
 */
namespace Common\Model;

use Think\Exception;
use Think\Model;

class MenuModel extends Model
{
    //自动验证
    protected $_validate=array(
        array('name','require','菜单名不能为空'),
        array('m','require','模块名不能为空'),
        array('c','require','控制器不能为空'),
        array('f','require','方法名不能为空')
    );
	/**************查询*****************/
    /**
     * 查询菜单（分页）
     */
    public function getMenus($data,$page,$pageSize=10)
    {
    	$data['status'] = array('neq',-1);//不能为已删除的
    	$offset = ($page-1)*$pageSize;
    	return $this->where($data)->order(array('listorder'=>'desc','menu_id'=>'desc'))->limit($offset,$pageSize)->select();
    }
    
    /**
     * 查询菜单数量
     */
    public function getMenusCount($data = array())
    {
    	$data['status'] = array('neq',-1);
    	return $this->where($data)->count();
    }
    
    /**
     * 通过ID查询菜单
     */
    public function findOneById($id)
    {
    	return $this->where("menu_id=$id")->find();
    }
    
    /*************添加*****************/
    /**
     * 添加菜单
     * @return int|mixed
     */
    public function addMenu()
    {
        $data=$this->data();
    	if($data && is_array($data)){
    		$menu = $this->where('m="'.$data['m'].'" and c="'.$data['c'].'" and f="'.$data['f'].'"')->select();
    		if(!$menu){
                return $this->add();
            }
    	}
    	return false;
    }

    /**************修改(删除)*****************/
    public function updateById($MenuId,$data)
    {
        if(!$MenuId || !is_numeric($MenuId)){
            E('ID不合法！',1);
        }
        if(!$data || !is_array($data)){
            E('数据不合法',2);
        }
    	return $this->where("menu_id=".$MenuId)->save($data);
    }

    /**
     * 更新全部排序
     * @param array
     */
    public function updateAllListOrder($data){
        //循环更新排序
        try{
            if($data && is_array($data)){
                foreach ($data as $k=>$v){
                    $this->where(array('menu_id'=>$k))->setField('listorder',$v);
                }
                return true;
            }
        }catch (Exception $e){
            return send_json(0,$e->getMessage());
        }
    }

    /**
     * 查询左侧菜单列表
     */
    public function getAdminMenus(){
        $data = array(
            'status'=>array('eq',1),
            'type'=>1,
        );
        return $this->where($data)->order('listorder desc,menu_id desc')->select();
    }

    /**
     * 获取前端个人中心侧边菜单列表
     */
    public function getUserMenus(){
    	$data = array(
            'status'=>array('eq',1),
            'type'=>2,
    		'parentid'=>0
        );
    	//先查询主菜单
        $menus = $this->where($data)->order('listorder desc,menu_id asc')->select();
//         myPrint($menus);
        //再查询所有主菜单下面的子菜单
		$data['parentid'] = array('gt',0);
		$item = $this->where($data)->order('listorder desc,menu_id asc')->select();
		//通过循环组装数组
		foreach ($menus as $key=>$val){
			foreach ($item as $k=>$v){
				if($val['menu_id']==$v['parentid']){
					$menus[$key]['item'][] = $v;
				}
			}
		}
// 		myPrint($menus);
		return $menus;
    }
}