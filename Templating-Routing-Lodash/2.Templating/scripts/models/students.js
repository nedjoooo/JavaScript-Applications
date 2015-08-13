var app = app || {};

(function(scope) {
    function Student(name, grade, email) {
        this.name = name;
        this.grade = grade;
        this.email = email;
    }

    scope.getStudent = function(name, grade, email) {
        return new Student(name, grade, email);
    }
}(app));