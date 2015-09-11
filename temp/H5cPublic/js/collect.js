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