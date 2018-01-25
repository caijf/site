/**
 * @author cjf
 * @date 2016-10-16
 * @description 快速绑定元素的touch相关事件，应用场景，左滑删除、下拉刷新、拖拽...
 *
 * @extends：
 *         元素绑定touch事件，如果元素transform偏移出原本的范围，导致事件失效；
 *         解决方案：可以使用left/top，如果非要用transform的话事件绑定在父级元素
 * @example
 *     var touchList = new Touch();
 *     touchList.on('tap', function(e){});
 */

(function(root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define('Touch',[],factory); 
    } else {
        root.Touch = root.T = factory();
    }
}(this, function() {

    function Touch(selector, opts){

    }

    Touch.prototype = {
        constructor: Touch,

        init: function(){
            this._defaultProperties();
            this._setOptions();
        },
        _setOptions: function(){},
        _defaultProperties: function(){},

        // 设置参数
        config: function(){},

        on: function(){},
        off: function(){},
        destroy: function(){},

        _updata
    }

})