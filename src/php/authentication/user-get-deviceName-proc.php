<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getUserDeviceName(p_model VARCHAR(50))
BEGIN

SELECT device_name
FROM customer_device_names
WHERE model = p_model;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);

?>