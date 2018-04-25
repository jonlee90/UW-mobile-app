<?
require_once('pre-app.php');
require_once("PasswordHash.php");
require_once("class.uuid.php");
parse_str(file_get_contents('php://input'), $data);

date_default_timezone_set('America/Los_Angeles');
define (CURRENT_EMAIL, "ingen.ultimate@gmail.com");

foreach($data as $key => $value) {
  $_POST[$key] = $value;
}

$post_email = $_POST['email'];
$post_key = $_POST['key'];
$post_pw = $_POST['pw'];

if(isset($post_key) || $post_key != '') {
  $stmt = $con->prepare("CALL jsp_uw_auth_checkCustReset(?)") or append_log_error("Prepare stm auth_checkCustReset failed: " .$con->error);
  $stmt->bind_param("s", $post_key);
  $stmt->execute() or append_log_error('auth_checkCustReset exec: '.$stmt->error);
  $stmt->store_result();
  $stmt->bind_result($r_id);
  $stmt->fetch();
  $stmt->reset();
  $con->next_result();
  if($r_id > 0) {
    $bcrypt1 = new PasswordHash(15, FALSE);
    $hashedPW = $bcrypt1->HashPassword($post_pw);
    // need to change the password
    $stmt = $con->prepare("CALL jsp_uw_auth_updateForgotPw(?, ?)") or append_log_error("Prepare stm auth_updateForgotPw failed: " .$con->error);
    $stmt->bind_param("is", $r_id, $hashedPW);
    $stmt->execute() or append_log_error('auth_updateForgotPw exec: '.$stmt->error);
    $con->close();
    $json_out = json_encode(array("Success" => 'Password has been modified'));
  }else {
    $json_out = json_encode(array("error" => 'Invalid Code'));
  }
}else {
  $stmt = $con->prepare("CALL jsp_uw_auth_getCustId(?)") or append_log_error("Prepare stm auth_getCustId failed: " .$con->error);
  $stmt->bind_param("s", $post_email);
  $stmt->execute() or append_log_error('auth_getCustId exec: '.$stmt->error);
  $stmt->store_result();
  $stmt->bind_result($r_id);
  $stmt->fetch();
  $stmt->reset();
  $con->next_result();

  $ran_code = random_str(6);
  
  $msg =
    "Please enter the following code to recover your password. <br>".
    "Security Code: $ran_code";
          
  $mail_sent = send_Swift_mail($post_email, "Ultimate Wireless: Password Recovery", $msg);

  if($r_id > 0) {
    $stmt = $con->prepare("CALL jsp_uw_auth_insertCustReset(?, ?)") or append_log_error("Prepare stm auth_insertCustReset failed: " .$con->error);
    $stmt->bind_param("is", $r_id, $ran_code);
    $stmt->execute() or append_log_error('auth_insertCustReset exec: '.$stmt->error);
    $con->close();

    $json_out = json_encode(array("Success" => 'Please check your email for the 6 digit code'));
  }else {
    $json_out = json_encode(array("error" => 'Email does not exist in our system'));
  }
}

die($json_out);


?>