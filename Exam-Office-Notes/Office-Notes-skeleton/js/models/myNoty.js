var app = app || {};

app.noty = (function() {
    function MyNoty() {

    }

    MyNoty.prototype.success = function(text) {
        display('success', text, 1500);
    };

    MyNoty.prototype.error = function(text) {
        display('error', text, 1500);
    };

    function display(type, text, time) {
        var n = noty({
            text: text,
            type: type,
            dismissQueue: true,
            layout: 'bottomCenter',
            theme: 'defaultTheme',
            maxVisible: 10,
            timeout: time
        });
    }

    return {
        load: function() {
            return new MyNoty();
        }
    }
}());

/*
var Noty = (function() {

    function display(type, text, time) {
        var n = noty({
            text: text,
            type: type,
            dismissQueue: true,
            layout: 'bottomCenter',
            theme: 'defaultTheme',
            maxVisible: 10,
            timeout: time
        });
    }

    function success(text) {
        display('success', text, 1500);
    }

    function error(text) {
        display('error', text, 1500);
    }

    return {
        success: success,
        error: error
    }
}());*/
