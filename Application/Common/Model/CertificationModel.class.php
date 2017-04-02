<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/1/5
 * Time: 13:52
 */

namespace Common\Model;


use Think\Model;
use Think\Upload;

class CertificationModel extends Model
{
    //自动验证
    protected $_validate=array(
       array('real_name','require','真实姓名不能为空'),
       array('identity','require','身份证号码不能为空'),
       array('description','require','身份证号码不能为空'),
       array('identity','/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/','身份证号码不正确'),
       array('contact_number','require','联系电话不能为空'),
       array('email','require','邮箱地址不能为空'),
       array('email','email','邮箱格式不正确'),
       array('qq','require','qq不能为空'),
       array('contact_number','/^1[23578]\d{9}$/','联系电话格式错误'),
       array('height','number','身高输入格式不合法'),
    );
    //自动完成
    protected $_auto=array(
        array('add_time',NOW_TIME),
    );
    
    /**
     * 检查当前认证是否合法
     */
    public function checkRole()
    {
    	$type = I('post.form');
    	$role = session('USER.role');
    	//已经认证为某个角色但是更新认证信息不符合
    	if($role && $type!=$role){
    		return false;
    	}
    	return true;
    }

    /**
     * 检查是否有正在审核的信息
     */
    public function checkStatus()
    {
    	//获取认证状态,1为正在审核中，0为没有审核
    	$user = M('Certification')->where(array('uid'=>session('USER.id'),'status'=>0))->find();
		//myPrint($user);
    	$status = $user?1:0;
    	return $status;
    }

    /**************************提交认证*****************************/

	/**
	 * 提交甲方企业认证
	 * @return boolean
	 */
    public function addCompany()
    {
        myPrint($this->data());
        //开启事务
        $this->startTrans();
        //认证的角色
        $this->data['role']=1;
        $this->data['status']=0;
        //获取当前用户的id
        $this->data['uid'] = session('USER.id');
		//当前用户的province_name,county_name,city_name
		$this->data['province_name']=D('Area')->getNameById($this->data['province_id']);
		$this->data['city_name']=D('Area')->getNameById($this->data['city_id']);
		$this->data['county_name']=D('Area')->getNameById($this->data['county_id']);
        /********************图片上传******************/
		//分割数组(0,1为身份证，2为头像，3为营业执照，4为案例case_show，最多3个)
		$Data = array_chunk($_FILES, 1,true);
		//myPrint($Data);
    	//第一步，上传身份证（存在WWW目录外）
    	if(!$this->uploadIdentity($Data[0], $Data[1])) return false;
        //第二步，上传头像
		$portraitRes = $this->uploadPortrait($Data[2]);
		if(!$portraitRes) return false;
		$this->data['portrait'] = $portraitRes;
		//第三步，保存营业执照，证件
        $licenceRes = $this->uploadLicence($Data[3]);
        if(!$licenceRes) return false;
        $this->data['licence_path'] = $licenceRes;
        //第四步，保存企业风采展示(存到company_img)
        $companyImgRes = $this->uploadCompanyImg($Data[4]);
        if(!$companyImgRes) return false;
       //保存基本信息
       $info = M('Certification')->find(session('USER.id'));
       if($info){//修改
       		$res = $this->save(); 
       }else{//新增
       		$res = $this->add();
       }
	   if($res===false){
       		$this->error ='保存失败';
       		$this->rollback();
            return false;
       }
       //提交
       $this->commit();
       return true;
    }

