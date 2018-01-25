define(['Widget', 'WidgetMask', 'jquery', 'text!loadingSubmitTpl', 'underscore'], function(Widget, WidgetMask, $, loadingSubmitTpl, _){

	function LoadingSubmit(cfg){

		this.cfg = {
			container: 'body',
			text: '游游努力提交中...',
			css: null,
			class: 'show',
			maskToHide: false,
			handleShow: null,
			handleHide: null
		}

		this.init(cfg);

	}

	LoadingSubmit.prototype = $.extend({}, (new Widget()), {

		constructor: LoadingSubmit,

		init: function(cfg){
			$.extend(this.cfg, cfg);

			this.render(this.cfg.container);

			this.fire('show');

			return this;
		},

		renderUI: function(){

			var tpl = _.template(loadingSubmitTpl)({text: this.cfg.text});

			this.buildBox = $(tpl);

			this.mask = new WidgetMask();

		},

		syncUI: function(){

			if(this.cfg.css){
				this.buildBox.css(this.cfg.css);
			}

			if(this.cfg.class){
				this.buildBox.addClass(this.cfg.class);
			}
		},

		bindUI: function(){

			var self = this;

			if(this.cfg.maskToHide){
				this.mask.buildBox.on('click', function(){
					self.hide();
				})
			}

			this.cfg.handleShow && this.on('show', this.cfg.handleShow);
			this.cfg.handleHide && this.on('hide', this.cfg.handleHide);
		},

		destructor: function(){
			this.mask.destroy();
		},

		show: function(){
			this.buildBox.show().addClass(this.cfg.class);
			this.mask.show();

			this.fire('show');

			return this;
		},

		hide: function(){

			var self = this;

			this.buildBox.removeClass(this.cfg.class).on('webkitTransitionEnd', function(){
				self.buildBox.hide();
				self.mask.hide();
				self.fire('hide');
			});
			return this;
		}

	})

	return LoadingSubmit;

})