<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_insertForum(p_cust_id INT, p_msg VARCHAR(1000), p_group_id INT, p_is_public INT, p_title VARCHAR(100))
BEGIN

INSERT INTO forum_msgs(cust_id, msg, group_id, is_public, title)
VALUES(p_cust_id, p_msg, p_group_id, p_is_public, p_title);

SELECT LAST_INSERT_ID();

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);

?>