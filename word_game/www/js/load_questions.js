function onButtonClick(buttonID) {
    var buttonValue         = document.getElementById(buttonID).value;
    var questionAnswerID    = "Q_ANSWER" + window.currentQuestionNumber;
    var questionAnswer      = window.questionList[questionAnswerID];
    var answer              = false;
    if (buttonValue === questionAnswer) {
        answer = true;
    }
    else{
        answer = false;
    }

    questionUpdate(answer);
    updateDisplay(answer, buttonID);
}

function questionUpdate(answer) {
    if (answer === true) {
        window.currentQuestionNumber++;
    }
    else{
        window.currentQuestionNumber = 1;
    }

    var questionNumberId = 'Q_TEXT' + (window.currentQuestionNumber);
    document.getElementById("questionArea").innerHTML = window.questionList[questionNumberId];
}

// change question number
function updateDisplay(answer, buttonID){
    if (answer === true) {
        document.getElementById(buttonID).style.color = "green";

        var step = window.currentQuestionNumber + "/" + window.totalQuestionNumber;
        document.getElementById("stepContainer").innerHTML = step;
    }
    else {
        document.getElementById(buttonID).style.color = "red";
    }
}