var book = book || {};

(function(scope) {
    function Books(baseUrl) {
        this.baseUrl = baseUrl;
    }

    Books.prototype.getAllBooks = function(success, error) {
        var request = scope.requester(this.baseUrl, success, error);
        return request.getRequest();
    };

    scope.books = function(baseUrl) {
        return new Books(baseUrl);
    }
}(book));