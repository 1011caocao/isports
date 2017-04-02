/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : icowry

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-03-03 10:40:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ic_activity_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_activity_type`;
CREATE TABLE `ic_activity_type` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `activity_name` varchar(20) NOT NULL DEFAULT '' COMMENT '活动类型名称',
  `add_time` varchar(12) NOT NULL DEFAULT '' COMMENT '添加时间',
  `status` tinyint(2) DEFAULT '0' COMMENT '状态，0为禁用，1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='活动类型';

-- ----------------------------
-- Table structure for ic_admin
-- ----------------------------
DROP TABLE IF EXISTS `ic_admin`;
CREATE TABLE `ic_admin` (
  `admin_id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `realname` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(40) DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `lastloginip` varchar(15) DEFAULT '0',
  `lastlogintime` int(10) unsigned DEFAULT '0',
  `token` varchar(32) DEFAULT '' COMMENT '自动登录令牌',
  PRIMARY KEY (`admin_id`),
  KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ic_advertise_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_advertise_type`;
CREATE TABLE `ic_advertise_type` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `advertise_name` varchar(20) NOT NULL DEFAULT '' COMMENT '广告植入名称',
  `add_time` varchar(12) NOT NULL COMMENT '添加时间',
  `status` tinyint(2) DEFAULT '1' COMMENT '状态，0为禁用，1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='广告植入方式';

-- ----------------------------
-- Table structure for ic_apply_log
-- ----------------------------
DROP TABLE IF EXISTS `ic_apply_log`;
CREATE TABLE `ic_apply_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) NOT NULL COMMENT '发布方id',
  `aid` int(11) NOT NULL COMMENT '申请方id',
  `note` varchar(50) NOT NULL COMMENT '发布方和申请发达成合作信息',
  `add_time` varchar(12) NOT NULL COMMENT '达成合作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合作动态表，申请活动成功后插入记录';

