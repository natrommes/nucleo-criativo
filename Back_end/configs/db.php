<?php return [
       'host' => '127.0.0.1',
       'user' => 'root',
       'pass' => 'rootroot',
       'name' => 'nucleo_criativo_1',
       'port' => 3306
];

$dsn = sprintf("mysql:host=%s;dbname=%s;port=%d", $host, $name, $port);  

echo $dsn;