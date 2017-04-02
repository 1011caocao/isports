require.config({
   baseUrl: "../../js/require",
　　 paths: {
　　　　　"jquery": "jquery",
		'complex': 'complex'
　　 }
　　});
require(['jquery','complex'],function($,complex){
	complex.complex();
});