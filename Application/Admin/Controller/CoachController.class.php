<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/31
 * Time: 18:44
 */

namespace Admin\Controller;


class CoachController extends CommonController
{
    private $_CoachModel;
    protected function _initialize(){
        $this->_CoachModel = D('Coach');
    }
    /**
     * 展示所有的教练列表
     */
    public function index()
    {
        $CoachLists=$this->_CoachModel->getCoach();
        $this->assign('CoachLists',$CoachLists);
        $this->display();
    }
    /**
     * 添加教练
     */
    public function addCoach()
    {
        if(IS_POST){
            //修改用户
            if(I('post.id')){
                return $this->save(I('post.'));
            }
            if ($this->_CoachModel->create()===false) {
                $res=$this->_CoachModel->getError();
                return send_json(0,'添加教练失败',$res);
            }
            if ($this->_CoachModel->addCoach()===false) {
                $res=$this->_CoachModel->getError();
                return send_json(0,'添加教练失败',$res);
            }
            return send_json(1,'添加教练成功');
        }else{
            $this->display('add');
        }
    }
    /**
     * 修改教练基本信息
     * @param $id
     */
    public function edit($id)
    {
        $user = $this->_CoachModel->findOneById($id);
        $this->assign('user',$user);
        $this->display();
    }

    /**
     * 保存修改的教练信息
     * @param $data
     */
    public function save($data)
    {
        $id = $data['id'];
        unset($data['id']);
        try{
            $id = $this->_CoachModel->updateById($id,$data);
            if($id === false){
                return send_json(0,'更新失败');
            }else{
                return send_json(1,'更新成功');
            }
        }catch (Exception $e){
            return send_json(0,$e->getMessage());
        }

    }

}