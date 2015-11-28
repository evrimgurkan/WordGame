/**
 * Created by ahmetce on 26.10.2015.
 */

var messageBox = {

    _callback : undefined,
    isScoreDialog : false,

    dialogType : {
        info: 0,
        score: 1
    },

    parameters : {
        message : 'message',
        onClickedCallback : 'onClickedCallback',
        buttonLabels : 'buttonLabels',
        scores : 'scores'
    },

    show : function (dialogType, iParameters) {
        if (typeof dialogType !== CONSTANTS.strings.global.UNDEFINED &&
            typeof iParameters !== CONSTANTS.strings.global.UNDEFINED)
        {
            switch (dialogType)
            {
                case messageBox.dialogType.info:
                {
                    messageBox.showInfoDialog(iParameters.message,
                                              iParameters.onClickedCallback,
                                              iParameters.buttonLabels);
                    break;
                }
                case  messageBox.dialogType.score:
                {
                    messageBox.showScoreDialog(iParameters.message,
                                               iParameters.onClickedCallback,
                                               iParameters.buttonLabels,
                                               iParameters.scores);
                    break;
                }
                default :
                {
                    messageBox.showInfoDialog(iParameters.message,
                                              iParameters.onClickedCallback,
                                              iParameters.buttonLabels);
                    break;
                }
            }
        }

    },

    // callback to invoke with index of button pressed
    showInfoDialog : function (message, onClickedCallback, buttonLabels) {
        messageBox._callback = onClickedCallback;
        messageBox.generateInfoDialog(message, buttonLabels);
    },

    showScoreDialog : function (message, onClickedCallback, buttonLabels,scores) {
        messageBox._callback = onClickedCallback;
        messageBox.generateScoreDialog(message, buttonLabels,scores);
    },

    generateInfoDialog : function (message, buttonLabels) {
        $('.cd-popup-container .message-area').text(message);
        messageBox.generateButtons(buttonLabels);
        $('.cd-popup').addClass('visible');
        messageBox.isScoreDialog = false;
    },

    generateScoreDialog : function (message, buttonLabels,scores) {
        messageBox.generateScoreTable(scores);
        $('.cd-popup-container .message-area').text(message);
        messageBox.generateButtons(buttonLabels);
        $('.cd-popup').addClass('visible');
        $('.scores').addClass('visible');
        messageBox.isScoreDialog = true;
    },

    generateScoreTable : function(scores) {
        $('#scores-list').empty();
        messageBox.createScoreHeader();
        var length = (Object.keys(scores.scoresList).length < 9) ? Object.keys(scores.scoresList).length : 9;
        if (length > 0)
        {
            for (var i = 0;i < length ;i++)
            {
                var score = scores.scoresList[i];
                messageBox.createScoreRow(i + 1,score);
            }
        }
    },

    generateButtons : function (labels) {
        $('.cd-buttons').empty();
        if (typeof labels !== CONSTANTS.strings.global.UNDEFINED) {
            //$('.cd-buttons').removeClass('disable');
            switch (labels.length) {
                case 1:
                {
                    messageBox.createButton('popupLeftButton',labels[0]);
                    //$('#popupLeftButton').html(labels[0]);
                    $('.cd-buttons li').css({ width: '100%'});
                    break;
                }
                case 2:
                {
                    messageBox.createButton('popupLeftButton',labels[0]);
                    messageBox.createButton('popupRightButton',labels[1]);
                    //$('#popupLeftButton').html(labels[0]);
                    //$('#popupRightButton').html(labels[1]);
                    break;
                }
                default :
                {
                }
            }
        }
    },

    createScoreRow : function (rowCount,score){
        //TODO: Do not get score-list for every row
        var scoreList = $('#scores-list');
        var li = $('<li/>')
            .appendTo(scoreList);
        var el_span = $('<span/>')
            .html(rowCount + ' - ')
            .appendTo(li);
        var el_p = $('<p/>')
            .html(score)
            .appendTo(li);
    },

    createScoreHeader : function () {
        var scoreList = $('#scores-list');
        var li = $('<li/>')
            .appendTo(scoreList);
        var el_span = $('<span/>')
            .attr("style", 'text-align: center')
            .html(CONSTANTS.strings.notification.MESSAGE_SCORE_LIST_HEADER)
            .appendTo(li);
    },

    createButton : function (buttonID,htmlText) {

        var buttonList = $('.cd-buttons');
        var li = $('<li/>')
            .appendTo(buttonList);
        var aaa = $('<a/>').attr('id', buttonID)
            .attr("onclick", 'messageBox.onButtonClicked("'+buttonID+'")')
            .html(htmlText)
            .appendTo(li);
    },

    // close dialog
    onButtonClicked : function (buttonId ) {
        if (typeof messageBox._callback !== CONSTANTS.strings.global.UNDEFINED)
        {
            var returnIndex;
            $('.cd-popup').removeClass('visible');
            if (messageBox.isScoreDialog)
            {
                $('#scores-list').empty();
                $('.scores').removeClass('visible');
            }

            if (buttonId === 'popupLeftButton')
            {
                returnIndex = 0; // return button index
            }
            else
            {
                returnIndex = 1;
            }
            return messageBox._callback(returnIndex);
        }

    }
};

var loading = {

    // callback to invoke with index of button pressed
    show : function (message, onCloseCallback) {
        loading._callback = onCloseCallback;
        loading.generateLoadingDialog(message);
    },

    generateLoadingDialog : function (message) {
        $('.cd-buttons').empty();
        $('.cd-popup-container .message-area').text(message);
        $('.cd-buttons').addClass('disable');
        $('.cd-popup-container .loader').removeClass('disable');
        $('.cd-popup').addClass('visible');
    },

    // close dialog
    hide : function () {
        $('.cd-popup').removeClass('visible');
        $('.cd-buttons').removeClass('disable');
        $('.cd-popup-container .loader').addClass('disable');

        if (typeof loading._callback !== CONSTANTS.strings.global.UNDEFINED)
        {
            return loading._callback();
        }

    }
};