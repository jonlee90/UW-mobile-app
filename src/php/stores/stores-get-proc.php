<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getStores()
BEGIN

SELECT s.id, s.s_name, s.addr, s.addr2, s.city, c.state_code, s.zip, s.tel1, s.tel2, s.tel3, 
s.fax, s.email, s.manager_name, s.default_img_id, i.url, i.id, s.yelp_biz_id, s.coord_lat, s.coord_lng
FROM stores as s
LEFT JOIN states as c
ON s.state_id = c.id
LEFT JOIN imgs as i
ON s.manager_img_id = i.id
WHERE active = 1 AND deleted = 0
ORDER BY s.s_name;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);
/*
  ************ get stores ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_getStores()
  BEGIN

  SELECT s.id, s.s_name, s.addr, s.addr2, s.city, c.state_code, s.zip, s.tel1, s.tel2, s.tel3, s.fax, s.email, s.manager_name, s.default_img_id, i.url, i.id, s.yelp_biz_id
  FROM stores as s
  LEFT JOIN states as c
  ON s.state_id = c.id
  LEFT JOIN imgs as i
  ON s.manager_img_id = i.id
  WHERE active = 1 AND deleted = 0;

  END";

  ************ get store image ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_getStoreImg(s_id INT)
  BEGIN

  SELECT s.img_title, i.url, i.id, if(t.default_img_id = s.img_id, 1, 0) as default_img
  FROM store_imgs as s
  LEFT JOIN stores as t
  ON s.store_id = t.id
  LEFT JOIN imgs as i
  ON s.img_id = i.id
  WHERE s.store_id = s_id
  ORDER BY default_img DESC, s.sort_order DESC, i.id DESC;

  END";

  ************ get stores for account ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_getStoresForAcc()
  BEGIN

  SELECT id, s_name
  FROM stores
  WHERE active = 1 AND deleted = 0
  ORDER BY s_name ASC, id DESC;

  END";

*/

?>