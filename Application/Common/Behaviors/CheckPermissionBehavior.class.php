<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/11/4
 * Time: 20:52
 */

namespace Common\Behaviors;


use Think\Behavior;

class CheckPermissionBehavior extends Behavior
{
        public function run(&$param){
//            //执行逻辑
//            //排除不需要验证的页面 login  verify index
//            $ignores=C('IGNORES');
//            //获取当前的路径
//            $url=MODULE_NAME.'/'.CONTROLLER_NAME.'/'.ACTION_NAME;
//            //保存当前的路径，方便执行登录或认证动作之后跳转
//            cookie('JUMPURL',$url);
//            if(in_array($url,$ignores)){
//                return true;
//            }
            //检查登录 如果session中没有值,尝试自动登录
            if (!session('USER')) {
                D('User')->autoLogin();
                    //重定向到登录页面
//                     return false;
            }
//            //忽略已登录用户的路径
//             $user_ignores=C('USER_IGNORES');
//             if(in_array($url,$user_ignores)){
//                    return true;
//             }
//           return true;
        }

}