<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>U2F Dummy Client/Server</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <p>U2F Dummy</p>

        <form id="enroll" name="enroll-form" method="post" action="form.php">
            <input type="hidden" name="mode" value="enroll"/>
            <input type="hidden" name="appid" value=""/>
            <input type="text" name="username" placeholder="Username" autofocus="autofocus" required/>
            <input type="password" name="password" placeholder="Password" required/>
            <br />
            <input type="submit" class="btn btn-success" value="Register" />
        </form>

        <form id="sign" name="sign-form" method="post">
            <div class="span6">
                <input type="hidden" name="mode" value="sign"/>
                <input type="hidden" name="appid" value=""/>
                <input type="text" name="username" placeholder="Username" autofocus="autofocus" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <br />
                <input type="submit" class="btn btn-success" value="Login" />
            </div>
        </form>
        <div class="loader"></div>
        <div id="qrcode"></div>

        <script src="js/vendor/modernizr-3.5.0.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-3.2.1.min.js"><\/script>')</script>
        <script type="text/javascript" src="js/jquery.qrcode.min.js"></script>
        <script src="js/json2.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
