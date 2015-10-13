<?php
header('Content-type: application/json');

$server = "localhost";
$username = "root";
$password = "";
$database = "db_word_game";

$input_section_id = $_GET['s_id'];

$answers_array 	= array();
$section_array	= array();
$question_array	= array();
$result_array	= array();

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

#query section table
$sql_section = "SELECT ss.needed_time AS S_TIME, ss.description AS S_DESC, ss.score_constant AS CONSTANT, ss.id AS S_ID, ss.question_count AS Q_COUNT
FROM tbl_section AS ss
WHERE ss.id = ( 
SELECT MIN( ss.id ) 
FROM tbl_section AS ss
WHERE ss.id > ".$input_section_id." )";

$section_result = mysql_query($sql_section) or die ("Query error: " . mysql_error());

$section_row = mysql_fetch_assoc($section_result);

$section_array = $section_row;

$section_id = $section_row["S_ID"];

#query section table end

#query answer table
$sql_answers = "SELECT aa.text as A_TEXT FROM tbl_answer as aa WHERE aa.section_id = " .$section_id;

$answer_result = mysql_query($sql_answers) or die ("Query error: " . mysql_error());

while($row = mysql_fetch_assoc($answer_result)) {
	$answers_array[] = $row;
}
#query answer table end

#query question table

$sql_question = "SELECT qq.text as Q_TEXT, aa.text as Q_ANSWER
FROM tbl_answer as aa, tbl_question as qq
WHERE qq.answer_id = aa.id and qq.section_id = " .$section_id;

$question_result = mysql_query($sql_question) or die ("Query error: " . mysql_error());

while($question_row = mysql_fetch_assoc($question_result)) {
	$question_array[] = $question_row;
}

#query question table end

mysql_close($con);

#redesign json object

$result_array = array(S_TIME 	=> $section_array['S_TIME'],
					  S_ID 	 	=> $section_array['S_ID'],
					  S_DESC 	=> $section_array['S_DESC'],
					  S_CONST 	=> $section_array['CONSTANT'],
					  Q_COUNT 	=> $section_array['Q_COUNT']);

$temp_answer_array = array();
for ($i=0; $i < count($answers_array) ; $i++) { 
	$temp_answer_array += array($i 	=> $answers_array[$i]['A_TEXT']);
}

$result_array += array(ANSWERS 	=> $temp_answer_array);

$temp_question_array = array();
for ($i=0; $i < count($question_array) ; $i++) { 
	$temp_question_array += array(Q_TEXT.($i + 1) 	=> $question_array[$i]['Q_TEXT'],
								  Q_ANSWER.($i + 1)	=> $question_array[$i]['Q_ANSWER']);
}

$result_array += array(QUESTIONS 	=> $temp_question_array);

echo $_GET['jsoncallback'] . '(' . json_encode($result_array) . ');';
?>