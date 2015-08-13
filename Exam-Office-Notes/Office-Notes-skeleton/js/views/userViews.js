var app = app || {};

app.userViews = (function() {
    function UserViews() {
        this.loginView = {
            loadLoginView: loadLoginView
        };
        this.loadRegisterPage = {
            loadRegisterPage: loadRegisterView
        };
        this.loadWelcomeView = {
            loadWelcomeView: loadWelcomeView
        };
    }

    function loadWelcomeView(selector, data) {
        $.get('templates/home.html', function(template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        })
    }

    function loadLoginView(selector, controller) {
        $.get('templates/login.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#loginButton').click(function() {
                var username = $('#username').val();
                var password = $('#password').val();
                return controller.login(username, password);
            })
        }).done();
    }

    function loadRegisterView(selector, controller) {
        $.get('templates/register.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#registerButton').click(function() {
                var username = $('#username').val();
                var password = $('#password').val();
                var fullName = $('#fullName').val();
                return controller.register(username, password, fullName);
            })
        }).done();
    }

    return {
        load: function() {
            return new UserViews();
        }
    }
}());