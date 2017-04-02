/**
 * Created by luqia on 2016/12/7.
 */
require.config({
    baseUrl: "/public/js/require",
    paths: {
        "jquery": "jquery",
        'complex' : 'complex',
        'lrz' :'/public/plugin/lrz.bundle',
        'layer' :'/public/js/require/layer/layer'
    }
});
require(['jquery','complex','lrz','layer'],function($,complex,lrz,layer){
    layer.config({
        path: '/public/js/require/layer/' //定义layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    var layer_alert={
        reminder : function(messages){
            var message='<div>'+messages+'</div>';
            layer.alert(message, {icon: 6});
            return false;
        }
    };
     var img_Url=[];

    complex.complex();
    //图片上传
    /*
    ***第一张图片上传
     */
    upLoadImg($('#upload_img'),0);
    upLoadImg($('#upload_img1'),1);
    upLoadImg($('#upload_img2'),2);
    //图片上传函数封装
    function upLoadImg($id,$type){
        //console.log($img);return;
        $id.on('change', function(){
            var $that=$(this);
            lrz(this.files[0], {width: 640})
                .then(function (rst) {
                    var res=new Object();
                    res.img=rst.base64;
                    res.type='resource_img';
                    $.ajax({
                        url:'/home/upload/upload' ,
                        type: 'post',
                        data: res,
                        dataType: 'json',
                        timeout: 200000,
                        error: function (data) {
                           //console.log(data)
                        },
                        success: function(data){
                            $that.prev().attr("src", '../'+data.data) ; //将图片路径存入src中，显示出图片
                            var $picture_name=$that.val(),
                                arr=$picture_name.split('\\'),
                                pic_name=arr[arr.length-1];//取得的图片名称
                            $that.next().html( pic_name);
                            img_Url[$type]=data.data;
                        }
                    });
                })
        });
    };
    /////////////////////////////发布页面二级tab导航切换///////////////////////////
    $('.pCommercial').click(function(){
        $(this).css({
            'background':'#ff9700',border:'0',color:'#fff'
        }).attr('choose','t').siblings().css({
            background:'#fff',border:'1px solid #dcdcdc',color:'#2f2f2f'
        }).attr('choose','f');
        $('.publishCommercialActivity').css('display','block').siblings().css('display','none');
    }).mouseenter(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({'border':'1px solid #ff9700','color' :'#ff9700'})
        }
    }).mouseleave(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({'border':'1px solid #e3e3e3', 'color' :'#2f2f2f'})
        }
    });
    $('.pArtRequire').click(function(){
        $(this).css({
            'background':'#ff9700', border:'0', color:'#fff'
        }).attr('choose','t').siblings().css({
            background:'#fff',border:'1px solid #dcdcdc',color:'#2f2f2f'
        }).attr('choose','f');
        $('.publishArtRequire').css('display','block').siblings().css('display','none');
    }).mouseenter(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({'border':'1px solid #ff9700','color' :'#ff9700'})
        }
    }).mouseleave(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({'border':'1px solid #e3e3e3','color' :'#2f2f2f'})
        }
    });
    $('.pSchoolActivity').click(function(){
        $(this).attr('choose','t').css({
            'background':'#ff9700',border:'0',color:'#fff'
        }).siblings().css({
            background:'#fff',border:'1px solid #dcdcdc',color:'#2f2f2f'
        }).attr('choose','f');
        $('.publishSchoolActivity').css('display','block').siblings().css('display','none');
    }).mouseenter(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({ 'border':'1px solid #ff9700','color' :'#ff9700'})
        }
    }).mouseleave(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({ 'border':'1px solid #e3e3e3','color' :'#2f2f2f'})
        }
    });
    $('.pMediaSource').click(function(){
        $(this).attr('choose','t').css({
            'background':'#ff9700',border:'0',color:'#fff'
        }).siblings().css({
            background:'#fff',border:'1px solid #dcdcdc',color:'#2f2f2f'
        }).attr('choose','f');
        $('.publishMediaSources').css('display','block').siblings().css('display','none');
    }).mouseenter(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({ 'border':'1px solid #ff9700', 'color' :'#ff9700' })
        }
    }).mouseleave(function(){
        var t=$(this).attr('choose');
        if(!!!(t=='t')){
            $(this).css({'border':'1px solid #e3e3e3','color' :'#2f2f2f'})
        }
    });
    //传媒资源根据用户的选择，显示不同的选项和输入框
    $('#mediaSourcesChoose').change(function(){
        var $slectorOp=$('#mediaSourcesChoose option:selected').val();
        if($slectorOp=='1'){
            $('.personalNumber').css('display','block').siblings().css('display','none');
            $('#schoolSite').css('display','none');
        }else if($slectorOp=='2'){
            $('.mspStadiumBox').css('display','block').siblings().css('display','none');
            $('#schoolSite').css('display','block');
        }else if($slectorOp=='3'){
            $('.fansNumber').css('display','block').siblings().css('display','none');
            $('#schoolSite').css('display','block');
        }else if($slectorOp=='4'){
            $('.audienceNumber').css('display','block').siblings().css('display','none');
            $('#schoolSite').css('display','none');
        }else if($slectorOp=='13'){
            $('.mediaChangeBox').children().css('display','none');
            $('#schoolSite').css('display','none');
        }
    });
    //弹出框选择学校标记选择状态
    $('#pop_up_choose_box .pop_content').find('.choose_school').on('click',function(){
        var classL=$(this).attr('class');
        var arrL=classL.split(' '),l=arrL.length;
        if(l>1){
            $(this).removeClass('choose_school_active');
        }else{
            $(this).addClass('choose_school_active');
        }
    });
    /*
    ***个人演艺图片上传预览

    $('.upload1').on('change',function(){
       complex.eventUntil.personal_img_preview($(this),this);
    }); */
    //传媒资源的选择三级联动
    $('#mediaSourcesChoose').change(function(){
        var id=$(this).val();
        //发出ajax请求到Resource
        var url = '/home/Resource/getResourceByParentId';
        data={parent_id:id};
        $.getJSON(url,data,function(data){
            //清空之前选择，避免下次选择的时候，上次的重复
            $('#schoolSite').get(0).length=1;
            $(data).each(function(i, resource) {
                var html = '<option value="' + resource.id + '">' + resource.resource_name + '</option>';
                $(html).appendTo($('#schoolSite'));
                $('#schoolSite').show();
            });
        });
    });
    //用户输入信息进行表单验证
    /*
    **商业活动表单验证
     */
    complex.eventUntil.formBlur($('.ca_activity'));
    complex.eventUntil.formBlur($('.ca_outlay'));
    complex.eventUntil.formBlur($('.ca_schoolPopularity'));
    complex.eventUntil.formNextBlur($('.ca_schoolPopularity'));
    complex.eventUntil.formNextBlur($('.ca_activity_demand'));
    /*
     **校园活动表单验证
     */
    complex.eventUntil.formBlur($('.sa_activity'));
    complex.eventUntil.formBlur($('.sa_money'));
    complex.eventUntil.formNextBlur($('.sa_schoolPopularity'));
    complex.eventUntil.formNextBlur($('.sa_sposer'));
    /*
     **校传媒资源表单验证
     */
    complex.eventUntil.formBlur($('.ms_name'));
    complex.eventUntil.formBlur($('.ms_sourcesDescribe'));
    complex.eventUntil.formNextBlur($('.ms_flow_rate'));
    complex.eventUntil.formNextBlur($('.ms_number'));
    complex.eventUntil.formNextBlur($('.ms_daynumber'));
    complex.eventUntil.formNextBlur($('.ms_square'));
    complex.eventUntil.formNextBlur($('.ms_container'));
    complex.eventUntil.formNextBlur($('.ms_price'));
    //商业活动提交发送信息
    $('.commercialApply').on('click',function(){

        var $ca_name=$('.ca_activity').val(),//活动名称
            $ca_type=$('.ca_type').val(),
            $ca_outlay=$('.ca_outlay').val(),//经费预算
            $ca_advance=$('.ca_advance').val(),//预付比例
            $ca_abeginningTime=$('#beginningTime').val(),//申请期限开始时间
            $ca_aendingTime=$('#endingTime').val(),//申请期限结束时间
            $ca_startActiveTime=$('#startActiveTime').val(),//活动时间开始时间
            $ca_endActiveTime=$('#endActiveTime').val(),//活动结束时间
            $ca_province1=$('#province1').val(),
            $ca_cities1=$('#cities1').val(),
            $ca_area1=$('#area1').val(),
            $ca_schools=$('#commercial_act').next('.school_list').attr('school_list'),
            $ca_schoolScale=$('.ca_schoolScale').find('input:checked').next().attr('name'),//校园规模
            $ca_schoolPopularity=$('.ca_schoolPopularity').val(),//人气指数
            $ca_activity_demand=$('.ca_activity_demand').val(),//活动需求名额
            $ca_activity_advertise= complex.eventUntil.getCheckBoxValue($('.ca_activity_advertise:checked')),//活动宣传方式
            $ca_activity_check=complex.eventUntil.getCheckBoxValue($('.ca_activity_check:checked')),//活动验收方式
            $ca_textarea=$('.ca_textarea').val();
        var data={
                type:1,
                name:$ca_name,//活动名称
                activity_id : $ca_type,
                money: $ca_outlay,//经费预算
                prepay_ratio :$ca_advance,//预付比例
                apply_start_time : $ca_abeginningTime,//申请期限开始时间
                apply_end_time : $ca_aendingTime,//申请期限结束时间
                activity_start_time : $ca_startActiveTime,//活动时间开始时间
                activity_end_time : $ca_endActiveTime,//活动结束时间
                province_id : $ca_province1,
                city_id : $ca_cities1,
                county_id : $ca_area1,
                school_id :  $ca_schools,
                school_size : $ca_schoolScale,//校园规模
                popular : $ca_schoolPopularity,//人气指数
                apply_total : $ca_activity_demand,//活动需求名额
                campaign_id : $ca_activity_advertise,//活动宣传方式//
                check_id : $ca_activity_check,//活动验收方式//
                other: $ca_textarea

        };

        if( judgeUserData()==false){
            layer_alert.reminder('输入框和多选框不能为空！');
        }else if(!judgeDate($ca_abeginningTime,$ca_aendingTime)){
            layer_alert.reminder('申请开始时间不能大于申请结束时间');
        }else if(!judgeDate( $ca_startActiveTime, $ca_endActiveTime)){
            layer_alert.reminder('活动开始时间不能大于申请结束时间');
        }else{

            $.ajax({
                 data:data,
                 type: "post",
                 url:'/home/BusinessCenter/publish',
                 dataType: "json",
                 async: true,
                 success: function (result) {
                     //console.log(result);
                     if(result.status==1){
                         dialog.success(result.message);
                     }else if(result.status==0){

                         dialog.error(result.message);
                     }
                 }
             });
        }

        function judgeUserData(){
            if($ca_name==''||$ca_outlay==''||$ca_abeginningTime==''||$ca_aendingTime==''||$ca_startActiveTime==''||$ca_endActiveTime==''||$ca_schoolPopularity==''|| $ca_activity_demand==''){
                return false;
            }else  if($ca_activity_advertise.length<=0||$ca_activity_check.length<=0){
                return false;
            }else{
                return true;
            }
        }
    });
    //校园活动
    $('.schoolActivityApply').on('click',function(){
        var $sa_name=$('.sa_activity').val(),//活动名称
            $sa_type=$('.sa_type').val(),
            $sa_money=$('.sa_money').val(),//赞助金额
            $sa_advance=$('.sa_advance').val(),//预付比例
            $sa_abeginningTime=$('#SABeginTime').val(),//申请期限开始时间
            $sa_aendingTime=$('#SAEndTime').val(),//申请期限结束时间
            $sa_startActiveTime=$('#SAAtBTime').val(),//活动时间开始时间
            $sa_endActiveTime=$('#SAAtETime').val(),//活动结束时间
            $sa_province2=$('#province2').val(),
            $sa_cities2=$('#cities2').val(),
            $sa_area2=$('#area2').val(),
            $sa_schools=$('#school_activity').val(),
            $sa_schoolScale=$('.sa_schoolScale').find('input:checked').next().attr('name'),//校园规模
            $sa_schoolPopularity=$('.sa_schoolPopularity').val(),//人气指数
            $sa_sposer=$('.sa_sposer').val(),//赞助名额
            $sa_advertiseinsert= complex.eventUntil.getCheckBoxValue($('.sa_advertiseinsert:checked')),//广告植入方式
            $sa_check=complex.eventUntil.getCheckBoxValue($('.sa_check:checked')),//活动验收方式
            $sa_textarea=$('.schoolLeaveMessage').val();
        var data={
            type:2,
            name:$sa_name,//活动名称
            activity_id : $sa_type,
            money : $sa_money,//赞助金额
            prepay_ratio :$sa_advance,//预付比例s
            apply_start_time :$sa_abeginningTime,//申请期限开始时间
            apply_end_time : $sa_aendingTime,//申请期限结束时间
            activity_start_time : $sa_startActiveTime,//活动时间开始时间
            activity_end_time : $sa_endActiveTime,//活动结束时间
            province_id : $sa_province2,
            city_id : $sa_cities2,
            county_id : $sa_area2,
            school_id :  $sa_schools,
            school_size : $sa_schoolScale,//校园规模
            popular : $sa_schoolPopularity,//人气指数
            apply_total : $sa_sposer,//赞助名额
            advertise_id : $sa_advertiseinsert,//活动宣传方式
            check_id : $sa_check,//活动验收方式
            other : $sa_textarea

        };
        if( judgeUserData()==false){
            layer_alert.reminder('输入框和多选框不能为空！');
        }else if(!judgeDate($sa_abeginningTime, $sa_aendingTime)){
            layer_alert.reminder('申请开始时间不能大于申请结束时间');
        }else if(!judgeDate($sa_startActiveTime,$sa_endActiveTime)){
            layer_alert.reminder('活动开始时间不能大于申请结束时间');
        }else if($sa_schools==''){
            layer_alert.reminder('请选择所在院校！');
        }else{
            //console.log(data);
            $.ajax({
                data:data,
                type: "post",
                url:'/home/BusinessCenter/publish',
                dataType: "json",
                async: true,
                success: function (result) {
                   // console.log(result);
                    if(result.status==1){
                        dialog.success(result.message);
                    }else if(result.status==0){

                        dialog.error(result.message);
                    }
                }
            });
        }

        function judgeUserData(){
            if($sa_name==''||$sa_money==''||$sa_abeginningTime==''||$sa_aendingTime==''||$sa_startActiveTime==''||$sa_endActiveTime==''||$sa_schoolPopularity==''|| $sa_sposer==''){
                return false;
            }else  if ($sa_advertiseinsert.length<=0||$sa_check.length<=0){
                return false;
            }else{
                return true;
            }
        }

    });

    //判断用户选中时间是否合法
    function judgeDate(startTime,endTime){
        var sTime=complex.eventUntil.getTimeStamp(startTime),eTime=complex.eventUntil.getTimeStamp(endTime);
      //  console.log(sTime);
       // console.log(eTime);
        if(sTime<eTime){
            return true;
        }else{
            return false;
        }

    };
    /*
    ***传媒资源
     */
    $('.mspConfirm').on('click',function(){
        var $ms_name=$('.ms_name').val(),//活动名称
            $ms_abeginningTime=$('#MSBeginTime').val(),//活动期限开始时间
            $ms_aendingTime=$('#MSEndTime').val(),//活动期限结束时间
            $ms_province3=$('#province3').val(),
            $ms_cities3=$('#cities3').val(),
            $ms_area3=$('#area3').val(),
            $ms_schools=$('#media_sources').val(),//选择学校内容
            $ms_flow_rate=$('.ms_flow_rate').val(),//日人流量
            $ms_number=$('.ms_number').val(),//粉丝数量
            $ms_daynumber=$('.ms_daynumber').val(),//日受众人数
            $ms_square=$('.ms_square').val(),//场馆面积
            $ms_container=$('.ms_container').val(),//容纳人数
            $ms_price=$('.ms_price').val(),//资源价格
            $ms_unit=$('#mspUits').val(),//资源价格单位
            $ms_advance=$('.mspPrepayChoose').val(),//预付比例
            $ms_schoolScale=$('.msScaleExample').find('input:checked').next().attr('name') ? $('.msScaleExample').find('input:checked').next().attr('name') : -1,//校园规模
            $ms_sourcesDescribe=$('.ms_sourcesDescribe').val(),//资源描述
            $ms_check=complex.eventUntil.getCheckBoxValue($('.ms_check:checked')),//活动验收方式
            $mediaSourcesChoose=$('#mediaSourcesChoose').val(),//资源类型选择
            $schoolSite=$('#schoolSite').val();//资源类型选择
        var data={
            type:3,
            name:$ms_name,//活动名称
            prepay_ratio :$ms_advance,//预付比例s
            activity_start_time :$ms_abeginningTime,//活动期限开始时间
            activity_end_time :  $ms_aendingTime,//活动期限结束时间
            province_id : $ms_province3,
            city_id : $ms_cities3,
            county_id :$ms_area3,
            school_id :  $ms_schools,
            fan_number :$ms_number,//粉丝数量
            daynumber : $ms_daynumber,//日受众人数
            square : $ms_square,//场馆面积
            container_number : $ms_container,//容纳人数
            money:$ms_price,//资源价格
            unit:$ms_unit,//资源价格单位
            flow_rate:$ms_flow_rate,//日人流量
            school_size : $ms_schoolScale,//校园规模
            check_id : $ms_check,//活动验收方式
            resource_desc : $ms_sourcesDescribe,//资源描述
            resource_aid : $mediaSourcesChoose,
            resource_bid : $schoolSite,
            imgUrl : img_Url//传媒资源上传图片url1
        };
        var $slectorOp=$('#mediaSourcesChoose option:selected').val();
        //$slectorOp=$slectorOp?$slectorOp:13;
        if(judgeUserData()==false){
            layer_alert.reminder('输入框和多选框不能为空！');
        }else if(!judgeDate($ms_abeginningTime,$ms_aendingTime)){
            layer_alert.reminder('使用期限开始时间不能大于结束时间！');
        }else if($ms_schools==''){
            layer_alert.reminder('请选择所在院校！');
        }
        else if($slectorOp=='1'){
                if($ms_flow_rate==''){
                    layer_alert.reminder('日人流量不能为空！');
                }else {
                    sentAjax();
                }
        }else if($slectorOp=='2'){
                if($ms_square==''||$ms_container==''){
                    layer_alert.reminder('场馆面积或容纳人数不能为空！');
                }else{
                    sentAjax();
                }
        }else if($slectorOp=='3'){

                if($ms_number==''){
                    layer_alert.reminder('粉丝数量不能为空！');
                }else {
                    sentAjax();
                }
        }else if($slectorOp=='4'){

                if($ms_daynumber==''){
                    layer_alert.reminder('日受众人数不能为空！');
                }else {
                    sentAjax();
                }
        }else if($slectorOp=='13'){
            sentAjax();
        }else if($slectorOp=='-1'){
            layer_alert.reminder('请选择一种资源类型！');
        }else{
                return;
        }
        function judgeUserData(){
            if($ms_name==''||$ms_abeginningTime==''||$ms_aendingTime==''||$ms_price==''|| $ms_sourcesDescribe==''||$ms_schoolScale=='-1'){
                return false;
            }else  if ($ms_check.length<=0){
                return false;
            }else{
                return true;
            }
        };
       function sentAjax() {
           if( judgeUserData()==true) {
               //console.log(data);
               $.ajax({
                   data: data,
                   type: "post",
                   url: '/home/BusinessCenter/publish',
                   dataType: "json",
                   async: true,
                   success: function (result) {
                       //console.log(result);
                       if(result.status==1){
                           dialog.success(result.message);
                       }else if(result.status==0){

                           dialog.error(result.message);
                       }
                   }
               });
           }
        }

    });

});