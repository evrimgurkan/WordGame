/**
 * Created by ahmetce on 17.10.2015.
 */
var navigation = {

    // Used in back key event
    _previousPage : CONSTANTS.strings.global.UNDEFINED,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        navigation._previousPage = CONSTANTS.strings.global.UNDEFINED;
    },

    setPreviousPage : function(previousPage) {
        navigation._previousPage = previousPage;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'backbutton', and 'online'.
    bindEvents: function() {
        document.addEventListener(CONSTANTS.events.navigation.BACK_BUTTON, this.onBackKeyDown, false);        // Register the event listener
        document.addEventListener(CONSTANTS.events.navigation.MENU_BUTTON, this.onMenuKeyDown, false);
    },

    onMenuKeyDown: function() {
    },

    onBackKeyDown: function() {
        //history.back();

        if (navigation._previousPage !== CONSTANTS.strings.global.UNDEFINED)
        {
            window.location = navigation._previousPage;
        }
        else // in home page, exit app
        {
            messageBox.showInfoDialog(CONSTANTS.strings.navigation.MESSAGE_EXIT_APPLICATION,
                            navigation.onExitApplication,
                            [CONSTANTS.strings.navigation.M_BTN_EXIT_APPLICATION_CONFIRM,
                             CONSTANTS.strings.navigation.M_BTN_EXIT_APPLICATION_CANCEL]);
        }
    },

    onExitApplication : function (buttonIndex){
        if (typeof navigator.app === CONSTANTS.strings.global.UNDEFINED)
        {
            return;
        }

        if (buttonIndex === 0) // confirm
        {
            navigator.app.exitApp();
        }
    },

    navigateToPage: function (buttonID) {
        switch (buttonID)
        {
            case CONSTANTS.strings.navigation.CASE_START_APPLICATION:
            {
                var conState = connection.getDeviceConnection();
                if ( conState === connection.states.online)
                {
                    window.location = CONSTANTS.strings.navigation.LINK_GAME_SCREEN_PAGE;
                }
                else
                {
                    messageBox.showInfoDialog(CONSTANTS.strings.navigation.MESSAGE_NO_CONNECTION,
                                    navigation.navigateToPage(buttonID),
                                    [CONSTANTS.strings.navigation.M_BTN_RETRY]);
                }
                break;
            }
            case CONSTANTS.strings.navigation.CASE_GOTO_HOWTO_PAGE:
            {
                window.location = CONSTANTS.strings.navigation.LINK_HOWTO_PAGE;
                //window.location.href = '#pagetwo'
                break;
            }
            default :
            {
                break;
            }
        }
    },

    navigateToLogin: function (buttonID)
    {

    }

};