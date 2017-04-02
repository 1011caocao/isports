/**
 * Created by luqia on 2017/2/16.
 */
require.config({
    baseUrl: "/public/js/require",/*require定义基准路径*/
    paths: {
        //引入jquery
        "jquery": "jquery",
        //引入星级评分插件
        "raty" : '/public/plugin/starGrade/lib/jquery.raty'
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
    $('#exampleParent').on('click','.commentJudgeNo',function(){
        if(!classNameLength.jcL($(this),3)){
            $(this).addClass('buttonNoActive');
            $(this).parent().prev('.addCommentContentBox').stop().slideDown();
        }else{
            $(this).removeClass('buttonNoActive');
            $(this).parent().prev('.addCommentContentBox').stop().slideUp();
        }
    });
    //点击取消按钮隐评论框
    $('#exampleParent').on('click','.addCommentCancelButton',function(){
        $(this).parents('.addCommentContentBox').slideUp().next('.commentJudgeBox').find('.commentJudgeNo').removeClass('buttonNoActive');
    });
    //点击确认按钮隐藏评论框
    $('#exampleParent').on('click','.addCommentConfirmButton',function(){
        $(this).parents('.addCommentContentBox').slideUp().next('.commentJudgeBox').find('.commentJudgeNo').removeClass('buttonNoActive');
    });
    //待筛选选项卡点击右边button选项向textarea中加入内容
    $('#exampleParent').on('click','.addInputButton input',function(){
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
        $(this).parent().prev('.addCommentBox').find('.addInputComment').val(text);
    });
    //点击评论显示评论的内容和选项
    $('#CommentExampleParent').on('click','.clickComment',function(){
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
    $('#CommentExampleParent').on('click','.waitCommentCancel',function(){
        $(this).parents('.waitCommentContentBox').slideUp().prev('.waitCommentEHBox').find('.clickComment').removeClass('buttonActive');
    });
    //点击确认按钮隐藏评论框
    $('#CommentExampleParent').on('click','.waitCommentConfirm',function(){
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
    $('#CommentExampleParent').on('click','.tabButton',function(){
        var $cl=$(this).attr('class'),
            arrl=$cl.split(' '),len=arrl.length;
        if(len!=1){
            $(this).removeClass('buttonActive');
        }else{
            $(this).addClass('buttonActive');
        }
    });
    //待评论选项卡点击右边button选项向textarea中加入内容
    $('#CommentExampleParent').on('click','.waitCommentInputTab button',function(){
        var commentValue=$(this).parent().find('.buttonActive'),
            text='';
        commentValue.each(function(index,element){
            text+=element.innerHTML;
        });
        $(this).parent('.waitCommentInputTab').prev('.waitCommentInputBox').find('.waitCommentInputText').val( text);
    });
    //我的演艺待筛选点击通过按钮
    var changeClass={
        hasClass : function(obj,cls){
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass : function(obj,cls){
            if(!changeClass.hasClass(obj,cls)){
                obj.className += " " + cls;
            }
        },
        deleteClass : function(obj, cls){
            if(!!changeClass.hasClass(obj,cls)){
                var reg=new RegExp("(\\s|^)" + cls + "(\\s|$)");
                obj.className=obj.className.replace(reg,"");
            }
         }
    };
    //判断dom元素中className的数量
    function judgeClassNameLength(){
        var cname=document.getElementsByClassName('commentJudgePass');
        for(var i = 0,l = cname.length;i < l ; i++){
            cname[i].onclick=function(){
                if(!!(this.className .split(' ').length==3)){
                    changeClass.deleteClass(this,'commentJudgePass1Active');
                }else{
                    changeClass.addClass(this,'commentJudgePass1Active');
                }
            }
        }
    };
    $('#exampleParent').on('click',".commentJudgePass",function(){
        if(!!(this.className .split(' ').length==3)){
            $(this).text('通过').next().css('display','block');
            changeClass.deleteClass(this,'commentJudgePass1Active');
        }else{
            $(this).text('已通过').next().css('display','none');
            changeClass.addClass(this,'commentJudgePass1Active');
        }
    });
    //将时间戳转换为特定分隔符分隔的日期格式
    function timestampToDateStr(timestamp,separator) {
        var timestamp = parseInt(timestamp)*1000;
        var dd = new Date(timestamp);
        var y = dd.getFullYear();
        var m = dd.getMonth()+1 <10 ? '0'+(dd.getMonth()+1) : dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate() < 10 ? '0'+dd.getDate() : dd.getDate();
        var h=dd.getHours(); //获取当前小时数(0-23)
        var min=dd.getMinutes();
        return {
            data:y+separator+m+separator+d,
            time :h+":"+min
        };
    }
    //上下页ajax翻页
    $('.pagesBox').on('click','.pagination li a',function(){
        var url = $(this).attr('href');
        $(this).attr("href",'javascript:void("0")');
        $.ajax({
            data:'',
            type: "post",
            url:url,
            dataType: "json",
            async: true,
            success: function (result) {
                var html='';
                if(result.status==1){
                    for(var i=0,len=result.data.screenLists.length;i<len ;i++){
                        var company_name=result.data.screenLists[i].company_name ? result.data.screenLists[i].company_name : result.data.screenLists[i].real_name,
                        cloneExample=$('.cloneBox'),data=timestampToDateStr(result.data.screenLists[i].add_time,'.').data,time=timestampToDateStr(result.data.screenLists[i].add_time,'-').time;
                        cloneExample.find('.waitFiltrateExample').find('.waitFiltrateHead').find('.headLogo').find('.headLogoI').attr('src',result.data.screenLists[i].portrait).end().next('.waitFiltrateCh').text(company_name).next('.waitFiltrateDate').text(data).next('.waitFiltrateTime').text(time).parents('.waitFiltrateExample')           .find('.waitFiltrateContent').text(result.data.screenLists[i].content);
                        html+=cloneExample.html();
                    }
                    $('.waitFiltrateContentBox').html(html);
                    $('.pagesBox').html(result.data.pageRes);
                }
            }
        })

    });

});