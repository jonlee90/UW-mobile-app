<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_searchForums(p_cust_id INT, p_search_value VARCHAR(100), p_start INT, p_limit INT)
BEGIN

SELECT  t.id, t.origin_msg_id, t.cust_id, t.is_notice, t.msg, t.youtube_link, t.fname, t.lname, t.reply_msg, t.date_rec, t.title, t.is_public, (SUM(if(m.msg_id > 0, 1, 0)) + t.view_count)
FROM (SELECT f.id, f.origin_msg_id, f.cust_id, f.is_notice, f.msg, f.youtube_link, c.fname, c.lname, SUM(if(d.origin_msg_id > 0, 1, 0)) as reply_msg, f.date_rec, f.title, f.is_public, f.view_count
FROM forum_msgs as f
LEFT JOIN forum_msgs as d
ON f.id = d.origin_msg_id
LEFT JOIN customers as c
ON f.cust_id = c.id
WHERE f.group_id = 2 AND f.active = 1 AND f.deleted = 0 AND f.origin_msg_id = 0 AND (f.is_public = 1 OR f.cust_id = p_cust_id OR f.cust_id = 0) AND (f.title LIKE p_search_value OR f.msg LIKE p_search_value)
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