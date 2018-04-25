<?php
require_once('pre-app.php');
parse_str(file_get_contents('php://input'), $data);

foreach($data as $key => $value) {
    $_POST[$key] = $value;
}
$id = $_POST['id'];
$id = (int)$id;
$fName = $_POST['fName'];
$lName = $_POST['lName'];
$email = $_POST['email'];
$dob = $_POST['dob'];

$stmt = $con->prepare("CALL jsp_uw_updateCust(?, ?, ?, ?, ?)") or append_log_error("Prepare stm uw_updateCust failed: " .$con->error);
$stmt->bind_param("issss", $id, $fName, $lName, $email, $dob);
$stmt->execute() or append_log_error('uw_updateCust exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($g_fName, $g_lName, $g_email, $g_dob);
$stmt->fetch();
$con->close();

$json_out = json_encode(array('success' => 'Update Successfull!', 'fName' => $g_fName, 'lName' => $g_lName, 'email' => $g_email, 'dob' => $g_dob));

die($json_out);
?>