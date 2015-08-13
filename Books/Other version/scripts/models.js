var book = book || {};

book.models = (function() {
    function Models(baseUrl) {
        this.serviceUrl = baseUrl;
        this.books = new Books(this.serviceUrl);
    }

    var Requester = (function() {
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

        function putRequest(url, data, success, error) {
            makeRequest('put', url, data, success, error);
        }

        return {
            getRequest: getRequest,
            postRequest: postRequest,
            deleteRequest: deleteRequest,
            putRequest: putRequest
        }
    }());

    var Books = (function() {
        function Books(baseUrl) {
            this.serviceUrl = baseUrl + 'Student/';
        }

        Books.prototype.getAllBooks = function(success, error) {
            return Requester.getRequest(this.serviceUrl, success, error);
        };

        Books.prototype.postBook = function(book, success, error) {
            return Requester.postRequest(this.serviceUrl, book, success, error);
        };

        Books.prototype.removeBook = function(id, success, error) {
            return Requester.deleteRequest(this.serviceUrl + id, success, error);
        };

        Books.prototype.editBook = function(id, data, success, error) {
            return Requester.putRequest(this.serviceUrl + id, data, success, error)
        };

        return Books;
    }());

    return {
        loadModels: function(baseUrl) {
            return new Models(baseUrl);
        }
    }
}());