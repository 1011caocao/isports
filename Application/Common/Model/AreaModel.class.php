<?php
/**
 * Created by PhpStorm.
 * User: cqin
 * Date: 2016/12/26
 * Time: 14:04
 */

namespace Common\Model;


use Think\Model;

class AreaModel extends Model
{
    /**
     * 根据父类id查找省市县
     * $parent_id
     * @return mixed
     */
    public function getListByParentId($parent_id=1)
    {
        return $this->where(array('parent_id'=>$parent_id))->select();
    }

	public function getNameById($id)
	{
		$row=$this->field('area_name')->where(array('area_id'=>$id))->find();
		return $row['area_name'];
	}
    /**
     * 新浪根据IP获取地理位置公开接口
     * @param string $queryIP
     * @return array
     */
    public function getIPLoc_sina($queryIP=''){
    	$queryIP = $queryIP?$queryIP:get_client_ip();
    	$url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='.$queryIP;
    	$ch = curl_init($url);
    	curl_setopt($ch,CURLOPT_ENCODING ,'utf8');
    	curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ; // 获取数据返回
    	$location = curl_exec($ch);
    	$location = json_decode($location);
    	curl_close($ch);
    	$loc = array('country'=>'','province'=>'','city'=>'','other'=>'');
    	if($location===FALSE) return "";
    	if (empty($location->desc)) {
    		$loc['country'] = $location->country;
    		$loc['province'] = $location->province;
    		$loc['city'] = $location->city;
    		$loc['other'] = $location->district.$location->isp;
    	}else{
    		$loc['other'] = $location->desc;
    	}
    	return $loc;
    }
    
    //根据ip地址获取地址信息
    function getAddressFromIp($ip){
    	if($ip=='127.0.0.1'){
    		$data['province']='';
    		$data['city']='内网';
    		return $data;
    	}
    	$urlTaobao = 'http://ip.taobao.com/service/getIpInfo.php?ip='.$ip;
    	$urlSina = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='.$ip;
    	$json = file_get_contents($urlTaobao);
    	$jsonDecode = json_decode($json);
    	if($jsonDecode->code==0){//如果取不到就去取新浪的
    		$data['country'] = $jsonDecode->data->country;
    		$data['province'] = $jsonDecode->data->region;
    		$data['city'] = $jsonDecode->data->city;
    		$data['isp'] = $jsonDecode->data->isp;
    		return $data;
    	}else{
    		$json = file_get_contents($urlSina);
    		$jsonDecode = json_decode($json);
    		$data['country'] = $jsonDecode->country;
    		$data['province'] = $jsonDecode->province;
    		$data['city'] = $jsonDecode->city;
    		$data['isp'] = $jsonDecode->isp;
    		$data['district'] = $jsonDecode->district;
    		return $data;
    	}
    }
    
    //根据ip地址获取城市名
    function getCityFromIp($ip){
    	$ip = $ip?$ip:get_client_ip();
    	//如果没有有cookie，则查询
    	if(!cookie('city')){
    		$data = $this->getAddressFromIp($ip);
    		//存入cookie，设置一个小时有效期
    		//tp自带cookie会对中文进行url编码！
    		cookie('city',$data['city'],3600);
    	}
    	return cookie('city');
    }
    
}