    /**
     * 提交申请传媒公司认证
     * @return boolean
     */
	public function addResource()
	{
		//开启事物
		$this->startTrans();
		//认证的角色
		$this->data['role']=2;
		$this->data['status']=0;
		//获取当前用户的id
		$this->data['uid'] = session('USER.id');
		//当前用户的province_name,county_name,city_name
		$this->data['province_name']=D('Area')->getNameById($this->data['province_id']);
		$this->data['city_name']=D('Area')->getNameById($this->data['city_id']);
		$this->data['county_name']=D('Area')->getNameById($this->data['county_id']);
		
		/***********************图片上传*******************/
		$identityA['identity1'] = $_FILES['identity1'];
		$identityB['identity2'] = $_FILES['identity2'];
		$portrait['portrait'] = $_FILES['portrait'];
		$licence['licence'] = $_FILES['licence'];
		$case_img0['case_img0'] = $_FILES['case_img0'];
		$case_img1['case_img1'] = $_FILES['case_img1'];
		$case_img2['case_img2'] = $_FILES['case_img2'];
		//第一步，上传身份证（存在WWW目录外）
		if(!$this->uploadIdentity($identityA, $identityB)) return false;
		//第二步，上传头像
		$portraitRes = $this->uploadPortrait($portrait);
		if(!$portraitRes) return false;
		$this->data['portrait'] = $portraitRes;
		//第三步，保存营业执照，证件
		$licenceRes = $this->uploadLicence($licence);
		if(!$licenceRes) return false;
		$this->data['licence_path'] = $licenceRes;
		//第四步，保存公司案例展示(存到case_show)
		$caseShowRes = $this->uploadCaseShow($case_img0, $case_img1, $case_img2);
		if(!$caseShowRes) return false;
		//保存基本信息
		$info = M('Certification')->find(session('USER.id'));
		if($info){//修改
			$res = $this->save();
		}else{//新增
			$res = $this->add();
		}
		if($res===false){
			$this->error ='保存失败';
			$this->rollback();
			return false;
		}
		//提交 
		$this->commit();
		return true;
	}
    
    /**
     * 提交申请校园组织认证
     * @return boolean
     */
	public function addGroup()
	{
		//开启事物
		$this->startTrans();
		//认证的角色
		$this->data['role']=3;
		$this->data['status']=0;
		$this->data['company_name'] = M('School')->where(array('id'=>array('eq',I('post.school_id'))))->getField('school_name');
		//获取当前用户的id
		$this->data['uid'] = session('USER.id');
		//当前用户的province_name,county_name,city_name
		$this->data['province_name']=D('Area')->getNameById($this->data['province_id']);
		$this->data['city_name']=D('Area')->getNameById($this->data['city_id']);
		$this->data['county_name']=D('Area')->getNameById($this->data['county_id']);
		//图片上传
		//分割数组(0,1为身份证，2为头像，3为营业执照，4为案例case_show，最多3个)
		$identityA['identity1'] = $_FILES['identity1'];
		$identityB['identity2'] = $_FILES['identity2'];
		$portrait['portrait'] = $_FILES['portrait'];
		$licence['licence'] = $_FILES['licence'];
		$case_img0['case_img0'] = $_FILES['case_img0'];
		$case_img1['case_img1'] = $_FILES['case_img1'];
		$case_img2['case_img2'] = $_FILES['case_img2'];
		$companyImg['company_img'] = $_FILES['company_img'];
		//第一步，上传身份证（存在WWW目录外）
		if(!$this->uploadIdentity($identityA, $identityB)) return false;
		//第二步，上传头像
		$portraitRes = $this->uploadPortrait($portrait);
		if(!$portraitRes) return false;
		$this->data['portrait'] = $portraitRes;
		//第三步，保存营业执照，证件
		$licenceRes = $this->uploadLicence($licence);
		if(!$licenceRes) return false;
		$this->data['licence_path'] = $licenceRes;
		//第四步，保存企业风采展示(存到company_img)
		$companyImgRes = $this->uploadCompanyImg($companyImg);
		if(!$companyImgRes) return false;
		//第五步，保存组织案例展示(存到case_show)
		$caseShowRes = $this->uploadCaseShow($case_img0, $case_img1, $case_img2);
		if(!$caseShowRes) return false;
		//保存基本信息
		$info = M('Certification')->find(session('USER.id'));
		if($info){//修改
			$res = $this->save();
		}else{//新增
			$res = $this->add();
		}
		if($res===false){
			$this->error ='保存失败';
			$this->rollback();
			return false;
		}
		//提交
		$this->commit();
		return true;
	}
	
