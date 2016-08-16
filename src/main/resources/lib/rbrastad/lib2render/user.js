var auth = require('/lib/xp/auth');

exports.getAuthLib = function(){
    return auth;
};


exports.getUser = function( userKey ){
    if(userKey != undefined)
        return auth.getPrincipal( userKey );
    else
        return auth.getUser();
};

exports.getUserWithMemberships = function( userKey ){
    var user = null;
    if(userKey != undefined)
        user = exports.getUserByKey( userKey );
    else
        user = exports.getUser();

    user.memberships =  exports.getUserMembershipsByKey( user.key );

    return user;
};


exports.getUserMembershipsByKey = function ( userKey ){
    return auth.getMemberships( userKey );
};


exports.hasRole = function( userHasRole ){
    return auth.hasRole( userHasRole );
};