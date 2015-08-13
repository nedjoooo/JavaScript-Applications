var book = book || {};

(function(scope) {
    var model = scope.loadModels('https://api.parse.com/1/classes/');
    var viewModel = new scope.loadViewModel(model);
    viewModel.listAllBooks();
}(book));