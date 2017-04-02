<?php
/**
 * Created by PhpStorm.
 * User: maikuraki
 * Date: 2016/12/8
 * Time: 11:02
 */
namespace Admin\Controller;


class IndexController extends CommonController 
{

    public function index()
    {
    	$this->display();
    }
    /**
     * 短信测试
     */
    public function send(){
    	$res = D('User')->sendRegSMS('13989275543');
    	if($res){
    		return send_json(1,'发送成功');
    	}
    }
    
}