	/**
	 * 提交申请演艺人认证
     * @return boolean
	 */
	public function addActor()
	{
		//开启事物
		$this->startTrans();
		//认证的角色
		$this->data['role']=4;
		$this->data['status']=0;
		//获取当前用户的id
		$this->data['uid'] = session('USER.id');
		//当前用户的province_name,county_name,city_name
		$this->data['province_name']=D('Area')->getNameById($this->data['province_id']);
		$this->data['city_name']=D('Area')->getNameById($this->data['city_id']);
		$this->data['county_name']=D('Area')->getNameById($this->data['county_id']);
		
		//图片上传
		//分割数组(0,1为身份证，2为头像，3为营业执照，4为案例case_show，最多3个)
		$identityA['identity1'] = $_FILES['identity1'];
		$identityB['identity2'] = $_FILES['identity2'];
		$portrait['portrait'] = $_FILES['portrait'];
		$licenceName = I('post.licence_name');
		$licenceImg['licence_img'] = $_FILES['licence_img'];
		$artName = I('post.art_name');
		$artImg['art_img'] = $_FILES['art_img'];
		//第一步，上传身份证（存在WWW目录外）
		if(!$this->uploadIdentity($identityA, $identityB)) return false;
		//第二步，上传头像
		$portraitRes = $this->uploadPortrait($portrait);
		if(!$portraitRes) return false;
		$this->data['portrait'] = $portraitRes;
		//第三步，保存相关证书，最少一张，最多三张。
		$licenceRes = $this->uploadActorLicence($licenceImg,$licenceName);
		if(!$licenceRes) return false;
		//第四步，保存形象才艺展示(存到company_img)
		$artImgRes = $this->uploadArtImg($artImg,$artName);
		if(!$artImgRes) return false;

		//保存基本信息
		$info = M('Certification')->find(session('USER.id'));
		if($info){//修改
			$res = $this->save();
		}else{//新增
			$res = $this->add();
		}
		if($res===false){
			$this->error ='保存失败';
			$this->rollback();
			return false;
		}
		//提交
		$this->commit();
		return true;
	}
	


    /************************显示信息****************************/

    /**
     * 获取用户的待认证审核信息
     * 根据角色分别取图片
     *
     * @param int $uid 用户ID
     */
    public function getUserInfo($uid)
    {
        //获取审核的基本信息
        $where['status'] = 0;
        $row = $this->where($where)->find($uid);
        if(!$row){
            $this->error = '不存在的用户信息';
            return false;
        }
        //获取身份证信息,第二个参数为状态，0未审核，默认为已审核
        $identityImg = D('IdentityImg')->getUserIdentityImg($uid,0);
        $role=$row['role'];
        //获取企业风采图片
        if($role==1||$role==3||$role==4){
            $companyImgs=M('CompanyImg')->where(array('uid'=>$uid,'status'=>0))->select();
        }
        if($role==4){
            //演艺人的演艺类型
            $artType=M('ArtType')->where(array('id'=>$row['art_type']))->getField('name');
            $artLicences=M('ArtLicence')->where(array('uid'=>$uid,'status'=>0))->select();
        }
        //获取案例展示
        if($role==2||$role==3){
            $caseShows=M('CaseShow')->where(array('uid'=>$uid,'status'=>0))->select();
        }
        //案例中的照片有可能只有两张或者一张,先做处理，方便前端展示
        foreach($caseShows as $k=>$v){
            $v['caseShowImgs']=(array_filter(array($v['path1'],$v['path2'],$v['path3'])));
            $caseShows[$k]=$v;
        }
        $row['artType']=$artType;
        $row['identityImg']=$identityImg;
        $row['companyImgs']=$companyImgs;
        $row['artLicences']=$artLicences;
        $row['caseShows']=$caseShows;
//        myPrint($row);
        return $row;
    }


