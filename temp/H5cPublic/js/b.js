/*
* Creat By Ctrip Biz, H5 Group
* Date : 2015.09/15
**/

(function (root, factory) {
	// AMD 兼容;
    if (typeof define === 'function' && define.amd){
        define('b',[],factory);
    }

    if(typeof $.__CheckNamespace !== "undefined" && typeof $.__CheckNamespace === "function"){
    	
    }


	// The Public Of Name Space;

    cPublic.base.__CheckNamespace( root, factory() )
	
}(this, function(){
	
	// Start
    // ==============================
	
	
	function Pull(){
		
	}

	Pull.prototype.run = function(){
		$('body').append('<div>pull</div>');
	}
	
	
	// Return functions to outside;
    // ==============================
	return {
		pull: Pull
	}
}));

