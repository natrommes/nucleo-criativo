<?php

require_once '../models/genFunction.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && empty($_POST)) {
    header("HTTP/1.1 200 Granted");
    $message = 'Allow: POST, GET, OPTIONS, DELETE, PUT';

} else {
header("HTTP/1.1 200 Granted");
echo logout();
}

die;
