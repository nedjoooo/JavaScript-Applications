(function() {
    $(function() {
        var X_Parse_Application_Id = 'JGPf27JyKyTaLEB4m3gfvwarLio0UK2DQEWS2DML';
        var X_Parse_REST_API_Key = 'uKJpPtSa0AzxxwOisMYeAngAeWR7JU7wjstg6FmP';
        var URL_COUNTRIES = 'https://api.parse.com/1/classes/Country';
        var URL_TOWNS = 'https://api.parse.com/1/classes/Town';



        loadCountries();

        function loadCountries() {
            $.ajax({
                method: 'get',
                headers: {
                    "X-Parse-Application-Id": X_Parse_Application_Id,
                    "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                },
                url: URL_COUNTRIES,
                success: getCountries
            });
        }

        function getCountries(data) {
            $('#countriesList li').remove();
            data.results.forEach(function(item) {
                appendCountryToList(item);
            })
        }

        $('#addCountry').on('click', function() {
            var country = $('#countryName').val();
            $.ajax({
                method: 'post',
                headers: {
                    "X-Parse-Application-Id": X_Parse_Application_Id,
                    "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                },
                url: URL_COUNTRIES,
                data: JSON.stringify({
                    "name": country
                }),
                success: loadCountries
            });
        })

        function appendCountryToList(item) {
            var itemId = item.objectId;

            var countryLi = $('<li>');

            var countryLink = $("<a href='#'>").text(item.name);
            countryLink.attr('class', itemId);
            countryLink.on('click', loadTowns);

            countryLi.append(countryLink);

            var deleteButton = $('<button>');
            deleteButton.text('Delete');
            deleteButton.on('click', function() {
                $.ajax({
                    method: 'delete',
                    headers: {
                        "X-Parse-Application-Id": X_Parse_Application_Id,
                        "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                    },
                    url: URL_COUNTRIES + '/' + itemId,
                    success: loadCountries
                })
            });

            var editButton = $('<button>');
            editButton.text('Edit');
            editButton.on('click', function() {
                var editDiv = $('<div>');
                editDiv.attr('id', 'editDiv')
                var editInput = $('<input>');
                editInput.type = 'text';
                editInput.attr('id', 'editInput');
                var editButtonOK = $('<button>');
                editButtonOK.text('OK');

                editDiv.append(editInput);
                editDiv.append(editButtonOK);

                countryLi.append(editDiv);

                editButtonOK.on('click', function() {
                    var newCountryName = $('#editInput').val();
                    $.ajax({
                        method: 'put',
                        headers: {
                            "X-Parse-Application-Id": X_Parse_Application_Id,
                            "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                        },
                        url: URL_COUNTRIES + '/' + itemId,
                        data: JSON.stringify({
                            "name": newCountryName
                        }),
                        success: [loadCountries, removeEditSection]
                    })
                })
            })

            countryLi.append(deleteButton);
            countryLi.append(editButton);

            $('#countriesList').append(countryLi);
        }

        function removeEditSection() {
            $('#editDiv').remove();
        }

        function loadTowns() {
            removeTownsSection();
            var townsListDiv = $('<div>').attr('id', 'townsListDiv');
            var townAddButton = $('<button>').attr('id', 'townAddButton');
            townAddButton.text('Add town');
            var townInputField = $('<input>').attr('id', 'townInputField');

            townsListDiv.append(townAddButton);
            townsListDiv.append(townInputField);

            $('#townInDiv').append(townsListDiv);

            var countryId = this['className'];

            townAddButton.on('click', function() {
                var town = $('#townInputField').val();
                $.ajax({
                    method: 'post',
                    headers: {
                        "X-Parse-Application-Id": X_Parse_Application_Id,
                        "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                    },
                    url: URL_TOWNS,
                    data: JSON.stringify({
                        "name": town,
                        'country': {
                            "__type": "Pointer",
                            "className": "Country",
                            "objectId": countryId
                        }
                    }),
                    success: loadingCountryTowns
                });
            });

            loadingCountryTowns();

            function loadingCountryTowns() {
                $.ajax({
                    method: 'get',
                    headers: {
                        "X-Parse-Application-Id": X_Parse_Application_Id,
                        "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                    },
                    url: 'https://api.parse.com/1/classes/' +
                        'Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' +
                        countryId + '"}}&keys=name',
                    success: getTowns
                });
            }

        }

        function getTowns(data) {
            $('#townList li').remove();
            data.results.forEach(function(item) {
                appendTownToList(item);
            })
        }

        function appendTownToList(item) {
            var itemId = item.objectId;

            var townLi = $('<li>');

            var townSpan = $('<span>').text(item.name);

            townLi.append(townSpan);

            var deleteButton = $('<button>');
            deleteButton.text('Delete');
            deleteButton.on('click', function() {
                $.ajax({
                    method: 'delete',
                    headers: {
                        "X-Parse-Application-Id": X_Parse_Application_Id,
                        "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                    },
                    url: URL_TOWNS + '/' + itemId,
                    success: loadTowns
                })
            });

            var editButton = $('<button>');
            editButton.text('Edit');
            editButton.on('click', function() {
                var editDiv = $('<div>');
                editDiv.attr('id', 'editTownDiv')
                var editInput = $('<input>');
                editInput.type = 'text';
                editInput.attr('id', 'editTownInput');
                var editTownButtonOK = $('<button>');
                editTownButtonOK.text('OK');

                editDiv.append(editInput);
                editDiv.append(editTownButtonOK);

                townLi.append(editDiv);

                editTownButtonOK.on('click', function() {
                    var newTownName = $('#editTownInput').val();
                    $.ajax({
                        method: 'put',
                        headers: {
                            "X-Parse-Application-Id": X_Parse_Application_Id,
                            "X-Parse-REST-API-Key": X_Parse_REST_API_Key
                        },
                        url: URL_TOWNS + '/' + itemId,
                        data: JSON.stringify({
                            "name": newTownName
                        }),
                        success: [removeTownEditSection, loadTowns]
                    })
                })
            })

            townLi.append(deleteButton);
            townLi.append(editButton);

            $('#townList').append(townLi);
        }

        function removeTownEditSection() {
            $('#townList li').remove();
        }

        function removeTownsSection() {
            $('#townsListDiv').remove();
        }
    })
}());