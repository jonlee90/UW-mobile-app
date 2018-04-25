<?php
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_insertForumCount(p_msg_id INT, p_uuid VARCHAR(60), p_date_view VARCHAR(50))
BEGIN

INSERT INTO forum_msg_view_count(msg_id, uuid, date_view)
VALUES(p_msg_id, p_uuid, p_date_view)
ON DUPLICATE KEY UPDATE msg_id = p_msg_id, uuid = p_uuid, date_view = p_date_view;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);


?>