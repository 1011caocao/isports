/**
 * Created by luqia on 2016/12/15.
 */
require.config({
    baseUrl: "../../js/require",
    paths: {
        "jquery": "jquery",
        'complex': 'complex',
        'unslider':'../../../ShellWeb/js/require/unslider.min',
        'cityselect':'../../../ShellWeb/js/require/jquery.cityselect'
    },
    shim: {
        'cityselect': {
            deps: ['jquery'],
            exports: 'jQuery.fn.citySelect'
        },
        'unslider':{
            deps: ['jquery'],
            exports: 'jQuery.fn.unslider'
        }
    }
});
require(['jquery','complex','cityselect','unslider'],function($,complex){
    $("#city").citySelect({
        url:"../../plugin/city.min.js",
        prov:"四川", //省份
        city:"成都", //城市
        dist:"青羊区", //区县
        nodata:"none" //当子集无数据时，隐藏select
    });
    //各种效果实现
    complex.complex();
    //定义轮播模块
    var unslider04 = $('#b04').unslider({dots: true}),
        data04 = unslider04.data('unslider');
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
    //判断本地中是否缓存有当前用户的注册信息，如有替换掉头部头像显示已登录状态
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
    $('#mediaSourcesChoose').change(function(){
        var $slectorOp=$('#mediaSourcesChoose option:selected').val();
        if($slectorOp=='场馆资源'){
            $('#schoolSite').css('display','block').next('#schoolMedia').css('display','none');
        }else if($slectorOp=='媒体资源'){
            $('#schoolSite').css('display','none').next('#schoolMedia').css('display','block');
        }else{
            $('#schoolSite').css('display','none').next('#schoolMedia').css('display','none');
        }
    });
});