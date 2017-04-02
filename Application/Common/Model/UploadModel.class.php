<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/1/10
 * Time: 10:57
 */

namespace Common\Model;


use Think\Upload;

class UploadModel
{
	
	
    public function uploadTest($files)
    {
//     	echo $this->conf['savePath'];die;
//        $upload = new Upload($this->$conf);
        //保存
//        $fileinfo = $upload->upload($files);
//        //返回结果
//        $fileinfo = array_pop($fileinfo);
//        if (!$fileinfo) {
//            return false;
//        } else {
//            return C('BASE_URL') . $upload->rootPath . $fileinfo['savepath'] . $fileinfo['savename'];
//        }
    }
    public function upload()
    {
        $data=I('post.');
        $type=$data['type'];
        $base64=$data['img'];
        //var_dump($data);
        //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
        $base64_image = str_replace(' ', '+', $base64);
        if(preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $result)){
            //匹配成功
            //加上后缀的图片名称，拼接上uniqid时间戳
            $image_name = uniqid().'.'.$result[2];
            //根据传过来的参数，判断上传的图片的种类，头像，身份证等,创建目录
            if(!file_exists("Public/upload/{$type}")){
                mkdir("Public/upload/{$type}");
            }
            //时间目录
            $time=date('Ym');
            //创建时间目录，按照年月的方式
            if(!file_exists("Public/upload/{$type}/{$time}")){
                mkdir("Public/upload/{$type}/{$time}");
            }
            $image_file = "Public/upload/{$type}/{$time}/{$image_name}";
            //服务器文件存储路径
            if (file_put_contents($image_file, base64_decode(str_replace($result[1], '', $base64_image)))){
            	$image_path = '/'.$image_file;
            	//如果上传的是头像
            	if($type=='portrait'){
            		//数据修改
            		D('User')->where(array('id'=>get_user_id()))->setField('portrait',$image_path);
            		//session修改
            		session('USER.portrait',$image_path);
            	}
                return  $image_path;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function uploadTest2()
    {
        $data=I('post.');
        $type=$data['type'];
        $base64=$data['img'];
        //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
        $base64_image = str_replace(' ', '+', $base64);
        if(preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $result)){
            //匹配成功
            //获取当前用户的id
            $user=session('USER');
            //加上后缀的图片名称,判断身份证正反面
            if($type=='identity_a'){
                $image_name=$user['id'].'a'.'.'.$result[2];
            }elseif($type=='identity_b'){
                $image_name=$user['id'].'a'.'.'.$result[2];
            }
            //时间目录
            $time=date('Y-m');
            //创建时间目录，按照年月的方式
            if(!file_exists("e:/identity_card")){
                mkdir("e:/identity_card");
            }
            $image_file = "e:/identity_card/{$image_name}";
            //服务器文件存储路径
            if (file_put_contents($image_file, base64_decode(str_replace($result[1], '', $base64_image)))){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}