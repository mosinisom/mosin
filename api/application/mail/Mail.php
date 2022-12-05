<?php
class Mail {
    function __construct($db) {
        $this->db = $db;
    }

    function sendMail($token, $email, $theme, $text) {
        if ($token && $email && $theme && $text) {
                return $this->db->sendMail($token, $email, $theme, $text);
            }
    }

    function getMails($token, $page) {
        if ($token && $page) {
            return $this->db->getMails($token, $page);
        }
    }

    function getSentMails($token, $page) {
        if ($token && $page) {
            return $this->db->getSentMails($token, $page);
        }
    }

    function readMails($token) {
        if ($token) {
            return $this->db->readMails($token);
        }
    }

    





}