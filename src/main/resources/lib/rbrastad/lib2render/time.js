
exports.currentTimeMillis = function(){
    return Java.type("java.lang.System").currentTimeMillis();
};


exports.nanoTime = function(){
    return Java.type("java.lang.System").nanoTime();
};