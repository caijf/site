function extend( op1, op2 ) {
	for( prop in op2 ) {
		op1[prop] = op2[prop];
	}

	return op1;
}

function each( array, callback ) {
	for( var i=0,l=array.length; i<l; i++ ) {
		callback.call( array[i] );
	}
}

function dom( args ) {
	return document.querySelector(args);
}

function style( args ) {
	var result = window.getComputedStyle ? window.getComputedStyle( this, null )[ args ] : this.currentStyle[ args ];
	return parseInt( result );
}

function clone() {
	var el = this.cloneNode();
	el.innerHTML = this.innerHTML;
	return el;
}

/* = slider start = */
function Slider( opt ) {
	return new slider.prototype.init( opt );
}

function slider( opt ) {
	
}

slider.prototype = {

	handleEvent: function(event) {
		switch(event.type) {
			case "touchstart": this.start(event); break;
			case "touchmove": this.move(event); break;
			case "touchend": this.offloadFn(this.end(event)); break;
		}
	},
	start: function( event ) {
		event.preventDefault(); // 阻止滚屏

		pos_s = {
			pageX: event.touches[0].pageX,
			pageY: event.touches[0].pageY
		}

		oldVal = this.direction == "v" ? this.el.style.top.match( /\-?\d+/ )[0] : this.el.style.left.match( /\-?\d+/ )[0];
		this.el.style.transition = "none";
		
		/* = 回到原点 S = */
		if( this.infinite ) {
			oldVal = oldVal <= -this.wrapVal*(this.length - 1) ? 0 : oldVal;
			this.eval( this.direction, oldVal );
		}
		/* = 回到原点 E = */

		this.el.addEventListener( "touchmove", this, false );
		this.el.addEventListener( "touchend", this, false );
	},
	move: function( event ) {
		event.preventDefault(); // 阻止滚屏

		pos_e = {
			y: this.direction == "v" ? (event.touches[0].pageY - pos_s.pageY) : (event.touches[0].pageX - pos_s.pageX)
		}

		newVal = pos_e.y + Number( oldVal );
		this.eval( this.direction, newVal );
	},
	end: function(event) {
		event.preventDefault();

		var dir, del, percent = this.wrapVal*this.percent;
		dir = pos_e.y > 0 ? "down" : "up";

		this.goTrans( dir, pos_e.y, percent ); // 参数：方向、滑动距离、滑动百分比
	},
	
	goTrans: function( dir, y, percent ) {
		this.el.style.transition = "top .2s ease,left .2s ease";

		if( Math.abs(y) < percent ) {
			newVal += -y;
		}else {
			newVal = newVal - y + ( dir == "down" ? this.wrapVal : (dir == "up" ? -this.wrapVal : 0) );
		}

		newVal = newVal >= 0 ? 0 : (newVal <= -this.wrapVal*(this.length-1) ? -this.wrapVal*(this.length-1) : newVal);
		this.eval( this.direction, newVal );
	},
	eval: function( dir, val ) {
		if( dir == "v" ) this.el.style.top = val + "px";
		else this.el.style.left = val + "px";
	},

	init: function( option ) {
		extend( this, option );

		if( this.infinite ) {
			this.el.appendChild( clone.call( this.el.children[0] ) );
		}
		
		this.length = this.el.children.length;
		this.wrapVal = this.direction == "v" ? style.call( this.el.parentNode, "height" ) : style.call( this.el.parentNode, "width" );
		this.el.style.cssText = "position:relative;top:0px;left:0px;";
		this.el.addEventListener( "touchstart", this, false );
	},
	offloadFn: function( fn ) {
		setTimeout(fn || this.noop, 0);
	},
	noop: function() {}

}

slider.prototype.init.prototype = slider.prototype;

// slider();

/* 可自定义参数：

	slider( {
		el: 列表外层DOM,
		direction: 水平或垂直滑动,
		infinite: 是否循环滑动,
		percent: 最小滑动百分比
	} );

*/