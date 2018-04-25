<?
require_once('pre-app.php');

$currentList = $_GET['listCounter'];
$currentList = (int)$currentList;

$limit = 15;
if($currentList == 0){
  $start = 0;
}else {
  $start = $limit * $currentList;
}

$stmt = $con->prepare("CALL jsp_uw_getLinks()") or append_log_error("Prepare stm links-get.php uw_getLinks failed: " .$con->error);
$stmt->execute() or append_log_error('links-get.php uw_getLinks exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $link_name, $url);
$links = array();
while($stmt->fetch()){
  $links[] = array('id' => $id, 'link_name' => $link_name, 'url' => $url);
}
$con->next_result();

$output = array_slice($links, $start, $limit);

$json_out = json_encode(array('list' => $output)); 


?>