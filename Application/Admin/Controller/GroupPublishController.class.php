<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/3/8
 * Time: 16:48
 */

namespace Admin\Controller;


use Think\Page;

class GroupPublishController extends CommonController
{
    private $_GroupPublishModel;
    protected function _initialize(){
        $this->_GroupPublishModel=D('GroupPublish');
    }
    public function index()
    {
        $page = I('page',1);
        $data = array();
        //获取数据，分页
        $groupLists = $this->_GroupPublishModel->getAllGroupPublish($data,$page,C('ADMIN_PAGE_SIZE'));
        //获取总数量
        $groupCount = $this->_GroupPublishModel->getAllGroupPublishCount($data);
        //分页样式
        $Page = new Page($groupCount,C('ADMIN_PAGE_SIZE'),$data);
        $pageRes = $Page->show();
        $Data=array(
            'page'=>$page,
            'groupLists'=>$groupLists,
            'pageRes'=>$pageRes
        );
        $this->assign($Data);
        $this->display();
    }
    /**
     * 校园活动详情页面
     * @param $id
     */
    public function groupInfo($id)
    {
        $groupInfo=$this->_GroupPublishModel->getGroupInfo($id);
        if(!$groupInfo){
            get404();
        }
        $this->assign('groupInfo',$groupInfo);
        $this->display();
    }

    /**
     * 审核校园活动
     */
    public function checkGroup()
    {
        if(IS_AJAX){
            //获取活动
            $id = I('post.id');
            //更改活动状态
            $res =$this->_GroupPublishModel->checkGroup($id);
            if($res){
                return send_json(1,'审核成功');
            }else{
                $data = $this->_GroupPublishModel->getError();
                return send_json(0,'审核失败',$data);
            }
        }
    }

}