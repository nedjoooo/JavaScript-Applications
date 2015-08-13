var book = book || {};

book.viewModel = (function() {
    function ViewModel(model) {
        this.model = model;
        this.attachEventListeners(this);
    }

    ViewModel.prototype.listAllBooks = function() {
        var _this = this;
        this.model.books.getAllBooks(
            function(booksData) {
                booksData.results.forEach(function(book) {
                    _this.addStudentToDom(book.name, book.author, book.isbn, book.objectId);
                })
            },
            function(error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.addBook = function(viewModel) {
        var _this = this;
        var bookName = $('#book-name').val();
        var bookAuthor = $('#book-author').val();
        var bookIsbn = $('#book-isbn').val();
        viewModel.model.books.postBook(
            {
                title: bookName,
                author: bookAuthor,
                isbn: bookIsbn
            },
            function(data) {
                _this.addStudentToDom(bookName, bookAuthor, bookIsbn, data.objectId);
            },
            function(error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.deleteBook = function(bookId) {
        this.model.books.removeBook(bookId,
            function(data) {
                $('#book-container')
                    .find('[data-id = ' + bookId + ']').remove();
            },
            function(error) {
                console.log(error);
            }
        );
    };

    ViewModel.prototype.attachEventListeners = function(viewModel) {
        $('#add-student').click(function() {
            viewModel.addStudent(viewModel);
        });
    };

    ViewModel.prototype.addBookToDom = function(name, author, isbn, bookId) {
        var _this = this;
        var bookWrapper = $('<div>').addClass('book-list').attr('data-id', bookId);
        var book = $('<p>').text('Book');
        var bookName = $('<p>').text('Name: ' + name);
        var bookAuthor = $('<p>').text('Author: ' + author);
        var bookIsbn = $('<p>').text('ISBN: ' + isbn);
        var deleteButton = $('<button>').text('Delete').addClass('delete-book');
        var editButton = $('<button>').text('Edit').addClass('edit-book');

        deleteButton.click(function() {
            _this.deleteBook(bookId);
        });

        editButton.click(function() {
            var editBookNameInput = $('<input>').type('text').attr('id', 'bookName' + bookId).attr('placeholder', 'Edit book name');
            var editBookAuthorInput = $('<input>').type('text').attr('id', 'bookAuthor' + bookId).attr('placeholder', 'Edit book author');
            var editBookIsbnInput = $('<input>').type('text').attr('id', 'bookIsbn' + bookId).attr('placeholder', 'Edit book isbn');
            var editOKButton = $('<button>').text('OK');
            var editP = $('<p>').append(editInput).append(editOKButton);
            bookWrapper.append(editP);

            editOKButton.click(function() {
                var editName = $('bookName' + bookId).val();
                var editAuthor = $('bookAuthor' + bookId).val();
                var editIsbn = $('bookIsbn' + bookId).val();
                _this.editBook(bookId)
            })
        });

        bookWrapper.append(book).append(bookName).append(bookAuthor).append(bookIsbn).append(deleteButton).append(editButton);
        $('#student-container').append(studentWrapper);
    }

    return {
        loadViewModel: function(model) {
            return new ViewModel(model);
        }
    }
}());