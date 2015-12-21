
var Application = function (iGame){
    var _self = this;
    var _game = iGame;
    var _isAdShown = false;

    /**
     * Public Functions
     */

    _self.getGameData = function (sectionNo,difficultyLevel) {

        var rUrl = CONSTANTS.strings.application.LINK_WEB_SERVICE_QUESTIONS + "?s_no="+sectionNo + "&s_diff_level=" + difficultyLevel;
        $.ajax({
            url: rUrl,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: gameData,
            error: ajaxErrorHandleGameData
        });
    };

    _self.getGameSectionCount = function (difficultyLevel) {

        var rUrl = CONSTANTS.strings.application.LINK_WEB_SERVICE_SECTION_COUNT + "?s_diff_level=" + difficultyLevel;
        $.ajax({
            url: rUrl,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: gameSectionCount,
            error: ajaxErrorHandleSectionCount
        });
    };

    _self.getScoreInfo = function (sectionId,userId,score) {

        var _url = CONSTANTS.strings.application.LINK_WEB_SERVICE_SCORE + "?s_id=" + sectionId +
                   "&user_id=" + userId + "&score=" + score;
        $.ajax({
            url: _url ,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: scoreInfo,
            error: ajaxErrorHandleScore
        });
    };

    _self.bindEvents = function () {
        document.addEventListener(CONSTANTS.events.application.PAUSE, onApplicationPaused, false);
        document.addEventListener(CONSTANTS.events.application.RESUME, onApplicationResumed, false);
    };

    _self.isAdShown = function (isShown) {
        _isAdShown = isShown;
    };

    /**
     * Private Functions
     */

    // PhoneGap consists of two code bases: native and JavaScript.
    // While the native code puts the application into the background the pause event is fired.
    // This is an event that fires when a PhoneGap application is put into the background.
    var onApplicationPaused = function () {
        _game.freezeTimer();
    };

    //This is an event that fires when a PhoneGap application is retrieved from the background.
    var onApplicationResumed = function () {
        // continue play game with remained time

        // if application is comes from fullscreen ad then dont show message on screen
        if (_isAdShown)
        {
            _game.continueTimer();
            _isAdShown = false;
        }
        else  // show "3 sn message" on screen
        {
            loading.show(CONSTANTS.strings.application.MESSAGE_CONTINUE_GAME, _game.continueTimer);
            setTimeout(function(){
                loading.hide()
            }, 3000);
        }

    };

    var scoreInfo = function (score_data) {
        var result_data = {};

        result_data.section_scores_count = score_data['SECTION_SCORES_COUNT'];
        result_data.scoresList = [];

        for (var i = 0; i < score_data['SCORES'].length;i++)
        {
            result_data.scoresList[i] = score_data['SCORES'][i];
        }
        _game.hideLoadingIcon();
        _game.onScoreInfoLoaded(result_data);
    };

    var ajaxErrorHandleScore = function() {

        var result_data = {};

        result_data.section_scores_count = 0;
        result_data.scoresList = {};

        _game.hideLoadingIcon();
        _game.showNoScoreInfoDialog();
    };

    var gameSectionCount = function (section_data) {

        var result_data = parseInt(section_data['S_COUNT']);
        _game.onSectionCountLoaded(result_data);
    };

    var ajaxErrorHandleSectionCount = function() {

        _game.onSectionCountLoaded(0);
    };

    var gameData = function (section_data) {

        var result_data = {};

        result_data.leftBtnValue = section_data['ANSWERS'][0];
        result_data.rightBtnValue = section_data['ANSWERS'][1];
        result_data.questionList = {};

        $.each(section_data['QUESTIONS'], function(key, value){
            result_data.questionList[key] = value;
        });
        result_data.totalQuestionCount = section_data['Q_COUNT'];
        result_data.sectionTime = section_data['S_TIME'];
        result_data.description = section_data['S_DESC'];
        result_data.description = section_data['S_DESC'];
        result_data.passCount = section_data['S_PASS_COUNT'];

        result_data.sectionCount = section_data['S_COUNT'];
        result_data.scoreMultiplier = section_data['S_CONST'];
        /**********************************************************************************/

        _game.onSectionQuestionsLoaded(result_data);
        _game.hideLoadingIcon();
    };

    var ajaxErrorHandleGameData = function() {

        var result_data = {};

        result_data.leftBtnValue = CONSTANTS.strings.application.LEFT_BUTTON_ERROR_VALUE;
        result_data.rightBtnValue = CONSTANTS.strings.application.RIGHT_BUTTON_ERROR_VALUE;
        result_data.questionList = {};
        result_data.description = CONSTANTS.strings.application.ERROR_DECRIPTION;
        result_data.totalQuestionCount = 0;
        result_data.sectionTime = 0;
        result_data.sectionCount = 1;
        result_data.scoreMultiplier = 10;

        _game.hideLoadingIcon();
        _game.showNoDataDialog();
    };
};

