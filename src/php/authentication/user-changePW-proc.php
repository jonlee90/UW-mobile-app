<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_userChangePw_getCustPw_id(p_id INT)
BEGIN

SELECT pw 
FROM customers 
WHERE id = p_id;

END";

if (($res = $mysqli->query($qry)) ===FALSE) {
  die('fail prep: '.$mysqli->error);
}

die('success on: '.$qry);


/*
  ************ get customer ID using login key ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_userChangePw_getCustId_loginKey(p_login_key VARCHAR(40))
  BEGIN

  SELECT customer_id 
  FROM customer_login 
  WHERE login_key = p_login_key;

  END";


  ************ get customer PW using ID ************
  $qry = 
  "CREATE PROCEDURE jsp_userChangePw_getCustPw_id(p_id INT)
  BEGIN

  SELECT pw 
  FROM customers 
  WHERE id = p_id;

  END";


  ************ update PW ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_userChangePw_updatePw(p_pw VARCHAR(80), p_id INT)
  BEGIN

  UPDATE customers 
  SET pw = p_pw
  WHERE id = p_id;

  END";


*/
?>