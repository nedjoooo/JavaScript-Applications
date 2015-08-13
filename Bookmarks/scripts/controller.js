var app = app || {};

app.controller = (function() {
    function BaseController(data) {
        this._data = data;
    }

    BaseController.prototype.loadHome = function(selector) {
        $(selector).load('templates/home.html');
    };

    BaseController.prototype.loadLogin = function(selector) {
        $(selector).load('templates/login.html');
    };

    BaseController.prototype.loadRegister = function(selector) {
        $(selector).load('templates/register.html');
    };

    BaseController.prototype.loadBookmarks = function(selector) {
        this._data.bookmarks.getAll()
            .then(function(data) {
                $.get('templates/bookmarks.html', function(template) {
                    var output = Mustache.render(template, data);
                    $(selector).html(output);
                })

            })
    };

    BaseController.prototype.atachEventHandlers = function() {
        var selector = '#wrapper';
        attachLoginHandler.call(this, selector);
        attachRegisterHandler.call(this, selector);
        attachCreateBookmarkHandler.call(this, selector);
        attachDeleteBookmarkHandler.call(this, selector);
    };

    function attachLoginHandler(selector) {
        var _this = this;
        $(selector).on('click', '#login', function() {
            var username = $('#username').val();
            var password = $('#password').val();
            _this._data.users.login(username, password)
                .then(function(data) {
                    window.history.replaceState('Bookmarks', 'Bookmarks', '#/bookmarks');
                }, function(error) {

                });
        })
    }

    function attachRegisterHandler(selector) {
        var _this = this;
        $(selector).on('click', '#register', function() {
            var username = $('#username').val();
            var password = $('#password').val();
            _this._data.users.register(username, password)
                .then(function(data) {
                    console.log(data);
                }, function(error) {

                });
        })
    }

    function attachCreateBookmarkHandler(selector) {
        var _this = this;
        $(selector).on('click', '#create-bookmark', function() {
            var title = $('#title').val();
            var bookmark = {
                title: title
            };
            _this._data.bookmarks.add(bookmark)
                .then(function(data) {
                    _this._data.bookmarks.getById(data.objectId)
                        .then(function(bookmark) {
                            var li = $('<li>').append(bookmark.title);
                            $('#bookmarks ul').append(li);
                            $('#title').val('');
                        }, function(error) {
                            console.log(error);
                        });
                }, function(error) {
                    console.log(error);
                });
        });
    }

    function attachDeleteBookmarkHandler(selector) {
        var _this = this;
        $(selector).on('click', '.delete-bookmark-btn', function(ev) {
            var deleteConfirm = confirm('Do you want to delete this bookmark!');
            //var li = $(ev.target).parent().children().first().textContent;
            if(deleteConfirm) {
                var objectId = $(this).parent().data('id');
                _this._data.bookmarks.remove(objectId)
                    .then(function(data) {
                        $(ev.target).parent().remove();
                    });
            }
        })
    }



    return {
        get: function(data) {
            return new BaseController(data);
        }
    }
}());