define(['class', 'base'],function ($class, base){

    var _b = new $class();
    var Bar = new $class();
	var _shell;
	var _config = [];
	
    var DEFAULT_BTN_LIST = ["order", "favorite", "message", "home"],
        CLONE_BTN_LIST = DEFAULT_BTN_LIST.slice(0);
    var m = {
        "share" : {
            "tagname" : "more_share",
            "value" : "分享"
        },
        "order" : {
            "tagname" : "more_my_order",
            "value" : "我的订单"
        },
        "favorite" : {
            "tagname" : "more_my_favorite",
            "value" : "我的收藏"
        },
        "message" : {
            "tagname" : "more_message_center",
            "value" : "消息中心"
        },
        "home" : {
            "tagname" : "more_home",
            "value" : "携程首页"
        },
        "link" : {
            "tagname" : "more_phone",
            "value" : "联系携程"
        }
    };
	


    var mf = {
        "more_share_callback" : function ( config ){
			config = _config;
			_shell.Fn('call_system_share').run(config[0],config[1],config[2],config[3]);
        },
        "more_my_order_callback" : function (){
			Lizard.jump("/webapp/myctrip/orders/allorders");
        }, 
        "more_my_favorite_callback" : function (){
			Lizard.jump("/webapp/favorite");
        },
        "more_message_center_callback" : function (){
            Lizard.jump("/webapp/message/messagecenter");
        },
        "more_phone_callback" : function (){
			_shell.Fn('call_phone').run('10106666');
        }
    };

    _b.include({
        init : function (shell){
            this.shell = shell;
            return this.type();
        },
        type : function (){
            var self = this;
            this.nav = {
                //@param nav_bar_config_json <String> : 顶部条配置json串
                refresh : function (nav_bar_config_json){
                    return new self.shell.Fn("refresh_nav_bar").run(JSON.stringify(nav_bar_config_json));
                },
                //@param isHidden <Boolean> :
                //设置顶部导航栏隐藏／显示，使用该函数的隐藏顶部栏之后，必须保证页面有离开H5页面的功能，否则用户无法离开,必须要kill掉app。
                hidden : function (isHidden){
                    return new self.shell.Fn("set_navbar_hidden").run(JSON.stringify(isHidden));
                }
            };
        }
    });

    var rules = base.keys(m);

    //@param array <Array> : 需要被排序的数组
    var sortFunctionList = function ( array ){
        var result = [];
        array.forEach(function (el){
            var n = rules.indexOf(el);
            if( n > -1 ) result[n] = el;
        });
        return result;
    };

    Bar.include({
        init : function (shell){
            this.shell = shell;
			_shell = shell;
            this.nav = new _b(shell).nav;
        },
        execInclude : function ( arr ){
            if( Array.isArray( arr ) && arr.length > 0 ){
                var result = [];
                arr.map(function ( el ){
                    var $el = el.charAt(0) == "!" ? el.slice(1) : el,
                        $where = CLONE_BTN_LIST.indexOf($el);

                    //当字符串是这样的: "!order", 则判判断bu不需要<我的订单>这个按钮
                    //但是回到首页不能被去除
                    if(el.charAt(0) == "!" && $where > -1 && $el !== "home" ){
                        CLONE_BTN_LIST.splice($where, 1);
                    }
                    //如果是有效的值，且不为默认的btn list ,则加入result
                    else if(rules.indexOf($el) > -1 && DEFAULT_BTN_LIST.indexOf($el) < 0 ){
                        result.push($el);
                    }
                });
                return result.concat(CLONE_BTN_LIST);
            } else {
                return DEFAULT_BTN_LIST;
            }
        },
        show : function ( options ){
            var self = this;
            var dc = {  //default config
                position : "right",
                btnTitle : "...",
                include : [],
                extend : [],
                callback : function (){
                }
            };
			

            $.extend(dc, options);
			
            //剔除bu不需要的按钮
            var list = this.execInclude( dc.include );
            //将按钮排序
            var p = sortFunctionList( list );
            //构建需要渲染的按钮列表
            var result = {};
            result[dc.position] = [{
                "tagname" : "more",
                "value" : dc.btnTitle
            }]; 
            result.moreMenus = [];
            //排序后，塞入结果中,并从定义好的m中取出配置
            p.forEach(function (el){
                if( el ) result.moreMenus.push(m[el]);
            });
            //将bu自定义的按钮加进来
            if( dc.extend && dc.extend.length > 0 ){
                result.moreMenus = result.moreMenus.concat(dc.extend);
            }

			_config = options.shareConfig && Array.isArray(options.shareConfig) ? options.shareConfig : [""," "," "," "];
			
            result.moreMenus.map(function (el, i){
				self.shell.off(el.tagname).on(el.tagname, (el.callback && typeof el.callback == "function") ? el.callback : mf[el.tagname + "_callback"]);	
            });

            this.nav.refresh(result);
        },
        hide : function (isHidden){    
            this.nav.hidden(isHidden);
        }
    });

    return Bar;
});