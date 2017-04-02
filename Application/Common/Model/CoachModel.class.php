<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/31
 * Time: 18:45
 */

namespace Common\Model;


use Think\Model;

class CoachModel extends Model
{
    public function getCoach()
    {
        return $this->select();
    }
}