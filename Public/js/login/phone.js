require.config({
   baseUrl: "/public/js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'compatibility':'compatibility'
　　 }
	
　　});

require(['jquery','compatibility'],function($,compatibility){
	compatibility.compatibility();
});
