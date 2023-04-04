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

    private function replaceIdToEmail($array) {
        $result = array();
        foreach ($array as $key => $value) {
            $result[$key] = $value;
            if ($key == 'idfromuser') {
                $result[$key] = $this->getEmailById($value);
            }
            if ($key == 'idtouser') {
                $result[$key] = $this->getEmailById($value);
            }
        }
        return $result;
    }

    private function replaceUserIdToName($array) {
        $result = array();
        foreach ($array as $key => $value) {
            $result[$key] = $value;
            if ($key == 'userid') {
                $result[$key] = $this->getNameById($value);
                $result['email'] = $this->getEmailById($value);
            }
        }
        return $result;
    }

    private function getNameById($id) {
        $query = 'SELECT name FROM users WHERE id = ' . $id;
        $stmt = $this->db->query($query);
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        return $result->name;
    }

    private function getEmailById($id) {
        $query = 'SELECT login FROM users WHERE id = ' . $id;
        $stmt = $this->db->query($query);
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        return $result->login;
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

    public function getUserById($id) {
        $query = 'SELECT * FROM users WHERE id="' . $id . '"';
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
        $query = 'INSERT INTO users (login, password, name, token, admin) VALUES ("' . $login . '", "' . $password . '", "' . $name . '", "", FALSE)';

        $this->db->query($query);
        return true;
    }

    public function sendMail($token, $email, $theme, $text) {
        $query = 'INSERT INTO mails (idfromuser, idtouser, theme, content, isread) VALUES ((SELECT id FROM users WHERE token="' . $token . '"), (SELECT id FROM users WHERE login="' . $email . '"), "' . $theme . '", "' . $text . '", FALSE)';
        $this->db->query($query);
        return true;
    }

    public function addGameRecord($game, $token, $score){
        $query = "INSERT INTO `records` (`id`, `gameid`, `userid`, `score`, `date`) VALUES (NULL, (SELECT id FROM games WHERE name='" . $game . "'), (SELECT id FROM users WHERE token='" . $token . "'), '" . $score . "', NOW())";
        $this->db->query($query);
        return true;
    }
    
    public function checkRecord($game, $token, $score){
        $query = 'SELECT * FROM records WHERE gameid=(SELECT id FROM games WHERE name="' . $game . '") AND userid=(SELECT id FROM users WHERE token="' . $token . '") AND score=' . $score;
        return $this->db->query($query)->fetchObject();
    }

    public function getMails($token, $page) {
        $query = 'SELECT * FROM mails WHERE idtouser=(SELECT id FROM users WHERE token="' . $token . '") LIMIT 10 OFFSET ' . ($page - 1) * 10;
        $array = $this->getArray($query);
        return array_map(array($this, 'replaceIdToEmail'), $array);
    }

    public function getSentMails($token, $page) {
        $query = 'SELECT * FROM mails WHERE idfromuser=(SELECT id FROM users WHERE token="' . $token . '") LIMIT 10 OFFSET ' . ($page - 1) * 10;
        $array = $this->getArray($query);
        return array_map(array($this, 'replaceIdToEmail'), $array);
    }

    public function getRecords($gamename, $order) {
        if ($order == 'ASC') {
            $query = 'SELECT * FROM records WHERE gameid=(SELECT id FROM games WHERE name="' . $gamename . '") ORDER BY score ASC LIMIT 10';
        }
        if ($order == 'DESC') {
            $query = 'SELECT * FROM records WHERE gameid=(SELECT id FROM games WHERE name="' . $gamename . '") ORDER BY score DESC LIMIT 10';
        }

        $array = $this->getArray($query);
        return array_map(array($this, 'replaceUserIdToName'), $array);
    }

    public function readMails($token) {
        $query = 'UPDATE mails SET isread=TRUE WHERE idtouser=(SELECT id FROM users WHERE token="' . $token . '")';
        return $this->db->query($query);
    }

    function getGamesList() {
        $query = 'SELECT * FROM games';
        return $this->getArray($query);
    }

    function changeGameStatus($token, $game) {
        $query = 'SELECT * FROM users WHERE token="' . $token . '" AND admin=TRUE';
        $admin = $this->db->query($query);
        if($admin->rowCount() == 1){
            $query = 'UPDATE games SET isworking=NOT isworking WHERE name="' . $game . '"';
            $this->db->query($query);
        }
    }

    



}




