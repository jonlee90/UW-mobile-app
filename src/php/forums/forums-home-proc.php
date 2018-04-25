<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getForumsHome(p_group_id INT)
BEGIN
SET @qry= '';
SET @p_group_id = p_group_id;
 
SET @qry = CONCAT('
SELECT t.id, t.date_rec, t.msg, t.youtube_link, t.title, t.is_notice, t.reply_msg, t.fname, t.lname, (SUM(if(m.msg_id > 0, 1, 0)) + t.view_count)
FROM (SELECT f.id, f.date_rec, f.msg, f.youtube_link, f.title, f.is_notice, SUM(if(d.origin_msg_id > 0, 1, 0)) as reply_msg, c.fname, c.lname, f.view_count
FROM forum_msgs  as f
LEFT JOIN forum_msgs as d
ON f.id = d.origin_msg_id
LEFT JOIN customers as c
ON f.cust_id = c.id
WHERE f.active = 1 AND f.deleted = 0 AND f.is_public = 1 AND f.origin_msg_id = 0',
@qry
);

IF (p_group_id IS NOT NULL) THEN
	SET @qry = CONCAT(@qry, ' AND f.group_id=? ');
ELSE
	SET @qry = CONCAT(@qry, ' AND 1=? ');
    SET @p_group_id = 1;
END IF;

SET @qry = CONCAT(@qry, '
GROUP BY f.id) as t
LEFT JOIN forum_msg_view_count as m
ON t.id = m.msg_id
GROUP BY t.id
ORDER BY t.date_rec DESC, t.id DESC
LIMIT 5');

PREPARE stmt FROM @qry;
EXECUTE stmt USING @p_group_id;
DEALLOCATE PREPARE stmt;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);

?>