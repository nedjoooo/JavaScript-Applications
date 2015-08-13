var app = app || {};

(function(scope) {
    function Requester(baseUrl) {
        this.baseUrl = baseUrl;
    }

    Requester.prototype.getRequester = function(serviceUrl) {
        var headers = getHeaders();
        var url = this.baseUrl + serviceUrl;
        return makeRequest('get', headers, url);
    };

    function makeRequest(method, headers, url, data) {
        var deffer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: JSON.stringify(data),
            success: function(data) {
                deffer.resolve(data);
            },
            error: function(error) {
                deffer.reject(error);
            }
        });

        return deffer.promise;
    }

    function getHeaders() {
        var headers = {
            'X-Parse-Application-Id': '39LWxMacZqOVsuA1MBFdQJj0ufcTV0x352PdCbBZ',
            'X-Parse-REST-API-Key': '79cUg9Khz00djXXq8U72XQ7rbDCf7c24RUxsggYl',
            'Content-Type': 'application/json'
        };
        if(sessionStorage['logged-in']) {
            headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        }

        return headers;
    }

    scope.getRequest = function(baseUrl) {
        return new Requester(baseUrl);
    }
}(app));