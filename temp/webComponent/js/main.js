require.config({
	baseUrl: './js',
	paths: {
		// lib
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'underscore': '../bower_components/underscore/underscore',
		'text': '../bower_components/text/text',

		// templates
		'loadingSubmitTpl': '../templates/loading.submit.html',

		// component
		'Widget': 'components/widget',
		'WidgetMask': 'components/widget.mask',
		'WidgetLoadingSubmit': 'components/widget.loading.submit'
	}
});

require(['WidgetLoadingSubmit', 'jquery'], function(WidgetLoadingSubmit, $){

	window.wLoadingSubmit = new WidgetLoadingSubmit({
		maskToHide: true
	});

	$('#js_favoriteBox').on('click', function(){
		wLoadingSubmit.show();
	})

});