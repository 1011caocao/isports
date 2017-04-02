/**
 * Created by maikuraki on 2016/12/5.
 */
/**
 * 添加按钮操作
 */

$("#button-add").click(function () {
    var url = SCOPE.add_url;
    window.location=url;
});

/**
 * 提交form表单操作
 */
$("#singcms-button-submit").click(function () {
    var data = $("#singcms-form").serialize();
//    console.log(data);return;

    //将获取到的数据post到服务器
    save_url = SCOPE.save_url;
    jump_url = SCOPE.jump_url;
    $.post(save_url,data,function (result) {
        if(result.status==0){
            return dialog.error(result.message+':'+result.data);
        }
        if(result.status==1){
            return dialog.success(result.message,jump_url);
        }
    },'JSON');
});

/**
 * 修改操作
 */
$(".singcms-table .singcms-edit").click(function () {
    var id = $(this).attr('attr-id');
    window.location=SCOPE.edit_url+'?id='+id;
});

/**
 * 删除操作
 */
$(".singcms-table .singcms-delete").click(function () {
    var id = $(this).attr('attr-id');
    var a = $(this).attr('attr-a');
    var message = $(this).attr('attr-message');
    var url = SCOPE.set_status_url;

    data = {};
    data['id'] = id;
    data['status'] = -1;
    //弹出框确认
    layer.open({
        title : '是否提交？',
        content : message,
        icon:3,
        btn : ['是','否'],
        yes : function(){
            todelete(url,data);
        },
    });
});
/**
 * 执行删除方法
 */
function todelete(url,data) {
    $.post(url,data,function (res) {
        if(res.status == 1){
            return dialog.success(res.message,'');
        }else{
            return dialog.error(res.message);
        }
    },'JSON');
}

/**
 * 更新排序操作
 */
$("#button-listorder").click(function () {
    var data = $("#singcms-listorder").serialize();

    //将获取到的数据post到服务器
    var url = SCOPE.listorder_url;
    var jump_url = SCOPE.jump_url;
   $.post(url,data,function (result) {
       if(result.status==1){
           return dialog.success(result.message,jump_url);
       }else{
           return dialog.error(result.message+':'+result.data);
       }
   },'JSON');
});

/**
 * 切换用户状态操作
 */
$(".status").click(function () {
    var $this = $(this);
    var url = SCOPE.change_status_url;

    var data = new Object();
    data.uid = $this.attr('attr-id');
    dialog.myConfirm('是否确认？',$this.text(),function () {
        $.post(url,data,function (result) {
            if(result.status==1){
                return dialog.success(result.message,SCOPE.jump_url);
            }else{
                return dialog.error(result.message+':'+result.data);
            }
        },'JSON');
    });
});

/**
 * 认证信息查看
 */
$('.verifyInfo').click(function () {
    var $this = $(this);
    var uid = $this.attr('attr-id');
    var url = SCOPE.user_info_url+'?uid='+uid;
    window.location=url;
});

/**
 * 认证用户角色
 */
$('#certification').click(function(){
    var $this = $(this);
    var url = SCOPE.certifiction_url;
    var data = new Object();
    data.uid = $this.attr('attr-id');
    dialog.myConfirm('是否确认？',$this.text(),function () {
        $.post(url,data,function (result) {
            if(result.status==1){
                return dialog.success(result.message,SCOPE.jump_url);
            }else{
                return dialog.error(result.message+':'+result.data);
            }
        },'JSON');
    });
});

/**
 * 商业活动信息查看
 */
$('.business-info').click(function () {
    var $this = $(this);
    var id = $this.attr('attr-id');
    var url = SCOPE.business_info_url+'?id='+id;
    window.location=url;
});

/**
 * 审核商业活动
 */
$('#check-business').click(function(){
    var $this = $(this);
    var url = SCOPE.check_business_url;
    var data = new Object();
    data.id = $this.attr('attr-id');
    dialog.myConfirm('是否确认？',$this.text(),function () {
        $.post(url,data,function (result) {
            if(result.status==1){
                return dialog.success(result.message,SCOPE.jump_url);
            }else{
                return dialog.error(result.message+':'+result.data);
            }
        },'JSON');
    });
});

/**
* 校园活动信息查看
*/
$('.group-info').click(function () {
    var $this = $(this);
    var id = $this.attr('attr-id');
    var url = SCOPE.group_info_url+'?id='+id;
    window.location=url;
});

/**
 * 审核校园活动
 */
$('#check-group').click(function(){
    var $this = $(this);
    var url = SCOPE.check_group_url;
    var data = new Object();
    data.id = $this.attr('attr-id');
    dialog.myConfirm('是否确认？',$this.text(),function () {
        $.post(url,data,function (result) {
            if(result.status==1){
                return dialog.success(result.message,SCOPE.jump_url);
            }else{
                return dialog.error(result.message+':'+result.data);
            }
        },'JSON');
    });
});
/**
 * 资源信息查看
 */
$('.resource-info').click(function () {
    var $this = $(this);
    var id = $this.attr('attr-id');
    var url = SCOPE.resource_info_url+'?id='+id;
    window.location=url;
});

/**
 * 审核资源活动
 */
$('#check-resource').click(function(){
    var $this = $(this);
    var url = SCOPE.check_resource_url;
    var data = new Object();
    data.id = $this.attr('attr-id');
    dialog.myConfirm('是否确认？',$this.text(),function () {
        $.post(url,data,function (result) {
            if(result.status==1){
                return dialog.success(result.message,SCOPE.jump_url);
            }else{
                return dialog.error(result.message+':'+result.data);
            }
        },'JSON');
    });
});