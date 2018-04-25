<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_auth_insertPushToken(p_id_token VARCHAR(250))
BEGIN

INSERT INTO fcm_tokens(id_token)
VALUES (p_id_token)
ON DUPLICATE KEY UPDATE id_token = p_id_token; 

END";

if (($res = $mysqli->query($qry)) ===FALSE) {
  die('fail prep: '.$mysqli->error);
}

die('success on: '.$qry);

/*
  ************ check customer login ID ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_checkCustomerLogin(p_customer_id INT)
  BEGIN

  SELECT login_key
  FROM customer_login
  WHERE customer_id = p_customer_id;

  END";


  ************ insert push token ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_insertPushToken(p_id_token VARCHAR(250))
  BEGIN

  INSERT INTO fcm_tokens(id_token)
  VALUES (p_id_token)
  ON DUPLICATE KEY UPDATE id_token = p_id_token; 

  END";


*/
?>