<?php

require_once '../models/genFunction.php';
require_once '../configs/token.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
header('Access-Control-Expose-Headers: Authorization'); // Garante a recuperação do token via header 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && empty($_POST)) {
    header("HTTP/1.1 200 Granted");
    $message = 'Allow: POST, GET, OPTIONS, DELETE, PUT';

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (empty($_POST['formBasicEmail']) || empty($_POST['formBasicPassword'])) {
        header("HTTP/1.1 400 Bad request");
        $message = 'Login and password are required!';
    } else {
        $username = $_POST['formBasicEmail'];
        $password = $_POST['formBasicPassword'];

        if (login($username, $password)) { // função login, esta transformando o password em hash para checar com os dados da BD que ja foram gravadas em hash.
            /*$limit = '1024';
            $dates = include("../token.php");
            echo json_encode(array_slice($dates, 0, $limit)); 
            echo array_slice(include("../token.php"),0);*/
            //echo GetToken($username, $password);
            header('Authorization: Bearer '. GetToken($username));
            header("HTTP/1.1 200 Granted");
            $message = 'Login Concedido';

        } else {
            header("HTTP/1.1 401 Unauthorized");
            $message = 'Credenciais Inválidas';
        }
    }
} else {
    header('HTTP/1.1 403 Forbidden');
    $message = 'Acesso Negado';
}
echo ($message);
die;
