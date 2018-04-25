<?
require_once('pre-app.php');

$stmt = $con->prepare("CALL jsp_uw_getStoresForAcc()") or append_log_error("Prepare stm store-get-account.php uw_getStoresForAcc failed: " .$con->error);
$stmt->execute() or append_log_error('store-get-account.php uw_getStoresForAcc exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $s_name);
while($stmt->fetch()){
  $store_list[] = array('id' => $id, 's_name' => $s_name);
}
$stmt->close();
$json_out = json_encode(array('list' => $store_list)));

die($json_out);
?>