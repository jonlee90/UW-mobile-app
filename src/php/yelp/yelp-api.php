<?php
require_once('pre-app.php');
$path = $_GET['path'];
/** 
 * Makes a request to the Yelp API and returns the response
 * 
 * @param    $bearer_token   API bearer token from obtain_bearer_token
 * @param    $host    The domain host of the API 
 * @param    $path    The path of the API after the domain.
 * @param    $url_params    Array of query-string parameters.
 * @return   The JSON response from the request      
 */
// function request($bearer_token, $host, $path, $url_params = array()) {
$bearer_token = 'ao5C2hvRLISnbdmxV6OPaFw-McjP85zKb1yKAVeoFBWelLqu106PJRXvU8NHDa7wz702x8BLBHpR5QqrIjassOkEPzl9CtzRhzn13axuCQiLk3nTpNFrtNUYiPr3WHYx';
$host = 'https://api.yelp.com/v3/businesses/';
$url_params = array();
// Send Yelp API Call
try {
    $curl = curl_init();
    if (FALSE === $curl)
        throw new Exception('Failed to initialize');
    $url = $host . $path . "?" . http_build_query($url_params);
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,  // Capture response.
        CURLOPT_ENCODING => "",  // Accept gzip/deflate/whatever.
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "authorization: Bearer " . $bearer_token,
            "cache-control: no-cache",
        ),
    ));
    $response = curl_exec($curl);
    if (FALSE === $response)
        throw new Exception(curl_error($curl), curl_errno($curl));
    $http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if (200 != $http_status)
        throw new Exception($response, $http_status);
    curl_close($curl);
} catch(Exception $e) {
    trigger_error(sprintf(
        'Curl failed with error #%d: %s',
        $e->getCode(), $e->getMessage()), E_USER_ERROR);
}

die($response);



?>