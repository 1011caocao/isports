<?php
/**
 * 公共的方法
 * Created by PhpStorm.
 * User: maikuraki
 * Date: 2016/10/24
 * Time: 1:51
 */

//接口封装函数
function send_json($status,$message='',$data=array())
{
	if(is_array($message)){
		foreach($message as $msg){
			$message=$msg;
			break;
		}
	}
    $res = array(
        'status'=>$status,
        'message'=>$message,
        'data'=>$data
    );
    exit(json_encode($res));
}

/**
 *获取MD5后的密码
 */
function get_md5_password($password)
{
    return md5($password.C('MD5_PRE'));
}

/**
 * 获取菜单类型
 */
function get_menu_type($type)
{
	return $type==1 ? '后台菜单' : '前端导航';
}

/**
 * 获取菜单状态
 */
function get_menu_status($status)
{
	if($status==1){
		$res = '正常';
	}elseif($status==0){
		$res = '关闭';
	}else{
		$res = '删除';
	}
	return $res;
}
/**
 * Thinkphp默认分页样式转Bootstrap分页样式
 * @author H.W.H
 * @param string $page_html tp默认输出的分页html代码
 * @return string 新的分页html代码
 */
function bootstrap_page_style($page_html)
{
	if ($page_html) {
		$page_show = str_replace('<div>','<nav><ul class="pagination">',$page_html);
		$page_show = str_replace('</div>','</ul></nav>',$page_show);

		$page_show = str_replace('<span class="current">','<li class="active"><a>',$page_show);
		$page_show = str_replace('</span>','</a></li>',$page_show);

		$page_show = str_replace(array('<a class="num"','<a class="prev"','<a class="next"','<a class="end"','<a class="first"'),'<li><a',$page_show);
		$page_show = str_replace('</a>','</a></li>',$page_show);
	}
	return $page_show;
}
/**
 * 加盐加密
 * @param string $password 原始密码.
 * @param string $salt     盐.
 * @return string 加盐加密后的结果.
 */
function encrypt($password,$salt){
	return md5(md5($password).$salt);
}

/**
 * 解密
 * @param $password
 * @param $salt
 * @return string
 */
function decrypt($password,$salt){
	return md5(($password).$salt);
}

/**
 * 测试打印数据
 */
function myPrint($data){
    echo "<pre>";print_r($data);exit();
}
/**
 * 判断控制器是否等于当前控制器
 */
function getActive($controller){
    $C = strtolower(CONTROLLER_NAME);
    if(strtolower($controller)==$C){
        return ' class="active" ';
    }
    return '';
}
/**
 * 判断前台个人中心侧边栏选中
 */
function getHomeActive($action){
	$ACT = strtolower(ACTION_NAME);
	if(strtolower($action)==$ACT){
		return 'menuActive';
	}
	return '';
}

/**
 * 判断用户是否登录
 * @return null
 */
function get_user_id(){
	$user=session('USER');
	return isset($user['id'])?$user['id']:null;
}

/**
 * 增加1，indetity_count 表
 * @param $id
 * @return bool
 */
function addCount($name){
    return M('IdentityCount')->where(array('count_name'=>$name))->setInc('count',1);
}

/**
 * 测试的时候用
 * 当提示错误为数组的时候，批量提示错误
 * @param $userModel
 * @return string
 */
function dealErrorStr($userModel)
{
	$errors = $userModel->getError();
	$errorStr = "<ul>";
	//判断是否批量验证的数组错误信息
	if (is_array($errors)) {
		foreach($errors as $error){
			$errorStr .= "<li>$error</li>";
		}
	}else{
		$errorStr .= "<li>$errors</li>";
	}
	$errorStr .= "</ul>";
	return $errorStr;
}

/**
 * 模型类自动验证的方法
 * 判断数组是否为空
 * @param unknown $data
 * @return boolean
 */
function checkIsEmpty($data){
	if(empty($data)){
		return false;
	}else{
		return true;
	}
}

/**
 * 获取不重复的唯一标识
 */
function getUniqid(){
	return md5(uniqid(md5(microtime(true)),true));
}

/**
 * 判断当前模块是前台还是后台
 */
function isHome(){
	return MODULE_NAME=='Home'?true:false;
}

/**
 * 判断某IP是否可以增加浏览次数(排除同一IP刷次数的问题)
 */
function isSameIp($id){
	$ip = get_client_ip();
	if(!S($ip.'_'.$id)){
		S($ip.'_'.$id,1,C('READ_CACHE'));//缓存五分钟
		return true;
	}
	return false;
}

/**
 * 判断角色
 */
function getRoleName($role){
	$name = D('Role')->where(array('id'=>$role))->getField('name');
	if($name){
		return $name;
	}
	return '普通用户';
}

/**
 * 手动调用404页面
 */
function get404(){
    E();
}

/**
 * 给用户发贝壳币
 * @param int $num 贝壳币数量
 * @param int $type 操作方式，1为增加，2为减少，3为设置具体值
 * @param int $uid 具体用户
 * 
 * @return boolean 返回执行结果
 */
function setIcowryCoin($num=10, $type=1, $uid=0){
	//指定用户
	if(!$uid){
		$uid = get_user_id();
	}
	$condition['uid'] = array('eq',$uid);
	//选择计算类型
	switch ($type) {
		case 1:
			$res = D('CertifiedUser')->where($condition)->setInc('icowry_coin',$num);
			break;
		case 2:
			$res = D('CertifiedUser')->where($condition)->setDec('icowry_coin',$num);
			break;
		case 3:
			$res = D('CertifiedUser')->where($condition)->setField('icowry_coin',$num);
			break;
		default:
			$res = false;
			break;
	}
	return $res;
	
}














