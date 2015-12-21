<?php

header('content-type: application/json; charset=utf-8');
$server = "localhost";
$username = "root";
$password = "ahmet55";
$database = "db_word_game";

$input_section_no = $_GET['s_no'];
$difficulty_level = $_GET['s_diff_level'];

$answers_array 	= array();
$section_array	= array();
$question_array	= array();
$result_array	= array();

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

// turkish character problem
mysql_query("SET NAMES UTF8");
mysql_query("SET CHARACTER SET utf8");
mysql_query("SET COLLATION_CONNECTION='utf8_general_ci'");
//---------------------------------

#query section table
$sql_section = "SELECT ss.needed_time AS S_TIME, ss.pass_count AS S_PASS_COUNT, ss.description AS S_DESC, ss.score_constant AS CONSTANT, ss.id AS S_ID, ss.question_count AS Q_COUNT
FROM tbl_section AS ss
WHERE ss.section_no = ".$input_section_no ."
AND ss.difficulty_level = ".$difficulty_level;

$section_result = mysql_query($sql_section) or die ("Query error: " . mysql_error());

$section_row = mysql_fetch_assoc($section_result);

$section_array = $section_row;

$section_id = $section_row["S_ID"];

echo "S_ID : " .$section_id;
echo "\r\n";
#query section table end

#query section count 
$sql_section_count = "SELECT COUNT(ss.id) as S_COUNT
				FROM tbl_section AS ss
				WHERE ss.difficulty_level = ".$difficulty_level;

$section_result_count = mysql_query($sql_section_count) or die ("Query error: " . mysql_error());

$section_row_count = mysql_fetch_assoc($section_result_count);

echo " S_COUNT : " .$section_row_count['S_COUNT'];
echo "\r\n";
#query section count end

#query answer table
$sql_answers = "SELECT aa.text as A_TEXT FROM tbl_answer as aa WHERE aa.section_id = " .$section_id;

$answer_result = mysql_query($sql_answers) or die ("Query error: " . mysql_error());

while($row = mysql_fetch_assoc($answer_result)) {
	$answers_array[] = $row;
	echo " row : " .$row;
echo "\r\n";
}
#query answer table end

#query question table

$sql_question = "SELECT qq.text as Q_TEXT, aa.text as Q_ANSWER
FROM tbl_answer as aa, tbl_question as qq
WHERE qq.answer_id = aa.id and qq.section_id = " .$section_id."
ORDER BY qq.text ASC";

$question_result = mysql_query($sql_question) or die ("Query error: " . mysql_error());

while($question_row = mysql_fetch_assoc($question_result)) {
	$question_array[] = $question_row;
	echo " question_row : " .$question_row;
	echo "\r\n";
	echo "\r\n";
}

#query question table end

mysql_close($con);

#redesign json object

$result_array = array(S_TIME 	=> $section_array['S_TIME'],
					  S_PASS_COUNT => $section_array['S_PASS_COUNT'],
					  S_ID 	 	=> $section_array['S_ID'],
					  S_DESC 	=> $section_array['S_DESC'],
					  S_COUNT 	=> $section_row_count['S_COUNT'],
					  S_CONST 	=> $section_array['CONSTANT'],
					  Q_COUNT 	=> $section_array['Q_COUNT']);

echo $result_array;

$temp_answer_array = array();
for ($i=0; $i < count($answers_array) ; $i++) { 
	$temp_answer_array += array($i 	=> $answers_array[$i]['A_TEXT']);
	echo " answers_array[$i]['A_TEXT'] : " .$answers_array[$i]['A_TEXT'];
	echo "\r\n";
	echo "\r\n";
}

$result_array += array(ANSWERS 	=> $temp_answer_array);

$temp_question_array = array();
for ($i=0; $i < count($question_array) ; $i++) { 
	$temp_question_array += array(Q_TEXT.($i + 1) 	=> $question_array[$i]['Q_TEXT'],
								  Q_ANSWER.($i + 1)	=> $question_array[$i]['Q_ANSWER']);
	echo " question_array[$i]['Q_TEXT'] : " .$question_array[$i]['Q_TEXT'];
	echo "\r\n";
	echo " question_array[$i]['Q_ANSWER'] : " .$question_array[$i]['Q_ANSWER'];
	echo "\r\n";
	echo "\r\n";
}

$result_array += array(QUESTIONS 	=> $temp_question_array);
echo "\r\n";
echo "\r\n";
echo "\r\n";
echo json_encode($result_array);

echo $_GET['jsoncallback'] . '(' . json_encode($result_array) . ');';
?>