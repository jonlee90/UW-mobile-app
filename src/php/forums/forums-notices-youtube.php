<?
require_once('pre-app.php');

$group_id = $_GET['groupId'];
$group_id = (int)$group_id;

$currentList = $_GET['listCounter'];
$currentList = (int)$currentList;

$limit = 15;
if($currentList == 0){
  $start = 0;
}else {
  $start = $limit * $currentList;
}

$stmt = $con->prepare("CALL jsp_uw_getForumsNoticesYoutube(?, ?, ?)") or append_log_error("Prepare stm uw_getForumsNoticesYoutube failed: " .$con->error);
$stmt->bind_param('iii', $group_id, $start, $limit);
$stmt->execute() or append_log_error('uw_getForumsNoticesYoutube exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $date_rec, $msg, $youtube_link, $title, $is_notice, $reply_count, $view_count);

while($stmt->fetch()){
  $forum_list[] = array('id' => $id, 'date_added' => $date_rec, 'message' => $msg, 'youtube_link' => $youtube_link, 'title' => $title,
  'is_notice' => $is_notice, 'reply_count' => (int)$reply_count, 'view_count' => (int)$view_count);
}
$con->close();


$json_out = json_encode(array('list' => $forum_list));

die($json_out);
?>