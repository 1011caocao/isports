/**
 * Created by luqia on 2016/12/30.
 */
require.config({
    baseUrl: "/public/js/require",
    paths: {
        "jquery": "jquery",
        'unslider':'/public/js/require/unslider.min',
        'cityselect':'/public/js/require/jquery.cityselect'
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
require(['jquery','cityselect','unslider'],function($){
    //鼠标滑过实现二维码显示
    $('.planar').mouseover(function(){
        $('.online').css('display','block');
        $(this).find('img').css('display','none');
    }).mouseout(function(){
        $('.online').css('display','none');
        $(this).find('img').css('display','block');
    });
    $('.up').mouseover(function(){
        $('.return').css('display','block');
        $(this).find('img').css('display','none');
    }).mouseout(function(){
        $('.return').css('display','none');
        $(this).find('img').css('display','block');
    });
    //返回顶部
    $('.up').click(function(){
        $("body,html").animate({scrollTop:0},600);
    }).css('cursor','pointer');
    //下拉列表选项
    /**
    $('.pullBox').mouseover(function(){
        $('.pullDown').stop().slideDown(100);
    }).mouseleave(function(){
        $('.pullDown').stop().slideUp(100);
    });
     **/
    $('.contact1').mouseenter(function(){
        $('.slightlyQR').css('display','block');
        $('.triangle').css('display','block');
    }).mouseout(function(){
        $('.slightlyQR').css('display','none');
        $('.triangle').css('display','none');
    });
    //判断本地缓存中是否有存有用户数据，如有，则显示用户已登录状态
    var data=JSON.parse(localStorage.getItem('userdata'));
    if(data){
        var phone=data.phone;
        $('.loginEnroll').find('.replaceBox').html('<img class="personalLogo" src="/public/img/common/home-Personal_03.png"/><a class="dataUser" href="#">'+data.phone+'</a>');
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
    //点击tab切换显示形象才艺展示与相关证书和才艺视频
    /*显示形象才艺展示*/
    $('.visualTalentShow').click(function(){
        $(this).addClass('personalShowActive').siblings().removeClass('personalShowActive');
        $('.visualTalentShowTab').css('display','block').siblings().css('display','none');
    }).next('.relativeCertificate').on('click',function(){/*显示相关证书展示*/
        $(this).addClass('personalShowActive').siblings().removeClass('personalShowActive');
        $('.relativeCertificateTab').css('display','block').siblings().css('display','none');
    }).next('.talentShowVideo').bind('click',function(){/*显示才艺视频连接*/
        $(this).addClass('personalShowActive').siblings().removeClass('personalShowActive');
        $('.talentShowVideoTab').css('display','block').siblings().css('display','none');
    });
});