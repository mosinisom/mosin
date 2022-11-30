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
            case 'register': return $app->register($params);
            case 'sendMail': return $app->sendMail($params);
            case 'checkToken': return $app->checkToken($params);
            case 'addGameRecord': return $app->addGameRecord($params);
            case 'getMails' : return $app->getMails($params);
            case 'getSentMails' : return $app->getSentMails($params);  
            case 'getRecords' : return $app->getRecords($params);          
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