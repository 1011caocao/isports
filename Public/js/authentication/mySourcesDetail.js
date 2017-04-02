/**
 * Created by luqia on 2016/12/29.
 */
require.config({
    baseUrl: "../../js/require",/*require定义基准路径*/
    paths: {
        //引入jquery
        "jquery": "jquery",
        //引入星级评分插件
        "raty" : '../../../../ShellWeb/plugin/starGrade/lib/jquery.raty'
    },
    //定义插件依赖环境
    shim: {
        'raty': {
            deps: ['jquery'],
            exports: 'jQuery.fn.raty'
        }
    }
});
require(['jquery','raty'],function($) {
    //鼠标移上显示联系我们
    $('.contact1').mouseenter(function(){
        $('.slightlyQR').css('display','block');
        $('.triangle').css('display','block');
    }).mouseout(function(){
        $('.slightlyQR').css('display','none');
        $('.triangle').css('display','none');
    });
    //鼠标滑过实现二维码显示
    $('.planar').mouseover(function(){
        $('.online').css('display','block');
        $(this).find('img').css('display','none');
    }).mouseout(function(){
        $('.online').css('display','none');
        $(this).find('img').css('display','block');
    });
    //鼠标移上显示返回顶部
    $('.up').mouseover(function(){
        $('.return').css('display','block');
        $(this).find('img').css('display','none');
    }).mouseout(function(){
        $('.return').css('display','none');
        $(this).find('img').css('display','block');
    });
    //点击返回顶部
    $('.up').click(function(){
        $("body,html").animate({scrollTop:0},600);
    }).css('cursor','pointer');
    //待筛选和待评论选项卡切换
    $('.waitFiltrate').click(function(){
        //按钮效果的切换
        $(this).addClass('changeTabColor').next('.waitComment').removeClass('changeTabColor');
        //显示待筛选内容
        $('.waitFiltrateBox').css('display','block').next('.waitCommentBox').css('display','none');
    }).next('.waitComment').click(function(){
        //按钮效果的切换
        $(this).addClass('changeTabColor').prev('.waitFiltrate').removeClass('changeTabColor');
        //显示带评论内容
        $('.waitFiltrateBox').css('display','none').next('.waitCommentBox').css('display','block');
    });
    //待筛选点击不匹配按钮显示增加评论内容
    var matchState=true;
    $('.commentJudgeNo').click(function(){
            if(matchState){
                $(this).css({'background':'#ff9700',"border":'0',"color":'#fff'});
                $(this).parent().prev('.addCommentContentBox').slideDown();
                matchState=false;
            }else{
                $(this).css({'background':'#fff',"border":'1px solid #707070',"color":'#5e5e5e'});
                $(this).parent().prev('.addCommentContentBox').slideUp();
                matchState=true;
            }
    });
    //点击取消按钮隐评论框
    $('.addCommentCancelButton').click(function(){
        $(this).parents('.addCommentContentBox').slideUp().next('.commentJudgeBox').find('.commentJudgeNo').css({'background':'#fff',"border":'1px solid #707070',"color":'#5e5e5e'});
    });
    //待筛选选项卡点击右边button选项向textarea中加入内容
    var buttonVal='';
    $('.addInputButton').find('input').click(function(){
        buttonVal+=$(this).val();
        if(!($(this).attr('class')=='buttonActive')){
            $(this).addClass('buttonActive').parent().prev('.addInputComment').val(buttonVal);
        }else{

        }
    });
    //点击评论显示评论的内容和选项
    var comment_state=true;
    $('.clickComment').click(function(){
        if(!!comment_state){
            //按钮切换效果
            $(this).css({'background':'#ff9700',"border":'0',"color":'#fff'});
            //显示评论框
            $(this).parent().next('.waitCommentContentBox').slideDown();
            comment_state=false;
        }else{
            $(this).css({'background':'#fff',"border":'1px solid #707070',"color":'#5e5e5e'});
            //隐藏评论框
            $(this).parent().next('.waitCommentContentBox').slideUp();
            comment_state=true;
        }
    });
    //应用星级评分
    starGrade($('#star_0'));
    starGrade($('#star_1'));
    starGrade($('#star_2'));
    starGrade($('#star_3'));
    starGrade($('#star_4'));
    //封装星级评分方法
    function starGrade(id){
        id.raty({
            score:function(){
                return $(this).attr("data-num");
            },
            starOn:'../../plugin/starGrade/lib/img/star-on.png',
            starOn:'../../plugin/starGrade/lib/img/star-on.png',
            starOn:'../../plugin/starGrade/lib/img/star-on.png',
            starOff:'../../plugin/starGrade/lib/img/star-off.png',
            starHalf:'../../plugin/starGrade/lib/img/star-half.png',
            readOnly:false,
            halfShow:true,
            size:20,
        })
    }
});