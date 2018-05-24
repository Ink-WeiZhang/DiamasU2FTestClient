$(function(){


    // Variables to hold requests
    var getSessionIDRequest;
    var getChallengeRequest;

    // Registration Event
    $("#enroll").submit(function(event){

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        $("#qrcode").css("display", "none");
        $("#qrcode").empty();
        $(".loader").css("display", "block");

        // Abort any pending request
        if (getChallengeRequest) {
            getChallengeRequest.abort();
        }
        if (getSessionIDRequest) {
            getSessionIDRequest.abort();
        }

        // Local Variables
        var $form = $(this);
        var sessionID;

        // Let's select and cache all the fields
        var $appid = $form.find("[name='appid']");
        $appid[0].value = window.location.protocol + "//" + window.location.host + "/";
        var $inputs = $form.find("[name='username'],[name='mode'],[name='appid']");
        var $username = $form.find("[name='username']");
        console.info($inputs);

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        /* -----------------------------------------------------------------------------------------------------------------------------------*/
        /* -------------------------------------------------------- Get the sessionID --------------------------------------------------------*/
        /* -----------------------------------------------------------------------------------------------------------------------------------*/
        var getSessionIDSettings = {
            async: true,
            crossDomain: true,
            url: "http://35.233.128.50",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache",
            },
            processData: false,
            data: "{\n\t\"jsonrpc\" : \"2.0\",\n\t\"method\" : \"eth_sessionStart\",\n\t\"params\" : [],\n\t\"id\" : 74\n}"
        }

        getSessionIDRequest = $.ajax(getSessionIDSettings);

        // Callback handler that will be called on success
        getSessionIDRequest.done(function (response, textStatus, jqXHR){
            console.log("Successfully retrieved session ID");
            console.log(JSON.stringify(response));
            sessionID = response.result;

            /* -----------------------------------------------------------------------------------------------------------------------------------*/
            /* -------------------------------------------------------- Get the Challenge --------------------------------------------------------*/
            /* -----------------------------------------------------------------------------------------------------------------------------------*/
            // Construct Request Body
            var regStartObj = {};
            regStartObj["cmd"] = 1100;
            var regStartMsg = {};
            regStartMsg["appID"] = $appid.toString();
            regStartMsg["userName"] = $username.toString();
            regStartMsg["sessionID"] = sessionID;
            regStartObj["message"] = regStartMsg;
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
                data: regStartObj
            }

            getChallengeRequest = $.ajax(settings);
            
            // Callback handler that will be called on success
            getChallengeRequest.done(function (response, textStatus, jqXHR){
                $(".loader").css("display", "none");
                $("#qrcode").css("display", "block");
                console.log("Hooray, it worked!");
                console.log(JSON.stringify(response));

                var jsonData = {};
                jsonData["cmd"] = 1100;
                jsonData["appID"] = $appid.toString();
                jsonData["challenge"] = response.challenge;
                jsonData["sessionID"] = sessionID;
                jsonData["counter"] = 0;

                $('#qrcode').qrcode(JSON.stringify(jsonData)); //Only takes string input
            });

            // Callback handler that will be called on failure
            getChallengeRequest.fail(function (jqXHR, textStatus, errorxThrown){
                // Log the error to the console
                console.error("Status :" + jqXHR.status);
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            getChallengeRequest.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            });
        });

        // Callback handler that will be called on failure
        getSessionIDRequest.fail(function (jqXHR, textStatus, errorxThrown){
            // Log the error to the console
            console.error("Status :" + jqXHR.status);
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        getSessionIDRequest.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });


        

    });

    // Login(Authorization) Event
    $("#sign").submit(function(event){

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        $("#qrcode").css("display", "none");
        $("#qrcode").empty();
        $(".loader").css("display", "block");

        // Abort any pending request
        if (getChallengeRequest) {
            getChallengeRequest.abort();
        }
        if (getSessionIDRequest) {
            getSessionIDRequest.abort();
        }

        // Local Variables
        var $form = $(this);
        var sessionID;

        // Let's select and cache all the fields
        var $appid = $form.find("[name='appid']");
        $appid[0].value = window.location.protocol + "//" + window.location.host + "/";
        var $inputs = $form.find("[name='username'],[name='mode'],[name='appid']");
        var $username = $form.find("[name='username']");
        console.info($inputs);

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        /* -----------------------------------------------------------------------------------------------------------------------------------*/
        /* -------------------------------------------------------- Get the sessionID --------------------------------------------------------*/
        /* -----------------------------------------------------------------------------------------------------------------------------------*/
        var getSessionIDSettings = {
            async: true,
            crossDomain: true,
            url: "http://35.233.128.50",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache",
            },
            processData: false,
            data: "{\n\t\"jsonrpc\" : \"2.0\",\n\t\"method\" : \"eth_sessionStart\",\n\t\"params\" : [],\n\t\"id\" : 74\n}"
        }

        getSessionIDRequest = $.ajax(getSessionIDSettings);

        // Callback handler that will be called on success
        getSessionIDRequest.done(function (response, textStatus, jqXHR){
            console.log("Successfully retrieved session ID");
            console.log(JSON.stringify(response));
            sessionID = response.sessionID;

            /* -----------------------------------------------------------------------------------------------------------------------------------*/
            /* -------------------------------------------------------- Get the Challenge --------------------------------------------------------*/
            /* -----------------------------------------------------------------------------------------------------------------------------------*/
            // Construct Request Body
            var regStartObj = {};
            regStartObj["cmd"] = 1102;
            var regStartMsg = {};
            regStartMsg["appID"] = $appid.toString();
            regStartMsg["userName"] = $username.toString();
            regStartObj["message"] = regStartMsg;
            regStartObj["sessionID"] = sessionID;
            var settings = {
                async: true,
                crossDomain: true,
                url: "http://35.233.128.50",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cache-Control": "no-cache",
                },
                data: regStartObj
            }

            getChallengeRequest = $.ajax(settings);
        });

        // Callback handler that will be called on failure
        getSessionIDRequest.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error("Status :" + jqXHR.status);
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        getSessionIDRequest.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });


        // Callback handler that will be called on success
        getChallengeRequest.done(function (response, textStatus, jqXHR){
            $(".loader").css("display", "none");
            $("#qrcode").css("display", "block");
            console.log("Hooray, it worked!");
            console.log(JSON.stringify(response));

            var jsonData = {};
            jsonData["cmd"] = 1102;
            jsonData["keyHandle"] = response.keyHandle;
            jsonData["challenge"] = response.challenge;
            jsonData["sessionID"] = sessionID;
            jsonData["counter"] = response.counter;

            $('#qrcode').qrcode(JSON.stringify(jsonData)); //Only takes string input
        });

        // Callback handler that will be called on failure
        getChallengeRequest.fail(function (jqXHR, textStatus, errorxThrown){
            // Log the error to the console
            console.error("Status :" + jqXHR.status);
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        getChallengeRequest.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

    });
});