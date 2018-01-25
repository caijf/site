define(['Widget', 'jquery'], function(Widget, $){

	function Mask(cfg){

		// 默认配置项
		this.cfg = {
			container: 'body',
			class: '',
			css: null,
			preventDefault: true,
			handleShow: null,
			handleHide: null
		}

		this.init(cfg);
	}

	Mask.prototype = $.extend({}, (new Widget()), {

		constructor: Mask,

		init: function(cfg){
			$.extend(this.cfg, cfg);
			this.render(this.cfg.container);

			this.fire('show');

			return this;
		},

		renderUI: function(){
			this.buildBox = $('<div></div>');
		},

		syncUI: function(){
			this.buildBox.css($.extend({
				position: 'fixed',
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				zIndex: 999,
				background: 'rgba(0, 0, 0, .5)'
			}, this.cfg.css));
		},

		bindUI: function(){
			if(this.cfg.preventDefault){
				this.buildBox.on('touchmove', function(){
					e.preventDefault();
				})
			}

			this.cfg.handleShow && this.on('show', this.cfg.handleShow);
			this.cfg.handleHide && this.on('hide', this.cfg.handleHide);
		},

		show: function(){
			this.buildBox.show();

			this.fire('show');

			return this;
		},

		hide: function(){
			this.buildBox.hide();

			this.fire('hide');

			return this;
		}

	});

	return Mask;

})