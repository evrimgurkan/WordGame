var ResultEnum = {
    time_is_up          : 0,
    question_finish     : 1,
    new_section         : 2,
    sections_completed  : 3,
    none                : 4
}

window.result = ResultEnum.none;

function onButtonClick(buttonID) {
    var buttonValue         = document.getElementById(buttonID).value;
    var questionAnswerID    = "Q_ANSWER" + window.currentQuestionNo;
    var questionAnswer      = window.questionList[questionAnswerID];
    var answer              = false;
    if (buttonValue === questionAnswer) {
        answer = true;
    }
    else{
        answer = false;
    }

    var getResult = checkQuestionAvailability();

    if (result !== ResultEnum.none) {
        //gameOver
        alert("GAME OVER");
    }
    else {
        questionUpdate(answer);
        updateDisplay(answer, buttonID);
    }

    setTimeout(function(){ clearScreenChanges(buttonID) }, 500);
}

function questionUpdate(answer) {
    if (answer === true) {
        window.currentQuestionNo++;
    }
    else{
        window.currentQuestionNo = 1;
    }

    var questionNumberId = 'Q_TEXT' + (window.currentQuestionNo);
    document.getElementById("questionArea").innerHTML = window.questionList[questionNumberId];
}

function clearScreenChanges(buttonID)
{
    document.getElementById(buttonID).style.backgroundColor = "#3c5cff"; // blue
    document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 #3c5cff";
}

// change question number
function updateDisplay(answer, buttonID){

    updateStep(window.currentQuestionNo, window.totalQuestionCount);

    if (answer === true) {
        document.getElementById(buttonID).style.backgroundColor = "#6FDB6F"; // green
        document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 #6FDB6F";
    }
    else {
        document.getElementById(buttonID).style.backgroundColor = "#980F0F";
        document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 #980F0F";
    }
}

function checkQuestionAvailability() {
    if (window.currentQuestionNo >= window.totalQuestionCount) {
        result = ResultEnum.questions_finished;
    }
}