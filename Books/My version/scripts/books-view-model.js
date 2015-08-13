var book = book || {};

(function(scope) {
    function ViewModel(model) {
        this.model = model;
    }

    ViewModel.prototype.listAllBooks = function() {
        this.model.books.getAllBooks(
            function(booksData) {
                console.log(booksData);
            },
            function(error) {
                console.log(error.responseText);
            }
        )
    }

    scope.loadViewModel = function(model) {
        return new ViewModel(model);
    }
}(book));