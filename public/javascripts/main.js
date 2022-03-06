function test_print(){
	console.log("test code")
}

$(document).ready(function () {
    
    //when a user click the "submit" button
    $("#form1").submit(function (event) {
        event.preventDefault();
        console.log($('#form1').serialize()) //username=jpark&fullname=Jihwan&age=30
        $.ajax({
            type: 'POST',
            url: '/',
            data: $('#form1').serialize(),
            dataType: "json",
            success: function (response) {
                clearInputs();
                Show();
            },
            error: function () {
            }
        })
    });


    //update data in the table
    $('table').on('click', '.update-button', function () {
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();
        let fullname = rowEl.find('.fullname').val();
        let username = rowEl.find('.username').val();
        let age = rowEl.find('.age').val();

        //
        $.ajax({
            url: '/user/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ fullname: fullname, username: username, age: age }),
            success: function (response) {
                console.log(response);
                $("#showBtn").click();
            }
        });

    });

    //delete a row in the table
    $('table').on('click', '.delete-button', function () {
        let rowEl = $(this).closest('tr');
        let id = rowEl.find('.id').text();

        $.ajax({
            url: '/user/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                console.log("response" + response);
                $("#showBtn").click();
            }
        });
    });

    //show the tables/data
    $("#Load").click(function () {
        let tbodyE1 = $("#myTable > tbody")

        tbodyE1.html('');

        $.getJSON( "favs.json",  function(data){
            console.log("data" + data);
            $.each(data, function (tweet) {
                
                tbodyE1.append('\
                <tr>\
                <td class="id">' + tweet.unique_id + '</td>\
                <td><input type="text" class="fullname form-control" value="' + tweet.text + '"></td>\
                <td><input type="text" class="username form-control" value="' + tweet.userid + '"></td>\
                <td>\
                <button class="update-button btn btn-secondary">UPDATE</button>\
                <button class="delete-button btn btn-danger">DELETE</button>\
                </td>\
                </tr>\
                ')
            })
        })
    });


    function Show() {
        $.ajax({
            type: 'GET',
            url: '/show',
            dataType: "json",
            data: parse_json(),
            success: function (response) {
                console.log(response);
                // let tbodyEl = $('tbody');
                let tbodyEl = $("#myTable > tbody")

                tbodyEl.html('');

                response.forEach(function (tweet) {
                    tbodyEl.append('\
                        <tr>\
                        <td class="id">' + tweet.unique_id + '</td>\
                        <td><input type="text" class="Text form-control" value="' + tweet.text + '"></td>\
                        <td><input type="text" class="UserId form-control" value="' + tweet.userid + '"></td>\
                        <td>\
                        <button class="update-button btn btn-secondary">UPDATE</button>\
                        <button class="delete-button btn btn-danger">DELETE</button>\
                        </td>\
                        </tr>\
                        ');
                });
            },
            error: function () {
            }
        })
    }

    //initialize input fields
    function clearInputs() {
        $("#username").val('');
        $("#fullname").val('');
        $("#age").val('');
    }

});
