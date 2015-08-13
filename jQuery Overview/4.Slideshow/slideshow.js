(function() {

    var showingImageNumber = 1;
    var intervalInMillisec = 5000;

    $(document).ready(function() {

        $('#leftNavigationButton').on('click', leftMoving);
        $('#rightNavigationButton').on('click', rightMoving);

        setInterval(function () {
            $('#button-right').trigger('click');
        }, intervalInMillisec);

        function leftMoving() {
            if(showingImageNumber == 1) {
                showingImageNumber = 5;
            }

            $('#images-container').children().hide();
            showingImageNumber--;
            var selectorImage = '#image' + showingImageNumber;
            $(selectorImage).fadeIn(1000);
        }

        function rightMoving() {
            if(showingImageNumber == 4) {
                showingImageNumber = 0;
            }

            $('#images-container').children().hide();
            showingImageNumber++;
            var selectorImage = '#image' + showingImageNumber;
            $(selectorImage).fadeIn(1000);
        }
    })
})();