/**
 * @author cjf
 * @date 2016-01-27
 * @description 快速绑定元素的touch相关事件，应用场景，左滑删除、下拉刷新、拖拽...
 *
 * @extends：
 *         元素绑定touch事件，如果元素transform偏移出原本的范围，导致事件失效；
 *         解决方案：可以使用left/top，如果非要用transform的话事件绑定在父级元素
 */

define([], function(){


    // 取点计数，判断方向用
    var count = 0;

    /**
     * 点击
     * @param {[type]} el      [description]
     * @param {[type]} options [description]
     * @example
     *     var favoriteBoxTouch = touch('#favorite');
     *     favoriteBoxTouch.on('touchStart', function(){
     *         console.log(favoriteBoxTouch);
     *     })
     */
    function Touch(el, options){

        var self = this;

        self.wrapper = typeof el == 'string' ? document.querySelector(el) : el;

        // default
        self.pageX = 0; // 坐标X轴
        self.pageY = 0; // 坐标Y轴
        self.startX = 0; // 开始触点X
        self.startY = 0; // 开始触点Y
        self.distX = 0; // 偏移值X
        self.distY = 0; // 偏移值Y
        self.absDistX = 0; // 偏移绝对值X
        self.absDistY = 0; // 偏移绝对值Y
        self.direction = ''; // swipe方向，touchend的时候判断
        self.directionLocked = ''; // 移动锁定方向，h为水平，v为垂直
        self._events = {};
        self.event = null;

        // init
        self._init();
    }

    Touch.prototype = {

        _init: function(){
            this._initEvents();
        },

        destory: function(){

            var self = this;

            self._initEvents(true);

            self._execEvent('destory');
        },

        _start: function(e){

            var self = this,
                point = e.touches ? e.touches[0] : e;

            self.pageX = point.pageX;
            self.pageY = point.pageY;
            self.startX = point.pageX;
            self.startY = point.pageY;
            self.distX = 0;
            self.distY = 0;
            self.absDistX = 0;
            self.absDistY = 0;
            self.direction = '';
            self.directionLocked = '';
            self.event = e;
            count = 0;

            self._execEvent('touchStart');
        },
        _move: function(e){

            var self = this,
                point = e.touches ? e.touches[0] : e;

            self.pageX = point.pageX;
            self.pageY = point.pageY;
            self.distX = point.pageX - self.startX;
            self.distY = point.pageY - self.startY;
            self.absDistX = Math.abs(self.distX);
            self.absDistY = Math.abs(self.distY);

            if(count === 0){
                count++;

               self.directionLocked = self.absDistX >= self.absDistY ? 'h' : 'v';

            }

            self._execEvent('touchMove');
        },
        _end: function(e){

            var self = this,
                point = e.touches ? e.touches[0] : e;

            if(self.absDistX >= self.absDistY){
                // swipe水平方向
                self.direction = self.distX > 0 ? 'right' : 'left';
            }else{
                // swipe垂直方向
                self.direction = self.distY > 0 ? 'down' : 'up';
            }

            this._execEvent('touchEnd');
        },

        on: function (type, fn) {

            var self = this;

            if ( !self._events[type] ) {
                self._events[type] = [];
            }

            self._events[type].push(fn);
            return self;
        },

        off: function (type, fn) {

            var self = this;

            if ( !self._events[type] ) {
                return;
            }

            var index = self._events[type].indexOf(fn);

            if ( index > -1 ) {
                self._events[type].splice(index, 1);
            }
            return self;
        },

        _execEvent: function (type) {

            var self = this;

            if ( !self._events[type] ) {
                return;
            }

            var i = 0,
                l = self._events[type].length;

            if ( !l ) {
                return;
            }

            for ( ; i < l; i++ ) {
                self._events[type][i].apply(self, [].slice.call(arguments, 1));
            }
        },

        addEvent: function (el, type, fn, capture) {
            el.addEventListener(type, fn, !!capture);
        },

        removeEvent: function (el, type, fn, capture) {
            el.removeEventListener(type, fn, !!capture);
        },

        _initEvents: function (remove) {
            var self = this,
                eventType = remove ? this.removeEvent : this.addEvent;

            eventType(this.wrapper, 'touchstart', this);
            eventType(this.wrapper, 'touchmove', this);
            eventType(this.wrapper, 'touchend', this);
            eventType(this.wrapper, 'touchcancel', this);
        },

        handleEvent: function (e) {
            switch ( e.type ) {
                case 'touchstart':
                    this._start(e);
                    break;
                case 'touchmove':
                    this._move(e);
                    break;
                case 'touchend':
                case 'touchcancel':
                    this._end(e);
                    break;
            }
        }
    }

    return function(selector, options){
        return new Touch(selector, options);
    };

})