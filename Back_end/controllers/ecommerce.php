<?php

require_once '../models/genFunction.php';
require_once '../configs/auth.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && empty($_POST)) {
   header("HTTP/1.1 200 Granted");
   $message = 'Allow: POST, GET, OPTIONS, DELETE, PUT';

} elseif (!isAuthenticated()){

   header('HTTP/1.1 403 Forbidden');
   $message = 'Acesso Negado';

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['id'])  ) { 
    
    header("Content-type:application/json");

     if(($_POST['id']) == '*') {
        $message =  json_encode(getAllProducts()); 
     } elseif (is_numeric($_POST['id'])) {
        $message =  json_encode(getProduct(($_POST['id']))); 
     } else {
        header("HTTP/1.1 400 Bad request");
        $message = 'Requisição inválida!';
     }

} else {
    header('HTTP/1.1 400 Bad request');
    $message = 'Dados Inválidos';
}

echo $message; 
die;


