<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/3/8
 * Time: 16:55
 */

namespace Admin\Controller;


use Think\Page;

class ResourcePublishController extends CommonController
{
    private $_ResourcePublishModel;
    protected function _initialize(){
        $this->_ResourcePublishModel=D('ResourcesPublish');
    }
    public function index()
    {
        $page = I('page',1);
        $data = array();
        //获取数据，分页
        $resourceLists = $this->_ResourcePublishModel->getAllResourcePublish($data,$page,C('ADMIN_PAGE_SIZE'));
        //获取总数量
        $resourceCount = $this->_ResourcePublishModel->getAllResourcePublishCount($data);
        //分页样式
        $Page = new Page($resourceCount,C('ADMIN_PAGE_SIZE'),$data);
        $pageRes = $Page->show();
        $Data=array(
            'page'=>$page,
            'resourceLists'=>$resourceLists,
            'pageRes'=>$pageRes
        );
        $this->assign($Data);
        $this->display();
    }
    /**
     * 资源详情页面
     * @param $id
     */
    public function resourceInfo($id)
    {
        $resourceInfo=$this->_ResourcePublishModel->getResourceInfo($id);
        if(!$resourceInfo){
            get404();
        }
        $this->assign('resourceInfo',$resourceInfo);
        $this->display();
    }

    /**
     * 审核资源信息
     */
    public function checkResource()
    {
        if(IS_AJAX){
            //获取活动
            $id = I('post.id');
            //更改活动状态
            $res =$this->_ResourcePublishModel->checkResource($id);
            if($res){
                return send_json(1,'审核成功');
            }else{
                $data = $this->_ResourcePublishModel->getError();
                return send_json(0,'审核失败',$data);
            }
        }
    }
}