var app = app || {};

(function(scope) {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getHomePage = function(selector) {
        var homeView = scope.viewHomePage(selector);
        homeView.homeView(selector);
    };

    Controller.prototype.getStudentPage = function(selector) {
        this.model.getStudents()
            .then(function(data) {
                scope.studentsView(selector, data);
            }, function(error) {
                console.log(error);
            })
    };

    scope.getController = function(model) {
        return new Controller(model);
    }
}(app));