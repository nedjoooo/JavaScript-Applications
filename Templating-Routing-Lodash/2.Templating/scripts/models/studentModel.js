var app = app || {};

(function(scope) {
    function StudentModel(baseUrl) {
        this._requester = scope.getRequest(baseUrl);
        this.studentsRepo = {
            students: []
        }
    }

    StudentModel.prototype.getStudents = function() {
        var _this = this;
        this.studentsRepo['students'].length = 0;
        var deffer = Q.defer();

        this._requester.getRequester('classes/Student/')
            .then(function(data) {
                data['results'].forEach(function(dataStudents) {
                    var student = new Student(dataStudents.name, dataStudents.grade, dataStudents.objectId);
                    _this.studentsRepo['students'].push(student);
                });
                deffer.resolve(_this.studentsRepo);
            }, function(error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };

    scope.getStudentModel = function(baseUrl) {
        return new StudentModel(baseUrl);
    }
}(app));