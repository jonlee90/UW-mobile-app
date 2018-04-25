<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_getPlans()
BEGIN

SELECT id, plan_name, price
FROM plans 
WHERE active = 1 AND deleted = 0
ORDER BY sort_order DESC;

END";

if (($res = $mysqli->query($qry)) ===FALSE) 
  die('fail prep: '.$mysqli->error);


die('success on: '.$qry);
/*

  ************ get plans ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_getPlans()
  BEGIN

  SELECT id, plan_name, price
  FROM plans 
  WHERE active = 1 AND deleted = 0
  ORDER BY sort_order DESC;

  END";

  ************ get plan attribute ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_getPlanAttr(p_plan_id INT)
  BEGIN

  SELECT p.attr_id, p.attr_val, a.attr_name
  FROM plan_attr_vals as p
  LEFT JOIN plan_attrs as a
  ON p.attr_id = a.id
  WHERE p.plan_id = p_plan_id;

  END";


*/

?>