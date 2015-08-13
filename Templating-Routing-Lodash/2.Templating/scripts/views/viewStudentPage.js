var app = app || {};

(function(scope) {
    function StudentsView(selector, data) {
        $.get('templates/students.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).html(output);


        });
    }

    scope.viewStudentPage = function(selector) {
        return new StudentPage(selector);
    }
}(app));