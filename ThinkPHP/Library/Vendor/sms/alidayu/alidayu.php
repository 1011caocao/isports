<?php
// namespace Vendor\sms\alidayu;
require_once "TopSdk.php";
require_once "top/TopClient.php";
require_once "top/request/AlibabaAliqinFcSmsNumSendRequest.php";
// use Vendor\sms\alidayu\top\TopClient;
/**
 * 阿里短信Api 
 * @author 李航
 */
    class Alidayu{
    	/**
    	 * 短信发送
    	 * @author lihang 李航
    	 * @param int $mobile 发送号码
    	 * @param strint $templateId 模板ID
    	 * @param array $content 发送内容
    	 * @return int/bool/object/array
    	 */
    	public function send($mobile,$templateId,$content=array()){
    		$temp = include('template.php');
//     		myPrint($temp);
    		$smsParam = '{';
    		if(is_array($content)){
    			foreach ($temp[$templateId]['item'] as $v){
    				$smsParam .= '"'.$v.'":"'.$content[$v].'",';
    			}
    			$smsParam = substr($smsParam, 0, strlen($smsParam)-1).'}';
    		}
//     		myPrint($smsParam);
    		$c = new TopClient;
    		$c->appkey = C('APP_KEY');
    		$c->secretKey = C('SECRET_KEY');
    		$req = new AlibabaAliqinFcSmsNumSendRequest;
    		$req->setSmsType("normal");
    		$req->setSmsFreeSignName(C('SIGN_NAME'));
    		if($smsParam!='{')
    			$req->setSmsParam($smsParam);
    		$req->setRecNum($mobile);
    		$req->setSmsTemplateCode($temp[$templateId]['templateId']);
    		$resp = $c->execute($req);
    	}
    }