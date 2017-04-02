<?php
namespace Home\Controller;

use Think\Controller;

class TestController extends CommonController 
{
	/**
	 * 前端接口测试
	 */
	public function index(){
		$type = I('type',0,int);
		$status = 0;
		$message = '仅供测试-。-';
		$data = array();
		if($type){
			$status = 1;
		}
		return send_json($status,$message,$data);
	}
	/**
	 * 导入学校
	 */
	public function pushSchool(){
// 		//遍历文件夹下所有文件
// 		$dir = scandir('./Public/excel/city');
// 		//引用PHPExcel插件
// 		vendor('PHPExcel.PHPExcel.IOFactory');
// 		for ($i=2;$i<count($dir);$i++){
// 			//加载xls目标文件
// 			$objPHPExcel = \PHPExcel_IOFactory::load("./Public/excel/city/".$dir[$i]);
// 			//获取当前sheet数量
// 	// 		$count = $objPHPExcel->getSheetCount();
// 	// 		echo $count;die;
// 			//获取当前文件的激活的sheet
// 			$sheet = $objPHPExcel->getSheet()->toArray();
// // 			myPrint($sheet);
// 			//循环每行
// 			foreach ($sheet as $val){
// 				//如果该行的第一列有值（A列），
// 				if($val[0]){
// 					//查询该地区ID
// 					$condition['area_name'] = array('like','%'.$val[0].'%');
// 					$areaId = M('area')->where($condition)->getField('area_id');
// 					if(!$areaId){
// 						echo '某个地区查不到ID:'.$val[0].',文件名：'.$dir[$i];exit();
// 					}
// 					$school_name = explode('，',$val[2]);
// 					//批量插入
// 					foreach ($school_name as $val){
// 						if($val){
// 							$dataList[] = array('school_name'=>$val,'area_id'=>$areaId,'add_time'=>NOW_TIME);
// 						}
// 					}
// 				}
// 			}
// 		}
// 		$School = M('school');
// 		$result = $School->addAll($dataList);
// 		echo $result;
	}
	
	public function imgTest(){
// 		$img = file_get_contents('D:\1.jpg');
// 		header("Content-Type: image/jpeg;text/html; charset=utf-8");
// 		echo $img;
	}
	
	public function chi(){
		$shiPu = array(
			'猪肘饭',
			'米粉',
			'藤椒抄手',
			'德克士',
			'pizza4u',
			'好吃的一比',
			'第一佳大鸡排',
			'饺子'
		);
		$a = rand(0, 7);
		echo "<!doctype html><html><head><meta http-equiv='content-Type' content='text/html; charset=UTF-8' />
				</head><body><h1 style=''>$shiPu[$a]</h1></body></html>";//
	}

	public function tea()
	{
		myPrint(21);
	}

}