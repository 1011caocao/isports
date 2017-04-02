require.config({
   baseUrl: "../../js/require",
　　 paths: {
　　　　　　"jquery": "jquery",
		'compatibility':'compatibility'
　　 }
	
　　});

require(['jquery','compatibility'],function($,compatibility){
	compatibility.compatibility();
});
