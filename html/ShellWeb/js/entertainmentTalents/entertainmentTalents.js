/**
 * Created by luqia on 2016/12/23.
 */
require.config({
    baseUrl: "../../js/require",
    paths: {
        "jquery": "jquery",
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
require(['jquery','cityselect','unslider'],function($){
    $("#entertainmentCity").citySelect({
        url:"../../plugin/city.min.js",
        prov:"四川", //省份
        city:"成都", //城市
        dist:"青羊区", //区县
        nodata:"none" //当子集无数据时，隐藏select
    });
    //鼠标滑过实现二维码显示
    $('.planar').mouseover(function(){
        $('.online').css('display','block');
        $(this).find('img').css('display','none')
    }).mouseout(function(){
        $('.online').css('display','none');
        $(this).find('img').css('display','block')
    });
    $('.up').mouseover(function(){
        $('.return').css('display','block');
        $(this).find('img').css('display','none')
    }).mouseout(function(){
        $('.return').css('display','none');
        $(this).find('img').css('display','block')
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
    //定义轮播模块
    var unslider04 = $('#b04').unslider({dots: true}),
        data04 = unslider04.data('unslider');
    $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
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
//点击按钮进行演艺人排序选择
    $('.enterButton').bind('click',function(){
        $(this).css({
            background:'#fff1dc',
            color:'#ff9700'
        }).siblings().css({
            background:'#fff',
            color:'#2f2f2f'
        });
    });
});