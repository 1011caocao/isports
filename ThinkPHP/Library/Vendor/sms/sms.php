<?php
/**
 * 短信发送接口
 *
 * @date 2016-12-22 上午09:54:00
 * @author lihang 李航
 * @users 爱贝壳团队
 */
// namespace vendor\sms;

class sms{
	/**
	 * 文本短信发送
	 */
	public static function sendSMS($mobile,$templateId,$content=''){
		$smsFile = vendor('sms.alidayu.alidayu');
		$c = new Alidayu();
		$r = $c->send($mobile, $templateId, $content);
		$r = $r===null || $r===true ? true : false;
		return $r;
	}
}