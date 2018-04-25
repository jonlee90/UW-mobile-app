<?
require_once('pre-app.php');

$stmt = $con->prepare("CALL jsp_uw_getPlans()") or append_log_error("Prepare stm plans-get.php uw_getPlans failed: " .$con->error);

$stmt2 = $con->prepare("CALL jsp_uw_getPlanAttr(?)") or append_log_error("Prepare stm plans-get.php uw_getPlanAttr failed: " .$con->error);
$stmt2->bind_param('i', $plan_id);

$stmt->execute() or append_log_error('plans-get.php uw_getPlans exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $plan_name, $plan);
$row1 = array();
while($stmt->fetch()){
  $row1[] = array($id, $plan_name, $plan);
}
$con->next_result();
$plan_list = array();
$n1 = count($row1);
for ($i1=0; $i1<$n1; $i1++) {
  $plan_id = $row1[$i1][0];
  $stmt2->execute() or append_log_error('plans-get.php uw_getPlanAttr exec: '.$stmt->error);
  $stmt2->store_result();
  $stmt2->bind_result($attr_id, $attr_val, $attr_name);
  $row2 = array();
  while($stmt2->fetch()) {
    if($attr_val != '') {
      $row2[] = array('attr_id' => $attr_id, 'attr_val' => $attr_val, 'attr_name' => $attr_name);
    }
  }
  $con->next_result();

  $plan_list[] = array('id' => $row1[$i1][0], 'plan_name' => $row1[$i1][1], 'price' => $row1[$i1][2], 'plan_attr' => $row2);
    //check unset if it doesnt works
  unset($row2);
}
$json_out = json_encode(array('list' => $plan_list));

die($json_out);


?>