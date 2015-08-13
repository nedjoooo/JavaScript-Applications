var app = app || {};

app.guestHomeController = (function() {
    function GuestHomeController(views) {
        this.viewsBag = views;
    }

    GuestHomeController.prototype.welcomeScreen = function(selector) {
        this.viewsBag.welcomeViews.loadWelcomeView(selector);
    };

    return {
        load: function(views) {
            return new GuestHomeController(views);
        }
    }
}());