    /************************上传图片方法****************************/

    /**
     * 上传身份证图片
     * @param unknown $identityA
     * @param unknown $identityB
     * @param unknown $uid
     * @return boolean
     */
    protected function uploadIdentity($identityA,$identityB)
    {
        $upload = new Upload();
        $upload->rootPath = C('BASE_IDENTITY_PATH');
        $identityARes = $upload->upload($identityA);
        $identityBRes = $upload->upload($identityB);
        if($identityARes && $identityBRes){
            //保存身份证图片
            $identityData=array(
                'uid' => session('USER.id'),
                'identity_front_path' => C('BASE_IDENTITY_PATH').$identityARes['identity1']['savepath'].$identityARes['identity1']['savename'],
                'identity_behind_path' => C('BASE_IDENTITY_PATH').$identityBRes['identity2']['savepath'].$identityBRes['identity2']['savename'],
                'add_time' => NOW_TIME
            );
            if (M('IdentityImg')->add($identityData)===false) {
                $this->error='身份证照片添加错误';
                $this->rollback();
                return false;
            }
            return true;
        }
        $this->error='上传图片为空';
        return false;
    }

    /**
     * 上传头像图片
     * @return boolean
     */
    protected function uploadPortrait($portrait)
    {
        //设置跟目录到public
        $upload = new Upload();
        $upload->rootPath = '.'.C('BASE_UPLOAD_PATH');
        $upload->savePath = C('PORTRAIT_SAVE_PATH');
        $portraitRes = $upload->upload($portrait);
        if(!$portraitRes){
            $this->error='上传头像为空';
            return false;
        }
        return C('BASE_UPLOAD_PATH').$portraitRes['portrait']['savepath'].$portraitRes['portrait']['savename'];
    }

    /**
     * 上传营业执照，证件图片
     * @return boolean
     */
    protected function uploadLicence($licence)
    {
        $upload = new Upload();
        $upload->rootPath = '.'.C('BASE_UPLOAD_PATH');
        $upload->savePath = C('LICENCE_SAVE_PATH');
        $licenceRes = $upload->upload($licence);
        if(!$licenceRes){
            $this->error='上传证件为空';
            return false;
        }
        return C('BASE_UPLOAD_PATH').$licenceRes['licence']['savepath'].$licenceRes['licence']['savename'];
    }

    /**
     * 上传公司风采展示照片
     * @return boolean
     */
    protected function uploadCompanyImg($companyImg)
    {
        //判断公司照片不能超过三张
        if(count($companyImg['company_img']['name'])>3){
            $this->error='超出图片上传数量';
            return false;
        }
        $upload = new Upload();
        $upload->rootPath = '.'.C('BASE_UPLOAD_PATH');
        $upload->savePath = C('COMPANY_IMG_SAVE_PATH');
        $companyImgRes = $upload->upload($companyImg);
        if(!$companyImgRes){
            $this->error='上传照片为空';
            return false;
        }
        foreach ($companyImgRes as $val){
            $companyImgData[] = array(
                'uid'=>session('USER.id'),
                'img_path'=>C('BASE_UPLOAD_PATH').$val['savepath'].$val['savename'],
                'add_time'=>NOW_TIME
            );
        }
        if (M('CompanyImg')->addAll($companyImgData)===false) {
            $this->error='公司照片添加错误';
            $this->rollback();
            return false;
        }
        return true;
    }

