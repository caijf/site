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