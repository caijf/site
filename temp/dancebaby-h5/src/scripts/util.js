$(function(){
    // url 参数
    var query = parseUrlParam();

    // app store下载链接
    var appDownloadUrl = 'https://itunes.apple.com/cn/app/id1221882332';

    // app scheme
    var appScheme = 'opendancebaby://';

    // 用户代理
    var ua = navigator.userAgent;

    // 打开app的参数
    var openAppParam = 'openappid';

    // 支持app的频道跳转
    var SUPPORT_APP_CHANNEL = ['video', 'audio', 'photo'];

    // 服务请求地址
    // var serverUrl = 'http://106.14.251.180:8080';
    var serverUrl = 'http://api.ios.lanwuzhe.com';
    // var serverUrl = 'http://192.168.0.145:8081'

    // 绑定打开app事件
    $('.openapp-action').on('click', function (e) {
        // var url = location.href;
        // location.replace(paramUrl(location.href, {openappid: 1}));

        var pageUrl = location.href,
            category = pageUrl.match(/\/([\w]*)\.html/)[1],
            query = parseUrlParam(pageUrl),
            id = query.id ? query.id : '';

        var path = '';

        // 支持的APP频道 且有id参数
        if(id && SUPPORT_APP_CHANNEL.indexOf(category) > -1){
            path = category + '?id=' + id;
        }

        openApp(path);
    });

    /**
     * 序列化url参数
     * @param  {string} url  
     * @param  {object} data 需支持 &filter={}
     * @return {string}
     */
    function paramUrl(url, data) {
        var _url = url,
            _query = {},
            _param = "";

        if(url.indexOf('?') > -1){
            _url = url.split('?')[0];
            _query = parseUrlParam(url);
        }

        _param = $.param($.extend({}, _query, data));

        return _url + '?' + _param;
    }

    /**
     * 解析url参数
     * @return {[type]} [description]
     */
    function parseUrlParam(url) {

        var _params = '',
            query = {};

        if(url){
            _params = url.indexOf('?') > -1 ? url.split('?')[1].split('&') : '';
        }else{
            _params = location.search.substr(1).split('&');
        }

        for(var i = 0, len = _params.length; i < len; i++){
            var _tmpArr = _params[i].split('=');

            query[_tmpArr[0]] = _tmpArr[1];
        }

        return query;
    }

    /**
     * 打开APP
     * 参考：http://www.jb51.net/article/97668.htm
     * @param  {string} path app的路径，如 audio?id=1、video?id=1
     */
    function openApp(path) {
        if (ua.match(/(iPhone|iPod|iPad);?/i)) {

            var path = path ? path : '';

            //下面是IOS调用的地址，自己根据情况去修改
            var url = appScheme + path;

            window.location.href = url;

            setTimeout(function () {
                window.location.href = appDownloadUrl;
            }, 2000);

        }else{
            alert('App暂时仅支持iOS下载');
            // alert('APP Store搜索“蓝舞者”下载APP');
        }
    }

    /**
     * 检测是否打开app
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    function checkWithOpenApp(path) {
        // url带有 openappid 参数
        if(query.openappid){
            // 打开app
            openApp(path);
        }
    }

    /**
     * 图片居中
     * @param  {[type]} img [description]
     * @return {[type]}     [description]
     */
    function adjustImg(img) {
        var pw = img.parentNode.offsetWidth,
            ph = img.parentNode.offsetHeight,
            w = img.width,
            h = img.height,
            pratio = pw / ph,
            ratio = img.ratio ? img.ratio : (img.ratio = w / h);

        if (pratio == ratio) {
            img.style.width = pw + 'px';
        } else if (pratio > ratio) {
            $(img).css({
                width: pw,
                height: 'auto',
                marginTop: (ph - pw / ratio) / 2
            });
        } else {
            $(img).css({
                height: ph,
                width: 'auto',
                marginLeft: (pw - ph * ratio) / 2
            });
        }
    }

    window.Util = {
        query: query,
        downloadUrl: appDownloadUrl,
        scheme: appScheme,
        openApp: openApp,
        checkWithOpenApp: checkWithOpenApp,
        serverUrl: serverUrl,
        parseUrlParam: parseUrlParam,
        adjustImg: adjustImg
    }
});