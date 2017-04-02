<?php
return array(
	//'配置项'=>'配置值'
	//环境
	'TEST' => false, //测试注册，true表示免验证码注册。
	//基本配置
    'URL_CASE_INSENSITIVE'  =>  true,
    'LOAD_EXT_CONFIG'=>'db',//多个扩展文件以逗号隔开，形成一个字符串。
    'MD5_PRE'=>'tsebsiyrwoci',
    'URL_MODEL'=>2,
   // 'TMPL_EXCEPTION_FILE' => 'Public/404.html',
	'READ_CACHE' => 5,//增加访问次数的时间间隔，默认5分钟，单位秒
	'MODULE_ALLOW_LIST' => array('Home','Admin'),
	'DEFAULT_MODULE' => 'Admin',
    'DEFAULT_LOCATION' => '117.172.47.80',//成都
	//时间配置
	'ONE_MINUTES' => 60,//一分钟
	'FIVE_MINUTES' => 300,//五分钟
	'TEN_MINUTES' => 600,//十分钟
	'ONE_HOURS' => 3600,//一小时
	'ONE_DAY' => 3600*24,//一天
	'ONE_WEEK' => 3600*24*7,//一周，七天
	'ONE_MONTH' => 3600*24*30,//30天
	'ONE_YEAR' => 3600*24*365,//一年
	//阿里大于短信
	'APP_KEY' => '23571346',//阿里大于短信appkey
	'SECRET_KEY' => '95791180ad4bea2edb5125558e564508',//阿里大于短信secretkey
	'SIGN_NAME' => '爱贝壳',//阿里大于短信签名
	//分页相关
	'ART_PAGE_SIZE_LIST'=>16, //演艺人才展示数据条数
	'MY_ART_PAGE_LIST'=>2,   //我的演艺分页条数6
	'MY_PUBLISH_PAGE_SIZE_LIST'=>20, //我的发布和我的资源我的申请每页条数
	'PAGE_SIZE_INDEX' => 6,  //首页展示数据条数 我的发布中的每个发布详情分页
	'PAGE_SIZE_LIST' => 10,   //活动分页展示每页条数
	'ADMIN_PAGE_SIZE' => 10, //后台管理分页
	'PAGE_SIZE_SERVICE'=>2,  //服务中心数据条数
	'QUERY_POINT' => '#F', //前端查询分页锚点
	//个人默认头像地址
	'DEFAULT_PORTRAIT' => '/public/upload/portrait/default_personal_logo.png',
	//身份认证模块名，用于排除验证。
	'CERTIFICATION_DENY' => array('/home/user/certification'),
	//上传路径
	'BASE_UPLOAD_PATH' => '/Public/upload/',//图片上传根目录
	'BASE_IDENTITY_PATH' => 'E:/identity_card/',//身份证上传根目录
	'APPLY_PROTECT_SAVE_PATH'=>'apply_protect/',//申请投诉图片
	'FEEDBACK_SAVE_PATH'=>'feedback/',//联系反馈图片
	'PORTRAIT_SAVE_PATH' => 'portrait/',//头像路径
	'LICENCE_SAVE_PATH' => 'licence/',//证件照片路径
	'COMPANY_IMG_SAVE_PATH' => 'company_img/',//公司照片路径
	'CASE_SHOW_SAVE_PATH' => 'case_show/',//案例照片路径
	'ART_SHOW_SAVE_PATH' => 'art_show/',//演艺人形象才艺图片

	'I_COIN_CERTIFIED'=>10,//认证成功之后赠送贝壳币
);