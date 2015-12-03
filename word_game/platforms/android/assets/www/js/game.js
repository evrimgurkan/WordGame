/**
 * Created by ahmetce on 24.10.2015.
 */

var Game = function () {

    var _self = this;
    var _userID = -1;
    var _application = new Application(_self);
    var _generatedSectionID;
    var _timerInterval,
        _wrongAnswerCount,
        _currentTime,
        _resetGameCount = 0,
        _currentScore = 0,
        _totalScore = 0,
        _sectionCount = 2; // TODO: should be increased
    //TODO: calculate score
    //TODO: meta tag in html pages
    var _gameStates = {
        time_is_up: 0,
        section_completed: 1,
        continue : 2,
        none: 3
    };

    var _gameData ;

    _self.init = function (){
        _totalScore = 0;
        _currentScore = 0;
        _application.bindEvents();
        _self.getSectionQuestions();
        _userID = _self.getGeneratedUSerID();
    };

    _self.getGeneratedUSerID = function () {
        var user_id = Math.floor((Math.random() * 900000) + 100000);
        return user_id;
    };

    _self.getSectionQuestions = function () {

        _self.showLoadingIcon(CONSTANTS.strings.game.MESSAGE_QUESTIONS_LOADING);
        _generatedSectionID = _self.getNextSectionID();
        _application.getGameData(_generatedSectionID);
    };

    _self.getNextSectionID = function () {
        // generate random value between 1 and section count
        var id = Math.floor((Math.random() * _sectionCount) + 1);
        return id;
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
        _wrongAnswerCount = 0;
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
                // no need to show score when time is up
                //var score = _self.calculateScore();
                _self.stopTimer();
                var message = CONSTANTS.strings.game.MESSAGE_TIME_IS_UP;//  + CONSTANTS.strings.game.MESSAGE_SCORE + score ;
                _self.notifyGameFinishedMessage(message);
            }
            else if (_self.currentGameState === _gameStates.section_completed) {
                _self.stopTimer();
                _self.sectionCompleted();
            }

            i++;
        }, 1000);
    };

    _self.sectionCompleted = function () {
        var score = _self.calculateScore();
        // send score and wait for getting scores from webservice
        _self.getUserScoreOrder(score);
        _self.showLoadingIcon(CONSTANTS.strings.game.MESSAGE_CALCULATING_SCORES);
    };

    _self.onScoreInfoLoaded = function (score_info) {
        var total_scores_count = parseInt(score_info.section_scores_count) + 1;
        var current_order = Object.keys(score_info.scoresList).length + 1;
        var message = "";
        if (total_scores_count === current_order) // be last score
        {
            message = total_scores_count + CONSTANTS.strings.game.MESSAGE_SCORE_ORDER_PREFIX  +
                CONSTANTS.strings.game.MESSAGE_SCORE_ORDER_LAST;
        }
        else
        {
            message = total_scores_count + CONSTANTS.strings.game.MESSAGE_SCORE_ORDER_PREFIX  +
                current_order +
                CONSTANTS.strings.game.MESSAGE_SCORE_ORDER_POSTFIX +
                CONSTANTS.strings.game.MESSAGE_SCORE + _currentScore ;

        }
        _self.notifyGameScores(message,score_info);
    };

    _self.showNoScoreInfoDialog = function () {
        var message = CONSTANTS.strings.game.MESSAGE_COMPLETED_QUESTIONS  + CONSTANTS.strings.game.MESSAGE_SCORE + _currentScore ;
        _self.notifyGameFinishedMessage(message);
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
            _wrongAnswerCount++;
        }

        if (_self.currentGameState === _gameStates.continue) {
            _self.questionUpdate(_isAnswerCorrect);
        }

        _self.updateDisplay(_isAnswerCorrect, buttonID);
        setTimeout(function(){
            _self.clearScreenChanges(buttonID)
        }, 100);
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
        document.getElementById(buttonID).style.boxShadow = "0 0 30px 0 " + CONSTANTS.strings.game.COLOR_BLUE;
    };

    _self.updateDisplay = function (answer, buttonID) {

        _self.updateStep();
        if (answer === true) {
            document.getElementById(buttonID).style.backgroundColor = CONSTANTS.strings.game.COLOR_GREEN; // green
            document.getElementById(buttonID).style.boxShadow = "0 0 30px 0 " + CONSTANTS.strings.game.COLOR_GREEN;
        }
        else {
            document.getElementById(buttonID).style.backgroundColor = CONSTANTS.strings.game.COLOR_RED;
            document.getElementById(buttonID).style.boxShadow = "0 0 30px 0 " + CONSTANTS.strings.game.COLOR_RED;
        }
    };

    _self.checkNextQuestionAvailability = function () {

        if (_self.currentQuestionNo >= _gameData.totalQuestionCount) {
            _self.currentGameState = _gameStates.section_completed;
        }
    };

    _self.calculateScore = function () {

        var calculatedScoreConstant = _gameData.scoreMultiplier;
        //if (_gameData.scoreMultiplier < (_wrongAnswerCount + 4))
        //{
        //    calculatedScoreConstant  = 4;
        //}
        //else
        //{
        //    calculatedScoreConstant = (_gameData.scoreMultiplier - _wrongAnswerCount - _resetGameCount * 3);
        //}
        _currentScore = (calculatedScoreConstant * _self.currentQuestionNo) + _currentTime;
        _currentScore -= (_wrongAnswerCount * 6) + (_resetGameCount * 12);
        if (_currentScore <= 0 )
        {
            _currentScore = 0;
        }
        // show total score on screen,
        // let the user to increase its score
        // if it wants to go next, then add _currentScore to _totalScore
        //return _totalScore + _currentScore;

        // do not calculate total score for now
        return _currentScore;
    };

    _self.getUserScoreOrder = function (score) {
        _application.getScoreInfo(_generatedSectionID,_userID,score);
    };

    _self.showNoDataDialog = function (){
        // Show a custom confirmation dialog
        var message = CONSTANTS.strings.game.MESSAGE_NO_DATA;
        if (typeof messageBox !== CONSTANTS.strings.global.UNDEFINED) {

            //messageBox.show(messageBox.dialogType.info, {message : message,
            //                                             onClickedCallback : _self.onNoDataDialogClosed,
            //                                             buttonLabels : [CONSTANTS.strings.game.M_BTN_RETRY,
            //                                                             CONSTANTS.strings.game.M_BTN_BACK],
            //                                             });

            messageBox.showInfoDialog(message, _self.onNoDataDialogClosed, [CONSTANTS.strings.game.M_BTN_RETRY,
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
            messageBox.showInfoDialog(
                message,                                 // message
                _self.onGameFinishedDialogClosed,        // callback to invoke with index of button pressed
                [CONSTANTS.strings.game.M_BTN_REPLAY,
                 CONSTANTS.strings.game.M_BTN_NEXTGAME] // buttonLabels
            );
        }
        else
        {
            alert(message);
        }
    };

    _self.notifyGameScores = function (message,scores) {
        //alert(message);
        if (typeof messageBox !== CONSTANTS.strings.global.UNDEFINED)
        {
            if (scores.scoresList.length > 0)
            {
                messageBox.showScoreDialog(
                    message,                                 // message
                    _self.onGameFinishedDialogClosed,        // callback to invoke with index of button pressed
                    [CONSTANTS.strings.game.M_BTN_REPLAY,
                        CONSTANTS.strings.game.M_BTN_NEXTGAME], // buttonLabels
                    scores
                );
            }
            else // if score is highest
            {
                messageBox.showInfoDialog(
                    message,                                 // message
                    _self.onGameFinishedDialogClosed,        // callback to invoke with index of button pressed
                    [CONSTANTS.strings.game.M_BTN_REPLAY,
                        CONSTANTS.strings.game.M_BTN_NEXTGAME] // buttonLabels
                );
            }
        }
        else
        {
            alert(message);
        }
    };

    _self.onGameFinishedDialogClosed = function (buttonIndex) {

        if (buttonIndex === 1) // Next Section
        {
            _self.goToNextSection();
        }
        else // restart
        {
            _self.showScoreCalculationInfo();
        }
    };

    _self.restartCurrentSection = function () {

        _self.clearAllScreen();
        _resetGameCount++;
        // wait some time before restart
        setTimeout(_self.startGame(), 2000);
    };

    _self.goToNextSection = function () {
        // do not add _currentScore until go to next section
        _totalScore += _currentScore;
        _self.getSectionQuestions();// get new section data async
        _resetGameCount = 0;
    };

    _self.showScoreCalculationInfo = function (){
        if (typeof messageBox !== CONSTANTS.strings.global.UNDEFINED)
        {
            var message =CONSTANTS.strings.game.MESSAGE_SCORE_CALCULATION_INFO;
            messageBox.showInfoDialog(
                message,                                 // message
                _self.restartCurrentSection,                      // callback to invoke with index of button pressed
                [CONSTANTS.strings.game.M_BTN_OKEY]     // buttonLabels
            );
        }
        else
        {
            alert(message);
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
