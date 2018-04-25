<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_filterPhones(p_start INT, p_limit INT, p_search_value VARCHAR(100), p_filter VARCHAR(50))
BEGIN
SET @qry= '';
SET @p_start_1 = p_start;
SET @p_limit_1 = p_limit;
SET @p_search_value_1 = p_search_value;
SET @p_filter_1 = p_filter;

SET @qry = CONCAT('
SELECT id, brand, p_name, main_img_id, price, desc_short, price_sale, is_new, is_hot
FROM phones
WHERE active = 1 AND deleted = 0 AND (brand LIKE ? OR p_name LIKE ?)',
@qry
);

IF (p_filter = 'is_new') THEN
	SET @qry = CONCAT(@qry, ' AND is_new=1 ');
ELSEIF (p_filter = 'is_hot') THEN
	SET @qry = CONCAT(@qry, ' AND is_hot=1 ');
ELSEIF (p_filter = 'price_sale') THEN
    SET @qry = CONCAT(@qry, ' AND price_sale IS NOT NULL ');
END IF;

SET @qry = CONCAT(
@qry, '
ORDER BY sort_order DESC
LIMIT ?, ?;'
);

PREPARE stmt FROM @qry;
EXECUTE stmt USING  @p_search_value_1, @p_search_value_1, @p_start_1, @p_limit_1;
DEALLOCATE PREPARE stmt;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);

/*

  ************ search phones ************

  $qry = 
  "CREATE PROCEDURE jsp_uw_searchPhones(p_start INT, p_limit INT, p_search_value VARCHAR(100))
  BEGIN

  SELECT id, brand, p_name, main_img_id, price, desc_short, price_sale, is_new, is_hot
  FROM phones
  WHERE active = 1 AND deleted = 0 AND (brand LIKE p_search_value OR p_name LIKE p_search_value)
  ORDER BY sort_order DESC
  LIMIT p_start, p_limit;

  END";


  ************ filter phones ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_filterPhones(p_start INT, p_limit INT, p_search_value VARCHAR(100), p_filter VARCHAR(50))
  BEGIN
  SET @qry= '';
  SET @p_start_1 = p_start;
  SET @p_limit_1 = p_limit;
  SET @p_search_value_1 = p_search_value;
  SET @p_filter_1 = p_filter;

  SET @qry = CONCAT('
  SELECT id, brand, p_name, main_img_id, price, desc_short, price_sale, is_new, is_hot
  FROM phones
  WHERE active = 1 AND deleted = 0 AND (brand LIKE ? OR p_name LIKE ?)',
  @qry
  );

  IF (p_filter = 'is_new') THEN
    SET @qry = CONCAT(@qry, ' AND is_new=1 ');
  ELSEIF (p_filter = 'is_hot') THEN
    SET @qry = CONCAT(@qry, ' AND is_hot=1 ');
  ELSEIF (p_filter = 'price_sale') THEN
      SET @qry = CONCAT(@qry, ' AND price_sale IS NOT NULL ');
  END IF;

  SET @qry = CONCAT(
  @qry, '
  ORDER BY sort_order DESC
  LIMIT ?, ?;'
  );

  PREPARE stmt FROM @qry;
  EXECUTE stmt USING  @p_search_value_1, @p_search_value_1, @p_start_1, @p_limit_1;
  DEALLOCATE PREPARE stmt;

  END";

?>