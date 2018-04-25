<?
require_once('pre-app.php');

$stmt = $con->prepare("CALL jsp_uw_getAdvertisements()") or append_log_error("Prepare stmt get advertisement failed: ".$con->error);
$stmt->execute() or append_log_error('advertisement-get exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $ad_name, $ad_img, $ad_id);
$advertisements = array();
while($stmt->fetch()){
  $advertisements[] = array('id' => $id, 'name' => $ad_name, 'image' =>'http://www.ingenlogic.com/demo/uw/img/db/'.$ad_id. '/' .$ad_img);
}
$stmt->reset();
$con->next_result();
die(json_encode(array('ad' => $advertisements)));

?>