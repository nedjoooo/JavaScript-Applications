var app = app || {};

(function(scope) {
    var model = scope.getStudentModel('https://api.parse.com/1/');
    var controller = scope.getController(model);

    scope.router = Sammy(function() {
        var selector = '#wrapper';

        this.get('#/', function() {
            controller.getHomePage(selector);
        });

        this.get('#/Students', function() {
            controller.getStudentPage(selector);
        });
    });

    app.router.run('#/');
}(app));