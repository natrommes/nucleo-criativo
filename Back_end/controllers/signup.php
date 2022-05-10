<?php

require_once '../models/genFunction.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Max-Age: 600');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['formBasicEmail'];
    $password = $_POST['formBasicPassword'];
    $name = $_POST['formBasicName'];
    

    if (signUp($username, $password, $name)) {
        $data = ['message' => 'registro processado com sucesso!'];
        echo json_encode($data);
        die();
    }

    $data = ['message' => 'ocorreu um erro!'];
    echo json_encode($data);
}


