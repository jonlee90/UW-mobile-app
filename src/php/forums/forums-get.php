<?
require_once('pre-app.php');

$g_cust_id = $_GET['cust_id'];
$g_cust_id = (int)$g_cust_id;

$currentList = $_GET['listCounter'];
$currentList = (int)$currentList;

$limit = 10;
if($currentList == 0){
  $start = 0;
}else {
  $start = $limit * $currentList;
}

$stmt = $con->prepare("CALL jsp_uw_getForums(?, ?, ?)") or append_log_error("Prepare stm forums-get.php uw_getForums failed: " .$con->error);
$stmt->bind_param('iii', $g_cust_id, $start, $limit);

$stmt2 = $con->prepare("CALL jsp_uw_getForumReplies(?)") or append_log_error("Prepare stm forums-get.php uw_getForumReplies failed: " .$con->error);
$stmt2->bind_param('i', $frm_id);


$stmt->execute() or append_log_error('forums-get.php uw_getForums exec: '.$stmt->error);
$stmt->store_result();
$stmt->bind_result($frm_id, $origin_msg_id, $cust_id, $is_notice, $msg, $youtube_link, $fname, $lname, $reply_count, $date_added, $title, $is_public, $view_count);
$row1 = array();
while($stmt->fetch()){
    $row1[] = array($frm_id, $origin_msg_id, $cust_id, $is_notice, $msg, $youtube_link, $fname, $lname, (int)$reply_count, $date_added, $title, $is_public, (int)$view_count);
}
$con->next_result();
$forum_list = array();
$n1 = count($row1);

for ($i1=0; $i1<$n1; $i1++) {

    $frm_id = $row1[$i1][0];
    if($row1[$i1][8] > 0) {
        $stmt2->execute() or append_log_error('forums-get.php uw_getForumReplies exec: '.$stmt->error);
        $stmt2->store_result();
        $stmt2->bind_result($r_frm_id, $r_origin_msg_id, $r_cust_id, $r_is_notice, $r_msg, $r_youtube_link, $r_fname, $r_lname, $r_date_added, $r_title);
        $row2 = array();
        while($stmt2->fetch()) {
            $row2[] = array('id' => $r_frm_id, 'origin_msg_id' => $r_origin_msg_id, 'cust_id' => $r_cust_id, 'is_notice' => $r_is_notice,
            'message' => $r_msg, 'youtube_link' => $r_youtube_link, 'first_name' => $r_fname, 'last_name' => $r_lname, 'date_added' => $r_date_added, 'title' => $r_title);
        }
        $con->next_result();
    }else {
        $row2 = null;
    }
    $forum_list[] = array('id' => $row1[$i1][0], 'origin_msg_id' => $row1[$i1][1], 'cust_id' => $row1[$i1][2], 'is_notice' => $row1[$i1][3],'message' => $row1[$i1][4],
    'youtube_link' => $row1[$i1][5], 'first_name' => $row1[$i1][6], 'last_name' => $row1[$i1][7], 'reply_count' => $row1[$i1][8], 'date_added' => $row1[$i1][9], 'title' => $row1[$i1][10],
    'is_public' => $row1[$i1][11], 'view_count' => $row1[$i1][12], 'replied_forum' => $row2);

    unset($row2);
}

$json_out = son_encode(array('list' => $forum_list));

die($json_out);

?>