<?php
/**
 * 短信模板配置
 * key代表短信标识符
 * templateId 代表 阿里短信平台的模板ID
 * item 代表 模板里需要配置的变量名称
 */
return array(
	'reg' => array(//用户注册验证码
		'templateId' => 'SMS_41695149',
		'item' => array('code')
	),
	'forget' => array(//找回密码
		'templateId' => 'SMS_41610179',
		'item' => array('code')
	),
	'change' => array(//修改密码
		'templateId' => 'SMS_41670143',
		'item' => array('code')
	),
	'cerSuccess' => array(//认证成功
		'templateId' => 'SMS_41615188',
		'item' => array('name','role')
	),
	'cerFail' => array(//认证失败
		'templateId' => 'SMS_41640277',
		'item' => array('role')
	),
	'pubSuccess' => array(//发布审核通过
		'templateId' => 'SMS_41530159',
		'item' => array('name')
	),
	'pubFail' => array(//发布审核未通过
		'templateId' => 'SMS_41530159',
		'item' => array('name')
	),
	'applySuccess' => array(//申请活动成功
		'templateId' => 'SMS_41650140',
		'item' => array('name','pname')
	),
	'applyFail' => array(//申请活动失败
		'templateId' => 'SMS_41690108',
		'item' => array('name','pname')
	),
	'rApplyMsg' => array(//资源申请消息
		'templateId' => 'SMS_41625108',
		'item' => array('name','cname','rname')
	),
	'aApplyMsg' => array(//演艺人申请消息
		'templateId' => 'SMS_41520095',
		'item' => array('name','cname')
	),
);