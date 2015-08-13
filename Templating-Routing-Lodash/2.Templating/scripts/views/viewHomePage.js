var app = app || {};

(function(scope) {
    function HomeView(selector) {
        this.selector = selector;
    }

    HomeView.prototype.homeView = function() {
        var _this = this;
        $.get('templates/home.html', function(template) {
            var output = Mustache.render(template);

            $(_this.selector).html(output);
        })
    };

    scope.viewHomePage = function(selector) {
        return new HomeView(selector);
    }
}(app));