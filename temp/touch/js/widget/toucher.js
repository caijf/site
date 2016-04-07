/**
 * swipe tap doubletap longtap twofingersTap twofingersDoubletap twofingersLongtap
 * 支持 AMD，CMD 规范
 * @author vjy
 */
 
(function(root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define('Toucher',[],factory); 
    } else {
        root.Toucher = root.T = factory();
    }
}(this, function() {
	
	var Touch = {
        cache : {},
        cacheId : "Touch" + (new Date()).getTime(),
        guid : 0,

        // constructor 
        Creater : function(ele, options) {
            var self = this;
            var cacheId = Touch.cacheId;
            var cache = Touch.cache;
            var gestures = "swipe tap doubletap longtap twofingersTap twofingersDoubletap twofingersLongtap";
				
			ele = Array.prototype.slice.call( ele );
			
            // 检测是否已经存在
            if(typeof ele[cacheId] !== "number") {
                ele[cacheId] = Touch.guid;
                Touch.guid++;
            }

            var elementId = ele[cacheId];

            if(!(elementId in cache)) Touch.cache[elementId] = {};

            var elementCache = Touch.cache[elementId];

            if(!("options" in elementCache)) elementCache.options = {};

            options = options || elementCache.options || {};

            if(elementCache.options !== options) {
                for(var prop in options) {
                    if(elementCache.options[prop]) {
                        if(elementCache.options[prop] !== options[prop]){
                            elementCache.options[prop] = options[prop];
                        }
                    } else {
                        elementCache.options[prop] = options[prop];
                    }
                }
            }

            if(!("eventSet" in elementCache) || !(elementCache.eventSet instanceof Touch.EventSet)) {
                elementCache.eventSet = new Touch.EventSet(ele);
            }

            if(!elementCache.touchMonitor) elementCache.touchMonitor = new Touch.TouchInit(ele);

            var events = elementCache.eventSet;
            var touches = elementCache.touchMonitor;

            this.id = ele[cacheId];
			
			// 绑定方法
            this.bind = function(evt, fn) {
                if(evt && typeof evt === "string" && typeof fn === "function") {
                    events.register(evt, fn);
                }
                return this;
            };

            // 为所有手势创建绑定方法
            gestures.split(" ").forEach(function(gesture) {
                this[gesture] = function(fn) {
                    return this.bind(gesture, fn);
                };
            }, self);
			
			
			// 开始 touchstart 事件
            this.start = function(fn) {
                return this.bind("start", fn);
            };
			
			// 进行中 touchmove 事件
            this.moving = function(fn) {
                return this.bind("moving", fn);
            };
			
			// 结束 touchend 事件
            this.end = function(fn) {
                return this.bind("end", fn);
            };
			
			//双指操作
            this.pinch = function(fns) {
                if(typeof fns !== "undefined") {
                    if(typeof fns === "function") {
                        self.pinchend(fns);
                    }
                    else if(typeof fns === "object") {
                        var method;
                        "narrow widen end".split(" ").forEach(function(eventExt) {
                            method = "pinch" + eventExt;
                            if(typeof fns[eventExt] === "function") {
                                self[method](fns[eventExt]);
                            }
                        });
                    }
                }
            };
			
			// api; 删除事件绑定
            this.remove = function() {
                touches.removeListen();
                events.clear();
                delete elementCache.eventSet;
                delete elementCache.touchMonitor;
            };
        },
		
        EventSet : function(ele) {
            var eventsTable = {};
            this.eventsTable = eventsTable;

            this.register = function(eventName, fn) {
                if(eventsTable[eventName] && eventsTable[eventName].push) {
                    if(!~eventsTable[eventName].indexOf(fn)) {
                        eventsTable[eventName].push(fn);
                    }
                } else {
                    eventsTable[eventName] = [fn];
                }
            };
			
			// clear events
            this.clear = function() {
                var events;
                for(events in eventsTable) {
                    delete eventsTable[events];
                }
            };

            // execute Funs
            this.execute = function(eventName) {
                if(typeof eventName === "undefined") return;

                if(eventsTable[eventName] && eventsTable[eventName].length) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    for(var i = 0; i < eventsTable[eventName].length; i++) {
                        if(typeof eventsTable[eventName][i] === "function") {
                            eventsTable[eventName][i].apply(ele, args);
                        }
                    }
                }
            };
        },
		
		// main code
        TouchInit : function(ele){
            var cacheId = Touch.cacheId;
            var elementId = ele[cacheId];
            var cache = Touch.cache;
            var elementCache = cache[elementId];
            var options = elementCache.options;
			var doubleTapTime = 200;
			
            options.scale          = options.scale                ||    {};
            options.tapTime        = options.tapTime              ||    25;
			options.longTapTime    = options.longTapTime          ||    1000;
            options.swipeDistance  = options.swipeDistance        ||    20;

            if(options.capture !== false) options.capture = true;
            if(typeof options.preventDefault !== "undefined" && options.preventDefault !== false) options.preventDefault = true;
            if(typeof options.preventDefault !== "undefined" && options.stopPropagation !== false) options.stopPropagation = true;

            var eventSet = elementCache.eventSet;
            var touches;
            var previousTapTime = 0;
			var stime = 0;
			var etime = 0;
			var longtapInit = null;
			
			
			// touch start
            var touchStart = function(evt) {
				longtapInit = false;
				stime = (new Date()).getTime();
                touches = new Touch.TouchProperty(evt);
                eventSet.execute("start", touches, evt);
				clearTimeout(window.longtap);
				
				// longtap
				
				if(touches.touch(0).total.time() <= options.tapTime) {
					window.longtap = setTimeout(function(){
						longtapInit = true;
						if(touches.numTouches() == 1) {
							eventSet.execute("longtap", touches);
						}
						else if (touches.numTouches() == 2) {
							eventSet.execute("twofingersLongtap", touches);
						};
					}, options.longTapTime)
				}

                if(options.preventDefault) evt.preventDefault();
                if(options.stopPropagation) evt.stopPropagation();
            };
			
			// touch move
            var touchMove = function(evt) {
                touches.update(evt);
                eventSet.execute("moving", touches, evt);

                if(options.preventDefault) evt.preventDefault();
                if(options.stopPropagation) evt.stopPropagation();
				
				// if the distance more than 0, clear longtap event;
				if(Math.abs(touches.touch(0).total.x()) > 0 && Math.abs(touches.touch(0).total.y()) > 0){
					clearTimeout(window.longtap);
				}
				
				if(touches.numTouches() == 2) {
                    // 双指缩小，目前andriod不支持
                    if(touches.delta.scale() < 0.0) {
                        eventSet.execute("pinchnarrow", touches);
                    }

                    // 双指放大，目前andriod不支持
                    else if(touches.delta.scale() > 0.0) {
                        eventSet.execute("pinchwiden", touches);
                    }
                }
            };
			
			// touch end
            var touchEnd = function(evt) {
                var swipeDirection;
				etime = (new Date()).getTime();
                eventSet.execute("end", touches, evt);


                if(options.preventDefault) evt.preventDefault();
                if(options.stopPropagation) evt.stopPropagation();
				
				clearTimeout(window.longtap);
				clearTimeout(window.timer);
				
				// fingers x 1
                if(touches.numTouches() == 1) {  
					
                    // tap
                    if(Math.abs(touches.touch(0).total.x()) <= options.swipeDistance && Math.abs(touches.touch(0).total.y()) <= options.swipeDistance && touches.touch(0).total.time() < options.tapTime && !longtapInit) {
						window.timer = setTimeout(function(){ 
							eventSet.execute("tap", touches, evt);
						}, doubleTapTime ); 
                    }

                    // doubletap
                    if(touches.touch(0).total.time() < options.tapTime) {
                        var now = (new Date()).getTime();
                        if(now - previousTapTime <= doubleTapTime && now - previousTapTime >=100) {
							clearTimeout(window.timer); 
                            eventSet.execute("doubletap", touches);
                        }
                        previousTapTime = now;
                    }

                    // swipe left/right
                    if(Math.abs(touches.touch(0).total.x()) >= options.swipeDistance) {
                        swipeDirection = touches.touch(0).total.x() < 0 ? "left" : "right";   
                        eventSet.execute("swipe", touches, swipeDirection);
                    }

                    // swipe up/down
                    if(Math.abs(touches.touch(0).total.y()) >= options.swipeDistance + 30) {
                        swipeDirection = touches.touch(0).total.y() < 0 ? "up" : "down";
                        eventSet.execute("swipe", touches, swipeDirection);
                    }

                } 

				// fingers x 2
				else if(touches.numTouches() == 2) {
                    // pinchend
                    if(touches.current.scale() !== 1.0) {
                        var pinchDirection = touches.current.scale() < 1.0 ? "narrowed" : "widened";
						eventSet.execute("pinchend", touches, pinchDirection);
                    }
					
					// two Fingers tap
					if(Math.abs(touches.touch(0).total.x()) <= options.swipeDistance && Math.abs(touches.touch(0).total.y()) <= options.swipeDistance && touches.touch(0).total.time() < options.tapTime && !longtapInit) {
						window.timer = setTimeout(function(){
							eventSet.execute("twofingersTap", touches, evt);
						}, doubleTapTime); 
                    }
					
					// two Fingers Double tap
                    if(touches.touch(0).total.time() < options.tapTime) {
                        var now = (new Date()).getTime();
                        if(now - previousTapTime <= doubleTapTime && now - previousTapTime >=100) {
							setTimeout(function(){clearTimeout(window.timer)},50)
                            eventSet.execute("twofingersDoubletap", touches);
                        }
                        previousTapTime = now;
                    }
                }
            };
			
			// remove listen
            var removeListen = function() {
				for(var i=0, len=ele.length-1; i<=len; i++){
					ele[i].removeEventListener("touchstart", touchStart, options.capture);
					ele[i].removeEventListener("touchmove", touchMove, options.capture);
					ele[i].removeEventListener("touchend", touchEnd, options.capture);
				}
            };
			
			// touch事件循环绑定
			for(var i=0, len=ele.length-1; i<=len; i++){
				ele[i].addEventListener("touchstart", touchStart, options.capture);
				ele[i].addEventListener("touchmove", touchMove, options.capture);
				ele[i].addEventListener("touchend", touchEnd, options.capture);
			};
			
			// return apis
            return {
                removeListen: removeListen
            };
        },

        TouchProperty : function(event) {
            var self = this;
            var numTouches = event.touches.length;
			var target = event.target || event.srcElement;
            var midpointX = 0;
            var midpointY = 0;
            var scale = event.scale;
            var prevScale = scale;
            var deltaScale = scale;

            for(var i = 0; i < numTouches; i++) {
                this["touch" + i] = new Touch.Touch(event.touches[i].pageX, event.touches[i].pageY);
            }
			
			function getTarget(){
				return target;
			};

            function getNumTouches() {
                return numTouches;
            };

            function getTouch(num) {
                return self["touch" + num];
            };

            function getMidPointX() {
                return midpointX;
            };
			
            function getMidPointY() {
                return midpointY;
            };
			
            function getScale() {
                return scale;
            };
			
            function getDeltaScale() {
                return deltaScale;
            };

            function updateTouches(event) {
                var mpX = 0;
                var mpY = 0;

                for(var i = 0; i < event.touches.length; i++) {
                    if(i < numTouches) {
                        self["touch" + i].update(event.touches[i].pageX, event.touches[i].pageY);
                        mpX += event.touches[i].pageX;
                        mpY += event.touches[i].pageY;
                    }
                }
				
                midpointX = mpX / numTouches;
                midpointY = mpY / numTouches;
				
				
                prevScale = scale;
                scale = event.scale;
                deltaScale = scale - prevScale;
            }

            return {
				target : getTarget(),
                numTouches: getNumTouches,
                touch: getTouch,
				pageX: getMidPointX,
                pageY: getMidPointY,
                current: {
                    scale: getScale,
					midX: getMidPointX,
					midY: getMidPointY
                },
                delta: {
                    scale: getDeltaScale
                },
                update: updateTouches
            };
        },

        Touch : function(_startX, _startY) {
            var startX = _startX,
                startY = _startY,
                startTime = now(),
                currentX = startX,
                currentY = startY,
                currentTime = startTime,
                totalX = 0,
                totalY = 0,
                totalTime = 0;

            // position getters
            function getTotalX() {
                return totalX;
            }
            function getTotalY() {
                return totalY;
            }

            // time Func
            function now() {
                return (new Date()).getTime();
            };
			
			function getCurrentTime() {
                return currentTime;
            };
			
			function getTotalTime() {
                return totalTime;
            };
			
			
			// 接口暴漏
            return {
                total: {
                    x: getTotalX,
                    y: getTotalY,
                    time: getTotalTime
                },
                update: function(_x, _y) {
                    prevX = currentX;
                    prevY = currentY;
                    currentX = _x;
                    currentY = _y;
                    deltaX = currentX - prevX;
                    deltaY = currentY - prevY;
                    totalX = currentX - startX;
                    totalY = currentY - startY;
                }
            };
        }
    };
	
    return function(selector, options) {
        return new Touch.Creater(selector, options);
    };
}));

