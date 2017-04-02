<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends CommonController 
{
    public function index(){
        //入驻信息
        $countList=M('IdentityCount')->select();
        $companyCount=$countList[0]['count'];
        $resourceCount=$countList[1]['count'];
        $groupCount=$countList[2]['count'];
        $actorCount=$countList[3]['count'];
        //商业活动数据
        $BusinessPublishModel=D('BusinessPublish');
        $businessList=$BusinessPublishModel->getBusinessList('',1,C('PAGE_SIZE_INDEX'));
        //校园活动数据
        $GroupPublishModel=D('GroupPublish');
        $groupList=$GroupPublishModel->getGroupList('',1,C('PAGE_SIZE_INDEX'));
        //传媒资源数据
        $ResourcePublishModel=D('ResourcesPublish');
        $resourceList=$ResourcePublishModel->getResourceList('',1,C('PAGE_SIZE_INDEX'));
        //演艺人信息数据
        $certifiedUserModel=D('CertifiedUser');
        $artList=$certifiedUserModel->getArtList('',1,15);
        //处理演艺人数据
        $artLists=array_chunk($artList,5);
        //渲染页面数据
        $pubList=array(
          'businessList'=>$businessList,
            'groupList'=>$groupList,
            'resourceList'=>$resourceList,
            'companyCount'=>$companyCount,
            'resourceCount'=>$resourceCount,
            'groupCount'=>$groupCount,
            'actorCount'=>$actorCount,
            'artLists'=>$artLists
        );
        $this->assign($pubList);
    	$this->display('index');
    }
}