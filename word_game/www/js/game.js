/**
 * Created by ahmetce on 24.10.2015.
 */



var Game = function (iGameData) {

    var _self = this;
    var _application = new Application();
    var generatedSectionID;
    var _timerInterval,
        resetGameCount;
    var _gameStates = {
        time_is_up: 0,
        section_completed: 1,
        continue : 2,
        none: 3
    };

    var _gameData = iGameData;

    var SCORE_CONST = 10;
    var STR_TIME_IS_UP = 'Zaman Tükendi!';
    var STR_COMPLETED_QUESTIONS = 'Tebrikler, Tüm soruları cevapladınız.';

    _self.init = function (){
        _self.currentGameState =  _gameStates.continue;
        _self.currentQuestionNo = 1;
        resetGameCount = 0;
        generatedSectionID = 1;
        $('#questionArea').html('');
        document.getElementById("leftButton").innerHTML = '';
        document.getElementById("leftButton").value = '';
        document.getElementById("rightButton").innerHTML = '';
        document.getElementById("rightButton").value = '';
    }

    _self.startGame = function (){

        var descriptionArea = $('#descriptionArea');
        var leftButton      = document.getElementById("leftButton");
        var rightButton     = document.getElementById("rightButton");
        var questionArea    = $('#questionArea');

        leftButton.innerHTML = _gameData.leftBtnValue;
        leftButton.value = _gameData.leftBtnValue;
        rightButton.innerHTML = _gameData.rightBtnValue;
        rightButton.value = _gameData.rightBtnValue;

        var questionNumberId = 'Q_TEXT' + (_self.currentQuestionNo);
        var question = _gameData.questionList[questionNumberId];
        questionArea.append(question);

        _self.initTimers(_gameData.sectionTime);
        _self.updateStep();
    };

    _self.initTimers = function (iTime){
        var time = iTime;
        var initialOffset = '440';
        var i = 1;
        var timer_value = document.getElementById('timerValue');
        timer_value.innerHTML = time;
        _timerInterval = setInterval(function() {
            $('#timer_circle').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
            timer_value.innerHTML = time - i;

            if (i == time) {
                _self.currentGameState = _gameStates.time_is_up;
                _self.notifyMessage(STR_TIME_IS_UP);
                _self.calculateScore(0);
            }
            else if (_self.currentGameState === _gameStates.section_completed) {
                _self.notifyMessage(STR_COMPLETED_QUESTIONS);
                _self.calculateScore(time - i);
            }

            i++;
        }, 1000);
    };

    _self.updateStep = function () {
        _self.updateProgressBar();
        if (_self.currentGameState !== _gameStates.section_completed) {
            document.getElementById('stepValue').innerHTML = _self.currentQuestionNo +
                                                             '/' +
                                                             _gameData.totalQuestionCount;
        }
    };

    _self.updateProgressBar = function () {
        var progElement = document.getElementById('progressBar');
        if (_self.currentQuestionNo === 1)
        {
            progElement.style.width = '0px';
        }
        else if (_self.currentGameState === _gameStates.section_completed)
        {
            progElement.style.width = '100%';
        }
        else
        {
            progElement.style.width = ((_self.currentQuestionNo - 1) /
                                        _gameData.totalQuestionCount ) *
                                        100 + '%';
        }
    };

    _self.onButtonClick = function (buttonID) {

        if (_self.currentGameState === _gameStates.time_is_up) {
            //gameOver
            _self.notifyMessage(STR_TIME_IS_UP);
            return;
        }

        var _clickedButtonValue  = document.getElementById(buttonID).value;
        var _questionAnswerID    = "Q_ANSWER" + _self.currentQuestionNo;
        var _questionAnswer      = _gameData.questionList[_questionAnswerID];
        var _isAnswerCorrect     = false;

        if (_clickedButtonValue === _questionAnswer) {
            _isAnswerCorrect = true;
        }
        else {
            _isAnswerCorrect = false;
            resetGameCount++;
        }

        _self.checkNextQuestionAvailability();
        if (_self.currentGameState === _gameStates.continue) {
            _self.questionUpdate(_isAnswerCorrect);
        }

        _self.updateDisplay(_isAnswerCorrect, buttonID);
        setTimeout(function(){
            _self.clearScreenChanges(buttonID)
        }, 500);
    };

    _self.questionUpdate = function (answer) {

        if (answer === true) {
            _self.currentQuestionNo++;
        }
        else{
            _self.currentQuestionNo = 1;
        }

        var questionNumberId = 'Q_TEXT' + (_self.currentQuestionNo);
        document.getElementById("questionArea").innerHTML = _gameData.questionList[questionNumberId];
    };

    _self.clearScreenChanges = function (buttonID) {

        document.getElementById(buttonID).style.backgroundColor = "#3c5cff"; // blue
        document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 #3c5cff";
    };

    _self.updateDisplay = function (answer, buttonID) {

        _self.updateStep();
        if (answer === true) {
            document.getElementById(buttonID).style.backgroundColor = "#6FDB6F"; // green
            document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 #6FDB6F";
        }
        else {
            document.getElementById(buttonID).style.backgroundColor = "#980F0F";
            document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 #980F0F";
        }
    };

    _self.checkNextQuestionAvailability = function () {

        if (_self.currentQuestionNo >= _gameData.totalQuestionCount) {
            _self.currentGameState = _gameStates.section_completed;
        }
    };

    _self.calculateScore = function (remainedTime) {

        clearInterval(_timerInterval);
        _self.getNewSection();// get new section data async
        var calculatedScoreConstant = SCORE_CONST;
        if (SCORE_CONST < (resetGameCount + 4))
        {
            calculatedScoreConstant  = 4;
        }
        else
        {
            calculatedScoreConstant = (SCORE_CONST - resetGameCount);
        }
        var score = (calculatedScoreConstant * _self.currentQuestionNo) + remainedTime;
        sessionStorage.setItem('score',score);

        _self.notifyMessage(score);
    };

    _self.notifyMessage = function (message) {
        alert(message);
    };

    _self.getNewSection = function () {
        // generate random value between 1-100
        generatedSectionID = Math.floor((Math.random() * 100) + 1) % 1 +1;
        _application.getGameData(generatedSectionID);
        setTimeout(function(){
            _gameData = JSON.parse(sessionStorage.getItem("gameData"));
            _self.init();
            _self.startGame();
        }, 5000);
    };

};
