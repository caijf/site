define(function(){

	var localDate = null,
		loadingChar = "";

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



	/**
	 * 工具方法
	 */
	var utils = {
		// 获取URL参数
		getURLParameter: function(param) {
			var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
			var r = location.search.substr(1).match(reg);
			if (r != null) return unescape(decodeURI(r[2]));
			return null;
		},
		// 判断数字
		isNumeric: function(num){
	        return typeof num == "number" && !isNaN( num ) && isFinite( num );
	    }
	}


    /**
     * [usingDate description]
     * @return {[type]} [description]
     */
	function usingDate() {
		localDate = localStorage.getItem('THIRD_PARTY_' + Aid + '_' + Sid);

		if (localDate) { //有本地存储
			localDate = JSON.parse(localDate);
			(localDate.data.Aid == Aid && localDate.data.SID == Sid) ? resetDom(getDateFromLocal()): getDateFromAPI();
		} else {
			getDateFromAPI();
		}
	}

	//从localStorage取得数据
	function getDateFromLocal() {
		return localDate.values;
	}

	//从API取得数据;
	function getDateFromAPI() {
		var getDate = new Ajax();
		var str = "";
		var param = {
			"head": {
				"syscode": "String",
				"lang": "String",
				"auth": "String",
				"cid": "String",
				"ctok": "String",
				"cver": "String",
				"sid": "String",
				"extension": [{
					"name": "String",
					"value": "String"
				}]
			},
			"AllianceInfo": {
				"AID": Aid,
				"SID": Sid
			},
			"SearchParameters": {
				"SiteID": 1,
				"SitePageID": 0,
				"ConfigCategory": 0
			},
			"DisplaySettings": {
				"ViewPageSettings": {
					"PageSize": 0,
					"CurrentPageIndex": 0
				}
			}
		}

		getDate.setting({
			interface: "restapi/soa2/10849/json/"
		});

		getDate.send('GetSitePageSettings', param, function(error, data) {

			if (error || data.ResponseStatus.Ack !== "Success") console.log('华住接口返回错误，使用默认配置！');

			if (data.ResponseStatus.Ack == "Success") {
				var item = data.SitePageSettings.SitePageSettingItem;
				for (var i in item) {
					str = str + '"' + item[i].ConfigKey + '"' + ':' + '"' + item[i].ConfigValue + '"' + ',';
				}
				str = "{" + str.slice(0, -1) + "}";
				localStorage.setItem('THIRD_PARTY_' + Aid + '_' + Sid, '{"data":{"Aid":' + Aid + ',"SID":' + Sid + '},"values":' + str + '}');
				resetDom(JSON.parse(str));
			}
		}, 'POST', true);
	}


	//使用接口数据
	function resetDom(data) {

		loadingChar = data.loading_logo2_title;

		if (data.loading_logo1_url) {
			template.loadingForSubmit = '<div class="cp-h5-main" style=" background-color:rgba(0,0,0,0.7);width:100%;position: fixed;z-index:9999;"><div class="cp-Network-loadingForSubmit loading-box"><div style="width: 112px;height: 27px;padding-top: 85px;border-radius: 7px;z-index: 10000;position: fixed;left: 50%;top: 50%;margin-left: -66px;margin-top: -66px;color: #666;font-size: 12px;text-align: center; background:#fff url(' + (data.loading_logo1_url || "") + ') center 10px no-repeat; background-size: 68px;">' + (data.loading_logo1_title || "") + '</div></div></div>';
		}

		if (data.loading_logo2_url) {
			template.loading = '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loading loading-box"><div style="position: relative;top: 0;margin: 0 auto 40px;width: 66px;height: 83px;background-position: 0 0;background:url(' + (data.loading_logo2_url || "") + ') center no-repeat; background-size: 83px;"></div><p class="ellips_line2">' + (data.loading_logo2_title || "") + '</p></div></div>';
		}

		if (data.loading_faile_logo_url) {
			template.loadFailed = '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loadFailed loadFailed-box"><div style="  position: relative;top: 0;margin: 0 auto 40px;width: 57px;height: 81px;background-repeat: no-repeat;background-position: center center; background-size:80px; background-image:url(' + (data.loading_faile_logo_url || "") + ')"><div class="text"></div></div><p>网络不给力，请再试试吧。</p><div class="btns"><span class="btn-retry" style="background-color:' + (data.loading_faile_retry_backgroundcolor || "#52bceb") + '">重试</span></div></div></div>';

			template.loadFailedWithCall = '<div class="cp-h5-main" style="background-color:#fff;"><div class="cp-Network-loadFailedWithCall cp-Network-loadFailed loadFailed-box"><div style="position: relative;top: 0;margin: 0 auto 40px;width: 57px;height: 81px;background-repeat: no-repeat; background-size:80px; background-position: center center; background-image:url(' + (data.loading_faile_logo_url || "") + ')"></div><div class="text"></div><p>网络不给力，请再试试吧。</p><p>您也可以拨打客服电话。</p><div class="btns" "><span class="btn-retry" style="background-color:' + (data.loading_faile_retry_backgroundcolor || "#52bceb") + '">重试</span><div class="line-spacing"></div><span class="btn-call" style="color:' + (data.loading_faile_contactcolor || "#52bceb") + '">联系客服</span></div></div></div></div>';
		}
	}


	function Network(){}
	var netProto = Network.prototype;

	netProto = {
		init : function (){},
        __setCss : function ( el ){},
        __open : function ( id ){},
        __close : function (){},
        __callback : function ( callback ){},
        __hidden : function ( type, element ){},
        close : function ( element ){},
        hide : function ( element ){},
        loadFailed : function ( callback ){},
        loadFailedWithCall : function ( number, callback ){},
        loading : function ( text, callback ){},
        loadingForSubmit : function ( delay, text, callback ){},
        noSearch : function ( text, callback ){},
        load404 : function ( callback ){}
	}

	if(!window.cPublic){
		window.cPublic.network = Network;
	}else{
		return Network;
	}

})