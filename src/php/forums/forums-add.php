<?
require_once('pre-app.php');
parse_str(file_get_contents('php://input'), $data);

foreach($data as $key => $value) {
    $_POST[$key] = $value;
}

$p_cust_id = $_POST['cust_id'];
$p_cust_id = (int)$p_cust_id;
$p_is_public = $_POST['is_public'];
$p_is_public = (int)$p_is_public;
$p_msg = $_POST['msg'];
$p_title = $_POST['title'];

$p_group_id = 2;

$stmt = $con->prepare("CALL jsp_uw_insertForum(?, ?, ?, ?, ?)") or append_log_error("Prepare stm forums-add.php uw_insertForum failed: " .$con->error);
$stmt->bind_param("isiis", $p_cust_id, $p_msg, $p_group_id, $p_is_public, $p_title);
$stmt->execute() or append_log_error('forums-add.php uw_insertForum exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($newId);
$stmt->fetch();
$stmt->reset();

$json_out = json_encode(array('success' => $newId));

die($json_out);

?>