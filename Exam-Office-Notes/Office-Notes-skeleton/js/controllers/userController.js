var app = app || {};

app.userController = (function() {
    function UserController(model, views, myNoty) {
        this.model = model;
        this.viewBag = views;
        this.myNoty = myNoty;
    }

    UserController.prototype.loadLoginPage = function(selector) {
        this.viewBag.loginView.loadLoginView(selector, this);
    };

    UserController.prototype.loadRegisterPage = function(selector) {
        this.viewBag.loadRegisterPage.loadRegisterPage(selector, this);
    };

    UserController.prototype.register = function(username, password, fullName) {
        return this.model.register(username, password, fullName)
            .then(function(registerData) {
                var data = {
                    username: username,
                    fullName: fullName,
                    objectId: registerData.objectId,
                    sessionToken: registerData.sessionToken
                };
                setUserToStorage(data);
                window.location.replace('#/home/');
            }, function(error) {
                console.log(error.responseText);
            })
    };

    UserController.prototype.login = function(username, password) {
        return this.model.login(username, password)
            .then(function(loginData) {
                setUserToStorage(loginData);
                window.location.replace('#/home/');
                this.myNoty.success('Login success!');
            }, function(error) {
                console.log(error.responseText);
            })
    };

    UserController.prototype.loadWelcomeScreen = function(selector) {
        var data = {
            username: sessionStorage['username'],
            fullName: sessionStorage['fullName']
        };
        this.viewBag.loadWelcomeView.loadWelcomeView(selector, data);
    };

    UserController.prototype.logout = function() {
        return this.model.logout()
            .then(function() {
                clearUserFromStorage();
                window.location.replace('#/');
            }, function(error) {
                console.log(error.responseText);
            });
    };

    function setUserToStorage(data) {
        sessionStorage['username'] = data.username;
        sessionStorage['userId'] = data.objectId;
        sessionStorage['fullName'] = data.fullName;
        sessionStorage['sessionToken'] = data.sessionToken;
    }

    function clearUserFromStorage() {
        delete sessionStorage['username'];
        delete sessionStorage['userId'];
        delete sessionStorage['fullName'];
        delete sessionStorage['sessionToken'];
    }

    return {
        load: function(model, views) {
            return new UserController(model, views);
        }
    }
}());