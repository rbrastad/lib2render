var auth = require('/lib/xp/auth');

exports.getAuthLib = function(){
    return auth;
}


exports.getUser = function(){
    var user = auth.getUser();
    user.memberships = auth.getMemberships( user.key );

    return user;
}

exports.getUserWithMemberships = function(){
    var user = exports.getUser();
    user.memberships = auth.getMemberships( user.key );

    return user;
}


exports.hasRole = function( hasRole ){
    return auth.hasRole( hasRole );

}