var book = book || {};

(function(scope) {
    function Models(baseUrl) {
        this.baseUrl = baseUrl;
        this.books = scope.books(baseUrl);
    }

    scope.loadModels = function(baseUrl) {
        return new Models(baseUrl);
    }
}(book));