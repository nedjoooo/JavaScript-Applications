var app = app || {};

app.guestHomeViews = (function() {
    function GuestHomeViews() {
        this.welcomeViews = {
            loadWelcomeView: loadWelcomeView
        };
    }

    function loadWelcomeView(selector) {
        $.get('templates/welcome.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        })
    }

    return {
        load: function() {
            return new GuestHomeViews();
        }
    }
}());