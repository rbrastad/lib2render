var lib2render = require('/lib/rbrastad/lib2render');
var assert = require('/lib/xp/assert');


exports.currentTimeMillis = function () {
    var result = lib2render.time.currentTimeMillis();

    assert.assertNotNull(result);
};


exports.nanoTime = function () {
    var result = lib2render.time.nanoTime();

    assert.assertNotNull(result);
};