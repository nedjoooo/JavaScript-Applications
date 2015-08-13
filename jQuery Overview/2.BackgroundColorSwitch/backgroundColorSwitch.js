(function() {
    $(document).ready(function() {
        $('#submit').on('click', paintElement);
    });

    function paintElement() {
        var paint = $('#color').val();
        $('.bird').css('background-color', paint);
    }
})();