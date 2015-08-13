var app = app || {};

app.ajaxRequester = (function() {
    function AjaxRequester() {
        this.get = makeGetRequest;
        this.post = makePostRequest;
        this.put = makePutRequest;
        this.delete = makeDeleteRequest;
    }

    var makeRequest = function(url, method, data, headers) {
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
    };

    var makeGetRequest = function(url, headers) {
        return makeRequest(url, 'get', null, headers);
    };

    var makePostRequest = function(url, data, headers) {
        return makeRequest(url, 'post', data, headers);
    };

    var makePutRequest = function(url, data, headers) {
        return makeRequest(url, 'put', data, headers);
    };

    var makeDeleteRequest = function(url, data, headers) {
        return makeRequest(url, 'delete', data, headers);
    };

    return {
        get: function() {
            return new AjaxRequester();
        }
    }
}());