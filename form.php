<?php
/**
 * Created by PhpStorm.
 * User: Wei
 * Date: 5/8/2018
 * Time: 3:59 PM
 */

 class Response {
     public $cmd;
     public $appid;
     public $counter;
     public $clientHash;
     public $username;
 }

 /** Create response form */
$response = new Response;
 
$mode = isset($_POST['mode']) ? $_POST['mode'] : NULL;
$response->username = isset($_POST['username']) ? $_POST['username'] : NULL; /** Placeholder for user lookup */
$response->appid = isset($_POST['appid']) ? $_POST['appid'] : NULL;

$command = NULL;
$useCounter = NULL;
if ($mode = "enroll") {
    $command = 0;
    $useCounter = 0;
} else if ($mode = "sign") {
    $command = 1;
    $useCounter = 0; /** Placeholder for user tracking */
}

$response->cmd = $command;
session_start();
$response->clientHash = session_id();
$response->counter = $useCounter;

header('Content-Type: application/json; charset=utf-8');
$challengeJson = json_encode($response);
echo $challengeJson;
exit();