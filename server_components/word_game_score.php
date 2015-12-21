

<?php

/* turkish character problem
1-)mysql veritabanin collation UTF8_generalci yapin(ayni sekilde tablonuzunda utf8_generalci olacak)
2-)sonra form.php dosyasinda en başa veritabanına bağlantı sağladıktan sonra aşağıdaki satırları ekleyin
mysql_query("SET NAMES UTF8");
mysql_query("SET CHARACTER SET utf8");
mysql_query("SET COLLATION_CONNECTION='utf8_general_ci'");
3-)sayfanın meta kısmında kodlamasını utf-8 yaptınızmı olay tamamdır.
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
4-)aynı şekilde veritabanını kayıt yaparkende bu yolu izlerseniz, Hiç bir şekilde türkçe dil problemiyle karşılaşmazsınız.
*/

header('content-type: application/json; charset=utf-8');

$server = "localhost";
$username = "root";
$password = "ahmet55";
$database = "db_word_game";

$input_section_id = $_GET['s_id'];
$input_user_id = $_GET['user_id'];
$input_score = $_GET['score'];



$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

// turkish character problem
mysql_query("SET NAMES UTF8");
mysql_query("SET CHARACTER SET utf8");
mysql_query("SET COLLATION_CONNECTION='utf8_general_ci'");
//---------------------------------


#query score count 
$sql_score_count = "SELECT COUNT(sc.id) as SCORE_COUNT
					  FROM tbl_scores AS sc
					  WHERE sc.section_id = ".$input_section_id;


$score_result_count = mysql_query($sql_score_count) or die ("Query error: " . mysql_error());

$scores_row_count = mysql_fetch_assoc($score_result_count);
#query score count end

#query scores greater then user score
$scores_array 	= array();
$sql_scores = "SELECT sc.score as SCORES
			   FROM tbl_scores AS sc
			   WHERE sc.score > " .$input_score. "
		 	   AND sc.section_id = " .$input_section_id;

$scores_result = mysql_query($sql_scores) or die ("Query error: " . mysql_error());

while($row = mysql_fetch_assoc($scores_result)) {
	$scores_array[] = $row;
}
#query scores end


#Insert Score
$sql_insert_score = "INSERT INTO tbl_scores (section_id,user_id,score) VALUES (".$input_section_id.",".$input_user_id.",".$input_score.")";
$scores_result = mysql_query($sql_insert_score) or die ("Query error: " . mysql_error());
#Insert Score End

mysql_close($con);

#redesign json object

$result_array = array(SECTION_SCORES_COUNT 	=> $scores_row_count['SCORE_COUNT']);

$temp_scores_array = array();
for ($i=0; $i < count($scores_array) ; $i++) {
	$temp_scores_array += array($i 	=> $scores_array[$i]['SCORES']);
}

$result_array += array(SCORES 	=> $temp_scores_array);


echo $_GET['jsoncallback'] . '(' . json_encode($result_array) . ');';
?>