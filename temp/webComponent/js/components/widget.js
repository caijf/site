define(['jquery'], function($){

	function Widget(){
		// 存放dom
		this.buildBox = null;

		// 自定义事件集合
		this.handles = {};
	}

	Widget.prototype = {
		constructor: Widget,

		// 添加事件
		on: function(type, handle){
			if(typeof this.handles[type] === 'undefined'){
				this.handles[type] = [];
			}

			this.handles[type].push(handle);

			return this;
		},

		// 触发事件
		fire: function(type, data){
			if(this.handles[type] instanceof Array){
				var handles = this.handles[type];
				for(var i = 0, len = handles.length; i < len; i++){
					handles[i](data);
				}
			}

			return this;
		},

		// 添加DOM
		renderUI: function(){},

		// 初始化属性（样式、data数据...）
		syncUI: function(){},

		// 绑定dom 事件
		bindUI: function(){},

		// 渲染到dom
		render: function(container){
			this.renderUI();
			this.syncUI();
			this.bindUI();
			$(container || document.body).append(this.buildBox);
		},

		// 销毁前处理函数
		destructor: function(){},

		// 销毁组件
		destroy: function(){
			this.destructor();
			this.buildBox.off().remove();
		}
	}

	return Widget;
})