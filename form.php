<?php
/**
 * Created by PhpStorm.
 * User: Wei
 * Date: 5/8/2018
 * Time: 3:59 PM
 */

$mode = isset($_POST['mode']) ? $_POST['mode'] : null;
$username = isset($_POST['username']) ? $_POST['username'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

$command = NULL;
$clientHash = "";
$useCounter = NULL;
if ($mode = "enroll") {
    $command = 0;
    $useCounter = 0;
} else if ($mode = "sign") {
    $command = 1;
}

$challenge->command = $command;
session_start();
$challenge->clientHash = session_id();
$challenge->useCounter = $useCounter;


header('Content-Type: application/json');
$challengeJson = json_encode($challenge);
echo $challengeJson;
exit();