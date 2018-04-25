<?
require_once('pre-app.php');

$cust_id = $_GET['id'];
$cust_id = (int)$cust_id;
$pushToken = $_GET['fireId'];

if(isset($pushToken) || $pushToken != '') {
  $db_check = $con->prepare("CALL jsp_uw_auth_insertPushToken(?)") or append_log_error("Prepare stm auth_insertPushToken failed: " .$con->error);
  $db_check->bind_param("s", $pushToken);
  $db_check->execute() or append_log_error('auth_insertPushToken exec: '.$stmt->error);
  // $row_count = $db_check->num_rows;
  $db_check->store_result();
  $db_check->bind_result($last_key);
  $db_check->fetch();
  $db_check->close();
  $json_out = json_encode(array("token" => $last_key));
}else {
  $db_check = $con->prepare("CALL jsp_uw_auth_checkCustomerLogin(?)") or append_log_error("Prepare stm auth_checkCustomerLogin failed: " .$con->error);
  $db_check->bind_param("i", $cust_id);
  $db_check->execute() or append_log_error('auth_checkCustomerLogin exec: '.$stmt->error);
  // $row_count = $db_check->num_rows;
  $db_check->store_result();
  $db_check->bind_result($login_key);
  $db_check->fetch();
  $db_check->close();

  $login_key_length = count($login_key);
  if(!isset($login_key) || $login_key == '' || $login_key_length < 1) {
      $status = 0;
  }else {
      $status = 1;
  }
  $json_out = json_encode(array("token" => $status));
}
die($json_out);

?>