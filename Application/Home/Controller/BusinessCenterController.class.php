<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/1/6
 * Time: 15:36
 */

namespace Home\Controller;

use Think\Controller;

class BusinessCenterController extends  IdentityController
{
    /**
     * 发布活动页面
     */
    public function publish()
    {
        //实例化model
        $businessPublishModel=D('BusinessPublish');
        $groupPublishModel=D('GroupPublish');
        $ResourcePublishModel=D('ResourcesPublish');
        //判断传过来的发布是哪一个活动发布
        if(IS_AJAX){
            switch(I('type')){
                case 1:
                    if ($businessPublishModel->create()===false||$businessPublishModel->addBusinessPublish()===false) {
                        $res = $businessPublishModel->getError();
                    }
                    break;
                case 2:
                    if ($groupPublishModel->create()===false||$groupPublishModel->addGroupPublish()===false) {
                        $res = $groupPublishModel->getError();
                    }
                    break;
                case 3:
                    if ($ResourcePublishModel->create()===false||$ResourcePublishModel->addResourcePublish()===false) {
                        $res = $ResourcePublishModel->getError();
                    }
                    break;
                default:
                    return send_json(0,'非法操作');
            }
            if(!$res) {
                $status=1;
                $res = '认证申请填写成功，待审核';
            }else{
                $status=0;
                //$res = '认证申请不合法！';
            }
            return send_json($status,$res);
        }else{
            //获取活动类型
            $activities=D('BusinessPublish')->getActivityType();
            //获取城市信息
            $provinces=D('Area')->getListByParentId();
            //获取校园规模
            $school_sizes=D('BusinessPublish')->getSchoolSize();
            //活动宣传方式
            $campaign_types=D('BusinessPublish')->getCampaignType();
            //验收方式
            $check_types=D('BusinessPublish')->getCheckType();
            //广告植入方式
            $advertiseTypes=D('GroupPublish')->getAdvertiseName();
            //资源类型
            $resources=D('ResourcesPublish')->getResourceByParentId();
            $Data=array(
                'activities'=>$activities,
                'provinces'=>$provinces,
                'school_sizes'=>$school_sizes,
                'campaign_types'=>$campaign_types,
                'check_types'=>$check_types,
                'advertiseTypes'=>$advertiseTypes,
                'resources'=>$resources
            );
            $this->assign($Data);
            $this->display('publish');
        }

    }

    /**
     * 我的发布页面渲染
     */
    public function myPublish()
    {
        //得到当前用户的id
        $uid=get_user_id();
        $businessPublishModel=D('BusinessPublish');
        //分页
        $page = I('page',1);
        //每页10条数据
        $pageSize = C('MY_PUBLISH_PAGE_SIZE_LIST');
        //获取我的发布信息
        $myPublishLists=$businessPublishModel->getMyPublish($uid,$page,$pageSize);
        //获取总数量
        $myPublishCount = $businessPublishModel->getMyPublishCount($uid);
        $Page = new \Think\Page($myPublishCount,$pageSize);
        //输出分页样式
        $pageRes = $Page->show();
        $Data=array(
            'myPublishLists'=>$myPublishLists,
            'pageRes'=>$pageRes
        );
        $this->assign($Data);
        $this->display('myPublish');
    }

    /**
     * 我的申请页面渲染
     */
    public function myApply()
    {
        $artApplyModel=D('ArtApply');
        //分页
        $page = I('page',1);
        //每页10条数据
        $pageSize = C('MY_PUBLISH_PAGE_SIZE_LIST');
        //得到用户id
        $uid=get_user_id();
        //获得分页数据
        $applyLists=$artApplyModel->getMyApply($uid,$page,$pageSize);
        //获取总数量
        $applyCount = $artApplyModel->getMyApplyCount($uid);
        $Page = new \Think\Page($applyCount,$pageSize);
        //输出分页样式
        $pageRes= $Page->show();
        $Data=array(
            'applyLists'=>$applyLists,
            'pageRes'=>$pageRes
        );
//        myPrint($Data);
        $this->assign($Data);
        $this->display('myApply');
    }
    /**
     * 我的资源页面渲染
     */
    public function myResource()
    {
        //得到当前用户的id
        $uid=get_user_id();
        $resourcesPublishModel=D('ResourcesPublish');
        //分页
        $page = I('page',1);
        //每页10条数据
        $pageSize = C('MY_PUBLISH_PAGE_SIZE_LIST');
        //获取商业活动信息
        $myResourceLists=$resourcesPublishModel->getMyResource($uid,$page,$pageSize);
        //获取总数量
        $myResourceCount = $resourcesPublishModel->getMyResourceCount($uid);
        $Page = new \Think\Page($myResourceCount,$pageSize);
        //输出分页样式
        $pageRes= $Page->show();
        $Data=array(
            'myResourceLists'=>$myResourceLists,
            'pageRes'=>$pageRes
        );
        $this->assign($Data);
        $this->display('myResource');
    }
    public function myArt(){
        $certifiedUserModel=D('CertifiedUser');
        //获取当前登录用户的id
        $uid=get_user_id();
        if(($myArt=$certifiedUserModel->getMyArt($uid))===false){
            $res=$certifiedUserModel->getError();
            return false;
        }
        //获取当前演艺人的待审核分页数据
        $artApplyModel=D('ArtApply');
        $page = I('get.page',1);
        //每页6条数据
        $pageSize = C('MY_ART_PAGE_LIST');
        //获取待审核信息
        $screenLists=$artApplyModel->getScreenList($uid,$page,$pageSize);
        //获取总数量
        $screenCount = $artApplyModel->getScreenCount($uid);
        $Page = new \Think\Page($screenCount,$pageSize);
        //输出分页样式
        $pageRes= $Page->show();
        //ajax翻页返回JSON数据
        if(IS_AJAX){
            $Data = array(
                'screenLists'=>$screenLists,
                'pageRes'=>$pageRes
            );
            return send_json(1,'获取成功',$Data);
        }
        $Data=array(
            'myArt'=>$myArt,
            'screenLists'=>$screenLists,
            'pageRes'=>$pageRes
        );
        $this->assign($Data);
        $this->display();
    }

