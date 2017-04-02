<?php
/**
 * Created by Zend Studio.
 * User: Lihang
 * Date: 2016/12/5
 * Time: 14:13
 */

namespace Admin\Controller;

use Think\Exception;

class MenuController extends CommonController
{
    /**
     * @var \Common\Model\MenuModel
     *
     */
    private $_model;
    protected function _initialize(){
        $this->_model=D('Menu');
    }

	/**
	 * 菜单管理
	 */
	public function index()
	{
		$data = array();
		$type = I('type',-1);//前端导航或者后台菜单，默认所有
		if(in_array($type,array(0,1))){
			$data['type'] = $type;
		}
		//分页
		$page = I('page',1);
		$pageSize = C('PAGE_SIZE_LIST');
        //获取数据
		$menus = D('Menu')->getMenus($data,$page,$pageSize);
        //获取总数量
		$menusCount = D('Menu')->getMenusCount($data);

		$Page = new \Think\Page($menusCount,$pageSize,$data);
        //输出分页样式
		$pageRes = $Page->show();
        $this->assign('type',$type);
		$this->assign('pageRes',$pageRes);
		$this->assign('menuList',$menus);
		$this->display();
	}
	/**
	 * 添加菜单(更新菜单)
	 */
	public function add()
    {
        //判断是否为post提交
        if (IS_POST) {
        	//修改菜单
        	if(I('post.menu_id')){
        		return $this->save(I('post.'));
        	}
            //收集数据
            if ($this->_model->create()===false) {
                $res = $this->_model->getError();
                return send_json(0, $res);
            }
            //执行方法
            if($this->_model->addMenu()===false){
                return send_json(0, '新增失败');
            }
            return send_json(1, '新增成功');
        } else {
            $this->display();
        }
    }
	/**
	 * 修改菜单
	 */
	public function edit()
	{
        //显示
        $id = I('get.id',0,int);
        $menu = D('Menu')->findOneById($id);
        $this->assign('menuList',$menu);
        $this->display();
	}

    /**
     * 修改处理
     */
	public function save($data)
    {
        $MenuId = $data['menu_id'];
        unset($data['menu_id']);
        try{
            $id = D('Menu')->updateById($MenuId,$data);
            if($id === false){
                return send_json(0,'更新失败');
            }else{
                return send_json(1,'更新成功');
            }
        }catch (Exception $e){
            return send_json(0,$e->getMessage());
        }

    }

    /**
     * 删除处理(修改状态)
     */
    public function setStatus()
    {
        try{
            $Menus = I('post.');
            $MenuId = I('post.id',0,int);
            unset($Menus['id']);
            $id = D('Menu')->updateById($MenuId,$Menus);
            if($id){
                return send_json(1,'操作成功');
            }else{
                return send_json(0,'操作失败');
            }
        }catch (Exception $e){
            return send_json(0,$e->getMessage());
        }
    }
    /**
     * 更新排序
     */
    public function listOrder()
    {
        if(IS_POST){
            $data = I('post.listorder');
            $res = $this->_model->updateAllListOrder($data);
            if($res){
                return send_json(1,'更新成功');
            }else{
                return send_json(0,'更新失败');
            }
        }
    }
}