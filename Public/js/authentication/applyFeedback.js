/**
 * Created by cqin on 2017/2/16.
 */
require.config({
    baseUrl: "/public/js/require",
    paths: {
        "jquery": "jquery",
        'validate' : '/public/plugin/jquery.validate',
        'layer' :'/public/js/require/layer/layer',
    },
    shim: {
        'validate': {
            deps: ['jquery'],
            exports: 'jQuery.fn.validate'
        }
    }
});
require(['jquery','layer','validate'],function($,layer){
    layer.config({
        path: '/public/js/require/layer/' //定义layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    //申请维权和联系反馈选项卡切换
    $('.tl').click(function(){
        var i = $(this).index();
        $('#com .commonLi').eq(i).show().siblings().hide();
        $('#com1 li').eq(i).show().siblings().hide();
        $(this).addClass('select').css({'border':'0','color':'white'}).siblings().removeClass('select').css({'border-top':'1px solid #dddddd','border-right':'1px solid #dddddd','color':'black'});
    }).next('.tr1').click(function(){
        var i = $(this).index();
        $(this).addClass('select').css({'border':'0','color':'white'}).siblings().removeClass('select').css({'border-top':'1px solid #dddddd','border-left':'1px solid #dddddd','color':'black'});
        $('#com .commonLi').eq(i).show().siblings().hide();
        $('#com1 .commonLi').eq(i).show().siblings().hide();
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
    };
    $('#feedBackUpload').on('change',function(){
        //console.log('ssss');//relative_certificate_example_box
        personal_img_preview($(this),this);
    });
    //显示认证错误信息
    var error = $('.is_error').text();
    if(error){
        layer.confirm(error, {
            btn: ['确定'] //按钮
        }, function(){
            window.location.href="/ServiceCenter/applyProtect";
        });
    }
});