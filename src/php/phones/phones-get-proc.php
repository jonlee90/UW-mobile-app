<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getPhones(p_start INT, p_limit INT)
BEGIN

SELECT id, brand, p_name, main_img_id, price, desc_short, price_sale, is_new, is_hot
FROM phones
WHERE active = 1 AND deleted = 0
ORDER BY sort_order DESC
LIMIT p_start, p_limit;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);
/*
************ get phones ************
$qry = 
"CREATE PROCEDURE jsp_uw_getPhones()
BEGIN

SELECT id, brand, p_name, main_img_id, price, desc_short, price_sale, is_new, is_hot
FROM phones
WHERE active = 1 AND deleted = 0
ORDER BY sort_order DESC;
END";

************ get phone attribute ************
$qry = 
"CREATE PROCEDURE jsp_uw_getPhoneAttr(p_phone_id INT)
BEGIN

SELECT p.attr_id, p.attr_val, a.attr_name
FROM phone_attr_vals as p
LEFT JOIN phone_attrs as a
ON p.attr_id = a.id
WHERE p.phone_id = p_phone_id;

END";

************ get phone image ************
$qry = 
"CREATE PROCEDURE jsp_uw_getPhoneImg(p_phone_id INT, p_main_img_id INT)
BEGIN

IF (p_main_img_id IS NULL) THEN
	SET p_main_img_id = 0;
END IF;

SELECT p.img_id, p.img_title, i.url, if(p.img_id = p_main_img_id, 1, 0) as default_img
FROM phone_imgs  as p
LEFT JOIN imgs as i
ON p.img_id = i.id
WHERE p.phone_id = p_phone_id
ORDER BY default_img DESC, p.sort_order DESC, p.img_id DESC;

END";
*/

?>