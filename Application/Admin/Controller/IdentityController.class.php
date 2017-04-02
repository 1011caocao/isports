<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/3/2
 * Time: 16:15
 */

namespace Admin\Controller;


class IdentityController extends CommonController
{
    /**
     * @param $url
     * 身份证照片输出
     */
    public function identityImg($url)
    {
        header("Content-Type: image/jpg; charset=utf-8");
        readfile($url);
    }
}