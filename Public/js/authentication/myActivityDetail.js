/**
 * Created by luqia on 2016/12/27.
 */
require.config({
    baseUrl: "/public/js/require",
    paths: {
        "jquery": "jquery",
        //引入星级评分插件
        "raty" : '/public/plugin/starGrade/lib/jquery.raty',
        'layer' :'/public/js/require/layer/layer',
    },
    //定义插件依赖环境
    shim: {
        'raty': {
            deps: ['jquery'],
            exports: 'jQuery.fn.raty'
        }
    }
});
require(['jquery','raty',"layer"],function($) {
    layer.config({
        path: '/public/js/require/layer/' //定义layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    //鼠标移上显示联系我们
    $('.contact1').mouseenter(function(){
        $('.slightlyQR').css('display','block');
        $('.triangle').css('display','block');
    }).mouseout(function(){//鼠标移上隐藏联系我们
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
    }).mouseout(function(){//鼠标移出显示返回顶部logo
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
            $(this).parent().prev('.addCommentContentBox').slideDown();
        }else{
            $(this).removeClass('buttonNoActive');
            $(this).parent().prev('.addCommentContentBox').slideUp();
        }
    });
    //点击取消按钮隐评论框
    $('.addCommentCancelButton').click(function(){
        $(this).parents('.addCommentContentBox').slideUp().next('.commentJudgeBox').find('.commentJudgeNo').removeClass('buttonNoActive');
    });
    //点击确认按钮影藏评论框
    $('.addCommentConfirmButton').on('click',function(){
        var commentText=$(this).parent().prev().find(".addInputComment").val();
        if(commentText==""){
            layer.alert("请选择评论内容!");
        }else{
            $.ajax({
                data:commentText,
                type: "post",
                url:'/login/login',
                dataType: "json",
                async: true,
                success: function (result) {
                    if(result.status==1){
                        //请求成功执行
                        $(this).parents('.addCommentContentBox').slideUp().next('.commentJudgeBox').find('.commentJudgeNo').removeClass('buttonNoActive').addClass('commentPassActive').prev(".commentJudgePass").css("display","none");
                    }else{

                    }
                }
            });
        }

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
            //显示评论框
            $(this).parent().next('.waitCommentContentBox').slideDown();
            //按钮切换效果
            $(this).addClass('commentButton');
        }else{
            //隐藏评论框
            $(this).parent().next('.waitCommentContentBox').slideUp();
            $(this).removeClass('commentButton');
        }
    });
    //点击取消按钮隐藏收起评论框
    $('.waitCommentCancel').on('click',function(){
        $(this).parents('.waitCommentContentBox').slideUp().prev('.waitCommentEHBox').find('.clickComment').removeClass('commentButton');
    });
    //点击确认按钮收起评论框
    $('.waitCommentConfirm').on('click',function(){
        var commentText=$(this).parent().prev().find(".waitCommentInputText").val();
        var star=$(this).parent().prev().prev().find(".waitCommentStarImgB").attr("star") ? $(this).parent().prev().prev().find(".waitCommentStarImgB").attr("star") : 0;
        var starComment=$(this).parent().prev().prev().find(".waitCommentStarImgB").next().text();
        var data={
            "commentText":commentText,
            "star": star,
            "starComment":starComment
        };
        if(commentText==""){
            layer.alert("请选择评论内容!");
        }else if(star==0){
            layer.alert("请选择评论星级!");
        }else{
            $.ajax({
                data:data,
                type: "post",
                url:'/login/login',
                dataType: "json",
                async: true,
                success: function (result) {
                    if(result.status==1){
                        //请求成功执行
                        $(this).parents('.waitCommentContentBox').slideUp().prev('.waitCommentEHBox').find('.clickComment').removeClass('commentButton');
                    }else{

                    }
                }
            });
        }

    });
    //应用星级评分
    starGrade($('.waitCommentStarImgB'));
    //封装星级评分方法
    function starGrade(className){
        className.raty({
            score:function(){
                return $(this).attr("data-num");
            },
            starOn:'/public/plugin/starGrade/lib/img/star-on.png',
            starOn:'/public/plugin/starGrade/lib/img/star-on.png',
            starOn:'/public/plugin/starGrade/lib/img/star-on.png',
            starOff:'/public/plugin/starGrade/lib/img/star-off.png',
            starHalf:'/public/plugin/starGrade/lib/img/star-half.png',
            readOnly:false,
            halfShow:true,
            size:20,
            click : function(score,evt){
                var starDom = $(this).next('.waitCommentStarExample');
                $(this).attr("star",score);
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
        })
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
    //定义单例增加或删除className名
    var activeClass=(function(){
        function hasClass(obj,cls){
            return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
        };
        return {
            addClass : function(obj, cls){
                if(!hasClass(obj,cls)){
                    obj.className=obj.className + " "+ cls;
                }
            },
            deleteClass : function(obj, cls){
                if(!!hasClass(obj,cls)){
                    var reg=new RegExp("(\\s|^)" + cls + "(\\s|$)");
                    obj.className=obj.className.replace(reg,"");
                }
            }
        }
    })();
    $(".commentJudgePass").on("click",function(){
        var l=$(this).prop('class').split(' ').length;
        //var l=this.className.split(' ').length;
            var id=$(this).attr("name");
            //console.log(id);
            $.ajax({
                data:id,
                type: "post",
                url:'/login/login',
                dataType: "json",
                async: true,
                success: function (result) {
                    if(result.status==1){
                        $(this).next().css('display','none');
                        activeClass.addClass(this,'commentPassActive');
                    }else{
                        layer.alert("操作失败");
                    }
                }
            });
    });

    $(".personal_oofline").on("click",function(){
        var id=$(".offlineMessage").attr("name"),
            da=$(this).attr("name");
        var data={
            "id" :id,
            "data" : da
        };
        layer.confirm('请选择是否下线？', {
            btn: ['确认','取消'], //按钮
            yes : function(index){
               $.ajax({
                    data:data,
                    type: "post",
                    url:'/BusinessCenter/deletePublish',
                    dataType: "json",
                    async: true,
                    success: function (result) {
                        if(result.status==1){
                            console.log(result);return;
                            layer.close(index);//成功回调后关闭弹窗
                        }else{
                        }
                    }
                });
            },
            no : function(){

            }
        });
    });
});