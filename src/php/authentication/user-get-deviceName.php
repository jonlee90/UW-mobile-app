<?php
require_once('pre-app.php');

$device_model = $_GET['device'];

$stmt = $con->prepare("CALL jsp_uw_getUserDeviceName(?)") or append_log_error("Prepare stm uw_getUserDeviceName failed: " .$con->error);
$stmt->bind_param('s', $device_model);
$stmt->execute() or append_log_error('uw_getUserDeviceName exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($device_name);
$stmt->fetch();

$con->close();
$json_out = json_encode(array('device_name' => $device_name));

die($json_out);

?>