//直接在需要的页面上，加入该js。最好是封装成一个js文件
///*! http://mths.be/placeholder v2.1.2 by @mathias */
require.config({
	baseUrl: "js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
　　　　	
　　 }
		
});
define("compatibility",['jquery'],function($){
	

var compatibility=function(){
	

	
	 if( !('placeholder' in document.createElement('input')) ){  
   
    $('input[placeholder],textarea[placeholder]').each(function(){   
      var that = $(this),   
      text= that.attr('placeholder');   
      if(that.val()===""){   
        that.val(text).addClass('placeholder');   
      }   
      that.focus(function(){   
        if(that.val()===text){   
          that.val("").removeClass('placeholder');   
        }   
      })   
      .blur(function(){   
        if(that.val()===""){   
          that.val(text).addClass('placeholder');   
        }   
      })   
      .closest('form').submit(function(){   
        if(that.val() === text){   
          that.val('');   
        }   
      });   
    });   
  }  



}
	return{
		compatibility:compatibility
	}


});