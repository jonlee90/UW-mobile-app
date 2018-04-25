<?
require_once('pre-app.php');

$group_id = $_GET['groupId'];
$group_id = (int)$group_id;
if($group_id > 0) {
}else {
    $group_id = null;
}
$stmt = $con->prepare("CALL jsp_uw_getForumsHome(?)") or append_log_error("Prepare stm forums-home.php uw_getForumsHome failed1: " .$con->error);
$stmt->bind_param('i', $group_id);
$stmt->execute() or append_log_error('forums-home.php uw_getForumsHome exec1: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($id, $date_rec, $msg, $youtube_link, $title, $is_notice, $reply_count, $fname, $lname, $view_count);

while($stmt->fetch()){
    $forum_list_notice[] = array('id' => $id, 'date_added' => $date_rec, 'message' => $msg, 'youtube_link' => $youtube_link, 'title' => $title,
    'is_notice' => $is_notice, 'reply_count' => (int)$reply_count, 'first_name' => $fname, 'last_name' => $lname, 'view_count' => (int)$view_count);
}
$con->next_result();

$output_notice = $forum_list_notice;
$group_id_all = null;

$stmt2 = $con->prepare("CALL jsp_uw_getForumsHome(?)") or append_log_error("Prepare stm forums-home.php uw_getForumsHome failed2: " .$con->error);
$stmt2->bind_param('i', $group_id_all);
$stmt2->execute() or append_log_error('forums-home.php uw_getForumsHome exec2: '.$stmt->error);
$stmt2->store_result();
$stmt2->bind_result($id_2, $date_rec_2, $msg_2, $youtube_link_2, $title_2, $is_notice_2, $reply_count_2, $fname_2, $lname_2, $view_count_2);

while($stmt2->fetch()){
    $forum_list_all[] = array('id' => $id_2, 'date_added' => $date_rec_2, 'message' => $msg_2, 'youtube_link' => $youtube_link_2,
    'title' => $title_2, 'is_notice' => $is_notice_2, 'reply_count' => (int)$reply_count_2, 'first_name' => $fname_2, 'last_name' => $lname_2, 'view_count' => (int)$view_count_2);
}
$con->close();

$output_all = $forum_list_all;

$json_out = json_encode(array('list_notice' => $output_notice, 'list_all' => $output_all));

die($json_out);

?>