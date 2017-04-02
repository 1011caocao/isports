<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/16
 * Time: 11:52
 */

namespace Common\Model;

use Org\Util\String;
use Think\Model;

class UserModel extends Model
{
    //自动验证
    protected $_validate=array(
        array('phone','require','电话号码不能为空'),
        array('phone','','电话号码已存在',self::EXISTS_VALIDATE,'unique','enroll'),
        array('password','require','密码不能为空'),
        array('password','8,12','用户密码必须在8-12位之间','','length','enroll'),
        array('repassword','require','确认密码不能为空'),
        array('repassword','password','确认密码不正确','','confirm','enroll'),
    );
    //自动完成
    protected $_auto=array(
        array('create_time',NOW_TIME,'enroll'),
        array('salt','Org\Util\String::randString','enroll','function')
    );

    /**
     * 用户注册
     */
    public function addUser()
    {
        //记录创建ip
        $this->data['create_ip']=$_SERVER['REMOTE_ADDR'];
        //密码加密
        $this->data['password']=encrypt($this->data['password'],$this->data['salt']);
        //添加默认头像
        $this->data['portrait']=C('DEFAULT_PORTRAIT');
        //添加数据
        if(!$id=($this->add())){
            return false;
        }
        //登录，当注册成功的时候记录session id
        $this->login($id);
        return true;
    }

    /**
     * 用户登录
     */
    public function checkLogin()
    {
        //获取密码和电话号码
        $password=$this->data['password'];
        $phone=$this->data['phone'];
        //根据电话号码查找用户的信息
        $userInfo=$this->getUserByPhone($phone);
        if($userInfo){
            //查找对应的用户的盐
            $salt=$userInfo['salt'];
            $userPassword=$userInfo['password'];
            //验证用户密码是否正确
            $log_password=decrypt($password,$salt);
            //判断密码是否正确
            if($log_password==$userPassword){
                $this->login($userInfo['id']);
            }else{
                $this->error='用户名或密码错误';
                return false;
            }
         //没有查到用户信息
        }else{
            $this->error='用户名或密码错误';
            return false;
        }

    }

    public function login($id)
    {
        $userInfo=$this->getUserById($id);
        //修改用户登录时间和登录ip
        $data=array(
            'id'=>$id,
            'last_time'=>NOW_TIME,
            'last_ip'=>$_SERVER['REMOTE_ADDR']
        );
        $this->save($data);
        //判断用户是否为认证用户，如果是认证用户，将用户的real_name保存在session中
        if($userInfo['role']){
            $userInfo['real_name']=M('CertifiedUser')->where(array('uid'=>$id))->getField('real_name');
        }
        //将用户的信息保存在session中
        session('USER',$userInfo);
        //判断是否勾选自动登录
        $this->_saveToken($userInfo,I('post.state'));
        //返回信息
        $result['id'] = $userInfo['id'];
        $result['phone'] = $userInfo['phone'];
        $result['portrait'] = $userInfo['portrait'];
        $result['role'] = $userInfo['role'];
        $result['last_time'] = $userInfo['last_time'];
        return $result;
    }

    /**
     * 改变该用户状态
     * param int $id 用户ID
     * return boolean
     */
    public function changeStatus($id)
    {
        $where['id'] = array('eq',$id);
        $user = $this->where($where)->find();
        if(!$user){
            $this->error = '该用户不存在';
            return false;
        }
        $this->status = $this->status?0:1;
        if($this->save()){
            return true;
        }else{
            $this->error = '更新失败';
            return false;
        }
    }

    /**
     * 查询用户列表（分页）
     */
    public function getUsers($data,$page,$pageSize=10)
    {
        $data['status']=array('neq',-1);//不能为已删除的
        $offset=($page-1)*$pageSize;
        return $this->where($data)->order(array('id'=>'desc'))->limit($offset,$pageSize)->select();
    }
    /**
     * 获取用户总数量
     */
    public function getUserCount($data)
    {
        $data['status']=array('neq',-1);//不能为已删除的
        return $this->where($data)->count();
    }

    /**
     * 根据用户手机号码查找用户信息
     * @param $phone
     * @return bool
     */
    public function getUserByPhone($phone)
    {
        $userInfo=$this->where(array('phone'=>$phone,'status'=>1))->find();
        //如果用户存在
        if($userInfo){
            return $userInfo;
        }else{
            return false;
        }
    }

    /**
     * 通过id查找用户信息
     * @param $id
     * @return bool|mixed
     */
    public function getUserById($id)
    {
        $userInfo=$this->where(array('id'=>$id,'status'=>1))->find();
        //如果用户存在
        if($userInfo){
            return $userInfo;
        }else{
            return false;
        }
    }

    /**
     * 判断是否勾选记住密码
     * 如果勾选密码则生成令牌
     * @param $userInfo
     * @param bool|false $remember
     */
    public function _saveToken($userInfo,$remember=0){
        if($remember){
            $token=String::randString(32);
            $data=array(
                'id'=>$userInfo['id'],
                'token'=>$token
            );
            //将自动登录令牌保存7天
            cookie('AUTO_LOGIN_TOKEN',$data,C('ONE_WEEK'));
            $this->save($data);
        }
    }

    public function autoLogin()
    {
        //获取cookie中的值
        $autoInfo=cookie('AUTO_LOGIN_TOKEN');
        //如果cookie中的值为空
        if(empty($autoInfo)){
            return array();
        }
        //如果cookie中有值，那么查找数据库中的值是否匹配
        if ($userInfo=($this->where($autoInfo)->where(array('status'=>1))->find())) {
            //如果匹配就更新数据库中的令牌
            $this->_saveToken($userInfo,true);
            //将登录的用户信息保存到session
            session('USER',$userInfo);
            return $userInfo;
        }else{
            return array();
        }
    }
    
    /**
     * 发送注册验证码短信
     * @param string phone
     * @return boolean
     */
    public function SendRegSMS($phone){
    	if($phone){
    		//生成六位随机数
    		$regCode = S($phone)?S($phone):string::randstring(6,1);
    		//存入缓存，10分钟有效期
    		S($phone,$regCode,C('TEN_MINUTES'));
    		//引入短信类
    		Vendor('sms.sms');
    		//发送验证码
    		$data = array('code'=>$regCode);
    		$Sms = new \sms();
    		return $Sms::sendSMS($phone,'reg',$data);
    	}
    	return false;
    }

    /**
     * 判断验证码是否正确
     * @param int $code
     * @return boolean
     */
    public function validateRegCode($code,$phone=''){
        //传入验证码和缓存的验证码比对
        $phone = $phone?$phone:$this->phone;
        if($code && $code == S($phone)){
            //删除缓存
            S($this->phone,NULL);
            return true;
        }
        return false;
    }
}