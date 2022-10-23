<?php
class User {
    function __construct($db) {
        $this->db = $db;
    }

    function login($login, $password) {
        if ($login === 'mosin' && $password === 'qwerty') {
            $token = md5(rand());
            return array(
                'name' => 'Sasha Mosin',
                'token' => $token
            );
        }
    }

    function getUser($token) {
        return !!$token;
    }
}