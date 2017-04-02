<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2017/1/6
 * Time: 15:43
 */

namespace Home\Controller;


class MessageCenterController extends  IdentityController
{
    public function activityMsg()
    {
        $this->display('activityMsg');
    }
    public function systemMsg()
    {
        $this->display('systemMsg');
    }
}