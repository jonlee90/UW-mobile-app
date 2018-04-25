<?
require_once('pre-app.php');

$qry = 
"CREATE PROCEDURE jsp_uw_auth_updateCustLoginLoginkey(p_login_key VARCHAR(40), p_device_uuid VARCHAR(60), p_customer_id INT)
BEGIN

INSERT INTO customer_login(device_uuid, login_key, customer_id)
VALUES (p_device_uuid, p_login_key, p_customer_id)
ON DUPLICATE KEY UPDATE login_key = p_login_key, customer_id = p_customer_id;

END";

if (($res = $mysqli->query($qry)) ===FALSE) {
  die('fail prep: '.$mysqli->error);
}

die('success on: '.$qry);


/*

  ************ get customer ID ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_getCustId(p_email VARCHAR(100))
  BEGIN
  
  SELECT id 
  FROM customers 
  WHERE email= p_email;

  END";


  ************ insert customer ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_insertCust(
    p_email VARCHAR(100), p_pw VARCHAR(100), p_fname VARCHAR(50), p_lname VARCHAR(50), p_date_login VARCHAR(100), p_storeId INT, p_dob VARCHAR(100), p_date_contract VARCHAR(100))
  BEGIN

  INSERT INTO customers(email, pw, fname, lname, date_login, store_id, dob, date_contract_begin) 
  VALUES(p_email, p_pw, p_fname, p_lname, p_date_login, p_storeId, p_dob, p_date_contract);

  SELECT LAST_INSERT_ID();

  END";


  ************ insert customer ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_getCustIdFrmCustLogin(p_device_uuid VARCHAR(60))
  BEGIN

  SELECT customer_id 
  FROM customer_login 
  WHERE device_uuid = p_device_uuid;

  END";


  ************ insert customer login ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_insertCustLogin(p_device_uuid VARCHAR(60), p_login_key VARCHAR(40), p_customer_id INT)
  BEGIN

  INSERT INTO customer_login(device_uuid, login_key, customer_id) 
  VALUES(p_device_uuid, p_login_key, p_customer_id);

  END";


  ************ update customer login ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_updateCustLogin(p_login_key VARCHAR(40), p_customer_id INT, p_device_uuid VARCHAR(60))
  BEGIN

  UPDATE customer_login 
  SET login_key = p_login_key, customer_id = p_customer_id 
  WHERE device_uuid = p_device_uuid;

  END";


  ************ select customer ID and PW ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_selectIdPw(p_email VARCHAR(100))
  BEGIN

  SELECT id, pw 
  FROM customers 
  WHERE email = p_email;

  END";


  ************ update customer login key ************
  $qry = 
  "CREATE PROCEDURE jsp_uw_auth_updateCustLoginLoginkey(p_login_key VARCHAR(40), p_device_uuid VARCHAR(60), p_customer_id INT)
  BEGIN

  INSERT INTO customer_login(device_uuid, login_key, customer_id)
  VALUES (p_device_uuid, p_login_key, p_customer_id)
  ON DUPLICATE KEY UPDATE login_key = p_login_key, customer_id = p_customer_id;

  END";

*/
?>