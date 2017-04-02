<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/3/7
 * Time: 14:39
 */

namespace Admin\Controller;


use Think\Page;

class BusinessPublishController extends CommonController
{
    private $_BusinessPublishModel;
    protected function _initialize(){
        $this->_BusinessPublishModel = D('BusinessPublish');
    }

    /**
     * 发布管理首页
     */
    public function index()
    {
        $page = I('page',1);
        $data = array();
        //获取数据，分页
        $businessLists = $this->_BusinessPublishModel->getAllBusinessPublish($data,$page,C('ADMIN_PAGE_SIZE'));
        //获取总数量
        $businessCount = $this->_BusinessPublishModel->getAllBusinessPublishCount($data);
        //分页样式
        $Page = new Page($businessCount,C('ADMIN_PAGE_SIZE'),$data);
        $pageRes = $Page->show();
        $Data=array(
            'page'=>$page,
            'businessLists'=>$businessLists,
            'pageRes'=>$pageRes
        );
        $this->assign($Data);
        $this->display();
    }

    /**
     * 商业活动详情页面
     * @param $id
     */
    public function businessInfo($id)
    {
        $businessInfo=$this->_BusinessPublishModel->getBusinessInfo($id);
        if(!$businessInfo){
            get404();
        }
        //myPrint($businessInfo);
        $this->assign('businessInfo',$businessInfo);
        $this->display();
    }

    /**
     * 审核商业活动
     */
    public function checkBusiness()
    {
        if(IS_AJAX){
            //获取活动
            $id = I('post.id');
            //更改活动状态
            $res =$this->_BusinessPublishModel->checkBusiness($id);
            if($res){
                return send_json(1,'审核成功');
            }else{
                $data = $this->_BusinessPublishModel->getError();
                return send_json(0,'审核失败',$data);
            }
        }
    }

}