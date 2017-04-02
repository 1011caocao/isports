<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/23
 * Time: 16:48
 */

namespace Home\Controller;


use Think\Controller;

class UploadController extends CommonController
{

    /**
     * @var \Common\Model\UploadModel
     *
     */
    private $_model;
    protected function _initialize(){
        $this->_model=D('Upload');
    }
    /**
     * 上传图片，保存在服务器，可访问
     * @return bool
     */
    public function upload()
    {
        if(($res=$this->_model->upload())===false){
            send_json(0,'上传失败');
        }else{
            send_json(1,'上传成功',$res);
        }
    }

    public function uploadIdentity()
    {
        if($this->_model->uploadIdentity()===false){
            send_json(0,'上传失败');
        }else{
            send_json(1,'上传成功');
        }
    }

}