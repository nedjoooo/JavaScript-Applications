var app = app || {};

app.noteController = (function() {
    function NoteController(model, views) {
        this.model = model;
        this.viewBag = views;
    }

    NoteController.prototype.listOfficeNotes = function(selector) {
        var _this = this;
        return this.model.listOfficeNotes(selector)
            .then(function(data) {
                _this.viewBag.listNotes.listNotesView(selector, data);
            }, function(error) {
                console.log(error);
            });
    };

    NoteController.prototype.listCurrentUserNotes = function(selector) {
        var _this = this;
        return this.model.listUserNotes(selector)
            .then(function(data) {
                _this.viewBag.listUserNotes.listUserNotesView(selector, data);
            }, function(error) {
                console.log(error);
            });
    };

    NoteController.prototype.addNote = function(title, text, deadline) {
        return this.model.addNote(title, text, deadline)
            .then(function() {
                window.location.replace('#/myNotes/');
                console.log('Success added product.');
            }).done();
    };

    NoteController.prototype.loadAddNotesView = function(selector) {
        this.viewBag.addNote.addNoteView(selector, this);
    };

    NoteController.prototype.loadEditNoteView = function(selector, urlParams) {
        //var outData = getUrlParams(urlParams);
        //this.viewBag.editPhone.editPhoneView(selector, this, outData);
    };

    NoteController.prototype.loadDeleteNoteView = function(selector) {
        this.viewBag.deleteNote.deleteNoteView(selector, this);
    };

    NoteController.prototype.deleteNote = function(noteId) {
        return this.model.deleteNote(noteId)
            .then(function(data) {
                window.location.replace('#/myNotes/');
            }, function(error) {
                console.log(error);
            });
    };

    NoteController.prototype.editNote = function(noteId, title, text, deadline) {
        return this.model.editNote(noteId, title, text, deadline)
            .then(function(data) {
                window.location.replace('#/myNotes/');
            }, function(error) {
                console.log(error);
            });
    };

    NoteController.prototype.attachEventHandlers = function () {
        var selector = '#container';
        attachEditNoteHandler.call(this, selector);
        attachDeleteNoteHandler.call(this, selector);
    };

    function attachEditNoteHandler(selector) {
        var _this = this;
        $(selector).on('click', '.edit', function(ev) {
            var objectId = $(this).parent().data('id');
            _this.viewBag.editNote.editNoteView(selector, _this, objectId);
            //var deleteConfirm = confirm('Do you want to delete this note!');
            //if(deleteConfirm) {
                //var objectId = $(this).parent().data('id');
                //_this.viewBag.editNote.deleteNoteView(selector, _this, objectId);
                //window.location.replace('#/myNotes/');
                /*_this.model.deleteNote(objectId)
                    .then(function(data) {
                        $(ev.target).parent().parent().remove();
                        window.location.replace('#/myNotes/');
                    });*/
            //}
        })
    }

    function attachDeleteNoteHandler(selector) {
        var _this = this;
        $(selector).on('click', '.delete', function(ev) {
                var objectId = $(this).parent().data('id');
                _this.viewBag.deleteNote.deleteNoteView(selector, _this, objectId);
                window.location.replace('#/myNotes/');
        })
    }

    return {
        load: function(model, views) {
            return new NoteController(model, views);
        }
    }
}());