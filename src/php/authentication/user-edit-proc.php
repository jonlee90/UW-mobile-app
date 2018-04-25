<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_updateCust(p_id INT, p_fName VARCHAR(50), p_lName VARCHAR(50), p_email VARCHAR(100), p_dob VARCHAR(40))
BEGIN

UPDATE customers
SET fname = p_fName, lname = p_lName, email = p_email, dob = p_dob 
WHERE id = p_id;

SELECT fname, lname, email, dob
FROM customers
WHERE id = p_id;

END";

if (($res = $mysqli->query($qry)) ===FALSE) {
  die('fail prep: '.$mysqli->error);
}

die('success on: '.$qry);

?>