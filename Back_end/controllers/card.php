<?php

require_once '../models/genFunction.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && empty($_POST)) {
    header("HTTP/1.1 200 Granted");
    $message = 'Allow: POST, GET, OPTIONS, DELETE, PUT';

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['id_categoria'])  ) {
    
    header("Content-type:application/json");
    echo json_encode(getCards($_POST['id_categoria'])); 

}   
//DEBUG CODE
/*elseif ($_SERVER['REQUEST_METHOD'] === 'GET'&& !empty($_GET['id_categoria'])) {
    
    header("Content-type:application/json");
    print_r(getCards($_GET['id_categoria'])); 

}*/
else header("HTTP/1.1 400 Bad request");
die;