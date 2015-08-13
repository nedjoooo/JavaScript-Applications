(function() {
    var elementCounter = 1;
    $(document).ready(function() {
        $('#addingElement').on('click', addingElement);
    });

    function addingElement() {
        var newDiv = $('<div>').text('Element ' + elementCounter++);
        $('#elements').append(newDiv);
    }
})();