<?php
require('db/DB.php');
require('user/User.php');
require('convert/Convert.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->convertModule = new Convert();
    }

    function login($params) {
        if ($params['login'] && $params['password']) {
            return $this->user->login($params['login'], $params['password']);
        }
    }

    function convert($params) {
        $user = $this->user->getUser($params['token']);
        if ($user && $params['value'] && $params['systemFrom'] && $params['systemTo']) {
            return $this->convertModule->convertTo(
                $params['value'], 
                $params['systemFrom'], 
                $params['systemTo']
            );
        }
    }
}