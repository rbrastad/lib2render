exports.OFF = 9;
exports.ERROR = 0;
exports.WARNING = 1;
exports.INFO = 2;
exports.DEBUG = 3;
exports.TRACE = 4;

exports.LEVEL = 1;
exports.LEVEL_DEFAULT = 5;
exports.LEVEL_PREVIOUS = 5;

exports.setLevel = function ( logLevel ){
    exports.LEVEL_PREVIOUS = exports.LEVEL;
    exports.LEVEL = logLevel;
}

exports.getLevel = function (){
    return exports.LEVEL;
}


exports.error = function ( logData ){
    if( exports.LEVEL >= exports.ERROR ) {
        logData.level = 'ERROR';
        exports.logMessage(logData);
    }
};

exports.warning = function ( logData ){
    if( exports.LEVEL >= exports.WARNING ) {
        logData.level = 'WARNING';
        exports.logMessage(logData);
    }
};

exports.info = function ( logData ){
    if( exports.LEVEL >= exports.INFO ) {
        logData.level = 'INFO';
        exports.logMessage(logData);
    }
};

exports.debug = function ( logData ){
    if( exports.LEVEL >= exports.DEBUG ) {
        logData.level = 'DEBUG';
        exports.logMessage(logData);
    }
};

exports.trace = function ( logData ){
    if( exports.LEVEL >= exports.TRACE ) {
        logData.level = 'TRACE';
        exports.logMessage(logData);
    }};

exports.logMessage = function ( logData){

    if(logData.name != undefined && logData.name != '')
        log.info('**************** %s START *****************', logData.name );

    if(logData.msg != undefined && logData.msg != '')
        log.info('%s - %s', logData.level, logData.msg );

    if(logData.json != undefined && logData.json != '')
        log.info('%s - %s', logData.level, JSON.stringify(logData.json, null, 4));

    if(logData.name != undefined && logData.name != '')
        log.info('**************** %s END *****************', logData.name );

    exports.LEVEL = exports.LEVEL_PREVIOUS;
}
