<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getUser(p_user_id INT)
BEGIN

SELECT email, fname, lname, dob, date_contract_begin, tel, date_upgrade_eligible
FROM customers
WHERE id = p_user_id;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);

?>