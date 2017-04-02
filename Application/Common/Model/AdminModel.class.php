<?php
/**
 * Created by PhpStorm.
 * User: maikuraki
 * Date: 2016/10/24
 * Time: 3:14
 */
namespace Common\Model;

use Think\Model;

class AdminModel extends Model 
{
    //自动验证
    protected $_validate=array(
        array('username','require','名称不能为空'),
        array('password','require','密码不能为空'),
        array('phone','require','电话号码不能为空'),
        array('phone','/^1[23578]\d{9}$/','请输入正确的电话号码'),
        array('phone','','电话号码已存在',self::EXISTS_VALIDATE,'unique'),
        array('repassword','require','确认密码不能为空'),
        array('repassword','password','确认密码不正确','','confirm'),
    );
    //自动完成
    protected $_auto=array(
        array('add_time',NOW_TIME),
    );
	/**
	 * 根据用户名查询个人信息
	 * @param string $username
     * @return array
     * 返回false为SQL错误,NULL查询为空
	 */

    public function getAdminByUsername($username){
        $data['username'] = $username;
        return $this->where($data)->find();
    }

    /**
     * 添加管理员
     */
    public function addAdmin()
    {
        $this->data['password']= md5($this->data['password'].C('MD5_PRE'));
        $id=$this->add($this->data());
        if(!$id){
            $this->error='注册失败';
            return false;
        }
        return true;
    }

    /**
     * 获得所有的管理员列表
     */
    public function getAdmin()
    {
        return $this->select();
    }

    /**
     * 修改登录时间和登录ip
     * @param $id
     */
    public function updataLogin($id)
    {
        //修改用户登录时间和登录ip
        $data=array(
            'admin_id'=>$id,
            'last_login_time'=>NOW_TIME,
            'last_login_ip'=>$_SERVER['REMOTE_ADDR']
        );
       // myPrint($data);
       $this->where(['admin_id'=>$id])->save($data);
    }
}