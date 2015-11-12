/**
 * Created by ahmetce on 26.10.2015.
 */

var messageBox = {

    _callback : undefined,
    // callback to invoke with index of button pressed
    show : function (message, onClickedCallback, buttonLabels) {
        messageBox._callback = onClickedCallback;
        messageBox.generateInfoDialog(message, buttonLabels);
    },

    generateInfoDialog : function (message, buttonLabels) {
        $('.cd-popup-container .message-area').text(message);
        messageBox.generateButtons(buttonLabels);
        $('.cd-popup').addClass('visible');
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