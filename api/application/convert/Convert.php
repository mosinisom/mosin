<?php
class Convert {

    function checkString($str)
    {
        $pattern = '/^[IVXLCDM]+$/';
        if (preg_match($pattern, $str)) {
            return true;
        } else {
            return false;
        }
    }
    
    function decimalToRoman($num = 1)
    {
        $result = '';
    
        switch ($num) {
            case $num >= 1000:
                $result .= 'M';
                $num -= 1000;
                break;
            case $num >= 900:
                $result .= 'CM';
                $num -= 900;
                break;
            case $num >= 500:
                $result .= 'D';
                $num -= 500;
                break;
            case $num >= 400:
                $result .= 'CD';
                $num -= 400;
                break;
            case $num >= 100:
                $result .= 'C';
                $num -= 100;
                break;
            case $num >= 90:
                $result .= 'XC';
                $num -= 90;
                break;
            case $num >= 50:
                $result .= 'L';
                $num -= 50;
                break;
            case $num >= 40:
                $result .= 'XL';
                $num -= 40;
                break;
            case $num >= 10:
                $result .= 'X';
                $num -= 10;
                break;
            case $num >= 9:
                $result .= 'IX';
                $num -= 9;
                break;
            case $num >= 5:
                $result .= 'V';
                $num -= 5;
                break;
            case $num >= 4:
                $result .= 'IV';
                $num -= 4;
                break;
            case $num >= 1:
                $result .= 'I';
                $num -= 1;
                break;
        }
    
        if ($num > 0) {
            $result .= $this->decimalToRoman($num);
        }
    
        return $result;
    }
    
    function romanToDecimal($number){
        $roman_nums = array(
            'M'  => 1000,
            'CM' => 900,
            'D'  => 500,
            'CD' => 400,
            'C'  => 100,
            'XC' => 90,
            'L'  => 50,
            'XL' => 40,
            'X'  => 10,
            'IX' => 9,
            'V'  => 5,
            'IV' => 4,
            'I'  => 1
        );

        $result = 0;

        foreach ($roman_nums as $roman => $value){
            while (strpos($number, $roman) === 0){
                $result += $value;
                $number = substr($number, strlen($roman));
            }
        }
        return $result;
    }
    
    function anyToDecimal($number,$fromSystem){
        $number = (string)$number;
        $number = strtoupper($number);
        if (strlen($number) <= 0) return false;

        switch ($fromSystem){
            case 'roman':
                if ($this->checkString($number)) 
                    return $this->romanToDecimal($number);
            case 'binary':
                if (preg_match('/^[01]+$/', $number)) {
                    return bindec($number);
                }
            case 'octal':
                if (preg_match('/^[0-7]+$/', $number)) {
                    return octdec($number);
                }
            case 'hex':
                if (preg_match('/^[0-9A-F]+$/', $number)) {
                    return hexdec($number);
                }
            default:
                return $number;
        }
    }    


    function convertTo($number,$fromSystem,$toSystem) {
        $decimal = $this->anyToDecimal($number,$fromSystem);
        if ($decimal === false){
            return 'Error';
        }
        switch ($toSystem){
            case 'roman':
                return $this->decimalToRoman($decimal);
            case 'binary':
                return decbin($decimal);
            case 'octal':
                return decoct($decimal);
            case 'hex':
                return dechex($decimal);
            default:
                return $decimal;
        }
    }
}