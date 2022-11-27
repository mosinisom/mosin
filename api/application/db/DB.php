<?php
class DB {
    function __construct()  {
        $host = 'localhost';
        $port = '3306';
        $name = 'mosin'; // db name
        $user = 'root'; // user name
        $pass = ''; // user password
        try {
            $this->db = new PDO(
                'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $name,
                $user,
                $pass
            );
        } catch(Exception $e) {
            print_r($e->getMessage());
            die();
        }
    }

    function __destruct() {
        $this->db = null;
    }

    private function getArray($query) {
        $stmt = $this->db->query($query);
        $result = array();
        while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            $result[] = $row;
        }
        return $result;
    }

    public function getUser($login) {
        $query = 'SELECT * FROM users WHERE login="' . $login . '"';
        return $this->db->query($query)->fetchObject();
    }

    public function getUserByToken($token) {
        $query = 'SELECT * FROM users WHERE token="' . $token . '"';
        return $this->db->query($query)->fetchObject();
    }

    public function getUserByEmail($email) {
        $query = 'SELECT * FROM users WHERE login="' . $email . '"';
        return $this->db->query($query)->fetchObject();
    }

    public function updateToken($id, $token) {
        $query = 'UPDATE users SET token="' . $token . '" WHERE id=' . $id;
        $this->db->query($query);
        return true;
    }

    public function getUsers() {
        $query = 'SELECT * FROM users';
        return $this->getArray($query);
    }

    public function register($login, $password, $name) {
        $user = $this->getUser($login);
        if ($user) {
            return false;
        }
        $query = 'INSERT INTO users (login, password, name, token) VALUES ("' . $login . '", "' . $password . '", "' . $name . '", "")';

        $this->db->query($query);
        return true;
    }

    public function sendMail($token, $email, $theme, $text) {
        $query = 'INSERT INTO mails (idfromuser, idtouser, theme, content) VALUES ((SELECT id FROM users WHERE token="' . $token . '"), (SELECT id FROM users WHERE login="' . $email . '"), "' . $theme . '", "' . $text . '")';
        $this->db->query($query);
        return true;
    }

    // public function getMails($token) {
    //     $query = 'SELECT * FROM mails WHERE idtouser=(SELECT id FROM users WHERE token="' . $token . '")';
    //     return $this->getArray($query);
    // }

    public function addGameRecord($game, $token, $score){
        // $query = 'INSERT INTO records (gameid, userid, score) VALUES ((SELECT id FROM games WHERE name="' . $game . '"), (SELECT id FROM users WHERE token="' . $token . '"),' . $score . ')';
        $query = "INSERT INTO `records` (`id`, `gameid`, `userid`, `score`, `date`) VALUES (NULL, (SELECT id FROM games WHERE name='" . $game . "'), (SELECT id FROM users WHERE token='" . $token . "'), '" . $score . "', NOW())";

        $this->db->query($query);
        return true;
    }

    



}




