require.config({
	baseUrl: '../js',
	paths: {
		// lib
		'jquery': '../bower_components/jquery/dist/jquery.min',

		// component
		'Widget': 'components/widget',
		'WidgetMask': 'components/widget.mask',
		'WidgetWindow': 'components/widget.window'
	}
});

require(['jquery', 'WidgetMask', 'WidgetWindow'], function($, WidgetMask, WidgetWindow){

	var wMask = null;

	$('#js_showMask').on('click', function(){

		if(!wMask){
			wMask = new WidgetMask({
				css: {
					top: '44px'
				},
				handleShow: function(){
					alert('show1');
				}
			});

		}else{
			wMask.show();
		}

	});

	$('#js_hideMask').on('click', function(){
		wMask && wMask.hide();
	})

});