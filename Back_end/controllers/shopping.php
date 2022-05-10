<?php

require_once '../models/genFunction.php';
require_once '../configs/auth.php';


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');
header("Content-type:application/json");

//Now we receive the encrypted from the post, we should decode it from base64,
//'3H0E+7MHOp6AbQNu2owMxv4kVFENQCusZdtQVe1dIKwNfxts0tfN8qStYaUF7BFgYlnchJ2PpdCDJcS6/rG7X2jdaiaPuP4GhTtZN8ktmT+HRv9z2qH8qMhIcb6AO/n40qQdWwjBOhHOxNJPKP5/+g=='

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && empty($_POST)) {
    header("HTTP/1.1 200 Granted");
    $message = 'Allow: POST, GET, OPTIONS, DELETE, PUT';

} elseif (!isAuthenticated()){

    header('HTTP/1.1 403 Forbidden');
    $message = 'Acesso Negado';
 
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST'){

    if (!empty($_POST['getCC'])) {

        if ($_POST['getCC'] == 1) {

            if(session_id() == '') session_start(); 
            $message = getCC($_SESSION['user']);

            if ($message !== null){
                
                header("HTTP/1.1 200 OK");
                header("Content-type:application/json");
                $message = json_encode($message);

            } else {
                header("HTTP/1.1 400 Requisição Inválida.");
                $message = 'Solicitação Inválida';
            }
        }

    } elseif (empty($_POST['cc'])){ 

        header("HTTP/1.1 400 Requisição Inválida.");
        $message = 'Dados inválidos!';

    } else {

        if (setCC(str_replace(' ','+',urldecode($_POST['cc'])))) { // caracter + esta sendo subtituido por ' ', uso str_replace.
            header("HTTP/1.1 200 Autorizado");
            $message = 'Cartão Aceito';
        } else {
            header("HTTP/1.1 400 Requisição Inválida" . str_replace(' ','+',urldecode($_POST['cc'])));
            $message = 'Dados recusados';
        }
    }

} else {
    header('HTTP/1.1 400 Requisição Inválida');
    $message = 'Dados Inválidos';
}
echo $message; 
die;