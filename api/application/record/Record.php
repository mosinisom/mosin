<?php
class Record {
    function __construct($db) {
        $this->db = $db;
    }

    function addGameRecord($game, $token, $score) {
        if ($token && $game && $score && !$this->db->checkRecord($game, $token, $score)) {
            return $this->db->addGameRecord($game, $token, $score);
        }
    }

    function checkRecord($game, $token, $score) {
        if ($token && $game && $score) {
            return !!$this->db->checkRecord($game, $token, $score);
        }
    }

    function getRecords($game, $order) {
        if ($game) {
            return $this->db->getRecords($game, $order);
        }
    }

    function getGamesList() {
        return $this->db->getGamesList();
    }

    function changeGameStatus($token, $game) {
        if ($token && $game) {
            return $this->db->changeGameStatus($token, $game);
        }
    }


}