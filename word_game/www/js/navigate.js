/**
 * Created by ahmetce on 17.10.2015.
 */
var navigation = {

    // Used in back key event
    _previousPage : undefined,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    setPreviousPage : function(previousPage) {
        _previousPage = previousPage;
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
        //alert("menuye basıldı");
    },

    onBackKeyDown: function() {

        if (_previousPage !== undefined)
        {
            window.location = _previousPage;
        }
        else // in home page, exit app
        {
            messageBox.show(CONSTANTS.strings.navigation.MESSAGE_EXIT_APPLICATION,
                            navigation.onExitApplication(),
                            [CONSTANTS.strings.navigation.M_BTN_EXIT_APPLICATION_CONFIRM,
                             CONSTANTS.strings.navigation.M_BTN_EXIT_APPLICATION_CANCEL]);
        }
    },

    onExitApplication : function (buttonIndex){
        if (buttonIndex === 0) // Exit
        {
            navigator.app.exitApp();
        }
    },

    navigateToPage: function (buttonID) {
        switch (buttonID)
        {
            case CONSTANTS.strings.navigation.CASE_START_APPLICATION:
            {
                if (connection._currentState === connection.states.online)
                {
                    window.location = CONSTANTS.strings.navigation.LINK_GAME_SCREEN_PAGE;
                }
                else
                {
                    messageBox.show(CONSTANTS.strings.navigation.MESSAGE_NO_CONNECTION,
                                    navigation.navigateToPage(buttonID),
                                    [CONSTANTS.strings.navigation.M_BTN_RETRY]);
                }
                break;
            }
            case CONSTANTS.strings.navigation.CASE_GOTO_HOWTO_PAGE:
            {
                window.location = CONSTANTS.strings.navigation.LINK_HOWTO_PAGE;
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