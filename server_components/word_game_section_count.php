<?php

header('content-type: application/json; charset=utf-8');
$server = "localhost";
$username = "root";
$password = "ahmet55";
$database = "db_word_game";

$difficulty_level = $_GET['s_diff_level'];

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

// turkish character problem
mysql_query("SET NAMES UTF8");
mysql_query("SET CHARACTER SET utf8");
mysql_query("SET COLLATION_CONNECTION='utf8_general_ci'");
//---------------------------------

#query section count 
$sql_section_count = "SELECT COUNT(ss.id) as S_COUNT
				FROM tbl_section AS ss
				WHERE ss.difficulty_level = ".$difficulty_level;

$section_result_count = mysql_query($sql_section_count) or die ("Query error: " . mysql_error());

$section_row_count = mysql_fetch_assoc($section_result_count);

echo " S_COUNT : " .$section_row_count['S_COUNT'];
echo "\r\n";
#query section count end


mysql_close($con);

#redesign json object

echo $section_row_count;

echo "\r\n";
echo "\r\n";
echo "\r\n";

echo $_GET['jsoncallback'] . '(' . json_encode($section_row_count) . ');';
?>