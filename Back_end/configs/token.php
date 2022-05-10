<?php

function GetToken ($username) { 

$header = [
   'alg' => 'HS256', 
   'typ' => 'JWT'
];
$header = json_encode($header);
$header = base64_encode($header);

$payload = [
   'iss' => 'localhost:8082',
   'name' => $username
];

$payload = json_encode($payload);
$payload = base64_encode($payload);

$signature = hash_hmac('sha256',"$header.$payload",'rootroot',true);
$signature = base64_encode($signature);

return "$header.$payload.$signature";

}