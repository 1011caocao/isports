<?php
/**
 * Created by PhpStorm.
 * User: maikuraki
 * Date: 2017/2/28
 * Time: 1:09
 */

namespace Common\Model;

use Think\Model;

class IdentityImgModel extends Model
{
    /**
     * 获取用户身份证图片路径
     */
    public function getUserIdentityImg($uid,$status=1)
    {
        $data['status'] = $status;
        $data['uid'] = $uid;
        $row = M('IdentityImg')->where($data)->find();
        return $row?$row:false;
    }
}