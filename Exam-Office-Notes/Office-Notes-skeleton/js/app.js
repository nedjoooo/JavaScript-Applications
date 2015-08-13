var app = app || {};

(function() {
    var appId= 'UmDTu8aWXaC0w8jNDcW1Yr5su5ZMHAKxaVTRLbEm';
    var restAPI = 'Rjhr4RIO0C9YO0TenxEHZRwOIU6NJwIJJ8UgQMRH';
    var baseUrl = 'https://api.parse.com/1/';

    var headers = app.headers.load(appId, restAPI);
    var requester = app.requester.load();
    var userModel = app.userModel.load(baseUrl, requester, headers);
    var noteModel = app.noteModel.load(baseUrl, requester, headers);

    var guestHomeViews = app.guestHomeViews.load();
    var userViews = app.userViews.load();
    var noteViews = app.noteViews.load();
    var myNoty = app.noty.load();

    var userController = app.userController.load(userModel, userViews, myNoty);
    var guestHomeController = app.guestHomeController.load(guestHomeViews);
    var noteController = app.noteController.load(noteModel, noteViews);
    noteController.attachEventHandlers();

    app.router = Sammy(function() {
        var selector = '#container';

        this.before(function() {
            var userId = sessionStorage['userId'];
            if(userId) {
                $('#menu').show();
                $('#welcomeMenu').html('Welcome ' + sessionStorage['username']);
            } else {
                $('#menu').hide();
                //this.redirect('#/');
            }
        });

        this.get('#/', function () {
            guestHomeController.welcomeScreen(selector);
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/home/', function () {
            userController.loadWelcomeScreen(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/addNote/', function () {
            noteController.loadAddNotesView(selector);
        });

        this.get('#/office/', function () {
            noteController.listOfficeNotes(selector);
        });

        this.get('#/myNotes/', function () {
            noteController.listCurrentUserNotes(selector);
        });

        /*this.get('#/delete/', function () {
            noteController.loadDeleteNoteView(selector);
        });*/
    });

    app.router.run('#/');
}());