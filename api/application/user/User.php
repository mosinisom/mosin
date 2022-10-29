<?php
class User {
    function __construct($db) {
        $this->db = $db;
    }

    function login($login, $password) {
        $user = $this->db->getUser($login);
        if ($user && $password === $user->password) {
            $token = md5(rand());
            $this->db->updateToken($user->id, $token);
            return array(
                'name' => $user->name,
                'token' => $token
            );
        }
    }

    function getUser($token) {
        return !!$this->db->getUserByToken($token);
    }

    function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            return $this->db->updateToken($user->id, '');
        }
    }
}