/**
 * Created by ahmetce on 24.10.2015.
 */

var Game = function () {

    var _self = this;
    var _application = new Application(_self);
    var _generatedSectionID;
    var _timerInterval,
        _resetGameCount,
        _currentTime,
        _currentScore = 0,
        _totalScore = 0,
        _sectionCount = 1; // TODO: should be increased

    var _gameStates = {
        time_is_up: 0,
        section_completed: 1,
        continue : 2,
        none: 3
    };

    var _gameData ;

    _self.init = function (){
        _totalScore = 0;
        _application.bindEvents();
        _self.getSectionQuestions();
    };

    _self.getSectionQuestions = function () {

        _self.showLoadingIcon(CONSTANTS.strings.game.MESSAGE_QUESTIONS_LOADING);
        // generate random value between 1 and section count
        _generatedSectionID = Math.floor((Math.random() * _sectionCount) + 1);
        _application.getGameData(_generatedSectionID);
    };

    _self.onSectionQuestionsLoaded = function (data) {
        _gameData = data;
        _sectionCount = _gameData.sectionCount -1;// minus 1 because of the webservice problem
        _self.clearAllScreen();
        _self.startGame();
    };

    _self.clearAllScreen = function (){
        _self.showLoadingIcon(CONSTANTS.strings.game.MESSAGE_QUESTIONS_LOADING);
        _self.currentGameState =  _gameStates.continue;
        _self.currentQuestionNo = 1;
        _resetGameCount = 0;
        _currentTime = 0;
        _currentScore = 0;
        _generatedSectionID = 1;
        $('#questionArea').html('');
        $('#descriptionArea').html('');
        document.getElementById("leftButton").innerHTML = '';
        document.getElementById("leftButton").value = '';
        document.getElementById("rightButton").innerHTML = '';
        document.getElementById("rightButton").value = '';
    };

    _self.startGame = function (){

        var descriptionArea = $('#descriptionArea');
        var leftButton      = document.getElementById("leftButton");
        var rightButton     = document.getElementById("rightButton");
        var questionArea    = $('#questionArea');
        _currentScore = 0;
        leftButton.innerHTML = _gameData.leftBtnValue;
        leftButton.value = _gameData.leftBtnValue;
        rightButton.innerHTML = _gameData.rightBtnValue;
        rightButton.value = _gameData.rightBtnValue;


        var questionNumberId = 'Q_TEXT' + (_self.currentQuestionNo);
        var question = _gameData.questionList[questionNumberId];
        questionArea.append(question);
        descriptionArea.html(_gameData.description);
        _self.hideLoadingIcon();
        _self.initTimers(_gameData.sectionTime);
        _self.updateStep();
    };

    _self.initTimers = function (iTime){
        var time = iTime;
        var initialOffset = '440';
        var i = 1;
        var timer_value = document.getElementById('timerValue');
        _currentTime = time;

        _timerInterval = setInterval(function() {
            $('#timer_circle').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
            _currentTime = time - i;

            timer_value.innerHTML = _currentTime;

            if (i == time) {
                _self.currentGameState = _gameStates.time_is_up;
                var score = _self.calculateScore();
                var message = CONSTANTS.strings.game.MESSAGE_TIME_IS_UP  + CONSTANTS.strings.game.MESSAGE_SCORE + score ;
                _self.notifyGameFinishedMessage(message);
            }
            else if (_self.currentGameState === _gameStates.section_completed) {
                var score = _self.calculateScore();
                var message = CONSTANTS.strings.game.MESSAGE_COMPLETED_QUESTIONS  + CONSTANTS.strings.game.MESSAGE_SCORE + score ;
                _self.notifyGameFinishedMessage(message);
            }

            i++;
        }, 1000);
    };

    _self.stopTimer = function() {
        clearInterval(_timerInterval);
    };

    _self.continueTimer = function() {
        _self.initTimers(_self.currentTime);
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
            return;
        }

        var _clickedButtonValue  = document.getElementById(buttonID).value;
        var _questionAnswerID    = "Q_ANSWER" + _self.currentQuestionNo;
        var _questionAnswer      = _gameData.questionList[_questionAnswerID];
        var _isAnswerCorrect     = false;
        $('#'+ buttonID).on("tap", function(e) {
            e.preventDefault();

            return false;
        });

        if (_clickedButtonValue === _questionAnswer) {
            _isAnswerCorrect = true;
            _self.checkNextQuestionAvailability();
        }
        else {
            _isAnswerCorrect = false;
            _resetGameCount++;
        }

        if (_self.currentGameState === _gameStates.continue) {
            _self.questionUpdate(_isAnswerCorrect);
        }

        _self.updateDisplay(_isAnswerCorrect, buttonID);
        setTimeout(function(){
            _self.clearScreenChanges(buttonID)
        }, 200);
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

        document.getElementById(buttonID).style.backgroundColor = CONSTANTS.strings.game.COLOR_BLUE; // blue
        document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 " + CONSTANTS.strings.game.COLOR_BLUE;
    };

    _self.updateDisplay = function (answer, buttonID) {

        _self.updateStep();
        if (answer === true) {
            document.getElementById(buttonID).style.backgroundColor = CONSTANTS.strings.game.COLOR_GREEN; // green
            document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 " + CONSTANTS.strings.game.COLOR_GREEN;
        }
        else {
            document.getElementById(buttonID).style.backgroundColor = CONSTANTS.strings.game.COLOR_RED;
            document.getElementById(buttonID).style.boxShadow = "0 0 10px 0 " + CONSTANTS.strings.game.COLOR_RED;
        }
    };

    _self.checkNextQuestionAvailability = function () {

        if (_self.currentQuestionNo >= _gameData.totalQuestionCount) {
            _self.currentGameState = _gameStates.section_completed;
        }
    };

    _self.calculateScore = function () {

       _self.stopTimer();

        var calculatedScoreConstant = _gameData.scoreMultiplier;
        if (_gameData.scoreMultiplier < (_resetGameCount + 4))
        {
            calculatedScoreConstant  = 4;
        }
        else
        {
            calculatedScoreConstant = (_gameData.scoreMultiplier - _resetGameCount);
        }
        _currentScore = (calculatedScoreConstant * _self.currentQuestionNo) + _currentTime;

        // show total score on screen,
        // let the user to increase its score
        // if it wants to go next, then add _currentScore to _totalScore
        return _totalScore + _currentScore;
    };

    _self.showNoDataDialog = function (){
        // Show a custom confirmation dialog
        var message = CONSTANTS.strings.game.MESSAGE_NO_DATA;
        if (typeof messageBox !== CONSTANTS.strings.global.UNDEFINED) {

            messageBox.show(message, _self.onNoDataDialogClosed, [CONSTANTS.strings.game.M_BTN_RETRY,
                                                                  CONSTANTS.strings.game.M_BTN_BACK]);
        }
        else
        {
            alert(message);
        }
    };

    _self.onNoDataDialogClosed = function(buttonNumber) {
        switch (buttonNumber)
        {
            case 0: // pressed retry
            {
                _self.showLoadingIcon(CONSTANTS.strings.game.MESSAGE_QUESTIONS_LOADING);
                _self.getSectionQuestions();// get new section data async
                break;
            }
            case 1: // pressed back
            {
                _self.gotoHomePage();
                break;
            }
            default :
            {
                _self.showLoadingIcon(CONSTANTS.strings.game.MESSAGE_QUESTIONS_LOADING);
                _self.getSectionQuestions();// get new section data async
                break;
            }
        }
    };

    _self.notifyGameFinishedMessage = function (message) {
        //alert(message);
        if (typeof messageBox !== CONSTANTS.strings.global.UNDEFINED)
        {
            messageBox.show(
                message,                                // message
                _self.onGameFinishedDialogClosed,       // callback to invoke with index of button pressed
                [CONSTANTS.strings.game.M_BTN_REPLAY,
                 CONSTANTS.strings.game.M_BTN_NEXTGAME] // buttonLabels
            );
        }
        else
        {
            alert(message);
        }
    };

    _self.onGameFinishedDialogClosed = function (buttonIndex) {
        if (buttonIndex === 1) // Next Section
        {
            // do not add _currentScore until go to next section
            _totalScore += _currentScore;
            _self.getSectionQuestions();// get new section data async
        }
        else // restart
        {
            _self.clearAllScreen();
            // wait some time before restart
            setTimeout(_self.startGame(), 2000);
        }
    };

    _self.showLoadingIcon = function(message) {
        // Show spinner dialog with message
        if (typeof loading !== CONSTANTS.strings.global.UNDEFINED)
        {
            loading.show(message);
        }
        else
        {
            alert(message);
        }
    };

    _self.hideLoadingIcon = function ()
    {
        // Hide spinner dialog
        if (typeof loading !== CONSTANTS.strings.global.UNDEFINED)
        {
            loading.hide();
        }
    };

    _self.gotoHomePage = function () {
        navigation.onBackKeyDown();
    };


};
