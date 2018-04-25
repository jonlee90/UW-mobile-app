<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getForumsNoticesYoutube(p_group_id INT, p_start INT, p_limit INT)
BEGIN
SELECT t.id, t.date_rec, t.msg, t.youtube_link, t.title, t.is_notice, t.reply_msg, (SUM(if(m.msg_id > 0, 1, 0)) + t.view_count)
FROM (SELECT f.id, f.date_rec, f.msg, f.youtube_link, f.title, f.is_notice, SUM(if(d.origin_msg_id > 0, 1, 0)) as reply_msg, f.view_count
FROM forum_msgs  as f
LEFT JOIN forum_msgs as d
ON f.id = d.origin_msg_id
WHERE f.group_id = 3 AND f.active = 1 AND f.deleted = 0 AND f.origin_msg_id = 0
GROUP BY f.id) as t
LEFT JOIN forum_msg_view_count as m
ON t.id = m.msg_id
GROUP BY t.id
ORDER BY t.is_notice DESC, t.id DESC
LIMIT p_start, p_limit;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);

?>