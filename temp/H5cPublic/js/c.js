/*
* Creat By Ctrip Biz, H5 Group
* Date : 2015.09/15
**/

;(function (root, factory) {
	// AMD 兼容;
	
    if (typeof define === 'function' && define.amd){
        define('c',[],factory);
    }
	
	cPublic.base.__CheckNamespace( root, factory() )

}(this, function(){
	
	// Start
    // ==============================
	
	function net(){
		
	}

	net.prototype.run = function(){
		$('body').append('<div>net</div>');
	}
	
	// Return functions to outside;
    // ==============================
	return {
		net: net
	}
}));


