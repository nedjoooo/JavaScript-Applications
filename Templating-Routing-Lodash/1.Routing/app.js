var app = app || {};

(function() {
    app.router = Sammy(function() {
        var selector = ('#wrapper');

        this.get('#/', function() {
            $(selector).html('<h2>Home Page</h2>');
        });

        this.get('#/Sam', function() {
            $(selector).html('<h2>Hello Sam</h2>');
        });

        this.get('#/Bob', function() {
            $(selector).html('<h2>Hello Bob</h2>');
        });

        this.get('#/Tom', function() {
            $(selector).html('<h2>Hello Tom</h2>');
        });
    });

    app.router.run('#/');
}());