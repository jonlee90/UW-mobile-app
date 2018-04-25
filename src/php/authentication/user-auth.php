<?
require_once('pre-app.php');
require_once("PasswordHash.php");
require_once("class.uuid.php");
parse_str(file_get_contents('php://input'), $data);

foreach($data as $key => $value) {
    $_POST[$key] = $value;
}

$post_email = $_POST['email'];
$post_dob = $_POST['dob'];
$post_pw = $_POST['pw'];
$post_deviceUid = $_POST['deviceUid'];
$post_fname = $_POST['fname'];
$post_lname = $_POST['lname'];
$post_storeId = $_POST['storeId']; 
$post_storeId = (int)$post_storeId;

$today = date('Y-m-d H:i:s');
$contract_date = date('Y-m-d');
$post_dob = date('Y-m-d', strtotime($post_dob));

if(isset($post_fname) || $post_fname != ''){
    $db_check = $con->prepare("CALL jsp_uw_auth_getCustId(?)") or append_log_error("Prepare stm auth_getCustId failed: " .$con->error);
    $db_check->bind_param("s", $post_email);
    $db_check->execute() or append_log_error('auth_getCustId exec: '.$stmt->error);
    $db_check->store_result();
    $db_check->bind_result($id_check);
    $db_check->fetch();
    $db_check->reset();
    $con->next_result();
    if($id_check > 0) {
        die(json_encode(array("token" => 0)));
    }
   
    $bcrypt1 = new PasswordHash(15, FALSE);
    // Hash the input password and insert that into the database
    $hashedPW = $bcrypt1->HashPassword($post_pw);

    $stmt = $con->prepare("CALL jsp_uw_auth_insertCust(?, ?, ?, ?, ?, ?, ?, ?)") or append_log_error("Prepare stm auth_insertCust failed: " .$con->error);
    $stmt->bind_param("sssssiss", $post_email, $hashedPW, $post_fname, $post_lname, $today, $post_storeId, $post_dob, $contract_date);
    $stmt->execute() or append_log_error('auth_insertCust exec: '.$stmt->error);
    $stmt->store_result();
    $stmt->bind_result($newId);
    $stmt->fetch();
    $stmt->reset();
    $con->next_result();
    $login_key = UUID::v4();

    $db_prep = $con->prepare("CALL jsp_uw_auth_getCustIdFrmCustLogin(?)") or append_log_error("Prepare stm auth_getCustIdFrmCustLogin failed: " .$con->error);
    $db_prep->bind_param("s", $post_deviceUid);
    $db_prep->execute() or append_log_error('auth_getCustIdFrmCustLogin exec: '.$stmt->error);
    $db_prep->store_result();
    $db_prep->bind_result($r_id);
    $db_prep->fetch();
    $db_prep->close();
    $con->next_result();
    if($r_id > 0){
        $stmt = $con->prepare("CALL jsp_uw_auth_updateCustLogin(?, ?, ?)") or append_log_error("Prepare stm auth_updateCustLogin failed: " .$con->error);
        $stmt->bind_param("sis", $login_key, $newId, $post_deviceUid);
    }else {
        $stmt = $con->prepare("CALL jsp_uw_auth_insertCustLogin(?, ?, ?)") or append_log_error("Prepare stm auth_insertCustLogin failed: " .$con->error);
        $stmt->bind_param("ssi", $post_deviceUid, $login_key, $newId);
    }
    $stmt->execute() or append_log_error('auth_CustLogin exec: '.$stmt->error);
    $stmt->reset();
    $con->next_result();
    $json_out = json_encode(array("token" => $login_key, 'id' => $newId));
}else {
    // get account info based on account-name		
    $db_prep = $con->prepare("CALL jsp_uw_auth_selectIdPw(?)") or append_log_error("Prepare stm auth_selectIdPw failed: " .$con->error);
    $db_prep->bind_param("s", $post_email);
    $db_prep->execute() or append_log_error('auth_selectIdPw exec: '.$stmt->error);
    $db_prep->store_result();
    // if the user is an existing user
    $count = $db_prep->num_rows;
    if ($count >0) {
        $db_prep->bind_result($r_id, $r_pw);
        $db_prep->fetch();
    }else {
        $message = "There are no accounts with this email";
        $json_out = json_encode(array("token" => 0, 'message' => $message));
        $con->close();
        die($json_out);
    }
    $db_prep->reset();
    $con->next_result();
    $pw_hasher = new PasswordHash(15, FALSE);
    $valid = $pw_hasher->CheckPassword($post_pw, $r_pw);
    if ($count == 1 AND $valid) {
        // login success
        $login_key = UUID::v4();
        $stmt = $con->prepare("CALL jsp_uw_auth_updateCustLoginLoginkey(?, ?, ?)") or append_log_error("Prepare stm auth_updateCustLoginLoginkey failed: " .$con->error);
        $stmt->bind_param("ssi", $login_key, $post_deviceUid, $r_id);
        $stmt->execute() or append_log_error('auth_updateCustLoginLoginkey exec: '.$stmt->error);

        // output token (if token is available, user logged in)
        $json_out = json_encode(array("token" => $login_key, 'id' => $r_id));

    }else if(!$valid) {
        $message = "Email or password does not match";
        $json_out = json_encode(array("token" => 0, 'message' => $message));
    }else if($count < 1) {
        $message = "Email does not exist";
        $json_out = json_encode(array("token" => 0, 'message' => $message));
    }else {
        $message = "Login failed";
        $json_out = json_encode(array("token" => 0, 'message' => $message));
    }
}
$con->close();
die($json_out);

?>