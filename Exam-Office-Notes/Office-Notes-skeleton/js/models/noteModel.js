var app = app || {};

app.noteModel = (function() {
    function NoteModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Note/';
        this.requester = requester;
        this.headers = headers;
    }

    NoteModel.prototype.listOfficeNotes = function() {
        var currentDateTime = new Date().toLocaleDateString();
        var splitCurrentDate = currentDateTime.split('/');
        for(var i = 0; i< splitCurrentDate.length; i++ ) {
            if(splitCurrentDate[i] < 10) {
                splitCurrentDate[i] = '0' + splitCurrentDate[i];
            }
        }
        var localDateString = splitCurrentDate[2] + '-' + splitCurrentDate[0] + '-' + splitCurrentDate[1];
        var deadlineIsoDate = new Date(Date.parse(localDateString)).toISOString();
        var questionUrlJson = '{"deadline":{"__type": "Date","iso":"' + deadlineIsoDate + '"}}';
        var getOfficeNotesUrl = this.serviceUrl + '?where=' + questionUrlJson;

        return this.requester.get(getOfficeNotesUrl, this.headers.getHeaders(true));
    };

    NoteModel.prototype.listUserNotes = function() {
        var fullName = sessionStorage['fullName'];
        //https://api.parse.com/1/classes/Note/?where={"author":"Tosho Toshev"}
        var getCurrentUserUrl = this.serviceUrl + '?where={"author":"' + fullName + '"}';
        return this.requester.get(getCurrentUserUrl, this.headers.getHeaders(true));
    };

    NoteModel.prototype.addNote = function(title, text, deadline) {
        console.log(typeof (deadline));
        var userId = sessionStorage['userId'];
        var deadlineIsoDate = new Date(Date.parse(deadline)).toISOString();
        var author = sessionStorage['fullName'];
        var data = {
            title: title,
            text: text,
            author: author,
            deadline: {
                "__type": "Date",
                "iso": deadlineIsoDate
            },
            ACL : {}
        };

        data.ACL[userId] = {"write":true,"read":true};
        data.ACL['*'] = {"read": true};

        return this.requester.post(this.serviceUrl, this.headers.getHeaders(true), data);

    };

    NoteModel.prototype.editNote = function(noteId, title, text, deadline) {
        var deadlineIsoDate = new Date(Date.parse(deadline)).toISOString();
        var data = {
            title: title,
            text: text,
            deadline: {
                "__type": "Date",
                "iso": deadlineIsoDate
            }
        };

        return this.requester.put(this.serviceUrl + noteId, this.headers.getHeaders(true), data);
    };

    NoteModel.prototype.deleteNote = function(noteId) {
        return this.requester.remove(this.serviceUrl + noteId, this.headers.getHeaders(true));
    };

    return {
        load: function(baseUrl, requester, headers) {
            return new NoteModel(baseUrl, requester, headers);
        }
    }
}());