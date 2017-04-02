<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/2/16
 * Time: 18:43
 */

namespace Common\Model;


use Think\Model;

class FeedbackModel extends  Model
{
    //自动验证
    protected $_validate=array(
        array('title','require','标题不能为空'),
        array('content','require','内容不能为空')
    );
    //自动完成
    protected $_auto=array(
        array('add_time',NOW_TIME),
    );

    /**
     * 添加反馈数据
     * @return bool
     */
    public function addFeedback()
    {
        //上传图片
        $imgRes = $this->uploadImg($_FILES);
        $this->data['img_path']=$imgRes;
        //得到当前用户的id
        $this->data['uid']=get_user_id();
        if ($this->add()===false) {
            $this->error='申请投诉有误';
            return false;
        }
        return true;
    }
    /**
     * @param $uid
     * @param int $page
     * @param int $pageSize
     * @return mixed
     * 获取联系反馈分页数据
     */
    public function getFeedList($uid,$page=1,$pageSize=2)
    {
        $offset = ($page-1)*$pageSize;
        //查找数据
        $condition=array('uid'=>$uid);
        $rows=$this->where($condition)->order('status desc')->limit($offset,$pageSize)->select();
        foreach($rows as $k=>$row){
            if($row['status']==0){
                $row['option_content']='待处理';
                $rows[$k]=$row;
            }
        }
        return $rows;
    }

    /**
     * @param $uid
     * @return mixed
     * 得到总的数据条数
     */
    public function getFeedCount($uid)
    {
        $condition=array('uid'=>$uid);
        return $this->where($condition)->count();
    }
    /**
     * @param $img
     * @return bool|string
     * 申请投诉照片上传
     */
    protected function uploadImg($img)
    {
        //设置跟目录到public
        $upload=new upload();
        $upload->rootPath = '.'.C('BASE_UPLOAD_PATH');
        $upload->savePath = C('FEEDBACK_SAVE_PATH');
        $imgRes = $upload->upload($img);
        if(!$imgRes){
            $this->error='上传照片为空';
            return false;
        }
        return C('BASE_UPLOAD_PATH').$imgRes['img_path']['savepath'].$imgRes['img_path']['savename'];
    }

}