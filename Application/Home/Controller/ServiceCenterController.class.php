<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/1/6
 * Time: 15:48
 */

namespace Home\Controller;


class ServiceCenterController extends IdentityController
{
    /**
     * 添加我的投诉
     */
    public function applyProtect()
    {
        $applyProtectModel=D('ApplyProtect');
        if(IS_POST){
            if ($applyProtectModel->create()) {
                if($applyProtectModel->addProtect()===false){
                    $res=$applyProtectModel->getError();
                }
            }else{
                $res=$applyProtectModel->getError();
            }
            if(!$res){
                $res='申请成功，待处理';
            }
        }
            //得到当前用户
            $uid=get_user_id();
            //分页
            $page = I('page',1);
            //每页条数据
            $pageSize = C('PAGE_SIZE_SERVICE');
            //获取信息
            $applyLists=$applyProtectModel->getApplyProtectList($uid,$page,$pageSize);
            //获取总数量
            $applyCount = $applyProtectModel->getApplyCount($uid);
            $Page = new \Think\Page($applyCount,$pageSize);
            //输出分页样式
            $pageRes= $Page->show();
            $Data=array(
                'applyLists'=>$applyLists,
                'pageRes'=>$pageRes,
                'res'=>$res
            );
            $this->assign($Data);
            $this->display('applyProtect');
    }

    /**
     * 联系反馈
     */
    public function feedback()
    {
        $feedbackModel=D('Feedback');
        if(IS_POST){
            if ($feedbackModel->create()) {
                if($feedbackModel->addFeedback()===false){
                    $res=$feedbackModel->getError();
                }
            }else{
                $res=$feedbackModel->getError();
            }
            if(!$res){
                $res='反馈成功，待处理';
            }
        }
        //得到当前用户
        $uid=get_user_id();
        //分页
        $page = I('page',1);
        //每页条数据
        $pageSize = C('PAGE_SIZE_SERVICE');
        //获取信息
        $feedLists=$feedbackModel->getFeedList($uid,$page,$pageSize);
        //获取总数量
        $feedCount = $feedbackModel->getFeedCount($uid);
        $Page = new \Think\Page($feedCount,$pageSize);
        //输出分页样式
        $pageRes= $Page->show();
        $Data=array(
            'feedLists'=>$feedLists,
            'pageRes'=>$pageRes,
            'res'=>$res
        );
        $this->assign($Data);
        $this->display('feedback');
    }

}