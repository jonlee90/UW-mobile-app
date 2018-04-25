<?
require_once('../../code/config.php');
// ***** use 'mysql_storedproc' user to create and manage procedures
$mysqli = mysqli_connect(DB_HOST, 'mysql_storedproc', 'sproc@INlogic1', 'demo_uw');

$qry = 
"CREATE PROCEDURE jsp_uw_getLinks()
BEGIN

SELECT id, link_name, url
FROM useful_links 
WHERE active = 1 AND deleted = 0
ORDER BY sort_order DESC;
END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);

?>