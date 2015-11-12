
var Application = function (iGame){
    var _self = this;
    var _game = iGame;

    /**
     * Public Functions
     */

    _self.getGameData = function (sectionId) {

        $.ajax({
            url: CONSTANTS.strings.application.LINK_WEB_SERVICE + sectionId,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: gameData,
            error: ajaxErrorHandle
        });
    };

    _self.bindEvents = function () {
        document.addEventListener(CONSTANTS.events.application.PAUSE, onApplicationPaused, false);
        document.addEventListener(CONSTANTS.events.application.RESUME, onApplicationResumed, false);
    };

    /**
     * Private Functions
     */

    // PhoneGap consists of two code bases: native and JavaScript.
    // While the native code puts the application into the background the pause event is fired.
    // This is an event that fires when a PhoneGap application is put into the background.
    var onApplicationPaused = function () {
        _game.stopTimer();
    };

    //This is an event that fires when a PhoneGap application is retrieved from the background.
    var onApplicationResumed = function () {
        // continue play game with remained time

        loading.show(CONSTANTS.strings.application.MESSAGE_CONTINUE_GAME, _game.continueTimer);
        setTimeout(loading.hide(), 5000);
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

        /*
         * !!!!!!!!!!!!!!!!!!!!!! SHOULD BE GET FROM WEBSERVICE !!!!!!!!!!!!!!!!!!!!!!!!!!!
         */
        result_data.sectionCount = section_data['S_COUNT'];
        result_data.scoreMultiplier = section_data['S_CONST'];
        /**********************************************************************************/

        _game.onSectionQuestionsLoaded(result_data);
        _game.hideLoadingIcon();
    };

    var ajaxErrorHandle = function() {

        var result_data = {};

        result_data.leftBtnValue = CONSTANTS.strings.application.LEFT_BUTTON_ERROR_VALUE;
        result_data.rightBtnValue = CONSTANTS.strings.application.RIGHT_BUTTON_ERROR_VALUE;
        result_data.questionList = {};
        result_data.description = CONSTANTS.strings.application.ERROR_DECRIPTION;
        result_data.totalQuestionCount = 0;
        result_data.sectionTime = 0;
        result_data.sectionCount = 1;
        result_data.scoreMultiplier = 10;
        //sessionStorage.setItem("gameData",JSON.stringify(result_data));

        _game.hideLoadingIcon();
        _game.showNoDataDialog();
    };
};

