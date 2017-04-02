/**
 * Created by luqia on 2016/12/7.
 */
require.config({
    baseUrl: "/public/js/require",
    paths: {
        "jquery": "jquery",
        'complex' : 'complex',
        'lrz' :'/public/plugin/lrz.bundle',
        'initState' : '/public/js/common/common',
        'layer' :'/public/js/require/layer/layer',
        'validate' : '/public/plugin/jquery.validate',
        'cropbox' :'/public/js/require/cropbox'
    },
    shim: {
        'validate': {
            deps: ['jquery'],
            exports: 'jQuery.fn.validate'
        },
        'cropbox' :{
            deps: ['jquery'],
            exports: 'jQuery.fn.cropbox'
        }
    }
});
require(['jquery','complex','lrz','initState','layer','validate','cropbox'],function($,complex,lrz,initState,layer){
    layer.config({
        path: '/public/js/require/layer/' //定义layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    complex.complex();
    //判断添加案例的长度是否显示删除按钮

    //存储传媒公司复制节点

    //选择学校并记录选择的学校
    $('.academyChoose').on('click',function(){
        $this=$(this);
        $('#pop_up_choose_box .pop_content').find('.choose_school').removeClass('choose_school_active');
        $('#pop_up_choose_box').fadeIn();
        $('.confirm_button').on('click',function(){
            var schools=[],data_school='';
            $(this).parent('.pop_button_box').prev().find('.choose_school_active').each(function(index,element){
                schools.push($(this).text());
                data_school+=$(this).attr('data-id')+",";
            });
            $('#pop_up_choose_box').fadeOut();
            if(schools.length>0){
                $this.html(schools[0]+'等');
                $this.next('.school_list').attr('school_list',data_school);

            }
        });
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
// menu
    //只能输入数字
    function onlyNum() {
        if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
            if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
                event.returnValue=false;
    };
    $('.inputHeight').keydown(function(){

    }).blur(function(){
        var value=$(this).val();
        if(value>=0&&value<250){
            return;
        }else if(value==''){
            layer.alert('请输入正确的身高！');
        }else{
            $(this).val('');
            layer.alert('请输入正确的身高！');
        }
    });
    //认证页面二级tab页面的切换
    $('.owner').click(function(){
        $(this).css({
            background:'#ff9700',
            border:'0',
            color:'#fff'
        }).attr('choose','t').siblings().css({
            background:'#fff',
            border:'1px solid #dcdcdc',
            color:'#2f2f2f'
        }).attr('choose','f');
        $('.ownerTab').css('display','block').siblings().css('display','none');
    }).mouseover(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #ff9700',
                'color':'#ff9700'
            });
        }
    }).mouseleave(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #dcdcdc',
                'color':'#2e2e2e'
            });
        }
    });
    $('.media').click(function(){
        $('.mediaTab').css('display','block').siblings().css('display','none');
        $(this).css({
            background:'#ff9700',
            border:'0',
            color:'#fff'
        }).attr('choose','t').siblings().css({
            background:'#fff',
            border:'1px solid #dcdcdc',
            color:'#2f2f2f'
        }).attr('choose','f');
    }).mouseover(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #ff9700',
                'color':'#ff9700'
            });
        }
    }).mouseleave(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #dcdcdc',
                'color':'#2e2e2e'
            });
        }
    });
    $('.school').click(function(){
        $('.schoolTab').css('display','block').siblings().css('display','none');
        $(this).css({
            background:'#ff9700',
            border:'0',
            color:'#fff'
        }).attr('choose','t').siblings().css({
            background:'#fff',
            border:'1px solid #dcdcdc',
            color:'#2f2f2f'
        }).attr('choose','f');
    }).mouseover(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #ff9700',
                'color':'#ff9700'
            });
        }
    }).mouseleave(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #dcdcdc',
                'color':'#2e2e2e'
            });
        }
    });
    $('.entertainment').click(function(){
        $('.enterTainmentTab').css('display','block').siblings().css('display','none');
        $(this).css({
            background:'#ff9700',
            border:'0',
            color:'#fff'
        }).attr('choose','t').siblings().css({
            background:'#fff',
            border:'1px solid #dcdcdc',
            color:'#2f2f2f'
        }).attr('choose','f');
    }).mouseover(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #ff9700',
                'color':'#ff9700'
            });
        }
    }).mouseleave(function(){
        var chooseT=$(this).attr('choose');
        if(!!!(chooseT=='t')){
            $(this).css({
                'border' :'1px solid #dcdcdc',
                'color':'#2e2e2e'
            });
        }
    });
    //申请维权和联系反馈选项卡切换
    $('.tl').click(function(){
        var i = $(this).index();
        $('#com1 .commonLi').eq(i).show().siblings().hide();
        $(this).addClass('select').css({'border':'0','color':'white'}).siblings().removeClass('select').css({'border-top':'1px solid #dddddd','border-right':'1px solid #dddddd','color':'black'});
    }).next('.tr1').click(function(){
        var i = $(this).index();
        $(this).addClass('select').css({'border':'0','color':'white'}).siblings().removeClass('select').css({'border-top':'1px solid #dddddd','border-left':'1px solid #dddddd','color':'black'});
        $('#com1 .commonLi').eq(i).show().siblings().hide();
    });
    //传媒公司认证动态添加案例
    var $name=0;
    $('.mediaContinueAdd').on('click',function(){
        $name=$(this).prev('.caseBox').find('.caseExample').length;
        var $clone_example=idCardNoUtil.get$name($name);
        $(this).prev('.caseBox').append($clone_example);
        if($name>1){
            $(this).css('visibility','hidden');
            return false;
        }
    });
    //传媒公司认证点击删除案例盒子
    $(".caseBox").on('click',".caseExample .deleteMediaCase",function(){
        $(this).parent().remove();
    });
    /*
     ***传媒资源克隆预览图片
     */
    $(".caseBox").on("change",'.upload2',function(){
        complex.eventUntil.personal_img_preview($(this),this);
    });

    //校园组织认证动态添加案例
    $('.addSchoolOrganizationCase').on('click',function(){
        $name=$(this).prev('.caseBox').find('.caseExample').length;
        var $clone_example=idCardNoUtil.get$name($name);
        $(this).prev('.caseBox').append($clone_example);
        if($name>1){
            $(this).css('visibility','hidden');
            return false;
        }
    });
    //校园组织认证点击删除案例盒子
    $('.schoolOrganizationCase .caseBox .caseExample .deleteSchoolCase').each(function(index,element){
        $(this).on('click',function(){
            $(this).parent().remove();
            $('.addSchoolOrganizationCase').css('visibility','visible');
        });
    });


    $(".clickUpLoadImgExample").find('.upLoadImgBox').click(function () {
        var $this=$(this);
        $(this).next('.upload1').click();  //隐藏了input:file样式后，点击头像就可以本地上传
        $(this).next('.upload1').on("change",function(){
            var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $this.attr("src", objUrl) ; //将图片路径存入src中，显示出图片
                var $picture_name=$(this).val(),
                    arr=$picture_name.split('\\'),
                    pic_name=arr[arr.length-1];//取得的图片名称
                $this.next().next('.clickIpLoad').html( pic_name);
            }
        });
    });
    //演艺人认证相关证书动态添加相关证书
    var relative_continue_add=document.querySelector('.relative_continue_add'),
        $relative_delete=$('.relative_delete');
    $('.relative_continue_add').on('click',function(){
        var $relative_example=idCardNoUtil.getRelative(),
            l= $('.relative_certificate_example').length;
        //$relative_example.find('.relative_delete').show();
        $('.relative_certificate_example_box').append($relative_example);
        if(l>=2){
            $('.relative_continue_add').css('visibility','hidden');
            return false;
        }
    });
    //演艺人认证相关证书动态删除相关证书//
    $('.relative_certificate_example_box').on('click',".relative_delete",function(){
        $(this).parent().remove();
        $('.relative_continue_add').css('visibility','visible');
    });
    /*
     * * *演艺人认证图片上传预览

     $('.talent_art_pic').on('change',function(){
     personal_img_preview($(this),this);
     }); */
    $('.relative_certificate_example_box').on('change','.certificate_pic',function(){
        //console.log('ssss');//relative_certificate_example_box
        personal_img_preview($(this),this);
    });
    //演艺人认证形象才艺展示添加输入框
    $('.art_continue_add').on('click',function(){
        var $talent_example= idCardNoUtil.getAddCertificate(),
            $l=$('.talent_art_example').length;
        //$talent_example.find('.art_delete').show();
        $('.talent_art_example_box').append($talent_example);
        if($l>=2){
            $(this).css('visibility','hidden');
            return false;
        }

    });
    //演艺人认证形象才艺动态删除相关证书

    $('.talent_art_example_box').on('click',".talent_art_example .art_delete",function(){
        $(this).parent().remove();
        var len=$(this).parent().length;
        $('.art_continue_add').css('visibility','visible');
    });
    /*
     ***演艺人认证形象才艺添加照片预览效果

     $('.certificate_pic').on('change',function(){
     personal_img_preview($(this),this);
     });*/
    $('.talent_art_example_box').on('change','.talent_art_pic',function(){
        personalart_img_preview($(this),this);
    });
    //相关证书图片上传预览
    $('.relative_certificate_box').on('change','.certificate_pic',function(){
        personalart_img_preview($(this),this);
    });
    /*
     ***甲方企业认证添加照片预览效果
     */
    $('.dentityA_picture').on('click',function(){    //上传身份证a面预览
        previewIdentityP($(this));
    });
    $('.dentityB_picture').on('click',function(){    //上传身份证b面预览
        previewIdentityP($(this));
    });
    /*
     *** submit提交验证用户输入内容有效性判断 //甲方企业
     */
    //验证4个表单共有的部分验证
    //甲方企业验证
    $('#form').find('.owner_company').on('click',function(){
        judgeCommon('#form');
                $('#form').submit();
    });
    //校园组织验证
    function judgeRadio(className){
        var flag_school=false;
        var school=document.getElementsByClassName(className);
        for(var i = 0; i<school.length;i++){
            if(school[i].checked==true){
                flag_school=true;
            }
        }
        return flag_school;
    };
    /*
     ***校园组织认证案列判断
     */
    //演艺人认证
    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    //封装预览身份证照片公用方法
    function previewIdentityP(identity_a){
        identity_a.on('change',function(){
            var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                var $picture_name=identity_a.val(),
                    arr=$picture_name.split('\\'),
                    pic_name=arr[arr.length-1];//取得的图片名称
                identity_a.prev('img').attr("src", objUrl); //将图片路径存入src中，显示出图片
                identity_a.parent().next('.upButton').find('.noShow').html(pic_name);
            }
        });
    }
    function personal_img_preview(personal_img,$this){
        var objUrl = getObjectURL($this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            personal_img.prev().prev().attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            var $picture_name=personal_img.val(),
                arr=$picture_name.split('\\'),
                pic_name=arr[arr.length-1];//取得的图片名称
            personal_img.prev().html( pic_name);
        }
    }
    /*
     ***演艺人认证图片预览
     */
    function personalart_img_preview(personal_img,$this){
        var objUrl = getObjectURL($this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            personal_img.prev().prev().attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            var $picture_name=personal_img.val(),
                arr=$picture_name.split('\\'),
                pic_name=arr[arr.length-1];//取得的图片名称
            personal_img.prev().html( pic_name);
        }
    }
    /*
     ***共有表单验证封装
     */
    function verifyCommonForm(id){
        var judgeStatu=0;
        var $identity_pictureA=$(id).find('.upLoadingPositive').find('.upImg').find('.dentityA_picture').val(),
            $identity_pictureB=$(id).find('.upLoadingOppose').find('.upImg').find('.dentityB_picture').val(),
            $upload_head_portrait=$(id).find('.uploadingImgBox').find('.upImg').find('input').val();

        if($identity_pictureA==''){
            layer_alert.reminder('请上传身份证正面照片!');
            judgeStatu=0;
        } else if($identity_pictureB==''){
            layer_alert.reminder('请上传身份证反面面照片!');
            judgeStatu=0;
            return
        } else if($upload_head_portrait==''){
            layer_alert.reminder('请上传头像照片!');
            judgeStatu=0;
            return
        } else{
            judgeStatu=1;
            return true;
        }
        return judgeStatu;
    };
    //身份证上传判断
    function verifyCommonFormLst(id){
        var judgeStatu=0;
        var $identity_pictureA=$(id).find('.upLoadingPositive').find('.upImg').find('.dentityA_picture').val(),
            $identity_pictureB=$(id).find('.upLoadingOppose').find('.upImg').find('.dentityB_picture').val();
        if($identity_pictureA==''){
            layer_alert.reminder('请上传身份证正面照片!');
            judgeStatu=0;
        } else if($identity_pictureB==''){
            layer_alert.reminder('请上传身份证反面面照片!');
            judgeStatu=0;
        } else{
            judgeStatu=1;
        }
        return judgeStatu;
    };
    var layer_alert={
        reminder : function(messages){
            var message='<div>'+messages+'</div>';
            layer.alert(message, {icon: 6});
            return false;
        }
    };
    //显示认证错误信息
