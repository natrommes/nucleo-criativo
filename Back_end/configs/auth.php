<?php
/** 
 * Get header Authorization
 * */
function getAuthorizationHeader(){
   
   $headers = null;
   if (isset($_SERVER['Authorization'])) {

       $headers = trim($_SERVER["Authorization"]);
   }
   else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
       $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
   } elseif (function_exists('apache_request_headers')) {
       $requestHeaders = apache_request_headers();
       // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
       $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
       //print_r($requestHeaders);
       if (isset($requestHeaders['Authorization'])) {
           $headers = trim($requestHeaders['Authorization']);
       }
   }
   // DEBUG CODE
   // return 'Bearer '.'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb2NhbGhvc3Q6ODA4MiIsIm5hbWUiOiJhbmFfY29zdGFAdGVzdC5jb20ifQ==.ZxmZFdJAqKZ57SToeUeXKwLEFgLZcfrvJ+EGOfaK0jI=';
   return $headers;
}

/**
* get access token from header
* */
function getBearerToken() {

   $headers = getAuthorizationHeader();
   //HEADER: Get the access token from the header
   if (!empty($headers)) {
      if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
         return $matches[1];
      }
   }
   return null;
}

function isAuthenticated() {

   $token = getBearerToken();

   if($token) {
      $part = explode(".",$token);
      $header = $part[0];
      $payload = $part[1];
      $signature = $part[2];

      $valid = hash_hmac('sha256',"$header.$payload",'rootroot',true); //gera um hash a partir do header e do payload.
      $valid = base64_encode($valid);
      if ($signature == $valid) {

         if(session_id() == '') session_start(); //verificar se asseão estiver ja startada ou não.       
         $_SESSION['user'] = json_decode(base64_decode($part[1]))->name;
         return true;
      
      } else return false;

   } else false;

}
