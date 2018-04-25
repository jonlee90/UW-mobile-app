<?php
require_once('pre-app.php');

$user_id = $_GET['userId'];
$user_id = (int)$user_id;

$stmt = $con->prepare("CALL jsp_uw_getUser(?)") or append_log_error("Prepare stm uw_getUser failed: " .$con->error);
$stmt->bind_param('i', $user_id);
$stmt->execute() or append_log_error('uw_getUser exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($email, $fname, $lname, $dob, $date_contract_begin, $tel, $date_upgrade_eligible);
$user = array();
while($stmt->fetch()){
  $user[] = array('email' => $email, 'fName' => $fname, 'lName' => $lname, 'dob' => $dob, 
  'date_contract_begin' => date('m-d-Y', strtotime($date_contract_begin)), 'tel' => $tel, 'date_upgrade_eligible' => date('m-d-Y', strtotime($date_upgrade_eligible)));
}
$con->close();
$json_out = json_encode(array('list' => $user));

die($json_out);

?>