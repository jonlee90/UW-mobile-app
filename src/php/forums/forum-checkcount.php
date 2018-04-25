<?php
require_once('pre-app.php');

$forum_Id = $_GET['forumId'];
$forum_Id = (int)$forum_Id;
$device_Id = $_GET['deviceId'];
$today = date('Y-m-d');

$stmt = $con->prepare("CALL jsp_uw_insertForumCount(?, ?, ?)") or append_log_error("Prepare stm uw_insertForumCount failed: " .$con->error);
$stmt->bind_param("iss", $forum_Id, $device_Id, $today);
$stmt->execute() or append_log_error('uw_insertForumCount exec: '.$stmt->error);
$stmt->reset();
$con->close();

$json_out = json_encode(array('success' => 'SUCCESS'));

die($json_out);
?>