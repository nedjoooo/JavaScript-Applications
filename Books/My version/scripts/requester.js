var book = book || {};

(function(scope) {
    function Requester(url, success, error, data) {
        this.url = url;
        this.success = success;
        this.error = error;
        this.data = data;
    }

    function makeRequest(method) {
        $.ajax({
            method: method,
            headers: {
                'X-Parse-Application-Id': '39LWxMacZqOVsuA1MBFdQJj0ufcTV0x352PdCbBZ',
                'X-Parse-REST-API-Key': '79cUg9Khz00djXXq8U72XQ7rbDCf7c24RUxsggYl'
            },
            url: this.url,
            contentType: 'application/json',
            data: JSON.stringify(this.data),
            success: this.success,
            error: this.error
        })
    }

    Requester.prototype.getRequest = function() {
        makeRequest('get');
    };
    /*var Requester = (function() {
        function makeRequest(method, url, data, success, error) {
            $.ajax({
                method: method,
                headers: {
                    'X-Parse-Application-Id': '39LWxMacZqOVsuA1MBFdQJj0ufcTV0x352PdCbBZ',
                    'X-Parse-REST-API-Key': '79cUg9Khz00djXXq8U72XQ7rbDCf7c24RUxsggYl'
                },
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: success,
                error: error
            })
        }

        function getRequest(url, success, error) {
            makeRequest('get', url, null, success, error);
        }

        function postRequest(url, data, success, error) {
            makeRequest('post', url, data, success, error);
        }

        function deleteRequest(url, success, error) {
            makeRequest('delete', url, null, success, error);
        }

        return {
            getRequest: getRequest,
            postRequest: postRequest,
            deleteRequest: deleteRequest
        }
    }());*/

    scope.requester = function(url, success, error, data) {
        return new Requester(url, success, error, data);
    }
}(book));