    /**
     * @param $id
     * 我的发布中每条发布的详细信息
     */
    public function myPublishDetail($id,$style)
    {
        //判断是商业活动
        if($style==1){
            $businessPublishModel=D('BusinessPublish');
            $myPublish=$businessPublishModel->getBusinessDetailsById($id,1);

        }
        //判断是校园活动
        if($style==2){
            $groupPublishModel=D('GroupPublish');
            $myPublish=$groupPublishModel->getGroupDetailsById($id,1);
        }
        //myPrint($myPublish);
        //myPrint($myPublish);
        $page = I('get.page',1);
        //每页6条数据
        $pageSize = C('MY_ART_PAGE_LIST');
        $businessApplyModel=D('BusinessApply');
        //获取申请详情信息 包括商业活动和校园活动
        $applyLists=$businessApplyModel->getApplyDetailList($id,$style,$page,$pageSize);
        //获取总数量
        $applyCount = $businessApplyModel->getApplyDetailCount($id,$style);
        $Page = new \Think\Page($applyCount,$pageSize);
        //输出分页样式
        $pageRes= $Page->show();
        //ajax翻页返回JSON数据
        if(IS_AJAX){
            $Data = array(
                'applyLists'=>$applyLists,
                'pageRes'=>$pageRes
            );
            return send_json(1,'获取成功',$Data);
        }
        $Data=array(
            'applyLists'=>$applyLists,
            'pageRes'=>$pageRes,
            'myPublish'=>$myPublish
        );
        $this->assign($Data);
        $this->display();
    }

    /**
     * 我的申请页面
     * 根据申请的活动类型不同
     * 渲染不同的页面
     * @param $id
     * @param $style
     */
    public function myApplyDetail($id,$style)
    {
        if($style==4){
            $certifiedUserModel=D('CertifiedUser');
            $artApplyModel=D('ArtApply');
            //得到我的申请中演艺人的信息
            $artList=$certifiedUserModel->getArtDetail($id);
            //我的申请，申请的演艺人信息
            $artApplyDetail=$artApplyModel->getArtApplyDetail($id);
            $Data=array(
                'artList'=>$artList,
                'artApplyDetail'=>$artApplyDetail
            );
            $this->assign($Data);
            $this->display('myApplyDetailActor');
        }else{
            switch($style){
                //申请的商业活动
                case 1:
                    $businessId=M('BusinessApply')->where(array('id'=>$id))->getField('bp_id');
                    $row=D('BusinessPublish')->getBusinessDetailsById($businessId);
                    $myApplyDetail=D('BusinessApply')->getBusinessApplyDetail($id);
                    break;
                //申请的校园活动
                case 2:
                    $groupId=M('GroupApply')->where(array('id'=>$id))->getField('gp_id');
                    $row=D('GroupPublish')->getGroupDetailsById($groupId);
                    $myApplyDetail=D('GroupApply')->getGroupApplyDetail($id);
                    break;
                //申请资源
                case 3:
                    $resourceId=M('ResourceApply')->where(array('id'=>$id))->getField('rp_id');
                    $row=D('ResourcesPublish')->GetResourceDetailById($resourceId);
                    $myApplyDetail=D('ResourceApply')->getResourceApplyDetail($id);
                    break;
                default:
                    get404();
            }
            $Data=array(
                'row'=>$row,
                'myApplyDetail'=>$myApplyDetail
            );
            $this->assign($Data);
            $this->display();
        }
    }

    /**
     * 下线
     * @param $id
     */
    public function deletePublish($id)
    {
        $style=I('post.data');
        //判断是哪一个发布
        if($style==1){
            $businessPublishModel=D('BusinessPublish');
            if ($businessPublishModel->deleteBusiness($id)===false) {
                $res=$businessPublishModel->getError();
            }
        }else{
            $groupPublishModel=D('GroupPublish');
            if ($groupPublishModel->deleteGroup($id)===false) {
                $res=$groupPublishModel->getError();
            }
        }
        if($res===false){
            return send_json(0,'下线失败',$res);
        }else{
            return send_json(1,'下线成功');
        }
    }
}