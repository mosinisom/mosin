<?php
require('db/DB.php');
require('user/User.php');
require('convert/Convert.php');
require('mail/Mail.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->convertModule = new Convert();
        $this->mail = new Mail($db);
    }

    function login($params) {
        if ($params['login'] && $params['password']) {
            return $this->user->login($params['login'], $params['password']);
        }
    }

    function logout($params) {
        if ($params['token']) { 
            return $this->user->logout($params['token']);
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

    function register($params) {
        if ($params['login'] && $params['password'] && $params['name']) {
            return $this->user->register(
                $params['login'],
                $params['password'], 
                $params['name']
            );
        }
    }

    function sendMail($params) {
        if ($params['token'] && $params['email'] && $params['theme'] && $params['text']) {
            return $this->mail->sendMail(
                $params['token'],
                $params['email'], 
                $params['theme'], 
                $params['text'] 
            );
        }
    }

    function checkToken($params) {
        if ($params['token']) {
            return $this->user->getUser($params['token']);
        }
    }
}