-- ----------------------------
-- Table structure for ic_apply_protect
-- ----------------------------
DROP TABLE IF EXISTS `ic_apply_protect`;
CREATE TABLE `ic_apply_protect` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态，0为待处理，1为已处理',
  `nameed` varchar(20) NOT NULL COMMENT '被投诉人',
  `content` varchar(20) NOT NULL COMMENT '合作内容',
  `compiain_content` varchar(200) NOT NULL COMMENT '投诉内容',
  `img_path` varchar(60) NOT NULL COMMENT '照片路径',
  `add_time` varchar(12) NOT NULL COMMENT '投诉时间',
  `option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `option_time` varchar(12) DEFAULT '' COMMENT '审核操作时间',
  `option_content` varchar(50) DEFAULT '' COMMENT '处理结果反馈',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='申请投诉';

-- ----------------------------
-- Table structure for ic_area
-- ----------------------------
DROP TABLE IF EXISTS `ic_area`;
CREATE TABLE `ic_area` (
  `area_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '地区id',
  `parent_id` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '地区父id',
  `area_name` varchar(120) NOT NULL DEFAULT '' COMMENT '地区名称',
  `area_type` tinyint(1) NOT NULL DEFAULT '2' COMMENT '地区类型 0:country,1:province,2:city,3:district',
  PRIMARY KEY (`area_id`),
  KEY `parent_id` (`parent_id`),
  KEY `area_type` (`area_type`)
) ENGINE=MyISAM AUTO_INCREMENT=3429 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ic_artist_publish
-- ----------------------------
DROP TABLE IF EXISTS `ic_artist_publish`;
CREATE TABLE `ic_artist_publish` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(2) DEFAULT '0' COMMENT '发布状态：0为正在审核，1为已发布，2为活动进行中，3为已完成、',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '需求名称',
  `art_type` tinyint(2) DEFAULT '0' COMMENT '演艺类型',
  `activity_name` varchar(20) NOT NULL DEFAULT '' COMMENT '活动名称',
  `money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '预算佣金',
  `prepay_ratio` int(3) NOT NULL COMMENT '预付比例',
  `activity_start_time` varchar(12) NOT NULL DEFAULT '' COMMENT '活动开始时间',
  `activity_end_time` varchar(12) NOT NULL DEFAULT '' COMMENT '活动结束时间',
  `province_id` int(11) DEFAULT '0' COMMENT '省份id',
  `city_id` int(11) DEFAULT '0' COMMENT '城市id',
  `county_id` int(11) DEFAULT '0' COMMENT '县id',
  `address` varchar(200) DEFAULT '' COMMENT '具体地址',
  `apply_total` varchar(3) NOT NULL DEFAULT '' COMMENT '申请名额',
  `demand_desc` varchar(100) NOT NULL DEFAULT '' COMMENT '需求描述',
  `check_id` varchar(10) DEFAULT '' COMMENT '验收方式,1为现场验收，2为捷报验收',
  `listorder` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `add_time` varchar(12) NOT NULL COMMENT '发布时间',
  `option_name` varchar(50) DEFAULT '' COMMENT '审核操作人',
  `option_time` varchar(12) DEFAULT '' COMMENT '审核操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='演艺需求发布，已停用';

-- ----------------------------
-- Table structure for ic_art_apply
-- ----------------------------
DROP TABLE IF EXISTS `ic_art_apply`;
CREATE TABLE `ic_art_apply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ar_id` int(11) NOT NULL COMMENT '演艺人id',
  `apply_uid` int(11) NOT NULL COMMENT '申请人id',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '申请状态，-1为被拒绝，-2为审核未通过，0为待审核，1为申请中，2为通过申请,-3为已完成',
  `content` varchar(50) NOT NULL COMMENT '申请说明',
  `apply_score` float(3,1) DEFAULT '0.0' COMMENT '申请方对发布方打分',
  `publish_score` float(3,1) DEFAULT '0.0' COMMENT '发布方对申请方打分',
  `apply_comment` varchar(50) DEFAULT '' COMMENT '申请方对发布方的评论',
  `publish_comment` varchar(50) DEFAULT '' COMMENT '发布方对申请方评论',
  `add_time` varchar(12) NOT NULL COMMENT '申请时间',
  `apply_option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `apply_option_time` varchar(12) DEFAULT '' COMMENT '审核操作时间',
  `art_option_time` varchar(12) DEFAULT '' COMMENT '演艺人操作时间',
  `reason` varchar(200) DEFAULT '' COMMENT '活动方拒绝原因',
  `apply_finish_time` varchar(12) NOT NULL COMMENT '申请完成时间，状态为2，时间完成',
  `style` tinyint(1) NOT NULL DEFAULT '4' COMMENT '申请的类型，4为演艺人申请',
  PRIMARY KEY (`id`),
  KEY `apply_uid` (`apply_uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='演艺人申请';

-- ----------------------------
-- Table structure for ic_art_licence
-- ----------------------------
DROP TABLE IF EXISTS `ic_art_licence`;
CREATE TABLE `ic_art_licence` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(1) DEFAULT '0' COMMENT '图片状态，0为正在审核，1为正在使用',
  `name` varchar(50) NOT NULL COMMENT '演艺人证书',
  `path` varchar(200) NOT NULL COMMENT '证书路径',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='演艺人的证书表，每人最多三张';

-- ----------------------------
-- Table structure for ic_art_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_art_type`;
CREATE TABLE `ic_art_type` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '演艺名称',
  `add_time` varchar(12) NOT NULL DEFAULT '' COMMENT '创建时间',
  `status` tinyint(2) DEFAULT '0' COMMENT '状态，0为禁用，1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='演艺类型';

-- ----------------------------
-- Table structure for ic_business_apply
-- ----------------------------
DROP TABLE IF EXISTS `ic_business_apply`;
CREATE TABLE `ic_business_apply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `bp_id` int(11) NOT NULL COMMENT '商业活动id',
  `apply_uid` int(11) NOT NULL COMMENT '申请人id',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '申请状态，-2为被拒绝，-1为审核未通过，0为待审核，2为申请中，1为通过申请',
  `content` varchar(50) NOT NULL COMMENT '申请说明',
  `apply_score` float(3,1) DEFAULT '0.0' COMMENT '申请方对发布方打分',
  `publish_score` float(3,1) DEFAULT '0.0' COMMENT '发布方对申请方打分',
  `apply_comment` varchar(50) DEFAULT '' COMMENT '申请方对发布方的评论',
  `publish_comment` varchar(50) DEFAULT '' COMMENT '发布方对申请方评论',
  `add_time` varchar(12) NOT NULL COMMENT '申请时间',
  `apply_option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `apply_option_time` varchar(12) DEFAULT '' COMMENT '审核操作时间',
  `activity_option_time` varchar(12) DEFAULT '' COMMENT '活动方操作时间',
  `reason` varchar(200) DEFAULT '' COMMENT '活动方拒绝原因',
  `apply_finish_time` varchar(12) NOT NULL COMMENT '申请完成时间，状态为2，时间完成',
  `style` tinyint(1) NOT NULL DEFAULT '1' COMMENT '申请的类型，1为商业活动申请',
  PRIMARY KEY (`id`),
  KEY `apply_uid` (`apply_uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='商业活动申请';

-- ----------------------------
-- Table structure for ic_business_publish
-- ----------------------------
DROP TABLE IF EXISTS `ic_business_publish`;
CREATE TABLE `ic_business_publish` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(2) DEFAULT '0' COMMENT '申请状态，-1为被拒绝，-2为审核未通过，0为待审核，1为申请中，2为通过申请,-3为已完成',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '活动名称',
  `activity_id` tinyint(2) NOT NULL COMMENT '活动类型',
  `activity_name` varchar(50) NOT NULL COMMENT '活动名称',
  `money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '经费预算',
  `prepay_ratio` int(3) NOT NULL COMMENT '预算比例',
  `apply_start_time` varchar(12) NOT NULL DEFAULT '' COMMENT '申请时间开始',
  `apply_end_time` varchar(12) NOT NULL DEFAULT '' COMMENT '申请结束时间',
  `activity_start_time` varchar(12) NOT NULL DEFAULT '' COMMENT '活动开始时间',
  `activity_end_time` varchar(12) NOT NULL COMMENT '活动结束时间',
  `province_id` int(11) DEFAULT '0' COMMENT '省份id',
  `province_name` varchar(50) DEFAULT '' COMMENT '省份名称',
  `city_id` int(11) DEFAULT '0' COMMENT '城市id',
  `city_name` varchar(50) DEFAULT '' COMMENT ' 城市名称',
  `county_id` int(11) DEFAULT '0' COMMENT '县id',
  `county_name` varchar(50) DEFAULT '' COMMENT '县名称',
  `school_id` varchar(30) NOT NULL DEFAULT '' COMMENT '所在院校id,可选多个学校',
  `school_name` varchar(250) NOT NULL DEFAULT '' COMMENT '用户存入多个学校，记录学校名字，并以逗号隔开',
  `school_size` tinyint(1) NOT NULL COMMENT '学校规模',
  `popular` int(6) NOT NULL COMMENT '人气要求',
  `apply_success` int(11) NOT NULL DEFAULT '0' COMMENT '申请通过人数',
  `apply_ing` int(11) NOT NULL DEFAULT '0' COMMENT '正在申请人数',
  `apply_total` int(11) NOT NULL COMMENT '活动申请名额',
  `campaign_id` varchar(20) NOT NULL COMMENT '宣传方式',
  `other` varchar(20) DEFAULT '' COMMENT '其他宣传方式',
  `check_id` varchar(10) NOT NULL DEFAULT '' COMMENT '验收方式,1为现场验收，2为捷报验收',
  `read_total` int(11) DEFAULT '0' COMMENT '阅读量',
  `style` tinyint(1) NOT NULL DEFAULT '1' COMMENT '发布的类型，1为商业活动发布',
  `see` int(11) NOT NULL DEFAULT '0' COMMENT '申请人数变动',
  `list_order` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `add_time` varchar(12) NOT NULL COMMENT '发布时间',
  `option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `option_time` varchar(12) DEFAULT '' COMMENT '认证操作时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='商业活动发布';

-- ----------------------------
-- Table structure for ic_campaign_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_campaign_type`;
CREATE TABLE `ic_campaign_type` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `campaign_name` varchar(20) NOT NULL COMMENT '宣传方式名称',
  `add_time` varchar(12) NOT NULL COMMENT '添加时间',
  `status` tinyint(2) DEFAULT '0' COMMENT '状态，0为禁用，1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='活动宣传方式';

-- ----------------------------
-- Table structure for ic_case_show
-- ----------------------------
DROP TABLE IF EXISTS `ic_case_show`;
CREATE TABLE `ic_case_show` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(1) DEFAULT '0' COMMENT '图片状态，0为正在审核，1为正在使用',
  `case_name` varchar(50) NOT NULL COMMENT '案列名称',
  `case_desc` varchar(255) NOT NULL COMMENT '案列描述',
  `case_time` varchar(12) NOT NULL COMMENT '案列时间',
  `path1` varchar(200) DEFAULT '' COMMENT '案例图片1',
  `path2` varchar(200) DEFAULT '' COMMENT '案例图片2',
  `path3` varchar(200) DEFAULT '' COMMENT '案例图片3',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='传媒公司案列展示，学校组织案列展示，演艺人形象才艺展示';

-- ----------------------------
-- Table structure for ic_certification
-- ----------------------------
DROP TABLE IF EXISTS `ic_certification`;
CREATE TABLE `ic_certification` (
  `uid` int(11) unsigned NOT NULL COMMENT '用户ID',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态,0为默认值待审核，1为完成',
  `role` tinyint(1) NOT NULL COMMENT '用户角色',
  `portrait` varchar(200) NOT NULL COMMENT '正在认证的头像',
  `real_name` varchar(20) NOT NULL COMMENT '真实姓名',
  `gender` tinyint(1) NOT NULL COMMENT '性别 1为男，2为女',
  `price` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '演艺人价格',
  `height` smallint(4) unsigned DEFAULT '0' COMMENT '身高',
  `art_type` tinyint(2) DEFAULT '0' COMMENT '演艺类型',
  `identity` varchar(20) NOT NULL COMMENT '身份证号码',
  `contact_number` varchar(20) NOT NULL COMMENT '电话号码',
  `email` varchar(30) NOT NULL COMMENT '邮箱地址',
  `qq` int(11) NOT NULL COMMENT 'qq号码',
  `province_id` int(11) DEFAULT '0' COMMENT '省份id',
  `province_name` varchar(50) DEFAULT '' COMMENT '省份名称',
  `city_id` int(11) DEFAULT '0' COMMENT '城市id',
  `city_name` varchar(50) DEFAULT '' COMMENT '城市名称',
  `county_id` int(11) DEFAULT '0' COMMENT '县id',
  `county_name` varchar(50) DEFAULT '' COMMENT '县名称',
  `address` varchar(200) DEFAULT '' COMMENT '详细地址',
  `company_name` varchar(100) DEFAULT '' COMMENT '公司名称或校园名称',
  `company_dept` varchar(30) DEFAULT '' COMMENT '部门名称或校园组织名称',
  `company_job` varchar(20) DEFAULT '' COMMENT '担任职务',
  `company_size` tinyint(1) DEFAULT '0' COMMENT '公司规模 1为10人以下，2为10-50人，3为50-100人，4为100人以上',
  `description` varchar(200) NOT NULL DEFAULT '' COMMENT '公司简介，企业简介，演艺人简介，校园组织简介',
  `url` varchar(200) DEFAULT '' COMMENT '演艺人的外链视频地址',
  `url_name` varchar(50) DEFAULT '' COMMENT '演艺人视屏链接名称',
  `licence_path` varchar(200) DEFAULT '' COMMENT '公司执照',
  `add_time` varchar(12) NOT NULL COMMENT '认证时间',
  `option_name` varchar(20) DEFAULT '' COMMENT '审核人姓名',
  `option_time` varchar(12) DEFAULT '' COMMENT '审核时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户认证临时表';

-- ----------------------------
-- Table structure for ic_certified_user
-- ----------------------------
DROP TABLE IF EXISTS `ic_certified_user`;
CREATE TABLE `ic_certified_user` (
  `uid` int(11) unsigned NOT NULL COMMENT '用户ID',
  `real_name` varchar(20) NOT NULL COMMENT '真实姓名',
  `gender` tinyint(1) NOT NULL COMMENT '性别 1为男，2为女',
  `price` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '演艺人价格',
  `height` smallint(4) DEFAULT '0' COMMENT '身高',
  `art_type` tinyint(2) DEFAULT '0' COMMENT '演艺类型',
  `identity` varchar(20) NOT NULL COMMENT '身份证号码',
  `contact_number` varchar(20) NOT NULL COMMENT '电话号码方式',
  `email` varchar(30) NOT NULL COMMENT '邮箱地址',
  `qq` varchar(30) NOT NULL COMMENT 'qq号码',
  `province_id` int(11) DEFAULT '0' COMMENT '省份id',
  `province_name` varchar(50) DEFAULT '' COMMENT '省份名称',
  `city_id` int(11) DEFAULT '0' COMMENT '城市id',
  `city_name` varchar(50) DEFAULT '' COMMENT '城市名称',
  `county_id` int(11) DEFAULT '0' COMMENT '县id',
  `county_name` varchar(50) DEFAULT '' COMMENT '县名称',
  `address` varchar(200) DEFAULT '' COMMENT '详细地址',
  `company_name` varchar(100) DEFAULT '' COMMENT '公司名称或学校名称',
  `company_dept` varchar(30) DEFAULT '' COMMENT '部门名称',
  `company_job` varchar(20) DEFAULT '' COMMENT '担任职务',
  `company_size` tinyint(1) DEFAULT '0' COMMENT '公司规模 1为10人以下，2为10-50人，3为50-100人，4为100人以上',
  `company_size_name` varchar(20) DEFAULT '' COMMENT '冗余字段，公司或组织规模',
  `description` varchar(200) DEFAULT NULL COMMENT '公司简介(200字)',
  `url` varchar(200) DEFAULT '' COMMENT '演艺人视频地址',
  `url_name` varchar(50) DEFAULT '' COMMENT '演艺人视屏链接名称',
  `licence_path` varchar(200) DEFAULT '' COMMENT '公司执照图片路径',
  `score` float(3,1) DEFAULT '0.0' COMMENT '评分(五星级)',
  `read_total` int(11) NOT NULL DEFAULT '0' COMMENT '阅读量',
  `icowry_coin` int(11) NOT NULL DEFAULT '10' COMMENT '珍珠币',
  `listorder` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `add_time` varchar(12) NOT NULL COMMENT '认证时间',
  `cooperation_count` int(5) NOT NULL DEFAULT '0' COMMENT '合作次数统计',
  `comment_count` int(5) NOT NULL DEFAULT '0' COMMENT '评论统计',
  `apply_end_time` varchar(12) NOT NULL DEFAULT '' COMMENT '截止时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='认证用户表';

-- ----------------------------
-- Table structure for ic_check_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_check_type`;
CREATE TABLE `ic_check_type` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `check_name` varchar(20) NOT NULL COMMENT '验收方式名称',
  `add_time` varchar(12) NOT NULL COMMENT '添加验收时间',
  `status` tinyint(2) DEFAULT '0' COMMENT '状态，0为禁用，1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='验收方式';

-- ----------------------------
-- Table structure for ic_coin_cost_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_coin_cost_type`;
CREATE TABLE `ic_coin_cost_type` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `coin_cost_name` varchar(20) NOT NULL COMMENT '珍珠币使用名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='珍珠币使用类型';

-- ----------------------------
-- Table structure for ic_company_img
-- ----------------------------
DROP TABLE IF EXISTS `ic_company_img`;
CREATE TABLE `ic_company_img` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(1) DEFAULT '0' COMMENT '图片状态，0为正在审核，1为正在使用',
  `name` varchar(20) DEFAULT '' COMMENT '照片名称，只有演艺人才艺照片有名字',
  `img_path` varchar(200) NOT NULL COMMENT '图片路径',
  `add_time` varchar(12) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='甲方企业风采照片或演艺人风采';

-- ----------------------------
-- Table structure for ic_company_size
-- ----------------------------
DROP TABLE IF EXISTS `ic_company_size`;
CREATE TABLE `ic_company_size` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `size` varchar(14) NOT NULL COMMENT '人数范围',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='公司规模';

-- ----------------------------
-- Table structure for ic_feedback
-- ----------------------------
DROP TABLE IF EXISTS `ic_feedback`;
CREATE TABLE `ic_feedback` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态，0为待处理，1为已处理',
  `title` varchar(20) NOT NULL COMMENT '反馈标题',
  `content` varchar(200) NOT NULL COMMENT '反馈内容',
  `add_time` varchar(12) NOT NULL COMMENT '反馈时间',
  `option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `option_time` varchar(12) DEFAULT '' COMMENT '审核操作时间',
  `option_content` varchar(50) DEFAULT '' COMMENT '处理结果反馈',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='联系反馈表';

-- ----------------------------
-- Table structure for ic_group_apply
-- ----------------------------
DROP TABLE IF EXISTS `ic_group_apply`;
CREATE TABLE `ic_group_apply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `gp_id` int(11) NOT NULL COMMENT '校园活动id',
  `apply_uid` int(11) NOT NULL COMMENT '申请人id',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '申请状态，-1为被拒绝，-2为审核未通过，0为待审核，1为申请中，2为通过申请,-3为已完成',
  `content` varchar(50) NOT NULL COMMENT '申请说明',
  `apply_score` float(3,1) DEFAULT '0.0' COMMENT '申请方对发布方打分',
  `publish_score` float(3,1) DEFAULT '0.0' COMMENT '发布方对申请方打分',
  `apply_comment` varchar(50) DEFAULT '' COMMENT '申请方对发布方的评论',
  `publish_comment` varchar(50) DEFAULT '' COMMENT '发布方对申请方评论',
  `add_time` varchar(12) NOT NULL COMMENT '申请时间',
  `apply_option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `apply_option_time` varchar(12) DEFAULT '' COMMENT '审核操作时间',
  `activity_option_time` varchar(12) DEFAULT '' COMMENT '活动方操作时间',
  `reason` varchar(200) DEFAULT '' COMMENT '拒绝原因',
  `apply_finish_time` varchar(12) NOT NULL COMMENT '申请完成时间，状态为2，时间完成',
  `style` tinyint(1) NOT NULL DEFAULT '2' COMMENT '申请的类型，2为校园活动',
  PRIMARY KEY (`id`),
  KEY `apply_uid` (`apply_uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='校园活动申请';

-- ----------------------------
-- Table structure for ic_group_publish
-- ----------------------------
DROP TABLE IF EXISTS `ic_group_publish`;
CREATE TABLE `ic_group_publish` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(2) DEFAULT '0' COMMENT '发布状态4为被拒绝，0为正在审核，1为合作中，2待评论，3已完成、',
  `name` varchar(50) NOT NULL COMMENT '活动名称',
  `activity_id` tinyint(2) NOT NULL COMMENT '活动类型',
  `activity_name` varchar(50) NOT NULL COMMENT '活动名称',
  `money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '赞助金额',
  `prepay_ratio` int(3) NOT NULL COMMENT '预付比例',
  `apply_start_time` varchar(12) NOT NULL COMMENT '申请时间开始',
  `apply_end_time` varchar(12) NOT NULL COMMENT '申请结束时间',
  `activity_start_time` varchar(12) NOT NULL COMMENT '活动开始时间',
  `activity_end_time` varchar(12) NOT NULL COMMENT '活动结束时间',
  `province_id` int(11) DEFAULT '0' COMMENT '省份id',
  `province_name` varchar(50) DEFAULT '' COMMENT '省份名称',
  `city_id` int(11) DEFAULT '0' COMMENT '城市id',
  `city_name` varchar(50) DEFAULT '' COMMENT ' 城市名称',
  `county_id` int(11) DEFAULT '0' COMMENT '县id',
  `county_name` varchar(50) DEFAULT '' COMMENT '县名称',
  `school_id` int(11) NOT NULL COMMENT '所在院校id',
  `school_name` varchar(50) NOT NULL COMMENT '所在院校名称',
  `school_size` tinyint(1) DEFAULT '0' COMMENT '校园规模',
  `popular` int(6) NOT NULL COMMENT '人气指数',
  `apply_success` int(11) NOT NULL DEFAULT '0' COMMENT '已经申请成功的人数',
  `apply_ing` int(11) NOT NULL DEFAULT '0' COMMENT '正在申请人数',
  `apply_total` int(11) NOT NULL COMMENT '申请名额总数',
  `advertise_id` varchar(20) NOT NULL COMMENT '宣传方式',
  `other` varchar(20) DEFAULT '' COMMENT '其他广告植入方式',
  `check_id` varchar(10) NOT NULL DEFAULT '' COMMENT '验收方式,1为现场验收，2为捷报验收',
  `read_total` int(11) DEFAULT '0' COMMENT '阅读量',
  `style` tinyint(1) NOT NULL DEFAULT '2' COMMENT '活动的类型，2为校园活动',
  `list_order` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `add_time` varchar(12) NOT NULL COMMENT '发布时间',
  `option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `option_time` varchar(12) DEFAULT '' COMMENT '认证操作时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='校园活动发布';

-- ----------------------------
-- Table structure for ic_icowry_log
-- ----------------------------
DROP TABLE IF EXISTS `ic_icowry_log`;
CREATE TABLE `ic_icowry_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned NOT NULL COMMENT 'ID',
  `coin_cost_id` tinyint(4) NOT NULL COMMENT '珍珠币使用id',
  `coin_cost_name` varchar(10) NOT NULL COMMENT '珍珠币使用名称',
  `coin_number` int(5) NOT NULL COMMENT '珍珠币数量',
  `coin_event` varchar(50) NOT NULL COMMENT '消费事件记录',
  `add_time` varchar(12) NOT NULL COMMENT '消费时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COMMENT='珍珠币记录';

-- ----------------------------
-- Table structure for ic_identity_count
-- ----------------------------
DROP TABLE IF EXISTS `ic_identity_count`;
CREATE TABLE `ic_identity_count` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `count_name` varchar(20) NOT NULL COMMENT '入驻名称',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '入驻数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='入驻信息表';

-- ----------------------------
-- Table structure for ic_identity_img
-- ----------------------------
DROP TABLE IF EXISTS `ic_identity_img`;
CREATE TABLE `ic_identity_img` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(1) DEFAULT '0' COMMENT '图片状态，0为正在审核，1为正在使用',
  `identity_front_path` varchar(200) NOT NULL COMMENT '身份证正面',
  `identity_behind_path` varchar(200) NOT NULL COMMENT '身份证背面',
  `add_time` varchar(12) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='身份证照片信息';

-- ----------------------------
-- Table structure for ic_menu
-- ----------------------------
DROP TABLE IF EXISTS `ic_menu`;
CREATE TABLE `ic_menu` (
  `menu_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL DEFAULT '',
  `parentid` smallint(6) NOT NULL DEFAULT '0',
  `m` varchar(20) NOT NULL,
  `c` varchar(20) NOT NULL DEFAULT '',
  `f` varchar(20) NOT NULL DEFAULT '',
  `img_path` varchar(200) NOT NULL DEFAULT '' COMMENT '菜单图片地址',
  `data` varchar(100) NOT NULL DEFAULT '',
  `listorder` smallint(6) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0为前端导航，1为后台菜单，2为个人中心侧边栏',
  PRIMARY KEY (`menu_id`),
  KEY `listorder` (`listorder`),
  KEY `parentid` (`parentid`),
  KEY `module` (`m`,`c`,`f`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ic_money_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_money_type`;
CREATE TABLE `ic_money_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `money_min` int(9) NOT NULL COMMENT '预算最小值',
  `money_max` int(9) NOT NULL COMMENT '预算最大值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='预算表';

-- ----------------------------
-- Table structure for ic_organize_size
-- ----------------------------
DROP TABLE IF EXISTS `ic_organize_size`;
CREATE TABLE `ic_organize_size` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `size` varchar(10) NOT NULL COMMENT '人数范围',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='学校或组织规模';

-- ----------------------------
-- Table structure for ic_resources_img
-- ----------------------------
DROP TABLE IF EXISTS `ic_resources_img`;
CREATE TABLE `ic_resources_img` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `rp_id` int(11) NOT NULL COMMENT '活动id',
  `status` tinyint(1) DEFAULT '0' COMMENT '图片状态，0为正在审核，1为正在使用',
  `resource_path` varchar(200) NOT NULL COMMENT '图片路径',
  `add_time` varchar(12) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `rp_id` (`rp_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COMMENT='资源图片信息';

-- ----------------------------
-- Table structure for ic_resources_publish
-- ----------------------------
DROP TABLE IF EXISTS `ic_resources_publish`;
CREATE TABLE `ic_resources_publish` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `status` tinyint(2) DEFAULT '0' COMMENT '发布状态：-1为被拒绝，4为正在审核，1为合作中，2待评论，3已完成、',
  `name` varchar(20) NOT NULL COMMENT '传媒资源名称',
  `province_id` int(11) DEFAULT '0' COMMENT '省份id',
  `province_name` varchar(50) DEFAULT '' COMMENT '省份名称',
  `city_id` int(11) DEFAULT '0' COMMENT '城市id',
  `city_name` varchar(50) DEFAULT '' COMMENT ' 城市名称',
  `county_id` int(11) DEFAULT '0' COMMENT '县id',
  `county_name` varchar(50) DEFAULT '' COMMENT '县名称',
  `school_id` int(11) NOT NULL COMMENT '所在学校，可以选择多个存放id,可以选择不限',
  `school_name` varchar(255) DEFAULT '' COMMENT '用户存入多个学校，记录学校名字，并以逗号隔开',
  `school_size` tinyint(1) DEFAULT '0' COMMENT '校园规模',
  `resource_aid` int(10) NOT NULL COMMENT '资源类型1id',
  `resource_aname` varchar(50) NOT NULL COMMENT '资源类型1名称',
  `resource_bid` int(10) DEFAULT '0' COMMENT '资源类型2id',
  `resource_bname` varchar(50) DEFAULT '' COMMENT '资源类型2名称，可为空',
  `people` int(6) NOT NULL COMMENT '日流量，粉丝数，日受众人数',
  `area` int(5) DEFAULT '0' COMMENT '场馆面积',
  `money` varchar(10) NOT NULL COMMENT '每天的价格，带单位',
  `prepay_ratio` int(3) NOT NULL COMMENT '预付比例',
  `activity_start_time` varchar(12) NOT NULL COMMENT '资源可用开始时间',
  `activity_end_time` varchar(12) NOT NULL COMMENT '资源结束时间',
  `resource_desc` varchar(200) NOT NULL COMMENT '资源描述',
  `check_id` varchar(10) DEFAULT '' COMMENT '验收方式,1为现场验收，2为捷报验收',
  `read_total` int(11) DEFAULT '0' COMMENT '阅读量',
  `list_order` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序',
  `add_time` varchar(12) NOT NULL COMMENT '发布时间',
  `option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `option_time` varchar(12) DEFAULT '' COMMENT '认证操作时间',
  `apply_end_time` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '截止时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='传媒资源发布';

-- ----------------------------
-- Table structure for ic_resource_apply
-- ----------------------------
DROP TABLE IF EXISTS `ic_resource_apply`;
CREATE TABLE `ic_resource_apply` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `rp_id` int(11) NOT NULL COMMENT '资源活动id',
  `apply_uid` int(11) NOT NULL COMMENT '申请人id',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '申请状态，-1为被拒绝，-2为审核未通过，0为待审核，1为申请中，2为通过申请,-3为已完成',
  `content` varchar(50) NOT NULL COMMENT '申请说明',
  `apply_score` float(3,1) DEFAULT '0.0' COMMENT '申请方对发布方打分',
  `publish_score` float(3,1) DEFAULT '0.0' COMMENT '发布方对申请方打分',
  `apply_comment` varchar(50) DEFAULT '' COMMENT '申请方对发布方的评论',
  `publish_comment` varchar(50) DEFAULT '' COMMENT '发布方对申请方评论',
  `add_time` varchar(12) NOT NULL COMMENT '申请时间',
  `apply_option_name` varchar(12) DEFAULT '' COMMENT '审核操作人',
  `apply_option_time` varchar(12) DEFAULT '' COMMENT '审核操作时间',
  `activity_option_time` varchar(12) DEFAULT '' COMMENT '活动方操作时间',
  `reason` varchar(200) DEFAULT '' COMMENT '拒绝原因',
  `apply_finish_time` varchar(12) NOT NULL COMMENT '申请完成时间，状态为2，时间完成',
  `style` tinyint(1) NOT NULL DEFAULT '3' COMMENT '申请的类型，3为资源申请',
  PRIMARY KEY (`id`),
  KEY `apply_uid` (`apply_uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='资源活动申请';

-- ----------------------------
-- Table structure for ic_resource_type
-- ----------------------------
DROP TABLE IF EXISTS `ic_resource_type`;
CREATE TABLE `ic_resource_type` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `resource_name` varchar(20) NOT NULL COMMENT '资源名称',
  `parent_id` int(11) NOT NULL COMMENT '父级id',
  `add_time` varchar(12) NOT NULL COMMENT '添加时间',
  `status` tinyint(2) DEFAULT '1' COMMENT '状态，0为禁用，1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='资源类型';

-- ----------------------------
-- Table structure for ic_role
-- ----------------------------
DROP TABLE IF EXISTS `ic_role`;
CREATE TABLE `ic_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(10) NOT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='角色对应表';

-- ----------------------------
-- Table structure for ic_school
-- ----------------------------
DROP TABLE IF EXISTS `ic_school`;
CREATE TABLE `ic_school` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `area_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '地区ID',
  `school_name` varchar(50) NOT NULL DEFAULT '' COMMENT '学校名称',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用',
  `add_time` varchar(12) NOT NULL DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=443 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ic_school_size
-- ----------------------------
DROP TABLE IF EXISTS `ic_school_size`;
CREATE TABLE `ic_school_size` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `size` varchar(13) NOT NULL COMMENT '人数范围',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='校园规模';

-- ----------------------------
-- Table structure for ic_score
-- ----------------------------
DROP TABLE IF EXISTS `ic_score`;
CREATE TABLE `ic_score` (
  `uid` int(11) unsigned NOT NULL COMMENT 'ID',
  `total_score` double(10,1) NOT NULL COMMENT '总分',
  `count` int(11) NOT NULL COMMENT '发布总条数',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='统计表';

-- ----------------------------
-- Table structure for ic_tag
-- ----------------------------
DROP TABLE IF EXISTS `ic_tag`;
CREATE TABLE `ic_tag` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `tag_name` varchar(20) NOT NULL COMMENT '标签名',
  `tag_content` varchar(50) DEFAULT '' COMMENT '标签详细描述',
  `type` tinyint(4) NOT NULL COMMENT '1为没有详细描述，2为有详细描述',
  `status` tinyint(1) NOT NULL COMMENT '状态，0为隐藏，1为正常显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='标签表';

-- ----------------------------
-- Table structure for ic_user
-- ----------------------------
DROP TABLE IF EXISTS `ic_user`;
CREATE TABLE `ic_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `status` tinyint(1) DEFAULT '1' COMMENT '是否禁用，默认1为启用，0为禁用',
  `phone` varchar(12) NOT NULL COMMENT '手机号',
  `token` varchar(32) NOT NULL COMMENT '自动登录令牌',
  `password` varchar(35) NOT NULL COMMENT '用户密码',
  `salt` varchar(6) NOT NULL COMMENT '盐',
  `portrait` varchar(255) DEFAULT '' COMMENT '用户头像',
  `role` tinyint(1) DEFAULT '0' COMMENT '用户角色：0为登录用户，1为甲方公司，2为传媒公司，3为校园组织，4为演艺人。',
  `create_time` varchar(12) NOT NULL COMMENT '注册时间',
  `create_ip` varchar(20) NOT NULL DEFAULT '0.0.0.0' COMMENT '注册IP',
  `last_time` varchar(12) NOT NULL COMMENT '上一次登录的时间',
  `last_ip` varchar(20) NOT NULL DEFAULT '0.0.0.0' COMMENT '上一次登录的IP',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
SET FOREIGN_KEY_CHECKS=1;
