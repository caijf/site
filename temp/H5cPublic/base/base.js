/*
* base functions
*/
;(function( win ){

	var base = {
		
		// CheckNamespace
		// ============================
		__CheckNamespace : function(){
			
			var arg = arguments[0] || {}, fac = {}.toString.call(arguments[1]) == '[object Object]' ? arguments[1] : {}
			
			if(typeof arg.cPublic === "undefined"){
				arg.cPublic = {};
			}
			
			for(var prop in fac){
				if(typeof arg.cPublic[prop] === "undefined"){
					arg.cPublic[prop] = fac[prop];
				}
			}
		}
	}
	
	// AMD 
	// ============================
	if (typeof define === "function" && define.amd) {
        define("base", [], function() {
            return base;
        });
    };
	
	// API For OutSide
	// ============================
	if(typeof win.cPublic === 'undefined') win.cPublic = {};
	
	win.cPublic.base = base;
	
	
})( window )