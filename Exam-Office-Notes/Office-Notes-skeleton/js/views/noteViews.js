var app = app || {};

app.noteViews = (function() {
    function NoteViews() {
        this.addNote = {
            addNoteView: addNoteView
        };
        this.listNotes = {
            listNotesView: listNotesView
        };
        this.listUserNotes = {
            listUserNotesView: listUserNotesView
        };
        this.editNote = {
            editNoteView: editNoteView
        };
        this.deleteNote = {
            deleteNoteView: deleteNoteView
        }
    }

    function deleteNoteView(selector, controller, dataId) {
        $.get('templates/deleteNote.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml)
        }).then(function() {
            $('#deleteNoteButton').click(function() {
                return controller.deleteNote(dataId);
            })
        })
    }

    function editNoteView(selector, controller, noteId) {
        $.get('templates/editNote.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#editNoteButton').click(function() {
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();
                return controller.editNote(noteId, title, text, deadline);
            })
        }).done();
    }

    function addNoteView(selector, controller) {
        $.get('templates/addNote.html', function(template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function() {
            $('#addNoteButton').click(function() {
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();
                return controller.addNote(title, text, deadline);
            })
        }).done();
    }

    function listNotesView(selector, data) {
        for(var i = 0; i< data.results.length; i++) {
            var date = data.results[i].deadline.iso;
            var splitDate = date.split('T');
            var submittedDate = splitDate[0];
            data.results[i].deadline = submittedDate;
        }
        $.get('templates/officeNoteTemplate.html', function(template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });
    }

    function listUserNotesView(selector, data) {
        for(var i = 0; i< data.results.length; i++) {
            var date = data.results[i].deadline.iso;
            var splitDate = date.split('T');
            var submittedDate = splitDate[0];
            data.results[i].deadline = submittedDate;
        }
        $.get('templates/myNoteTemplate.html', function(template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });
    }

    return {
        load: function () {
            return new NoteViews();
        }
    }
}());