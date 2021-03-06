$(function(){


    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("#enroll").submit(function(event){

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        $("#qrcode").css("display", "none");
        $("#qrcode").empty();
        $(".loader").css("display", "block");

        // Abort any pending request
        if (request) {
            request.abort();
        }

        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $appid = $form.find("[name='appid']");
        $appid[0].value = window.location.protocol + "//" + window.location.host + "/";
        
        var $inputs = $form.find("[name='username'],[name='mode'],[name='appid']");
        console.info($inputs);
        

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Construct Request Body
        var settings = {
            async: true,
            crossDomain: true,
            url: "https://35.233.128.50",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache",
            },
            processData: false,
            data: "{\n\t\"jsonrpc\" : \"2.0\",\n\t\"method\" : \"eth_sessionStart\",\n\t\"params\" : [],\n\t\"id\" : 74\n}"
        }

        // // Fire off the request to /form.php
        // request = $.ajax({
        //     url: "/form.php",
        //     type: "post",
        //     data: serializedData
        // });

        request = $.ajax(settings);

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            $(".loader").css("display", "none");
            $("#qrcode").css("display", "block");
            console.log("Hooray, it worked!");
            console.log(JSON.stringify(response));
            $('#qrcode').qrcode(JSON.stringify(response)); //Only takes string input
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

    });
    
    $("#sign").submit(function(event){

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        $("#qrcode").css("display", "none");
        $("#qrcode").empty();
        $(".loader").css("display", "block");

        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $appid = $form.find("[name='appid']");
        $appid[0].value = window.location.protocol + "//" + window.location.host + "/";
        
        var $inputs = $form.find("[name='username'],[name='mode'],[name='appid']");
        console.info($inputs);

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: "/form.php",
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            $(".loader").css("display", "none");
            $("#qrcode").css("display", "block");
            console.log("Hooray, it worked!");
            console.log(JSON.stringify(response));
            $('#qrcode').qrcode(JSON.stringify(response)); //Only takes string input
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

    });
});