//    var error = $('.is_error').text();
//    if(error){
//    	layer.confirm(error, {
//    		  btn: ['确定'] //按钮
//    		}, function(){
//    			window.location.href="/user/certification";
//    		});
//    }


    showIserrorMessage($('.is_error'),"/user/certification");
    function showIserrorMessage(className,url){
        var error =className.text();
        if(error){
            layer.confirm(error, {
                btn: ['确定'] //按钮
            }, function(){
                window.location.href=url;
            });
        }
    }
    /*
     ***定义公共的输入判断
     */
    function judgeCommon(id){
        $(id).validate({
            rules: {
                real_name: { required : true},
                email: {required: true, email: true},
                identity :{ required : true ,isIdCardNo :true},
                qq :{  required : true ,isQQ :true},
                contact_number :{   required : true,telphoneValid : true},
                address :{   required : true},
                company_name : {   required : true},
                company_dept :{ required : true},
                company_job :{  required : true},
                description:{  required : true},
                picture : {required: true},
                case_time :{required : true},
                case_name : {required: true},
                case_introduce :{required: true},
                school_organization_name : {required : true},
                organization_scale : {required : true},
                height : {required : true},
                price : {required : true},
                personal_introduce :{required : true},
                talent_art_example_head :{required : true},
                certificate_describe : {required : true},
                artShowLinkInput : {required : true},
                art_show_link_head : {required : true},
                art_name :{ required : true},
                schoolLocation : {required : true}
            },
            messages: {
                schoolLocation : '请输入所在学校',
                real_name: "请输入您的名字",
                identity: "请正确输入您的身份证号码",
                qq : "请输入正确的QQ号",
                contact_number :'请输入正确的手机号码',
                email: "请输入一个正确的邮箱",
                address :'请输入你的地址',
                company_name : '请输入企业名称',
                company_dept : '请输入部门名称',
                company_job : "请输入担任职位",
                description : '请输入企业简介',
                picture : '请上传图片',
                case_time :'请输入案例时间',
                case_name :'请输入案例名字',
                case_introduce : '请输入案例简介',
                school_organization_name : '请输入组织名字',
                organization_scale : '请输入组织简介',
                height : '请输入身高',
                price : '请输入价格',
                personal_introduce : '请输入自我简介',
                talent_art_example_head : '标题',
                certificate_describe : '标题',
                artShowLinkInput : '输入链接',
                art_show_link_head : '输入标题'
            }
        });
    };
    var idCardNoUtil = {
        provinceAndCitys: {
            11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏", 61: "陕西",62: "甘肃",63: "青海",64: "宁夏", 65: "新疆",71: "台湾",
            81: "香港", 82: "澳门", 91: "国外"
        },
        powers: ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],
        parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],
        genders: {male: "男", female: "女"},
        checkAddressCode: function (addressCode) {
            var check = /^[1-9]\d{5}$/.test(addressCode);
            if (!check) return false;
            if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
                return true;
            } else {
                return false;
            }
        },
        checkIdCardNo :function(idCardNo){
            var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
            if(!check) return false;
            if(idCardNo.length==15){
                return idCardNoUtil.check15IdCardNo(idCardNo);
            }else if(idCardNo.length==18){
                return idCardNoUtil.check18IdCardNo(idCardNo);
            }else{
                return false;
            }
        },
        check15IdCardNo: function(idCardNo){
            //15位身份证号码的基本校验
            var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
            if(!check) return false;
            //校验地址码
            var addressCode = idCardNo.substring(0,6);
            check = idCardNoUtil.checkAddressCode(addressCode);
            if(!check) return false;
            var birDayCode = '19' + idCardNo.substring(6,12);
            //校验日期码
            return idCardNoUtil.checkBirthDayCode(birDayCode);
        },
        check18IdCardNo: function(idCardNo){
            //18位身份证号码的基本格式校验
            var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
            if(!check) return false;
            //校验地址码
            var addressCode = idCardNo.substring(0,6);
            check = idCardNoUtil.checkAddressCode(addressCode);
            if(!check) return false;
            //校验日期码
            var birDayCode = idCardNo.substring(6,14);
            check = idCardNoUtil.checkBirthDayCode(birDayCode);
            if(!check) return false;
            //验证校检码
            return idCardNoUtil.checkParityBit(idCardNo);
        },
        formateDateCN: function(day){
            var yyyy =day.substring(0,4);
            var mm = day.substring(4,6);
            var dd = day.substring(6);
            return yyyy + '-' + mm +'-' + dd;
        },
        getIdCardInfo: function(idCardNo){
            var idCardInfo = {
                gender:"", //性别
                birthday:"" // 出生日期(yyyy-mm-dd)
            };
            if(idCardNo.length==15){
                var aday = '19' + idCardNo.substring(6,12);
                idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
                if(parseInt(idCardNo.charAt(14))%2==0){
                    idCardInfo.gender=idCardNoUtil.genders.female;
                }else{
                    idCardInfo.gender=idCardNoUtil.genders.male;
                }
            }else if(idCardNo.length==18){
                var aday = idCardNo.substring(6,14);
                idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
                if(parseInt(idCardNo.charAt(16))%2==0){
                    idCardInfo.gender=idCardNoUtil.genders.female;
                }else{
                    idCardInfo.gender=idCardNoUtil.genders.male;
                }
            }
            return idCardInfo;
        },
        checkBirthDayCode: function(birDayCode){
            var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
            if(!check) return false;
            var yyyy = parseInt(birDayCode.substring(0,4),10);
            var mm = parseInt(birDayCode.substring(4,6),10);
            var dd = parseInt(birDayCode.substring(6),10);
            var xdata = new Date(yyyy,mm-1,dd);
            if(xdata > new Date()){
                return false;//生日不能大于当前日期
            }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
                return true;
            }else{
                return false;
            }
        },
        getParityBit: function(idCardNo){
            var id17 = idCardNo.substring(0,17);
            var power = 0;
            for(var i=0;i<17;i++){
                power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
            }
            var mod = power % 11;
            return idCardNoUtil.parityBit[mod];
        },
        checkParityBit: function(idCardNo){
            var parityBit = idCardNo.charAt(17).toUpperCase();
            if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
                return true;
            }else{
                return false;
            }
        },
        isQQ: function(isqq){
            var qq_test = /^[1-9]\d{4,9}$/;
            if(qq_test.test(isqq)){
                return true;
            }else{
                return false;
            }
        },
        get$name : function($name){
            var $clone_example= '<div '+'name='+$name+' class="caseExample"><div class="caseTime"><span class="caseHead">案例时间:</span><input name="case_time[]"  class="caseInput" type="text"></div><div class="caseName"><span class="caseHead">案例名称:</span><input name="case_name[]" class="caseInput" type="text"></div><div class="caseIntroduce"><span class="caseHead">案例简介:</span><input name="case_desc[]"  class="caseInput" type="text"></div><div class="casePhoto"><div class="casePhotoHead">案例照片:</div><div class="casePhotoBox"><div class="addPhotoBox"><div class="clickUpLoadImgExample"><img  src="/public/img/authenticaton/upload_03.png" onclick="$(this).next().click()" class="upLoadImgBox" alt=""><input class="upload2" name="case_img'+$name+'[]" accept="image/jpg,image/jpeg,image/png" type="file" style="display: none"/><div class="clickIpLoad">未选择任何文件</div></div><div class="clickUpLoadImgExample"><img  src="/public/img/authenticaton/upload_03.png" class="upLoadImgBox" onclick="$(this).next().click()" alt=""><input class="upload2" name="case_img'+$name+'[]" accept="image/jpg,image/jpeg,image/png" type="file" style="display: none"/><div class="clickIpLoad">未选择任何文件</div></div><div class="clickUpLoadImgExample"><img  src="/public/img/authenticaton/upload_03.png" class="upLoadImgBox" onclick="$(this).next().click()" alt=""><input class="upload2" name="case_img'+$name+'[]" accept="image/jpg,image/jpeg,image/png" type="file" style="display: none"/><div class="clickIpLoad">未选择任何文件</div></div></div><div class="casePhotoReminder">格式需为JPG、PNG,大小不超过3M,文字清晰能够辨认</div></div></div> <div class="deleteMediaCase"><img src="/public/img/authenticaton/del_03.png"/></div></div>';
            return  $clone_example;
        },
        judgePicture : function(element){
            var statu,arr=[];
            element.each(function(index,element){
                if($(this).val()=='') {
                    arr.push(1);
                }else{

                }
            });
            if(arr.length==3){
                statu=false;
            }else{
                statu=true;
            }
            return statu;//返回false为未上传图片
        },
        getAddCertificate : function(){
            var $clone='<div class="talent_art_example talent_example"><div class="talent_art_exampleB"><input name="art_name[]" class="talent_art_example_head" type="text" placeholder="10字符以内"></div><div class="talent_art_example_Img"><img class="talent_art_up_img" src="/public/img/authenticaton/upload_03.png" alt="" onclick="$(this).next().next().click()"><div class="talent_art_example_none">未选择任何文件</div><input type="file" style="display:none;" name="art_img[]" class="talent_art_pic"></div><div class="talent_art_example_reminder">格式需为JPG、PNG,大小不超过3M,文字清晰能够辨认</div><img class="art_delete" src="/public/img/authenticaton/del_03.png" alt=""></div>';
            //$clone.find('.art_delete').show();
            return $clone;
        },
        getRelative : function(){
            var clone='<div class="relative_certificate_example relative_example"><input name="licence_name[]" class="certificate_describe" type="text" placeholder="10字符以内"><div class="certificate_addImg_box"><img class="certificate_pic1" src="/public/img/authenticaton/AddTo.png" alt="" onclick="$(this).next().next().click()"><div class="certificate_none">未选择任何文件(非必填项)</div><input type="file" style="display:none;" name="licence_img[]" class="certificate_pic"></div><div class="certificate_reminder">格式需为JPG、PNG,大小不超过3M,文字清晰能够辨认</div><img class="relative_delete" src="/public/img/authenticaton/del_03.png" alt=""></div>';
            return clone;
        },
        //校园组织认证验证表单照片未上传完整验证方法封装
        judgeSchoolPicture : function(){
            var student_picture=$('#student_identity').val(),//学生证照片
                organization_picture=document.getElementsByClassName('organization_picture'),//校园组织照片
                school_picture=document.getElementsByClassName('school_case_picture'),
                flag=true,
                schoolStute=false,
                times=[],
                pictures=[];
            for(var i = 0 , l=organization_picture.length; i < l;i++){
                if(organization_picture[i].value!=''){
                    pictures.push(organization_picture[i]);
                }
            }
            for(var i = 0 , l= school_picture.length; i < l;i++){
                if(school_picture[i].value!=''){
                    times.push(school_picture[i]);
                }
            }
            if(student_picture==''){
                flag=false;
                layer_alert.reminder('请上传学生证照片!');
            }else if( pictures.length==0){
                flag=false;
                layer_alert.reminder('组织风采照片请至少上传一张图片!');
            }else if(times.length==0){
                flag=false;
                layer_alert.reminder('案例照片请至少上传一张！');
            }
            return flag;
        },
        //演艺人认证图片上传和视频链接等表单的验证
        judgeEntertainer : function(){
            var personal_picture=$('#art_picture').val(),//个人艺术照图片
                relative_head=$('.certificate_describe').val(),//相关证书输入框
                relative_picture=$('.correlation_picture').val(),//相关证书图片上传
                talent_art_head=$('.talent_art_show1_head').val(),//形象才艺展示输入框
                talent_art_picture=$('.talent_art_picture').val(),//形象才艺展示图片上传
                art_video_head=$('.art_show_link_head').val(),//才艺展示视频链接标题
                art_video_link=$('.artShowLinkInput').val(),//才艺视频链接输入框
                flag=true;
            var linkReg=/^http[s]*:\/{2}/;
            if(linkReg.test(art_video_link)){
                $('.artShowLinkInput').val(art_video_link);
            }else{
                $('.artShowLinkInput').val("http://" + art_video_link);
            }
            if(personal_picture==''){
                flag=false;
                layer_alert.reminder('请上传个人艺术照！');
            }else if(relative_head==''){
                flag=false;
                layer_alert.reminder('请输入相关证书标题！');
            }else if(relative_picture==''){
                flag=false;
                layer_alert.reminder('请上传相关证书图片！');
            }else if(talent_art_head==''){
                layer_alert.reminder('请上传形象才艺展示证书标题！');
            }else if(talent_art_picture==''){
                flag=false;
                layer_alert.reminder('请上传才艺展示照片！');
            }else {
                flag=true;
            }
            return flag;
        },
        //传媒公司表单和图片未上传验证
        judgeMediaPicture : function(){
            var $media_business_license=$('#media_business_license').val(),//上传营业执照
                mediaPicture=document.getElementsByClassName('media_upload_picture'),//案例照片
                picture=[],//空数组
                i=0 , flag=true,
                scale=judgeRadio('media_company_scale');
            for(l=mediaPicture.length;i < l;i++){
                if(mediaPicture[i].value !=''){
                    picture.push(mediaPicture[i].value);
                }
            };

            if($media_business_license==''){
                flag=false;
                layer_alert.reminder('请上传营业执照照片！');
            }else if(picture.length==0){
                flag=false;
                layer_alert.reminder('请上传案例照片！');
            }else if(scale==false){
                flag=false;
                layer_alert.reminder('请选择公司规模！');
            }
            return flag;
        }
    };
    /*
     ****jqueryVlidate方法扩展
     */
    jQuery.validator.addMethod("telphoneValid", function(value, element) {
        var tel = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
        return tel.test(value) || this.optional(element);
    }, "请输入正确的手机号码");
    jQuery.validator.addMethod("isIdCardNo", function(value, element) {
        return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
    }, "请正确输入您的身份证号码");
    jQuery.validator.addMethod("isQQ", function(value, element) {
        return this.optional(element) || idCardNoUtil.isQQ(value);
    }, "QQ号码格式不正确");
    //联系反馈图片上传预览
    $('#feedBackUpload').on('change',function(){
        //console.log('ssss');//relative_certificate_example_box
        personal_img_preview($(this),this);
    });
    function personal_img_preview(personal_img,$this){
        var objUrl = getObjectURL($this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            personal_img.prev().attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            var $picture_name=personal_img.val(),
                arr=$picture_name.split('\\'),
                pic_name=arr[arr.length-1];//取得的图片名称
            personal_img.next().html( pic_name);
        }
    };
    showIserrorMessage($('.is_error1'),'/ServiceCenter/Feedback');

    //点击编辑弹出图片头像处理样式
    $(".personalEditor").on("click",function (){
        $('.pictureCropBox').css("display",'block');
        $(".pictureCrop").css("display",'block');
    });
    $('.pictureCropBox').on("click",function(){
        $(this).css("display","none");
        $(".pictureCrop").css("display",'none');
    });
    //图片上传代码
    var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: ''
    }
    var cropper = $('.imageBox').cropbox(options);
    var img="";
    $('#upload-file').on('change', function(){
        var reader = new FileReader();
        reader.onload = function(e) {
            options.imgSrc = e.target.result;
            cropper = $('.imageBox').cropbox(options);
            getImg();
        }
        reader.readAsDataURL(this.files[0]);
        //this.files = [];
        //getImg();
    })
    $('#btnCrop').on('click', function(){
        var imgUrl=	cropper .options.imgSrc;
        console.log(imgUrl);
        if(!!!imgUrl){
            layer.alert("请选择上传图片！");
        }else{
            var data={
                img :imgUrl,
                type:'portrait'
            };
            $.ajax({
                data:data,
                type: "post",
                url:'/upload/upload',
                dataType: "json",
                timeout: 200000,
                async: true,
                success: function (result) {
                    if(result.status==1){
                        console.log(result);
//                    	 $(".originalLogoImg").attr("src",result.data);
//                         dialog.success(result.message);
//                         $(".pictureCrop").css("display",'none');
                        var url=window.location.href;
                        window.location.href=url;
                    }else{

                    }
                }
            });
        }

    })
    function getImg(){
        img = cropper.getDataURL();
        $('.cropped').html('');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>70px*70px</p>');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>22px*22px</p>');
    }
    $(".imageBox").on("mouseup",function(){
        getImg();
    });
    $('#btnZoomIn').on('click', function(){
        cropper.zoomIn();
    });
    $('#btnZoomOut').on('click', function(){
        cropper.zoomOut();
    });

});