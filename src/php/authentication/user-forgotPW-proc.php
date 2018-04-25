<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_auth_checkCustReset(p_req_key VARCHAR(40))
BEGIN

SELECT cust_id
FROM customer_reset
WHERE req_key = p_req_key;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);


/*

************ insert customer reset ************
$qry = 
"CREATE PROCEDURE jsp_uw_auth_insertCustReset(p_cust_id INT, p_req_key VARCHAR(40))
BEGIN

INSERT INTO customer_reset(cust_id, req_key)
VALUES(p_cust_id, p_req_key)
ON DUPLICATE KEY UPDATE req_key = p_req_key; 

END";


************ update PW in forgot PW ************
$qry = 
"CREATE PROCEDURE jsp_uw_auth_updateForgotPw(p_id INT, p_pw VARCHAR(80))
BEGIN

UPDATE customers
SET pw = p_pw
WHERE id = p_id;

END";


************ check customer reset table with customer ID ************
$qry = 
"CREATE PROCEDURE jsp_uw_auth_checkCustReset(p_req_key VARCHAR(40))
BEGIN

SELECT cust_id
FROM customer_reset
WHERE req_key = p_req_key;

END";

*/
?>