<?
require_once('pre-app.php');

$g_lat = $_GET['lat'];
$g_lat = (float)$g_lat;
$g_lng = $_GET['lng'];
$g_lng = (float)$g_lng;
$stmt = $con->prepare("CALL jsp_uw_getStores()") or append_log_error("Prepare stm stores-get.php uw_getStores failed: " .$con->error);

$stmt2 = $con->prepare("CALL jsp_uw_getStoreImg(?)") or append_log_error("Prepare stm stores-get.php uw_getStoreImg failed: " .$con->error);
$stmt2->bind_param('i', $store_id);

$stmt->execute() or append_log_error('stores-get.php uw_getStores exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $s_name, $addr, $addr2, $city, $state, $zip, $tel1, $tel2, $tel3, $fax, $email, $manager_name, $default_img_id, $manager_img, $img_id, $yelp_biz_id, $lat, $lng);
$row1 = array();
while($stmt->fetch()){
  if($img_id > 0 && strlen($manager_img) > 0) {
    $manager = 'http://www.ingenlogic.com/demo/uw/img/db/'.$img_id. '/' .$manager_img;
  }else {
    $manager = NULL;
  }
  $row1[] = array($id, $s_name, $addr, $addr2, $city, $state, $zip, $tel1, $tel2, $tel3, $fax, $email, $manager_name, $default_img_id, 
  $manager, $yelp_biz_id, $lat, $lng);
}
$con->next_result();
$store_list = array();
$n1 = count($row1);
for ($i1=0; $i1<$n1; $i1++) {
    $store_id = $row1[$i1][0];
    $stmt2->execute() or append_log_error('stores-get.php uw_getStoreImg exec: '.$stmt->error);
    $stmt2->store_result();
    $stmt2->bind_result($img_title, $url, $img_id, $sort_order);
    $row2 = array();
    while($stmt2->fetch()) {
      $row2[] = array('id' => $img_id, 'img_title' => $img_title, 'url' => 'http://www.ingenlogic.com/demo/uw/img/db/'.$img_id. '/' .$url, 'sort_order' => $sort_order);
    }
    $con->next_result();
    
    if(strlen($row1[$i1][15]) > 1) {
      $yelp_biz = json_decode(getYelp($row1[$i1][15]));
    }else {
      $yelp_biz = NULL;
    }
    if($g_lat != 0 && $g_lng != 0) {
      $current_distance = distance($g_lat, $g_lng, $row1[$i1][16], $row1[$i1][17], 'M');
    }
    $store_list[] = array('id' => $row1[$i1][0], 's_name' => $row1[$i1][1], 'addr' => $row1[$i1][2], 'addr2' => $row1[$i1][3], 'city' => $row1[$i1][4], 'state' => $row1[$i1][5], 'zip' => $row1[$i1][6],
    'tel1' => $row1[$i1][7], 'tel2' => $row1[$i1][8], 'tel3' => $row1[$i1][9], 'fax' =>  $row1[$i1][10], 'email' => $row1[$i1][11], 'manager_name' => $row1[$i1][12], 'default_img_id' => $row1[$i1][13], 
    'store_imgs' => $row2, 'manager_img' => $row1[$i1][14], 'yelp' =>  $yelp_biz, "distance" => $current_distance, 'lat' => $row1[$i1][16], 'lng' => $row1[$i1][17]);

    unset($row2);
}
if($g_lat != 0 && $g_lng != 0) {
  foreach ($store_list as $key => $row) {
    $distance[$key]  = $row['distance'];
  }
  array_multisort($distance, SORT_ASC, $store_list); 
}
$json_out = json_encode(array('list' => $store_list));

die($json_out);




?>