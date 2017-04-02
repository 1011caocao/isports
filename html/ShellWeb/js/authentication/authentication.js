/**
 * Created by luqia on 2016/12/7.
 */
require.config({
    baseUrl: "../../js/require",
    paths: {
        "jquery": "jquery",
        'complex' : 'complex',
        'lrz' :'../../../ShellWeb/plugin/lrz.bundle',
        'layer' :'../../../ShellWeb/js/require/layer/layer',
        'validate' : '../../../ShellWeb/plugin/jquery.validate',
        'metadata' :'../../../ShellWeb/plugin/jquery.metadata',
        'cropbox' :'../../../ShellWeb/js/require/cropbox'
    },
    //定义插件依赖环境
    shim: {
        'validate': {
            deps: ['jquery'],
            exports: 'jQuery.fn.validate'
        },
        'metadata': {
            deps: ['jquery'],
            exports: 'jQuery.fn.metadata'
        },
        'cropbox' :{
            deps: ['jquery'],
            exports: 'jQuery.fn.cropbox'
        }
    }



});
require(['jquery','complex','lrz','layer','validate','metadata','cropbox'],function($,complex,lrz,layer){
    $(function(){
        $.metadata.setType("attr", "validate1");
        complex.complex();
        $('#form1').find('.owner_company').on('click',function(){
            $('#form1').validate({
                rules: {
                    realName: {
                        required : true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    ID_number :{
                       required : true
                    },
                    phone_number :{
                        required : true
                    },
                    detail_address :{
                        required : true
                    },
                    company_name : {
                        required : true
                    },
                    part_name :{
                        required : true
                    },
                    job_position :{
                        required : true
                    },
                    comapny_introduce :{
                        required : true
                    }

                },
                messages: {
                    firstname: "请输入您的名字",
                    lastname: "请输入您的姓氏",
                    username: {
                        required: "请输入用户名",
                        minlength: "用户名必需由两个字母组成"
                    },
                    password: {
                        required: "请输入密码",
                        minlength: "密码长度不能小于 5 个字母"
                    },
                    confirm_password: {
                        required: "请输入密码",
                        minlength: "密码长度不能小于 5 个字母",
                        equalTo: "两次密码输入不一致"
                    },
                    email: "请输入一个正确的邮箱",
                    agree: "请接受我们的声明",
                    topic: "请选择两个主题"
                }
            });
            $('#form1').submit();
        });

        layer.config({
            path: '../../js/require/layer/' //定义layer.js所在的目录，可以是绝对目录，也可以是相对目录
        });
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
        //menu主菜单tab键的切换
        $('.identity').click(function(){
            $('.identityTab').css('display','block').siblings().css('display','none');
        });
        $('.personalHome').click(function(){
            $('.personalHomeTab').css('display','block').siblings().css('display','none');
        });
        $('.pearlWallet').bind('click',function(){
            $('.pearlWalletTab').css('display','block').siblings().css('display','none');
        });
        $('.myApply').bind('click',function(){
            $('.myApplyTab').css('display','block').siblings().css('display','none');
        });
        $('.drafts').click(function(){
            $('.draftsTab').css('display','block').siblings().css('display','none');
        });
        $('.changePassword').click(function(){
            $('.changePasswordTab').css('display','block').siblings().css('display','none');
        });
        $('.myBusiness').click(function(){
            $('.myBusinessTab').css('display','block').siblings().css('display','none');
        });
        $('.publish').click(function(){
            $('.publishTab').css('display','block').siblings().css('display','none');
        });
        $('.myPublish').click(function(){
            $('.myPublishTab').css('display','block').siblings().css('display','none');
        });
        $('.mySources').click(function(){
            $('.mySourcesTab').css('display','block').siblings().css('display','none');
        });
        $('.myShowtime').click(function(){
            $('.myShowtimeTab').css('display','block').siblings().css('display','none');
        });
        $('.myShowtime').click(function(){
            $('.myShowtimeTab').css('display','block').siblings().css('display','none');
        });
        $('.activityMessage').click(function(){
            $('.activityMessageTab').css('display','block').siblings().css('display','none');
        });
        $('.systemMessage').click(function(){
            $('.systemMessageTab').css('display','block').siblings().css('display','none');
        });
        $('.applySafeguard').click(function(){
            $('.applySafeguardTab').css('display','block').siblings().css('display','none');
        });
        $('.connectBcak').click(function(){
            $('.connectBackTab').css('display','block').siblings().css('display','none');
        });
        $('.systemHelp').click(function(){
            $('.myHelpTab').css('display','block').siblings().css('display','none');
        });
        //menu主菜单效果切换
        $('.persoanlCenter').find('.example').click(function(){
            $(this).addClass('menuActive').siblings().removeClass('menuActive');
        });
    // menu
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
        /////////////////////////////发布页面二级tab导航切换///////////////////////////
        $('.pCommercial').click(function(){
            $(this).css({
                'background':'#ff9700',
                border:'0',
                color:'#fff'
            }).attr('choose','t').siblings().css({
                background:'#fff',
                border:'1px solid #dcdcdc',
                color:'#2f2f2f'
            }).attr('choose','f');
            $('.publishCommercialActivity').css('display','block').siblings().css('display','none');
        }).mouseenter(function(){
            var t=$(this).attr('choose');
            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #ff9700',
                    'color' :'#ff9700'
                })
            }
        }).mouseleave(function(){
            var t=$(this).attr('choose');
            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #e3e3e3',
                    'color' :'#2f2f2f'
                })
            }
        });
        $('.pArtRequire').click(function(){
            $(this).css({
                'background':'#ff9700',
                border:'0',
                color:'#fff'
            }).attr('choose','t').siblings().css({
                background:'#fff',
                border:'1px solid #dcdcdc',
                color:'#2f2f2f'
            }).attr('choose','f');
            $('.publishArtRequire').css('display','block').siblings().css('display','none');
        }).mouseenter(function(){
            var t=$(this).attr('choose');

            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #ff9700',
                    'color' :'#ff9700'
                })
            }
        }).mouseleave(function(){
            var t=$(this).attr('choose');
            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #e3e3e3',
                    'color' :'#2f2f2f'
                })
            }
        });
        $('.pSchoolActivity').click(function(){
            $(this).attr('choose','t').css({
                'background':'#ff9700',
                border:'0',
                color:'#fff'
            }).siblings().css({
                background:'#fff',
                border:'1px solid #dcdcdc',
                color:'#2f2f2f'
            }).attr('choose','f');
            $('.publishSchoolActivity').css('display','block').siblings().css('display','none');
        }).mouseenter(function(){
            var t=$(this).attr('choose');

            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #ff9700',
                    'color' :'#ff9700'
                })
            }

        }).mouseleave(function(){
            var t=$(this).attr('choose');
            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #e3e3e3',
                    'color' :'#2f2f2f'
                })
            }

        });
        $('.pMediaSource').click(function(){
            $(this).attr('choose','t').css({
                'background':'#ff9700',
                border:'0',
                color:'#fff'
            }).siblings().css({
                background:'#fff',
                border:'1px solid #dcdcdc',
                color:'#2f2f2f'
            }).attr('choose','f');
            $('.publishMediaSources').css('display','block').siblings().css('display','none');
        }).mouseenter(function(){
            var t=$(this).attr('choose');

            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #ff9700',
                    'color' :'#ff9700'
                })
            }

        }).mouseleave(function(){
            var t=$(this).attr('choose');
            if(!!!(t=='t')){
                $(this).css({
                    'border':'1px solid #e3e3e3',
                    'color' :'#2f2f2f'
                })
            }

        });
    //顶部个人中心下拉菜单的显示
        var data=JSON.parse(localStorage.getItem('userdata'));
        if(data){
            var phone=data.phone;
            $('.loginEnroll').find('.replaceBox').html('<img class="personalLogo" src="../../img/common/home-Personal_03.png"/><a class="dataUser" href="#">'+data.phone+'</a>');
            //鼠标移上显示个人中心菜单
            $('.loginEnroll').mouseover(function(){
                $('.personalCenter').stop().slideDown();
                $('.personalTriangle').stop().slideDown();
            }).mouseleave(function(){
                $('.personalCenter').stop().slideUp();
                $('.personalTriangle').stop().slideUp();
            });
        }
        $('.exit').click(function(){
            localStorage.clear();
            var url1=window.location.href;
            window.location=url1;
        });


        //传媒资源根据用户的选择，显示不同的选项和输入框
        $('#firstM').change(function(){
           var $slectorOp=$('#firstM option:selected').val();
            if($slectorOp=='广场资源'){
                $('.personalNumber').css('display','block').siblings().css('display','none');
                $('#secondM').css('display','none').next('#secondM1').css('display','none');

            }else if($slectorOp=='场馆资源'){
                $('.mspStadiumBox').css('display','block').siblings().css('display','none');
                $('#secondM').css('display','block').next('#secondM1').css('display','none');
            }else if($slectorOp=='媒体资源'){
                $('.fansNumber').css('display','block').siblings().css('display','none');
                $('#secondM').css('display','none').next('#secondM1').css('display','block');
            }else if($slectorOp=='广告位资源'){
                $('.audienceNumber').css('display','block').siblings().css('display','none');
                $('#secondM').css('display','none').next('#secondM1').css('display','none');
            }else if($slectorOp=='其他'){
                $('.mediaChangeBox').children().css('display','none')
                $('#secondM').css('display','none').next('#secondM1').css('display','none');
            }
        });
            //申请维权和联系反馈选项卡切换
            $('.tl').click(function(){
                var i = $(this).index();
                $('#com li').eq(i).show().siblings().hide();
                $('#com1 li').eq(i).show().siblings().hide();
                $(this).addClass('select').css({'border':'0','color':'white'}).siblings().removeClass('select').css({'border-top':'1px solid #dddddd','border-right':'1px solid #dddddd','color':'black'});
            }).next('.tr1').click(function(){
                var i = $(this).index();
                $(this).addClass('select').css({'border':'0','color':'white'}).siblings().removeClass('select').css({'border-top':'1px solid #dddddd','border-left':'1px solid #dddddd','color':'black'});
                $('#com li').eq(i).show().siblings().hide();
                $('#com1 li').eq(i).show().siblings().hide();
            });
             //传媒公司认证动态添加案例
            $('.mediaContinueAdd').on('click',function(){
                var $caseClone=$(this).prev('.caseBox').find('.mediaCaseClone:first').clone(true).show(),
                    $l=$(this).prev('.caseBox').find('.caseExample').length;
                    $(this).prev('.caseBox').append($caseClone);
                    if($l>2){
                        $(this).css('visibility','hidden');
                        return false;
                    }
            });
             //传媒公司认证点击删除案例盒子
             $('.mediaCompanyCaseBox .caseBox .caseExample .deleteMediaCase').each(function(index,element){
                $(this).on('click',function(){
                    $(this).parent().remove();
                    $('.mediaContinueAdd').css('visibility','visible');
                });
             });
            //校园组织认证动态添加案例
            $('.addSchoolOrganizationCase').on('click',function(){
                var $caseClone=$(this).prev('.caseBox').find('.schoolCaseClone:first').clone(true).show(),
                    $l=$(this).prev('.caseBox').find('.caseExample').length;
                $(this).prev('.caseBox').append($caseClone);
                if($l>2){
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
                    console.log($this.attr('src'));
                    $this.next().next('.clickIpLoad').html(objUrl);
                }
            });
        });
        //演艺人认证相关证书动态添加相关证书
        var relative_continue_add=document.querySelector('.relative_continue_add'),
            $relative_delete=$('.relative_delete'),
            addClick = function(){
               var $relative_example=$('.relative_example:first').clone(true).show(),
                   l= $('.relative_certificate_example').length;
                $('.relative_certificate_example_box').append($relative_example);
                if(l>2){
                    $('.relative_continue_add').css('visibility','hidden');
                    return false;
                }
            };
        complex.eventUntil.addHandler(relative_continue_add,'click',addClick);
       //演艺人认证相关证书动态删除相关证书//
             $relative_delete.on('click',function(){
                 $(this).parent().remove();
                 $('.relative_continue_add').css('visibility','visible');
             });
        //演艺人认证形象才艺展示添加输入框
        $('.art_continue_add').on('click',function(){
            var $talent_example=$('.talent_example:first').clone(true).show(),
                $l=$('.talent_art_example').length;

            $('.talent_art_example_box').append($talent_example);
            if($l>2){
                $(this).css('visibility','hidden');
                return false;
            }

        });
        //演艺人认证形象才艺动态删除相关证书
        $art_delete=$('.art_delete');
        $art_delete.on('click',function(){
            $(this).parent().remove();
            $('.art_continue_add').css('visibility','visible');
        });
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
        //validate 汉化提示内容
        $.extend($.validator.messages, {
            required: "必填",
            remote: "请修正该字段",
            email: "电子邮件格式不正确",
            url: "网址格式不正确",
            date: "日期格式不正确",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符",
            maxlength: $.validator.format("请输入一个 长度最多是 {0} 的字符"),
            minlength: $.validator.format("请输入一个 长度最少是 {0} 的字符"),
            rangelength: $.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符"),
            range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
            max: $.validator.format("请输入一个最大为{0} 的值"),
            min: $.validator.format("请输入一个最小为{0} 的值")
        });


    });
    //申请维权添加图片上传预览
    $('#feedBackUpload').on('change',function(){
        //console.log('ssss');//relative_certificate_example_box
        personalfeed_img_preview($(this),this);
    });
    function personalfeed_img_preview(personal_img,$this){
        var objUrl = getObjectURL($this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            personal_img.prev().attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            var $picture_name=personal_img.val(),
                arr=$picture_name.split('\\'),
                pic_name=arr[arr.length-1];//取得的图片名称
            personal_img.next().html( pic_name);
        }
    };
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
        alert("图片上传喽");
    })
    function getImg(){
        img = cropper.getDataURL();
        $('.cropped').html('');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
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