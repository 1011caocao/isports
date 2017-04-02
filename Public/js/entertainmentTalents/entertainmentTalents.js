/**
 * Created by luqia on 2016/12/23.
 */
require.config({
    baseUrl: "/public/js/require",
    paths: {
        "jquery": "jquery",
        'unslider':'/public/js/require/unslider.min',
        'cityselect':'/public/js/require/jquery.cityselect',
        'complex': 'complex'
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
    //各种效果实现
    complex.complex();

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
    /****************************筛选条件*****************************/
        //省份筛选
    $('#province').change(function(){
        $('#cities').val('0');
        $('#area').val('0');
        getVariable();
    }).next('#cities').change(function(){
        $('#area').val('0');
        getVariable();
    }).next('#area').change(function(){
        getVariable();
    });
    //点击筛选条件增加选项样式
    $('.artType').find('span').bind('click',function(){
        $(this).addClass('getActive').siblings().removeClass('getActive');
        var type=$('.enterActive').attr('name');
        getVariable(type);
    });
    //ajax获取数据
    function getVariable(type){
//    	console.log(type);
        var $province=$('#province').val(),
            $citys=$('#cities').val(),
            $area=$('#area').val(),
            $art_type=$('.artType').find('.getActive').attr('name');
        var data=new Object();
        data.type=type ? type : 0;//价格、热度和星级
        data.province_id=$province;//省份
        data.city_id=$citys;//城市
        data.county_id=$area;//地区
        data.art_type=$art_type ? $art_type : 0;//校园规模
			//console.log(data);return;
        $.ajax({
            data:data,
            type: "post",
            url:'/Art/index/page/'+page,
            dataType: "json",
            async: true,
            success: function (result) {
                if(result.status==1){
                    //翻页样式改变
                    var type=result.data.order;
                    if(type){
                        if(type=='1'){
                            $('.enterPrice').addClass('enterActive').siblings().removeClass('enterActive');
                        }else if(type=='2'){
                            $('.enterHeat').addClass('enterActive').siblings().removeClass('enterActive');
                        } else if(type=='3'){
                            $('.enterStar').addClass('enterActive').siblings().removeClass('enterActive');
                        }
                    }else {
                        $('.enterPrice').addClass('enterActive').siblings().removeClass('enterActive');
                    }
                    var i=0,l=result.data.resultData.length,html='';
                    //有数据
                    if(l!=0){
                        for(;i<l;i++){
                        html+='<dl class="entertainmentExample"> ' +
                            '<dt> <img src="'+result.data.resultData[i].portrait+'"> </dt> ' +
                            '<dd> <div class="enterNumberName">'+
                            '<span class="enterTainmentPrice">'+result.data.resultData[i].price+'/场</span><span class="enterType">'+result.data.resultData[i].name+'</span> '+
                            '</div><p class="entertainmentName">'+result.data.resultData[i].real_name+'</p>'+
                            '<p class="entertainmentHeight">'+result.data.resultData[i].height+'cm</p>'+
                            '<div class="entertainAddress"><img src="/public/img/index/position-down.png" alt="">'+
                            '<span class="enterAddress">'+result.data.resultData[i].city_name+'</span></div></dd></dl>'
                        }
                        $('.entertainmentTalentsBox').html(html);
                    }else{
                        $('.entertainmentTalentsBox').html('<span style="width:100%;height:100px;font-size:20px;display:block;line-height:100px;text-align:center;">没有信息！</span>');
                    }
                    $('.pageBox').html(result.data.pageRes);
                }else{

                }
            }
        });
    }
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

//点击按钮进行演艺人排序选择
    $('.enterButton').bind('click',function(){
        var type=$(this).attr('name');
        getVariable(type);
        $(this).addClass('enterActive')
        .siblings().removeClass('enterActive');
    });
});