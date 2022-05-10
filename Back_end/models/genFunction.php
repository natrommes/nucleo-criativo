<?php

require_once '../core/database.php';

class hcrypter {

    const ciphering = "aes-128-cbc";
    private const PROPS_CRYPT_KEY = '0123456789abcdef0123456789abcdef';
    //= "rootroot";
    private const PROPS_CRYPT_IV  = 'abcdef9876543210abcdef9876543210';
    //= "OI php tudo bem?";


    private $iv_length = null;
    private $options = null;


    public function __construct() {                   
            $this->iv_length = openssl_cipher_iv_length($this::ciphering); // Use OpenSSl Encryption method
            $this->options = 0;
            return $this;
    }

    public function encryptMsg($data) {
        return openssl_encrypt('{"abc":"'.$data.'}', $this::ciphering,   # variavel $dados que precisa ser o msg a ser criptografada.
        pack("H*", $this::PROPS_CRYPT_KEY), $this->options , pack("H*", $this::PROPS_CRYPT_IV));   // Use openssl_encrypt() function to encrypt the data
    }

    public function decryptMsg($data) {
        return json_decode(openssl_decrypt ($data, $this::ciphering,  # variavel $dados que precisa ser o msg a ser decriptografada.
        pack("H*", $this::PROPS_CRYPT_KEY), $this->options , pack("H*", $this::PROPS_CRYPT_IV))   // Use openssl_decrypt() function to decrypt the data
        )->abc;
    }
};


function getUserByUsername($username) {
    $connection = getConnection();
    // $sql = "SELECT * FROM users WHERE username = '$username' LIMIT 1";
    $sql = "SELECT * FROM utilizadores WHERE login = '$username' LIMIT 1";
    $stmt = $connection->query($sql);

    $user = $stmt->fetch();
    return $user ? $user : null;
}

function login($username, $password) {
    $user = getUserByUsername($username);
    // DEBUG CODE:
    //print_r($username);
    if (!is_null($user) && password_verify($password, $user['password'])) { //password 
        
        if(session_id() == '') session_start(); //verificar se asseão estiver ja startada ou não.       
        $_SESSION['user'] = $user['login']; 
        
        logUserAttempt($username, 'logged in');
        return true;
    }

    logUserAttempt($username, 'fail logged in');
    return false;
}

function logUserAttempt($username, $message) {
    $log = sprintf(
        "[%s] user %s %s from %s\n",
        date('Y-m-d H:i:s'),
        $username,
        $message,
        $_SERVER['REMOTE_ADDR']
    );
    file_put_contents('../logs/access.log', $log, FILE_APPEND);
}

function getCards ($id) {
    $connection = getConnection();
    $sql = "SELECT * FROM produtos WHERE id_categoria = $id";
    $stmt = $connection->query($sql);

    $cards = $stmt->fetchAll();
    return $cards ? $cards : null;
}

function getProduct ($id) {
    $connection = getConnection();
    $sql = "SELECT * FROM produtos WHERE id = $id";
    $stmt = $connection->query($sql);

    $cards = $stmt->fetchAll();
    return $cards ? $cards : null;
}

function getAllProducts () {
    $connection = getConnection();
    $sql = "SELECT p.*, c.nome AS nome_ctg FROM produtos p, categoria c WHERE c.id = p.id_categoria";
    $stmt = $connection->query($sql);

    $prod = $stmt->fetchAll();
    return $prod ? $prod : null;
}

function setCC($dados) {

    $email = explode('=',explode('&', (new hcrypter())->decryptMsg($dados))[4]);

    if ($email[0] != 'email_props') return false;

    $connection = getConnection();
    $sql = "CALL nucleo_criativo_1.updateClientesForma_Pagamento('$dados','$email[1]')";

    $stmt = $connection->query($sql);
    return $stmt;
}

function getCC($user) {

    if (empty($user)) return false;

    $connection = getConnection();
    $sql = "SELECT dados AS cc FROM forma_pagamento WHERE id IN (SELECT id_forma_pagamento FROM clientes WHERE email = '$user')";

    $stmt = $connection->query($sql);
    $data = $stmt->fetchAll();
    return $data ? $data : null;
}

function setShopping ($price, $qty) {
    $connection = getConnection();
    $sql = "INSERT INTO compra (quantidade, preço) VALUES ($price, $qty)";

    $stmt = $connection->query($sql);
    return $stmt->rowCount() > 0;
}

function signUp($username, $password, $name) {
    $connection = getConnection();
    $password = password_hash($password, PASSWORD_BCRYPT);

    $sql = "CALL nucleo_criativo_1.updateClienteUtilizadores('$username', '$password', '$name')";
    $stmt = $connection->query($sql);
  
    return $stmt;
}

function logout() {

    if(session_id() == '') session_start(); 
    if (!empty($_SESSION['user'])) {
        
        $user = $_SESSION['user'];
        unset($_SESSION['user']);
        logUserAttempt($user, 'logged out');

        $message = 'Logout';
    } else {
        
        $message = 'Please login';
    }
    return $message;
}


