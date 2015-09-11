/* H5cPublic 1.0.0 2015-09-11 */
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
define([ 'class', "base", "model", template('collect') ],function ( $class, base, Model, html ){

    var Collect = new $class();

    Collect.include({
        init : function (){
            var options = arguments[0];
            if( !options || typeof options !== "object" ) options = {};
            this.query = Model;
        },
        save : function ( options, callback ){
            var self = this;
            if ( !options ||  typeof options !== "object" || typeof callback !== "function"
                || !base.isArray(options.FavoriteList) ){
                return callback({ errorMsg : "FavoriteList参数错误" });
            }
            var FavoriteList = options.FavoriteList,
                channel = options.Channel || null,
                version = options.Version || null;

                this.query.addProduct( FavoriteList, channel, version, function ( error,data ){
                if( error ){
                    base.prompt("网络错误，收藏失败！");
                    return callback ( error );
                }else{
                    //添加ubt代码
                    if (typeof window['__bfi'] == 'undefined') window['__bfi'] = [];
                    window['__bfi'].push([
                        '_tracklog',
                        'COLLECT_FROM',
                        'from='+base.isInApp()?'Hybrid':'H5'
                    ]);

                    base.prompt("收藏成功！");

                    //收藏成功
                    return callback( null,{
                        "FavoriteIDs" : data.FavoriteIdList
                    });
                }
            });
        },
        //是否已经收藏
        isMyFavorites : function ( options, callback ){
            if ( !options ||  typeof options !== "object" || typeof callback !== "function" || !base.isArray(options.QueryList) ){
                return callback({ errorMsg : "QueryList参数错误" });
            }
            var QueryList = options.QueryList;
            var QueryProductList = [];
            var FavoriteIDList = [];

            //将需要查询的product放入数组中
            QueryList.forEach(function ( el ){
                QueryProductList.push( el.ProductID );
                FavoriteIDList.push(null);
            });

            this.query.isMyFavorites( QueryList, function ( error, data ){
                if( error ){
                    return callback( error );
                }
                var resultList = (data && data.ResultList) || [];
                var ok;
                //遍历结果数组，然后在请求数组中查询，如果查到了，就把查到的项变为true
                resultList.forEach(function ( el ){
                    //服务返回的 el.ProductID是个string
                    var n = QueryProductList.indexOf(parseInt(el.ProductID,10));
                    if( n > -1 ){
                        QueryProductList[n] = true;
                        FavoriteIDList[n] = el.FavoriteID;
                        ok = true;
                    }
                });
                //将没有查到的项变为false
                QueryProductList.forEach(function (el,i){
                    if(!base.isBool(el)){
                        QueryProductList[i] = false;
                        ok = false;
                    }
                });
                return callback( null, {
                    result : QueryProductList,
                    FavoriteIDs : FavoriteIDList,
                    success : ok
                });
            });
        },
        cancel : function ( FavoriteIDs, callback ){
            var params = Array.isArray( FavoriteIDs ) ? FavoriteIDs : [ FavoriteIDs ];
            this.query.deleteProduct( params, function ( error, data ){
                if( error ){
                    base.prompt("取消收藏失败");
                    return callback ( error );
                }
                base.prompt("取消收藏成功");
                return callback( null, data );
            });
        }
    });

    return Collect;
});
define(["base", template('menu_app'), template('menu_online'), template('popUp')], function (base, appTpl, onlineTpl, popUpTpl ){

	var menu = function (){
		var obj = arguments[0];
		var self = menu;
		var isPadApp = navigator.userAgent.match(/Ctrip_Pad_App/i);
		var forTest = location.href.indexOf("for=test") > 0;
		window.currentBuName = '';	

		self.isInApp = base.isInApp(); 
		self.isShowing = false;
		self.Base64 = base.base64;
		self.isLogin = base.isLogin;
		self.loginAction = base.loginAction;
		//default sets
		self.sets = {
			show: false,
			bresize: false,
			buName: 'home'
		}; 

		if (obj && obj.show) {
			obj.show = (self.isInApp &&  !isPadApp)? false : obj.show;
		}	

		self.sets = obj = $.extend(self.sets, obj || {});
		var jmenuWrapper = $("<div id='ctripmenu-wrap' class='sidebar-pad'></div>"),
			cssApp, cssOnline;

		if(!self.isInApp) {
			//非app下，去除社区和设置
			jmenuWrapper.html(appTpl).find(".member,.more-setting").remove();
		} else {
			jmenuWrapper.html(appTpl);
		}

		appTpl = jmenuWrapper.html();

		cssOnline = '.aside_fixed{position:fixed;top:-10px;}.aside{float:left;width:158px;_margin-right:13px;border:1px solid #ececec;border-top:1px solid #2577e3;border-bottom:1px solid #2577e3;}.sidenav{background-color:#f7f7f7;border-bottom:1px solid #ececec;font-family:microsoft yahei;color:#333}.sidenav a{position:relative;z-index:1;display:block;line-height:1;padding-left:4px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;color:#333;_zoom:1}.sidenav a:hover{color:#06c;text-decoration:none}.sidenav dt a{padding-left:5px;font-size:14px}.sidenav dt a span{display:block;padding:14px 10px 14px 14px}.sidenav .ico_arr{position:absolute;border:5px solid #fcfcfc;border-top-color:#afafaf;border-bottom:0 none;font-size:0;line-height:0;overflow:hidden}.sidenav dt .ico_arr{top:18px;right:10px}.sidenav dt a:hover .ico_arr{border-top-color:#06c}.sidenav dd{display:none;position:relative;padding-bottom:5px}.sidenav dd a{padding-left:5px;border-top:1px solid #f7f7f7;border-bottom:1px solid #f7f7f7}.sidenav dd a span{display:block;padding:8px 10px 8px 24px}.sidenav dd a.more_order{position:relative;display:inline-block;margin:5px 0 10px 20px;padding:5px 28px 5px 14px;background-color:#e5f0ff;border-radius:20px}.sidenav dd a.more_order:hover{background-color:#2577e3;color:#fff}.sidenav dd a.more_order .ico_arr{top:8px;right:12px;border-color:#e5f0ff;border-top-color:#afafaf}.sidenav dd a.more_order:hover .ico_arr{border-color:#2577e3;border-top-color:#fff}.sidenav dd a.up_order .ico_arr{border:5px solid #e5f0ff;border-bottom-color:#afafaf;border-top:0 none}.sidenav dd a.up_order:hover .ico_arr{border-color:#2577e3;border-bottom-color:#fff}.ico_new2{position:absolute;z-index:3;width:24px;height:11px;top:16px;margin-left:5px;background-position:-162px -9px}.sidenav dd .ico_new2{top:9px}.hide_order{display:none}.sidenav .selected{width:auto;border-left-color:#2577e3;border-right-color:#fff;background-color:#06c;color:#06c}.sidenav dd .selected{border-color:#ececec #fff #ececec #ececec}.sidenav .selected span{background-color:#fff}.sidenav_c dt .ico_arr{border:5px solid #fcfcfc;border-bottom-color:#afafaf;border-top:0 none}.sidenav_c dt a:hover .ico_arr{border-bottom-color:#06c}.sidenav_c dd{display:block}.main{margin-left:159px}#main{height:auto}';
		
		cssApp = '.hide{display:none}.ani-smooth-in{display:block;-webkit-animation: smooth-in .3s .1s forwards}.ani-smooth-out{-webkit-animation: smooth-out .3s .1s forwards} .ani-smooth-mask-in{display:block;-webkit-animation: smooth-mask-in .3s .1s forwards}.ani-smooth-mask-out{-webkit-animation: smooth-mask-out .3s .1s forwards} @-webkit-keyframes smooth-mask-in{0%{opacity:0.2} 100%{opacity:1}} @-webkit-keyframes smooth-mask-out{0%{opacity:1} 100%{opacity:0;display:none;}} @-webkit-keyframes smooth-in{0%{margin-top: -300px;opacity:0.2} 100%{margin-top: -100px;opacity:1}} @-webkit-keyframes smooth-out{0%{margin-top: -100px;opacity:1} 100%{margin-top: -300px;opacity:0;display:none;}}.ctripmenu-pad .cui-warning-mask,.ctripmenu-pad .cui-pageview{left:150px!important;right:0;width:auto}.sidebar-pad{position:fixed;top:0;left:0;bottom:0;z-index:101;width:149px;font-size:16px;border-right:1px solid #AEAEAE;background-color:#EFEFEF;overflow-y: auto;}.sidebar-pad li{position:relative;height:60px;margin-top:1px;padding:0 10px;line-height:60px}.sidebar-pad li:first-child{margin-top:0}.sidebar-pad .current{color:#009FF3;background-color:#FFF}.sidebar-pad .about{height:45px;padding-top:10px;line-height:1.5}.sidebar-pad .about span{display:block;color:#999;font-size:12px}.sidebar-pad li div{height:100%;padding-left:35px;white-space:nowrap;overflow:hidden;border-bottom:1px solid #CCC}.sidebar-pad li.multi-list span{display:block;font-size:12px;color:#999}.sidebar-pad li:before{content:"";position:absolute;top:50%;left:13px;width:25px;height:25px;background-image:url(https://pic.c-ctrip.com/h5/rwd_myctrip/un_sidebar_20150522@2x.png);background-repeat:no-repeat;background-size:50px 275px;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%)}.sidebar-pad .home:before{background-position:0 0}.sidebar-pad .home.current:before{background-position:-25px 0}.sidebar-pad .order:before{background-position:0 -25px}.sidebar-pad .order.current:before{background-position:-25px -25px}.sidebar-pad .wallet:before{background-position:0 -50px}.sidebar-pad .wallet.current:before{background-position:-25px -50px}.sidebar-pad .coupon:before{background-position:0 -75px}.sidebar-pad .coupon.current:before{background-position:-25px -75px}.sidebar-pad .point:before{background-position:0 -100px}.sidebar-pad .point.current:before{background-position:-25px 0}.sidebar-pad .favorite:before{background-position:0 -125px}.sidebar-pad .favorite.current:before{background-position:-25px -125px}.sidebar-pad .trip:before{background-position:0 -150px}.sidebar-pad .trip.current:before{background-position:-25px -150px}.sidebar-pad .member:before{background-position:0 -175px}.sidebar-pad .member.current:before{background-position:-25px -175px}.sidebar-pad .setting:before{background-position:0 -200px}.sidebar-pad .setting.current:before{background-position:-25px -200px}.sidebar-pad .about:before{background-position:0 -225px}.sidebar-pad .about.current:before{background-position:-25px -225px}.sidebar-pad .commonInfo:before{background-position:0 -250px}.sidebar-pad .commonInfo.current:before{background-position:-25px -250px}  #main{padding-left:150px;}@media screen and (max-width:2023px) and (min-width:479px){#main{padding-left:150px}#ctripmenu-wrap{width:149px;' + (self.isInApp? 'top:0;' : 'top:44px;') +'}}@media screen and (max-width:479px){#ctripmenu-wrap{display:none;}#main{padding-left:0}#headerview header{left:0}}';

		self.tpl = forTest ? onlineTpl : appTpl;
		self.cssText = forTest ? cssOnline : cssApp;

		self.getUri=function(bdetail){
			if(self.isInApp){
				return location.host;
			}else{
				var proto=location.protocol+'//';
				var host=location.host||'';
				var isdomain=/\w+\..*.com$/.test(host);
				var first = isdomain?host.split('.')[0]:'';
				var second='';
				var url=proto+first;
				if (host.match(/\.fat\d*\.qa\.nt\.ctripcorp\.com|^210\.13\.100\.191/i)) {
					second = isdomain?'.fat19.qa.nt.ctripcorp.com':'m.fat19.qa.nt.ctripcorp.com';
				}else if(host.match(/\.fws\.qa\.nt\.ctripcorp\.com/i)){
					second = '.fat19.qa.nt.ctripcorp.com';
				}
				else if (host.match(/\.uat\.qa\.nt\.ctripcorp\.com/i)) {
					second = '.uat.qa.nt.ctripcorp.com';
				}
				else if (host.match(/^10\.8\.2\.111/i) || host.match(/^10\.8\.5\.10/i)) {
					second = '10.8.5.10';
				}
				else if (host.match(/^(localhost|172\.16|127\.0)/i)) {
					second = host;
				}else {
					second = '.ctrip.com';
				}
				url+=second;
				return bdetail?{url:url,proto:proto,host:host,isdomain:isdomain,first:first,second:second}:url;
			}
		};
		self.onlineMenuJump = function (e) {
			e.preventDefault();
			var $el = $(e.currentTarget),
				$sideNav = $(".sidenav"),
				currentUrl = location.href,
				url , tag;			

			url = $el.attr("href");

			if (currentUrl.indexOf("fat") > 0) {
				tag = ($el.hasClass("navhome") || $el.hasClass("allorders")) ? "fat19" : "fat49"; 	
				url = url.replace(/ctrip/, tag + ".qa.nt.ctripcorp");
			} else if(currentUrl.indexOf("uat") > 0) {
				url = url.replace(/ctrip/, "uat.qa.nt.ctripcorp");
			}			

			if ($el.find(".ico_arr").length > 0) {
				if ($el.parents(".sidenav").hasClass("sidenav_c")) {
					$el.parents(".sidenav").removeClass("sidenav_c");
				}else {
					$sideNav.removeClass("sidenav_c");
					$el.parents(".sidenav").addClass("sidenav_c");
				}
			} else {				
				!$el.hasClass("selected") && (window.location.href = url);
			}
		};
		self.menuLinkJump = function(e) {
			var jli = $(e.currentTarget);
			var uri=self.getUri(true);
			var url =uri.isdomain?'http://m'+uri.second:'http://'+uri.second;
			url+=jli.data("href");
			
			if (self.isInApp && !jli.hasClass("current")) {
				var urlApp = jli.data("app") || jli.data("href");

				if (jli.hasClass("trip")) {	
					CtripUtil.app_open_url(urlApp, 2, "一生的旅行");
				} else {
					CtripUtil.app_open_url(urlApp, 4);
				}				
			} else {
				!jli.hasClass("current") && (window.location.href = url);
			}
		};

		//钱包跳转;
		self.walletLinkJump = function(e) {
			var hash = '#index';
			var uri=self.getUri(true);
			var url=uri.isdomain?'https://secure'+uri.second.replace('.fat19.','.fws.'):'https://'+uri.second;
			var url2=uri.isdomain?'http://m'+uri.second:'http://'+uri.second;
			var jumpUrl = url+'/webapp/wallet/index.html';
			var fromUrl = url2+'/webapp/myctrip/index.html';
			var tokenArr = {
				from: fromUrl,
				eback: fromUrl
			};
			jumpUrl = jumpUrl + hash + '?token=' + encodeURIComponent(self.Base64(JSON.stringify(tokenArr)));
			
			if (self.isInApp) {
				CtripUtil.app_open_url("wallet/index.html#index", 4);
			} else {
				window.location.href = jumpUrl;
			}
		};

		//优惠券跳转;
		self.couponLinkJump = function() {
			var uri=self.getUri(true);
			var url=uri.isdomain?'https://smarket'+uri.second.replace('.fat19.','.fat21.'):'https://'+uri.second;
			url+='/webapp/promocode/#index';
			var userInfo = JSON.parse(localStorage.getItem('USERINFO'));

			if (self.isInApp) {
				CtripUtil.app_open_url("promocode/index.html#index", 4);
			}else if (userInfo && userInfo.data && userInfo.data.Auth) {
				var tokenJson = {
					auth: userInfo.data.Auth
				};
				window.location.href = url + (url.indexOf("?") > 0 ? "&" : "?") + "token=" + encodeURIComponent(self.Base64(JSON.stringify(tokenJson)));
			}
		};

		self.onCommonInfoClick = function(e) {
            //Hybrid 常旅去新的native地址
            if (self.isInApp) {
                var _url = $(e.currentTarget).data('app');
                CtripUtil.app_open_url(_url, 1);
            } else {
                //var _mask = popUpTpl;

                $('#ctripmenu-wrap ul').find("li").removeClass("current");
                $("#commonInfo").addClass("current");

                $('body').append($(popUpTpl));
                // 隐藏滚动条
                $(document.body).css({
                    "overflow-x": "hidden",
                    "overflow-y": "hidden"
                });
            }
		};

		self.onInfoListJump = function(e) {
			var $el = $(e.currentTarget);
			var _url = self.isInApp ? $el.data("app") : $el.data("href");

			if (!self.isInApp) {
				window.location.href = _url;
            } else {
				if (_url.indexOf("wireless") > 0) {
					CtripUtil.app_open_url(_url, 1);
				} else {
					CtripUtil.app_open_url(_url, 4);
				}

				setTimeout(function() {
					$(".info_list_wrap").remove();
					$(".info_cui_mask").remove();
					$('#ctripmenu-wrap ul').find("li").removeClass("current");
					$(currentBuName).addClass("current");
				}, 200);
			}
		}; 
		self.infoCuiMask = function(e) {
			var $el = $(e.currentTarget);

			$('#ctripmenu-wrap ul').find("li").removeClass("current");
			$(currentBuName).addClass("current");

			if ($el.css("display") == "block"){
				$(".info_list_wrap").removeClass("ani-smooth-in").addClass("ani-smooth-out");
				$(".info_cui_mask").hide();
			}
            // 展示滚动条
            $(document.body).css({
                "overflow-x": "auto",
                "overflow-y": "auto"
            });

            setTimeout(function(){
				$(".info_list_wrap").remove();
				$(".info_cui_mask").remove();
			}, 500);
		};

		//online 滚动时吸附顶部;
		self.windowScroll = function() {
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			if (scrollTop > 110) {
				$(".aside").addClass("aside_fixed");
			} else {
				$(".aside").removeClass("aside_fixed");
			}
		};

		self.init = function(obj) {
			if (!obj) {
				console.log('method is not supply param obj.');
				return;
			}
			//ipad端或宽屏展示;						
			var isShow = /iPad/.test(navigator.userAgent) || $(window).width() > 767 || isPadApp;
			var cls = '.' + obj.buName, jwrap = $('body').find("#ctripmenu-wrap"), jul = jwrap.find('ul');
			
			if (obj.show && self.isLogin()) { //只有登录时才展示菜单;

				if (isShow) {
					
					if (!$("#ctripmenu-style").length) {
						
						//首页和收藏没有header，重置top值
						if (obj.buName == "home" || obj.buName == "favorite") {						
							self.cssText = self.cssText + "#ctripmenu-wrap{top: 0;}";
						}
						$('<style id="ctripmenu-style">').html(self.cssText).appendTo(document.head);
					}
					if (jwrap.length === 0) {

						if (forTest) {							
							$('.myctrip_wrap') && $(jmenuWrapper.html(self.tpl)).prependTo($('.myctrip_wrap'));


						}else {							
							$('body').append(jmenuWrapper.html(self.tpl));
						}
						
						jul = $('#ctripmenu-wrap ul');
						$onlineSideNav = $(".sidenav");

						jul.find('[data-href]').bind("click", self.menuLinkJump);
						$("#ctripmenu_wallet").bind("click", self.walletLinkJump);
						$("#ctripmenu_coupon").bind("click", self.couponLinkJump);
						$(".sidenav").find("a").bind("click", self.onlineMenuJump);						
						$(window).bind("scroll", self.windowScroll);

						jul.find('li').removeClass("current");
						jul.find(cls).addClass("current");	
						currentBuName = cls;

						$("#commonInfo").bind("click", self.onCommonInfoClick);
						$(".info_list_app").live("click", self.onInfoListJump);		
						$(".info_cui_mask").live("click", self.infoCuiMask);

						//online;
						$onlineSideNav.find('.selected').removeClass("selected");

						if (location.href.indexOf("index") > 0) {
							$(".navhome").addClass("selected");
						} else {
							$(".allorders").addClass("selected");
						}

					} else {
						jwrap.show();
						jul.find('li').removeClass("current");
						jul.find(cls).addClass("current");

						//online;
						$onlineSideNav.find('.selected').removeClass("selected");

						if (location.href.indexOf("index") > 0) {
							$(".navhome").addClass("selected");
						} else {
							$(".allorders").addClass("selected");
						}
					}
					$('body').addClass('ctripmenu-pad');
					self.isShowing = true;
				} else {
					$('body').removeClass('ctripmenu-pad');
					self.isShowing = false;
				}
			} else {
				$("#ctripmenu-style").remove();
				$('body').removeClass('ctripmenu-pad');
				jwrap.hide();
				self.isShowing = false;
			}
		};
		self.reinit = function(obj2) {
			$("#ctripmenu-wrap").remove();
			$("#ctripmenu-style").remove();
			self.sets = obj = $.extend(obj, self.sets || {});
			return self.init(obj2 || obj);
		};
		self.init(obj);
		if (self.sets.bresize) {
			window.onresize = function() {
				self.reinit()
			}
		}
		return self.isShowing;
	};
	return menu;
});
define(['class','base'],function ( $class, base ){

	var Dropdowns = new $class();

	Dropdowns.include({
		init : function (){
			
		}
	});

	return Dropdowns;
});
define([ "base", "ajax", "class" ],function ( base, Ajax, $class ){

    var Network = new $class();
	
    var openedElementArray = [];    //已添加的元素
    var openedElementIdArray = [];

    var loadFailed = ".cp-Network-loadFailed",
        loadFailedWithCall = ".cp-Network-loadFailedWithCall",
        loading = ".cp-Network-loading",
        loadingForSubmit = ".cp-Network-loadingForSubmit",
        noSearch = ".cp-Network-noSearch",
        load404 = ".cp-Network-load404";
	

    var screenOp = "keepheader,keepfooter,fullscreen,keepboth";

	var template = {
		loadFailed : '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loadFailed loadFailed-box"><div class="loadFailed-animate"><div class="bubble"></div><div class="eyebrow"></div><div class="tail"></div><div class="tear"></div><div class="l-hand"></div><div class="r-hand" style="z-index: 0;"></div><div class="text"></div></div><p>网络不给力，请再试试吧。</p><div class="btns"><span class="btn-retry">重试</span></div></div></div>',
		loadFailedWithCall : '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loadFailedWithCall cp-Network-loadFailed loadFailed-box"><div class="loadFailed-animate"><div class="bubble"></div><div class="eyebrow"></div><div class="tail"></div><div class="tear"></div><div class="l-hand"></div><div class="r-hand" style="z-index: 0;"></div><div class="text"></div></div><div class="text"></div><p>网络不给力，请再试试吧。</p><p>您也可以拨打客服电话。</p><div class="btns"><span class="btn-retry">重试</span><div class="line-spacing"></div><span class="btn-call">联系客服</span></div></div></div></div>',
		loading : '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loading loading-box"><div class="loading-animate"><div class="skeletons"></div><div class="bubble"></div><div class="eye"></div><div class="tail"></div><div class="tear"></div><div class="l-hand"></div><div class="r-hand"></div><div class="text"></div></div><p class="ellips_line2"><i class="i-loading"></i>游游努力加载中...</p></div></div>',
		loadingForSubmit : '<div class="cp-h5-main" style="width:100%;background-color:rgba(0,0,0,0.7);position: fixed;z-index:9999;"><div class="cp-Network-loadingForSubmit loading-box"><div class="loading-layer">游游努力提交中... </div></div></div>',
		noSearch : '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-noSearch loadNosearch-box"><div class="nosearch-animate"></div><p>找不到，换个试试吧...</p></div></div>',
		load404 : '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-load404 load404-box"><div class="load404-animate"><div class="body"><div class="eyes"></div><div class="r-hand"></div><div class="l-hand"></div><div class="bubble"></div><div class="tail"></div><div class="nofind">404</div></div><div class="bubble"></div></div><p>游游迷路了，<br>你能带我回首页吗？</p><div class="btns"><span class="btn-retry">返回首页</span></div></div></div>'
	};
	
	var Aid = base.getURLParameter('allianceid'),
		Sid = base.getURLParameter('sid'),
		IsCustomer = base.getURLParameter('iscustomer');

	var localDate = null, 
		loadingChar = "";

	if( Aid && Sid && IsCustomer ){ //读取url成功
		if(IsCustomer == 1) usingDate(); //需要定制
	}
	else{ 
		var localUnion = localStorage.getItem('UNION'); 
		var local;
		if( localUnion ){
			localUnion = JSON.parse(localUnion);
			local = localUnion.data || localUnion.value
			if(local){
				Aid = local.AllianceID;
				Sid = local.SID;
			}
			if(Aid && Sid ) usingDate(); //读取 Aid and Sid 成功
		}
	}
	
	
	function usingDate(){
		localDate = localStorage.getItem('THIRD_PARTY_' + Aid + '_' + Sid);
		
		if( localDate ){ //有本地存储
			localDate = JSON.parse(localDate);
			(localDate.data.Aid == Aid && localDate.data.SID == Sid ) ? resetDom( getDateFromLocal() ) : getDateFromAPI();
		}
		else{
			getDateFromAPI();
		}
	}
	
	//从localStorage取得数据
	function getDateFromLocal(){
		return localDate.values;
	}
	
	//从API取得数据;
	function getDateFromAPI(){
		var getDate = new Ajax();
		var str = "";
		var param = {"head":{"syscode":"String","lang":"String","auth":"String","cid":"String","ctok":"String","cver":"String","sid":"String","extension":[{"name":"String","value":"String"}]},"AllianceInfo":{"AID":Aid,"SID":Sid},"SearchParameters":{"SiteID":1,"SitePageID":0,"ConfigCategory":0},"DisplaySettings":{"ViewPageSettings":{"PageSize":0,"CurrentPageIndex":0}}}
		
		getDate.setting({
			interface : "restapi/soa2/10849/json/"
		});

		getDate.send('GetSitePageSettings',param, function ( error, data ){
			
			if( error || data.ResponseStatus.Ack !== "Success" ) console.log('华住接口返回错误，使用默认配置！'); 
			
			if( data.ResponseStatus.Ack == "Success" ){
				var item = data.SitePageSettings.SitePageSettingItem;
				for(var i in item) {
					str = str + '"' + item[i].ConfigKey + '"' + ':' + '"' + item[i].ConfigValue + '"' + ',';
				}
				str = "{" + str.slice(0,-1) + "}";
				localStorage.setItem( 'THIRD_PARTY_' + Aid + '_' + Sid, '{"data":{"Aid":' + Aid + ',"SID":' + Sid + '},"values":' + str + '}' );
				resetDom( JSON.parse(str) );
			}
		},'POST',true); 
	}
	
	
	//使用接口数据 
	function resetDom( data ){
		
		loadingChar =  data.loading_logo2_title;

		if( data.loading_logo1_url ){
			template.loadingForSubmit = '<div class="cp-h5-main" style=" background-color:rgba(0,0,0,0.7);width:100%;position: fixed;z-index:9999;"><div class="cp-Network-loadingForSubmit loading-box"><div style="width: 112px;height: 27px;padding-top: 85px;border-radius: 7px;z-index: 10000;position: fixed;left: 50%;top: 50%;margin-left: -66px;margin-top: -66px;color: #666;font-size: 12px;text-align: center; background:#fff url('+ (data.loading_logo1_url || "" ) +') center 10px no-repeat; background-size: 68px;">'+ (data.loading_logo1_title || "") +'</div></div></div>';
		}
		
		if( data.loading_logo2_url ){
			template.loading = '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loading loading-box"><div style="position: relative;top: 0;margin: 0 auto 40px;width: 66px;height: 83px;background-position: 0 0;background:url('+ (data.loading_logo2_url || "") +') center no-repeat; background-size: 83px;"></div><p class="ellips_line2">'+ (data.loading_logo2_title || "") +'</p></div></div>';
		}
		
		if( data.loading_faile_logo_url ){
			template.loadFailed = '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loadFailed loadFailed-box"><div style="  position: relative;top: 0;margin: 0 auto 40px;width: 57px;height: 81px;background-repeat: no-repeat;background-position: center center; background-size:80px; background-image:url('+ (data.loading_faile_logo_url || "") +')"><div class="text"></div></div><p>网络不给力，请再试试吧。</p><div class="btns"><span class="btn-retry" style="background-color:'+ (data.loading_faile_retry_backgroundcolor || "#52bceb") +'">重试</span></div></div></div>';
			
			template.loadFailedWithCall = '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loadFailedWithCall cp-Network-loadFailed loadFailed-box"><div style="position: relative;top: 0;margin: 0 auto 40px;width: 57px;height: 81px;background-repeat: no-repeat; background-size:80px; background-position: center center; background-image:url('+ (data.loading_faile_logo_url || "") +')"></div><div class="text"></div><p>网络不给力，请再试试吧。</p><p>您也可以拨打客服电话。</p><div class="btns" "><span class="btn-retry" style="background-color:'+ (data.loading_faile_retry_backgroundcolor || "#52bceb") +'">重试</span><div class="line-spacing"></div><span class="btn-call" style="color:'+ (data.loading_faile_contactcolor || "#52bceb") +'">联系客服</span></div></div></div></div>';
		}
	}
	
	
	//javascript templete
	/*function tplEngine( tpl, data ) {
		var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
		var add = function(line, js) {
			js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
				(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
			return add;
		}
		while(match = re.exec(tpl)) {
			add(tpl.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(tpl.substr(cursor, tpl.length - cursor));
		code += 'return r.join("");';
		return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
	}*/
	
	
    Network.include({
        init : function (){
            var options = arguments[0];
            if( !options || typeof options !== "object" ) options = {};
            this.parentNodes = (options.parent && typeof options.parent === "string" && /(\.|#)(\w|-)+/.test( options.parent )) ? options.parent : "#main";
            var $screen = options.screen && options.screen.toLowerCase();
            this.screen = ( typeof $screen === "string" && screenOp.indexOf( $screen ) > -1 ) ? $screen : "keepheader";
            this.zIndex = base.isNumeric( options.zIndex ) ? options.zIndex : 10;
            this.position = options.position || "absolute";
			this.domID;


            var initParameters = function ( el ){
                return base.isNumeric( el ) ? el : 0;
            };

            var t = initParameters( options.header),
                b = initParameters( options.footer );

            this.l = initParameters( options.left );
            this.r = initParameters( options.right );

            this.t = t === null ? 0 : t;
            this.b = b === null ? 0 : b;
        },
        __setCss : function ( el ){
            var self = this;
            return function ( styles ){
                var _b = !!(self.position == "absolute" || self.position == "fixed");
                var initStyles = function ( direction ){
                    base.isNumeric(styles[direction]) && ( _b ? el.css(direction,styles[direction]):el.css("margin-"+direction, styles[direction]));
                };
                for(var m in styles) initStyles(m);
                base.isNumeric(styles.zIndex) && _b && el.css({"zIndex":styles.zIndex});
            }
        },
        __open : function ( id ){

            var $temp = id.replace(/\.cp-Network-/,"");
            var temp = template[$temp];
            //根据screen改变元素样式
            var d = $(temp);
			
			this.domID = "domID" + new Date().getTime();
			
			d.attr('id', this.domID);

            d.css({"position":this.position});

            //页面已经load,获取父级
            this.parent = $(this.parentNodes);
            //如果父级不是main,且是绝对定位，则给此元素加一个relative
            if(this.parent.prop("id") !== "main" && this.position == "absolute" ){
                this.parent.css({"position":"relative"});
            }
            var setCss = this.__setCss(d);

            switch ( this.screen ) {
                case "keepheader" :
                    setCss({"top":this.t,"bottom":0});
                    break;
                case "keepfooter" :
                    setCss({"bottom":this.b,"top":0});
                    break;
                case "fullscreen" :
                    setCss({"top":0,"bottom":0});
                    break;
                case "keepboth" :
                    setCss({"top":this.t,"bottom":this.b});
                    break;
                default :
                    setCss({"top":this.t,"bottom":0});
            }
            setCss({ "left" : this.l, "right" : this.r, "zIndex" : this.zIndex });
			
            this.parent.append( d );

            this.$id = $( id );
            this.$parent = this.$id.parent();

            openedElementArray.push( this.$parent );
            openedElementIdArray.push( $temp );

            //获取可能存在的所有按钮
            this.retryBtn = this.parent.find(".btn-retry");
            this.callBtn  = this.parent.find(".btn-call");
            this.closeBtn = this.parent.find(".close");
            this.noSearchText = this.parent.find('.loadNosearch-box p');
            this.loadingText = this.parent.find('.loading-box .ellips_line2');
			this.loadingsubmitText = this.parent.find('.loading-box .loading-layer');
        },
        __close : function (){
            this.$parent.remove();
        },
        __callback : function ( callback ){
            var self = this;
            return callback && callback(function (){
				self.__close();
			});
        },
        __hidden : function ( type, element ){
            var $type = type === "close" ? 'remove' : 'hide';
			var domid = $('#' + this.domID );
            if( !element ){ //如果没有填任何元素，则删除所有已经添加的元素
                openedElementArray.forEach(function ( el, i ){
                    el[$type]();
                });
            }
			else if( element == 'current' ){
				type === "close" ? domid.remove() : domid.hide();
            }
			else{
				//如果填有元素，则查找已添加元素的数组，赋为索引
                var index = openedElementIdArray.indexOf(element);
                //通过索引查找其元素，执行remove/hide方法
                if( index > -1 ){
                    openedElementArray[index][$type]();
                }else{
                    console.warn("no this element!");
                }
			}
        },
        close : function ( element ){
			this.__hidden('close', element);
        },
        hide : function ( element ){
            this.__hidden('hide', element);
        },
        loadFailed : function ( callback ){
            var self = this;
            //显示/创建
            this.__open( loadFailed );
            //返回一个close函数，用于手动关闭页面
            this.retryBtn.off("click").on("click",function (){
                return self.__callback.call( self,callback );
            });
        },
        loadFailedWithCall : function ( number, callback ){
            var self = this;
            this.__open( loadFailedWithCall );
            this.retryBtn.off("click").on("click",function (){
                return self.__callback.call( self,callback );
            });
            this.callBtn.off("click").on("click",function (){
                window.location.href = "tel:" + (number || '8008206666');
            });
        },
        loading : function ( text, callback ){
            this.__open( loading );
            var _text,_callback;

            if( typeof text == "string" ){
                _text = text;
                _callback = callback;
            }else{
                _text = loadingChar || "游游努力加载中...";
                _callback = text;
            }

            this.loadingText.text( _text );
            return this.__callback.call( this,_callback );
        },
        loadingForSubmit : function ( delay, text, callback ){
            var self = this;
            if( typeof delay == "function" ) callback = delay;
			if( typeof delay == "string" ) text = delay;
            delay = base.isNumeric(delay) ? delay : 0;
            var f = function (){
                self.__open( loadingForSubmit );
				self.loadingsubmitText.text( text );
                return self.__callback.call( self,callback );
            };
            return delay > 0 ? setTimeout(f, delay) : f();
        },
        noSearch : function ( text, callback ){
            this.__open( noSearch );

            var _text,_callback;

            if( typeof text == "string" ){
                _text = text;
                _callback = callback;
            }else{
                _text = "找不到，换个试试吧...";
                _callback = text;
            }
            this.noSearchText.text( _text);
            return this.__callback.call( this,_callback );
        },
        load404 : function ( callback ){
            var self = this;
            this.__open( load404 );
            this.retryBtn.off("click").on("click",function (){
                location.href = "/";
                return self.__callback.call( self,callback );
            });
        }
    });
    return Network;
});
define(['class','base'],function ( $class, base ){

	var Prompt = new $class();

	var pp = ["cp-promptMask","cm-modal--alert"],

		screenOp = "keepheader,keepfooter,fullscreen,keepboth",

		template = {
			prompt : '<div class="cp-promptMask cui-view cui-mask cui-opacitymask" style="position:fixed; left: 0px; top: 0px; background: rgba(0,0,0,.5); width:100%; height:100%"></div>'+
			'<section class="cm-modal cm-modal--alert">'+
			'<div class="cm-modal-bd">'+

			'</div>'+
			'<div class="cm-actions">'+

			'</div>'+
			'</section>'
		},
		check = false;
		


	Prompt.include({
		init : function (){

			var options = arguments[0];

			if(!options || typeof options !== "object") options = {};

			this.parent = base.parent(options.parent);

			this.screen = (typeof options.screen === "string" && screenOp.indexOf(options.screen.toLowerCase()) > -1) ? options.screen.toLowerCase() : "keepheader";

			this.zIndex = options.zIndex && typeof options.zIndex === "number" && !isNaN(options.zIndex) ? options.zIndex : 10;
			
			this.message = options.message && {}.toString.call(options.message) == '[object Object]' ? options.message : { title: '标题配置不正确'};

			this.buttons = options.buttons && base.isArray(options.buttons) ? options.buttons : [];

			this.autoHide = options.autoHide && typeof options.autoHide === "boolean" ? options.autoHide : false;

			this.timeout = options.timeout && typeof options.timeout === "number" && !isNaN(options.timeout) &&  (options.timeout > 0) ? options.timeout : 1000;

			this.hidecallback = options.hidecallback;

			var t = base.isNumeric( options.header ) ? options.header : $("header").height();
			var b = base.isNumeric( options.footer ) ? options.footer : $("footer").height();

			this.t = t === null ? 0 : t;
			this.b = b === null ? 0 : b;
		},
		__open : function ( selector,temp ){
			var self = this;

			var d = $(temp);
			var dM = d.eq(0);
			var bd;

			if(this.screen === "keepheader"){
				dM.css({"top":this.t,"bottom":0});
			}else if(this.screen === "keepfooter"){
				dM.css({"bottom":this.b,"top":0});
			}else if (this.screen === "fullscreen"){
				dM.css({"top":0,"bottom":0});
			}else if(this.screen === "keepboth"){
				dM.css({"top":this.t,"bottom":this.b});
			}else{
				dM.css({"top":this.t,"bottom":0});
			}
			dM.css("zIndex",this.zIndex);
			d.eq(1).css("zIndex",this.zIndex + 1);

			this.parent.append( d );

			bd = d.find('.cm-modal-bd');

			if(!!this.message.content){
				bd.html('<h3 class="cm-alert-title">' + this.message.title + '</h3><div class="cm-mutil-lines">' + this.message.content + '</div>');
			}else{
				!!this.message.title ? bd.html('<p>' + this.message.title + '</p>') : bd.html('<p>没有标题</p>');
			}

			self.__btns();

			$('.cp-promptMask').css('height',$(document).height())

			$('.cm-modal').css('display','block');//

			this.currentElement = d;
		},
		__btns : function (){
			var self = this;
			var btns = $('.cm-actions');
			var btnsArray = [];

			if(this.buttons.length <= 0){
				return;
			}else if(this.buttons.length > 2 ){
				btns.addClass('cm-actions--full');
			}

			for(var i=0; i<= this.buttons.length-1; i++){
				btns.append('<span class="cm-actions-btn">'+ this.buttons[i].text +'</span>');

				(function( i ){
					btns.find('.cm-actions-btn').eq(i).off().on('click',function(){
						self.buttons[i].callback( $.proxy( self.__close, self ) );
					})
				})( i )
			}
		},
		__close : function (){
			if(check) this.currentElement.hide(); else this.currentElement.remove();
		},
		prompt : function ( M ){
			var self = this;

			if ( M ){
				if( M.message ) this.message.title = M.message.title || "";
				if( M.message ) this.message.content = M.message.content || "";
				this.buttons = M.buttons || [];
				this.autoHide = M.autoHide;
				this.timeout = M.timeout;
				this.hidecallback = M.hidecallback;
			}

			var timeout = this.timeout;
			var autohide = this.autoHide;

			//显示/创建
			self.__open(pp[0],template.prompt);


			if (autohide) setTimeout(function(){ _callback() },timeout);

			var _callback = function(){
				self.__close();
				if(!!self.hidecallback && typeof(self.hidecallback) === 'function') self.hidecallback();
			}
		},
		checkNetStatus : function (){
			var self = this;
			
			var $checkNetStatus = new Prompt({
				zIndex: 3000,
				parent: "#main",
				screen: "FullScreen",
				message: {
					title : '网络连接已关闭',
					content: '启动蜂窝移动数据或Wi-Fi来访问数据！'
				},
				autoHide: false,

				buttons: [
					{
						text: '知道了！',
						callback: function (close) {
							close();
						}
					}
				]
			});
			
			setTimeout(function(){ $('.cp-promptMask').remove();$('.cm-modal').remove(); $checkNetStatus.prompt() },300);
		}
	});
	
	
	
	if( base.isInApp() ){

		var img = new Image(),
			imgSrc = "http://m.ctrip.com/favicon.ico?";

		setTimeout(function(){
			img.src = imgSrc +"t="+(new Date().getTime());

			img.addEventListener("error",function (){ //第一次error检测
				var imgSec = new Image();

				imgSec.src = imgSrc +"t="+(new Date().getTime());
				imgSec.addEventListener("error",function () { //第二次检测error，则判为无网络;
					Prompt.prototype.checkNetStatus();
				});
			});
		}, 100);
	}else{
		if( !navigator.onLine ) Prompt.prototype.checkNetStatus();
	}
	return Prompt;
});
define(['class','base'],function ( $class, base ){

	var Pull = new $class();

	Pull.include({
		init : function (){
			var options = arguments[0];
			if( !options || !base.isObject( options )) return;
			this.upParent = options.upParent && $(options.upParent);
			this.downParent = options.downParent && $(options.downParent);
			this.zIndex = options.zIndex || 1;
			this.type();
		},
		type : function (){
			var self = this;
			this.up =  {
				loading : function (){
					return self.template("upLoading");
				},
				loadFailed : function (){
					return self.template("upLoadFailed");
				},
				loadNoResult : function (){
					return self.template("upLoadNoResult");
				},
				loadMore:function (){
					return self.template("upLoadMore");
				}
			};
			this.down = {
				freshAble : function (){
					return self.template("downFreshAble");
				},
				freshDrop : function (){
					return self.template("downFreshDrop");
				},
				freshDropLimit : function (){
					return self.template("downFreshDropLimit");
				},
				loading : function (){
					return self.template("downLoading");
				},
				loadSuccess : function (){
					return self.template("downLoadSuccess");
				},
				loadFailed : function (){
					return self.template("downLoadFailed");
				}
			};
		},
		template : function ( name ){
			var _temp,_p;
			_p = /up/.test( name ) ? "up" : "down";
			var _parent = _p === "up" ? this.upParent : this.downParent;
			var _status = "default";

			switch ( name ){
				case "upLoading" :
					_temp = '<i class="i-loading"></i>正在加载中...';
					break;
				case "upLoadFailed" :
					_temp = '<i class="i-loadingFailed"></i>加载未成功，请稍后再试';
					break;
				case "upLoadNoResult":
					_temp = '没有更多结果了';
					break;
				case "upLoadMore":
					_temp = '点击加载更多';
					break;
				case "downFreshAble":
					_temp = '<i class="i-loading"></i>下拉可刷新';
					_status = "default";
					break;
				case "downFreshDrop":
					_temp = '<i class="i-loading"></i>释放可刷新';
					_status = "touch";
					break;
				case "downFreshDropLimit":
					_temp = '<i class="i-loading"></i>释放可刷新';
					_status = "over";
					break;
				case "downLoading" :
					_temp = '<i class="i-loading"></i>刷新中...';
					_status = "ing";
					break;
				case "downLoadSuccess" :
					_temp = '<i class="i-loadingSucc"></i>刷新成功';
					_status = "succeed";
					break;
				case "downLoadFailed" :
					_temp = '<i class="i-loadingFailed"></i>未刷新成功，请稍后再试吧';
					_status = "failed";
					break;
			}

			var _dom = _p === "up"
					? $('<div class="cp-h5-main"><div class="loadText-box"><p>'+ _temp +'</p></div></div>')
					: $('<div class="cp-h5-main"><div class="loadRefresh-'+ _status +'-box"><p class="refresh_slogan">携程在手，说走就走！</p><p></p>' + _temp + '</p></div></div>');

			return {
				show : function (){
					_dom.css({"zIndex":this.zIndex});
					_dom.appendTo( _parent );
				},
				hide : function (){
					if( _dom ) _dom.remove();
				}
			};
		}
	});

	return Pull;
});
define(['class','base'],function ( $class, base ){

	var pulldown = new $class();
	
	var templete = {
		loadRefresh : '<div class="loadRefresh-over-box"><div class="slogan"><p class="refresh_slogan"></p><p><i class="i-loading"></i><span></span></p></div></div><style>.loadRefresh-over-box { position:absolute; top:0; height:0;width:100%; overflow:hidden;background: #efefef url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAAyCAYAAADMUGp0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNDFjZjkxYS0zMGYxLTQwNDAtYTZiMS0yNzRmNWU2YmE5MTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEJBMUNFOTI4NDJDMTFFNEFFNDdENzQ0NDczNjFBMDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEJBMUNFOTE4NDJDMTFFNEFFNDdENzQ0NDczNjFBMDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QTdFQTk1ODQ1NzFFNDExOTkyN0VBNTMzMzNFNUEyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNDFjZjkxYS0zMGYxLTQwNDAtYTZiMS0yNzRmNWU2YmE5MTciLz4gPC9yZGY6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) center bottom no-repeat ;text-align: center; display: box; display: -webkit-box; display: -moz-box;-webkit-box-pack:center; -moz-box-pack:center; -webkit-box-align:center; -moz-box-align:center;}.loadRefresh-over-box .slogan {width:100%}.loadRefresh-over-box p.refresh_slogan {width:100%; height: 21px; margin:0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVcAAAApCAYAAACBbmodAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBBNTk3RURFNzM4MTExRTQ4QjY0OTBBRDlFQzQ2NEEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBBNTk3RURGNzM4MTExRTQ4QjY0OTBBRDlFQzQ2NEEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEE1OTdFREM3MzgxMTFFNDhCNjQ5MEFEOUVDNDY0QTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEE1OTdFREQ3MzgxMTFFNDhCNjQ5MEFEOUVDNDY0QTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz79QpBwAAAsuklEQVR42ux9B5hcxZVu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) center 0 no-repeat;text-indent:-999em;overflow:hidden;-webkit-background-size:177px auto;background-size:177px auto;}.loadRefresh-over-box .i-loading {width: 13px;height: 14px;margin-right: 5px;display: inline-block;vertical-align: middle;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAB1CAYAAAAiJ5P3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTFFMDk1N0M4NUMxMTFFNEE5MDJCQjFCNzY3RERBRTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTFFMDk1N0Q4NUMxMTFFNEE5MDJCQjFCNzY3RERBRTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMUUwOTU3QTg1QzExMUU0QTkwMkJCMUI3NjdEREFFNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMUUwOTU3Qjg1QzExMUU0QTkwMkJCMUI3NjdEREFFNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm7hrj4AAApUSURBVHja7FsNcBVX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) no-repeat 0 0;background-size: 155%;}.loadRefresh-ing-box{height:61px;padding:20px 0 19px 0;background: #efefef;}.i-loading2{-webkit-animation:loading 1s linear 0s infinite;animation:loading 1s linear 0s infinite;}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0);}100%{-webkit-transform:rotate(360deg);}}@keyframes loading{0%{transform:rotate(0);}100%{transform:rotate(360deg);}}.loadRefresh-over-box .i-loadingSucc,.loadText-box .i-loadingSucc{display: inline-block;width:13px;height:8px;margin-right:6px;border:2px solid #13b418;border-width:0 0 2px 2px;-webkit-transform:translate(0,-5px) rotate(-45deg);-ms-transform:translate(0,-5px) rotate(-45deg);-o-transform:translate(0,-5px) rotate(-45deg);transform:translate(0,-5px) rotate(-45deg);}.loadRefresh-over-box .i-loadingFailed{position: relative;margin-right:10px;}.loadRefresh-over-box .i-loadingFailed::before,.loadRefresh-over-box .i-loadingFailed::after{position: absolute;top:50%;left:50%;content:"";background:#ee693b;-webkit-transform:rotate(45deg);transform:rotate(45deg);}.loadRefresh-over-box .i-loadingFailed::before{width:2px;height:14px;margin-left:-1px;margin-top:-7px;}.loadRefresh-over-box .i-loadingFailed::after{width:14px;height:2px;margin-top:-1px;margin-left:-7px;}.loadText-box{ position:relative; display:none; width:100%; height:35px;line-height:35px;text-align:center; }.loadText-box p {font-size:12px;color: #666;}.loadText-box .i-loading {width:12px;height: 13px;margin-right:5px;display: inline-block;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAB1CAYAAAAiJ5P3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTFFMDk1N0M4NUMxMTFFNEE5MDJCQjFCNzY3RERBRTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTFFMDk1N0Q4NUMxMTFFNEE5MDJCQjFCNzY3RERBRTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMUUwOTU3QTg1QzExMUU0QTkwMkJCMUI3NjdEREFFNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMUUwOTU3Qjg1QzExMUU0QTkwMkJCMUI3NjdEREFFNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm7hrj4AAApUSURBVHja7FsNcBVX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) 0 0 no-repeat;background-size: 19px auto;vertical-align: middle;-webkit-animation:loading 1s linear 0s infinite;animation:loading 1s linear 0s infinite;}.loadText-box .i-loadingFailed{position: relative;margin-right:10px;}.loadText-box .i-loadingFailed::before,.loadText-box .i-loadingFailed::after{position: absolute;top:50%;left:50%;content:"";background:#ee693b;-webkit-transform:rotate(45deg);transform:rotate(45deg);}.loadText-box .i-loadingFailed::before{width:2px;height:14px;margin-left:-1px;margin-top:-7px;}.loadText-box .i-loadingFailed::after{width:14px;height:2px;margin-top:-1px;margin-left:-7px;}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0);}100%{-webkit-transform:rotate(360deg);}}@keyframes loading{0%{transform:rotate(0);}100%{transform:rotate(360deg);}}</style>',
		loadText : '<div class="loadText-box"><p><i class="i-loading"></i><span>正在加载中...</span></p></div>'
	}

	pulldown.include({
		init : function (){
			var option = arguments[0];
			if( !option || typeof option !== "object" ) option = {};
			
			this.parent = base.isArray(option.parent) ? option.parent : $(option.parent); 
			this.self = base.isArray(option.self) ? option.self : $(option.self); 
			this.callback = typeof option.releaseBind == "function" ? option.releaseBind : function() {}
			this.header = option.header || ""; 
			
			this.tsp = 0; // 手指点击屏幕位置
			this.movedis = 0; //手指移动距离
			this.dis = 0; // 初始滑动距离
			this.SCROLLH = $(window).height() - this.self.offset().top //滚动高度，屏幕高度- 元素offsetTop
			this.topkeepdis = 80; //下拉刷新（top） 松开后停留距离

			if(this.parent.find('.loadRefresh-over-box').length == 0 ){ 
				this.parent.append( templete.loadRefresh ); 
			}
			this.loadRefresh = $('.loadRefresh-over-box'); 

			this.freshi = this.loadRefresh.find('i');
			this.freshspan = this.loadRefresh.find('span');
			
			if( this.parent != "body,document" && this.parent ){
				if(this.parent.css('position') == "static") this.parent.css({'position':'relative'});
			}
		},
		
		__touch : function( event ){
			var _this = this;
			var event = event || event.target;
			var self = this.self;
			
			switch( event.type ){
				case "touchstart": 
					this.tsp = event.targetTouches[0].clientY;
					break;
					
				case "touchend":
					this.__gesture(); //调用判断手势方法
					this.__endTop( self ); //松开操作
					break;
					
				case "touchmove":
					
					this.movedis = event.targetTouches[0].clientY - this.tsp; //手指移动距离
					this.dis = this.movedis / 2; //运动的距离
					if(this.__gesture() == "down" && this.__ontop()){
						event.preventDefault();
						this.__down( this.dis ); 
					}
					break;
			}
		},
		
		__isIOS : function(){
			var u = navigator.userAgent
			if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) return false; else return true; 
		},
		
		__down : function( dis ){
			
			var self = this.self;

			if( base.isInApp() && !this.__isIOS()){
				if( dis >= 50){ 
					this.freshspan.text('释放可刷新');
					this.__freshMotion( 80 );
					this.__transform( self, 80 );
				} 
			}else{

				this.__freshMotion( dis );
				this.__transform( self, dis ); 
				
				if( dis > 0 && dis <= 20){ 
					this.freshspan.text('下拉可刷新'); //小于20px操作;
				} else if ( dis >= 60 ) {
					this.freshspan.text('释放可刷新'); //超过100px松开提示
				}
			}
		},
		
		__endTop : function( self ){
			var _this = this;
			if( this.dis > 80 && this.__gesture() == "down" && this.__ontop()){
				this.freshspan.text('刷新中...');
				this.freshi.addClass('i-loading2');
				if( base.isInApp() && !this.__isIOS()){} else {this.__move( this.dis, -5, self , _this.topkeepdis); }
				this.callback();

				this.dis = _this.topkeepdis;
				this.pullEnd(); //加载中禁止再次刷新
			}
			else if(this.__gesture() == "down" && this.__ontop()){
				this.__move( this.dis, -5, self , 5 );
			}
		},
		
		__close : function( msg ){
			var _this = this;
			var self = this.self;
			switch ( msg ){
				case 'success':
					this.freshspan.text('刷新成功');
					this.freshi.removeClass();
					setTimeout( function(){_this.freshi.addClass('i-loadingSucc')},10 )
				break;
				
				case 'failed':
					this.freshspan.text('未加载成功，稍后再试吧');
					this.freshi.removeClass().addClass('i-loadingFailed');
				break;
			}
			this.__runTop( self );
		},
		
		__runTop : function( self ){
			var _this = this;
			setTimeout(function(){
				if( base.isInApp() && !_this.__isIOS()){
					_this.__freshMotion( 0 );
					_this.__transform( self, 0 );
				}else{
					_this.__move( _this.topkeepdis, -5, self , 5 );
				}
				_this.pullStart();
			},500)
		},

		
		__bind : function( obj ){
			var _this = this; 
			return function() { 
				_this.apply(obj,arguments); 
			} 
		},
		
		__move : function( dis, speed, ele, pos ){
			var _this = this;
			var interval = setInterval(function(){
				dis = dis + speed;
				if( dis <= pos ){
					dis = pos - 5;
					_this.dis = 0; //回归重置dis
					clearInterval(interval);
				}
				_this.__freshMotion( dis );
				_this.__transform( ele, dis );
			},5)
		},
		
		__transform : function( ele, y ){
			$( ele ).css({
				'-webkit-transform':'translate3d('+'0,'+ y + 'px, 0)',
				'transform':'translate3d('+'0,'+ y + 'px, 0)'
			});
		},
		
		__freshMotion : function( dis ){
			this.loadRefresh.css('height',dis + 'px');
			if( dis <= 0 )this.freshi.removeClass().addClass('i-loading')
		},

		
		__ontop : function(){
			if( document.body.scrollTop == 0) return true;
		},
		
		__outerHeight : function( el ){
			var margin = parseFloat(el.css('margin').replace('px',''));
			return Math.ceil(el.height() + margin);
		},
		
		__gesture : function(){
			var distance = 5; //滑动超过5px判定为滑动
			if(this.movedis == 0 || Math.abs(this.movedis) < distance) {
				return 'click';
			}
			else if(this.movedis > 0 && Math.abs(this.movedis) >= distance ){
				return "down"
			}
			else if(this.movedis < 0 && Math.abs(this.movedis) >= distance ){
				return "up"
			}
		},
		
		closeTopLoading : function(){
			var self = this.self;
			this.__move( this.topkeepdis, -5, self , 5 );
			this.bottomloaded = false;
		},
		
		pullStart: function() {
			this.self.on("touchstart", this.__touch.bind(this));
			this.self.on("touchmove", this.__touch.bind(this));
			this.self.on("touchend", this.__touch.bind(this));
		},
		__pullLoader: function(callback) {
			if (callback && typeof callback == "function") return callback && callback()
		},
		pullEnd: function() {
			this.self.off("touchstart");
			this.self.off("touchmove");
			this.self.off("touchend");
		},
		pullSuccess: function() {
			this.__close("success")
		},
		pullFailed: function() {
			this.__close("failed")
		},
		down: function( msg ) {
			this.hideDown();
			switch ( msg ) {
				case "success":
					return '<div class="loadText-box"><p><i class="i-loading"></i><span>正在加载中...</span></p></div>';
				break;
				case "failed":
					return '<div class="loadText-box"><p><i class="i-loadingFailed"></i><span>加载未成功，请稍后再试</span></p></div>';
				break;
				case "nomore":
					return '<div class="loadText-box"><p><i></i><span>没有更多结果了</span></p></div>'
				break;
			}
		},
		hideDown: function() {
			$(".loadText-box").remove()
		}
	});

	return pulldown;
});
define(["class", "base"], function ( $class, base ){

    var Scroll = new $class();

    var rAF = window.requestAnimationFrame	||
        window.webkitRequestAnimationFrame	||
        window.mozRequestAnimationFrame		||
        window.oRequestAnimationFrame		||
        window.msRequestAnimationFrame		||
        function (callback) { window.setTimeout(callback, 1000 / 60); };

    Scroll.include({
       init : function (options){
           var defaultOptions = {
               wrapper : null,
               scroller : null,
               distance : 100,
               timeout : 5000,
               pullCallback : false,
               pushCallback : false
           };

           this.opt = $.extend(defaultOptions, options);

           //�жϴ�������Щ�¼�
           this.isSwipeDown = false;
           this.isSwipeUp = false;

           //io��Ĭ�Ϲرգ�������pull/push�¼���������,��ֹ�ٴδ����¼���
           // ��Ĭ��5����û�лص��������أ��ر�������������pull/push�¼�
           this.IOLock = false;

           //������ʱ��
           this.animateTimer = null;

           this.wrapper = $(this.opt.wrapper);
           this.scroller = $(this.opt.scroller);

           //�ڲ�transform,����Ҳ��Ҫ��һ��transform������ס
           this.wrapper.addClass("cpWpTransform");
           //�ڲ���һ��class��������css3����
           this.scroller.addClass("cpWpSwipe");

           //��������document�ľ���λ��
           this.InitDATA();

           this.eventTrigger();

           this.update();
       },
       InitDATA : function (){
           var unWHeight = this.wrapper.height(),
               unWPadding = parseInt(this.wrapper.css("padding"),10),
               unWMargin = parseInt(this.wrapper.css("margin"),10),
               unSHeight =  this.scroller.height(),
               unSPadding = parseInt(this.wrapper.css("padding"),10),
               unSMargin = parseInt(this.wrapper.css("margin"),10);

           var wHeight = unWHeight + unWPadding + unWMargin;
           var sHeight = unSHeight + unSPadding + unSMargin;

           this.minTop = 0;
           this.maxTop = wHeight - sHeight;

           console.warn(
               "minTop:" + this.minTop,
               ",maxTop:" + this.maxTop
           );
       },
       scrollFix : function (elem){
           var startY, startTopScroll;
           elem = document.querySelector(elem);
           if(!elem) return;
           elem.addEventListener('touchstart', function(event){
               startY = event.touches[0].pageY;
               startTopScroll = elem.scrollTop;
               if(startTopScroll <= 0)
                   elem.scrollTop = 1;
               if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
                   elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
           }, false);
       },
       eventTrigger : function () {
           var self = this,
               start,
               end;

           this.wrapper.on("touchstart", function (e){
               start = e.changedTouches[0].pageY;
           });

           //��ֹsafari��Ƥ��Ч��
           if(base.isIOS()){
               this.scrollFix( this.opt.wrapper );
           }

           this.wrapper.on("touchend", function (e){
               end = e.changedTouches[0].pageY;
               var dis = end - start;
               //����������
               if( dis > 0 ){
                   self.isSwipeDown = true;
               }
               //����������
               else if ( dis < 0 ){
                   self.isSwipeUp = true;
               }
               //����
               else{
                   console.log("click");
               }
           });
       },
       changeEffect : function ( effect, method  ){
           var b = method == "addClass";
           //��IOSʹ��css3Ч��ʵ�֣�
           //iosʹ���Լ�����Ƥ��Ч��
           //if( !base.isIOS() ){
               this.scroller[ method ]( "h5Swipe" + effect );
           //}
           this["isSwipe" + effect] = b;
       },
       checkAddAction : function ( obj ){
           var b = obj == "pull",
               //��ȡscoller��ǰλ��
               t = this.scroller.position().top;

           //������pull,���ж���Сλ���Ƿ�����,������push,���ж�����λ���Ƿ�����
           if( b  ? t >= this.minTop : t <= this.maxTop ){

               var _callback = b ? "pull" : "push",
                   _getMethod = function ( cdt ){
                      return cdt ? "Down" : "Up";
                   };

               var _dir = _getMethod(b),
                   __dir = _getMethod(!b);

               this.changeEffect( _dir, "addClass" );

               if( !this.IOLock
                   && typeof this.opt[ _callback + "Callback" ] == "function"
                   && this[ "isSwipe" + _dir ]
               ){
                   this.IOLock = true;
                   //ִ��reCallback
                   //����ȥ��ǰ�¼����ͷǵ�ǰ�¼�
                   this[ _callback ]( _dir, __dir);
               }
           }
       },
       update : function (){
           var self = this;
           //���ϼ����������Ƿ񱻴���

           if( this.isSwipeDown ){
               this.isSwipeDown = false;
               this.checkAddAction("pull");
           }else if( this.isSwipeUp ){
               this.isSwipeUp = false;
               this.checkAddAction("push");
           }

           rAF(function (){
               self.update();
           });
       },
       resetBackScrollAnimate : function (c,o,callback){
           var self = this;
           //���ñ���
           self.IOLock = false;
           //���ö���
           //��������
           self.changeEffect( c, "removeClass");
           self.changeEffect( o, "addClass");
           //�����ع򶯻�
           this.animateTimer = null;
           this.animateTimer = setTimeout(function (){
               self.changeEffect( o, "removeClass" );
               return callback && callback();
           },500);
       },
       //fn����Ҫִ�еĻص�����
       //c : ��ǰ���¼����ƣ� pull/push ��
       //o : �ǵ�ǰ�¼����ƣ� pull/push ��
       reCallback : function (fn, c, o){
           var self = this;
           fn(
               function (callback){     //error
                   self.resetBackScrollAnimate(c,o,function () {
                       return callback && typeof callback == "function" && callback();
                   })
               },
               function ( callback ){   //success
                   self.resetBackScrollAnimate(c,o,function () {
                       //���¼���DOM ģ��
                       self.InitDATA();
                       //ִ�лص�����
                       return callback && typeof callback == "function" && callback();
                   })
               }
           );
       },
       pull : function (c, o) {
           return this.reCallback(this.opt.pullCallback, c, o);
       },
       push : function (c, o){
           return this.reCallback(this.opt.pushCallback, c, o);
       }
    });

    return Scroll;
});
define("text!ui/loadFailed.html",[],function(){return'<div class="cp-h5-main cp-h5-main-loadFailed cp-h5-lizard" style="background-color:#fff;">\r\n	<style type="text/css">\r\n		@charset "utf-8";\r\n\r\n		.cp-h5-lizard { position: absolute; left:0; right:0; height:100%; width:100%; top:0; bottom:0; }\r\n\r\n		/*sprite*/\r\n		.loadFailed-animate,\r\n		.loadFailed-animate .bubble,\r\n		.loadFailed-animate .l-hand,\r\n		.loadFailed-animate .r-hand,\r\n		.loadFailed-animate .eyebrow,\r\n		.loadFailed-animate .tail,\r\n		.loadFailed-animate .tear,\r\n		.loadFailed-animate .text{\r\n			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAADjCAYAAAAVBNgPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyRDk3NUI4RkIwNzNFNDExOTk5QjgzMzQzMjk0MkFCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRjREQjQ5Nzc0NDcxMUU0QkQ3MTk0QTdFRTRGMDUyMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRjREQjQ5Njc0NDcxMUU0QkQ3MTk0QTdFRTRGMDUyMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRTk3NUI4RkIwNzNFNDExOTk5QjgzMzQzMjk0MkFCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRDk3NUI4RkIwNzNFNDExOTk5QjgzMzQzMjk0MkFCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmINDnEAADk+SURBVHja7Z0JeBTXlaiv7cSOk/jDyTiOM3FCJs4b52VmgvPyTTKTsY2dSTJvxrGZZMYvcewxWBZiRyxm3wSSAa8Y24BxiJUYG7MYCxD7JhDaVxAIEEJqSUhCe++rJOqdU90lSq2qXquqq7vP/b7/k7q7unpB9XPuPefey1ictbVVnjGrq/rHZlW7x62pdq94udqdvbralRcO+Bx8Lp4Dz7W2ghvF4rxxHBc2ywp62dLCTpZZYWeZlXaWBawss4xg9uFrsmRW2FhmuY0tKzXGNWmbNxMj+fyqCtvCVRX2DUsKjaMBFq/EhdRATut8kjIAnEr4JOhKx9cl0SWX6JBV5XZiOJvheuCQzErHFYDFK7prWVXcaF+UpqbUAgL/sEb4mbO62jM+XqI9El30ZPm+A2KIvpuis5vxbyRe0UfkBjJBqcAXWh0ruQWBlx6JLrFFR7KTFx38bornzxLThvLwdRm5OMHAd211GOWR6JSB/y4Igb+Iuq7NeuySejyekIhJ9IaJgFh2TaMhs8rJLa+0G2eX2dJJdIknOmT+3suEl7syy61ZmIyA72WM3v6dBgcH9Sc6YezNN/7FxTsovMUVdsMLRcaxJLrEEh3J7iYgOgai09W/zcDAAP/3qyvRYQTnSy5wicjSCjs3tcSUk1bRN4pER7Ij0akvOd2JzlvnlhgRXLDoLr3UbHyh0DiOREeyI9GpKzndiI6vf5NIMmyodXFv1CSu8GaWmLkJhb3ZJDqSHYlOPcnFXHTeMhG+uHeYAFBuuc0eXnSJHt0tKLeB7Pqqte7KkuhIdokgup1ne9jeKy72cU0z21rRzTaeaebRjeh8MxhGZFJ3NXq4JutgQkdy/swrs6LsDDNKbWNIdCQ7El1w9tW7WW6dU9+ik4vizvUO8CSL4MTMKrVwKYV9Rq1kR6Ij2cWj6PY3eHh0LTpfVzXH/yLfctnNGd03klZyAlOKTdyEAm1kR6Ij2cWT6FBqKDfdiw4TDlJTtnAsDluHI7m6q3LZ2NQiIx/ZvQirP5DoSHYkOu84XFyIzie5EWUjZV39vOScAzeSXnICyysdOF6neoKCREey07voUF4osbgQnZzksJsqNExAkOSGj9eh7CYWGatJdCS7ZBQdSituRBeK5OpMAyQ3iS5sijeq46ALm02iI9kli+j6+/t50cSN6EKRHLZkqJWLor6OZ2qJOZ1ER7JLdNE5nc74Ep0vu2oIJrlkz7KGlIUF0WF0p3QmlkRHstOT6IzGOBSd1HQuIbtK0Vx4CwAIUR0mJ5Rc145ER7LTi+hQcnEnOlxoUqpOzr/h7AeSWehRnRfjChIdyS6RRCdILq5E55ucP2LGAxYD+7ejrf0ksvCjOsW6sDES3VdBdG+B6LbqcWFGEp22ohNLLq5EJ1UQLNTKUbdVmagOsrDVehcdkllpkyJ/aE+BCnsHwAgvySY6f8nFjeh8+zmMuEixi4rgzAehYYRHAossA+urr0uPoegeANG9D6JrA9GdA6k9KSW6rAqHFJabm6c4XAAjvCST6KQkFzeiC2fBTJoFET4pItHhfNhoZ01EKLq/gw1GrIKsvJGZY0BKaithLE6C8SDHLn4rvAr7RtpMZjjJIDo5ycWF6KSiOUxA5F/vp1kPCs+WUCoxEYnooOu5XSw5325PdqndlmREx3d3+b0zSWxJJ7pAkosT0Q2vmcPxN5y/6p9lxQQECpDEFdUc2KHaumiiuohEBzs8+YtuVbklBWBSkOhIdKFKTveiy6p2j5Mal5NrND4XOZNgZZNhUV1B7zotRTfj7YN3rCqzvQQX5Z8huntzVanln+UkR6Ij0YUjOd2Lzn/HLuyqBmokuqhXIh5GpMs5RSg6BqLzZV1tDETHSHQkukCiC1Vyuhadb6rXsIsRJ+kHalhuQtKKjJV+3ddoxupIdCQ6tUUXjuR0LTqpJARGdCgzqSJhWpJJje5rZBlYEh2JTi3RhSs43Ysu2EbTmHjABARmXwVIVkpnX/u4FwqM40l08U+kgkgUdBzRjVyhhNB2SpgPA4mOJEeiU0F0WVXcaBJPbJAQHfdCkXEsiY4kR6JTWHS+fVlJPDFgWolZQna92SQ6khyJTumITqJ+jtCGuRJlJuEmJUh0JDkSXQiiW1PtXkHS0ccsiUiSEiQ6khyJjkQXl+N0LxYZ80h0JDkSnZJjdBLLpROxWnn4JnOrnKNJdCQ5Eh2JTjFWlFi4tD1XuCffy+d+tnoP99jrB7lF+T0xq6cLZ606Eh1JjkRHopNl+sEmXmw/ztjJ/c3M90aAj2vxPhb7LcY5JLri0LqvJDqSXByJ7psgtYdBbv8PJJeC4O94Hz5GolNIbP/1QQkfsUmJTcyDL32gWUQnl5DA5ZtC2S2MREeSiwPRfQUk9sS+q560PfWeVDnwGDw2gOhO4fRTEN0NOPfzJDo/MHILJjcEozs8du7x9pgnJPhxulLbeBIdSS4ORfcYiO4tEM0skNY3cq54JjSZB7b1Dwxar9sG9sPttN11nlQpPq3zjMfnCKJDRH+7Qw2kl+8f7UmRVKLDCE1KbP+w+CNebDg+h+N0sXp/qf4T/H1MKjZnk+hIcnHGdwQZeWA5y5rO/pxe+0ChcJ/FNViTW++atqvOmSrLRefzILivCKLDrqoPp0h07+ledMuKLdzCAhP30qleSead7uOWFJlh4xWnIq8ndFdRbL96+zg3YecFzbqm0WReJxWZjCS62INdMSJkHhNk1Ga7wXXaBnuE2ybX4Nntl1xp2y46U4Oxtdb+1KaiHoa4XC6BJ0FeezBabG9vvwdgwdBcdMtLrbzAZh7vCpn0E13c4kJzcs6QEMbpYI9dEl3sMBgMRHjcDZFXkwN2R202D3IDcAMl5+wf7Np+0T71LxecqaECkvumv+wwSsPxv1Akp6noMHqbfbI7LMH5s7LcnlTbIIqZV2ZLJ9GR6OJNdsXXXDPqetyfNRndn1mc/XUXOz3vb6m2pwZie61jxu6Ljlnwc/rW8/YpW6qsjwIM0a3oMisc3Jy8nqgEJ0R1eK4kXLKJByb+Z5PoSHTxxp9rbM9idtTdP2i83OPeurHakhqMklbX67Vd7myBD6pszwBMQHeiw7G1YJLDx7FbimC3NqPMphuhlZX3ck2lXQHBY46Wm7g3qhyqZl6nFpsMJLrYsafORkTGQk//oBW7ra1mz/H1FZbUYFRdd226AIJDajrcH7wNO9MBTEB3oltwxigpN+zCotj0GKF9VGnlzpXBuGlJe1g4S65z+eVGZTe2HpaQMAaspyPRqcfrxRYicsYDqR9UWWd+cM46E38PxoYK69S9l+1LC1oc68rbXZvfKLGkAEyMrkSHmVN/uel5nG1DlT1swfmD0Z0amVcE1wwk0WnPmjMmInKeXlNgSg2V/XX2lUXXHO8evGrP2nrO8tJbpaZJcP/vAOZPINHhdLI/FVxmn5zv5X+qKjrshqLcMBGhVImImmyptMVcdNKLcHqZHSAhQaJTh4w8IxEdj63KN6WGQma+aWJhi2NDeZtzi8CRq45X8Rxy5/cXHD939qo7MtHhDAGcOvXMR1X89CkEa9ASMSGAY26RCA67rtFKLlCJCTKjxLyORKctS460EdHxrWV5vamh8HGNdWnpNecWMR+esyyaf7D1foAFAwUXkuhwVoAwDzSUuaCJmv3ELuyuCgtXV9bNdZR2SorNWNLBj+XhuBweq+am1gLTSyx5JDoSXbwx/2j3UwuP9qYG4tVC44zCZvvm4hb7FoETjfa3lxzrGRdMcCgyFFtQ0QkbV2OUFspcUJxKhUKMqq4OBtcnwZSr/84u5f7tnRPcv755iHvsjYPcr9Yf5Z7cnM/94eMqbtrBRi6j1JLwhcKhlphMLTEZxyz5iIWL3LQYEl1gpnzcTCjDV+Yd7nl+3tHuVCmWn+iZcrLR/m4RyE0gz2DftLqgbxI+N9j5Qxbdy9WudGFlD7HMMKrDqVIoNZwHGu2SRYvOdHPPgsAee/0AN2bpx9xDyz4JgW3c428c4p7fUcMtLeiLTiLw/LQ9ddxvtxTx7yPeRIeJChIdiS4eSdvd9I2Zh7rGzzrQnSpmzuHuiQev2NadabJvETh0xbp+VV73ZHxOsPMKIgtJdGrv5zrr6DXu/0LU5i+3n72cw/3Huye532+t4MaDyF789CL3wq4LMBZYyT2x6RT3zy9/Nuz4MUu2cb946zAcU8stOdMTpIbPzi043cml5lzm/vOPBby08Rw/zfyU+59PznKrYBaCHkWXWeWUFR2C21Le//SbLBxIdCQ6HYiO/eHjmq9M39/x1DQQnJilx3um5VyyvH6s3rrx/Qrz0tkHOsbhsficYJFcyKLDOZTqTfsy8cISR2f/9vYx7sXdl7jFZ0KbTD8vr4P7AyRBHn01d0S090+Zu/mu7n/+sZD7zRYvT2w6zUeAP16xY+i4/7N8O/cfG/K4ybn1XKZOBRdK0TCyrMo5VgnJkehIdDEQHQPRsdTdrfdP2dP+yNTcjt9N3tuVMnVf14SpuV3/PW1v+6P4GIiOPzaQ6FBeYYlO6LYqzfxTnbyIUDT/uHInH7UtLYquoBajOIz4cEzvn7J2S3Z1fwQ8vGYv9+8QKWL3NP1Ii26jt0hEhxtbKyE5Eh2JLoaiYyA6BqJjIDoGooPfuxiIjn8smOgEyYUlOriwchRfoaTIBCLK4cXzc4iuMLJTQwirIEO5FC5+jA6XFPZyGSWJkbiQW5dOqKVTQnIkOhJdPIpOLLlwRaf4+BxGUyi5R1/ZB1lTc1JlTdVcl86LcYUSkiPRBSkUzsgggrC5ooFtq2jnf+LtnDoH/7taovOXXLiiU/QinbT3ytCg/6L8bhKXxqILVXIkOpKcWqLbA5LJ2LmT5Zw3KSY6KcnFTHQ4BvePq3bxkpsPSQSSVvSiw24szpYQmFNuXaGE5Eh0JDktRCdsaxiN6OQkJxLZXbiDGAju9/yuYvATb+P9iotuJVyEmO382eocbiFFcoqIDsXm/9jL1e5sJSRHoiPJaSm63AbEwxOO6AJJzie6b13odr8Cy7NXFlzrXyjeTewz2GAHH1dMdFgIjJL75boj3PJiGpNTQnQzS2S/xzwlJEeiI8nFSnT4u7BhNR6Dx+Jz8LkoOjwXii6Y5DBiq+32vI7LtMNmO+f31bumbod9JsTsuOQcj8dFJboJO89zT20+w3dVn4MiXCzSJVEpIzosHA5FdJFKjkRHktOj6PAcwrmzz1mC8YjdPdiMqxcH2ofiw7OWh6MSHXZRZ8C0sIwSiuKUZJ5El1WMEpIj0ZHk9C46PPflHk8gNvXZ+6tONzmzNsNeE/5UtLvWV193wdp2julYMGwkueiL5ZWOoKKLVnIkOpJcPIgOVjAJRGazyX14R61t7vpSWIbdj1PNrlfOdri24HLuqhQME+qC0/ZIdCS5ZBAd/ny1yCzHM6/CqsRSgPwWnWh0vJ5z2b5sQ7n5eRCdZ3y8XOCrYBn2ebA8++SDbbBysSl5ZQdLqpPoSHLJIrqMY31yPJwBC3b6s/JU78T8Jsfb5d7FO//4RoHx8aG16OJBcFMOtfOSQxYWGJM4qvOMJ9GR5HQuuttBYg9gPRtIbRzI7VmQ3Ate3M/y98FjeAweG1B0cDvlT5eluGvR8Z7x/ot47rpozhQW79x+3roEj+OXaVpT7V6hpws5C8aolpdYuQX5MLcT9nMV5CYwN68nqbuu+O9FoiPJ6VR0o0Baj+y76pmQC7VsoYDH4nPwuXKik5Pd1D1t35qN69wdhvXtgPUlppfOtHjXtfvwnGkJPo7HDa0wHOukBEZo6cc7h0Vt/uBjyR3JkehIcroV3edAUj/ZW+9JERfthgM+F8+B55ISnZTsQGR8ZDc1t/3hqfs6npm2vytlLaxMDN3XX/L3ex8X7xkR27E6jN6k5IbyQ/DxrEoHJSN8tXQkOpKcjkQ3aned+ze7cTbCVc/ESz3966/2DbyPtyMCzoXnlBKdv+wEkYHoYIZFBwPRMRAdA9ENe3xYw+lFsbyAcXtE7LIKkNBIdCQ53Yvunl31zmd31zlTS9r6l0MBbwPna72OgcL9Da6p+Fi44Dnx3FKiE8suItH5urDVJBJ9g8MMJDqSnA5EN2rHZedzu0BMtV2ed/oHBt2cX+u1D5zBxyMBz42vIff6EYuOlx3UaFERsf4h0ZHoYszntl9y/Bbnk17s8myA+aYD/pIzOvpLP7vsmuw//zQs4DXwtRQXnSA7kknsZ0esDDQmqUAtXSKLbvOxBkJFPq51/GQbiKi03Z01MDDo8Zdct63/1CeXnBPxmGjB15J7H1GJDltWtXtcsssmt7mfO9c7wDVbBwOSf72fP1bp3cBSfFsc4haIUss1kehIcjFi1EfnnSmf1tmnOfsHu0Z2V/vLP7rgnLgVJtQrAb4Wvqbc+4lKdHrIxGrNhlo3d6y1n5dXJK3ONMh9VO9RbptI2LxbWIBzEizAuUC0yQ+OpZLoJLqrUGVPqAuuGoKrgrRb+4/6XwMOz2DHpxft0+RWEomUP9dYHw30nqISnR6LidWK2kzuG5xSDUWJ0ox6MVPouvovpY4rDuPqJhjxkehIdDHg9uwa24S9dY45UuNyZW2u1z84Z09VGnxNfO2AsotGdDgWlEhiw4gL5dbhUE5sUs0JfwJKdGfl9o/ACC/acbpEE93mChOhPg9sgSWQCq451xw3OJdfM7sP2CGKw795q2ugAR9TC3ztYO8vYtHF+1gdRlYot7KuAV4+WrddjdF1ZbG7KrdRzspK5woS3U02VloI9Xlk7xXHfPzbtrkGmqCs5IPss/bJB+qdCw9edS6RWhcuVD696JiN56vpdL1/7rprE64lh2vKlba63vz0kmMOvnYo7zGyiC4Ol3Hactk71qZ21BZqZIfvJ5qkhJzo5pVbc0h0Xt6F90dowriyVtc68d84rPBrrev1bNtYYUmNhhwQaG2XO1sKfAxfO9T3GZbosqq40XoU2Rs13i6oAEpNyI7qseH4H77nSD8v7h8hJbr0UrORROflnTIzoQ3P1XW7d/r/jTcZ3fvfBVlFwzFYSPMCSE2KTy7YZuNrh/New8i6uvJiFY1hVxPFpYeoTImGIla6+4rjdNEswpkooltXYiG0I+VSp/sj6La2Qf1cv/D3fcrgemUdrOobDSUtrnUXOkFsEvz5nHUmvnak71u2QflCupZyUzrzqccWaRc2UPd1ebVzfLKL7g34QyY0I+X1Yksq8laZZeKOi7YF+S2ONzdVWKcI90fKunJrGpxv/kmD45Wz7c4tNSA4gQ0V1qn42pG+b9kuqxbTwHCgPlEitlDr7JTOvs4qs67Tk+jgvKfws8IOdDc8Hs/ziJqSe63QTGjLc68Ww3LlCrOx3DxtfalpsnD7tWLTxI/PW1460uBYU97q2oy38bUjfd8x6bJiZKPX8TS1W6RjdVg7JyW66SWWPDgtiwQ1RCf+rCC9fERN0a3NNxLaMm4N7MmgNKcNjnUVEMUVtTjeyb1iz/zzWcvctYWmifjY0E947Ujft+azIXD8LZkbTheLdO6r9DidyQjRE4sENUQH53WKRPceopbkVp3qI7TnkZfzTalK8kaxaUpZm/OP5W3OLWLKWp2bDzc4XoGZGPPwOHztSN+31DJNqnVZcRwu2RuWm0S8YbiE6HCmBP67uVwuFi5qiA7O+yTIbU9/f/9b7e3t9yBqiW7piU5Cex5YBRvQKMmuWmsGbmQjx6GrttfwOHztSN+3ZjVzJLmbLdIZE3LjdDhDQi9dV614OmMnERtuX3bCOGEZiEcJMk+bJhW1ON8r9e7YJcm2c9Yl+Jr42pG+b01q5pK9u6pUUmKuzDjd3FLbeBIdoRVLjnQ9uvhEb6oS7LlszSoGmcnSbH9/VX7fZHzNaN6zOJpbp1Zxr5OCuREtkkn/i2Xq6eaUW1ckm+jSdjYQsWPUwmO9Kf7bDIbLu6XGOUW+bQnl2H7BuhJfC18zmvcsFp1BDdFh4S+1kQ2jXMUSEiXmdckkuqeffprQCDlxzD98/SfzQFaRAgmCqacN9k0oOjlONNrfXnK8L+2lIx0/jVbOqnZbMWqhpmz3VckSk3gUHclHW3ZfdrCdtV3sMVi63I/PzT3U+du5sJdquCwEeR28ansrkOTyQIJZeX3T8TV+nLb58wCLBlWXYqIEhPI1dZhlTVbRkXhiJ7p9V50st8E9THbYnZxzqOc5YfPoUHjpcPfEfXW21wtAZnKg5Nae6U3Hc+NrRCu5IdGpsbgmXsTUlF/CSSrzmgyiI+noQ3T7GzxDwuO7hdvq7pl1sPvZWQdAZEGYe6Q7be8l2+tnmuxb5Dh0xfr28ryeaXhOPDe+hq5FhyUU1JQvHpZaySTRRUfC0Z/o8DbeDzLiI7sZ+zt/OxNkFoyNZaZFJxvs750GqYk51Wj/44dnzStnH+pOw3PxyQfvufUtOhyDoha44TQ4JUpMJhYbE1Z0JBt9iw4fRxnhmN3k3Os/gRV+U6aB0AIB43STt523rD7dCN1UENzOC5Y1S4/3TMPn4jnwXL5oUVnRqbFSSaKvRBKrWRJSokvUiI5EoxvR3Qdi+zkI7g8guhT8ibfxfnwcj8OuLEiKPQ2R2JQ97Y9M3dc1YUpud2ogVub1pi880jN1Sm7XC/gcfC6eQ9QtVlZ0auzjSk2dejoSHaEht4HI/uVST//6q30Dm/fUe1L9wcfxODzeJzoG0uJnUKTltDyQ9ln7w5P2dYybtLfzucl7O1IQ/B3vw8fwGDyWfw48V1XR+aI6I4lO+xbu9ojJIrrssi4ixuyqdT5y3dK/D/9OHe7B1oNXXdN31TlTRwDHCc8RiY6BxBjIjIHUGMiNgeR48He8Dx/DY/BYzUSn9DgdNXXmvSaD6EgyuuC+S92e9/khFtiket8V14xtsL+qHHi88Fxdi84X1VWT6PSdeZWe72pMqClguy8SOuCJa+b+XJBcT2W7a53UXqtba+2TPr5on7K1xp72wTnrzwEmoGvR4XI/oS66+XK1OzvQVojUtBNdIs11rbruIvTBG/0Dg+6rvZ4dG2ErQilwe0PYnjAbyb3imAkwAV2LTiS7QMs15WDyItgcWWraiW5SiWVcoohuf72T0AfLYWev3Io218b1sHGNFLtgf4eyNte7uHkN7tIFMDG6Ft2QwGBaGI7bCWAJCkow1H1fqYXWwt0dTEp0+B9PIojulWIzoR+eDbTHA+7hcKLR8VrOZfuyrbC3w7oS8/8AzB/diy7UJpfEoKbO5H7/KWA49xX/HRJBdBknegj98PNAqwJ/VGNZKKwAXHLN+f6aMz2/AJgUCSE6uXE6aup0Xf1FN7HIWJ0Iopt3wEDoi/vkFsvMgoUw85vtm4TFMXHxTDw+0PniXnS+MT0SnUaiS/Efnys2Z5PoCDWYc6TzZ/OOdqeKwSWWDtTZ3hSWUzpy1bZ+yYmuR4OdK+5FJ1eWQk0d0fmPz00rtYxPBNFBGT6hP26bfrDzX8ST8l8r7J1zstG+GSfi7zhveXkBLHGOx4VyvrgXndQy7Mm6b2u4LZyVhpdW2EeIDhdNJdERagGiYxN2Gu6bvK/j51NyO/6AE+/nH+kan5nX/Wu8H0QX8rniXnRS43QYqVBTdgqY/ybWLxZ6x+ciFR1BJAuKNf+LEi9gasHblsvuiNeig4zrOhIdQWgruhwapwuvhbtMk/8y6ilnjGNIdAShqeg842nxTfVq6FaO3AHMIP7+6Y+ZIDQQnVSZCS2nrlwiwn98bkJB7zoSHUFoLDqp7ittkBO4hbPopn+hMCQiRpPoCCIGopPKvlL3VbrhUvOhSi6zyjlMcv9T2Fvo/93THzNBaCQ6qdVMcEs/atEVCvt3W18oMI4n0RFEDEUnNcmfNsqJrts6aXi21SD1vdMfM0FoKDqs1Pe/UHHQndrNFs42h8v9sq2pxcYVJDqCiLHovHNf3dn+SQmsGaPmbeHsEzGsSLigz5hW0TeKREcQOhCd1PaJNCUs+iTE7/J7pst95/THTBAai86XlMijsbroojnxasLPF/S2Bfq+6Y+ZIGIgOqmoLtkLiMON5sRrz6UVj8y0kugIIsaikxqrS/blm6IYm8sL9l3THzNBxEh0OC0MFuU0ii9gXK0jGRMT0WRapxRZx5LoCEKnopOrq0u2chMUezjLMU0TRXPipZhIdAShU9H5JvsbkrkLG84siAXlNvHGNwapLSZJdAShM9HJzYHFmQHJ0IXtcISXgBDWnMNExOyy4F1WEh1B6ER0cgtzJvoqxChyLJaOJAExs9S8Ipzvl/6YCT1QW1sbNq2trezcuXOsv7+fmc3m78HP1YODgxcAyTEuuN8zMDCwx2q1/r3b7WYul4v19fWx4+fPs507d0qiWZPrwiZyITEuaBDJxjcguepwv1+9XwBlNscISq12VtRpYiUWO9x2sjKLlZWYbazEZFadvcVFWnBbodHEzhiNt5SaTV8stdi+UIqf3e7gP28JfN4yqy0gSSS6L4HgMkFi5lCvLzjWCKJ7Wleik6utQ871Jl4fNpxFNcU1c1NLTEZhZ68kEd1tILq7RKJ7EER0t+qyM1q0YCyI7rNSm/39Mqt1BYguHUQ3GUS3CD7vZBDd10h0vOj+CiK0U5FcZyC7GyC6f9OV6OSysIm2bh2KO5y9IIRFNXGVkuXV9nGRfK9xKLrvgehWFPdZ55daHa/BhX8ERFdYYXfuKjGZfgAwNTnV0aEF361wuLgql4erRJxuxAL3WcvtLq7UagMB2r6U5KL7MkiuKJrrDWTXBaL7tq5EJzc9DMeyEiETG67khGleKLmVlc4VkX6ner8A4OL2Zx5KoMLlFgQwgEIo7u07eqql5VaAqUl+V5cWfK3S6Tnm+3wjwM9bZrW/WApdd+zSShFvorPZbGEB3dW1Slx3IMttILqv60p0cuN1KDvMUiaL5IRSEuy2rqi0Z0fzner9AoAL25+DIy5894DrhMHwjNqSQ3ZCNKEBt+Z1dq+quhnNjQBkbwDR/SBJRfcQJhaUuPawC1traF4PUrtdN6ITxuv8Z03Es+zClRzOfkgRJFflyIv2+4xD0fWOEF3/4PX9xcUPAExtNBIdO9HZ+ftqd79VTnTQpb1RZnVsBKl9IdlEB1FYrpLX4NX26+cr6uun7txZxPyJaZPaIjEeu7FlXeFJTkg+YHcVsq3VoRYFJ5Do/lrior9RbnXUbN+69XaAqc3Rtjat+Ea53dkiKzqM6uxuc6nD+U+79+xh/iSw6H4IUZiiWchuk8Vxtr6xDcR2p65EF0x28ZCNDWeiviA5FBySWeVQRHJxKLqnpC744j7TcS0khxy6dk0r7oTES1Ug0SHlTvdHILZb4110cmNk/sDY3OtKX4tQXMdVX23kKurqU59++mkmRhdNTnZ6rrPDYmAseI5EcphlXVXpzFbyO4wz0b0mKTqjJbugx8y0IA+yohpxB5SXvBVMdJUOd9++48e/DTAxCSq62yGaa1DjujxvaHaA7C6D3G7TneiCyQ4Lb/U0XQy71eHMeBBLDmc/4PJVSn9/cSa6AqkMZLHZugQkdGuiya6ozzgTPuNgYNG53OUuz9xTPT1MTLyJzuFwhMJP1bo2G6939J9rbOLKr1z5BcAEdNUCyQ5X/9BDkiKcCfrixANKDktJsI5Qje8uzkTnkozoLNbJRRbL5wGmBVDHphX/XeEYmXzxp8RqywW53RLPosNpXCGwQK3rs9ts4VB0VVcaPjlcVMQEdNdQdlLZWHFXNhbRHUo2nC0KxZJL9SYdOPxsan1vcSS6H8hc6C7IPs4qtzpvBZgWHGu9phWjoYykLZjoKuyuK/lG0xiACcSb6IpAKsGAbOtRqWusByQl1/ph/K2jz8gNDAZOUprsdq/o6ht7QHBf1a3oApWeiFc+0Sori8ufhzOdS8xiqJPD8ThIOhjxM6n5ncWR6F6ULJ51eoxFRvMcrSSH/OnYca34crnT1RFUdFBAfbqv72GACSSg6O6E8bkW/+sMeu7chaYW2euwxxeptff2Bbxe7S4Xf5yv+/pfuuy6+u8PC7KrDiQSHLtTa8MdjBoxegx3LE5gHnRTsauKs0CUyqwmiOj+JHWRQ62Z5+i1timf1dUxrdh74aJW/HW1e+BY0IQEjOPBOOVcgAkkYHnJQ5Lj3p1dXA3ISa6h4FBe50GG7n75BKXL4+FqDM38sdX1DW/qLhkRYAZFTjCpYImHUsLDSBEFF0k3VUg6zCq1YFfVCKJO1+q7iiPR1cpd6CeudzwPArpFK9EVdPZqxZ3QLf+gMsAMCSEhc6qjc9up9i6G7CgsjDvR4bJJQfjtiKDC7eHFFCii6zSahiK169CFDdTFxfN4RddYImRf46KhMEKRDAovki4tRm9Y9Bup3MTjcRjJgezyIlmBJAlEdyfOaZUpr+BKzdZnSs2W2wCmBbvLyzTjVPv1D6rcgUVXCd03mPv6KUjuzngVXQiJiFf8r79r3T1hie5SSys3eEM6sLkB91++1iZEdP0lFy/+L4DFTfMt8WQIRTiYoUVxBcrSCpFbOHs5BFtPbnml3ahmwiEBRPcvsuNTTpcDVjOZqpXkNBbdLcVG8zvwOT3Buq/QhT9zoqnlb4C4FJ3T6WQmWB1GDkhElAwr8oVuqBCBhSo6xGx3BJgK1jF0XOWVq2kAi6vm68quU0JMSoFdVZQclo1oMRYX56KbH0B0zjKbfSnAtKAC3o+G3AESXxK0ls479/X6zqKi+w9euoSiuyXBRPcAJCJcYim1dvcOSSmUZIRAoKRE4/XOoeOwzGRvQQGLy7a6qn9sqNGdmqyEruqqSsc6rbupcSy6PQFKK26U2xzpANOCol6zltxearYtrgoyRufLvPYdNxj+CkR3z56qqlHxKDqI2pjRaGQGg2EY0G3N8B+bExIHyEXoksqKzjJcdFfa2jmZ3itn6Oi6Kbqrjc0gurtYPDeMogKVoagFviauHacHwcWR6G4BWgOIjiu3OR8HmFZoKbuC3r6sELKuKLpLEP2Nhfmx/1Fqtf4wgUR3N0Rz18VCarjeMUxeGImFKjoUJGZYpVqTSHRIWV3dP7J4b94yFHe2FoLLqHQYodArpl3UOBbdvYEucLiwL5fbHV8BmFaMe+opzThz7Vp2lbs/qOhgpZMK+C4ygHWlNuev4ll0mHzA/RwQ3A9CLCMLjLGJZYT0Wqwhd12RPpnjDR2dw46rqm9YwBKl+bqzeWoIbmGFrXtGqeW9Xx3puFevnz8ORPeExIXtgQvaDrwF42Y/T1TJAbcWdveWh9J1BdHVQdf6eLnNXgbfyT8niOh+KV5gE2c3XLrWOkxGtc3X+NKQUJMRCGZrpZp/pAii+5QlWvPOqlAswjPMKbcv+c4Bw316/9x6vwCgbOI3uFcC1pJB4oErdzjboLbsMxi7+ims7vFVTBBoKbrX1q/Xkm9Ww74GILFe+A5qYAJ/A/xureW4LpB8NXTbS4EmEJwLvoeT8LMQuAR8MwFE9wRIzio3hibQbQq8+ZeU6K60tgcsLxGovtpwniVqwy5tFBlaA266HU+fV+8XQLHReEeFw3kRMpCwKYz9OAhuPPA5WEb81lJfJjSBRcdqOO67ILVfwed8GET3v7fll3xjYWbmg+c9np+UmGw/KOg23X+mp+db8N6+B8fgcZPK43CFYZHovoP7QfjvzdohISxYGZgXVKAmzIwQA0syBSwYvhnRNfawRG+ikpQ8HwaM+DCRIQUWJ+txDC4BRAdLg9uWl5pssPOX5UGQHOPhN4ZJCtH5dj+zMxAdA9ExEB0D0cGuZDYGomMgOv69CSUwcSq6R0F0x6X2Z+2WGGfD4l+XJ/iak0JRsT9Ssyxq/I6B9emMtLs4oQkgOeRLpX2WL4LoGIkuMUWH2w6C6PYNdSUBnJva0jVSVHXQ9Wwyu7navkG+gD9QUNfc2R2S6MwSSQ4QnYkuQoIglBQd33WFxTV/Bj83QRTXDmNp/TXeguAbl5pa3JCI6C1s7uPev8iXag2xFVbs7nPdCFoEjF3Wq63X2y82t7j8j8N5sP6iO9tgsNM/DkEQaoiO/3nw4ME7Ojo67u3u7v5r/InLNK0ssT4uFpyYdy64uSa/+eo4flfXejPBkN/QWQOiY5s3b/48JDt+Ba+zAbrKlQMDg656GO/DDG5tcwtmdm31bdcvNLZ3TKR/HIIg1BQdA8ExEB3/E9ekyyi1/FpOdMiasy7uZLOd6x/0Rnd258015kqbu7mV5dZJAIqOL1/B1wHR4RSz79rt9h8hON0Mhq5vBdExEB2jfxyCIDQTXUa5CflFINEh80/1cGvz27ldF41caZudK2vp4XIbrPxjK8tM/wpIiY6B5Hjwd2wkOoIgNBVdRkmfwA+DiW7u8U5u0l4Dj/9jGXm99wMMIdERBKEb0T2WkSHmc1mVDlsg0c083CYpuswKR6MgORIdQRB6Fh3LrLDvkpPcKlj2bEpus7ToKu3vAUwMiY4giJiLblWZVYqxcqJbfMY4JLkZh1qHPQZJiP/CRIQ/JDqCIPQoOozq/iIlujnHOnjJTTvQwq0osw7dD91d16w8w90Ak4JERxCE5qKb8fbBYNwBssvxF93C073c/DwoI4Eu7M2xOfuZZQW9fycnORIdQRB6FR1uRXjbynLLi1kVjjp/4WVWOqyrKmw7sRwFRMdAdIxERxBEPIoOxtgsDETHMop6vr+yzPLkylLzE8tKjWPSYOYDiI6vvSPREQRBBIG+BIIgSHREfHCs4SYnDVaW12BmJ65a2Il6+B1+nmy08eDjeB/+jo/jsfxxjU54Dtx/1cw/5v3dwt+Gx0afrLeMg/tWwLHZcH9eKOCx+Bx8Ln8OPDeckz83vh+4jb/ja4vfC//e4D3yn8X3vvN8n+UE/3wzf6z4M9PfAEGiI9GFK7oxvKB4YZmN8JNTBv5cefy54TVIdASJjtBadKO9cjMblBNbUPEZ+CgRXptER5DoCDVFNxZ+5mgnN2n49+B9LyQ6gkRHKCa6MXoQnKTw8L2R6AgSHRGF6EbBfeuUHXtTvEtrxPeI75VERygiuuWlNp47vvhllr7xKLvrnvsYFuktLeyEIj0o1iuBYj2YNIsFfUsLutkqKO4Trxww40gtw0XwVpXb4PeL8FwLm/thCfy0j4bK5vXB1p2SY23NoBMKCY/Be/g9vg/6x1JEdGO0HYOLfgyPf88kOkKHorsHRPc4SC4nq8oZkeRevcxdn3XowtolxZ234Xsg0SkiujiT3HDZkegIPYjuThDdt0F0IDjru6svDPZHGskB1pT3D78IomMgOkaiU0R04+NPcMPBz0CiI7QS3S0gurtBcN8Cvg88BKIbC/fNhrloB1ZXe0BUbi4KyeEqBZ+A6JiSooMNqcWMwg2sYSNrTgrcxNp3DFtd1c/gPpZVxfE/8flZeL/vd54qz3AqOFliJLp18S65oUQFfBYSHaGm6L4Govvb5UW9v8mssK6FbukRoAWAsbSBqOU2bHXRMmuKsF6VCqIDgbmq5SQnhpdhVf/YOBdddqJITpSVzSbREUqK7hYQzH0gul/Cz60gOuvqs25FpSa9jLJtEb6+P9F8SD4y80ZneaFIzg8Ya+RGx6Ho0hNNckPdWPxsJDpCAdF9eVlR9+PQjczLjDChINktrXQMBj2m3LZn7u5yPsEhRgHRjY1AcmLWYUQYJ6Ibm6iSGwI+I4mOiEZ0XwXRrX1ZQcH5JMfNO9HZG+y4rEq7FUR3j5Kiw/G2QONyoQLvzwiiG6dz0Y3Sd42ccrV2+FlJdEQkovvqq5e4o0p3R7HMJP1w2+Cso23GkI6vdL0KcrtVKdGhgFBS0YrOP7rTk+iEwtpEHJcLNF4nfG66mIlQRfeFrGrnHuXH3Oxc+pF2bur+5oFF+X2hRn83YJPbn2aUWphAlKIbo6DkhOiumpedvkQ3RkoIV7qd3MVOR2IKz1dQTBczEYrobll9zr1CacktKzGD4Fq4KfsMg1Nzm1xLCkzhdHWLQHC3KiE6BcbnZLuyKFG9dF2lormiJisntKpWO39fTbuD67J5uD5HPw/eFo5t7HUN3d9u9nD5jSPlgsdgw3NIyQfPh8/Hx/Gcakd11HUlgopuSaERGY1biSk5Hjf3eCe/ZdnkfU3c7GPtm/H3pYWmsM4Dgvu1EqLD2jg1RCcpu9iJbpSUCFBuYtFhZOcZuMGJG95uMbo5qSYlM/GxUq8piFAsVzXBz04XMxFQdOP/dALnpb4VrdxWn8VuqoPfpmyqb5ftKSC5BXldH6furvs93l50pi+8sb0Kx9GMgj6G6FV0I2QXI9HJzX4Qi04sIGwOzyAXSvM/J0Zr2CyuAV2IDj87XcxEMNF9HmY49EjLy82DyQREuC2AkdvyEgu3APZhnHm4jY/eJu/z7rA9ZW8TN+9k17sLT3V/YeLu+ql437y8rvBEV+noB8l9Q++iGya7GIlOLgkhFp0QyaHg8H7xY8L9QldTHLX5y0o4DwpP6jUDPVet7itdzETgMbrCvp/ARXpDLDf8ubTIxHc/cbfsKRChCUw7cI1HuO2VWxMvt7Q9XsktOGN1Ljzd8ev5eV13guhY6u4rz+H9Mw628pFfWMmMcutEQPeiG5agiEUyot5cLSUBHGPz76YKMhOLDsfj/MfZhOafyBAaCk3qNYWITyvR4WenizkwX39p00jmKcB8Vbl477yNh+55aQP72pwN7CtpaxlLy+D5q7nvsHvnbghddKsqrJMFqaw55+YwYTDjUCtITCQwn8SG0ziMKZB0mH20zbogv3fZl7769fsW5Xd+DkTHUrZXI9+dmNPAn2tZkTks2UHR8jbc0zG6OjpXuhai85EHYuWnjfmjqugCiEDchMSD1PidnCCxKyp1Pv/7YyY673siocVAdPeqS/7XF2zmQHRPRi06mImwGqM4oQxEkNsk+JkGcpq8txEyp03ctP3N3AyI7mYcugbd1GvcLOiqQpLBPfdE5/mF+V3vLjrV8/CcY+33Lyro+xKIjoHomFd0lcitk/Y2FuB5MULMKLPyUg2x+3oZiHau66iF+b38e8eutQDKHD4DnyRRUnYYQepRdP5RWyDRIcIYXjSiK2uxkegSOaJDIc14Wy0euHf+exfgNZpAdL8D0Y3yie6LILrvg+ieDV10lY4ti6G+DaO46Qevdcw4eC13Sq5h7vitNY+D6L4Pontw2v6mB6cfaH5w5sFrD8483Pr99COtD84+0v63c49ff2BeXvf9iwt67gbRMRAdA9ExCdGxFz68+NAkiPxQdlhyAuN3MO7nGOoqB0hIuOYfrY96Uj+ILVssOX9QevNOdkJX2abIeB3Oj9WD6MTlJf5iQgkFEp0gLP+xuHBEp1U9nRay+NGyneyh5dv5nz9atp09hCzf4btv+xj4fQXclwPkIT9avp2Dxwy+29nw+7gfLdk9Go/3siMhRKeq7Oa/x58/6ohu4enuSbMPt6XAeNvfg+y+l36o9T4Q3RdBdAxEx0B0DETHQHQMRMdAdAxEx0B0DETHQHQMRMekRDchu1bMLWk5V6en+WSHkeN0GLPDscCA0V2ViwPRfUkB0TF43fRAshNIP9KmRJSXh/NixcRCdP5ZV7loT+oxjAClsqtyAhTAkpQkEt14lBlKLVTg+GqUXiKJTjXZKSW6+Sc7R8061Ho7iI6B6BiIjoHomAqig/PV3zl5X8NqQXY41ofR3ULI2q4555GV3eIzPd9SSHRsUm7jmMl7DYZQhIfd7MUFfRHLDufFaii6vFDq6OREJ5VYEJeJhCM6ueepOe81BqIbI0Rt4QLnMHojvB3jE0l0qshOQdHBIpcoN01EB+duGDVpb8OKKXsF2TXy2VussZOL7GCGxbcVFB1LO9YwanKuYUUosotSeAZYjJQJqFpeIrPAZrCaNozW5KSF2VahiWdICOUjmMHVh+gseRqLbizKKiLJQdf2xwt2jhK6vYkmOsVlF8eiA+k03JWy+0raVOi6CpEdym5ZsUVyzG764dq7FRYdA9GxaQcaR0/aZ8gJR3iY1AhPdp7xWohObp5rMNEFKv6ViwZx7qy4yyvU5OH9eD5xIbJWk/s1FN24UIT27yu2cS9kfMzzNPwu3I+SA1gii05R2cW56NiET+tueWFT4TiYA9sjlKtgfR4WIftlXW0pOUW3qiQ6Nmmftzs7Za9hPCYs4BhjMOFh9jaMCM+gkegku6/+Ugon+hInMsRlKXi//zSyUGZViAuJxXNgMVoUzuefGQ5lloVWMyPkIjmx1PD2n1Z9yFlWZw9RmfVnIZrLRsnpRHTvgEAukejUFx0D0cG5mx+FcbpiKD/hZffSia5hUR3M2qgE0TGVRcdAdMPH8aBrC79XBxNeaEkLb1SnbsGwBRkXSFZSK5gE62bKSRKlI3R7/WdXyEV0cvV1/jM05J4jl+XVaq4rSC4dIzJf5rRaEF3by9nDxObPjswPvVKEcT1MYghoKbp7098CaWwScxBr1ACmFiS64aJjUNbyw+kHWnai6DAbu7LcLl4gYENm9HV04YqOfxx/x/E8jPawiysX7WGWNqPUGjgDq3Z5iVd0TGpLQywjkYuGhHE4lJNc1xezqHL1cEK3FRGOQbmioPzFhK8lrIzivyqKsJqK/3OElVAQqZVQoNuao9XqJTg+h9EYiI7x42w+2S1a+ZGs5DCae2T5JxjNrRNLLhai+xpEcve8tJHdM3sjyqMMCnKvqlrwS6IbITo281Drt6fvb9mJMyjgnL7SEie3srj3X4FYio5/bJLw2D7DOLmavLnHO2Tr8LCuTlXRwR4KPsJaRh2Fg5JSezklNZdUx88dA9ExcWQ3A7qtp7P+MgwUoNBlfchPcjEW3Vh+xsGcjU8BTE1IdCNFx2Yfbr1/xqGWPExM8KKrdDSuzO/4AqAn0fHHIeJoT1x4vOBUN44tDpcdrImnkehkS00SkDzhM8dIdL7IDgqF/WrpfCUkeXydna/mTiei+wPIowMirilqS45EJy86NvfE9X+A99GO08SWlpieQcnpWHRDj/kyuN5oD+r0xCUpwkwJLZZSD7TScMItpd7oHA0whKZ5BRXdD0F062GS/NZ75q7/MXYtk0p0yfCPrJHobj7mS2jAyspjMep72bc3rIaiS+jtDr1bHlpXCJIj0REkuhiIDp8vFh0eFwPRJWwXFhMQIDpGoiNIdEmGv+gStgsLa8+Jtzmk7Q4JEh2JLrG6sDKSI9ERJDoSXWJ0YQNIjkRHkOiSRXTi8hJ/4lx0/H4Y9WYmJzkSHUGiI9GNjecoDqe1gegYiY4g0REJF83xy06B3HBaG4mOINERgUQ3Ni6jOHjfIDpGoiNIdERw0cVTNOfrpvJyg/dOoiNIdEQoogsSzZkNfPfQW2uHRbejcV0370bYI1dAUbP4d0hw9V6hkegIEh0Rmugkozmx3MxemXgX7ORnF+Rd9UkFH/OJj59q5ZWfUaH9HQxDchNeTxAciY4g0RFhiG6seOMYb3kGikUst6Ci42/zU61896Egb4ovlG4xL8c8fA5Kc0iwgtxIdASJjgiHEz5p+MgZJrchsUQtOtHtUOCLlfnn4LmGXpdER5DoCIIgSHQEQRAkOoIgCBIdQRAkOoIgiETi/wNvHEIYZltxBAAAAABJRU5ErkJggg%3D%3D") !important;\r\n			background-size: 157px auto;background-repeat: no-repeat;}\r\n\r\n		/* 全页面加载失败 */\r\n		.loadFailed-box {padding-top: 75px;text-align: center;}\r\n		.loadFailed-box p {font-size: 15px;color: #666;}\r\n		.loadFailed-box .btn-retry,\r\n		.loadFailed-box .btn-call{position: relative;display: block;height: 44px;line-height: 44px;margin:20px 35px 0;background-color: #52bceb;color: #fff;font-size: 20px;border-radius: 5px;}\r\n		.loadFailed-box .btn-call {margin: 0 35px;background-color: #fff;color: #099fde;}\r\n		.loadFailed-box .line-spacing {display: block;height: 1px;margin: 20px 35px;background-color: #bcbcbc;position: relative;}\r\n		.loadFailed-box .line-spacing:before {position: absolute;width:30px;top: -10px;left: 50%;content: "或";background-color: #f5f5f5;text-align: center;margin-left: -15px;color: #bcbcbc;}\r\n		.loadFailed-box .btn-clicked:before {content:"";position: absolute;left:0;top:0;width: 100%;height: 100%;border-radius: 5px;background-color: rgba(0,0,0,0.3);}\r\n		.loadFailed-animate {position: relative;margin: 0 auto 40px;width: 57px;height: 81px;background-position: 0 0;\r\n		  -webkit-animation:bodyMove 3.4s linear 0s infinite;\r\n		  animation:bodyMove 3.4s linear 0s infinite;}\r\n		.loadFailed-animate .bubble {position: absolute;width: 94px;height: 57px;left: -12px;top: 24px;background-position: -64px 0;\r\n		  -webkit-animation:bubbleMove 3.4s linear 0s infinite;\r\n		  animation:bubbleMove 3.4s linear 0s infinite;}\r\n		.loadFailed-animate .l-hand {position: absolute;width: 19px;height: 20px;left: -5px;top: 35px;background-position: -138px -66px;\r\n		  -webkit-animation:lHandMove 1.1s linear 0s infinite;\r\n		  animation:lHandMove 1.1s linear 0s infinite;}\r\n		.loadFailed-animate .r-hand {position: absolute;width: 17px;height: 14px;left: 49px;top: 31px;background-position: -28px -91px;\r\n		  -webkit-transform-origin: left top;\r\n		  -ms-transform-origin: left top;\r\n		  transform-origin: left top;\r\n		  -webkit-animation:rHandMove 1.7s linear 0s infinite;\r\n		  animation:rHandMove 1.7s linear 0s infinite;}\r\n		.loadFailed-animate .eyebrow {position: absolute;width: 27px;height: 7px;left: 5px;top: 17px;background-position: -125px -97px;}\r\n		.loadFailed-animate .tail {position: absolute;width: 23px;height: 17px;left: 14px;top: 78px;background-position: 0px -90px;\r\n		  -webkit-transform-origin: right top;\r\n		  -ms-transform-origin: right top;\r\n		  transform-origin: right top;\r\n		  -webkit-animation:tailMove 1.7s linear 0s infinite;\r\n		  animation:tailMove 1.7s linear 0s infinite;}\r\n		.loadFailed-animate .tear {position: absolute;width: 39px;height: 0;left: 1px;top: 24px;background-position: -77px -67px;\r\n		  -webkit-transform: rotate(-12deg);\r\n		  -ms-transform: rotate(-12deg);\r\n		  transform: rotate(-12deg);\r\n		  -webkit-animation:tearDown 3.4s linear 0s infinite;\r\n		  animation:tearDown 3.4s linear 0s infinite;}\r\n		.loadFailed-animate .text {position: absolute;width: 33px;height: 28px;left: 53px;top: -16px;background-position: -56px -87px;}\r\n		.loadFailed-animate .text:before {content: "";width: 9px;height: 10px;background-color: #bedcf2;position: absolute;top: 6px;right: 3px;\r\n		-webkit-animation:textShow 3.4s linear 0s infinite;\r\n		animation:textShow 3.4s linear 0s infinite;}\r\n		/* 局部页面加载失败 */\r\n		.small-loadFailed .loadFailed-box {padding-top: 25px;}\r\n		.small-loadFailed .btn-retry {margin-top: 20px;}\r\n		.small-loadFailed .loadFailed-animate {margin-bottom: 30px;}\r\n\r\n		.huazhu-failed-image {\r\n			position: relative; margin: 0 auto 40px;width: 92px;height: 90px;background-position: center;\r\n			background-size: 90px;\r\n		}\r\n\r\n		@-webkit-keyframes bodyMove{\r\n		  0%{top:0;}\r\n		  25%{top:4px;}\r\n		  50%{top:0;}\r\n		  75%{top:4px;}\r\n		  100%{top:0;}\r\n		}\r\n		@keyframes bodyMove{\r\n		  0%{top:0;}\r\n		  25%{top:4px;}\r\n		  50%{top:0;}\r\n		  75%{top:4px;}\r\n		  100%{top:0;}\r\n		}\r\n		@-webkit-keyframes tearDown{\r\n		  0%{height:0;}\r\n		  100%{height:13px;}\r\n		}\r\n		@keyframes tearDown{\r\n		  0%{height:0;}\r\n		  100%{height:13px;}\r\n		}\r\n		@-webkit-keyframes rHandMove{\r\n		  0%{-webkit-transform:rotate(0);}\r\n		  25%{-webkit-transform:rotate(-15deg);}\r\n		  50%{-webkit-transform:rotate(0deg);}\r\n		  75%{-webkit-transform:rotate(-15deg);}\r\n		  100%{-webkit-transform:rotate(0);}\r\n		}\r\n		@keyframes rHandMove{\r\n		  0%{transform:rotate(0);}\r\n		  25%{transform:rotate(-15deg);}\r\n		  50%{transform:rotate(0deg);}\r\n		  75%{transform:rotate(-15deg);}\r\n		  100%{transform:rotate(0);}\r\n		}\r\n		@-webkit-keyframes lHandMove{\r\n		  0%{left: -5px;}\r\n		  50%{left: -3px;}\r\n		  100%{left: -5px;}\r\n		}\r\n		@keyframes lHandMove{\r\n		  0%{left: -5px;}\r\n		  50%{left: -3px;}\r\n		  100%{left: -5px;}\r\n		}\r\n		@-webkit-keyframes bubbleMove{\r\n		  0%{top: 24px;}\r\n		  25%{top: 23px;}\r\n		  50%{top: 24px;}\r\n		  75%{top: 23px;}\r\n		  100%{top: 24px;}\r\n		}\r\n		@keyframes bubbleMove{\r\n		  0%{top: 24px;}\r\n		  25%{top: 23px;}\r\n		  50%{top: 24px;}\r\n		  75%{top: 23px;}\r\n		  100%{top: 24px;}\r\n		}\r\n		@-webkit-keyframes tailMove{\r\n		  0%{-webkit-transform:rotate(0);}\r\n		  25%{-webkit-transform:rotate(15deg);}\r\n		  50%{-webkit-transform:rotate(0deg);}\r\n		  75%{-webkit-transform:rotate(15deg);}\r\n		  100%{-webkit-transform:rotate(0);}\r\n		}\r\n		@keyframes tailMove{\r\n		  0%{transform:rotate(0);}\r\n		  25%{transform:rotate(15deg);}\r\n		  50%{transform:rotate(0deg);}\r\n		  75%{transform:rotate(15deg);}\r\n		  100%{transform:rotate(0);}\r\n		}\r\n		@-webkit-keyframes textShow{\r\n		  0%{width: 9px;}\r\n		  33%{width: 7px;}\r\n		  66%{width: 4px;}\r\n		  100%{width: 0;}\r\n		}\r\n		@keyframes textShow{\r\n		  0%{width: 9px;}\r\n		  33%{width: 7px;}\r\n		  66%{width: 4px;}\r\n		  100%{width: 0;}\r\n		}\r\n	</style>\r\n	<div class="loadFailed-box">\r\n		<div class="loadFailed-animate">\r\n			<div class="bubble"></div>\r\n			<div class="eyebrow"></div>\r\n			<div class="tail"></div>\r\n			<div class="tear"></div>\r\n			<div class="l-hand"></div>\r\n			<div class="r-hand" style="z-index: 0;"></div>\r\n			<div class="text"></div>\r\n		</div>\r\n		<p>网络不给力，请再试试吧。</p>\r\n		 <%if(showContact) { %>\r\n			<div class="btns">\r\n				<span class="btn-retry">重试</span>\r\n			</div>\r\n		<%}else{%>\r\n			<p>您也可以拨打客服电话。</p>\r\n			<div class="btns">  <span class="btn-retry">重试</span>\r\n				<div class="line-spacing"></div>    <span class="btn-call">联系客服</span>\r\n			</div>\r\n		<%}%>\r\n	</div>\r\n</div>'}),define("loadFailed",["UIView",getAppUITemplatePath("loadFailed"),"cGuiderService"],function(i,n,e){var t=function(){function i(i){var n=new RegExp("(^|&)?"+i+"=([^&]*)(&|$)","i"),e=location.href.match(n);return null!=e?e[2]:null}function n(){var i="",n={head:{syscode:"String",lang:"String",auth:"String",cid:"String",ctok:"String",cver:"String",sid:"String",extension:[{name:"String",value:"String"}]},AllianceInfo:{AID:t,SID:r},SearchParameters:{SiteID:1,SitePageID:0,ConfigCategory:0},DisplaySettings:{ViewPageSettings:{PageSize:0,CurrentPageIndex:0}}};$.ajax({url:"http://m.ctrip.com/restapi/soa2/10849/json/GetSitePageSettings",type:"POST",data:JSON.stringify(n),contentType:"application/json",success:function(n){if("Success"==n.ResponseStatus.Ack){var a=n.SitePageSettings.SitePageSettingItem;for(var o in a)i=i+'"'+a[o].ConfigKey+'":"'+a[o].ConfigValue+'",';i="{"+i.slice(0,-1)+"}",localStorage.setItem("THIRD_PARTY_"+t+"_"+r,'{"data":{"Aid":'+t+',"SID":'+r+'},"values":'+i+"}"),e(a,!1)}},error:function(){console.log("第三方接口调用失败，使用默认配置！")}})}function e(i,n){var e="",t="",r="";n?(e=i.values.loading_faile_logo_url,t=i.values.loading_faile_retry_backgroundcolor,r=i.values.loading_faile_contactcolor):(i[10]&&i[10].ConfigValue&&(e=i[10].ConfigValue),i[11]&&i[11].ConfigValue&&(t=i[11].ConfigValue),i[12]&&i[12].ConfigValue&&(r=i[12].ConfigValue)),e&&e.length>0&&($(".loadFailed-animate").html(""),$(".loadFailed-animate").removeClass("loadFailed-animate").addClass("huazhu-failed-image").attr("style","background:url("+e+") center no-repeat; background-size:auto 90px"),$(".btn-retry").css("background",t),$(".btn-call").css("background",r))}var t=i("allianceid"),r=i("sid"),a=i("iscustomer"),o=localStorage.getItem("UNION"),d=null;if(o){localU=JSON.parse(o);var l=localU.data||localU.value;l&&(t=l.AllianceID||l.AllianceID,r=l.SID||l.SID)}d=localStorage.getItem("THIRD_PARTY_"+t+"_"+r),t&&r&&a&&!d?1==a&&n():d&&(d=JSON.parse(d),d.data.Aid==t&&d.data.SID==r&&setTimeout(function(){e(d,!0)},0))};return _.inherit(i,{propertys:function($super){$super(),this.resetDefaultProperty()},resetDefaultProperty:function(){this.template=n,this.datamodel={tel:"4000086666",showContact:!0},this.events={"click .btn-call":"callTelAction","click .btn-retry":"retryAction"},this.retryAction=function(){console.log("override retryAction")},setTimeout(function(){t()},260),this.callTelAction=function(){var i=this;e.apply({hybridCallback:function(){e.callService()},callback:function(){window.location.href="tel:"+i.datamodel.tel}})}}})}),define("ui/loadFailed",function(){});
define("text!ui/h5Loading.html",[],function(){return'<div class="cp-h5-main cp-h5-lizard">\r\n	<style type="text/css">\r\n		\r\n		.cp-h5-lizard { position: absolute; left:0; right:0; height:100%; width:100%; top:0; bottom:0; }\r\n\r\n		#cp-huazhu {\r\n			content: "";\r\n		    width: 112px;\r\n		    height: 57px;\r\n		    background-position: center;\r\n		    top: 20px;\r\n		    position: absolute;\r\n		    background-size: 70px 57px;\r\n		}\r\n\r\n		.loading-layer2 .loading-layer2-before,\r\n		.loading-cycle{background-image: url("data:image/png;base64,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") !important;background-size: 135px auto;background-repeat: no-repeat;position: absolute;}\r\n\r\n		/* loading layer */\r\n		.loading-box2 {  position: fixed;left:50%;top:50%;margin-left:-56px;margin-top: -56px; width:100%; }\r\n		.loading-layer2 {background-color: #fff;width: 112px;height: 27px;padding-top: 85px;border-radius: 7px;z-index:10000;color: #666;font-size: 12px;text-align: center;}\r\n		.loading-layer2 .loading-layer2-before {content: "";width: 64px;height: 57px;background-position: -72px 0;top: 20px;left: 25px;}\r\n		.loading-cycle{width: 69px;height: 69px;background-position: 0 0;top: 10px;left: 20px;-webkit-animation:loading 1s linear 0s infinite;animation:loading 1s linear 0s infinite;\r\n		}\r\n		@-webkit-keyframes loading {\r\n		  0% {	\r\n		    -webkit-transform: rotate(0deg);\r\n		  }\r\n		  100% {\r\n		    -webkit-transform: rotate(360deg);	\r\n		  }\r\n		}\r\n		@keyframes loading {\r\n		  0% {\r\n		    transform: rotate(0deg);\r\n		  }\r\n		  100% {\r\n		    transform: rotate(360deg);\r\n		  }\r\n		}\r\n	</style>\r\n\r\n	<div class="loading-box2">\r\n		<div class="loading-layer2">\r\n			<div class="loading-layer2-before"></div>\r\n			<p id="cp-h5-text">游游努力加载中</p>\r\n			<div id="cp-h5-image">\r\n				<div class="loading-cycle"></div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'}),define("loading",["UILayer",getAppUITemplatePath("h5Loading")],function(a,t){function i(a){var t=new RegExp("(^|&)?"+a+"=([^&]*)(&|$)","i"),i=location.href.match(t);return null!=i?i[2]:null}var n=i("allianceid"),e=i("sid"),r=i("iscustomer"),o=i("logourl"),c=localStorage.getItem("UNION"),l=null,d=o?'<div class="cp-h5-main cp-h5-lizard"><style type="text/css">.cp-h5-lizard { position: absolute; left:0; right:0; height:100%; width:100%; top:0; bottom:0; }#cp-huazhu {content: "";width: 112px; text-align:center; height: 57px; background-position: center; top: 20px; position: absolute; background-size: 70px 57px;}.loading-box2 {  position: fixed;left:50%;top:50%;margin-left:-56px;margin-top: -56px; width:100%; }.loading-layer2 {background-color: #fff;width: 112px;height: 27px;padding-top: 85px;border-radius: 7px;z-index:10000;color: #666;font-size: 12px;text-align: center;}</style><div class="loading-box2"><div class="loading-layer2"><div id="cp-huazhu" style="background:url('+o+'); background-size: auto 57px;background-position: center;background-repeat: no-repeat;"></div>努力加载中</div></div></div>':t,p=function(){function a(){var a="",i={head:{syscode:"String",lang:"String",auth:"String",cid:"String",ctok:"String",cver:"String",sid:"String",extension:[{name:"String",value:"String"}]},AllianceInfo:{AID:n,SID:e},SearchParameters:{SiteID:1,SitePageID:0,ConfigCategory:0},DisplaySettings:{ViewPageSettings:{PageSize:0,CurrentPageIndex:0}}};$.ajax({url:"http://m.ctrip.com/restapi/soa2/10849/json/GetSitePageSettings",type:"POST",data:JSON.stringify(i),contentType:"application/json",success:function(i){if("Success"==i.ResponseStatus.Ack){var r=i.SitePageSettings.SitePageSettingItem;for(var o in r)a=a+'"'+r[o].ConfigKey+'":"'+r[o].ConfigValue+'",';a="{"+a.slice(0,-1)+"}",localStorage.setItem("THIRD_PARTY_"+n+"_"+e,'{"data":{"Aid":'+n+',"SID":'+e+'},"values":'+a+"}"),t(r,!1)}},error:function(){console.log("第三方接口调用失败，使用默认配置！")}})}function t(a,t){var i="",n="努力加载中";t?(i=a.values.loading_logo1_url,n=a.values.loading_logo1_title):(a[9]&&a[9].ConfigValue&&(i=a[9].ConfigValue),a[7]&&a[7].ConfigValue&&(n=a[7].ConfigValue)),setTimeout(function(){i&&i.length>0&&$(".loading-layer2").html("<div id='cp-huazhu' style='background:url(\""+i+"\"); background-size: auto 57px;background-position: center;background-repeat: no-repeat;'></div>"+n)},260)}if(c){localU=JSON.parse(c);var i=localU.data||localU.value;i&&(n=i.AllianceID||i.AllianceID,e=i.SID||i.SID)}l=localStorage.getItem("THIRD_PARTY_"+n+"_"+e),n&&e&&r&&!l?1==r&&a():l&&(l=JSON.parse(l),l.data.Aid==n&&l.data.SID==e&&setTimeout(function(){t(l,!0)},0))};return _.inherit(a,{propertys:function($super){$super(),this.template=d,this.maskToHide=!1,this.hasPushState=!1,this.type="loading"},initialize:function($super,a){$super(a)},addEvent:function($super){$super()},resetDefaultProperty:function($super){$super(),this.needAnimat=!1,this.maskToHide=!1,p()}})}),define("ui/loading",function(){});