var portal = require('/lib/xp/portal');

exports.sortRandom = function(content) {

    if(Array.isArray( content )) {
        return content.sort(function () {
            return .5 - Math.random();
        })
    }else
        return content;
};

exports.slice = function(content,start, end) {
        if(Array.isArray( content )) {
            return content.slice(start, end);
        }else
            return content;
};

exports.sortRandomSlice = function(content,start, end) {
    if(Array.isArray( content )) {
        content = exports.sortRandom(content)
        return exports.slice(content, start, end);
    }else
        return content ;
};


exports.getServiceUrl = function(module, service){
   return portal.serviceUrl( {
        module : module,
        service: service
    });
}


exports.getAssetUrl = function( path ){
    return portal.assetUrl({
        path: path
    });
}

exports.getAssetScriptUrl = function( path ){
    return '<script type="text/javascript" asynch="true" src="' + exports.getAssetUrl('js/qacode.js') + '"/>';
}

exports.getImageUrl = function( imageId, scaleling ){
    return portal.imageUrl( {
        id: imageId,
        scale: scaleling
    });
}

exports.getImageFullUrl = function( req, imageId, scale ){
    return exports.requestHostName( req ) + exports.getImageUrl(imageId,scale);
}


exports.getPageUrl = function( path, params ){
    return portal.pageUrl( {
        path: path,
        params: params
    });
}

exports.getPageFullUrl = function( req , path, params ){
    return exports.requestHostName( req ) + exports.getPageUrl(path,params);
}

exports.requestHostName = function( req ){
    try {
        return req.uri.substr(0, req.uri.indexOf("/", 7))
    }catch (e){
        return "ERROR";
    }
}

exports.log  = function( data ) {
    log.info('Utilities log %s', JSON.stringify(data, null, 4));
}


exports.endsWith = function(str, suffix) {
    try{
        if (str.indexOf(suffix, str.length - suffix.length) !== -1)
            return true;
        else
            return false;
    }catch(e){

    }
}

exports.sortByKey = function(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};


exports.isEmptyOrNull = function(value){
    return (typeof value === "undefined" || value === null);
};

exports.notEmptyOrNull = function(value){
    return !exports.isEmptyOrNull(value);
};


exports.toArray = function ( content ){
    if(Array.isArray( content ) ) {
        return content;
    }else{
        return [content];
    }
};
