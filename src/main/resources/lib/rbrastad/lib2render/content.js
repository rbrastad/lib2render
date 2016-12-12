var portal = require('/lib/xp/portal');
var content = require('/lib/xp/content');
var util = require('/lib/rbrastad/lib2render/util');

exports.contentResult = new Array();

exports.resolveComponentContent = function() {
    var content = portal.getContent();
    var component = portal.getComponent();

    var contentsResult  = exports.getContentByComponent(component);
    var data = {
        component : component,
        contents :  contentsResult
    }

    return data;
};

exports.getCount2Render = function(component) {
    var view2renderCount = 10000000;
    if(component != undefined && component.config != undefined  )
        if(component.config['view2renderCount'] != undefined && component.config['view2renderCount'] != "all"  && component.config['view2renderCount'] != "" )
            view2renderCount = component.config['view2renderCount'] ;

    return view2renderCount;
};


exports.getContentByComponent = function(component) {
    var contentResult = new Array();

    contentResult = exports.getContentByFieldName(component,  "contentFolder", contentResult);
    contentResult = exports.getContentByFieldName(component, "contentPage", contentResult);

    return contentResult;
};


exports.getContentByFieldName = function(component, fieldName, contentResult) {
    if(component.config[ fieldName ] != undefined && !component.config[ fieldName ].length > 0) {
        var content = component.config[ fieldName ];
        if (content != undefined && content["contentKey"] != undefined) {
            var resultSize = Number.MAX_VALUE;
            if(content.contentCount != undefined)
                resultSize = content.contentCount;

               exports.getContentByKeys(content["contentKey"], resultSize).forEach(function( entry){
                   contentResult = contentResult.concat( entry);
            });
        }
    }

    return contentResult;
};


exports.getContentByKeys = function(keys, resultSize) {
    if(resultSize == undefined)
        resultSize = Number.MAX_VALUE;

    var contentResult = new Array();
    if(keys != null && keys != undefined && keys.length != 0){
        if( Array.isArray(keys) ) {
            keys.forEach(function (key) {
                contentResult =  contentResult.concat( exports.getChildren(key, 0, resultSize) );

            });
        }else{
            contentResult =  contentResult.concat( exports.getChildren(keys, 0, resultSize) );
        }
    }

    return contentResult;
};

exports.getContentByKey = function(key) {
    var contentResult = new Array();
    if( key != null && key != undefined ){
        contentResult =  content.get({
            key: key
        });
    }

    return contentResult;
};


exports.getChildren = function(key, start, count, contentTypes, sort) {
    var result = null;
    var query = {};

    if(key != undefined)
        query['key'] = key;

    if(start != undefined)
        query['start'] = start;

    if(count != undefined)
        query['count'] = count;

    if(contentTypes != undefined)
        query['contentTypes'] = contentTypes;

    if(sort != undefined)
        query['sort'] = sort;

    result = content.getChildren( query );
    result = exports.deleteEmptyProperties( result);

    return result.hits;
};

exports.resolveContentCurrentComponent = function (){

    var component = portal.getComponent();
    var content = portal.getContent();

    var data = {
        content : content,
        component : component
    };

    return data;

};


exports.deleteEmptyProperties = function(result){
   /**
    for (var i = 0; i < result.hits.length; i++) {
        result.hits[i].data['title'] = result.hits[i].displayName;
        util.data.deleteEmptyProperties(result.hits[i].data);
    }
**/

    return result;
};



exports.convArrToObj = function(array){
    var thisEleObj = new Object();
    if(typeof array == "object"){
        for(var i in array){
            var thisEle = exports.convArrToObj(array[i]);
            thisEleObj[i] = thisEle;
        }
    }else {
        thisEleObj = array;
    }
    return thisEleObj;
};


exports.createMedia  = function( content ){
    var multipartForm = portal.getMultipartForm();

    var files = util.toArray(multipartForm.file);
    if(files.length != 0) {
        files.forEach(function (entry, index) {
            try {
                var item = portalLib.getMultipartItem('file', index);
                var stream = portalLib.getMultipartStream('file', index);

                var attachment = contentLib.createMedia({
                    name: item.fileName,
                    parentPath: content["_path"],
                    mimeType: item.contentType,
                    data: stream
                })

            }
            catch (e) {
                log.error('lib2render.content.createMedia: %s', e);
            }
        });
    }
}
