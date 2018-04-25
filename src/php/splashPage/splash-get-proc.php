<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getSpecificSplashPage(p_id INT)
BEGIN

SELECT a.id, a.ad_name, i.url, i.id
FROM advertisements as a
LEFT JOIN imgs as i
ON a.ad_img_id = i.id
WHERE a.id = p_id AND a.active = 1 AND a.deleted = 0;
END";

if (($res = $mysqli->query($qry)) ===FALSE) {
  die('fail prep: '.$mysqli->error);
}
die('success on: '.$qry);

?>