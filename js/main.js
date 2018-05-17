$(function(){


    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $("#register").submit(function(event){

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        $("#qrcode").css("display", "none");
        $(".loader").css("display", "block");

        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

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
            console.log(response);
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