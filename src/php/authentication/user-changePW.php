<?
require_once('pre-app.php');
require_once("PasswordHash.php");
require_once("class.uuid.php");
parse_str(file_get_contents('php://input'), $data);

foreach($data as $key => $value) {
    $_POST[$key] = $value;
}

$post_key = $_POST['key'];
$post_cPw = $_POST['cPassword'];
$post_nPw = $_POST['nPassword'];
		
$db_prep = $con->prepare("CALL jsp_uw_userChangePw_getCustId_loginKey(?)") or append_log_error("Prepare stm userChangePw_getCustId_loginKey failed: " .$con->error);
$db_prep->bind_param("s", $post_key);
$db_prep->execute() or append_log_error('userChangePw_getCustId_loginKey exec: '.$stmt->error);
$db_prep->store_result();
$db_prep->bind_result($cust_id);
$db_prep->fetch();
$db_prep->close();
$con->next_result();

$stmt = $con->prepare("CALL jsp_uw_userChangePw_getCustPw_id(?)") or append_log_error("Prepare stm userChangePw_getCustPw_id failed: " .$con->error);
$stmt->bind_param("i", $cust_id);
$stmt->execute() or append_log_error('userChangePw_getCustPw_id exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($r_pw);
$stmt->fetch();
$con->next_result();

$pw_hasher = new PasswordHash(15, FALSE);
$valid = $pw_hasher->CheckPassword($post_cPw, $r_pw);
if ($valid) {
  $hashedPW = $pw_hasher->HashPassword($post_nPw);

  $stmt = $con->prepare("CALL jsp_uw_userChangePw_updatePw(?, ?)") or append_log_error("Prepare stm userChangePw_updatePw failed: " .$con->error);
  $stmt->bind_param("si", $hashedPW, $cust_id);
  $stmt->execute() or append_log_error('userChangePw_updatePw exec: '.$stmt->error);
  $con->close();
  // output token (if token is available, user logged in)
  $json_out = json_encode(array("token" => $cust_id));
}else{
  $message = "Password is incorrect";
  $json_out = json_encode(array("token" => 0, 'message' => $message));
}

die($json_out);

?>