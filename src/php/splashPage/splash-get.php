<?
require_once('pre-app.php');

$g_adId = $_GET['id'];
$g_adId = (int)$g_adId;

if($g_adId > 0) {
  $stmt = $con->prepare("CALL jsp_uw_getSpecificSplashPage(?)") or append_log_error("Prepare stmt get specific splash failed: ".$con->error);
  $stmt->bind_param('i', $g_adId);
}else {
  $stmt = $con->prepare("CALL jsp_uw_getSplashPage()") or append_log_error("Prepare stmt get splash failed: ".$con->error);
}
$stmt->execute() or append_log_error('splash-get exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $ad_name, $ad_img, $ad_id);
$advertisements = array();
while($stmt->fetch()){
  $advertisements[] = array('id' => $id, 'name' => $ad_name, 'image' =>'http://www.ingenlogic.com/demo/uw/img/db/'.$ad_id. '/' .$ad_img);
}
$stmt->reset();
$con->next_result();
$json_out = json_encode(array('splash' => $advertisements));

die($json_out);
?>