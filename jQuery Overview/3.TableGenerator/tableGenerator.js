(function() {
    $(document).ready(function() {
        var cars = [
            {
                "manufacturer":"BMW",
                "model":"E92 320i",
                "year":2011,
                "price":50000,
                "class":"Family"
            },

            {
                "manufacturer":"Porsche",
                "model":"Panamera",
                "year":2012,
                "price":100000,
                "class":"Sport"
            },

            {
                "manufacturer":"Peugeot",
                "model":"305",
                "year":1978,
                "price":1000,
                "class":"Family"
            }

        ];

        $('#submit').on('click', generateTable);

        function generateTable() {
            var table = $('<table>').html(
                    '<thead>' +
                        '<tr>' +
                            '<th>Manufacturer</th>' +
                            '<th>Model</th>' +
                            '<th>Year</th>' +
                            '<th>Price</th>' +
                            '<th>Class</th>' +
                        '</tr>' +
                    '</thead>');

            $('#wrapper').append(table);
            $('table').css('border', '1px solid black');
            $('table').css('border-collapse', 'collapse');
            $('table').css('margin-top', '10px');
            $('th').css('border', '1px solid black');
            $('th').css('width', '120px');
            $('th').css('background-color', 'darkseagreen');

            var tbody = $('<tbody>');

            $(cars).each(function (_, car) {
                tbody
                    .append(
                    ($('<tr>').append($('<td>').html(car.manufacturer)))
                        .append($('<td>').html(car.model))
                        .append($('<td>').html(car.year))
                        .append($('<td>').html(car.price))
                        .append($('<td>').html(car.class))
                );
            });

            table.append(tbody);
            $('td').css('border', '1px solid black');
        }
    });


})();