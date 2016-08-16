var content2 = require('/lib/rbrastad/lib2render/content');
var thymeleaf = require('/lib/xp/thymeleaf');
var portal = require('/lib/xp/portal');

exports.getComponent = function() {
    return portal.getComponent();
};

exports.getSite = function() {
    return portal.getSite();
};


exports.getContent = function() {
    return portal.getContent();
};

exports.resolveContentCurrentComponent = function(){
    return content2.resolveContentCurrentComponent();
};


exports.resolveComponentContent = function() {
    return content2.resolveComponentContent();
};

exports.render = function( view, model ){
    return {
        body: thymeleaf.render(view, model)
    };
};

exports.renderView = function(viewSrc, content) {
    return exports.render(resolve( viewSrc ), content);
};


exports.renderView = function(viewSrc, content, pageContributionsHead) {
    var body = thymeleaf.render(resolve( viewSrc ), content);

    return {
        contentType: 'text/html',
        body: body,
        pageContributions: pageContributionsHead
    };
};


exports.renderViewCurrentContent = function(viewSrc) {
    return exports.render(resolve( viewSrc ), exports.resolveContentCurrentComponent());
};


exports.renderCurrentViewComponent = function(){
    var view = exports.resolveRenderView();
    return exports.render(
        view,
        exports.resolveComponentContent());

};

exports.renderViewComponentContent = function( viewSrc ){
    return exports.render(
        resolve( viewSrc ),
        exports.resolveComponentContent());

};
