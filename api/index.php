<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
error_reporting(-1);

require('application/Application.php');

function router($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'login': return $app->login($params);
            case 'convert': return $app->convert($params);
            case 'logout': return $app->logout($params);
            case 'addUser': return $app->addUser($params);
            
            //...
        }
    }
    return false;
}

function answer($data) {
    if ($data) {
        return array(
            'result' => 'ok',
            'data' => $data
        );
    }
    return array('result' => 'error');
}

echo json_encode(answer(router($_GET)));