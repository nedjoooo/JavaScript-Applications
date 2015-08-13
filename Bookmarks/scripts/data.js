var app = app || {};

app.data = (function() {
    function Data(baseUrl, ajaxRequester) {
        this.users = new Users(baseUrl, ajaxRequester);
        this.bookmarks = new Bookmarks(baseUrl, ajaxRequester);
    }

    var cradentials = (function() {
        var headers = {
            'X-Parse-Application-Id': 'QZDq8Rro1Gfrc3ph9smGVOOocpTeNFWuKiDZD0Xr',
            'X-Parse-REST-API-Key': 'iNS2encJtqlQHknbyfbXY2G9Vr5xmoKSx9evrSyL',
            'X-Parse-Session-Token': getSessionToken()
        };

        function getSessionToken() {
            localStorage.getItem('sessionToken');
        }

        function setSessionToken(sessionToken) {
            localStorage.setItem('sessionToken', sessionToken);
        }

        function getUsername() {
            localStorage.getItem('username');
        }

        function setUsername(sessionToken) {
            localStorage.setItem('username', sessionToken);
        }

        function getHeaders() {
            return headers;
        }

        return {
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUsername: getUsername,
            setUsername: setUsername,
            getHeaders: getHeaders
        }
    }());

    var Users = (function() {
        function Users(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl;
            this._ajaxRequester = ajaxRequester;
            this._headers = cradentials.getHeaders();
        }

        Users.prototype.login = function(username, password) {
            var url = this._serviceUrl + 'login?username=' + username + '&password=' + password;
            return this._ajaxRequester.get(url, this._headers)
                .then(function(data) {
                    cradentials.setSessionToken(data.sessionToken);
                    cradentials.setUsername(data.username);
                    return data;
                });
        };

        Users.prototype.register = function(username, password) {
            var user = {
                username: username,
                password: password
            };
            var url = this._serviceUrl + 'users';
            return this._ajaxRequester.post(url, user, this._headers)
                .then(function(data) {
                    cradentials.setSessionToken(data.sessionToken);
                    return data;
                });
        };

        Users.prototype.validateToken = function(accessToken) {

        };

        return Users;
    }());

    var Bookmarks = (function() {
        function Bookmarks(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl + 'classes/Bookmarks';
            this._ajaxRequester = ajaxRequester;
            this._headers = cradentials.getHeaders();
        }

        Bookmarks.prototype.getAll = function() {
            return this._ajaxRequester.get(this._serviceUrl, this._headers);
        };

        Bookmarks.prototype.add = function(bookmark) {
            return this._ajaxRequester.post(this._serviceUrl, bookmark, this._headers);
        };

        Bookmarks.prototype.getById = function(objectId) {
            return this._ajaxRequester.get(this._serviceUrl + '/' + objectId, this._headers);
        };

        Bookmarks.prototype.remove = function(objectId) {
            return this._ajaxRequester.delete(this._serviceUrl + '/' + objectId, null, this._headers);
        };

        return Bookmarks;
    }());

    return {
        get: function(baseUrl, ajaxRequester) {
            return new Data(baseUrl, ajaxRequester);
        }
    }
}());