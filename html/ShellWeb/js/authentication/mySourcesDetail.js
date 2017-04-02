/**
 * Created by luqia on 2016/12/29.
 */
require.config({
    baseUrl: "../../js/require",/*require定义基准路径*/
    paths: {
        //引入jquery
        "jquery": "jquery",
        //引入星级评分插件
        "raty" : '../../../ShellWeb/plugin/starGrade/lib/jquery.raty'
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
    });
    //鼠标移上隐藏联系我们
    $('.contact1').mouseout(function(){
        $('.slightlyQR').css('display','none');
        $('.triangle').css('display','none');
    });
    //鼠标滑过实现二维码显示
    $('.planar').mouseover(function(){
        $('.online').css('display','block');
        $(this).find('img').css('display','none');
    });
    $('.planar').mouseout(function(){
        $('.online').css('display','none');
        $(this).find('img').css('display','block');
    });
    //鼠标移上显示返回顶部
    $('.up').mouseover(function(){
        $('.return').css('display','block');
        $(this).find('img').css('display','none');
    });
    //鼠标移出显示返回顶部logo
    $('.up').mouseout(function(){
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
    //判断className数量长度方法封装
    var classNameLength=(function(){
        function judgeLength($this){
            var $className=$this.attr('class');
            var classL=$className.split(' ').length;
            return classL;
        }
        return {
            jcL : function($this,n){
                if (judgeLength($this) == n) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    })();
    //待筛选点击不匹配按钮显示增加评论内容
    $('.commentJudgeNo').click(function(){
            if(!classNameLength.jcL($(this),3)){
                $(this).addClass('buttonNoActive');
                $(this).parent().prev('.addCommentContentBox').stop().slideDown();
            }else{
                $(this).removeClass('buttonNoActive');
                $(this).parent().prev('.addCommentContentBox').stop().slideUp();
            }
    });
    //点击取消按钮隐评论框
    $('.addCommentCancelButton').click(function(){
        $(this).parents('.addCommentContentBox').slideUp().next('.commentJudgeBox').find('.commentJudgeNo').removeClass('buttonNoActive');
    });
    //点击确认按钮隐藏评论框
    $('.addCommentConfirmButton').click(function(){
        $(this).parents('.addCommentContentBox').slideUp().next('.commentJudgeBox').find('.commentJudgeNo').removeClass('buttonNoActive');
    });
    //待筛选选项卡点击右边button选项向textarea中加入内容
    $('.addInputButton').find('input').click(function(){
        var state=$(this).attr('class');
        if(state){
            $(this).removeClass('buttonActive');//添加按钮选中状态
        }else{
            $(this).addClass('buttonActive');//删除选中状态
        }
        var $buttonList=$(this).parent().find('.buttonActive'),
            text='';
        for(var i = 0,l=$buttonList.length;i < l;i++){
            text+=$buttonList[i].value;
        }
        $(this).parent().prev('.addInputComment').val(text);
    });
    //点击评论显示评论的内容和选项
    $('.clickComment').click(function(){
        if(!classNameLength.jcL($(this),2)){
            //按钮切换效果
            $(this).addClass('buttonActive');
            //显示评论框
            $(this).parent().next('.waitCommentContentBox').slideDown();
        }else{
            $(this).removeClass('buttonActive');
            //隐藏评论框
            $(this).parent().next('.waitCommentContentBox').slideUp();

        }
    });
    //点击取消按钮隐藏评论框
    $('.waitCommentCancel').on('click',function(){
        $(this).parents('.waitCommentContentBox').slideUp().prev('.waitCommentEHBox').find('.clickComment').removeClass('buttonActive');
    });
    //点击确认按钮隐藏评论框
    $('.waitCommentConfirm').on('click',function(){
        $(this).parents('.waitCommentContentBox').slideUp().prev('.waitCommentEHBox').find('.clickComment').removeClass('buttonActive');
    });
    //应用星级评分
    starGrade($('.waitCommentStarImgB'));
    //封装星级评分方法
    function starGrade(id){
        var score=0;
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
            click : function(score,evt){
                var starDom = $(this).next('.waitCommentStarExample');
                if(score==1){
                    starDom.html('本次合作糟糕透顶，生无可恋！');
                }else if(score==2){
                    starDom.html('本次合作不太顺利，有待改进！');
                }else if(score==3){
                    starDom.html('本次合作基本顺利，仍有提升！');
                }else if(score==4){
                    starDom.html('本次合作十分顺利，效果极佳！');
                }else if(score==5){
                    starDom.html('本次合作非常完美，无可挑剔！');
                }

            }
        });
    };
    //评论button动态添加选中状态
    $('.tabButton').on('click',function(){
        var $cl=$(this).attr('class'),
            arrl=$cl.split(' '),len=arrl.length;
        if(len!=1){
            $(this).removeClass('buttonActive');
        }else{
            $(this).addClass('buttonActive');
        }

    });
    //待筛选选项卡点击右边button选项向textarea中加入内容
    $('.waitCommentInputTab').find('button').click(function(){
        var commentValue=$(this).parent().find('.buttonActive'),
            text='';
        commentValue.each(function(index,element){
            text+=element.innerHTML;
        });
        $(this).parent('.waitCommentInputTab').prev('.waitCommentInputText').val( text);
    });

});