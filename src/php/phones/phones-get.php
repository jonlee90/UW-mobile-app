<?
require_once('pre-app.php');

$currentList = $_GET['listCounter'];
$currentList = (int)$currentList;

$limit = 10;

if($currentList == 0){
  $start = 0;
}else {
  $start = $limit * $currentList;
}

$stmt = $con->prepare("CALL jsp_uw_getPhones(?, ?)") or append_log_error("Prepare stm phone-get.php uw_getPhones failed: " .$con->error);
$stmt->bind_param('ii', $start, $limit);

$stmt2 = $con->prepare("CALL jsp_uw_getPhoneAttr(?)") or append_log_error("Prepare stm phone-get.php uw_getPhoneAttr failed: " .$con->error);
$stmt2->bind_param('i', $phone_id);

$stmt3 = $con->prepare("CALL jsp_uw_getPhoneImg(?, ?)") or append_log_error("Prepare stm phone-get.php uw_getPhoneImg failed: " .$con->error);
$stmt3->bind_param('ii', $phone_id, $main_image_id);

$stmt->execute() or append_log_error('links-get.php uw_getPhones exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $brand, $p_name, $main_img_id, $price, $desc_short, $price_sale, $is_new, $is_hot);
$row1 = array();
while($stmt->fetch()){
    $row1[] = array($id, $brand, $p_name, $main_img_id, $price, $desc_short, $price_sale, $is_new, $is_hot);
}
$con->next_result();
$phone_list = array();
$n1 = count($row1);
for ($i1=0; $i1<$n1; $i1++) {

  $main_image_id = $row1[$i1][3];
  
  $phone_id = $row1[$i1][0];
  $stmt2->execute() or append_log_error('links-get.php uw_getPhoneAttr exec: '.$stmt->error);
  $stmt2->store_result();
  $stmt2->bind_result($attr_id, $attr_val, $attr_name);
  $row2 = array();
  while($stmt2->fetch()) {
      $row2[] = array('attr_id' => $attr_id, 'attr_val' => $attr_val, 'attr_name' => $attr_name);
  }
  $con->next_result();

  $stmt3->execute() or append_log_error('links-get.php uw_getPhoneImg exec: '.$stmt->error);
  $stmt3->store_result();
  $stmt3->bind_result($img_id, $img_title, $url, $sort_order);
  $row3 = array();
  while($stmt3->fetch()) {
      $row3[] = array('id' => $img_id, 'image_title' => $img_title, 'image' =>'http://www.ingenlogic.com/demo/uw/img/db/'.$img_id. '/' .$url, 'sort_order' => $sort_order);
  }
  $con->next_result();

  $phone_list[] = array('id' => $row1[$i1][0], 'brand' => $row1[$i1][1], 'p_name' => $row1[$i1][2], 'main_img_id' => $row1[$i1][3], 'price' => $row1[$i1][4], 'desc_short' => $row1[$i1][5],
  'price_sale' => $row1[$i1][6], 'is_new' => $row1[$i1][7], 'is_hot' => $row1[$i1][8], 'phone_attr' => $row2, 'photos' => $row3);
    //check unset if it doesnt works
  unset($row2);
  unset($row3);
}
$json_out = json_encode(array('list' => $phone_list));

die($json_out);

?>