    /**
     * 上传公司案例展示图片
     * @return boolean
     */
    protected function uploadCaseShow($case1,$case2,$case3)
    {
        $upload = new Upload();
        $upload->rootPath = '.'.C('BASE_UPLOAD_PATH');
        $upload->savePath = C('CASE_SHOW_SAVE_PATH');
        //案例数据
        $caseTime = I('post.case_time');
        $caseName = I('post.case_name');
        $caseDesc = I('post.case_desc');
        $caseImgRes[] = $upload->upload($case1);
        $caseImgRes[] = $upload->upload($case2);
        $caseImgRes[] = $upload->upload($case3);
        //计数
        $num = 0;
        //循环三个案例的图片组
        foreach ($caseImgRes as $key=>$val){
            //案例日期，名称，简介，图片都不为空，就组装数组
            if($val && $caseName[$key] && $caseDesc[$key] && $caseImgRes[$key]){
                //并且每个案例不能超过三张图片
                if(count($val)>3){
                    $this->error='超出案例照片上传数量';
                    return false;
                }
                $num++;
                $caseImgData[] = array(
                    'uid'=>session('USER.id'),
                    'case_time'=>$caseTime[$key],
                    'case_name'=>$caseName[$key],
                    'case_desc'=>$caseDesc[$key],
                    'path1'=>$val[0]['savename']?C('BASE_UPLOAD_PATH').$val[0]['savepath'].$val[0]['savename']:'',
                    'path2'=>$val[1]['savename']?C('BASE_UPLOAD_PATH').$val[1]['savepath'].$val[1]['savename']:'',
                    'path3'=>$val[2]['savename']?C('BASE_UPLOAD_PATH').$val[2]['savepath'].$val[2]['savename']:''
                );
            }
        }
        //案例不能为空
        if(!$num){
            $this->error='至少上传一个案例';
            return false;
        }
        //判断案例不能超过三个
        if($num>3){
            $this->error='超出案例上传数量';
            return false;
        }
        if (M('CaseShow')->addAll($caseImgData)===false) {
            $this->error='案例照片添加错误';
            $this->rollback();
            return false;
        }
        return true;
    }

    /**
     * 保存演艺人相关证书
     * @return boolean
     */
    protected function uploadActorLicence($licenceImg,$licenceName){
        //判断公司照片不能超过三张
        if(count($licenceImg['licence_img']['name'])>3){
            $this->error='超出图片上传数量';
            return false;
        }
        $upload = new Upload();
        $upload->rootPath = '.'.C('BASE_UPLOAD_PATH');
        $upload->savePath = C('LICENCE_SAVE_PATH');
        $licenceImgRes = $upload->upload($licenceImg);
        if(!$licenceImgRes){
            $this->error='上传照片为空';
            return false;
        }
        foreach ($licenceImgRes as $key=>$val){
            $licenceImgData[] = array(
                'uid'=>session('USER.id'),
                'name'=>$licenceName[$key],
                'path'=>C('BASE_UPLOAD_PATH').$val['savepath'].$val['savename'],
                'add_time'=>NOW_TIME
            );
        }
        if (M('ArtLicence')->addAll($licenceImgData)===false) {
            $this->error='公司照片添加错误';
            $this->rollback();
            return false;
        }
        return true;
    }

    /**
     * 保存演艺人形象才艺展示图片
     * @return boolean
     */
    protected function uploadArtImg($artImg,$artName){
        //判断公司照片不能超过三张
        if(count($artImg['art_img']['name'])>3){
            $this->error='超出图片上传数量';
            return false;
        }
        $upload = new Upload();
        $upload->rootPath = '.'.C('BASE_UPLOAD_PATH');
        $upload->savePath = C('ART_SHOW_SAVE_PATH');
        $artImgRes = $upload->upload($artImg);
        if(!$artImgRes){
            $this->error='上传照片为空';
            return false;
        }
        foreach ($artImgRes as $key=>$val){
            $artImgData[] = array(
                'uid'=>session('USER.id'),
                'name'=>$artName[$key],
                'img_path'=>C('BASE_UPLOAD_PATH').$val['savepath'].$val['savename'],
                'add_time'=>NOW_TIME
            );
        }
        if (M('CompanyImg')->addAll($artImgData)===false) {
            $this->error='形象才艺照片添加错误';
            $this->rollback();
            return false;
        }
        return true;
    }

}